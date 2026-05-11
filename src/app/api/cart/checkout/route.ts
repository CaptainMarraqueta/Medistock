import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const cart = await prisma.order.findFirst({
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

  if (!cart || cart.items.length === 0) {
    return NextResponse.json(
      { error: "Carrito vacío" },
      { status: 400 }
    );
  }

  // 🧠 actualizar stock (opcional pero recomendado)
  for (const item of cart.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: {
        stocks: {
          decrement: item.quantity,
        },
      },
    });
  }

  // 💳 cerrar orden
  await prisma.order.update({
    where: { id: cart.id },
    data: {
      status: "APPROVED",
    },
  });

  return NextResponse.json({
    ok: true,
    orderId: cart.id,
  });
}