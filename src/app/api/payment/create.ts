import { Preference } from "mercadopago";
import { mpClient } from "@/src/lib/mercadopago";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const carrito = await prisma.order.findFirst({
      where: {
        userId,
        status: "PENDING",
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!carrito || carrito.items.length === 0) {
      return Response.json(
        { error: "Carrito vacío" },
        { status: 400 }
      );
    }

    const preference = new Preference(mpClient);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const result = await preference.create({
      body: {
        items: carrito.items.map((item) => ({
          id: item.product.id.toString(),
          title: item.product.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
          currency_id: "CLP",
        })),

        // Id de la orden para recuperarlo desde el webhook
        external_reference: carrito.id.toString(),

        // Redirecciones
        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },

        auto_return: "approved",

        // Webhook
        notification_url: `${baseUrl}/api/mercadopago/webhook`,
      },
    });

    return Response.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error creando preferencia:", error);

    return Response.json(
      {
        error: "No fue posible crear la preferencia de pago.",
      },
      {
        status: 500,
      }
    );
  }
}