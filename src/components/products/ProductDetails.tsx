'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/src/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { FaCartPlus, FaBagShopping } from "react-icons/fa6";
import { cn } from "@/src/lib/utils";
import { ROUTE } from '@/src/constants/routes';
import { useParams, useRouter } from 'next/navigation';
import RatingStars from '../others/RatingStars';
import Image from 'next/image';
import { IProduct } from '@/src/types/general';
import NoProducts from './NoProducts';

export default function ProductOverview() {
  const params = useParams();
  const router = useRouter();

  const productId = typeof params?.id === "string"
    ? params.id
    : Array.isArray(params?.id)
      ? params.id[0]
      : null;

  const [productData, setProductData] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/products/${productId}`);

        if (!res.ok) {
          setProductData(null);
          return;
        }

        const data = await res.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // 🛒 ADD TO CART
  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // ⚠️ luego lo reemplazas por auth real
          productId: productData?.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        console.error("Error al agregar al carrito");
        return;
      }

      console.log("Producto agregado al carrito");
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[90dvh] flex items-center justify-center">
        Cargando producto...
      </div>
    );
  }

  if (!productData) {
    return (
      <div className='min-h-[90dvh] flex justify-center items-center'>
        <NoProducts
          showButton
          title='Producto no encontrado'
          message="El producto no existe o fue eliminado."
          buttonLabel="Volver"
          redirectTo={ROUTE.ALL_PRODUCTS}
        />
      </div>
    );
  }

  // 🧠 limpiar imágenes
  const images =
    productData.images
      ?.map(img => typeof img === "string" ? img : img.url)
      .filter((url): url is string => Boolean(url && url.trim() !== "")) || [];

  const safeImages =
    images.length > 0 ? images : ["/no-image.png"];

  const currentImage =
    safeImages[selectedImage] ?? safeImages[0];

  const price = Math.round(
    productData.originalPrice * (1 - productData.offerPercentage / 100)
  );

  return (
    <div className="min-h-[100dvh]">
      <div className="container mx-auto p-4 md:p-8">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-muted-foreground cursor-pointer"
            onClick={() => router.push(ROUTE.ALL_PRODUCTS)}
          >
            Productos
          </span>
          <ChevronRight size={12} />
          <span className="font-medium">{productData.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* IMAGES */}
          <div className="space-y-4 col-span-1 lg:col-span-2">

            <div className="overflow-hidden rounded-xl border">
              <div className="relative aspect-square bg-background">

                {currentImage && currentImage.trim() !== "" && (
                  <Image
                    src={currentImage}
                    alt={productData.name}
                    fill
                    className="object-contain"
                  />
                )}

              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {safeImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square border-2 rounded-lg overflow-hidden",
                    selectedImage === index
                      ? "border-primary"
                      : "border-border"
                  )}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={`${productData.name} ${index}`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* INFO */}
          <div className="space-y-4 col-span-1 lg:col-span-3">

            <h1 className="text-3xl font-bold">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-green-600">
                ${price.toLocaleString("es-CL")}
              </div>

              {productData.offerPercentage > 0 && (
                <>
                  <div className="text-sm line-through text-muted-foreground">
                    ${productData.originalPrice.toLocaleString("es-CL")}
                  </div>
                  <div className="text-sm text-destructive">
                    -{productData.offerPercentage}%
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <RatingStars rating={productData.rating} />
              <span className="text-sm text-muted-foreground">
                ({productData.ratingCount})
              </span>
            </div>

            <p className="text-muted-foreground text-sm">
              {productData.description}
            </p>

            {/* BUTTONS DESKTOP */}
            <div className="space-y-2 pt-4 hidden md:block">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                <FaCartPlus /> Agregar al carrito
              </Button>

              <Button size="lg" className="w-full">
                <FaBagShopping /> Comprar ahora
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t p-3 flex gap-2 bg-background">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleAddToCart}
        >
          <FaCartPlus /> Agregar
        </Button>

        <Button className="flex-1">
          <FaBagShopping /> Comprar
        </Button>
      </div>

    </div>
  );
}