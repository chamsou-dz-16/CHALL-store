
import React from 'react';
import { ShoppingCart, Menu, X, LogOut, Lock, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Logo from './Logo';

const Navbar: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { cart, view, setView, isAdmin, logout, language, setLanguage, t } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleLanguage = (lang: 'fr' | 'en' | 'ar') => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setView('shop')}>
            <Logo className="h-12" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <button 
              onClick={() => setView('shop')}
              className={`${view === 'shop' ? 'text-chall-orange font-bold' : 'text-gray-600'} hover:text-chall-orange transition text-base uppercase tracking-wide`}
            >
              {t('nav.shop')}
            </button>
            
            <button 
              onClick={() => isAdmin ? setView('admin') : setView('login')}
              className={`${view === 'admin' || view === 'login' ? 'text-chall-red font-bold' : 'text-gray-600'} hover:text-chall-red transition text-base uppercase tracking-wide`}
            >
              {t('nav.admin')}
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Language Selector */}
            <div className="relative">
                <button 
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="p-2 text-gray-500 hover:text-chall-orange transition flex items-center rounded-full hover:bg-gray-100"
                >
                    <Globe size={20} className="me-1" />
                    <span className="uppercase font-bold text-xs">{language}</span>
                </button>
                
                {isLangOpen && (
                    <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-32 bg-white rounded-md shadow-xl py-1 z-50 ring-1 ring-black ring-opacity-5 animate-fadeIn">
                        <button onClick={() => toggleLanguage('fr')} className="block w-full text-left rtl:text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Français</button>
                        <button onClick={() => toggleLanguage('en')} className="block w-full text-left rtl:text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</button>
                        <button onClick={() => toggleLanguage('ar')} className="block w-full text-left rtl:text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-arabic">العربية</button>
                    </div>
                )}
            </div>

             {/* Admin / Login / Logout */}
             {isAdmin ? (
               <button 
                onClick={logout}
                className="p-2 rounded-full bg-red-50 text-chall-red hover:bg-red-100 transition"
                title={t('nav.logout')}
              >
                <LogOut size={22} className={language === 'ar' ? 'rotate-180' : ''} />
              </button>
             ) : (
              <button 
                onClick={() => setView('login')}
                className="p-2 rounded-full text-gray-500 hover:text-chall-dark hover:bg-gray-100 transition"
                title={t('nav.login')}
              >
                 <Lock size={22} />
              </button>
             )}

            {!isAdmin && (
              <button 
                onClick={onOpenCart}
                className="relative p-2 text-gray-600 hover:text-chall-orange transition hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 rtl:right-auto rtl:left-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white transform translate-x-1/4 rtl:-translate-x-1/4 -translate-y-1/4 bg-chall-orange rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2 rtl:ml-0 rtl:mr-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => { setView('shop'); setIsMenuOpen(false); }}
              className="block w-full text-left rtl:text-right px-3 py-3 text-base font-bold text-gray-800 hover:text-chall-orange hover:bg-gray-50 rounded-md"
            >
              {t('nav.shop')}
            </button>
            <button 
                onClick={() => { setView(isAdmin ? 'admin' : 'login'); setIsMenuOpen(false); }}
                className="block w-full text-left rtl:text-right px-3 py-3 text-base font-bold text-gray-800 hover:text-chall-red hover:bg-gray-50 rounded-md"
            >
              {t('nav.admin')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
