import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-theme-panel pt-32 px-6 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-5xl text-slate-700 mb-6">shopping_bag</span>
        <h2 className="text-3xl font-serif text-theme-text mb-4">Your collection is empty</h2>
        <p className="text-theme-text-subtle mb-8">Discover our curated artifacts to begin.</p>
        <Link to="/shop" className="group relative px-10 py-5 bg-white dark:bg-theme-panel border border-theme-border text-theme-text overflow-hidden transition-all">
          <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-black transition-colors duration-500">Explore Gallery</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-panel pt-32 pb-24 px-6 md:px-12 font-sans text-theme-text-muted">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-4xl font-serif text-theme-text mb-12 italic">Your Selection</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-8">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-6 border-b border-theme-border pb-8"
              >
                <div className="w-24 h-32 bg-theme-surface shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-1 sm:gap-4">
                      <h3 className="text-lg sm:text-xl font-serif text-theme-text leading-tight">{item.name}</h3>
                      <span className="text-sm font-light text-theme-text-subtle whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-primary">Ready to ship</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center gap-4 border border-theme-border px-3 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-theme-text-subtle hover:text-theme-text transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-theme-text-subtle hover:text-theme-text transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] uppercase tracking-widest text-theme-text-subtle hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-theme-surface p-8 border border-theme-border lg:sticky lg:top-32">
              <h3 className="text-lg font-serif text-theme-text mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8 text-sm font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-theme-border flex justify-between text-theme-text font-medium text-base">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="group relative w-full h-16 bg-white dark:bg-theme-panel border border-theme-border text-theme-text overflow-hidden transition-all flex items-center justify-center gap-2"
              >
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <div className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-500">
                  <span className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase">Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </button>
              
              <p className="text-center text-[10px] text-slate-600 mt-4">
                Secure checkout powered by No Limits Furniture
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
