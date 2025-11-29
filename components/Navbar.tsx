import React from 'react';
import { ShoppingCart, Menu, X, UserCog, Store, LogOut, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Logo from './Logo';

const Navbar: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { cart, view, setView, isAdmin, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-chall-white sticky top-0 z-50 shadow-md border-b-4 border-chall-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setView('shop')}>
            <Logo className="h-14" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => setView('shop')}
              className={`${view === 'shop' ? 'text-chall-orange font-bold' : 'text-gray-500'} hover:text-chall-orange transition text-lg`}
            >
              Boutique
            </button>
            
            <button 
              onClick={() => isAdmin ? setView('admin') : setView('login')}
              className={`${view === 'admin' || view === 'login' ? 'text-chall-red font-bold' : 'text-gray-500'} hover:text-chall-red transition text-lg`}
            >
              Administration
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
             {/* Admin / Login / Logout */}
             {isAdmin ? (
               <button 
                onClick={logout}
                className="p-2 rounded-full bg-red-50 text-chall-red hover:bg-red-100 transition"
                title="Se déconnecter"
              >
                <LogOut size={24} />
              </button>
             ) : (
              <button 
                onClick={() => setView('login')}
                className="p-2 rounded-full text-gray-400 hover:text-chall-red hover:bg-gray-100 transition"
                title="Connexion Admin"
              >
                 <Lock size={24} />
              </button>
             )}

            {!isAdmin && (
              <button 
                onClick={onOpenCart}
                className="relative p-2 text-gray-600 hover:text-chall-orange transition"
              >
                <ShoppingCart size={28} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-chall-orange rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => { setView('shop'); setIsMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-chall-orange hover:bg-gray-50"
            >
              Boutique
            </button>
            <button 
                onClick={() => { setView(isAdmin ? 'admin' : 'login'); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-chall-red hover:bg-gray-50"
            >
              Administration
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;