import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, productId, quantity } = await req.json();

    // Validaciones
    if (
      userId == null ||
      productId == null ||
      quantity == null
    ) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { error: "La cantidad debe ser mayor a 0" },
        { status: 400 }
      );
    }

    // Buscar carrito pendiente
    let cart = await prisma.order.findFirst({
      where: {
        userId,
        status: "PENDING",
      },
    });

    // Crear carrito si no existe
    if (!cart) {
      cart = await prisma.order.create({
        data: {
          userId,
          total: 0,
          status: "PENDING",
        },
      });
    }

    // Obtener producto
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Buscar si el producto ya existe en el carrito
    const existingItem = await prisma.orderItem.findFirst({
      where: {
        orderId: cart.id,
        productId,
      },
    });

    const newQuantity = existingItem
      ? existingItem.quantity + quantity
      : quantity;

    // Validar stock total
    if (newQuantity > product.stocks) {
      return NextResponse.json(
        {
          error: `Solo quedan ${product.stocks} unidades disponibles.`,
        },
        { status: 400 }
      );
    }

    // Precio con descuento
    const price =
      product.originalPrice *
      (1 - product.offerPercentage / 100);

    // Actualizar o crear item
    if (existingItem) {
      await prisma.orderItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: newQuantity,
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

    // Recalcular total
    const items = await prisma.orderItem.findMany({
      where: {
        orderId: cart.id,
      },
      select: {
        quantity: true,
        price: true,
      },
    });

    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Actualizar total de la orden
    await prisma.order.update({
      where: {
        id: cart.id,
      },
      data: {
        total,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Producto agregado al carrito.",
      cartId: cart.id,
      total,
    });
  } catch (error) {
    console.error("Cart Error:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );
  }
}