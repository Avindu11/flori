import React, { useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Filter,
  ChevronDown,
  Check,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from "lucide-react";

const Shop = () => {
  const [activeTab, setActiveTab] = useState("browse"); // 'browse' or 'builder'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // --- STATE FOR CUSTOM BUILDER ---
  const [builderStep, setBuilderStep] = useState(1);
  const [customBouquet, setCustomBouquet] = useState({
    items: [], // { id, name, price, qty, type }
    wrapping: null,
  });

  // --- STATE FOR SHOP ---
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  // --- MOCK DATA ---
  const categories = ["All", "Bouquets", "Flower Box", "Vases", "Accessories"];

  const shopProducts = [
    {
      id: 1,
      name: "Red Velvet Rose",
      category: "Bouquets",
      price: 65.0,
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      name: "White Elegance",
      category: "Flower Box",
      price: 85.0,
      img: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 3,
      name: "Spring Whisper",
      category: "Bouquets",
      price: 55.0,
      img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 4,
      name: "Ceramic Minimalist",
      category: "Vases",
      price: 25.0,
      img: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 5,
      name: "Pink Promise",
      category: "Bouquets",
      price: 70.0,
      img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 6,
      name: "Golden Ribbon",
      category: "Accessories",
      price: 5.0,
      img: "https://images.unsplash.com/photo-1603533723824-2c06121404c0?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const builderOptions = {
    flowers: [
      {
        id: 101,
        name: "Red Rose (Stem)",
        price: 5.0,
        img: "https://images.unsplash.com/photo-1548695607-9c73430ba065?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 102,
        name: "White Lily (Stem)",
        price: 6.5,
        img: "https://images.unsplash.com/photo-1588628566587-dbd176de9d63?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 103,
        name: "Sunflower (Stem)",
        price: 4.0,
        img: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 104,
        name: "Pink Tulip (Stem)",
        price: 4.5,
        img: "https://images.unsplash.com/photo-1520302630591-a6e7850e8055?auto=format&fit=crop&q=80&w=200",
      },
    ],
    accessories: [
      {
        id: 201,
        name: "Baby Breath (Filler)",
        price: 8.0,
        img: "https://images.unsplash.com/photo-1523694380796-039c39d89201?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 202,
        name: "Eucalyptus Leaves",
        price: 6.0,
        img: "https://images.unsplash.com/photo-1517134371900-50d241724395?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 203,
        name: "Greeting Card",
        price: 3.0,
        img: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=200",
      },
    ],
    wrapping: [
      { id: 301, name: "Kraft Paper", price: 2.0, color: "#D2B48C" },
      { id: 302, name: "Pink Silk Ribbon", price: 4.0, color: "#FFC0CB" },
      { id: 303, name: "Luxury Black Wrap", price: 5.0, color: "#000000" },
      { id: 304, name: "No Wrapping", price: 0.0, color: "#FFFFFF" },
    ],
  };

  // --- ACTIONS ---

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: new Date() }]);
    setCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  // Builder Logic
  const addBuilderItem = (item) => {
    const existing = customBouquet.items.find((i) => i.id === item.id);
    if (existing) {
      setCustomBouquet({
        ...customBouquet,
        items: customBouquet.items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        ),
      });
    } else {
      setCustomBouquet({
        ...customBouquet,
        items: [...customBouquet.items, { ...item, qty: 1 }],
      });
    }
  };

  const removeBuilderItem = (itemId) => {
    const existing = customBouquet.items.find((i) => i.id === itemId);
    if (existing.qty > 1) {
      setCustomBouquet({
        ...customBouquet,
        items: customBouquet.items.map((i) =>
          i.id === itemId ? { ...i, qty: i.qty - 1 } : i
        ),
      });
    } else {
      setCustomBouquet({
        ...customBouquet,
        items: customBouquet.items.filter((i) => i.id !== itemId),
      });
    }
  };

  const setBuilderWrapping = (wrap) => {
    setCustomBouquet({ ...customBouquet, wrapping: wrap });
  };

  const calculateCustomTotal = () => {
    const itemsTotal = customBouquet.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const wrapTotal = customBouquet.wrapping ? customBouquet.wrapping.price : 0;
    return itemsTotal + wrapTotal;
  };

  const addCustomBouquetToCart = () => {
    if (customBouquet.items.length === 0) return;
    const finalProduct = {
      id: `custom-${Date.now()}`,
      name: "Custom Created Bouquet",
      price: calculateCustomTotal(),
      img: "https://images.unsplash.com/photo-1563241527-3004b7be025f?auto=format&fit=crop&q=80&w=200",
      isCustom: true,
      details: customBouquet,
    };
    addToCart(finalProduct);
    // Reset builder
    setCustomBouquet({ items: [], wrapping: null });
    setBuilderStep(1);
    setActiveTab("browse");
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen relative">
      {/* --- Navbar (Consistent) --- */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="text-3xl font-bold font-serif tracking-tight">
          Flori<span className="text-red-500">.</span>
        </div>
        <div className="hidden md:flex gap-10 font-medium text-sm uppercase tracking-wide text-gray-600">
          <a href="#" className="hover:text-red-500 transition">
            Home
          </a>
          <a href="#" className="text-red-500">
            Shop
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Occasions
          </a>
        </div>
        <div className="flex items-center gap-5 text-gray-600">
          <Search className="w-5 h-5 hover:text-red-500 cursor-pointer" />
          <User className="w-5 h-5 hover:text-red-500 cursor-pointer" />
          <div
            className="relative cursor-pointer group"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-red-500" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- Page Header & Tabs --- */}
      <div className="bg-pink-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-bold mb-6">Our Collection</h1>

          <div className="inline-flex bg-white p-1 rounded-full shadow-sm">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "browse"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Browse Shop
            </button>
            <button
              onClick={() => setActiveTab("builder")}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "builder"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Make Your Own
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================================
          MODE 1: BROWSE SHOP
         ========================================================== */}
      {activeTab === "browse" && (
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 animate-fade-in">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} className="text-red-500" />
                <h3 className="font-bold uppercase text-sm">Filters</h3>
              </div>
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border border-gray-200 p-3 rounded-sm text-sm focus:border-red-500 outline-none"
                />
                <Search className="absolute right-3 top-3 text-gray-300 w-4 h-4" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase mb-4 text-gray-500 tracking-widest">
                Categories
              </h4>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition ${
                          selectedCategory === cat
                            ? "bg-red-500 border-red-500"
                            : "border-gray-300 group-hover:border-red-500"
                        }`}
                      >
                        {selectedCategory === cat && (
                          <Check size={10} className="text-white" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="category"
                        className="hidden"
                        onChange={() => setSelectedCategory(cat)}
                        checked={selectedCategory === cat}
                      />
                      <span
                        className={`text-sm transition ${
                          selectedCategory === cat
                            ? "text-gray-900 font-bold"
                            : "text-gray-500 group-hover:text-red-500"
                        }`}
                      >
                        {cat}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase mb-4 text-gray-500 tracking-widest">
                Price Range
              </h4>
              <input
                type="range"
                className="w-full accent-red-500 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>$0</span>
                <span>$200+</span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-500">
                Showing {shopProducts.length} results
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-red-500">
                Sort by: Newest <ChevronDown size={14} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {shopProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative bg-gray-50 h-[300px] mb-4 overflow-hidden rounded-sm">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => addToCart(product)}
                      className="absolute bottom-0 w-full bg-white/90 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all translate-y-full group-hover:translate-y-0 duration-300"
                    >
                      Add to Cart
                    </button>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                      <Heart size={16} />
                    </button>
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                    {product.category}
                  </p>
                  <span className="text-red-500 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          MODE 2: CUSTOM BOUQUET BUILDER
         ========================================================== */}
      {activeTab === "builder" && (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Steps & Selection Area */}
            <div className="w-full lg:w-2/3">
              {/* Stepper */}
              <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
                {[
                  { num: 1, label: "Choose Flowers" },
                  { num: 2, label: "Add Accessories" },
                  { num: 3, label: "Wrapping" },
                ].map((step) => (
                  <div
                    key={step.num}
                    className={`flex items-center gap-3 cursor-pointer ${
                      builderStep >= step.num ? "opacity-100" : "opacity-40"
                    }`}
                    onClick={() => setBuilderStep(step.num)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        builderStep === step.num
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {step.num}
                    </div>
                    <span
                      className={`text-sm font-bold uppercase hidden sm:block ${
                        builderStep === step.num
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Flowers */}
              {builderStep === 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {builderOptions.flowers.map((flower) => (
                    <div
                      key={flower.id}
                      className="border border-gray-100 p-4 rounded-sm hover:shadow-md transition text-center"
                    >
                      <div className="h-32 mb-4 overflow-hidden rounded-sm">
                        <img
                          src={flower.img}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{flower.name}</h4>
                      <p className="text-red-500 text-xs font-bold mb-4">
                        ${flower.price.toFixed(2)} / stem
                      </p>
                      <button
                        onClick={() =>
                          addBuilderItem({ ...flower, type: "flower" })
                        }
                        className="border border-gray-200 rounded-full p-2 hover:bg-red-50 hover:border-red-200 text-red-500 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Accessories */}
              {builderStep === 2 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {builderOptions.accessories.map((acc) => (
                    <div
                      key={acc.id}
                      className="border border-gray-100 p-4 rounded-sm hover:shadow-md transition text-center"
                    >
                      <div className="h-32 mb-4 overflow-hidden rounded-sm">
                        <img
                          src={acc.img}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{acc.name}</h4>
                      <p className="text-red-500 text-xs font-bold mb-4">
                        ${acc.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() =>
                          addBuilderItem({ ...acc, type: "accessory" })
                        }
                        className="border border-gray-200 rounded-full p-2 hover:bg-red-50 hover:border-red-200 text-red-500 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Wrapping */}
              {builderStep === 3 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {builderOptions.wrapping.map((wrap) => (
                    <div
                      key={wrap.id}
                      onClick={() => setBuilderWrapping(wrap)}
                      className={`cursor-pointer border p-4 rounded-sm transition text-center ${
                        customBouquet.wrapping?.id === wrap.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-100 hover:shadow-md"
                      }`}
                    >
                      <div
                        className="h-20 w-20 mx-auto rounded-full mb-4 shadow-inner"
                        style={{ backgroundColor: wrap.color }}
                      ></div>
                      <h4 className="font-bold text-sm mb-1">{wrap.name}</h4>
                      <p className="text-gray-400 text-xs">
                        ${wrap.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Builder Navigation */}
              <div className="flex justify-between mt-12">
                <button
                  disabled={builderStep === 1}
                  onClick={() => setBuilderStep((prev) => prev - 1)}
                  className="px-6 py-2 border border-gray-300 text-gray-500 rounded-sm hover:border-gray-900 disabled:opacity-30"
                >
                  Back
                </button>
                <button
                  onClick={() =>
                    builderStep < 3 ? setBuilderStep((prev) => prev + 1) : null
                  }
                  className={`px-6 py-2 bg-gray-900 text-white rounded-sm hover:bg-red-600 transition ${
                    builderStep === 3 ? "hidden" : "block"
                  }`}
                >
                  Next Step
                </button>
              </div>
            </div>

            {/* Live Preview Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white border border-gray-200 p-6 rounded-sm sticky top-24 shadow-lg">
                <h3 className="font-serif font-bold text-xl mb-6">
                  Your Creation
                </h3>

                {customBouquet.items.length === 0 ? (
                  <p className="text-sm text-gray-400 italic mb-6">
                    Start adding stems to see them here.
                  </p>
                ) : (
                  <ul className="space-y-4 mb-6">
                    {customBouquet.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <div>
                          <span className="font-bold block">{item.name}</span>
                          <span className="text-gray-400 text-xs">
                            ${item.price.toFixed(2)} x {item.qty}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeBuilderItem(item.id)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-500"
                          >
                            <Minus size={12} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => addBuilderItem(item)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-500"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </li>
                    ))}
                    {customBouquet.wrapping && (
                      <li className="flex justify-between items-center text-sm pt-4 border-t border-dashed border-gray-200">
                        <div>
                          <span className="font-bold block">
                            Wrap: {customBouquet.wrapping.name}
                          </span>
                        </div>
                        <span className="text-gray-500">
                          ${customBouquet.wrapping.price.toFixed(2)}
                        </span>
                      </li>
                    )}
                  </ul>
                )}

                <div className="border-t border-gray-900 pt-4 flex justify-between items-end mb-6">
                  <span className="uppercase text-xs font-bold tracking-widest text-gray-500">
                    Total Estimate
                  </span>
                  <span className="text-2xl font-serif font-bold text-red-500">
                    ${calculateCustomTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={addCustomBouquetToCart}
                  disabled={customBouquet.items.length === 0}
                  className="w-full bg-red-600 text-white py-4 font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Custom Bouquet To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          CART SLIDE-OUT DRAWER
         ========================================================== */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-serif font-bold text-xl">
                Shopping Cart ({cart.length})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your cart is currently empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0">
                      <img
                        src={item.img}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-300 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* If Custom Item, show details */}
                      {item.isCustom ? (
                        <div className="text-[10px] text-gray-500 mb-2 bg-gray-50 p-2 rounded-sm">
                          {item.details.items.map((d) => (
                            <div key={d.id}>
                              {d.qty}x {d.name}
                            </div>
                          ))}
                          {item.details.wrapping && (
                            <div>+ {item.details.wrapping.name}</div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 mb-2">
                          {item.category}
                        </p>
                      )}

                      <div className="text-red-500 font-bold text-sm">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold uppercase text-xs tracking-wider">
                  Subtotal
                </span>
                <span className="font-bold text-xl">
                  ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-gray-900 text-white py-4 font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
