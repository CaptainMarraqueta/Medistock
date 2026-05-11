import { Preference } from "mercadopago";
import { mpClient } from "@/src/lib/mercadopago";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await req.json();

  // 🔥 ahora es ORDER, no VENTA
  const carrito = await prisma.order.findFirst({
    where: {
      userId: userId,
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
    return Response.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const preference = new Preference(mpClient);

  const result = await preference.create({
    body: {
      items: carrito.items.map((item) => ({
        id: item.product.id.toString(),
        title: item.product.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      external_reference: carrito.id.toString(),
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
      },
      auto_return: "approved",
    },
  });

  // 🔥 actualizas estado de orden
  await prisma.order.update({
    where: { id: carrito.id },
    data: { status: "PENDING" },
  });

  return Response.json({ id: result.id });
}