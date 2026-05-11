import { prisma } from "@/src/lib/prisma";

export default async function DashboardStats() {
  const usuarios = await prisma.usuario.count();
  const medicamentos = await prisma.medicamento.count();
  const ventas = await prisma.venta.count();

  const ventasTotales = await prisma.venta.aggregate({
    _sum: {
      total: true,
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <Card title="Usuarios" value={usuarios} />
      <Card title="Medicamentos" value={medicamentos} />
      <Card title="Ventas" value={ventas} />
      <Card
        title="Ingresos"
        value={`$${ventasTotales._sum.total ?? 0}`}
      />

    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}