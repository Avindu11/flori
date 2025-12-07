import React, { useState, useEffect } from 'react';
import { 
  Search, User, Heart, ShoppingBag, Menu, X, 
  Truck, Headphones, RefreshCcw, Tag,
  ChevronLeft, ChevronRight, Star, Instagram, Mail,
  // New Icons for Dropdown
  LogIn, LogOut, UserCircle, Package, History
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // New state for User Dropdown
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Carousel Data ---
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1587575494201-11fe74d90d38?auto=format&fit=crop&q=80&w=1200",
      subtitle: "Valentine Gift Collection",
      title: "Fresh Your Mind & Feeling Love"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1200",
      subtitle: "New Arrivals",
      title: "Elegant Bouquets for Every Occasion"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=1200",
      subtitle: "Special Offer",
      title: "Send Flowers, Send A Smile Today"
    }
  ];

  // Carousel Autoplay
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Products Data
  const products = [
    { id: 1, name: 'Pink Rose Bouquet', price: 60.00, badge: 'NEW', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'White Jasmine', price: 60.00, badge: 'SALE', img: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'Summer Blossom', price: 50.00, badge: '-30%', img: 'https://images.unsplash.com/photo-1533616688419-b79784dd8811?auto=format&fit=crop&q=80&w=600' },
    { id: 4, name: 'Purple Hyacinth', price: 30.00, badge: 'NEW', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600' },
  ];

  // Categories Data
  const categories = [
    { name: "Wedding", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=300" },
    { name: "Birthday", img: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&q=80&w=300" },
    { name: "Anniversary", img: "https://images.unsplash.com/photo-1537200029512-3254dd6f168e?auto=format&fit=crop&q=80&w=300" },
    { name: "Sympathy", img: "https://images.unsplash.com/photo-1605333396915-47ed6304b190?auto=format&fit=crop&q=80&w=300" }
  ];

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      
      {/* --- Top Bar --- */}
      <div className="bg-white border-b border-gray-100 text-[11px] text-gray-500 py-2 hidden md:block relative z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p>Welcome to Flori online store</p>
          <div className="flex gap-4"><span>Language: English</span><span>Currency: $ USD</span></div>
        </div>
      </div>

      {/* --- Main Navigation --- */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-50 bg-white/95 backdrop-blur-sm sticky top-0 transition-all">
        <div className="text-3xl font-bold font-serif tracking-tight">Flori<span className="text-red-500">.</span></div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 font-medium text-sm uppercase tracking-wide text-gray-600">
          <a href="#" className="text-red-500">Home</a><a href="#">Shop</a><a href="#">Occasions</a><a href="#">Blog</a>
        </div>

        {/* Icons Area */}
        <div className="flex items-center gap-5 text-gray-600">
          <Search className="w-5 h-5 hover:text-red-500 transition cursor-pointer" />
          
          {/* --- NEW USER DROPDOWN --- */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)} 
              className={`hover:text-red-500 transition focus:outline-none ${userMenuOpen ? 'text-red-500' : ''}`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-4 w-56 bg-white shadow-xl border border-gray-100 rounded-sm overflow-hidden animate-fade-in origin-top-right">
                <div className="py-2">
                  <Link to="/auth" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-red-500 flex items-center gap-3 transition-colors">
                    <LogIn size={16} /> Sign In
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <a href="#" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-red-500 flex items-center gap-3 transition-colors">
                    <UserCircle size={16} /> My Profile
                  </a>
                  <a href="#" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-red-500 flex items-center gap-3 transition-colors">
                    <Package size={16} /> My Orders
                  </a>
                  <a href="#" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-red-500 flex items-center gap-3 transition-colors">
                    <History size={16} /> Purchase History
                  </a>
                  <a href="#" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-red-500 flex items-center gap-3 transition-colors">
                    <Star size={16} /> Reviews
                  </a>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="#" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-red-500 flex items-center gap-3 transition-colors">
                    <LogOut size={16} /> Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* --- END USER DROPDOWN --- */}

          <Heart className="w-5 h-5 hover:text-red-500 transition cursor-pointer" />
          
          <div className="relative cursor-pointer group">
            <ShoppingBag className="w-5 h-5 group-hover:text-red-500 transition" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* --- Hero Carousel --- */}
      <section className="relative h-[500px] md:h-[650px] bg-pink-50 overflow-hidden group">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 flex items-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}>
            <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center h-full">
              <div className="w-full md:w-1/2 text-center md:text-left z-30 mt-8 md:mt-0">
                 <span className={`font-serif italic text-red-500 text-2xl mb-4 block transition duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>{slide.subtitle}</span>
                 <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8 transition duration-700 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>{slide.title}</h1>
                 <button className={`bg-red-600 text-white px-10 py-4 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition-all duration-300 shadow-lg ${index === currentSlide ? 'translate-y-0 opacity-100 delay-700' : 'translate-y-10 opacity-0'}`}>Shop Now</button>
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex justify-center items-center">
                 <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-pink-200/50 rounded-full blur-3xl -z-10"></div>
                 <img src={slide.image} alt={slide.title} className={`max-h-full object-contain drop-shadow-xl transition duration-1000 ${index === currentSlide ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} />
              </div>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/50 p-3 rounded-full hover:bg-white hover:text-red-500 transition hidden group-hover:block"><ChevronLeft /></button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/50 p-3 rounded-full hover:bg-white hover:text-red-500 transition hidden group-hover:block"><ChevronRight /></button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-red-500 w-8' : 'bg-gray-300'}`} />
          ))}
        </div>
      </section>

      {/* --- Parallax Section --- */}
      <section className="relative h-[400px] md:h-[500px] bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&q=80&w=1920')` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6">
            <span className="font-serif italic text-2xl md:text-3xl mb-4 block text-pink-200">Capture the moment</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-wider">Let Flowers Speak</h2>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-red-500 hover:text-white transition-colors duration-300">Explore Collection</button>
        </div>
      </section>

      {/* --- Promo Banners --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden h-64 bg-yellow-50 flex items-center justify-center"><img src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"/><div className="relative z-10 bg-white/90 p-4 text-center min-w-[150px] shadow-sm"><span className="text-red-500 font-serif italic">Top Friday</span><h3 className="font-bold text-lg">Yellow Gold</h3></div></div>
            <div className="relative group overflow-hidden h-64 bg-gray-100 flex items-center justify-center"><img src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"/><div className="relative z-10 bg-white/90 p-4 text-center min-w-[150px] shadow-sm"><span className="text-red-500 font-serif italic">Black Friday</span><h3 className="font-bold text-lg">Orchid Stick</h3></div></div>
            <div className="relative group overflow-hidden h-64 bg-pink-50 flex items-center justify-center"><img src="https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"/><div className="relative z-10 bg-white/90 p-4 text-center min-w-[150px] shadow-sm"><span className="text-red-500 font-serif italic">10% Off</span><h3 className="font-bold text-lg">Tulip Flower</h3></div></div>
        </div>
      </section>

      {/* --- Shop By Occasion --- */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Shop By Occasion</h2>
            <p className="text-gray-400 text-sm italic font-serif">Perfect arrangements for every moment</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {categories.map((cat, idx) => (
              <div key={idx} className="group flex flex-col items-center cursor-pointer">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg relative mb-4">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-300"></div>
                </div>
                <h4 className="font-bold uppercase tracking-wider text-sm group-hover:text-red-500 transition">{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Features Icons --- */}
       <div className="container mx-auto px-6 my-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100 p-8 rounded-sm">
          <div className="flex items-center gap-3"><Truck className="w-8 h-8 text-gray-400" /><div><h4 className="font-bold text-xs uppercase">Free Shipping</h4><p className="text-[10px] text-gray-400">Orders over $100</p></div></div>
          <div className="flex items-center gap-3"><Headphones className="w-8 h-8 text-gray-400" /><div><h4 className="font-bold text-xs uppercase">Support 24/7</h4><p className="text-[10px] text-gray-400">Contact us anytime</p></div></div>
          <div className="flex items-center gap-3"><RefreshCcw className="w-8 h-8 text-gray-400" /><div><h4 className="font-bold text-xs uppercase">Money Return</h4><p className="text-[10px] text-gray-400">30 days allowed</p></div></div>
          <div className="flex items-center gap-3"><Tag className="w-8 h-8 text-gray-400" /><div><h4 className="font-bold text-xs uppercase">Order Discount</h4><p className="text-[10px] text-gray-400">Orders over $150</p></div></div>
        </div>
      </div>

      {/* --- Products Grid --- */}
      <section className="py-10 mb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12"><h2 className="text-3xl font-bold mb-3">New Products</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group text-center">
                <div className="relative bg-gray-50 h-[300px] mb-4 overflow-hidden">
                   <img src={product.img} alt={product.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                   <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 uppercase ${product.badge.includes('%') || product.badge === 'SALE' ? 'bg-black' : 'bg-red-600'}`}>{product.badge}</span>
                   <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <button className="bg-white p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition"><Heart className="w-4 h-4"/></button>
                      <button className="bg-white p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition"><ShoppingBag className="w-4 h-4"/></button>
                   </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1 hover:text-red-500 cursor-pointer">{product.name}</h3>
                <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="text-red-500 font-serif italic text-xl mb-2 block">Customer Love</span>
          <h2 className="text-3xl font-bold mb-12">What They Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 shadow-sm rounded-sm hover:-translate-y-1 transition duration-300">
                <div className="flex justify-center text-yellow-400 mb-4 gap-1">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-500 text-sm mb-6 italic leading-relaxed">"The flowers arrived fresh and beautiful. The packaging was exquisite. Absolutely recommended for special occasions!"</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"><img src={`https://i.pravatar.cc/150?img=${i+5}`} alt="User" /></div>
                  <div className="text-left">
                    <h5 className="font-bold text-xs uppercase">Jane Doe</h5>
                    <span className="text-[10px] text-gray-400">Happy Customer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Instagram Gallery --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold">#FloriMoments</h2>
              <p className="text-gray-400 text-sm mt-1">Follow us on Instagram</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase hover:text-red-500 transition"><Instagram size={16}/> View Gallery</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
             <div className="h-64 overflow-hidden relative group"><img src="https://images.unsplash.com/photo-1596568471206-88090886cb4f?auto=format&fit=crop&w=400" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"><Instagram/></div></div>
             <div className="h-64 overflow-hidden relative group"><img src="https://images.unsplash.com/photo-1563241527-3004b7be025f?auto=format&fit=crop&w=400" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"><Instagram/></div></div>
             <div className="h-64 overflow-hidden relative group"><img src="https://images.unsplash.com/photo-1490750967868-58cb75069ed6?auto=format&fit=crop&w=400" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"><Instagram/></div></div>
             <div className="h-64 overflow-hidden relative group"><img src="https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=400" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"><Instagram/></div></div>
             <div className="h-64 overflow-hidden relative group"><img src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=400" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"><Instagram/></div></div>
          </div>
        </div>
      </section>

      {/* --- Newsletter --- */}
      <section className="bg-red-600 py-16 text-white">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
               <h2 className="text-3xl font-bold mb-2">Join Our Newsletter</h2>
               <p className="text-red-100 opacity-90">Get 15% off your first order and exclusive access to new collections.</p>
            </div>
            <div className="md:w-1/2 w-full">
               <div className="bg-white/10 p-1 rounded-sm flex">
                  <div className="pl-4 flex items-center text-red-200"><Mail size={20}/></div>
                  <input type="email" placeholder="Your email address" className="bg-transparent w-full p-4 text-white placeholder-red-200 focus:outline-none" />
                  <button className="bg-white text-red-600 px-8 font-bold uppercase text-xs tracking-widest hover:bg-gray-900 hover:text-white transition duration-300">Subscribe</button>
               </div>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
           <div>
              <div className="text-2xl font-bold font-serif mb-4">Flori<span className="text-red-500">.</span></div>
              <p className="text-gray-400 mb-4">Bringing nature's elegance to your doorstep with hand-picked arrangements.</p>
           </div>
           <div>
              <h4 className="font-bold mb-4 uppercase">Information</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-red-500">About Us</a></li>
                <li><a href="#" className="hover:text-red-500">Delivery Information</a></li>
                <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-500">Terms & Conditions</a></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold mb-4 uppercase">My Account</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-red-500">My Account</a></li>
                <li><a href="#" className="hover:text-red-500">Order History</a></li>
                <li><a href="#" className="hover:text-red-500">Wish List</a></li>
                <li><a href="#" className="hover:text-red-500">Newsletter</a></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold mb-4 uppercase">Contact</h4>
              <p className="text-gray-500 mb-2">123 Flower Street, Garden City, NY 11530</p>
              <p className="text-gray-500 mb-2">+1 (800) 123-4567</p>
              <p className="text-gray-500">hello@flori.com</p>
           </div>
        </div>
        <div className="container mx-auto px-6 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2025 Flori. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default Index;