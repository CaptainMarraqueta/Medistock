import { Button } from "@/src/components/ui/button"
import { ArrowRight } from "lucide-react"
import ProductCard from "@/src/components/products/ProductCard"
import { mockProducts } from "@/src/constants/mockProducts"
import Image from "next/image"

export const TopSelling = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Medicamentos más dispensados
        </h2>
        <p className="text-muted-foreground text-sm">
          Productos con mayor rotación en el sistema clínico MediStock
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* IZQUIERDA */}
        <div className="grid grid-cols-2 gap-4 col-span-1 sm:col-span-6 lg:col-span-4">
          {mockProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CENTRO DESTACADO */}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative w-full h-72 sm:h-full rounded-2xl overflow-hidden flex flex-col justify-between p-4">

            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=678&auto=format&fit=crop"
                alt="Medicamento destacado"
                fill
                className="object-cover opacity-60"
              />
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-2xl font-bold">
                Producto de mayor demanda
              </h3>

              <p className="mt-2 text-sm mb-6">
                Medicamento con mayor consumo en clínicas y farmacias conectadas a MediStock.
              </p>

              <Button className="rounded-full">
                <span>Ver detalles</span>
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className="grid grid-cols-2 gap-4 col-span-1 sm:col-span-6 lg:col-span-4">
          {mockProducts.slice(4, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  )
}