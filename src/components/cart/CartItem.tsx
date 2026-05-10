import { Trash2, Minus, Plus, Tag } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { IProduct } from '@/src/types/general'
import { Badge } from '@/src/components/ui/badge'
import Image from 'next/image'

interface CartItemProps {
  product: IProduct
  quantity: number
}

export function CartItem({ product, quantity }: CartItemProps) {

  const precioFinal =
    product.originalPrice * (1 - product.offerPercentage / 100)

  return (
    <div className="rounded-xl p-3 border border-border/50 bg-card">

      <div className="flex gap-5">

        {/* IMAGEN */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted/50">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>

          {product.offerPercentage > 0 && (
            <Badge
              variant="green"
              className="absolute -top-2 -right-2 text-xs"
            >
              -{product.offerPercentage}%
            </Badge>
          )}
        </div>

        {/* INFO */}
        <div className="flex-grow min-w-0">

          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {product.description}
          </p>

          <Badge variant="green" className="flex items-center gap-1 w-fit">
            <Tag className="h-3 w-3" />
            {product.category}
          </Badge>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-4">

        {/* PRECIO */}
        <div className="flex items-center gap-3">

          <span className="text-lg font-semibold">
            ${precioFinal.toFixed(2)}
          </span>

          {product.offerPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}

        </div>

        {/* CANTIDAD */}
        <div className="flex items-center gap-2">

          <div className="flex items-center bg-muted/50 px-2 h-8 rounded-lg border">

            <Button variant="ghost" size="sm" className="w-7 h-7 p-0">
              <Minus className="w-3 h-3" />
            </Button>

            <span className="px-2 text-sm font-semibold min-w-[2rem] text-center">
              {quantity}
            </span>

            <Button variant="ghost" size="sm" className="w-7 h-7 p-0">
              <Plus className="w-3 h-3" />
            </Button>

          </div>

          {/* ELIMINAR */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 h-7 w-7 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-3 h-3" />
          </Button>

        </div>
      </div>
    </div>
  )
}