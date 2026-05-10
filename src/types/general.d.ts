export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;

  // Precios
  originalPrice: number;
  offerPercentage: number;

  // Stock
  stocks: number;

  // Media
  images: string[];

  // Estado
  isPublished: boolean;

  // Ratings
  rating: number;
  ratingCount: number;

  // Info farmacéutica (IMPORTANTE)
  requiresPrescription: boolean; // si necesita receta
  laboratory: string; // laboratorio (ej: Bayer, Saval)
  activeIngredient: string; // principio activo (ej: Paracetamol)
  dosage: string; // ej: 500mg, 1g
  format: string; // tabletas, jarabe, cápsulas

  features: string[];
}

export interface ICategory {
  id: string;
  name: string;
  image: string;
}

export interface IOrder {
  id: string;

  products: IOrderItem[];

  dateOfOrder: string;

  // Estados en español (alineado a tu mock)
  fulfillmentStatus:
    | "Pendiente"
    | "En preparación"
    | "Enviado"
    | "Entregado"
    | "Cancelado";

  paymentStatus: "pendiente" | "pagado";

  shippingAddress: IOrderAddress;

  total: number;

  // Farmacia
  hasPrescription: boolean; // si la orden incluye receta válida
}

export interface IOrderItem {
  product: IProduct;
  quantity: number;
}

export interface IOrderAddress {
  name: string;
  houseName: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  phoneNumber: string;
}