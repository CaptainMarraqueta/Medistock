'use client'

import React, { useState } from 'react';
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import { ChevronRight, Tag } from 'lucide-react';
import { FaCartPlus, FaBagShopping } from "react-icons/fa6";
import { cn } from "@/src/lib/utils";
import { ROUTE } from '@/src/constants/routes';
import { useParams, useRouter } from 'next/navigation';
import { mockProducts } from '@/src/constants/mockProducts';
import RatingStars from '../others/RatingStars';
import Image from 'next/image';
import { IProduct } from '@/src/types/general';
import NoProducts from './NoProducts';

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  const productData: IProduct | undefined = mockProducts.find(
    (product: IProduct) => product.id === productId
  );

  if (!productData) {
    return (
      <div className='min-h-[90dvh] flex justify-center items-center'>
        <NoProducts
          showButton={true}
          title='Producto no encontrado'
          message="El producto no existe o fue eliminado."
          buttonLabel="Volver"
          redirectTo={ROUTE.ALL_PRODUCTS}
        />
      </div>
    );
  }

  // ✅ fallback seguro
  const images = productData.images?.length
    ? productData.images
    : ["/no-image.png"];

  const currentImage = images[selectedImage] || images[0];

  const price = Math.round(
    productData.originalPrice * (1 - productData.offerPercentage / 100)
  );

  return (
    <div className="min-h-[100dvh]">
      <div className="container mx-auto p-4 md:p-8">

        {/* Breadcrumb */}
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

          {/* 🖼️ Imágenes */}
          <div className="space-y-4 col-span-1 lg:col-span-2">
            <div className="overflow-hidden rounded-xl border">
              <div className="relative aspect-square bg-background">
                <Image
                  src={currentImage}
                  alt={productData.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {images.map((image, index) => (
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
                  <Image
                    src={image}
                    alt={`${productData.name} ${index}`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 📦 Info */}
          <div className="space-y-4 col-span-1 lg:col-span-3">
            <Badge variant="green" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {productData.category}
            </Badge>

            <h1 className="text-3xl font-bold">
              {productData.name}
            </h1>

            {/* 💰 Precio */}
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

            {/* ⭐ Rating */}
            <div className="flex items-center gap-2">
              <RatingStars rating={productData.rating} />
              <span className="text-sm text-muted-foreground">
                ({productData.ratingCount})
              </span>
            </div>

            <p className="text-muted-foreground text-sm">
              {productData.description}
            </p>

            {/* 🛒 Botones */}
            <div className="space-y-2 pt-4 hidden md:block">
              <Button variant="outline" size="lg" className="w-full">
                <FaCartPlus /> <span>Agregar al carrito</span>
              </Button>
              <Button size="lg" className="w-full">
                <FaBagShopping /> <span>Comprar ahora</span>
              </Button>
            </div>

            {/* 📋 Features */}
            <Accordion type="single" collapsible defaultValue="features">
              <AccordionItem value="features">
                <AccordionTrigger>Características</AccordionTrigger>
                <AccordionContent>
                  {productData.features.map((f, i) => (
                    <div key={i} className="text-sm text-muted-foreground">
                      • {f}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* 📱 Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t p-3 flex gap-2 bg-background">
        <Button variant="outline" className="flex-1">
          <FaCartPlus /> Agregar
        </Button>
        <Button className="flex-1">
          <FaBagShopping /> Comprar
        </Button>
      </div>
    </div>
  );
}