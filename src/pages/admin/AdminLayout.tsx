import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminLayout = ({ children, activeTab, setActiveTab, searchQuery, setSearchQuery }: { children: React.ReactNode, activeTab: string, setActiveTab: (tab: string) => void, searchQuery: string, setSearchQuery: (q: string) => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'collections', icon: 'auto_awesome_motion', label: 'Collections' },
    { id: 'products', icon: 'chair', label: 'Products' },
    { id: 'inquiries', icon: 'mail', label: 'Inquiries' },
    { id: 'media', icon: 'perm_media', label: 'Media' },
    { id: 'team', icon: 'group', label: 'Team' },
  ];

  return (
    <div className="min-h-screen flex selection:bg-primary-container selection:text-on-primary-container font-body antialiased bg-surface-container-lowest text-on-surface">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
         <div 
           onClick={() => setIsMobileMenuOpen(false)} 
           className="fixed inset-0 bg-[#000000]/60 z-40 md:hidden" 
         />
      )}

      {/* SideNavBar */}
      <nav className={`h-[100dvh] max-h-screen w-64 fixed left-0 top-0 z-50 bg-theme-surface md:bg-transparent flex flex-col py-4 md:py-6 gap-2 md:gap-4 font-headline tracking-tight text-lg overflow-y-auto transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-4 md:px-6 mb-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-primary text-base">architecture</span>
            </div>
            <h1 className="text-lg md:text-xl italic text-on-surface mt-[30px] mb-[5px]">No Limits CMS</h1>
          </div>
          <p className="text-[10px] md:text-xs font-label text-on-surface-variant uppercase tracking-widest pl-8 mb-[15px]">Digital Atelier</p>
        </div>

        <div className="px-4 md:px-6 mb-2">
          <button className="w-full py-2.5 px-4 rounded-none border border-outline-variant/20 bg-gradient-to-br from-primary to-primary-container text-theme-text-inverse font-label text-xs md:text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm text-theme-text-inverse">add</span>
            New Commission
          </button>
        </div>

        <ul className="flex flex-col flex-1 mt-1 gap-[2px] px-3 md:px-4">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button 
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 py-3 flex items-center gap-4 transition-all duration-300 mx-auto rounded-none border border-outline-variant/15 ${
                    isActive ? 'text-primary font-semibold border-l-[3px] border-l-primary bg-surface-container-highest' : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-primary'
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>{item.icon}</span>
                  <span className="font-body text-base">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto px-3 md:px-4 pb-4">
          <ul className="flex flex-col border-t border-outline-variant/15 pt-4 gap-[2px]">
            <li>
               <button className="w-full mx-auto text-left text-on-surface-variant pl-4 py-3 flex items-center gap-4 hover:bg-surface-container-highest hover:text-primary transition-all duration-300 rounded-none border border-outline-variant/15">
                <span className="material-symbols-outlined">settings</span>
                <span className="font-body text-base">Settings</span>
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full mx-auto text-left text-on-surface-variant pl-4 py-3 flex items-center gap-4 hover:bg-surface-container-highest hover:text-error transition-all duration-300 rounded-none border border-outline-variant/15">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-body text-base">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Arena */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative bg-surface-container-lowest overflow-x-hidden max-w-[100vw]">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-30 bg-surface-container-lowest/80 backdrop-blur-[10px] text-primary font-body font-medium uppercase tracking-widest text-xs flex justify-between items-center h-16 md:h-20 px-4 md:px-12 border-b border-outline-variant/5">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-on-surface hover:text-primary transition-colors flex items-center justify-center p-2">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            
            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-surface-container-highest rounded-md px-4 py-2 w-64 border-b border-outline-variant/40 focus-within:border-primary transition-all group">
              <span className="material-symbols-outlined text-secondary-fixed-dim mr-3 group-focus-within:text-primary">search</span>
              <input 
                className="bg-transparent border-none outline-none text-on-surface w-full placeholder-on-surface-variant font-body normal-case tracking-normal text-sm" 
                placeholder="Search anything..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Expanded Search */}
            {isSearchExpanded && (
              <div className="md:hidden absolute left-0 top-0 w-full h-full bg-surface-container-lowest flex items-center px-4 animate-in slide-in-from-top duration-300">
                <div className="flex items-center bg-surface-container-highest rounded-md px-3 py-1.5 w-full border border-primary/20">
                  <span className="material-symbols-outlined text-primary mr-2">search</span>
                  <input 
                    autoFocus
                    className="bg-transparent border-none outline-none text-on-surface w-full placeholder-on-surface-variant font-body normal-case tracking-normal text-sm" 
                    placeholder="Search anything..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => { setIsSearchExpanded(false); setSearchQuery(''); }} className="ml-2 text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Mobile Search Toggle Icon */}
            {!isSearchExpanded && (
              <button 
                onClick={() => setIsSearchExpanded(true)}
                className="md:hidden text-on-surface-variant hover:text-primary transition-colors p-2"
              >
                <span className="material-symbols-outlined text-2xl">search</span>
              </button>
            )}

            <span className="hidden lg:block text-on-surface-variant">No Limits Furniture</span>
            <div className="w-px h-6 bg-surface-container-highest hidden lg:block"></div>
            <div className="flex items-center gap-4 md:gap-6">
              <button className="text-on-surface-variant hover:text-primary transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
              <button 
                onClick={() => { setActiveTab('products'); setIsMobileMenuOpen(false); }}
                className="hidden md:flex bg-primary text-theme-text-inverse font-body font-semibold normal-case tracking-normal text-sm py-2 px-5 rounded-md hover:bg-primary/90 transition-colors shadow-sm items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-theme-text-inverse">add</span>
                Add Product
              </button>
            </div>
          </div>
        </header>

        {children}

      </main>
    </div>
  );
};
