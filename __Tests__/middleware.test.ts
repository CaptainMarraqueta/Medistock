import { middleware } from "../middleware";
import { verifyToken } from "@/src/lib/auth";

jest.mock("@/src/lib/auth", () => ({
  verifyToken: jest.fn(),
}));

describe("CP-02 - Control de Acceso por Roles", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe redirigir si no existe token", () => {
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      nextUrl: {
        pathname: "/dashboard",
      },
      url: "http://localhost:3000/dashboard",
    } as any;

    const response = middleware(req);

    expect(response.status).toBe(307);
  });

  it("debe bloquear acceso a usuario PATIENT", () => {
    (verifyToken as jest.Mock).mockReturnValue({
      id: 1,
      rol: "patient",
    });

    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({
          value: "fake-token",
        }),
      },
      nextUrl: {
        pathname: "/dashboard",
      },
      url: "http://localhost:3000/dashboard",
    } as any;

    const response = middleware(req);

    expect(response.status).toBe(307);
  });

  it("debe permitir acceso a ADMIN", () => {
    (verifyToken as jest.Mock).mockReturnValue({
      id: 1,
      rol: "admin",
    });

    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({
          value: "fake-token",
        }),
      },
      nextUrl: {
        pathname: "/dashboard",
      },
      url: "http://localhost:3000/dashboard",
    } as any;

    const response = middleware(req);

    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("debe redirigir si el token es inválido", () => {
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error("Token inválido");
    });

    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({
          value: "fake-token",
        }),
      },
      nextUrl: {
        pathname: "/dashboard",
      },
      url: "http://localhost:3000/dashboard",
    } as any;

    const response = middleware(req);

    expect(response.status).toBe(307);
  });
});