"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import { mockCategories } from "@/src/constants/mockCategories";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const opcionesOrden = [
  { id: "newest", name: "Más recientes primero" },
  { id: "oldest", name: "Más antiguos primero" },
  { id: "name", name: "Nombre" },
  { id: "price", name: "Precio" },
  { id: "rating", name: "Calificación" },
];

export default function DesktopFilterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ordenSeleccionado, setOrdenSeleccionado] = useState(
    searchParams.get("sort") ?? "newest"
  );

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>(
    searchParams.get("category")
      ? searchParams.get("category")!.split(",")
      : ["all"]
  );

  const cambiarCategoria = (id: string) => {
    if (id === "all") {
      setCategoriasSeleccionadas(["all"]);
      return;
    }

    setCategoriasSeleccionadas((prev) => {
      const sinAll = prev.filter((c) => c !== "all");

      if (sinAll.includes(id)) {
        return sinAll.filter((c) => c !== id);
      }

      return [...sinAll, id];
    });
  };

  const aplicarFiltros = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Orden
    params.set("sort", ordenSeleccionado);

    // Categorías
    if (
      categoriasSeleccionadas.length &&
      !categoriasSeleccionadas.includes("all")
    ) {
      params.set("category", categoriasSeleccionadas.join(","));
    } else {
      params.delete("category");
    }

    router.push(`/all-products?${params.toString()}`);
  };

  const limpiarFiltros = () => {
    setOrdenSeleccionado("newest");
    setCategoriasSeleccionadas(["all"]);

    const params = new URLSearchParams(searchParams.toString());

    params.delete("sort");
    params.delete("category");

    router.push(`/all-products?${params.toString()}`);
  };

  return (
    <div className="w-64 hidden lg:flex flex-col pt-28 relative h-screen">
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">

        <h3 className="font-semibold mb-3">Ordenar por</h3>

        {opcionesOrden.map((item) => (
          <div key={item.id} className="flex items-center gap-2 mb-2">
            <Checkbox
              checked={ordenSeleccionado === item.id}
              onCheckedChange={() => setOrdenSeleccionado(item.id)}
            />
            <span className="text-sm">{item.name}</span>
          </div>
        ))}

        <h3 className="font-semibold mb-3 mt-10">Categorías</h3>

        {[{ id: "all", name: "Todas" }, ...mockCategories].map((item) => (
          <div key={item.id} className="flex items-center gap-2 mb-2">
            <Checkbox
              checked={categoriasSeleccionadas.includes(item.id)}
              onCheckedChange={() => cambiarCategoria(item.id)}
            />
            <span className="text-sm">{item.name}</span>
          </div>
        ))}

      </div>

      <div className="p-4 flex gap-2 bg-background border-t">

        <Button
          variant="outline"
          className="flex-1 h-8 border border-destructive text-destructive"
          onClick={limpiarFiltros}
        >
          Limpiar
        </Button>

        <Button
          className="flex-1 h-8"
          variant="outline"
          onClick={aplicarFiltros}
        >
          Aplicar
        </Button>

      </div>
    </div>
  );
}