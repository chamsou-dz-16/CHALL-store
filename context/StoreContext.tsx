
import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem, Order, ViewState, Language, StoreSettings, Customer } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { translations } from '../translations';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  customers: Customer[];
  settings: StoreSettings;
  view: ViewState;
  selectedProduct: Product | null;
  setView: (view: ViewState) => void;
  openProductDetails: (product: Product) => void;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartQuantity: (productId: string, size: string | undefined, delta: number) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  placeOrder: (customerName: string, paymentMethod: 'cod' | 'beridimob') => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  isAdmin: boolean;
  login: (username: string, password: string, remember: boolean) => boolean;
  logout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleRememberMe: (value: boolean) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Enterprise Features State
  const [customers, setCustomers] = useState<Customer[]>([
      { id: '1', name: 'Amine Benali', email: 'amine@example.com', totalOrders: 5, totalSpent: 25000, status: 'vip', joinDate: '2023-01-15' },
      { id: '2', name: 'Sarah Kader', email: 'sarah@example.com', totalOrders: 2, totalSpent: 8000, status: 'active', joinDate: '2023-03-20' },
  ]);
  
  const [settings, setSettingsState] = useState<StoreSettings>({
      general: { storeName: 'Chall', email: 'contact@chall.com', phone: '+213 659 82 77 82', currency: 'DZD' },
      payment: { codEnabled: true, beridimobEnabled: false, beridimobInstructions: 'CCP: 0000000 CLE 00 - Nom: Chall Store' },
      shipping: { freeShippingThreshold: 10000, standardRate: 500 },
      security: { admin2FA: false }
  });

  const [view, setView] = useState<ViewState>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('chall_is_admin') === 'true' || 
           sessionStorage.getItem('chall_is_admin') === 'true';
  });
  
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

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setView('product-details');
    window.scrollTo(0, 0);
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

  const placeOrder = (customerName: string, paymentMethod: 'cod' | 'beridimob') => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      items: [...cart],
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: 'pending',
      customerName,
      paymentMethod
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

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
      setSettingsState(prev => ({...prev, ...newSettings}));
  }

  const login = (u: string, p: string, remember: boolean) => {
    if (u === 'admin' && p === 'chall0662219484@') {
      setIsAdmin(true);
      setView('admin');
      if (remember) {
        localStorage.setItem('chall_is_admin', 'true');
        sessionStorage.removeItem('chall_is_admin');
      } else {
        sessionStorage.setItem('chall_is_admin', 'true');
        localStorage.removeItem('chall_is_admin');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setView('shop');
    localStorage.removeItem('chall_is_admin');
    sessionStorage.removeItem('chall_is_admin');
  };

  const toggleRememberMe = (value: boolean) => {
    if (isAdmin) {
      if (value) {
        localStorage.setItem('chall_is_admin', 'true');
        sessionStorage.removeItem('chall_is_admin');
      } else {
        sessionStorage.setItem('chall_is_admin', 'true');
        localStorage.removeItem('chall_is_admin');
      }
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        customers,
        settings,
        view,
        selectedProduct,
        setView,
        openProductDetails,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        placeOrder,
        updateOrderStatus,
        updateSettings,
        isAdmin,
        login,
        logout,
        language,
        setLanguage,
        toggleRememberMe,
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
