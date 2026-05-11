import { IProductImage } from "./general";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  category: string;

  originalPrice: number;
  offerPercentage: number;

  stocks: number;

  images: IProductImage[];

  isPublished: boolean;

  rating: number;
  ratingCount: number;

  requiresPrescription: boolean;
  laboratory: string;
  activeIngredient: string;
  dosage: string;
  format: string;

  features: string[];
}