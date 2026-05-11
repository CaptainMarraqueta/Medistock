import { IOrder } from "@/src/types/general";
import { mockProducts } from "./mockProducts.js";

const mockOrders: IOrder[] = [
  {
    id: "MED-1001",
    dateOfOrder: "2026-05-01",
    products: mockProducts.slice(0, 2).map((pro) => ({
      product: { ...pro },
      quantity: 1,
    })),
    total: 12990,
    fulfillmentStatus: "Pendiente",
    paymentStatus: "pendiente",
    hasPrescription: false,
    shippingAddress: {
      name: "Nicolás Venegas",
      houseName: "Casa 12",
      district: "Quillota",
      state: "Valparaíso",
      country: "Chile",
      pincode: "2260000",
      phoneNumber: "+56987654321",
    },
  },
  {
    id: "MED-1002",
    dateOfOrder: "2026-05-02",
    products: mockProducts.slice(2, 4).map((pro) => ({
      product: { ...pro },
      quantity: 2,
    })),
    total: 24990,
    fulfillmentStatus: "En preparación",
    paymentStatus: "pagado",
    hasPrescription: true, // incluye antibiótico
    shippingAddress: {
      name: "María González",
      houseName: "Depto 45B",
      district: "Viña del Mar",
      state: "Valparaíso",
      country: "Chile",
      pincode: "2520000",
      phoneNumber: "+56991234567",
    },
  },
  {
    id: "MED-1003",
    dateOfOrder: "2026-05-03",
    products: mockProducts.slice(1, 5).map((pro) => ({
      product: { ...pro },
      quantity: 1,
    })),
    total: 18990,
    fulfillmentStatus: "Enviado",
    paymentStatus: "pagado",
    hasPrescription: true,
    shippingAddress: {
      name: "Carlos Rojas",
      houseName: "Parcela 8",
      district: "La Calera",
      state: "Valparaíso",
      country: "Chile",
      pincode: "2290000",
      phoneNumber: "+56999887766",
    },
  },
  {
    id: "MED-1004",
    dateOfOrder: "2026-05-04",
    products: mockProducts.slice(0, 1).map((pro) => ({
      product: { ...pro },
      quantity: 3,
    })),
    total: 9990,
    fulfillmentStatus: "Entregado",
    paymentStatus: "pagado",
    hasPrescription: false,
    shippingAddress: {
      name: "Fernanda Soto",
      houseName: "Casa 3",
      district: "San Felipe",
      state: "Valparaíso",
      country: "Chile",
      pincode: "2170000",
      phoneNumber: "+56988776655",
    },
  },
  {
    id: "MED-1005",
    dateOfOrder: "2026-05-05",
    products: mockProducts.slice(3, 6).map((pro) => ({
      product: { ...pro },
      quantity: 1,
    })),
    total: 15990,
    fulfillmentStatus: "Cancelado",
    paymentStatus: "pendiente",
    hasPrescription: false,
    shippingAddress: {
      name: "Javier Morales",
      houseName: "Depto 12",
      district: "Santiago",
      state: "Región Metropolitana",
      country: "Chile",
      pincode: "8320000",
      phoneNumber: "+56977665544",
    },
  },
  {
    id: "MED-1006",
    dateOfOrder: "2026-05-06",
    products: mockProducts.slice(4, 7).map((pro) => ({
      product: { ...pro },
      quantity: 2,
    })),
    total: 28990,
    fulfillmentStatus: "En preparación",
    paymentStatus: "pendiente",
    hasPrescription: true,
    shippingAddress: {
      name: "Camila Torres",
      houseName: "Casa 21",
      district: "Concón",
      state: "Valparaíso",
      country: "Chile",
      pincode: "2510000",
      phoneNumber: "+56966554433",
    },
  },
];

export default mockOrders;