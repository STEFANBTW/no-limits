import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrder();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'google'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  if (items.length === 0) {
    return null;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      await createOrder({
        userId: user!.id,
        userName: user!.name,
        items,
        total: cartTotal,
        paymentMethod
      });
      
      clearCart();
      setIsProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-theme-panel pt-32 pb-24 px-6 md:px-12 font-sans text-theme-text-muted">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: Forms */}
        <div>
          <div className="mb-12">
            <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">Checkout</span>
            <h1 className="text-4xl font-serif text-theme-text italic">Secure Payment</h1>
          </div>

          {/* Steps Indicator */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-12 text-[10px] font-bold tracking-widest uppercase">
            <span className={step >= 1 ? "text-theme-text" : "text-slate-600"}>1. Shipping</span>
            <span className="text-slate-700">/</span>
            <span className={step >= 2 ? "text-theme-text" : "text-slate-600"}>2. Payment</span>
            <span className="text-slate-700">/</span>
            <span className={step >= 3 ? "text-theme-text" : "text-slate-600"}>3. Review</span>
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xl font-serif text-theme-text mb-6">Shipping Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input type="text" placeholder="First Name" className="bg-theme-surface border border-theme-border p-4 text-theme-text focus:border-primary outline-none" defaultValue={user?.name.split(' ')[0]} />
                <input type="text" placeholder="Last Name" className="bg-theme-surface border border-theme-border p-4 text-theme-text focus:border-primary outline-none" defaultValue={user?.name.split(' ')[1]} />
              </div>
              <input type="text" placeholder="Address Line 1" className="w-full bg-theme-surface border border-theme-border p-4 text-theme-text focus:border-primary outline-none" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input type="text" placeholder="City" className="bg-theme-surface border border-theme-border p-4 text-theme-text focus:border-primary outline-none" />
                <input type="text" placeholder="Postal Code" className="bg-theme-surface border border-theme-border p-4 text-theme-text focus:border-primary outline-none" />
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-white text-theme-text-inverse py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors mt-8"
              >
                Continue to Payment
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <h3 className="text-xl font-serif text-theme-text mb-6">Payment Method</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/10 text-theme-text' : 'border-theme-border text-theme-text-subtle hover:border-white/30'}`}
                >
                  <span className="material-symbols-outlined">credit_card</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Card</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary/10 text-theme-text' : 'border-theme-border text-theme-text-subtle hover:border-white/30'}`}
                >
                  <span className="material-symbols-outlined">account_balance</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Bank</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('google')}
                  className={`p-4 border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'google' ? 'border-primary bg-primary/10 text-theme-text' : 'border-theme-border text-theme-text-subtle hover:border-white/30'}`}
                >
                  <span className="material-symbols-outlined">payments</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Google Pay</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 p-6 bg-theme-surface border border-theme-border">
                  <input type="text" placeholder="Card Number" className="w-full bg-theme-base border border-theme-border p-4 text-theme-text focus:border-primary outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="bg-theme-base border border-theme-border p-4 text-theme-text focus:border-primary outline-none" />
                    <input type="text" placeholder="CVC" className="bg-theme-base border border-theme-border p-4 text-theme-text focus:border-primary outline-none" />
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-6 bg-theme-surface border border-theme-border text-sm text-theme-text-subtle">
                  <p className="mb-4">Please transfer the total amount to the following account:</p>
                  <div className="space-y-2 font-mono text-xs text-theme-text">
                    <p>Bank: No Limits Furniture Bank</p>
                    <p>Account: 8829 1029 3847 1102</p>
                    <p>Routing: 029384711</p>
                  </div>
                  <p className="mt-4 text-xs italic">Your order will be processed once payment is received.</p>
                </div>
              )}

              {paymentMethod === 'google' && (
                <div className="p-6 bg-theme-surface border border-theme-border flex justify-center">
                  <button className="bg-white text-theme-text-inverse px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
                    <span className="material-symbols-outlined">payments</span>
                    Pay with Google
                  </button>
                </div>
              )}

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="w-1/3 border border-theme-border py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-theme-border/50 transition-colors">Back</button>
                <button onClick={handlePayment} disabled={isProcessing} className="w-2/3 bg-primary text-theme-text py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  {isProcessing ? 'Processing...' : `Pay $${cartTotal.toLocaleString()}`}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-theme-surface p-8 border border-theme-border h-fit sticky top-32">
          <h3 className="text-lg font-serif text-theme-text mb-6">In Your Bag</h3>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-theme-surface shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div>
                  <p className="text-theme-text font-serif">{item.name}</p>
                  <p className="text-xs text-theme-text-subtle">Qty: {item.quantity}</p>
                  <p className="text-xs text-primary">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-theme-border flex justify-between text-theme-text text-xl font-serif">
            <span>Total</span>
            <span>${cartTotal.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
