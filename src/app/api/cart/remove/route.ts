import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, productId } = await req.json();

  const cart = await prisma.order.findFirst({
    where: { userId, status: "PENDING" },
  });

  if (!cart) {
    return NextResponse.json({ error: "No cart" }, { status: 404 });
  }

  await prisma.orderItem.deleteMany({
    where: {
      orderId: cart.id,
      productId,
    },
  });

  return NextResponse.json({ ok: true });
}