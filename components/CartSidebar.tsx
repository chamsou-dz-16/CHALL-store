import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity, setView } = useStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <ShoppingBag className="mr-2" />
                    Votre Panier
                </h2>
                <button
                  type="button"
                  className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Votre panier est vide.</p>
                    <button 
                        onClick={onClose}
                        className="mt-4 text-chall-orange hover:underline font-medium"
                    >
                        Continuer vos achats
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {cart.map((item, index) => (
                      <li key={`${item.id}-${item.selectedSize || 'nosize'}-${index}`} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-1 mr-2">{item.name}</h3>
                              <p className="whitespace-nowrap">{item.price.toLocaleString('fr-DZ')} DA</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            {item.selectedSize && (
                                <p className="mt-1 text-sm text-chall-orange font-medium">Taille : {item.selectedSize}</p>
                            )}
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex items-center border rounded-md">
                                <button 
                                    onClick={() => updateCartQuantity(item.id, item.selectedSize, -1)}
                                    className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                >-</button>
                                <span className="px-2 py-1 text-gray-900 font-medium">{item.quantity}</span>
                                <button 
                                    onClick={() => updateCartQuantity(item.id, item.selectedSize, 1)}
                                    className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                >+</button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id, item.selectedSize)}
                              className="font-medium text-chall-red hover:text-red-800 flex items-center"
                            >
                              <Trash2 size={16} className="mr-1" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Sous-total</p>
                  <p>{total.toLocaleString('fr-DZ')} DA</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 mb-6">
                  Taxes et frais de livraison calculés à la commande.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                        onClose();
                        setView('checkout');
                    }}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-chall-orange hover:bg-orange-600 transition"
                  >
                    Commander
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;