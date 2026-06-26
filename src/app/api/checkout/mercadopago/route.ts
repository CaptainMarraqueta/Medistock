import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { mpClient } from "@/src/lib/mercadopago";

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json();

    if (!items?.length) {
      return NextResponse.json(
        { error: "No hay productos en el carrito" },
        { status: 400 }
      );
    }

    const productIds = items.map(
      (i: any) => i.productId ?? i.product?.id
    );

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const preference = new Preference(mpClient);

    const response = await preference.create({
      body: {
        items: items.map((item: any) => {
          const product = products.find(
            (p) => p.id === (item.productId ?? item.product?.id)
          );

          if (!product) {
            throw new Error("Producto no encontrado");
          }

          return {
            id: product.id.toString(),
            title: product.name,
            quantity: Number(item.quantity),
            unit_price: Number(product.originalPrice),
            currency_id: "CLP",
          };
        }),

        payer: email
          ? {
              email,
            }
          : undefined,

        external_reference: "cart-direct",

        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },

        notification_url: `${baseUrl}/api/mercadopago/webhook`,

        auto_return: "approved",
      },
    });

    return NextResponse.json({
      preference_id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
    console.log(JSON.stringify(Response, null, 2));
  }
  
}