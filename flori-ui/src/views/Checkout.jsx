import React, { useState } from "react";
import {
  ShoppingBag,
  Lock,
  CreditCard,
  Banknote,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' or 'cod'
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Mock Cart Data (Summary)
  const cartSummary = {
    items: [
      {
        id: 1,
        name: "Pink Rose Bouquet",
        price: 60.0,
        qty: 1,
        img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 2,
        name: "Ceramic Vase",
        price: 25.0,
        qty: 1,
        img: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=200",
      },
    ],
    subtotal: 85.0,
    shipping: 15.0,
    total: 100.0,
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  // --- SUCCESS STATE ---
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4 text-gray-900">
          Thank you!
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Your order{" "}
          <span className="font-bold text-gray-900">#FLORI-8829</span> has been
          placed.
        </p>
        <p className="text-gray-400 mb-8 max-w-md">
          We sent an email to <b>customer@example.com</b> with your order
          confirmation and receipt.
        </p>
        <button className="bg-red-600 text-white px-8 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition">
          Continue Shopping
        </button>
      </div>
    );
  }

  // --- CHECKOUT FORM STATE ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold font-serif tracking-tight">
            Flori<span className="text-red-500">.</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Lock size={14} className="text-green-500" /> Secure Checkout
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* --- LEFT COLUMN: FORMS --- */}
          <div className="w-full lg:w-3/5">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
              <span className="cursor-pointer hover:text-red-500">Cart</span>
              <ChevronRight size={12} />
              <span className="font-bold text-gray-900">Checkout</span>
              <ChevronRight size={12} />
              <span>Confirmation</span>
            </div>

            <form onSubmit={handlePlaceOrder}>
              {/* Section 1: Contact */}
              <div className="bg-white p-8 rounded-sm shadow-sm mb-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none transition"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="accent-red-500"
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm text-gray-500"
                    >
                      Keep me up to date on news and exclusive offers
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping */}
              <div className="bg-white p-8 rounded-sm shadow-sm mb-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    2
                  </span>
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none transition"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                      Address
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="123 Flower St"
                      className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none transition"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                      City
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                      Postal Code
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none transition"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment */}
              <div className="bg-white p-8 rounded-sm shadow-sm mb-8">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  Payment Method
                </h3>

                {/* Payment Toggles */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 border rounded-sm p-4 cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === "card"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard size={20} />
                    <span className="font-bold text-sm">Credit Card</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex-1 border rounded-sm p-4 cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === "cod"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Banknote size={20} />
                    <span className="font-bold text-sm">Cash on Delivery</span>
                  </div>
                </div>

                {/* Card Inputs (Conditional) */}
                {paymentMethod === "card" && (
                  <div className="animate-fade-in space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full border border-gray-200 rounded-sm p-3 pl-10 text-sm focus:border-red-500 outline-none"
                        />
                        <CreditCard className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                          Expiry Date
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="MM / YY"
                          className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                          CVC
                        </label>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            placeholder="123"
                            className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-red-500 outline-none"
                          />
                          <Lock className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 text-[10px] text-gray-500 p-3 rounded-sm flex items-center gap-2">
                      <ShieldCheck size={14} className="text-green-600" />
                      Your transaction is secured with SSL encryption.
                    </div>
                  </div>
                )}

                {/* COD Message (Conditional) */}
                {paymentMethod === "cod" && (
                  <div className="animate-fade-in bg-yellow-50 border border-yellow-100 p-4 rounded-sm">
                    <p className="text-sm text-yellow-800 font-medium">
                      You will pay in cash upon delivery.
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Please ensure you have the exact amount ready for the
                      courier.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-8">
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-500 transition"
                >
                  <ArrowLeft size={16} /> Return to Cart
                </a>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-red-600 text-white px-8 py-4 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition min-w-[200px] flex justify-center"
                >
                  {isProcessing
                    ? "Processing..."
                    : paymentMethod === "cod"
                    ? "Place Order"
                    : `Pay $${cartSummary.total.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>

          {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-6 rounded-sm shadow-sm sticky top-24">
              <h3 className="font-serif font-bold text-xl mb-6">
                Order Summary
              </h3>

              {/* Product List */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartSummary.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-sm">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400">Standard Delivery</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ${cartSummary.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    ${cartSummary.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes (Estimated)</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6 flex justify-between items-center">
                <span className="uppercase text-sm font-bold tracking-widest text-gray-900">
                  Total
                </span>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-normal">
                    USD
                  </span>
                  <span className="text-2xl font-serif font-bold text-red-600">
                    ${cartSummary.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
