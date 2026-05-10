"use client";

import Image from "next/image";
import { mockCategories } from "@/constants/mockCategories";

export default function CategoryList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mockCategories.map((cat) => (
        < div
          key={cat.id}
          className="relative rounded-xl overflow-hidden h-36 group cursor-pointer"
        >
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            className="object-cover"
          />

          < div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-4 px-4 z-10" >
            <h3 className="sm:text-lg font-semibold text-background">{cat.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}