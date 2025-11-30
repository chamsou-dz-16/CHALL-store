
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, Product } from '../types';
import Hero from './Hero';
import { Plus, Search, PlayCircle, Star, Heart } from 'lucide-react';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, t, openProductDetails } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );

  return (
    <div 
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 cursor-pointer"
      onClick={() => openProductDetails(product)}
    >
      <div className="relative pt-[110%] overflow-hidden bg-gray-100">
         {/* Zoom Effect on Hover */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Discount Badge */}
        {product.discount && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                -{product.discount}%
            </div>
        )}

        {/* Wishlist Button */}
        <button 
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white text-gray-400 hover:text-red-500 transition-colors shadow-sm z-10"
            onClick={(e) => { e.stopPropagation(); /* Add to wishlist logic */ }}
        >
            <Heart size={18} />
        </button>

        {/* Category Label */}
        <div className="absolute bottom-2 left-2 rtl:left-auto rtl:right-2 pointer-events-none z-10">
          <span className="bg-white/90 backdrop-blur-sm text-chall-dark text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
            {t(`cat.${product.category}`)}
          </span>
        </div>
        
        {/* Video Indicator */}
        {product.video && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                 <div className="bg-white/90 rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-110 transition-transform">
                     <PlayCircle size={32} className="text-chall-orange fill-current" />
                 </div>
            </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center mb-1">
            <div className="flex text-yellow-400 text-xs">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < Math.floor(product.rating || 5) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating || 5) ? 0 : 2} />
                ))}
            </div>
            <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-2 min-h-[2.5rem]" title={product.name}>
            {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-3">
             <span className="text-xl font-bold text-chall-orange">{product.price.toLocaleString('fr-DZ')} DA</span>
             {product.discount && (
                 <span className="text-sm text-gray-400 line-through">
                     {Math.round(product.price * (1 + product.discount / 100)).toLocaleString('fr-DZ')} DA
                 </span>
             )}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => addToCart(product, selectedSize)}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-bold text-white transition-all transform active:scale-95 ${
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
        </div>
      </div>
    </div>
  );
};

const Shop: React.FC = () => {
  const { products, t } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Tout' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Flash Sale Banner */}
        <div className="bg-gradient-to-r from-red-500 to-chall-orange rounded-lg shadow-lg p-4 mb-8 text-white flex justify-between items-center transform hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-4">
                <span className="bg-white text-red-600 font-bold px-3 py-1 rounded text-sm animate-pulse">FLASH SALE</span>
                <p className="font-medium hidden sm:block">Jusqu'à -50% sur la sélection hiver !</p>
            </div>
            <div className="font-mono font-bold text-xl">04:22:15</div>
        </div>

        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900 w-full md:w-auto flex items-center gap-2">
                <span className="w-1 h-6 bg-chall-orange rounded-full"></span>
                {t('shop.collection')}
            </h2>
            
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md group">
                <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pr-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-chall-orange transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-chall-orange focus:ring-2 focus:ring-chall-orange/20 sm:text-sm shadow-sm transition-all"
                    placeholder={t('shop.search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>
          
          {/* Filter Categories */}
          <div className="flex overflow-x-auto space-x-3 rtl:space-x-reverse pb-2 scrollbar-hide">
             <button
                onClick={() => setSelectedCategory('Tout')}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'Tout'
                    ? 'bg-gray-900 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {t('shop.all')}
              </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {t(`cat.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 mt-8">
                <p className="text-xl text-gray-500 font-medium">{t('shop.empty')}</p>
                <button 
                    onClick={() => {setSelectedCategory('Tout'); setSearchQuery('');}}
                    className="mt-4 text-chall-orange hover:underline"
                >
                    Voir tous les produits
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
