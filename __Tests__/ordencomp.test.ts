import { POST } from "../src/app/api/cart/checkout/route";
import { prisma } from "@/src/lib/prisma";

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    order: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    product: {
      update: jest.fn(),
    },
  },
}));

describe("CP-04 - Ciclo de Vida de Órdenes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe retornar error si el carrito está vacío", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body).toEqual({
      error: "Carrito vacío",
    });
  });

  it("debe cerrar la orden y cambiar estado a APPROVED", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 15,
      userId: 1,
      status: "PENDING",
      items: [
        {
          quantity: 2,
          productId: 10,
          product: {
            id: 10,
            stocks: 50,
          },
        },
      ],
    });

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
      }),
    } as any;

    const response = await POST(req);

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: {
        id: 10,
      },
      data: {
        stocks: {
          decrement: 2,
        },
      },
    });

    expect(prisma.order.update).toHaveBeenCalledWith({
      where: {
        id: 15,
      },
      data: {
        status: "APPROVED",
      },
    });

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body).toEqual({
      ok: true,
      orderId: 15,
    });
  });

  it("debe descontar stock de todos los productos", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 20,
      items: [
        {
          quantity: 3,
          productId: 1,
          product: {},
        },
        {
          quantity: 5,
          productId: 2,
          product: {},
        },
      ],
    });

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
      }),
    } as any;

    await POST(req);

    expect(prisma.product.update).toHaveBeenCalledTimes(2);
  });
});