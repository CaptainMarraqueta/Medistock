'use client'

import { Heart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import RatingStars from "../others/RatingStars";
import { IProduct } from "@/src/types/general";
import Image from "next/image";
import Link from "next/link";
import { ROUTE } from "@/src/constants/routes";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {

  const discountedPrice =
    product.originalPrice * (1 - product.offerPercentage / 100);

  const mainImage = product.images?.[0] || "/no-image.png";
  const hoverImage = product.images?.[1] || mainImage;

  const productId =
    typeof product.id === "string"
      ? product.id
      : String(product.id);

  return (
    <Link href={ROUTE.PRODUCT_DETAILS(productId)}>

      <div className="group relative overflow-hidden border rounded-md transition-all duration-300 cursor-pointer hover:shadow-md">

        {/* FAVORITO */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart className="w-4 h-4" />
        </Button>

        {/* IMAGEN */}
        <div className="aspect-square overflow-hidden relative">

          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />

          <Image
            src={hoverImage}
            alt={`${product.name} hover`}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

        </div>

        {/* INFO */}
        <div className="p-3 md:p-4 space-y-2">

          <h3 className="font-semibold text-sm md:text-lg line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-muted-foreground">
              ({product.ratingCount})
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-2">

            <div className="text-sm font-semibold">
              ${Math.round(discountedPrice).toLocaleString("es-CL")}
            </div>

            {product.offerPercentage > 0 && (
              <>
                <div className="text-xs line-through text-muted-foreground">
                  ${product.originalPrice.toLocaleString("es-CL")}
                </div>

                <div className="text-xs font-medium text-destructive">
                  -{product.offerPercentage}%
                </div>
              </>
            )}

          </div>

          {/* STOCK */}
          <div className="text-xs text-muted-foreground">
            {product.stocks > 0
              ? `Stock: ${product.stocks}`
              : "Sin stock"}
          </div>

        </div>
      </div>

    </Link>
  );
}