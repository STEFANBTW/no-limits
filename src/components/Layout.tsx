import React, { useState, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import FloatingCart from './FloatingCart';
import Chatbot from './Chatbot';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const location = useLocation();
  const element = useOutlet();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      
      const width = desktop ? (isCollapsed ? '80px' : '240px') : '0px';
      document.documentElement.style.setProperty('--sidebar-width', width);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  return (
    <div className="min-h-screen bg-theme-base text-theme-text">
      {/* Side Navigation */}
      <NavBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <main 
        className={`relative flex flex-col transition-all duration-300 ${
          isDesktop ? (isCollapsed ? 'ml-[80px]' : 'ml-[240px]') : 'ml-0'
        } min-h-screen bg-theme-base`}
      >
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
