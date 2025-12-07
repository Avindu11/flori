import React, { useState } from "react";
import {
  Printer,
  Share2,
  PlusCircle,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";

const random = Math.random();

const ConfirmOrder = () => {

  const [isPrinting, setIsPrinting] = useState(false);

  // --- MOCK ORDER DATA ---
  const order = {
    id: "TRX-8829-XJ",
    date: "Dec 07, 2025",
    time: "10:42 AM",
    cashier: "Jane Admin",
    customer: "Walk-in Customer",
    method: "Credit Card (Visa **4242)",
    items: [
      { id: 1, name: "Red Velvet Rose", qty: 2, price: 65.0 },
      { id: 2, name: "Minimalist Vase", qty: 1, price: 25.0 },
      { id: 3, name: "Greeting Card", qty: 1, price: 5.0 },
    ],
    subtotal: 160.0,
    tax: 12.8,
    total: 172.8,
  };

  const handlePrint = () => {
    setIsPrinting(true);
    // Simulate print delay
    setTimeout(() => {
      setIsPrinting(false);
      alert("Print job sent to thermal printer.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* --- ACTIONS BAR --- */}
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition">
            <ArrowLeft size={16} /> Back to POS
          </button>
          <div className="flex gap-2">
            <button
              className="bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-blue-600 transition"
              title="Email Receipt"
            >
              <Mail size={18} />
            </button>
            <button
              className="bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-blue-600 transition"
              title="Share"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* --- RECEIPT CONTAINER --- */}
        <div className="bg-white shadow-2xl overflow-hidden relative animate-fade-in-up">
          {/* Decorative jagged top (CSS trick using gradients or keep simple) */}
          <div className="h-2 bg-red-600 w-full"></div>

          <div className="p-8 relative">
            {/* Watermark/Stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-green-500/20 text-green-500/20 text-6xl font-bold uppercase -rotate-12 p-4 rounded-lg pointer-events-none select-none">
              PAID
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold font-serif tracking-tight mb-2">
                Flori<span className="text-red-500">.</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Floral Studio & Gifts
              </p>

              <div className="text-xs text-gray-500 space-y-1 font-mono">
                <p className="flex items-center justify-center gap-1">
                  <MapPin size={10} /> 123 Flower Street, Garden City
                </p>
                <p className="flex items-center justify-center gap-1">
                  <Phone size={10} /> +1 (800) 123-4567
                </p>
                <p className="flex items-center justify-center gap-1">
                  <Mail size={10} /> hello@flori.com
                </p>
              </div>
            </div>

            {/* Meta Data */}
            <div className="border-t border-b border-dashed border-gray-200 py-4 mb-6 text-xs text-gray-500 font-mono">
              <div className="flex justify-between mb-1">
                <span>Order ID:</span>
                <span className="font-bold text-gray-900">{order.id}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Date:</span>
                <span>
                  {order.date} • {order.time}
                </span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Cashier:</span>
                <span>{order.cashier}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{order.customer}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <table className="w-full text-xs font-mono">
                <thead className="text-gray-400 border-b border-gray-100">
                  <tr>
                    <th className="text-left pb-2 font-normal">Qty</th>
                    <th className="text-left pb-2 font-normal">Item</th>
                    <th className="text-right pb-2 font-normal">Price</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 pr-2 align-top">{item.qty}x</td>
                      <td className="py-2 align-top">
                        <span className="block font-bold">{item.name}</span>
                      </td>
                      <td className="py-2 text-right align-top">
                        ${(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="border-t border-dashed border-gray-200 pt-4 space-y-2 font-mono text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (8%)</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-4 border-t border-gray-900">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Paid via {order.method}</span>
                <span>Auth: #99238</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-10 space-y-4">
              <div className="flex justify-center">
                {/* CSS Barcode Simulation */}
                <div className="h-12 flex items-end gap-[2px] opacity-70">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`bg-black ${
                        random > 0.5 ? "w-[2px]" : "w-[4px]"
                      } h-full`}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-mono uppercase">
                Returns accepted within 24 hours
                <br />
                with original receipt.
              </p>
              <p className="font-serif italic text-red-500">
                Thank you for blooming with us!
              </p>
            </div>
          </div>

          {/* Jagged Bottom (SVG) */}
          <div className="relative h-4 w-full -mt-1">
            <svg
              className="absolute bottom-0 w-full h-full text-gray-100"
              preserveAspectRatio="none"
              viewBox="0 0 100 10"
            >
              <polygon
                points="0,0 2,10 4,0 6,10 8,0 10,10 12,0 14,10 16,0 18,10 20,0 22,10 24,0 26,10 28,0 30,10 32,0 34,10 36,0 38,10 40,0 42,10 44,0 46,10 48,0 50,10 52,0 54,10 56,0 58,10 60,0 62,10 64,0 66,10 68,0 70,10 72,0 74,10 76,0 78,10 80,0 82,10 84,0 86,10 88,0 90,10 92,0 94,10 96,0 98,10 100,0 100,10 0,10"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* --- PRINT BUTTON --- */}
        <button
          onClick={handlePrint}
          disabled={isPrinting}
          className="w-full bg-gray-900 text-white py-4 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isPrinting ? (
            <>Printing Receipt...</>
          ) : (
            <>
              <Printer
                size={18}
                className="group-hover:scale-110 transition-transform"
              />{" "}
              Print Receipt
            </>
          )}
        </button>

        <button className="w-full bg-white border border-gray-200 text-gray-900 py-4 rounded-sm font-bold uppercase text-xs tracking-widest hover:border-gray-900 transition flex items-center justify-center gap-3">
          <PlusCircle size={18} /> New Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
