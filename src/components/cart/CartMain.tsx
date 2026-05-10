import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'
import { mockProducts } from '@/src/constants/mockProducts'

const cartItems = [
  { product: mockProducts[0], quantity: 2 },
  { product: mockProducts[1], quantity: 1 },
  { product: mockProducts[2], quantity: 1 },
]

export function CartMain() {
  return (
    <div className="min-h-screen">

      <div className="container mx-auto p-4 md:p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">
            Registro de dispensación
          </h1>

          <p className="text-muted-foreground text-sm">
            {cartItems.length} medicamentos en preparación
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* LISTA DE MEDICAMENTOS */}
          <div className="xl:col-span-8">
            <div className="space-y-4">

              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                />
              ))}

            </div>
          </div>

          {/* RESUMEN CLÍNICO */}
          <div className="xl:col-span-4">
            <CartSummary cartItems={cartItems} />
          </div>

        </div>
      </div>
    </div>
  )
}