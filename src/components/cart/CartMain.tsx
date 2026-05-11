'use client';

import { useState, useEffect } from "react";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { IProduct } from "@/src/types/general";

interface CartItemType {
  product: IProduct;
  quantity: number;
  price: number;
}

export function CartMain({ userId }: { userId: number }) {

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // 🔄 cargar carrito
  const fetchCart = async () => {
    const res = await fetch(`/api/cart?userId=${userId}`);
    const data = await res.json();
    setCartItems(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ➕ / ➖ cantidad
  const updateQuantity = async (
    productId: number,
    action: "increase" | "decrease"
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id !== productId) return item;

          let qty = item.quantity;

          if (action === "increase") qty += 1;
          if (action === "decrease") qty -= 1;

          return { ...item, quantity: qty };
        })
        .filter((item) => item.quantity > 0)
    );

    await fetch("/api/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId,
        action,
      }),
    });
  };

  // 🗑 eliminar item
  const removeItem = async (productId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );

    await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId,
      }),
    });
  };

  // 💳 CHECKOUT
const handleCheckout = async () => {
  const res = await fetch("/api/checkout/mercadopago", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: cartItems,
    }),
  });

  const data = await res.json();

  if (data.init_point) {
    window.location.href = data.init_point;
  }
};

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-bold">
            Carrito de compra
          </h1>

          <p className="text-muted-foreground text-sm">
            {cartItems.length} productos
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* LISTA */}
          <div className="xl:col-span-8">
            <div className="space-y-4">

              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                  price={item.price}
                  onIncrease={() =>
                    updateQuantity(item.product.id, "increase")
                  }
                  onDecrease={() =>
                    updateQuantity(item.product.id, "decrease")
                  }
                  onRemove={() =>
                    removeItem(item.product.id)
                  }
                />
              ))}

            </div>
          </div>

          {/* RESUMEN */}
          <div className="xl:col-span-4">
            <CartSummary
              cartItems={cartItems}
              onCheckout={handleCheckout}
            />
          </div>

        </div>
      </div>
    </div>
  );
}