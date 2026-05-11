export interface ProductDTO {
  id: number;
  name: string;
  description: string | null;
  code: string;

  originalPrice: number;
  offerPercentage: number;

  stocks: number;
  rating: number;
  ratingCount: number;

  images: { url: string }[];
}