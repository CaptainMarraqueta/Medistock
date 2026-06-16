import { POST } from "../src/app/api/institutions/register/route";
import { prisma } from "@/src/lib/prisma";

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    institution: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe("CP-06 - Registro de Clínicas", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe rechazar un RUT duplicado", async () => {
    (prisma.institution.findUnique as jest.Mock)
      .mockResolvedValue({
        id: 1,
        rut: "76.123.456-7",
      });

    const req = {
      json: jest.fn().mockResolvedValue({
        rut: "76.123.456-7",
        name: "Clínica Test",
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body.error).toContain("RUT");
  });

  it("debe permitir registrar una clínica con RUT único", async () => {
    (prisma.institution.findUnique as jest.Mock)
      .mockResolvedValue(null);

    (prisma.institution.create as jest.Mock)
      .mockResolvedValue({
        id: 1,
        rut: "77.999.888-1",
      });

    const req = {
      json: jest.fn().mockResolvedValue({
        rut: "77.999.888-1",
        name: "Nueva Clínica",
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(200);

    expect(prisma.institution.create)
      .toHaveBeenCalled();
  });
});