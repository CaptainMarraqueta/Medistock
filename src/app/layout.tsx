import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Footer } from "@/src/components/others/Footer";
import { Navbar } from "@/src/components/others/Navbar";

export const metadata: Metadata = {
  title: "MediStock | Gestión de Medicamentos",
  description:
    "Sistema de gestión de stock de medicamentos. Controla inventario, ventas y disponibilidad en tiempo real de forma eficiente.",
  keywords: [
    "medicamentos",
    "farmacia",
    "stock",
    "inventario",
    "gestión de medicamentos",
    "sistema farmacia",
    "control de stock",
  ],
};

const font = Outfit({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${font.className} antialiased`}
        suppressHydrationWarning
      >
        {/* Layout estructurado */}
        <div className="flex flex-col min-h-screen">
          
          {/* Navbar */}
          <Navbar />

          {/* Contenido */}
          <main className="flex-1 pt-16">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}