export type ProductCategory = 'Cakes' | 'Cupcakes' | 'Brownies' | 'Cookies';

export interface ProductSize {
  id: string;
  label: string;
  weightOrQuantity: string;
  price: number;
  servings?: string;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  longDescription: string;
  basePrice: number;
  image: string;
  gallery?: string[];
  sizes: ProductSize[];
  isEggless: boolean;
  egglessAvailable: boolean;
  ingredientsHighlight: string[];
  dietaryNotes: string;
  leadTimeHours: number;
  tags: string[];
  bestFor: string;
  available: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
  cakeMessage?: string;
  specialInstructions?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  deliveryMethod: 'delivery' | 'pickup';
  address: string;
  landmark?: string;
  pincode?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFeeEstimated: number;
  total: number;
  status: 'pending_whatsapp' | 'confirmed' | 'dispatched';
}
