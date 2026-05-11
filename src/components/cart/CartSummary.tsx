import { Button } from "@/src/components/ui/button";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { IProduct } from "@/src/types/general";

interface CartSummaryProps {
  cartItems: {
    product: IProduct;
    quantity: number;
    price?: number;
  }[];
  onCheckout: () => void;
  loading?: boolean;
}

export function CartSummary({
  cartItems,
  onCheckout,
  loading = false,
}: CartSummaryProps) {

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity ?? 0),
    0
  );

  const subtotal = cartItems.reduce((acc, item) => {
    const price =
      item.price ??
      item.product.originalPrice *
        (1 - (item.product.offerPercentage ?? 0) / 100);

    return acc + price * (item.quantity ?? 0);
  }, 0);

  const discount = subtotal * 0.1;
  const tax = subtotal * 0.19;
  const total = subtotal - discount + tax;

  return (
    <div className="rounded-2xl">

      <h2 className="text-xl font-bold mb-4">
        Resumen de compra
      </h2>

      {/* BREAKDOWN */}
      <div className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Productos ({totalItems})
          </span>
          <span>${subtotal.toFixed(0)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Descuento</span>
          <span className="text-green-500">
            -${discount.toFixed(0)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">IVA</span>
          <span>${tax.toFixed(0)}</span>
        </div>

        <div className="my-4 h-px bg-muted-foreground/20" />

        <div className="flex justify-between text-lg">
          <span className="font-semibold">Total</span>
          <span className="font-bold">
            ${total.toFixed(0)}
          </span>
        </div>
      </div>

      {/* SECURITY */}
      <div className="flex items-center gap-2 text-xs mt-4 p-3 bg-muted/30 rounded-lg">
        <ShieldCheck className="w-4 h-4 text-green-500" />
        Pago seguro con MercadoPago
      </div>

      {/* ACTIONS */}
      <div className="hidden md:block mt-4 space-y-2">

        <Button
          className="w-full"
          onClick={onCheckout}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? "Redirigiendo..." : "Pagar con MercadoPago"}
          <ChevronRight className="w-4 h-4" />
        </Button>

      </div>
    </div>
  );
}