// These shapes mirror the MongoDB schema planned for the backend,
// so moving from mock data to a real API later is a small change.

export type CategoryId = 'nuts' | 'dried-fruits' | 'dates' | 'berries' | 'seeds' | 'gift-packs';

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
}

export interface Variant {
  id: string;
  label: string; // e.g. '250g'
  weightGrams: number;
  mrp: number; // paise
  price: number; // paise
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  emoji: string;
  hue: number; // used for the placeholder card colour until real photos exist
  description: string;
  origin: string;
  shelfLifeDays: number;
  tags: string[];
  variants: Variant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  qty: number;
}

export interface CartLine {
  product: Product;
  variant: Variant;
  qty: number;
  lineTotal: number; // paise
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  placedAt: string; // ISO date
  customer: CustomerDetails;
  lines: { name: string; label: string; qty: number; lineTotal: number }[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'cod';
}
