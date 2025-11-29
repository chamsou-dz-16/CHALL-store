import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, placeOrder, setView, view, t, language } = useStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: ''
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(`${formData.firstName} ${formData.lastName}`);
  };

  if (view === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <CheckCircle className="text-chall-orange w-24 h-24 mb-6" />
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t('checkout.success_title')}</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          {t('checkout.success_msg')}
        </p>
        <button
          onClick={() => setView('shop')}
          className="bg-chall-orange text-white px-8 py-3 rounded-md font-medium hover:bg-orange-600 transition"
        >
          {t('checkout.return_shop')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
            onClick={() => setView('shop')}
            className="flex items-center text-gray-600 hover:text-chall-orange mb-8 transition"
        >
            {language === 'ar' ? <ArrowRight className="me-2" size={20}/> : <ArrowLeft className="me-2" size={20}/>}
            {t('checkout.back')}
        </button>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{t('checkout.title')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            
            {/* Order Summary */}
            <div className="md:order-2">
                <h4 className="text-lg font-medium text-gray-900 mb-4">{t('checkout.summary')}</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <ul className="divide-y divide-gray-200 mb-4">
                        {cart.map(item => (
                            <li key={item.id} className="py-2 flex justify-between">
                                <span className="text-sm text-gray-600">{item.quantity}x {item.name}</span>
                                <span className="text-sm font-medium">{(item.price * item.quantity).toLocaleString('fr-DZ')} DA</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-chall-red text-xl">{total.toLocaleString('fr-DZ')} DA</span>
                    </div>
                </div>
            </div>

            {/* Shipping Form */}
            <div className="md:order-1">
                <h4 className="text-lg font-medium text-gray-900 mb-4">{t('checkout.shipping_info')}</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('checkout.firstname')}</label>
                            <input 
                                required
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-chall-orange focus:border-chall-orange"
                                value={formData.firstName}
                                onChange={e => setFormData({...formData, firstName: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('checkout.lastname')}</label>
                            <input 
                                required
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-chall-orange focus:border-chall-orange"
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('checkout.address')}</label>
                        <input 
                            required
                            type="text" 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-chall-orange focus:border-chall-orange"
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('checkout.city')}</label>
                            <input 
                                required
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-chall-orange focus:border-chall-orange"
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('checkout.phone')}</label>
                            <input 
                                required
                                type="tel" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-chall-orange focus:border-chall-orange"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-chall-orange text-white py-3 px-4 rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chall-orange transition shadow-md"
                        >
                            {t('checkout.confirm')}
                        </button>
                    </div>
                </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;