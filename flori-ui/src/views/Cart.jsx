import React, { useState } from 'react';
import { 
  Search, User, Heart, ShoppingBag, Menu, X, 
  Trash2, Plus, Minus, ArrowRight, ArrowLeft, Gift
} from 'lucide-react';

const Cart = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // --- MOCK CART STATE ---
  // In a real app, this would come from a Context Provider or Redux
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Pink Rose Bouquet', 
      price: 60.00, 
      img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=200',
      category: 'Standard Bouquet',
      qty: 1 
    },
    { 
      id: 2, 
      name: 'Ceramic Minimalist Vase', 
      price: 25.00, 
      img: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=200',
      category: 'Accessories',
      qty: 2 
    },
    // Example of a Custom Bouquet from the Builder
    {
      id: 'custom-123',
      name: 'Custom Created Bouquet',
      price: 48.00,
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200',
      isCustom: true,
      qty: 1,
      details: {
        items: [
          { name: 'Red Rose (Stem)', qty: 6 },
          { name: 'Baby Breath (Filler)', qty: 2 }
        ],
        wrapping: { name: 'Kraft Paper' }
      }
    }
  ]);

  // --- ACTIONS ---

  const updateQty = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // --- CALCULATIONS ---

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 100 ? 0 : 15.00; // Free shipping over $100
  const total = subtotal + shipping;

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      
      {/* --- Navbar --- */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-100">
        <div className="text-3xl font-bold font-serif tracking-tight">Flori<span className="text-red-500">.</span></div>
        <div className="hidden md:flex gap-10 font-medium text-sm uppercase tracking-wide text-gray-600">
          <a href="#" className="hover:text-red-500 transition">Home</a>
          <a href="#" className="hover:text-red-500 transition">Shop</a>
        </div>
        <div className="flex items-center gap-5 text-gray-600">
          <div className="relative cursor-pointer text-red-500">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{cartItems.length}</span>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* --- Page Content --- */}
      <div className="container mx-auto px-6 py-12">
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Shopping Bag</h1>

        {cartItems.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-gray-50 rounded-sm">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't made your choice yet.</p>
            <button className="bg-red-600 text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-gray-900 transition rounded-sm">
              Start Shopping
            </button>
          </div>
        ) : (
          // Cart Content
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Cart Items List */}
            <div className="w-full lg:w-2/3">
              
              {/* Header Row (Desktop) */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-400">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-6 mt-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-gray-100 pb-6">
                    
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-4">
                      <div className="w-24 h-24 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-400 mb-2">{item.isCustom ? 'Custom Build' : item.category}</p>
                        
                        {/* Custom Item Details breakdown */}
                        {item.isCustom && (
                          <div className="text-[10px] text-gray-500 bg-gray-50 p-2 rounded-sm space-y-1">
                            {item.details.items.map((part, idx) => (
                              <div key={idx} className="flex justify-between gap-4">
                                <span>{part.name}</span>
                                <span>x{part.qty}</span>
                              </div>
                            ))}
                            {item.details.wrapping && (
                              <div className="flex justify-between gap-4 border-t border-gray-200 pt-1 mt-1 font-medium">
                                <span>Wrap: {item.details.wrapping.name}</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1 text-[10px] text-red-500 uppercase font-bold mt-2 hover:text-red-700 md:hidden"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price (Hidden Mobile) */}
                    <div className="hidden md:block col-span-2 text-center text-sm font-medium">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-12 md:col-span-2 flex justify-center md:justify-center">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button 
                          onClick={() => updateQty(item.id, -1)}
                          className="px-3 py-2 text-gray-500 hover:text-red-500 hover:bg-gray-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-bold w-10 text-center">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, 1)}
                          className="px-3 py-2 text-gray-500 hover:text-red-500 hover:bg-gray-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total & Remove Desktop */}
                    <div className="flex justify-between items-center col-span-12 md:col-span-2 md:justify-end">
                       <span className="md:hidden font-bold text-sm">Total:</span>
                       <div className="flex flex-col items-end gap-2">
                         <span className="font-bold text-red-500">${(item.price * item.qty).toFixed(2)}</span>
                         <button 
                            onClick={() => removeItem(item.id)}
                            className="hidden md:block text-gray-300 hover:text-red-500 transition"
                         >
                            <Trash2 size={16} />
                         </button>
                       </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-8">
                <a href="#" className="flex items-center gap-2 text-sm font-bold uppercase text-gray-500 hover:text-red-500 transition">
                  <ArrowLeft size={16} /> Continue Shopping
                </a>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-gray-50 p-8 rounded-sm sticky top-24">
                <h3 className="font-serif font-bold text-xl mb-6">Order Summary</h3>

                {/* Totals */}
                <div className="space-y-4 mb-8 border-b border-gray-200 pb-8">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">Shipping {shipping === 0 && <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded">FREE</span>}</span>
                    <span className="font-bold">{shipping === 0 ? '$0.00' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center mb-8">
                  <span className="uppercase text-sm font-bold tracking-widest">Total</span>
                  <span className="text-2xl font-serif font-bold text-red-600">${total.toFixed(2)}</span>
                </div>
                
                {/* Coupon Input */}
                <div className="mb-6">
                  <label className="text-xs uppercase font-bold text-gray-400 mb-2 block flex items-center gap-1"><Gift size={12}/> Gift card or discount code</label>
                  <div className="flex">
                    <input type="text" className="w-full p-3 text-sm border border-gray-200 focus:outline-none focus:border-red-500" placeholder="Enter code" />
                    <button className="bg-gray-200 text-gray-600 px-4 text-xs font-bold uppercase hover:bg-gray-300">Apply</button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-red-600 text-white py-4 font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition shadow-lg flex items-center justify-center gap-2 group rounded-sm">
                  Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </button>

                {/* Trust Badges */}
                <div className="mt-6 text-center">
                  <p className="text-[10px] text-gray-400 mb-2">Secure Checkout Guaranteed</p>
                  <div className="flex justify-center gap-2 opacity-50 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4" alt="Visa"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-4" alt="Mastercard"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" className="h-4" alt="Paypal"/>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;