import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';

const FloatingCart = () => {
  const { itemCount, items, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Dynamic Trigger Bubble */}
      <AnimatePresence>
        {itemCount > 0 && !isCartOpen && (
          <>
            <motion.button
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              onClick={() => setIsCartOpen(true)}
              className="hidden md:flex fixed bottom-12 z-[90] bg-[#E8A843] right-12 text-black w-16 h-16 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.4)] items-center justify-center hover:scale-105 transition-transform duration-500 group border border-black/10"
            >
              <ShoppingBag size={24} className="md:w-6 md:h-6" strokeWidth={2} />
              <span className="absolute -top-1 -right-1 bg-theme-text text-theme-base text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-xl border-2 border-[#E8A843]">
                {itemCount}
              </span>
            </motion.button>

            {/* Mobile Cart in Dock - Removed here, integrated into NavBar's unified dock */}
          </>
        )}
      </AnimatePresence>

      {/* Premium Order Summary Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-theme-overlay backdrop-blur-md z-[100]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-theme-base border-l border-theme-border z-[101] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-8 pt-8 pb-4 border-b border-theme-border flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif italic text-theme-text leading-tight">Order Summary</h2>
                  <p className="text-[var(--text-micro)] text-theme-text-subtle uppercase tracking-[0.2em] mt-1 font-bold">Your Curated Selection</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-3 hover:bg-theme-surface rounded-full transition-colors text-theme-text-muted hover:text-primary border border-transparent hover:border-theme-border"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items Area */}
              <div className="flex-1 overflow-y-auto px-8 py-8 scrollbar-none space-y-8">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 border border-theme-border rounded-full flex items-center justify-center mb-6 opacity-30">
                      <ShoppingBag size={32} />
                    </div>
                    <p className="text-theme-text-subtle italic font-light">Your archive is currently empty.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="w-24 h-24 bg-theme-panel border border-theme-border overflow-hidden shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-lg font-serif italic text-theme-text group-hover:text-primary transition-colors leading-none">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] text-theme-text-subtle hover:text-red-400 uppercase tracking-widest font-black transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-[10px] font-bold text-theme-text-subtle uppercase tracking-widest mt-2">Collector's Edition</p>
                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center gap-4 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 border border-theme-border flex items-center justify-center hover:border-primary transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs font-mono text-theme-text">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 border border-theme-border flex items-center justify-center hover:border-primary transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="text-sm font-mono text-theme-text-muted">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total Footer */}
              <div className="px-8 py-8 border-t border-theme-border bg-theme-base/50 backdrop-blur-sm">
                <div className="flex justify-between mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-theme-text-subtle">Acquisition Total</span>
                  <span className="text-xl font-serif text-theme-text italic">${cartTotal.toLocaleString()}</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => { navigate('/cart'); setIsCartOpen(false); }}
                    className="w-full h-16 border border-theme-border-strong text-theme-text hover:border-primary hover:text-primary transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-black relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out opacity-10" />
                    <span className="relative z-10">Review Selection</span>
                  </button>
                  <button 
                    onClick={() => { navigate('/checkout'); setIsCartOpen(false); }}
                    className="w-full h-16 bg-primary text-theme-text-inverse uppercase tracking-[0.4em] text-[10px] font-black flex items-center justify-center gap-4 transition-all hover:bg-primary-light group"
                  >
                    Finalize Acquisition
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                  </button>
                </div>
                <p className="mt-6 text-[8px] text-center text-theme-text-subtle uppercase tracking-widest font-light">
                  Excluding white-glove arrival fees & regional taxes.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCart;
