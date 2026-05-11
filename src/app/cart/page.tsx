import { CartMain } from "@/src/components/cart/CartMain";

export default async function Page() {

  const userId = 1; // 👈 luego lo sacas de sesión real

  return (
    <div className="min-h-[100dvh] pt-15 md:pt-10">
      <CartMain userId={userId} />
    </div>
  );
}