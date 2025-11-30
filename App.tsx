
import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import AdminPanel from './components/AdminPanel';
import Checkout from './components/Checkout';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Login from './components/Login';
import Chatbot from './components/Chatbot';
import ProductDetails from './components/ProductDetails';

const AppContent: React.FC = () => {
  const { view, language } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow bg-gray-50">
        {view === 'shop' && <Shop />}
        {view === 'product-details' && <ProductDetails />}
        {view === 'login' && <Login />}
        {view === 'admin' && <AdminPanel />}
        {(view === 'checkout' || view === 'success') && <Checkout />}
      </main>

      <Chatbot />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
