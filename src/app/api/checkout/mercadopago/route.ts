import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { Preference } from "mercadopago";
import {  mpClient} from "@/src/lib/mercadopago";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const cart = await prisma.order.findFirst({
    where: { userId, status: "PENDING" },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const preference = new Preference(mpClient);

  const response = await preference.create({
    body: {
     items: cart.items.map((item) => ({
        id: String(item.productId), // 👈 FIX
         title: item.product.name,
         quantity: item.quantity,
         unit_price: item.price,
         currency_id: "CLP",
        })),
      external_reference: String(cart.id),
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
      },
      auto_return: "approved",
    },
  });

  return NextResponse.json({
    init_point: response.init_point,
  });
}