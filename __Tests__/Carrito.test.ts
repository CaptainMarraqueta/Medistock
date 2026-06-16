import { POST } from "../src/app/api/cart/add/route";
import { prisma } from "@/src/lib/prisma";

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    order: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    product: {
      findUnique: jest.fn(),
    },
    orderItem: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe("CP-03 - Carrito de Compras", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe retornar 400 si faltan datos", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({}),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(400);
  });

  it("debe retornar 404 si el producto no existe", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
    });

    (prisma.product.findUnique as jest.Mock).mockResolvedValue(null);

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
        productId: 1,
        quantity: 2,
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(404);
  });

  it("debe retornar error si no hay stock", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
    });

    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      stocks: 1,
      originalPrice: 10000,
      offerPercentage: 0,
    });

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
        productId: 1,
        quantity: 5,
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body.error).toBe("Sin stock");
  });

  it("debe crear carrito si no existe", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.order.create as jest.Mock).mockResolvedValue({
      id: 99,
      userId: 1,
    });

    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      stocks: 20,
      originalPrice: 10000,
      offerPercentage: 0,
    });

    (prisma.orderItem.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([
      {
        quantity: 1,
        price: 10000,
      },
    ]);

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
        productId: 1,
        quantity: 1,
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(200);

    expect(prisma.order.create).toHaveBeenCalled();
  });

  it("debe agregar producto y recalcular total", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 1,
    });

    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      stocks: 20,
      originalPrice: 10000,
      offerPercentage: 0,
    });

    (prisma.orderItem.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([
      {
        quantity: 2,
        price: 10000,
      },
    ]);

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
        productId: 1,
        quantity: 2,
      }),
    } as any;

    const response = await POST(req);

    const body = await response.json();

    expect(body).toEqual({
      ok: true,
      total: 20000,
    });
  });

  it("debe actualizar cantidad si el producto ya existe en el carrito", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
    });

    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      stocks: 20,
      originalPrice: 10000,
      offerPercentage: 0,
    });

    (prisma.orderItem.findFirst as jest.Mock).mockResolvedValue({
      id: 5,
      quantity: 2,
    });

    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([
      {
        quantity: 5,
        price: 10000,
      },
    ]);

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
        productId: 1,
        quantity: 3,
      }),
    } as any;

    await POST(req);

    expect(prisma.orderItem.update).toHaveBeenCalledWith({
      where: {
        id: 5,
      },
      data: {
        quantity: 5,
      },
    });
  });

  it("debe aplicar correctamente el descuento del producto", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
    });

    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      stocks: 20,
      originalPrice: 10000,
      offerPercentage: 10,
    });

    (prisma.orderItem.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([
      {
        quantity: 2,
        price: 9000,
      },
    ]);

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
        productId: 1,
        quantity: 2,
      }),
    } as any;

    const response = await POST(req);

    const body = await response.json();

    expect(body.total).toBe(18000);
  });

  it("debe actualizar el total de la orden", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
    });

    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      stocks: 20,
      originalPrice: 10000,
      offerPercentage: 0,
    });

    (prisma.orderItem.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([
      {
        quantity: 2,
        price: 10000,
      },
    ]);

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
        productId: 1,
        quantity: 2,
      }),
    } as any;

    await POST(req);

    expect(prisma.order.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: {
        total: 20000,
      },
    });
  });
});