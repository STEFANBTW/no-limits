import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-theme-panel flex items-center justify-center px-4 font-sans text-theme-text-muted">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-theme-surface border border-theme-border p-5 md:p-10 shadow-2xl overflow-hidden max-h-[100dvh]"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <span className="font-serif font-bold tracking-[0.2em] uppercase text-3xl text-theme-text">No Limits</span>
          </Link>
          <h2 className="text-xl font-serif italic text-theme-text mb-2">Join the Atelier</h2>
          <p className="text-xs text-theme-text-subtle uppercase tracking-widest">Create an account to begin</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 text-red-200 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="space-y-1">
            <label className="block text-[9px] font-bold uppercase tracking-widest text-theme-text-subtle">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-theme-base border border-theme-border p-3 text-theme-text focus:border-primary outline-none transition-colors text-sm"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[9px] font-bold uppercase tracking-widest text-theme-text-subtle">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-theme-base border border-theme-border p-3 text-theme-text focus:border-primary outline-none transition-colors text-sm"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[9px] font-bold uppercase tracking-widest text-theme-text-subtle">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-theme-base border border-theme-border p-3 text-theme-text focus:border-primary outline-none transition-colors text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="group relative w-full px-8 py-3 bg-primary text-theme-text overflow-hidden transition-all"
          >
            <div className="absolute inset-0 bg-theme-text -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-sans text-[10px] font-bold tracking-[0.2em] uppercase group-hover:text-theme-base transition-colors duration-500">Create Account</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-theme-border">
          <p className="text-center text-[10px] text-theme-text-subtle mb-4">Or continue with</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2 border border-theme-border hover:bg-white hover:text-theme-text-inverse transition-colors text-[10px]">
              <span className="font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 border border-theme-border hover:bg-white hover:text-theme-text-inverse transition-colors text-[10px]">
              <span className="font-bold">Apple</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-theme-text-subtle">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
