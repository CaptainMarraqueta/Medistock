export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold text-lg mb-6">MediStock Admin</h2>

        <nav className="space-y-2 text-sm">
          <a href="/dashboard" className="block hover:text-primary">
            Inicio
          </a>
          <a href="/dashboard/medicamentos" className="block hover:text-primary">
            Medicamentos
          </a>
          <a href="/dashboard/ventas" className="block hover:text-primary">
            Ventas
          </a>
          <a href="/dashboard/usuarios" className="block hover:text-primary">
            Usuarios
          </a>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>

    </div>
  );
}