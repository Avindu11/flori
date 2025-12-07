import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  Settings, LogOut, Plus, Search, Edit2, Trash2, 
  Check, X, ChevronDown, Filter, MoreHorizontal 
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  
  // --- MOCK DATA ---
  const [stats] = useState([
    { label: 'Total Sales', value: '$12,450', change: '+12%', icon: '💰' },
    { label: 'Active Orders', value: '24', change: '+5', icon: '📦' },
    { label: 'Total Products', value: '48', change: '0', icon: '🌸' },
    { label: 'Customers', value: '1,205', change: '+18%', icon: '👥' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Red Velvet Rose', category: 'Bouquet', price: 65.00, stock: 12, status: 'Active', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=100' },
    { id: 2, name: 'White Elegance Box', category: 'Flower Box', price: 85.00, stock: 5, status: 'Low Stock', img: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=100' },
    { id: 3, name: 'Ceramic Vase Minimal', category: 'Accessories', price: 25.00, stock: 0, status: 'Out of Stock', img: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=100' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'Alice Smith', date: '2025-12-07', total: 120.00, status: 'Pending', items: '2x Red Rose' },
    { id: 'ORD-002', customer: 'Bob Jones', date: '2025-12-06', total: 65.00, status: 'Shipped', items: '1x White Elegance' },
    { id: 'ORD-003', customer: 'Custom Walk-in', date: '2025-12-06', total: 200.00, status: 'Delivered', items: 'Custom Build', isCustom: true },
  ]);

  // --- FORM STATES ---
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', category: '', price: '', stock: '' });
  const [orderForm, setOrderForm] = useState({ customer: '', items: '', total: '', status: 'Pending' });

  // --- HANDLERS: PRODUCTS ---
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productForm } : p));
    } else {
      setProducts([...products, { ...productForm, id: Date.now(), status: 'Active', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=100' }]);
    }
    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm({ name: '', category: '', price: '', stock: '' });
  };

  // --- HANDLERS: ORDERS ---
  const handleDeleteOrder = (id) => {
    if(window.confirm('Delete this order record?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const saveOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      isCustom: true,
      ...orderForm
    };
    setOrders([newOrder, ...orders]);
    setShowOrderModal(false);
    setOrderForm({ customer: '', items: '', total: '', status: 'Pending' });
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="text-2xl font-bold font-serif tracking-tight">Flori<span className="text-red-500">.</span></div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Seller Central</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'dashboard' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'products' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Package size={18} /> Products
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'orders' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <ShoppingCart size={18} /> Orders
          </button>
          <button className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition text-gray-600 hover:bg-gray-50`}>
            <Users size={18} /> Customers
          </button>
          <button className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition text-gray-600 hover:bg-gray-50`}>
            <Settings size={18} /> Settings
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-red-600 transition">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-20">
          <h2 className="text-xl font-bold font-serif capitalize">{activeTab} Overview</h2>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">JA</div>
             <span className="text-sm font-medium hidden sm:block">Jane Admin</span>
          </div>
        </header>

        <div className="p-8">

          {/* === DASHBOARD VIEW === */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-2xl">{stat.icon}</div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{stat.change}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                   <h3 className="font-bold text-lg">Recent Orders</h3>
                   <button onClick={() => setActiveTab('orders')} className="text-xs text-red-500 font-bold uppercase hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-normal">
                      <tr>
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.slice(0, 3).map(order => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 font-bold">{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* === PRODUCTS VIEW === */}
          {activeTab === 'products' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
                   <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-red-500 w-64"/>
                 </div>
                 <button onClick={() => { setEditingProduct(null); setProductForm({}); setShowProductModal(true); }} className="bg-red-600 text-white px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide hover:bg-gray-900 transition flex items-center gap-2">
                   <Plus size={16}/> Add Product
                 </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={product.img} alt="" className="w-10 h-10 rounded-sm object-cover bg-gray-100"/>
                          <span className="font-bold">{product.name}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{product.category}</td>
                        <td className="px-6 py-4 font-medium">${parseFloat(product.price).toFixed(2)}</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold ${product.stock === 0 ? 'bg-red-100 text-red-600' : product.stock < 10 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                             {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : 'Active'}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button onClick={() => handleEditProduct(product)} className="p-1 text-gray-400 hover:text-blue-600"><Edit2 size={16}/></button>
                             <button onClick={() => handleDeleteProduct(product.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === ORDERS VIEW === */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                 <div className="flex gap-2">
                   <button className="px-4 py-2 bg-white border border-gray-200 text-xs font-bold uppercase rounded-sm hover:border-red-500">All</button>
                   <button className="px-4 py-2 bg-white border border-gray-200 text-xs font-bold uppercase rounded-sm hover:border-red-500">Pending</button>
                   <button className="px-4 py-2 bg-white border border-gray-200 text-xs font-bold uppercase rounded-sm hover:border-red-500">Completed</button>
                 </div>
                 <button onClick={() => setShowOrderModal(true)} className="bg-gray-900 text-white px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide hover:bg-red-600 transition flex items-center gap-2">
                   <Plus size={16}/> Create Custom Order
                 </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Items Summary</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold">
                          {order.id}
                          {order.isCustom && <span className="ml-2 bg-purple-100 text-purple-600 text-[9px] px-1 rounded">CUSTOM</span>}
                        </td>
                        <td className="px-6 py-4 text-gray-500">{order.date}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{order.items}</td>
                        <td className="px-6 py-4 font-medium">${parseFloat(order.total).toFixed(2)}</td>
                        <td className="px-6 py-4">
                           <select 
                             value={order.status} 
                             onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                             className={`text-xs font-bold uppercase border-none bg-transparent focus:ring-0 cursor-pointer ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}
                           >
                             <option value="Pending">Pending</option>
                             <option value="Shipped">Shipped</option>
                             <option value="Delivered">Delivered</option>
                             <option value="Cancelled">Cancelled</option>
                           </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDeleteOrder(order.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* --- MODAL: PRODUCT (ADD/EDIT) --- */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-sm shadow-xl p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
            </div>
            <form onSubmit={saveProduct} className="space-y-4">
               <div>
                 <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Product Name</label>
                 <input required type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Category</label>
                    <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none bg-white">
                      <option value="">Select...</option>
                      <option value="Bouquet">Bouquet</option>
                      <option value="Flower Box">Flower Box</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Price ($)</label>
                    <input required type="number" step="0.01" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none" />
                 </div>
               </div>
               <div>
                 <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Stock Quantity</label>
                 <input required type="number" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none" />
               </div>
               <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition mt-4">Save Product</button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CUSTOM ORDER (ADD) --- */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-sm shadow-xl p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Create Custom Order</h3>
              <button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
            </div>
            <form onSubmit={saveOrder} className="space-y-4">
               <div>
                 <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Customer Name</label>
                 <input required type="text" value={orderForm.customer} onChange={e => setOrderForm({...orderForm, customer: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none" />
               </div>
               <div>
                 <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Order Details / Items</label>
                 <textarea required rows="3" placeholder="e.g. Custom Red Rose Bouquet with Gold Ribbon" value={orderForm.items} onChange={e => setOrderForm({...orderForm, items: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none"></textarea>
               </div>
               <div>
                 <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Total Amount ($)</label>
                 <input required type="number" step="0.01" value={orderForm.total} onChange={e => setOrderForm({...orderForm, total: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none" />
               </div>
               <div>
                 <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Status</label>
                 <select value={orderForm.status} onChange={e => setOrderForm({...orderForm, status: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none bg-white">
                   <option value="Pending">Pending</option>
                   <option value="Paid">Paid</option>
                   <option value="Processing">Processing</option>
                   <option value="Delivered">Delivered</option>
                 </select>
               </div>
               <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition mt-4">Create Order</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;