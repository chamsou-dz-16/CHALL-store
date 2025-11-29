import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, Product } from '../types';
import Hero from './Hero';
import { Plus } from 'lucide-react';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, t } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="relative pt-[100%] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
          <span className="bg-white/90 backdrop-blur-sm text-chall-dark text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            {t(`cat.${product.category}`)}
          </span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={product.name}>{product.name}</h3>
          <p className="text-lg font-bold text-chall-orange whitespace-nowrap">{product.price.toLocaleString('fr-DZ')} DA</p>
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{product.description}</p>
        
        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{t('shop.size')}</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                    selectedSize === size 
                    ? 'border-chall-orange bg-chall-orange text-white' 
                    : 'border-gray-200 text-gray-700 hover:border-chall-orange'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={() => addToCart(product, selectedSize)}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white transition-colors ${
              product.stock > 0
                ? 'bg-chall-dark hover:bg-chall-orange shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? (
              <>
                <Plus size={18} className="me-2" />
                {t('shop.add_cart')}
              </>
            ) : (
              t('shop.out_stock')
            )}
          </button>
          {product.stock > 0 && product.stock < 5 && (
            <p className="text-xs text-chall-red mt-2 text-center font-medium">{t('shop.remaining', { qty: product.stock })}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Shop: React.FC = () => {
  const { products, t } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout');

  const filteredProducts = selectedCategory === 'Tout'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0">{t('shop.collection')}</h2>
          
          {/* Filter Categories */}
          <div className="flex overflow-x-auto space-x-2 rtl:space-x-reverse pb-2 md:pb-0 scrollbar-hide">
             <button
                onClick={() => setSelectedCategory('Tout')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'Tout'
                    ? 'bg-chall-orange text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {t('shop.all')}
              </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-chall-orange text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {t(`cat.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center py-20">
                <p className="text-xl text-gray-500">{t('shop.empty')}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Shop;