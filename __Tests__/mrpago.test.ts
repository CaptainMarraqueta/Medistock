import { POST } from "../src/app/api/checkout/mercadopago/route";
import { prisma } from "@/src/lib/prisma";

const createMock = jest.fn();

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    order: {
      findFirst: jest.fn(),
    },
  },
}));

jest.mock("mercadopago", () => ({
  Preference: jest.fn().mockImplementation(() => ({
    create: createMock,
  })),
}));

jest.mock("@/src/lib/mercadopago", () => ({
  mpClient: {},
}));

describe("CP-05 - Integración MercadoPago", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe retornar 400 si el carrito está vacío", async () => {
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

  it("debe generar una preferencia de pago correctamente", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 15,
      items: [
        {
          productId: 1,
          quantity: 2,
          price: 10000,
          product: {
            name: "Guantes",
          },
        },
      ],
    });

    createMock.mockResolvedValue({
      init_point: "https://www.mercadopago.cl/checkout/v1/redirect",
    });

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body).toEqual({
      init_point:
        "https://www.mercadopago.cl/checkout/v1/redirect",
    });
  });

  it("debe enviar correctamente los productos a MercadoPago", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 20,
      items: [
        {
          productId: 5,
          quantity: 3,
          price: 15000,
          product: {
            name: "Mascarillas",
          },
        },
      ],
    });

    createMock.mockResolvedValue({
      init_point: "https://mercadopago.cl/pay",
    });

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
      }),
    } as any;

    await POST(req);

    expect(createMock).toHaveBeenCalledWith({
      body: {
        items: [
          {
            id: "5",
            title: "Mascarillas",
            quantity: 3,
            unit_price: 15000,
            currency_id: "CLP",
          },
        ],
        external_reference: "20",
        back_urls: {
          success: expect.any(String),
          failure: expect.any(String),
        },
        auto_return: "approved",
      },
    });
  });

  it("debe generar la referencia externa usando el id de la orden", async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({
      id: 99,
      items: [
        {
          productId: 1,
          quantity: 1,
          price: 5000,
          product: {
            name: "Alcohol Gel",
          },
        },
      ],
    });

    createMock.mockResolvedValue({
      init_point: "https://mercadopago.cl/pay",
    });

    const req = {
      json: jest.fn().mockResolvedValue({
        userId: 1,
      }),
    } as any;

    await POST(req);

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          external_reference: "99",
        }),
      })
    );
  });
});