import { ROUTE } from "@/src/constants/routes";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const sections = [
  {
    title: "Medicamentos",
    links: [
      { name: "Todos los productos", href: ROUTE.ALL_PRODUCTS },
      { name: "Con receta", href: "#" },
      { name: "Sin receta", href: "#" },
      { name: "Ofertas", href: "#" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { name: "Cómo comprar", href: "#" },
      { name: "Despachos", href: "#" },
      { name: "Seguimiento de pedido", href: "#" },
      { name: "Contacto", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Términos y condiciones", href: "#" },
      { name: "Política de privacidad", href: "#" },
      { name: "Uso de recetas médicas", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer className="py-10 px-4 md:px-8 border-t bg-muted/30">
      <div className="container mx-auto">

        {/* 🔝 Top */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* 🧾 Brand */}
          <div className="flex flex-col gap-4 max-w-sm">
            <Link href={ROUTE.HOME}>
              <h3 className="text-2xl font-bold">
                Medi<span className="text-primary">Stock</span>
              </h3>
            </Link>

            <p className="text-sm text-muted-foreground">
              Plataforma de gestión y venta de medicamentos. Compra segura,
              control de stock y acceso rápido a productos farmacéuticos.
            </p>

            {/* ⚠️ Disclaimer importante */}
            <p className="text-xs text-muted-foreground">
              * Los medicamentos sujetos a receta médica requieren validación
              antes de su despacho.
            </p>

            {/* 🌐 Redes */}
            <ul className="flex gap-4 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx}>
                  <Link href={social.href} aria-label={social.label} className="hover:text-primary">
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 📚 Secciones */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl">
            {sections.map((section, i) => (
              <div key={i}>
                <h3 className="mb-3 font-semibold text-sm">{section.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="hover:text-primary hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 🔽 Bottom */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MediStock. Todos los derechos reservados.</p>

          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary hover:underline">
              Términos
            </Link>
            <Link href="#" className="hover:text-primary hover:underline">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};