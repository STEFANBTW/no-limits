import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User, Sun, Moon, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavBarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (v: boolean) => void;
}

const NavBar = ({ isCollapsed = false, setIsCollapsed = () => {} }: NavBarProps) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEstateOpen, setIsEstateOpen] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();
  
  const [isLightMode, setIsLightMode] = useState(() => {
    return document.documentElement.classList.contains('light-theme');
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-theme');
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
      return newMode;
    });
  };

  const navItems = [
    { name: 'Home', path: '/', label: 'Atelier' },
    { name: 'Shop', path: '/shop', label: 'Gallery' },
    { name: 'Archive', path: '/archive', label: 'History' },
    { name: 'Bespoke', path: '/bespoke', label: 'Commission' },
  ];

  const curatedItems = [
    { name: 'The Dining', path: '/dining', label: 'Gastronomy', image: '/images/An_image_of_202604170110.png', span: 'col-span-2 row-span-2' },
    { name: 'The Living', path: '/living', label: 'Parlor', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000', span: 'col-span-1 row-span-1' },
    { name: 'The Outdoor', path: '/outdoor', label: 'Landscape', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000', span: 'col-span-1 row-span-1' },
    { name: 'The Sanctuary', path: '/sanctuary', label: 'Master Suite', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1000', span: 'col-span-2 row-span-1' },
    { name: 'The Cellar', path: '/cellar', label: 'Cellar', image: '/images/close_up_photo_202604170149.png', span: 'col-span-1 row-span-2' },
    { name: 'The Study', path: '/study', label: 'Executive', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000', span: 'col-span-1 row-span-1' },
    { name: 'The Wellness', path: '/wellness', label: 'Spa', image: '/images/create_another_one,_202604170150.png', span: 'col-span-1 row-span-1' },
    { name: 'The Entryway', path: '/entryway', label: 'Foyer', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000', span: 'col-span-3 row-span-1' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isEstateActive = curatedItems.some(item => location.pathname === item.path);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[80px] bg-theme-surface border-b border-theme-border z-50 flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-theme-border-strong rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-sm">chair</span>
          </div>
          <span className="font-serif font-bold tracking-[0.2em] uppercase text-sm text-theme-text">No Limits</span>
        </Link>
        <button onClick={() => setIsMobileOpen(true)} className="text-theme-icon">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <AnimatePresence>
        {(isMobileOpen || window.innerWidth >= 768) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed top-0 left-0 bottom-0 z-50 bg-theme-surface border-r border-theme-border flex flex-col transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[240px]'} ${isMobileOpen ? 'w-[280px] translate-x-0' : '-translate-x-full md:translate-x-0'}`}
          >
            {/* Collapse Toggle Button (Desktop Only) */}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-10 w-6 h-6 bg-theme-base rounded-full hidden md:flex items-center justify-center text-theme-text hover:bg-primary hover:text-white transition-all z-50 border border-theme-border shadow-sm hover:shadow-md hover:border-primary hover:scale-110"
            >
              <ChevronRight size={14} className={`transform transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
            </button>

            {/* Close button for mobile */}
            <div className="md:hidden absolute top-6 right-6">
              <button onClick={() => setIsMobileOpen(false)} className="text-theme-icon">
                <X size={24} />
              </button>
            </div>

            {/* Logo Area */}
            <div className={`flex flex-col items-center border-b border-theme-border transition-all duration-300 ${isCollapsed && !isMobileOpen ? 'py-4 px-0' : 'py-6 px-6'}`}>
              <Link to="/" className="flex flex-col items-center gap-4 group" onClick={() => setIsMobileOpen(false)}>
                <div className="w-12 h-12 border border-theme-border-strong rounded-full flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                  <span className="material-symbols-outlined text-primary text-4xl">chair</span>
                </div>
                {(!isCollapsed || isMobileOpen) && (
                  <div className="flex flex-col items-center text-center overflow-hidden">
                    <span className="font-serif font-bold tracking-[0.2em] uppercase text-lg leading-none text-theme-text whitespace-nowrap">No Limits</span>
                    <span className="text-[0.6rem] font-sans tracking-[0.3em] text-theme-text-muted uppercase mt-2 whitespace-nowrap">Est. 2023</span>
                  </div>
                )}
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-0 scrollbar-none">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`group flex items-center py-2 transition-colors relative ${active ? 'text-primary' : 'text-theme-text-muted hover:text-theme-text'}`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeNavLeft"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"
                      />
                    )}
                    <div className={`flex flex-col transition-all duration-300 ${isCollapsed && !isMobileOpen ? 'items-center w-full' : 'pl-8'}`}>
                      {isCollapsed && !isMobileOpen ? (
                        <span className={`font-serif text-lg uppercase ${active ? 'italic text-primary' : 'text-theme-text-subtle'}`}>{item.name.charAt(0)}</span>
                      ) : (
                        <>
                          <span className={`font-serif text-xl ${active ? 'italic' : ''}`}>{item.name}</span>
                          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#54524F] mt-1 group-hover:text-theme-text-muted transition-colors">
                            {item.label}
                          </span>
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}

              {/* The Estate Flyout Trigger */}
              <div 
                className="relative flex flex-col mt-2"
                onMouseEnter={() => !isMobileOpen && setIsEstateOpen(true)}
                onMouseLeave={() => !isMobileOpen && setIsEstateOpen(false)}
              >
                <button 
                  onClick={() => isMobileOpen && setIsEstateOpen(!isEstateOpen)}
                  className={`group flex items-center py-3 transition-colors relative w-full ${isEstateActive ? 'text-primary' : 'text-theme-text-muted hover:text-theme-text'}`}
                >
                  {isEstateActive && (
                    <motion.div layoutId="activeNavLeft" className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
                  )}
                  <div className={`flex flex-col transition-all duration-300 ${isCollapsed && !isMobileOpen ? 'items-center w-full' : 'pl-8 w-full text-left'}`}>
                    {isCollapsed && !isMobileOpen ? (
                      <span className={`font-serif text-lg uppercase ${isEstateActive ? 'italic text-primary' : 'text-theme-text-subtle'}`}>E</span>
                    ) : (
                      <>
                        <div className="flex items-center justify-between w-full pr-6">
                          <span className={`font-serif text-xl ${isEstateActive ? 'italic' : ''}`}>The Estate</span>
                          <ChevronRight size={16} className={`transition-transform duration-300 ${isEstateOpen && !isMobileOpen ? 'translate-x-1' : ''} ${isEstateOpen && isMobileOpen ? 'rotate-90' : ''}`} />
                        </div>
                        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#54524F] mt-1 group-hover:text-theme-text-muted transition-colors">Curated Spaces</span>
                      </>
                    )}
                  </div>
                </button>

                {/* Desktop Flyout */}
                <AnimatePresence>
                  {isEstateOpen && !isMobileOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`fixed top-0 bottom-0 ${isCollapsed ? 'left-[80px]' : 'left-[240px]'} w-[800px] max-w-[calc(100vw-${isCollapsed ? '80px' : '240px'})] bg-theme-surface border-r border-theme-border shadow-2xl z-40 overflow-y-auto`}
                    >
                      <div className="p-12">
                        <div className="mb-10">
                          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Architectural Environments</span>
                          <h2 className="text-4xl font-serif text-theme-text">Explore The Estate</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4 auto-rows-[160px]">
                          {curatedItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsEstateOpen(false)}
                              className={`group relative overflow-hidden rounded-sm ${item.span} flex items-end p-6 border border-theme-border`}
                            >
                              <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.image})` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                              <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-primary text-[10px] tracking-[0.2em] uppercase mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                  {item.label}
                                </span>
                                <h3 className="text-xl font-serif text-theme-text">{item.name}</h3>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Accordion */}
                <AnimatePresence>
                  {isEstateOpen && isMobileOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col border-theme-border overflow-hidden mt-4"
                    >
                      {curatedItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex items-center justify-between py-6 border-b border-theme-border group bg-theme-text/0 hover:bg-white/[0.02] transition-colors pr-4 pl-4"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="font-serif text-4xl text-theme-text group-hover:text-primary transition-colors">
                              {item.name.replace('The ', '')}
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text-subtle">
                              {Math.floor(Math.random() * 50) + 20} Artifacts
                            </span>
                          </div>
                          <div className="w-16 h-16 rounded-sm overflow-hidden border border-theme-border">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Utilities Footer */}
            <div className={`p-4 border-t border-theme-border flex transition-all duration-300 ${isCollapsed && !isMobileOpen ? 'flex-col items-center gap-6' : 'items-center justify-between'}`}>
              <button className="text-theme-text-muted hover:text-theme-text transition-colors">
                <Search size={20} />
              </button>
              <button onClick={toggleTheme} className="text-theme-text-muted hover:text-theme-text transition-colors" title="Toggle Theme">
                {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <Link to={user ? "/dashboard" : "/login"} onClick={() => setIsMobileOpen(false)} className="text-theme-text-muted hover:text-theme-text transition-colors">
                <User size={20} />
              </Link>
              <Link to="/cart" onClick={() => setIsMobileOpen(false)} className="text-theme-text-muted hover:text-theme-text transition-colors relative">
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-theme-text text-[10px] font-bold flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Mobile Overlay Background */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-theme-overlay z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
