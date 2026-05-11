import { IProduct } from "@/src/types/general";

export function mapProduct(product: any): IProduct {
  return {
    id: Number(product.id),
    name: product.name,
    description: product.description ?? "",
    category: product.category ?? "",

    originalPrice: product.originalPrice,
    offerPercentage: product.offerPercentage,

    stocks: product.stocks,

    images: product.images?.map((img: any) => ({
  id: img.id,
  url: img.url,
})) || [],

    isPublished: product.isPublished ?? true,

    rating: product.rating,
    ratingCount: product.ratingCount,

    requiresPrescription: product.requiresPrescription ?? false,
    laboratory: product.laboratory ?? "",
    activeIngredient: product.activeIngredient ?? "",
    dosage: product.dosage ?? "",
    format: product.format ?? "",

    features: product.features ?? [],
  };
}