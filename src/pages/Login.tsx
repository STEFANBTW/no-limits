import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

const backgrounds = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=60&w=1200",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=60&w=1200",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=60&w=1200",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=60&w=1200"
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [currentBg, setCurrentBg] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password);
      
      // If there's an explicit redirect (e.g. from a protected route)
      if (location.state?.from) {
        navigate(location.state.from.pathname, { replace: true });
      } else {
        // Otherwise use role to determine dashboard
        navigate(loggedInUser.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 font-sans text-theme-text-muted overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-theme-overlay backdrop-blur-sm z-10"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 w-full max-w-md bg-[#141615]/90 border border-theme-border p-8 md:p-12 shadow-2xl backdrop-blur-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span className="font-serif font-bold tracking-[0.2em] uppercase text-4xl text-theme-text">No Limits</span>
          </Link>
          <h2 className="text-xl font-serif italic text-theme-text mb-2">Welcome Back</h2>
          <p className="text-xs text-theme-text-subtle uppercase tracking-widest">Sign in to access your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 text-red-200 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-text-subtle mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-theme-base border border-theme-border p-4 text-theme-text focus:border-primary outline-none transition-colors"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-text-subtle mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-theme-base border border-theme-border p-4 pr-12 text-theme-text focus:border-primary outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-text-subtle hover:text-theme-text transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Unlock size={16} /> : <Lock size={16} />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="group relative w-full px-10 py-5 bg-primary text-theme-text overflow-hidden transition-all"
          >
            <div className="absolute inset-0 bg-theme-text -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">Sign In</span>
          </button>
        </form>

        <div className="mt-6 p-4 bg-theme-base/50 border border-theme-border text-[10px] text-theme-text-subtle text-center">
          <p className="mb-2 font-bold uppercase tracking-widest text-theme-text">Demo Accounts</p>
          <div className="flex justify-between items-center px-2">
            <span className="text-left w-1/2"><b>Admin:</b> admin@example.com</span>
            <span className="text-right w-1/2 italic">password123</span>
          </div>
          <div className="flex justify-between items-center px-2 mt-1">
            <span className="text-left w-1/2"><b>User:</b> user@example.com</span>
            <span className="text-right w-1/2 italic">password123</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-theme-border">
          <p className="text-center text-xs text-theme-text-subtle mb-6">Or continue with</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-theme-border hover:bg-white hover:text-theme-text-inverse transition-colors text-xs">
              <span className="font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-theme-border hover:bg-white hover:text-theme-text-inverse transition-colors text-xs">
              <span className="font-bold">Apple</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-theme-text-subtle">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
