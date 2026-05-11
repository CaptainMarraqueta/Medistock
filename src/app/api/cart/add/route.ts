import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, productId, quantity } = await req.json();

    // 🧠 VALIDACIÓN BÁSICA
    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // 1. Buscar order activa
    let cart = await prisma.order.findFirst({
      where: {
        userId,
        status: "PENDING",
      },
    });

    // 2. Crear order si no existe
    if (!cart) {
      cart = await prisma.order.create({
        data: {
          userId,
          total: 0,
          status: "PENDING",
        },
      });
    }

    // 3. Obtener producto
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no existe" },
        { status: 404 }
      );
    }

    if (product.stocks < quantity) {
      return NextResponse.json(
        { error: "Sin stock" },
        { status: 400 }
      );
    }

    const price =
      product.originalPrice *
      (1 - product.offerPercentage / 100);

    // 4. Ver si ya existe item en carrito
    const existingItem = await prisma.orderItem.findFirst({
      where: {
        orderId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      await prisma.orderItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      await prisma.orderItem.create({
        data: {
          orderId: cart.id,
          productId,
          quantity,
          price,
        },
      });
    }

    // 5. recalcular total
    const items = await prisma.orderItem.findMany({
      where: { orderId: cart.id },
    });

    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await prisma.order.update({
      where: { id: cart.id },
      data: { total },
    });

    return NextResponse.json({ ok: true, total });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error en carrito" },
      { status: 500 }
    );
  }
}