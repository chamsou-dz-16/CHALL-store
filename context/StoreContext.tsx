import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem, Order, ViewState, Language } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { translations } from '../translations';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  view: ViewState;
  setView: (view: ViewState) => void;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartQuantity: (productId: string, size: string | undefined, delta: number) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  placeOrder: (customerName: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<ViewState>('shop');
  const [isAdmin, setIsAdmin] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[key]?.[language] || key;
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            text = text.replace(`{${k}}`, String(v));
        });
    }
    return text;
  };

  const addToCart = (product: Product, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
             ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.selectedSize === size)));
  };

  const updateCartQuantity = (productId: string, size: string | undefined, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.selectedSize === size) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const placeOrder = (customerName: string) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      items: [...cart],
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: 'pending',
      customerName,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setView('success');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const login = (u: string, p: string) => {
    if (u === 'admin' && p === 'chall0662219484@') {
      setIsAdmin(true);
      setView('admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setView('shop');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        view,
        setView,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        placeOrder,
        updateOrderStatus,
        isAdmin,
        login,
        logout,
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};