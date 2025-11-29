export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  sizes?: string[];
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
  status: 'pending' | 'shipped' | 'delivered';
  customerName: string;
}

export type ViewState = 'shop' | 'admin' | 'checkout' | 'success' | 'login';

export const CATEGORIES = ['Homme', 'Femme', 'Cosmétique', 'Accessoires'];