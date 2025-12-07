import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, 
  Settings, LogOut, Plus, Search, Edit2, Trash2, 
  Shield, UserCheck, UserX, X, MoreVertical, Lock,
  Check
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, users, products, orders
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  // --- MOCK DATA: STATS ---
  const stats = [
    { label: 'Total Revenue', value: '$45,200', change: '+24%', icon: '💰' },
    { label: 'Total Users', value: '2,405', change: '+12%', icon: '👥' },
    { label: 'Total Orders', value: '842', change: '+8%', icon: '📦' },
    { label: 'Active Sellers', value: '18', change: '+2', icon: '🏪' },
  ];

  // --- MOCK DATA: USERS ---
  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Admin', email: 'jane@flori.com', role: 'Admin', status: 'Active', joined: '2023-01-15' },
    { id: 2, name: 'Flower Power Co.', email: 'shop@flowerpower.com', role: 'Seller', status: 'Active', joined: '2024-03-10' },
    { id: 3, name: 'Alice Smith', email: 'alice@gmail.com', role: 'Customer', status: 'Active', joined: '2025-02-14' },
    { id: 4, name: 'Bad Actor', email: 'spam@bot.com', role: 'Customer', status: 'Banned', joined: '2025-05-20' },
    { id: 5, name: 'Rose Garden Ltd.', email: 'contact@rosegarden.com', role: 'Seller', status: 'Pending', joined: '2025-12-01' },
  ]);

  // --- MOCK DATA: PRODUCTS (Inherited) ---
  const [products, setProducts] = useState([
    { id: 1, name: 'Red Velvet Rose', seller: 'Flower Power Co.', price: 65.00, stock: 12, status: 'Active' },
    { id: 2, name: 'White Elegance', seller: 'Rose Garden Ltd.', price: 85.00, stock: 5, status: 'Low Stock' },
  ]);

  // --- MOCK DATA: ORDERS (Inherited) ---
  const [orders, setOrders] = useState([
    { id: 'ORD-8821', customer: 'Alice Smith', total: 120.00, status: 'Processing', date: '2025-12-07' },
    { id: 'ORD-8822', customer: 'Bob Jones', total: 65.00, status: 'Delivered', date: '2025-12-06' },
  ]);

  // --- FORM STATES ---
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'Customer', status: 'Active' });
  const [editingId, setEditingId] = useState(null);

  // --- USER MANAGEMENT HANDLERS ---
  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...userForm } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...userForm, joined: new Date().toISOString().split('T')[0] }]);
    }
    setShowUserModal(false);
    setEditingId(null);
    setUserForm({ name: '', email: '', role: 'Customer', status: 'Active' });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const toggleUserBan = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Banned' ? 'Active' : 'Banned' };
      }
      return u;
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-20">
        <div className="p-6 border-b border-gray-100">
          <div className="text-2xl font-bold font-serif tracking-tight">Flori<span className="text-red-500">.</span></div>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-widest">Admin</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Portal</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'dashboard' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold uppercase text-gray-400 tracking-widest">Management</div>
          
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'users' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users size={18} /> Users & Roles
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'products' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Package size={18} /> Products
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'orders' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <ShoppingCart size={18} /> Orders
          </button>
          
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold uppercase text-gray-400 tracking-widest">System</div>
          
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
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold font-serif capitalize">{activeTab === 'users' ? 'User Management' : `${activeTab} Overview`}</h2>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs"><Shield size={14}/></div>
             <span className="text-sm font-medium hidden sm:block">Super Admin</span>
          </div>
        </header>

        <div className="p-8">

          {/* === VIEW: DASHBOARD === */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-2xl">{stat.icon}</div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600`}>{stat.change}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              {/* Recent Activity Mockup */}
              <div className="bg-white border border-gray-200 rounded-sm p-8 text-center text-gray-400">
                <p>System Activity Charts & Graphs would go here.</p>
              </div>
            </div>
          )}

          {/* === VIEW: USER MANAGEMENT === */}
          {activeTab === 'users' && (
            <div className="animate-fade-in">
              
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                 <div className="relative w-full md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
                   <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-red-500 w-full"/>
                 </div>
                 
                 <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-xs font-bold uppercase rounded-sm hover:border-red-500 text-gray-600">All</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-xs font-bold uppercase rounded-sm hover:border-red-500 text-gray-600">Sellers</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-xs font-bold uppercase rounded-sm hover:border-red-500 text-gray-600">Customers</button>
                 </div>

                 <button 
                    onClick={() => { setEditingId(null); setUserForm({ name: '', email: '', role: 'Customer', status: 'Active' }); setShowUserModal(true); }}
                    className="bg-red-600 text-white px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide hover:bg-gray-900 transition flex items-center gap-2"
                 >
                   <Plus size={16}/> Add User
                 </button>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                               <div className="font-bold text-gray-900">{user.name}</div>
                               <div className="text-xs text-gray-400">{user.email}</div>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold ${
                             user.role === 'Admin' ? 'bg-gray-900 text-white' : 
                             user.role === 'Seller' ? 'bg-purple-100 text-purple-700' : 
                             'bg-blue-50 text-blue-600'
                           }`}>
                             {user.role}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`flex items-center gap-1 text-xs font-bold ${
                             user.status === 'Active' ? 'text-green-600' : 
                             user.status === 'Banned' ? 'text-red-600' : 'text-yellow-600'
                           }`}>
                             {user.status === 'Active' ? <UserCheck size={14}/> : user.status === 'Banned' ? <UserX size={14}/> : <Lock size={14}/>}
                             {user.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button 
                               onClick={() => { setEditingId(user.id); setUserForm(user); setShowUserModal(true); }}
                               className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600"
                             >
                               <Edit2 size={16}/>
                             </button>
                             <button 
                               onClick={() => toggleUserBan(user.id)}
                               className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-yellow-600"
                               title={user.status === 'Banned' ? "Unban" : "Ban"}
                             >
                               {user.status === 'Banned' ? <Check size={16}/> : <UserX size={16}/>}
                             </button>
                             <button 
                               onClick={() => handleDeleteUser(user.id)}
                               className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600"
                             >
                               <Trash2 size={16}/>
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === VIEW: PRODUCTS (Admin Overview) === */}
          {activeTab === 'products' && (
             <div className="animate-fade-in">
                {/* Simplified view for Admin to see all products across all sellers */}
                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Seller</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-bold">{product.name}</td>
                          <td className="px-6 py-4 text-purple-600 font-medium">{product.seller}</td>
                          <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                          <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{product.status}</span></td>
                          <td className="px-6 py-4 text-right text-gray-400">
                             <button className="hover:text-red-600"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          )}
          
           {/* === VIEW: ORDERS (Admin Overview) === */}
           {activeTab === 'orders' && (
             <div className="animate-fade-in">
                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-bold">{order.id}</td>
                          <td className="px-6 py-4 text-gray-500">{order.date}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4"><span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{order.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          )}

        </div>
      </main>

      {/* --- MODAL: USER MANAGEMENT --- */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-sm shadow-xl p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">{editingId ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => setShowUserModal(false)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveUser} className="space-y-4">
               <div>
                 <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Full Name</label>
                 <input required type="text" value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none" />
               </div>
               <div>
                 <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Email Address</label>
                 <input required type="email" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Role</label>
                    <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none bg-white">
                      <option value="Customer">Customer</option>
                      <option value="Seller">Seller</option>
                      <option value="Admin">Admin</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Status</label>
                    <select value={userForm.status} onChange={e => setUserForm({...userForm, status: e.target.value})} className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none bg-white">
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Banned">Banned</option>
                    </select>
                 </div>
               </div>
               
               {/* Show Password Field only if adding new user */}
               {!editingId && (
                 <div>
                   <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Temporary Password</label>
                   <input required type="password" className="w-full border p-2 rounded-sm text-sm focus:border-red-500 outline-none" placeholder="******"/>
                 </div>
               )}

               <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition mt-4">
                 {editingId ? 'Update User' : 'Create User'}
               </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;