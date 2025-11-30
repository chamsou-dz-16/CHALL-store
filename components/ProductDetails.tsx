
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, ShieldCheck, RefreshCw, PlayCircle, Box, Share2, Info, ChevronRight, Check } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { selectedProduct, products, setView, addToCart, t, language } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    selectedProduct?.sizes && selectedProduct.sizes.length > 0 ? selectedProduct.sizes[0] : undefined
  );
  const [currentMedia, setCurrentMedia] = useState<'image' | 'video'>('image');
  const [currentImage, setCurrentImage] = useState(selectedProduct?.image || '');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;

  const images = selectedProduct.gallery && selectedProduct.gallery.length > 0 
    ? selectedProduct.gallery 
    : [selectedProduct.image];

  // Bundles: Find 2 other products from same category
  const bundleProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 2);

  return (
    <div className="bg-gray-50 min-h-screen pb-12 font-sans">
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
          <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center text-sm text-gray-500">
             <button onClick={() => setView('shop')} className="hover:text-chall-orange flex items-center">
                {language === 'ar' ? <ArrowLeft size={16} className="rotate-180 ml-1"/> : <ArrowLeft size={16} className="mr-1"/>}
                {t('shop.all')}
             </button>
             <ChevronRight size={14} className="mx-2" />
             <span>{selectedProduct.category}</span>
             <ChevronRight size={14} className="mx-2" />
             <span className="text-gray-900 font-medium truncate">{selectedProduct.name}</span>
          </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* COLUMN 1: Visuals (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm relative group">
              {currentMedia === 'video' && selectedProduct.video ? (
                <video 
                  src={selectedProduct.video} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              ) : (
                <img 
                  src={currentImage} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
                />
              )}
              {/* AR Button Simulation */}
              <button className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-800 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-1 hover:bg-white">
                 <Box size={14} /> Voir en 3D
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
              {selectedProduct.video && (
                <button
                  onClick={() => setCurrentMedia('video')}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${currentMedia === 'video' ? 'border-chall-orange' : 'border-transparent'}`}
                >
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <PlayCircle className="text-white w-6 h-6" />
                  </div>
                  <img src={selectedProduct.image} className="w-full h-full object-cover" />
                </button>
              )}
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentImage(img); setCurrentMedia('image'); }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${currentMedia === 'image' && currentImage === img ? 'border-chall-orange' : 'border-transparent'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Details & Tabs (4 cols) */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
             <div className="flex justify-between items-start">
                 <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">{selectedProduct.name}</h1>
                    <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(selectedProduct.rating || 5) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span className="text-sm text-blue-600 ml-2 hover:underline cursor-pointer">{selectedProduct.reviews || 12} avis clients</span>
                    </div>
                 </div>
                 <button className="text-gray-400 hover:text-gray-600"><Share2 size={20}/></button>
             </div>

             <div className="my-6 border-t border-b border-gray-100 py-4">
                 <div className="flex items-end gap-3">
                     <span className="text-3xl font-extrabold text-chall-red">{selectedProduct.price.toLocaleString('fr-DZ')} DA</span>
                     {selectedProduct.discount && (
                        <div className="flex flex-col mb-1">
                            <span className="text-lg text-gray-400 line-through">
                                {Math.round(selectedProduct.price * (1 + selectedProduct.discount / 100)).toLocaleString('fr-DZ')} DA
                            </span>
                            <span className="text-xs font-bold text-red-600 bg-red-50 px-1 rounded">-{selectedProduct.discount}%</span>
                        </div>
                     )}
                 </div>
                 <p className="text-xs text-gray-500 mt-1">Toutes taxes comprises. Livraison calculée à la commande.</p>
             </div>

             {/* TABS */}
             <div className="mt-6">
                 <div className="flex border-b border-gray-200">
                     <button 
                        onClick={() => setActiveTab('desc')}
                        className={`pb-2 px-4 text-sm font-medium ${activeTab === 'desc' ? 'border-b-2 border-chall-orange text-chall-orange' : 'text-gray-500'}`}
                     >Description</button>
                     <button 
                        onClick={() => setActiveTab('specs')}
                        className={`pb-2 px-4 text-sm font-medium ${activeTab === 'specs' ? 'border-b-2 border-chall-orange text-chall-orange' : 'text-gray-500'}`}
                     >Spécifications</button>
                     <button 
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-2 px-4 text-sm font-medium ${activeTab === 'reviews' ? 'border-b-2 border-chall-orange text-chall-orange' : 'text-gray-500'}`}
                     >Avis</button>
                 </div>
                 <div className="py-4 text-sm text-gray-600 leading-relaxed min-h-[150px]">
                     {activeTab === 'desc' && <p>{selectedProduct.description}</p>}
                     {activeTab === 'specs' && (
                         <ul className="space-y-2">
                             {selectedProduct.specs ? Object.entries(selectedProduct.specs).map(([k,v]) => (
                                 <li key={k} className="flex justify-between border-b border-gray-50 pb-1">
                                     <span className="font-medium">{k}</span> <span>{v}</span>
                                 </li>
                             )) : <li className="text-gray-400 italic">Aucune spécification technique disponible.</li>}
                         </ul>
                     )}
                     {activeTab === 'reviews' && (
                         <div className="space-y-4">
                             <div className="flex items-start gap-3">
                                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">A</div>
                                 <div>
                                     <div className="flex text-yellow-400 w-20"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                                     <p className="font-bold text-xs mt-1">Amine B. <span className="text-green-600 text-[10px] font-normal border border-green-200 rounded px-1 ml-1">Achat Vérifié</span></p>
                                     <p className="mt-1">Excellent produit, très satisfait de la qualité !</p>
                                 </div>
                             </div>
                         </div>
                     )}
                 </div>
             </div>
             
             {/* Bundles */}
             {bundleProducts.length > 0 && (
                 <div className="mt-6 bg-orange-50 p-4 rounded-lg border border-orange-100">
                     <h3 className="font-bold text-gray-900 text-sm mb-3">Souvent achetés ensemble</h3>
                     <div className="flex gap-4 overflow-x-auto">
                         {bundleProducts.map(bp => (
                             <div key={bp.id} className="flex-shrink-0 w-24">
                                 <img src={bp.image} className="w-24 h-24 object-cover rounded-md border border-white shadow-sm" />
                                 <p className="text-xs truncate mt-1">{bp.name}</p>
                                 <p className="text-xs font-bold text-chall-orange">{bp.price} DA</p>
                             </div>
                         ))}
                     </div>
                 </div>
             )}
          </div>

          {/* COLUMN 3: Sticky Buy Box (3 cols) */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
             <div className="sticky top-24 bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                 <div className="text-green-600 font-bold text-sm mb-4 flex items-center gap-1">
                     <Check size={16} /> En Stock
                 </div>

                 {selectedProduct.sizes && (
                     <div className="mb-4">
                         <label className="block text-sm font-medium text-gray-700 mb-1">{t('shop.size')}: <span className="font-bold">{selectedSize}</span></label>
                         <div className="flex flex-wrap gap-2">
                             {selectedProduct.sizes.map(s => (
                                 <button 
                                    key={s}
                                    onClick={() => setSelectedSize(s)}
                                    className={`px-3 py-1 border rounded text-sm ${selectedSize === s ? 'border-chall-orange bg-orange-50 text-chall-orange font-bold' : 'border-gray-200 hover:border-gray-300'}`}
                                 >{s}</button>
                             ))}
                         </div>
                     </div>
                 )}

                 <div className="flex items-center gap-3 mb-6">
                     <label className="text-sm font-medium">Quantité:</label>
                     <select value={qty} onChange={e => setQty(Number(e.target.value))} className="border border-gray-300 rounded-md p-1 text-sm">
                         {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                     </select>
                 </div>

                 <button 
                    onClick={() => {
                        for(let i=0; i<qty; i++) addToCart(selectedProduct, selectedSize);
                    }}
                    disabled={selectedProduct.stock === 0}
                    className="w-full bg-chall-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full shadow-md transition-transform active:scale-95 mb-3 flex justify-center items-center gap-2"
                 >
                     <ShoppingCart size={18} /> {t('shop.add_cart')}
                 </button>
                 
                 <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-full transition-colors flex justify-center items-center gap-2">
                     <Heart size={18} /> Ajouter aux favoris
                 </button>

                 <div className="mt-6 space-y-3 text-xs text-gray-500">
                     <div className="flex items-center gap-2"><Truck size={14} className="text-gray-400"/> Expédié par Chall</div>
                     <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-gray-400"/> Transaction sécurisée</div>
                     <div className="flex items-center gap-2"><RefreshCw size={14} className="text-gray-400"/> Politique de retour 15 jours</div>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
