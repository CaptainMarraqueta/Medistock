import { PrismaClient, Role, OrderStatus, PaymentStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seeding MEDISTOCK...");

  /* =========================
     🧹 LIMPIEZA (orden correcto)
  ========================= */

  await prisma.tracking.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.institution.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Base de datos limpia");

  /* =========================
     🔐 USUARIOS
  ========================= */

  const hash = async (p: string) => bcrypt.hash(p, 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@medistock.com",
      password: await hash("admin123"),
      name: "Administrador",
      role: Role.ADMIN,
    },
  });

  const executive = await prisma.user.create({
    data: {
      email: "ejecutivo@medistock.com",
      password: await hash("exec123"),
      name: "Ejecutivo Comercial",
      role: Role.EXECUTIVE,
    },
  });

  const operator = await prisma.user.create({
    data: {
      email: "logistica@medistock.com",
      password: await hash("logistica123"),
      name: "Operador Logístico",
      role: Role.OPERATOR,
    },
  });

  const analyst = await prisma.user.create({
    data: {
      email: "finanzas@medistock.com",
      password: await hash("finanzas123"),
      name: "Analista Financiero",
      role: Role.ANALYST,
    },
  });

  const clinicUser = await prisma.user.create({
    data: {
      email: "clinica@medistock.com",
      password: await hash("clinica123"),
      name: "Clínica San José",
      role: Role.INSTITUTION,
    },
  });

  const patient = await prisma.user.create({
    data: {
      email: "paciente@gmail.com",
      password: await hash("paciente123"),
      name: "Juan Pérez",
      role: Role.PATIENT,
    },
  });

  console.log("👤 Usuarios creados");

  /* =========================
     🏥 INSTITUCIÓN
  ========================= */

  await prisma.institution.create({
    data: {
      name: "Clínica San José",
      rut: "76.123.456-7",
      userId: clinicUser.id,
    },
  });

  console.log("🏥 Institución creada");

  /* =========================
     📦 PRODUCTOS
  ========================= */

  const paracetamol = await prisma.product.create({
    data: {
      name: "Paracetamol 500mg",
      description: "Analgésico y antipirético de uso común",
      code: "PARA-500",

      originalPrice: 1200,
      offerPercentage: 10,

      rating: 4.6,
      ratingCount: 120,

      stocks: 200,

      images: {
        create: [
          { url: "/products/paracetamol-1.jpg" },
          { url: "/products/paracetamol-2.jpg" },
        ],
      },
    },
  });

  const amoxicilina = await prisma.product.create({
    data: {
      name: "Amoxicilina 875mg",
      description: "Antibiótico de amplio espectro",
      code: "AMOX-875",

      originalPrice: 5500,
      offerPercentage: 5,

      rating: 4.8,
      ratingCount: 80,

      stocks: 80,

      images: {
        create: [
          { url: "/products/amoxicilina-1.jpg" },
          { url: "/products/amoxicilina-2.jpg" },
        ],
      },
    },
  });

  console.log("💊 Productos creados");

  /* =========================
     🛒 ORDEN
  ========================= */

  const order = await prisma.order.create({
    data: {
      userId: patient.id,
      total: 2 * 1200 + 1 * 5500,
      status: OrderStatus.PENDING,

      items: {
        create: [
          {
            productId: paracetamol.id,
            quantity: 2,
            price: 1200,
          },
          {
            productId: amoxicilina.id,
            quantity: 1,
            price: 5500,
          },
        ],
      },
    },
  });

  console.log("🛒 Orden creada");

  /* =========================
     💳 PAGO
  ========================= */

  await prisma.payment.create({
    data: {
      orderId: order.id,
      status: PaymentStatus.PAID,
      method: "MERCADOPAGO",
      transactionId: "MP-" + Math.random().toString(36).substring(2, 10),
    },
  });

  console.log("💳 Pago registrado");

  /* =========================
     🚚 TRACKING
  ========================= */

  await prisma.tracking.create({
    data: {
      orderId: order.id,
      code: "TRK-" + Date.now(),
      carrier: "MockShip",
      status: "EN_PREPARACION",
    },
  });

  console.log("🚚 Tracking generado");

  console.log("🚀 SEEDING MEDISTOCK COMPLETADO");
}

main()
  .catch((e) => {
    console.error("❌ Error en seeder:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });