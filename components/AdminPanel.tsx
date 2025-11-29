import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, CATEGORIES } from '../types';
import { Trash2, Edit, Package, ShoppingBag, Plus, Sparkles, Loader2, Save, X, Settings, Shield, Key, BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';
import { generateProductDescription } from '../services/geminiService';

const AdminPanel: React.FC = () => {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useStore();
  const [activeTab, setActiveTab] = useState<'statistics' | 'products' | 'orders' | 'settings'>('statistics');
  
  // Product Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product> & { sizesInput?: string }>({
    name: '',
    category: CATEGORIES[0],
    price: 0,
    description: '',
    stock: 0,
    image: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
    sizesInput: ''
  });
  
  // AI Generation State
  const [isGenerating, setIsGenerating] = useState(false);

  // Statistics Calculations
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Mock data for chart if no orders exist, otherwise aggregate real orders
  const chartData = React.useMemo(() => {
    if (orders.length === 0) {
        // Dummy data for visualization when store is empty
        return [
            { name: 'Lun', ventes: 12000, commandes: 2 },
            { name: 'Mar', ventes: 18500, commandes: 3 },
            { name: 'Mer', ventes: 8000, commandes: 1 },
            { name: 'Jeu', ventes: 25000, commandes: 5 },
            { name: 'Ven', ventes: 32000, commandes: 6 },
            { name: 'Sam', ventes: 45000, commandes: 8 },
            { name: 'Dim', ventes: 15000, commandes: 2 },
        ];
    }
    
    // Aggregate orders by date (simplified for this example)
    const grouped = orders.reduce((acc, order) => {
        const date = new Date(order.date).toLocaleDateString('fr-FR', { weekday: 'short' });
        if (!acc[date]) acc[date] = { name: date, ventes: 0, commandes: 0 };
        acc[date].ventes += order.total;
        acc[date].commandes += 1;
        return acc;
    }, {} as Record<string, any>);
    
    return Object.values(grouped);
  }, [orders]);

  const maxSales = Math.max(...chartData.map(d => d.ventes), 1000); // Avoid divide by zero
  const maxOrders = Math.max(...chartData.map(d => d.commandes), 10);

  const handleGenerateDescription = async () => {
    if (!formData.name || !formData.category) {
      alert("Veuillez entrer un nom et une catégorie pour générer une description.");
      return;
    }
    setIsGenerating(true);
    try {
        const desc = await generateProductDescription(formData.name, formData.category);
        setFormData(prev => ({ ...prev, description: desc }));
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    // Convert sizesInput string to array
    const sizes = formData.sizesInput 
        ? formData.sizesInput.split(',').map(s => s.trim()).filter(s => s.length > 0)
        : [];

    const productData = {
        id: editingProduct ? editingProduct.id : Math.random().toString(36).substr(2, 9),
        name: formData.name,
        category: formData.category || 'Accessoires',
        price: Number(formData.price),
        description: formData.description || '',
        stock: Number(formData.stock),
        image: formData.image || 'https://picsum.photos/400/400',
        sizes: sizes.length > 0 ? sizes : undefined
    } as Product;

    if (editingProduct) {
        updateProduct(productData);
    } else {
        addProduct(productData);
    }
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
        ...product,
        sizesInput: product.sizes ? product.sizes.join(', ') : ''
    });
    setIsEditing(true);
  };

  const resetForm = () => {
      setIsEditing(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        category: CATEGORIES[0],
        price: 0,
        description: '',
        stock: 0,
        image: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
        sizesInput: ''
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Administrateur</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium whitespace-nowrap ${activeTab === 'statistics' ? 'text-chall-orange border-b-2 border-chall-orange bg-orange-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('statistics')}
          >
            <div className="flex items-center justify-center gap-2">
                <BarChart3 size={20} />
                Statistiques
            </div>
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium whitespace-nowrap ${activeTab === 'products' ? 'text-chall-orange border-b-2 border-chall-orange bg-orange-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('products')}
          >
            <div className="flex items-center justify-center gap-2">
                <Package size={20} />
                Produits
            </div>
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium whitespace-nowrap ${activeTab === 'orders' ? 'text-chall-orange border-b-2 border-chall-orange bg-orange-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('orders')}
          >
            <div className="flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                Commandes ({orders.length})
            </div>
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium whitespace-nowrap ${activeTab === 'settings' ? 'text-chall-orange border-b-2 border-chall-orange bg-orange-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('settings')}
          >
            <div className="flex items-center justify-center gap-2">
                <Settings size={20} />
                Paramètres
            </div>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'statistics' && (
              <div className="space-y-8">
                  {/* Key Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-chall-orange to-orange-600 rounded-lg shadow-lg p-6 text-white">
                          <div className="flex justify-between items-center">
                              <div>
                                  <p className="text-white/80 text-sm font-medium">Chiffre d'Affaires Total</p>
                                  <p className="text-3xl font-bold mt-1">{totalRevenue.toLocaleString('fr-DZ')} DA</p>
                              </div>
                              <div className="bg-white/20 p-3 rounded-full">
                                  <DollarSign size={24} className="text-white" />
                              </div>
                          </div>
                          <div className="mt-4 flex items-center text-xs text-white/70">
                              <TrendingUp size={14} className="mr-1" />
                              <span>+12% ce mois-ci</span>
                          </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                          <div className="flex justify-between items-center">
                              <div>
                                  <p className="text-gray-500 text-sm font-medium">Commandes Totales</p>
                                  <p className="text-3xl font-bold mt-1 text-gray-900">{totalOrders}</p>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-full">
                                  <ShoppingBag size={24} className="text-blue-600" />
                              </div>
                          </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                          <div className="flex justify-between items-center">
                              <div>
                                  <p className="text-gray-500 text-sm font-medium">Panier Moyen</p>
                                  <p className="text-3xl font-bold mt-1 text-gray-900">{Math.round(averageOrderValue).toLocaleString('fr-DZ')} DA</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-full">
                                  <Users size={24} className="text-green-600" />
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Custom Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Bar Chart */}
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                          <h3 className="text-lg font-bold text-gray-800 mb-6">Aperçu des Ventes (DA)</h3>
                          <div className="h-64 flex items-end justify-between space-x-2">
                              {chartData.map((data, index) => (
                                <div key={index} className="flex flex-col items-center flex-1 group relative">
                                    <div 
                                        className="w-full bg-chall-orange/80 rounded-t-sm hover:bg-chall-orange transition-all duration-300 relative"
                                        style={{ height: `${(data.ventes / maxSales) * 100}%` }}
                                    >
                                        {/* Tooltip */}
                                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                                            {data.ventes.toLocaleString()} DA
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-2 font-medium">{data.name}</span>
                                </div>
                              ))}
                          </div>
                      </div>

                       {/* Line Chart Simulation */}
                       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                          <h3 className="text-lg font-bold text-gray-800 mb-6">Volume de Commandes</h3>
                          <div className="h-64 relative border-l border-b border-gray-100">
                             {/* Grid Lines */}
                             {[0, 0.25, 0.5, 0.75, 1].map(tick => (
                                <div key={tick} className="absolute w-full border-t border-gray-100" style={{ bottom: `${tick * 100}%` }}></div>
                             ))}
                             
                             {/* SVG Line */}
                             <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                <polyline
                                    fill="none"
                                    stroke="#D21034"
                                    strokeWidth="3"
                                    points={chartData.map((d, i) => {
                                        const x = (i / (chartData.length - 1)) * 100;
                                        const y = 100 - ((d.commandes / maxOrders) * 100);
                                        return `${x}%,${y}%`;
                                    }).join(' ')}
                                />
                                {chartData.map((d, i) => {
                                     const x = (i / (chartData.length - 1)) * 100;
                                     const y = 100 - ((d.commandes / maxOrders) * 100);
                                     return (
                                        <circle 
                                            key={i} 
                                            cx={`${x}%`} 
                                            cy={`${y}%`} 
                                            r="4" 
                                            fill="#fff" 
                                            stroke="#D21034" 
                                            strokeWidth="2"
                                        />
                                     );
                                })}
                             </svg>

                             {/* X Axis Labels */}
                             <div className="absolute top-full left-0 w-full flex justify-between mt-2">
                                {chartData.map((d, i) => (
                                    <span key={i} className="text-xs text-gray-500" style={{ width: `${100/chartData.length}%`, textAlign: 'center' }}>
                                        {d.name}
                                    </span>
                                ))}
                             </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'products' && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Form */}
              <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{isEditing ? 'Modifier le produit' : 'Ajouter un produit'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                        <input 
                            type="text" 
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chall-orange focus:ring focus:ring-chall-orange focus:ring-opacity-50 p-2 border"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prix (DA)</label>
                            <input 
                                type="number" 
                                required
                                min="0"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chall-orange focus:ring focus:ring-chall-orange focus:ring-opacity-50 p-2 border"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input 
                                type="number" 
                                required
                                min="0"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chall-orange focus:ring focus:ring-chall-orange focus:ring-opacity-50 p-2 border"
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <select 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chall-orange focus:ring focus:ring-chall-orange focus:ring-opacity-50 p-2 border"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700">Tailles (séparées par des virgules)</label>
                        <input 
                            type="text" 
                            placeholder="ex: S, M, L, XL"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chall-orange focus:ring focus:ring-chall-orange focus:ring-opacity-50 p-2 border"
                            value={formData.sizesInput}
                            onChange={(e) => setFormData({...formData, sizesInput: e.target.value})}
                        />
                        <p className="text-xs text-gray-500 mt-1">Laisser vide si taille unique ou cosmétique.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 flex justify-between">
                            Description
                            <button 
                                type="button"
                                onClick={handleGenerateDescription}
                                disabled={isGenerating}
                                className="text-xs text-chall-orange flex items-center gap-1 hover:underline disabled:opacity-50"
                            >
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                IA Générer
                            </button>
                        </label>
                        <textarea 
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chall-orange focus:ring focus:ring-chall-orange focus:ring-opacity-50 p-2 border"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    
                    <div className="flex gap-2">
                        <button 
                            type="submit" 
                            className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-chall-orange hover:bg-orange-600 focus:outline-none"
                        >
                           {isEditing ? <Save size={16} className="mr-2"/> : <Plus size={16} className="mr-2"/>}
                           {isEditing ? 'Sauvegarder' : 'Ajouter'}
                        </button>
                        {isEditing && (
                             <button 
                                type="button" 
                                onClick={resetForm}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </form>
              </div>

              {/* Product List */}
              <div className="flex-1 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.category}</div>
                              {product.sizes && (
                                <div className="text-xs text-gray-400 mt-1">Tailles: {product.sizes.join(', ')}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.price.toLocaleString('fr-DZ')} DA
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
                {orders.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Aucune commande pour le moment.</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Commande</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{order.total.toLocaleString('fr-DZ')} DA</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}>
                                {order.status === 'delivered' ? 'Livré' : order.status === 'shipped' ? 'Expédié' : 'En attente'}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <select 
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="pending">En attente</option>
                                    <option value="shipped">Expédié</option>
                                    <option value="delivered">Livré</option>
                                </select>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
            </div>
          )}

          {activeTab === 'settings' && (
              <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-lg p-6">
                      <div className="flex items-center mb-6">
                          <Shield className="text-chall-orange mr-3" size={32} />
                          <div>
                              <h2 className="text-xl font-bold text-gray-900">Sécurité et Accès</h2>
                              <p className="text-gray-500">Gérez les paramètres de votre compte administrateur.</p>
                          </div>
                      </div>

                      <div className="space-y-6">
                          {/* Account Info */}
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                              <h3 className="font-medium text-gray-900 mb-2">Compte Actuel</h3>
                              <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Utilisateur : <strong>admin</strong></span>
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actif</span>
                              </div>
                          </div>

                          {/* Password Reset Mock */}
                          <div className="border-t border-gray-100 pt-6">
                              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                                  <Key size={18} className="mr-2 text-gray-400" />
                                  Changer le mot de passe
                              </h3>
                              <div className="grid grid-cols-1 gap-4">
                                  <input type="password" placeholder="Mot de passe actuel" className="border rounded p-2 w-full" disabled />
                                  <input type="password" placeholder="Nouveau mot de passe" className="border rounded p-2 w-full" disabled />
                                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 w-fit opacity-50 cursor-not-allowed">
                                      Mettre à jour
                                  </button>
                                  <p className="text-xs text-gray-400">Pour des raisons de sécurité, veuillez contacter le support technique pour réinitialiser le mot de passe principal.</p>
                              </div>
                          </div>

                          {/* 2FA Mock */}
                          <div className="border-t border-gray-100 pt-6">
                              <div className="flex items-center justify-between">
                                  <div>
                                      <h3 className="font-medium text-gray-900">Authentification à deux facteurs (2FA)</h3>
                                      <p className="text-sm text-gray-500">Ajoute une couche de sécurité supplémentaire.</p>
                                  </div>
                                  <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chall-orange bg-gray-200">
                                      <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;