import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando el proceso de seeding...");

  // 1. LIMPIEZA
  await prisma.receta.deleteMany();
  await prisma.movimientoStock.deleteMany();
  await prisma.detalleVenta.deleteMany();
  await prisma.venta.deleteMany();
  await prisma.lote.deleteMany();
  await prisma.medicamento.deleteMany();
  await prisma.usuario.deleteMany();

  // 🔐 HASH PASSWORDS REALES
  const adminPassword = await bcrypt.hash("admin123", 10);
  const clientePassword = await bcrypt.hash("cliente123", 10);

  // 2. USUARIOS
  const admin = await prisma.usuario.create({
    data: {
      nombre: "Admin Farmacia",
      email: "admin@farmacia.com",
      password: adminPassword,
      rol: "admin",
    },
  });

  const cliente = await prisma.usuario.create({
    data: {
      nombre: "Juan Pérez",
      email: "juan@gmail.com",
      password: clientePassword,
      rol: "cliente",
    },
  });

  console.log("✅ Usuarios creados");

  // 3. MEDICAMENTOS
  const paracetamol = await prisma.medicamento.create({
    data: {
      nombre: "Paracetamol",
      principioActivo: "Paracetamol",
      concentracion: "500mg",
      forma: "Tableta",
      marca: "Genérico Pharma",
      laboratorio: "Lab Chile",
      requiereReceta: false,
      lotes: {
        create: [
          {
            numeroLote: "LOTE-2024-001",
            fechaVencimiento: new Date("2026-12-31"),
            stock: 100,
            stockMinimo: 20,
            precioCompra: 0.5,
            precioVenta: 1.5,
          },
          {
            numeroLote: "LOTE-2024-002",
            fechaVencimiento: new Date("2027-06-15"),
            stock: 50,
            stockMinimo: 10,
            precioCompra: 0.55,
            precioVenta: 1.6,
          },
        ],
      },
    },
    include: { lotes: true },
  });

  const amoxicilina = await prisma.medicamento.create({
    data: {
      nombre: "Amoxicilina",
      principioActivo: "Amoxicilina",
      concentracion: "875mg",
      forma: "Cápsula",
      marca: "Amoxil",
      laboratorio: "Glaxo",
      requiereReceta: true,
      lotes: {
        create: {
          numeroLote: "AMX-998",
          fechaVencimiento: new Date("2025-08-20"),
          stock: 30,
          stockMinimo: 5,
          precioCompra: 2.0,
          precioVenta: 5.5,
        },
      },
    },
    include: { lotes: true },
  });

  console.log("✅ Medicamentos y lotes cargados");

  // 4. RECETA
  await prisma.receta.create({
    data: {
      archivo: "https://storage.com/receta_juan.pdf",
      validada: true,
      usuarioId: cliente.id,
    },
  });

  // 5. VENTA
  const venta1 = await prisma.venta.create({
    data: {
      total: 3.0,
      estado: "pagada",
      metodoPago: "tarjeta",
      usuarioId: cliente.id,
      detalles: {
        create: {
          cantidad: 2,
          precioUnitario: 1.5,
          loteId: paracetamol.lotes[0].id,
        },
      },
    },
  });

  // 6. MOVIMIENTO STOCK
  await prisma.movimientoStock.create({
    data: {
      tipo: "salida",
      cantidad: 2,
      motivo: `Venta ID: ${venta1.id}`,
      loteId: paracetamol.lotes[0].id,
    },
  });

  console.log("🚀 Seeding completado con éxito");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });