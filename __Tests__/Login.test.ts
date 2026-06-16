// app/api/auth/login/route.test.ts

import { POST } from "../src/app/api/auth/login/route"
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@/src/lib/auth";

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock("@/src/lib/auth", () => ({
  signToken: jest.fn(),
}));

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe retornar 401 si el usuario no existe", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "test@test.com",
        password: "123456",
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(401);

    const body = await response.json();

    expect(body).toEqual({
      error: "Usuario no existe",
    });
  });

  it("debe retornar 401 si la contraseña es incorrecta", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      password: "hash",
      rol: "ADMIN",
      nombre: "Juan",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "test@test.com",
        password: "incorrecta",
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(401);

    const body = await response.json();

    expect(body).toEqual({
      error: "Password incorrecta",
    });
  });

  it("debe realizar login correctamente", async () => {
    const user = {
      id: 1,
      nombre: "Juan",
      email: "test@test.com",
      password: "hash",
      rol: "ADMIN",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (signToken as jest.Mock).mockReturnValue("fake-jwt-token");

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "test@test.com",
        password: "123456",
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body).toEqual({
      message: "Login correcto",
      user: {
        id: 1,
        nombre: "Juan",
        rol: "ADMIN",
      },
    });

    expect(signToken).toHaveBeenCalledWith({
      id: 1,
      rol: "ADMIN",
      email: "test@test.com",
    });

    const cookie = response.cookies.get("token");

    expect(cookie?.value).toBe("fake-jwt-token");
  });

  it("debe retornar 500 ante un error interno", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error("DB Error")
    );

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "test@test.com",
        password: "123456",
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(500);

    const body = await response.json();

    expect(body).toEqual({
      error: "Error interno del servidor",
    });
  });
});