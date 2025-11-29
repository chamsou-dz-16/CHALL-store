import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useStore } from '../context/StoreContext';

const Footer: React.FC = () => {
  const { t } = useStore();
  return (
    <footer className="bg-chall-dark text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4 bg-white/10 p-2 rounded-lg w-fit">
                <Logo className="h-10" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center">
                    <MapPin size={18} className="me-2 text-chall-orange"/>
                    123 Rue Didouche Mourad, Alger
                </li>
                <li className="flex items-center">
                    <Phone size={18} className="me-2 text-chall-orange"/>
                    <a href="tel:+213659827782" className="hover:text-white transition">+213 659 82 77 82</a>
                </li>
                <li className="flex items-center">
                    <Mail size={18} className="me-2 text-chall-orange"/>
                    <a href="mailto:aouadichamseddine@gmail.com" className="hover:text-white transition">aouadichamseddine@gmail.com</a>
                </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
             <h3 className="text-lg font-bold mb-4 text-orange-400">{t('footer.follow')}</h3>
             <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-2 rounded-full hover:bg-chall-orange transition">
                    <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-2 rounded-full hover:bg-chall-orange transition">
                    <Instagram size={20} />
                </a>
                <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-chall-orange transition">
                    <Twitter size={20} />
                </a>
             </div>
             <p className="mt-4 text-xs text-gray-500">
                 Abonnez-vous à notre newsletter pour les nouveautés.
             </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Chall. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;