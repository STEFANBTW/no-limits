import React, { useState, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import FloatingCart from './FloatingCart';
import Chatbot from './Chatbot';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const location = useLocation();
  const element = useOutlet(); // Snapshot the routing context for exit animations
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Set a global CSS variable for sidebar width to help with fixed positioning in other pages
    const updateWidth = () => {
      const width = window.innerWidth >= 768 ? (isCollapsed ? '80px' : '240px') : '0px';
      document.documentElement.style.setProperty('--sidebar-width', width);
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [isCollapsed]);

  return (
    <div className="min-h-screen bg-theme-base text-theme-text">
      {/* Side Navigation */}
      <NavBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <main className={`relative flex flex-col transition-all duration-300 ${isCollapsed ? 'md:ml-[80px]' : 'md:ml-[240px]'} min-h-screen bg-theme-base`}>
        <div className="flex-1">
          <AnimatePresence mode="wait" initial={true}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="!transform-none"
            >
              {element}
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
        <FloatingCart />
      </main>
      
      <Chatbot />
    </div>
  );
};

export default Layout;
