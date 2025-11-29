import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import AdminPanel from './components/AdminPanel';
import Checkout from './components/Checkout';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Login from './components/Login';

const AppContent: React.FC = () => {
  const { view } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        {view === 'shop' && <Shop />}
        {view === 'login' && <Login />}
        {view === 'admin' && <AdminPanel />}
        {(view === 'checkout' || view === 'success') && <Checkout />}
      </main>

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