import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { IProduct } from "@/src/types/general";
import { Badge } from "@/src/components/ui/badge";
import Image from "next/image";

interface CartItemProps {
  product: IProduct;
  quantity: number;
  price?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

export function CartItem({
  product,
  quantity,
  price,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {

  const offer = product.offerPercentage ?? 0;

  const finalPrice =
    price ??
    product.originalPrice * (1 - offer / 100);

  // 🧠 FIX SEGURO DE IMAGEN
  const image =
    product.images?.[0]?.url?.trim() || "/no-image.png";

  return (
    <div className="rounded-xl p-3 border bg-card">

      <div className="flex gap-5">

        {/* IMAGE */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted/50">

          {image && image.trim() !== "" && (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}

          {offer > 0 && (
            <Badge className="absolute -top-2 -right-2 text-xs">
              -{offer}%
            </Badge>
          )}
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0">

          <h3 className="font-semibold line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.description}
          </p>

        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-4">

        {/* PRICE */}
        <div className="flex items-center gap-3">

          <span className="font-semibold">
            ${finalPrice.toFixed(0)}
          </span>

          {offer > 0 && (
            <span className="text-xs line-through text-muted-foreground">
              ${product.originalPrice.toFixed(0)}
            </span>
          )}

        </div>

        {/* QTY ACTIONS */}
        <div className="flex items-center gap-2">

          <div className="flex items-center bg-muted px-2 rounded-lg">

            <Button
              variant="ghost"
              size="sm"
              className="w-7 h-7 p-0"
              onClick={onDecrease}
              disabled={!onDecrease}
            >
              <Minus className="w-3 h-3" />
            </Button>

            <span className="px-2 text-sm font-semibold min-w-[2rem] text-center">
              {quantity}
            </span>

            <Button
              variant="ghost"
              size="sm"
              className="w-7 h-7 p-0"
              onClick={onIncrease}
              disabled={!onIncrease}
            >
              <Plus className="w-3 h-3" />
            </Button>

          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={onRemove}
            disabled={!onRemove}
          >
            <Trash2 className="w-3 h-3" />
          </Button>

        </div>
      </div>
    </div>
  );
}