import React, { useState, useMemo } from 'react';
import { 
  Search, Grid, List, Plus, Minus, Trash2, 
  CreditCard, Banknote, QrCode, RotateCcw, 
  PauseCircle, User, X, CheckCircle, Calculator, Percent
} from 'lucide-react';

const PointOfSale = () => {
  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash, card, qr
  const [cashReceived, setCashReceived] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // --- MOCK DATA ---
  const categories = ['All', 'Bouquets', 'Single Stems', 'Vases', 'Gifts', 'Cards'];
  
  const products = [
    { id: 1, name: 'Red Velvet Rose', category: 'Bouquets', price: 65.00, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'White Elegance', category: 'Bouquets', price: 85.00, img: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Single Sunflower', category: 'Single Stems', price: 8.00, img: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: 'Minimalist Vase', category: 'Vases', price: 25.00, img: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=200' },
    { id: 5, name: 'Pink Tulip Bundle', category: 'Single Stems', price: 15.00, img: 'https://images.unsplash.com/photo-1520302630591-a6e7850e8055?auto=format&fit=crop&q=80&w=200' },
    { id: 6, name: 'Greeting Card', category: 'Cards', price: 5.00, img: 'https://images.unsplash.com/photo-1603533723824-2c06121404c0?auto=format&fit=crop&q=80&w=200' },
    { id: 7, name: 'Chocolates', category: 'Gifts', price: 12.00, img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=200' },
    { id: 8, name: 'Teddy Bear', category: 'Gifts', price: 20.00, img: 'https://images.unsplash.com/photo-1559454403-b8fb87521bc7?auto=format&fit=crop&q=80&w=200' },
  ];

  // --- LOGIC ---
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const clearCart = () => {
    if(window.confirm("Clear current order?")) setCart([]);
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.08; // 8% Tax
    return { subtotal, tax, total: subtotal + tax };
  }, [cart]);

  const handleCheckout = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setShowPaymentModal(false);
      setCart([]);
      setCashReceived('');
    }, 2000);
  };

  // Calculator Logic for Cash
  const handleCalcInput = (val) => {
    if (val === 'C') setCashReceived('');
    else if (val === 'Back') setCashReceived(prev => prev.slice(0, -1));
    else setCashReceived(prev => prev + val);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800 overflow-hidden">
      
      {/* ==============================================
          LEFT PANEL: PRODUCT BROWSER (65%)
         ============================================== */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* Header Bar */}
        <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className="text-2xl font-bold font-serif tracking-tight text-gray-900">Flori<span className="text-red-500">.</span> <span className="text-xs font-sans font-normal text-gray-400 uppercase tracking-widest ml-1">POS Terminal</span></div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <input 
                type="text" 
                placeholder="Search products, SKU..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-sm text-sm focus:ring-2 focus:ring-red-100 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-gray-900">Jane Cashier</div>
                <div className="text-[10px] text-green-500 font-bold uppercase flex items-center justify-end gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Online</div>
             </div>
             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500"><User size={20}/></div>
          </div>
        </header>

        {/* Category Pills */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex gap-3 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <button 
                key={product.id}
                onClick={() => addToCart(product)} 
                className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition active:scale-95 flex flex-col text-left group h-full"
              >
                <div className="h-32 w-full overflow-hidden relative">
                   <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                </div>
                <div className="p-3 flex flex-col flex-1 justify-between">
                   <h3 className="font-bold text-sm text-gray-800 leading-tight mb-1">{product.name}</h3>
                   <span className="text-red-600 font-bold text-sm">${product.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
             {/* Custom Amount Button */}
             <button className="bg-gray-200 rounded-sm border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 hover:bg-gray-300 transition text-gray-500 h-full min-h-[160px]">
                <Calculator size={24} className="mb-2"/>
                <span className="text-xs font-bold uppercase">Custom Amount</span>
             </button>
          </div>
        </div>
      </div>

      {/* ==============================================
          RIGHT PANEL: CART / TRANSACTION (35%)
         ============================================== */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full shadow-xl relative z-20">
        
        {/* Cart Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="font-serif font-bold text-xl">Current Order</h2>
            <p className="text-xs text-gray-400">#TRX-0092 • Walk-in Customer</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm" title="Add Customer"><User size={18}/></button>
            <button onClick={clearCart} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm" title="Clear Cart"><Trash2 size={18}/></button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 opacity-50">
               <ShoppingBag size={48} className="mb-2"/>
               <p className="font-bold">Cart is empty</p>
               <p className="text-xs">Select products to start</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-white p-2 rounded-sm border border-gray-100 hover:border-red-100 transition">
                <div className="w-12 h-12 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0">
                  <img src={item.img} className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-gray-400">${item.price.toFixed(2)} / unit</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <span className="font-bold text-sm">${(item.price * item.qty).toFixed(2)}</span>
                   <div className="flex items-center border border-gray-200 rounded-sm bg-gray-50">
                      <button onClick={() => updateQty(item.id, -1)} className="px-2 py-0.5 hover:text-red-600"><Minus size={12}/></button>
                      <span className="text-xs font-bold w-6 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="px-2 py-0.5 hover:text-red-600"><Plus size={12}/></button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-4 gap-2 px-4 py-2 border-t border-gray-100 bg-gray-50">
           <button className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-sm hover:bg-red-50 hover:text-red-600 text-xs text-gray-500 font-bold">
              <Percent size={16} className="mb-1"/> Discount
           </button>
           <button className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-sm hover:bg-red-50 hover:text-red-600 text-xs text-gray-500 font-bold">
              <User size={16} className="mb-1"/> Customer
           </button>
           <button className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-sm hover:bg-red-50 hover:text-red-600 text-xs text-gray-500 font-bold">
              <PauseCircle size={16} className="mb-1"/> Hold
           </button>
           <button className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-sm hover:bg-red-50 hover:text-red-600 text-xs text-gray-500 font-bold">
              <RotateCcw size={16} className="mb-1"/> Refund
           </button>
        </div>

        {/* Totals Section */}
        <div className="bg-gray-900 text-white p-6 pb-8">
           <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Subtotal</span>
              <span>${totals.subtotal.toFixed(2)}</span>
           </div>
           <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>Tax (8%)</span>
              <span>${totals.tax.toFixed(2)}</span>
           </div>
           <div className="flex justify-between items-end mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-serif font-bold text-red-500">${totals.total.toFixed(2)}</span>
           </div>
           
           <button 
             onClick={() => setShowPaymentModal(true)}
             disabled={cart.length === 0}
             className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-sm font-bold uppercase text-sm tracking-widest shadow-lg transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Proceed to Pay
           </button>
        </div>
      </div>

      {/* ==============================================
          MODAL: PAYMENT SCREEN
         ============================================== */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           
           {/* Success State */}
           {orderSuccess ? (
              <div className="bg-white rounded-sm p-10 text-center animate-fade-in-up">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                   <CheckCircle size={40}/>
                 </div>
                 <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                 <p className="text-gray-500 mb-6">Printing receipt...</p>
                 <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-green-500 animate-[width_2s_ease-in-out]"></div>
                 </div>
              </div>
           ) : (
              // Payment Interface
              <div className="bg-white w-full max-w-4xl h-[600px] rounded-sm shadow-2xl flex overflow-hidden animate-fade-in-up">
                 
                 {/* Left: Methods & Summary */}
                 <div className="w-1/2 p-8 bg-gray-50 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold font-serif mb-6">Select Payment</h2>
                      <div className="space-y-4">
                         <button onClick={() => setPaymentMethod('cash')} className={`w-full flex items-center gap-4 p-4 rounded-sm border-2 text-left transition ${paymentMethod === 'cash' ? 'border-red-500 bg-white text-red-600 shadow-md' : 'border-gray-200 bg-white text-gray-600 hover:border-red-200'}`}>
                            <Banknote size={24}/> 
                            <div><div className="font-bold">Cash</div><div className="text-xs opacity-70">Pay with bills</div></div>
                         </button>
                         <button onClick={() => setPaymentMethod('card')} className={`w-full flex items-center gap-4 p-4 rounded-sm border-2 text-left transition ${paymentMethod === 'card' ? 'border-red-500 bg-white text-red-600 shadow-md' : 'border-gray-200 bg-white text-gray-600 hover:border-red-200'}`}>
                            <CreditCard size={24}/> 
                            <div><div className="font-bold">Card Terminal</div><div className="text-xs opacity-70">Visa, Mastercard</div></div>
                         </button>
                         <button onClick={() => setPaymentMethod('qr')} className={`w-full flex items-center gap-4 p-4 rounded-sm border-2 text-left transition ${paymentMethod === 'qr' ? 'border-red-500 bg-white text-red-600 shadow-md' : 'border-gray-200 bg-white text-gray-600 hover:border-red-200'}`}>
                            <QrCode size={24}/> 
                            <div><div className="font-bold">QR Code</div><div className="text-xs opacity-70">Scan to pay</div></div>
                         </button>
                      </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-lg font-bold mb-2">
                          <span>Total Due:</span>
                          <span className="text-red-600">${totals.total.toFixed(2)}</span>
                       </div>
                       <button onClick={() => setShowPaymentModal(false)} className="text-sm font-bold text-gray-400 hover:text-gray-900 uppercase">Cancel Transaction</button>
                    </div>
                 </div>

                 {/* Right: Interaction Area (Numpad for Cash / Status for Card) */}
                 <div className="w-1/2 p-8 flex flex-col">
                    {paymentMethod === 'cash' ? (
                       <div className="h-full flex flex-col">
                          <div className="mb-6 bg-gray-100 p-4 rounded-sm text-right">
                             <span className="block text-xs font-bold text-gray-400 uppercase">Cash Received</span>
                             <span className="text-3xl font-mono font-bold text-gray-900">${cashReceived || '0'}</span>
                          </div>
                          
                          {/* Numpad */}
                          <div className="grid grid-cols-3 gap-3 flex-1 mb-6">
                             {[1,2,3,4,5,6,7,8,9,'.',0,'C'].map(key => (
                                <button 
                                  key={key} 
                                  onClick={() => handleCalcInput(key)}
                                  className="bg-white border border-gray-200 text-xl font-bold rounded-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 active:bg-red-100 transition"
                                >
                                  {key}
                                </button>
                             ))}
                          </div>

                          {/* Change Calculation Preview */}
                          {parseFloat(cashReceived) >= totals.total && (
                             <div className="mb-4 text-center">
                                <span className="text-xs text-gray-500 font-bold uppercase">Change Due:</span>
                                <span className="text-xl font-bold text-green-600 ml-2">${(parseFloat(cashReceived) - totals.total).toFixed(2)}</span>
                             </div>
                          )}

                          <button 
                            onClick={handleCheckout}
                            disabled={!cashReceived || parseFloat(cashReceived) < totals.total}
                            className="w-full bg-red-600 text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                             Complete Payment
                          </button>
                       </div>
                    ) : (
                       <div className="h-full flex flex-col items-center justify-center text-center">
                          {paymentMethod === 'card' && <div className="animate-pulse w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"><CreditCard size={48} className="text-gray-400"/></div>}
                          {paymentMethod === 'qr' && <div className="bg-white p-4 border-2 border-gray-900 rounded-lg mb-6"><QrCode size={120}/></div>}
                          
                          <h3 className="text-xl font-bold mb-2">{paymentMethod === 'card' ? 'Waiting for Card...' : 'Scan QR Code'}</h3>
                          <p className="text-gray-400 text-sm mb-8">Please ask customer to tap or scan.</p>
                          
                          <button onClick={handleCheckout} className="bg-gray-900 text-white px-8 py-3 rounded-sm font-bold uppercase text-xs tracking-widest">Simulate Success</button>
                       </div>
                    )}
                 </div>
              </div>
           )}
        </div>
      )}

    </div>
  );
};

// Simple utility component for icons not found in standard import if needed, 
// but using Lucide icons ensures consistency.
function ShoppingBag(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export default PointOfSale;