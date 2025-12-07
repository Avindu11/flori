import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Toggle between Login and Signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-800">
      
      {/* --- Left Side: Form Section --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative animate-fade-in">
        
        {/* Back to Home Link */}
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition">
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <div className="w-full max-w-md">
          
          {/* Logo */}
          <div className="text-center mb-10">
            <span className="text-4xl font-bold font-serif tracking-tight text-gray-900">Flori<span className="text-red-500">.</span></span>
          </div>

          {/* Header Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin 
                ? "Enter your details to access your floral history." 
                : "Join Flori today for exclusive offers and faster checkout."}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pl-3 group-focus-within:text-red-500 transition">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full border border-gray-200 bg-gray-50 rounded-sm py-3 pl-10 pr-4 outline-none focus:border-red-500 focus:bg-white transition-all text-sm"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative group">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pl-3 group-focus-within:text-red-500 transition">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full border border-gray-200 bg-gray-50 rounded-sm py-3 pl-10 pr-4 outline-none focus:border-red-500 focus:bg-white transition-all text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pl-3 group-focus-within:text-red-500 transition">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full border border-gray-200 bg-gray-50 rounded-sm py-3 pl-10 pr-10 outline-none focus:border-red-500 focus:bg-white transition-all text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-gray-400 hover:text-red-500 transition">Forgot Password?</a>
              </div>
            )}

            {/* Submit Button */}
            <button className="w-full bg-red-600 text-white py-4 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2 group">
              {isLogin ? "Sign In" : "Sign Up"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

          </form>

          {/* Social Login Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-sm hover:bg-gray-50 transition text-sm text-gray-600 font-medium">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-sm hover:bg-gray-50 transition text-sm text-gray-600 font-medium">
              <img src="https://www.svgrepo.com/show/448234/apple.svg" alt="Apple" className="w-5 h-5" />
              Apple
            </button>
          </div>

          {/* Toggle Link */}
          <div className="mt-10 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={toggleAuthMode}
              className="text-red-500 font-bold ml-1 hover:underline underline-offset-4 focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>

        </div>
        
        {/* Footer Text */}
        <div className="absolute bottom-6 text-[10px] text-gray-300">
          © 2025 Flori Inc. Privacy Policy & Terms.
        </div>
      </div>

      {/* --- Right Side: Image Section (Hidden on Mobile) --- */}
      <div className="hidden md:flex w-1/2 bg-pink-50 relative overflow-hidden items-center justify-center">
        {/* Animated Background Image */}
        <div className="absolute inset-0">
           <img 
             src={isLogin 
               ? "https://images.unsplash.com/photo-1596073419667-9d77d59f033f?auto=format&fit=crop&q=80&w=1000" 
               : "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=1000"
             } 
             alt="Background" 
             className="w-full h-full object-cover opacity-90 transition-all duration-1000 ease-in-out transform hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center text-white px-12 max-w-lg">
           <span className="font-serif italic text-2xl md:text-3xl mb-4 block text-red-200 animate-fade-in-up">
             {isLogin ? "Welcome back to beauty" : "Join the blooming community"}
           </span>
           <h2 className="text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-wider leading-tight shadow-sm">
             {isLogin ? "Let Flowers Speak For You" : "Fresh Flowers, Delivered Daily"}
           </h2>
           <p className="text-red-50 opacity-90 text-lg leading-relaxed">
             Experience the joy of hand-picked arrangements designed to bring warmth and elegance to your life.
           </p>
        </div>
      </div>

    </div>
  );
};

export default Auth;