import { Button } from '@/src/components/ui/button'
import { Badge } from '@/src/components/ui/badge'
import { ShieldCheck, ChevronRight } from 'lucide-react'
import { IProduct } from '@/src/types/general'

interface CartSummaryProps {
  cartItems: {
    product: IProduct
    quantity: number
  }[]
}

export function CartSummary({ cartItems }: CartSummaryProps) {

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  )

  const descuento = subtotal * 0.1 // ejemplo 10%
  const impuestos = subtotal * 0.19 // IVA Chile ejemplo
  const total = subtotal - descuento + impuestos

  return (
    <div className="rounded-2xl">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-foreground mb-4">
        Resumen de dispensación
      </h2>

      {/* BREAKDOWN */}
      <div className="space-y-2 mb-4 text-sm">

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Medicamentos ({totalItems})
          </span>
          <span className="font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Descuentos</span>
          <span className="font-medium text-green-500">
            -${descuento.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Impuestos (IVA)</span>
          <span className="font-medium">
            ${impuestos.toFixed(2)}
          </span>
        </div>

        <div className="my-4 w-full h-[0.5px] bg-muted-foreground/30" />

        <div className="flex justify-between text-lg">
          <span className="font-semibold">Total</span>

          <div className="text-right">
            <span className="font-bold text-xl">
              ${total.toFixed(2)}
            </span>
            <div className="text-xs text-muted-foreground">
              Cálculo automático de inventario
            </div>
          </div>
        </div>
      </div>

      {/* SECURITY INFO */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 bg-muted/30 p-3 rounded-lg">
        <ShieldCheck className="w-4 h-4 text-green-500" />
        <span>
          Transacción segura para sistema clínico MediStock
        </span>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block space-y-2">

        <Button className="w-full">
          Confirmar dispensación
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Button variant="outline" className="w-full border">
          Seguir agregando medicamentos
        </Button>
      </div>

      {/* MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t px-4 py-2">

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Seguir
          </Button>

          <Button className="flex-1">
            Confirmar
          </Button>
        </div>

      </div>
    </div>
  )
}