
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, CATEGORIES, StoreSettings } from '../types';
import { Trash2, Edit, Package, ShoppingBag, Plus, Sparkles, Loader2, Save, X, Settings, Shield, BarChart3, TrendingUp, DollarSign, Users, Globe, Truck, CreditCard, LayoutDashboard, Search, Bot } from 'lucide-react';
import { generateProductDescription, importProductFromWeb } from '../services/geminiService';

const AdminPanel: React.FC = () => {
  const { products, orders, customers, settings, addProduct, updateProduct, deleteProduct, updateOrderStatus, updateSettings, t } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'importer' | 'customers' | 'settings'>('dashboard');
  
  // Product Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product> & { sizesInput?: string }>({
    name: '', category: CATEGORIES[0], price: 0, description: '', stock: 0, image: '', sizesInput: ''
  });
  
  // AI Importer State
  const [importKeyword, setImportKeyword] = useState('');
  const [importSource, setImportSource] = useState<'amazon' | 'alibaba'>('amazon');
  const [isImporting, setIsImporting] = useState(false);
  const [importedData, setImportedData] = useState<Partial<Product> | null>(null);

  // Settings Sub-tabs
  const [settingsTab, setSettingsTab] = useState<'general' | 'payment' | 'shipping' | 'security'>('general');

  // STATISTICS
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  const handleImport = async () => {
      if (!importKeyword) return;
      setIsImporting(true);
      try {
          const data = await importProductFromWeb(importKeyword, importSource);
          setImportedData(data);
      } finally {
          setIsImporting(false);
      }
  };

  const confirmImport = () => {
      if (importedData) {
          addProduct({
              id: Math.random().toString(36).substr(2, 9),
              name: importedData.name || 'Imported Product',
              category: importedData.category || 'Accessoires',
              price: importedData.price || 0,
              description: importedData.description || '',
              stock: 50,
              image: importedData.image || 'https://picsum.photos/400',
              sizes: [],
              specs: importedData.specs,
              features: importedData.features
          } as Product);
          setImportedData(null);
          setImportKeyword('');
          alert("Product imported successfully!");
      }
  }

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    const sizes = formData.sizesInput ? formData.sizesInput.split(',').map(s => s.trim()) : [];
    const productPayload = {
        id: editingProduct ? editingProduct.id : Math.random().toString(36).substr(2, 9),
        name: formData.name!,
        category: formData.category || 'Accessoires',
        price: Number(formData.price),
        description: formData.description || '',
        stock: Number(formData.stock),
        image: formData.image || 'https://picsum.photos/400',
        sizes
    } as Product;

    if (editingProduct) updateProduct(productPayload);
    else addProduct(productPayload);
    
    setEditingProduct(null);
    setIsEditing(false);
    setFormData({ name: '', category: CATEGORIES[0], price: 0, description: '', stock: 0, image: '', sizesInput: '' });
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
          <div className="p-6 text-2xl font-bold text-chall-orange tracking-tighter">Chall Admin</div>
          <nav className="flex-1 px-4 space-y-2">
              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-chall-orange text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <LayoutDashboard size={20} className="mr-3" /> Tableau de Bord
              </button>
              <button onClick={() => setActiveTab('products')} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-chall-orange text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Package size={20} className="mr-3" /> Produits
              </button>
              <button onClick={() => setActiveTab('orders')} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-chall-orange text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <ShoppingBag size={20} className="mr-3" /> Commandes
              </button>
              <button onClick={() => setActiveTab('importer')} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'importer' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Bot size={20} className="mr-3" /> AI Import Agent
              </button>
              <button onClick={() => setActiveTab('customers')} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'customers' ? 'bg-chall-orange text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Users size={20} className="mr-3" /> Clients
              </button>
              <button onClick={() => setActiveTab('settings')} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-chall-orange text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Settings size={20} className="mr-3" /> Paramètres
              </button>
          </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'dashboard' && (
              <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-8">Vue d'ensemble</h1>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <p className="text-gray-500 text-sm font-medium">Revenu Total</p>
                          <h2 className="text-3xl font-bold text-gray-900 mt-2">{totalRevenue.toLocaleString()} DA</h2>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <p className="text-gray-500 text-sm font-medium">Commandes</p>
                          <h2 className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</h2>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <p className="text-gray-500 text-sm font-medium">Clients</p>
                          <h2 className="text-3xl font-bold text-gray-900 mt-2">{customers.length}</h2>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <p className="text-gray-500 text-sm font-medium">Produits</p>
                          <h2 className="text-3xl font-bold text-gray-900 mt-2">{products.length}</h2>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'importer' && (
              <div className="max-w-4xl mx-auto">
                  <div className="bg-purple-700 text-white p-8 rounded-2xl mb-8 relative overflow-hidden">
                      <div className="relative z-10">
                          <h1 className="text-3xl font-bold mb-2">Agent d'Importation IA</h1>
                          <p className="text-purple-100 max-w-lg">Recherchez n'importe quel produit sur Amazon ou Alibaba. Notre IA générera une fiche produit complète (titre, description, specs) pour votre boutique.</p>
                      </div>
                      <Bot className="absolute right-8 top-8 text-purple-500/30 w-48 h-48" />
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex gap-4 mb-6">
                          <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Mots-clés du produit</label>
                              <div className="relative">
                                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                  <input 
                                    type="text" 
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
                                    placeholder="ex: iPhone 15 Pro Max, Robe Soirée Rouge..."
                                    value={importKeyword}
                                    onChange={(e) => setImportKeyword(e.target.value)}
                                  />
                              </div>
                          </div>
                          <div className="w-1/4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                              <select 
                                value={importSource} 
                                onChange={(e) => setImportSource(e.target.value as any)}
                                className="w-full py-2.5 border border-gray-300 rounded-lg"
                              >
                                  <option value="amazon">Amazon</option>
                                  <option value="alibaba">Alibaba</option>
                              </select>
                          </div>
                          <div className="flex items-end">
                              <button 
                                onClick={handleImport}
                                disabled={isImporting || !importKeyword}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center disabled:opacity-50"
                              >
                                  {isImporting ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2"/>}
                                  Générer
                              </button>
                          </div>
                      </div>

                      {importedData && (
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 animate-fadeIn">
                              <h3 className="font-bold text-gray-900 mb-4">Aperçu du produit généré</h3>
                              <div className="flex gap-6">
                                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex-shrink-0">
                                      <img src={importedData.image} className="w-full h-full object-cover rounded-lg"/>
                                  </div>
                                  <div className="flex-1 space-y-3">
                                      <input className="w-full font-bold text-lg bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none" defaultValue={importedData.name} />
                                      <div className="flex gap-4">
                                          <input className="w-32 font-bold text-chall-orange bg-transparent border-b border-gray-300" defaultValue={importedData.price} /> <span className="text-gray-500 self-center">DA</span>
                                      </div>
                                      <textarea className="w-full h-24 text-sm text-gray-600 bg-transparent border border-gray-300 rounded p-2" defaultValue={importedData.description} />
                                      
                                      <div className="flex justify-end pt-4">
                                          <button onClick={() => setImportedData(null)} className="text-gray-500 mr-4">Annuler</button>
                                          <button onClick={confirmImport} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg">Confirmer & Importer</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          )}

          {activeTab === 'settings' && (
              <div>
                  <h1 className="text-2xl font-bold mb-6">Paramètres de la Boutique</h1>
                  <div className="flex gap-8">
                      <div className="w-64 space-y-1">
                          <button onClick={() => setSettingsTab('general')} className={`w-full text-left px-4 py-2 rounded-md ${settingsTab === 'general' ? 'bg-white font-bold shadow-sm' : 'text-gray-600'}`}>Général</button>
                          <button onClick={() => setSettingsTab('payment')} className={`w-full text-left px-4 py-2 rounded-md ${settingsTab === 'payment' ? 'bg-white font-bold shadow-sm' : 'text-gray-600'}`}>Paiements</button>
                          <button onClick={() => setSettingsTab('shipping')} className={`w-full text-left px-4 py-2 rounded-md ${settingsTab === 'shipping' ? 'bg-white font-bold shadow-sm' : 'text-gray-600'}`}>Livraison</button>
                          <button onClick={() => setSettingsTab('security')} className={`w-full text-left px-4 py-2 rounded-md ${settingsTab === 'security' ? 'bg-white font-bold shadow-sm' : 'text-gray-600'}`}>Sécurité</button>
                      </div>
                      
                      <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                          {settingsTab === 'payment' && (
                              <div className="space-y-6">
                                  <h3 className="text-lg font-bold border-b pb-2">Modes de Paiement</h3>
                                  
                                  {/* Cash On Delivery */}
                                  <div className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                                      <div className="flex gap-3">
                                          <div className="p-2 bg-green-100 rounded text-green-700"><DollarSign size={24}/></div>
                                          <div>
                                              <h4 className="font-bold text-gray-900">Paiement à la livraison (Cash)</h4>
                                              <p className="text-sm text-gray-500">Le client paie en espèces lors de la réception du colis.</p>
                                          </div>
                                      </div>
                                      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                          <input type="checkbox" checked={settings.payment.codEnabled} onChange={e => updateSettings({payment: {...settings.payment, codEnabled: e.target.checked}})} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                          <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${settings.payment.codEnabled ? 'bg-green-400' : 'bg-gray-300'}`}></label>
                                      </div>
                                  </div>

                                  {/* Beridimob */}
                                  <div className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                                      <div className="flex gap-3">
                                          <div className="p-2 bg-yellow-100 rounded text-yellow-700"><CreditCard size={24}/></div>
                                          <div>
                                              <h4 className="font-bold text-gray-900">Beridimob / CCP</h4>
                                              <p className="text-sm text-gray-500">Paiement par virement via l'application Beridimob.</p>
                                              {settings.payment.beridimobEnabled && (
                                                  <textarea 
                                                    className="mt-2 w-full border border-gray-300 rounded p-2 text-sm" 
                                                    value={settings.payment.beridimobInstructions}
                                                    onChange={(e) => updateSettings({payment: {...settings.payment, beridimobInstructions: e.target.value}})}
                                                  />
                                              )}
                                          </div>
                                      </div>
                                      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                          <input type="checkbox" checked={settings.payment.beridimobEnabled} onChange={e => updateSettings({payment: {...settings.payment, beridimobEnabled: e.target.checked}})} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                          <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${settings.payment.beridimobEnabled ? 'bg-green-400' : 'bg-gray-300'}`}></label>
                                      </div>
                                  </div>
                              </div>
                          )}
                          
                          {settingsTab === 'general' && (
                              <div className="space-y-4">
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700">Nom de la boutique</label>
                                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm border p-2" value={settings.general.storeName} onChange={(e) => updateSettings({general: {...settings.general, storeName: e.target.value}})} />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700">Email Contact</label>
                                      <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm border p-2" value={settings.general.email} onChange={(e) => updateSettings({general: {...settings.general, email: e.target.value}})} />
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'products' && (
              // Reusing existing product list logic, wrapped in the new layout
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-bold">Inventaire</h2>
                      <button onClick={() => { setIsEditing(false); setEditingProduct(null); }} className="bg-chall-orange text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                          <Plus size={16} className="mr-2"/> Ajouter Produit
                      </button>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(p => (
                            <tr key={p.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0"><img className="h-10 w-10 rounded-full object-cover" src={p.image} /></div>
                                        <div className="ml-4"><div className="text-sm font-medium text-gray-900">{p.name}</div></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{p.price} DA</td>
                                <td className="px-6 py-4"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{p.stock}</span></td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
              </div>
          )}
      </main>
    </div>
  );
};

export default AdminPanel;
