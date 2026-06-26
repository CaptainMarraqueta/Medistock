import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { mapProduct } from "@/src/lib/mappers/product.mapper";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));

  if (!userId) {
    return NextResponse.json(
      { error: "userId requerido" },
      { status: 400 }
    );
  }

  const cart = await prisma.order.findFirst({
    where: {
      userId,
      status: "PENDING",
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  const items =
    cart?.items.map((item) => {
      const product = item.product;

      const price = Math.round(
        product.originalPrice *
          (1 - product.offerPercentage / 100)
      );

      return {
        product: mapProduct(product),
        quantity: item.quantity,
        price,
      };
    }) || [];

  return NextResponse.json(items);
}