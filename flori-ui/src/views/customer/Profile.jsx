import React, { useState } from 'react';
import { 
  User, MapPin, Package, Heart, LogOut, 
  Camera, Edit2, Plus, Trash2, CheckCircle, Save, X
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile'); // profile, address, orders
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- MOCK USER DATA ---
  const [user, setUser] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  });

  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', street: '123 Flower Street', city: 'Garden City', zip: '11530', default: true },
    { id: 2, type: 'Work', street: '456 Corporate Blvd', city: 'New York', zip: '10001', default: false },
  ]);

  const [newAddressMode, setNewAddressMode] = useState(false);

  // --- HANDLERS ---
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* --- Navbar (Simplified) --- */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
           <div className="text-2xl font-bold font-serif tracking-tight">Flori<span className="text-red-500">.</span></div>
           <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-500">Back to Shop</a>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-serif font-bold mb-8">My Account</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR NAVIGATION --- */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              {/* User Mini Profile */}
              <div className="p-6 text-center border-b border-gray-100 bg-pink-50">
                 <div className="relative w-20 h-20 mx-auto mb-3">
                    <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"/>
                    <button className="absolute bottom-0 right-0 bg-red-600 text-white p-1.5 rounded-full hover:bg-gray-900 transition border-2 border-white">
                      <Camera size={12} />
                    </button>
                 </div>
                 <h3 className="font-bold text-lg">{user.firstName} {user.lastName}</h3>
                 <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'profile' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <User size={18} /> Personal Details
                </button>
                <button 
                  onClick={() => setActiveTab('address')}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'address' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <MapPin size={18} /> Address Book
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition ${activeTab === 'orders' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Package size={18} /> My Orders
                </button>
                <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition text-gray-600 hover:bg-gray-50">
                  <Heart size={18} /> Wishlist
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition text-gray-400 hover:text-red-600 hover:bg-red-50">
                  <LogOut size={18} /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="w-full lg:w-3/4">
            
            {/* SUCCESS NOTIFICATION TOAST */}
            {showSuccess && (
               <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-sm mb-6 flex items-center gap-2 animate-fade-in">
                 <CheckCircle size={16} /> Profile updated successfully.
               </div>
            )}

            {/* TAB: PERSONAL DETAILS */}
            {activeTab === 'profile' && (
              <div className="bg-white p-8 rounded-sm shadow-sm animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                   <h2 className="text-xl font-bold font-serif">Personal Information</h2>
                   {!isEditing && (
                     <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-xs font-bold uppercase text-red-600 hover:text-gray-900 transition">
                       <Edit2 size={14}/> Edit Profile
                     </button>
                   )}
                </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">First Name</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={user.firstName}
                        onChange={(e) => setUser({...user, firstName: e.target.value})}
                        className={`w-full border rounded-sm p-3 text-sm outline-none transition ${isEditing ? 'border-gray-300 focus:border-red-500 bg-white' : 'border-transparent bg-gray-50 text-gray-600'}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Last Name</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={user.lastName}
                        onChange={(e) => setUser({...user, lastName: e.target.value})}
                        className={`w-full border rounded-sm p-3 text-sm outline-none transition ${isEditing ? 'border-gray-300 focus:border-red-500 bg-white' : 'border-transparent bg-gray-50 text-gray-600'}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Email Address</label>
                      <input 
                        type="email" 
                        disabled={!isEditing}
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        className={`w-full border rounded-sm p-3 text-sm outline-none transition ${isEditing ? 'border-gray-300 focus:border-red-500 bg-white' : 'border-transparent bg-gray-50 text-gray-600'}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Phone Number</label>
                      <input 
                        type="tel" 
                        disabled={!isEditing}
                        value={user.phone}
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                        className={`w-full border rounded-sm p-3 text-sm outline-none transition ${isEditing ? 'border-gray-300 focus:border-red-500 bg-white' : 'border-transparent bg-gray-50 text-gray-600'}`}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-8 flex gap-4">
                      <button type="submit" className="bg-red-600 text-white px-6 py-2.5 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition flex items-center gap-2">
                        <Save size={14} /> Save Changes
                      </button>
                      <button type="button" onClick={() => setIsEditing(false)} className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-50 transition">
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* TAB: ADDRESS BOOK */}
            {activeTab === 'address' && (
              <div className="bg-white p-8 rounded-sm shadow-sm animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                   <h2 className="text-xl font-bold font-serif">Address Book</h2>
                   <button onClick={() => setNewAddressMode(true)} className="flex items-center gap-2 text-xs font-bold uppercase bg-gray-900 text-white px-4 py-2 rounded-sm hover:bg-red-600 transition">
                     <Plus size={14}/> Add New Address
                   </button>
                </div>

                {newAddressMode && (
                   <div className="bg-gray-50 p-6 rounded-sm mb-8 border border-gray-200">
                      <h4 className="font-bold text-sm mb-4">Add New Address</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input type="text" placeholder="Address Label (e.g. Home)" className="w-full border p-2 text-sm rounded-sm" />
                          <input type="text" placeholder="Street Address" className="w-full border p-2 text-sm rounded-sm" />
                          <input type="text" placeholder="City" className="w-full border p-2 text-sm rounded-sm" />
                          <input type="text" placeholder="Zip Code" className="w-full border p-2 text-sm rounded-sm" />
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => setNewAddressMode(false)} className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase rounded-sm">Save Address</button>
                         <button onClick={() => setNewAddressMode(false)} className="text-gray-500 px-4 py-2 text-xs font-bold uppercase">Cancel</button>
                      </div>
                   </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className={`border rounded-sm p-6 relative group transition hover:shadow-md ${addr.default ? 'border-red-200 bg-red-50/30' : 'border-gray-200'}`}>
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold uppercase text-xs tracking-wider">{addr.type}</span>
                            {addr.default && <span className="bg-red-100 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded-sm">DEFAULT</span>}
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                             <button className="text-gray-400 hover:text-gray-900"><Edit2 size={14}/></button>
                             <button onClick={() => handleDeleteAddress(addr.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                          </div>
                       </div>
                       <p className="text-sm text-gray-600 leading-relaxed">
                         {user.firstName} {user.lastName}<br />
                         {addr.street}<br />
                         {addr.city}, {addr.zip}
                       </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ORDERS (Preview) */}
            {activeTab === 'orders' && (
              <div className="bg-white p-8 rounded-sm shadow-sm animate-fade-in">
                 <h2 className="text-xl font-bold font-serif mb-6">Recent Orders</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                       <thead className="border-b border-gray-100 text-gray-400 uppercase text-xs tracking-wider">
                          <tr>
                             <th className="pb-3 font-normal">Order ID</th>
                             <th className="pb-3 font-normal">Date</th>
                             <th className="pb-3 font-normal">Status</th>
                             <th className="pb-3 font-normal">Total</th>
                             <th className="pb-3 font-normal text-right">Action</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          <tr className="group hover:bg-gray-50 transition">
                             <td className="py-4 font-bold text-gray-900">#FLORI-8829</td>
                             <td className="py-4 text-gray-500">Dec 01, 2025</td>
                             <td className="py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase">Delivered</span></td>
                             <td className="py-4 font-medium">$120.00</td>
                             <td className="py-4 text-right"><button className="text-red-600 text-xs font-bold uppercase hover:underline">View</button></td>
                          </tr>
                          <tr className="group hover:bg-gray-50 transition">
                             <td className="py-4 font-bold text-gray-900">#FLORI-8110</td>
                             <td className="py-4 text-gray-500">Nov 20, 2025</td>
                             <td className="py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase">Processing</span></td>
                             <td className="py-4 font-medium">$45.00</td>
                             <td className="py-4 text-right"><button className="text-red-600 text-xs font-bold uppercase hover:underline">View</button></td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;