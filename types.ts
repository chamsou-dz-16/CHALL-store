
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  gallery?: string[];
  stock: number;
  sizes?: string[];
  video?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  specs?: Record<string, string>; // New: For Detailed Specs Tab
  features?: string[]; // New: Bullet points
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  customerName: string;
  paymentMethod: 'cod' | 'beridimob';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'vip' | 'blocked';
  joinDate: string;
}

export interface StoreSettings {
  general: {
    storeName: string;
    email: string;
    phone: string;
    currency: string;
  };
  payment: {
    codEnabled: boolean;
    beridimobEnabled: boolean;
    beridimobInstructions: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardRate: number;
  };
  security: {
    admin2FA: boolean;
  };
}

export type ViewState = 'shop' | 'admin' | 'checkout' | 'success' | 'login' | 'product-details';

export type Language = 'fr' | 'en' | 'ar';

export const CATEGORIES = ['Homme', 'Femme', 'Cosmétique', 'Accessoires', 'Électronique', 'Maison'];
