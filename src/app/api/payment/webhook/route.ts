import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("Webhook recibido:", body);

  const paymentId = body.data?.id;

  if (!paymentId) {
    return Response.json({ ok: false });
  }

  // ⚠️ En producción aquí consultas MercadoPago API
  const estado = "approved";

  if (estado === "approved") {
    const orderId = Number(body.external_reference);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) return Response.json({ ok: false });

    // 💳 Crear payment
    await prisma.payment.create({
      data: {
        orderId: order.id,
        status: "PAID",
        method: "MERCADOPAGO",
        transactionId: String(paymentId),
      },
    });

    // 📦 Descontar stock
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stocks: {
            decrement: item.quantity,
          },
        },
      });
    }

    // 🚚 Crear tracking automático
    await prisma.tracking.create({
      data: {
        orderId: order.id,
        code: "TRK-" + Date.now(),
        carrier: "MockShip",
        status: "PREPARANDO",
      },
    });

    // 🟢 Marcar orden como pagada
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: "APPROVED",
      },
    });
  }

  return Response.json({ ok: true });
}