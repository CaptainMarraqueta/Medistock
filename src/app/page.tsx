import Link from "next/link"
import { Button } from "../components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-xl font-bold">Medistock</h1>

        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>

          <Link href="/register">
            <Button>Registrarse</Button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Gestión inteligente de medicamentos
        </h2>

        <p className="text-gray-600 mb-6">
          Controla stock, ventas y vencimientos en un solo lugar.
        </p>

        <Link href="/dashboard">
          <Button size="lg">Ir al sistema</Button>
        </Link>
      </section>

      {/* FEATURES */}

      {/* FOOTER */}
      <footer className="text-center p-6 text-sm text-gray-500">
        © 2026 Medistock
      </footer>

    </div>
  )
}