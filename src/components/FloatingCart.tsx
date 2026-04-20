import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';

const FloatingCart = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => navigate('/cart')}
          className="fixed bottom-36 right-8 md:right-12 z-50 bg-primary text-theme-text w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
        >
          <span className="material-symbols-outlined text-4xl">shopping_bag</span>
          <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0f0f0f]">
            {itemCount}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingCart;
