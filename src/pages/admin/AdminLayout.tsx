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
    <div className="min-h-screen flex selection:bg-[var(--dash-accent-muted)] selection:text-[var(--dash-text-primary)] font-body antialiased bg-[var(--dash-bg-page)] text-[var(--dash-text-primary)]">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
         <div 
           onClick={() => setIsMobileMenuOpen(false)} 
           className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" 
         />
      )}

      {/* SideNavBar */}
      <nav className={`h-screen w-[260px] fixed left-0 top-0 z-50 bg-[var(--dash-bg-surface)] flex flex-col pt-6 pb-16 gap-4 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-6 mb-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-[var(--dash-accent)] text-2xl">architecture</span>
            <h1 className="dash-font-brand uppercase tracking-widest font-serif italic text-[var(--dash-text-primary)]">No Limits CMS</h1>
          </div>
          <p className="dash-font-card-title text-[var(--dash-text-muted)] uppercase tracking-[0.2em] font-medium opacity-60">Digital Atelier</p>
        </div>

        <div className="px-6 mb-2">
          <button className="w-full h-11 bg-[var(--dash-accent)] text-white dash-font-action font-medium flex items-center justify-center gap-2 hover:bg-[var(--dash-accent-hover)] transition-all ease-out duration-200">
            <span className="material-symbols-outlined text-lg">add</span>
            Initiate Vision
          </button>
        </div>

        <ul className="flex flex-col flex-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button 
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                  className={`w-full text-left px-6 py-3 flex items-center gap-4 transition-all duration-200 ${
                    isActive ? 'bg-[var(--dash-accent-muted)] text-[var(--dash-accent)] font-semibold' : 'text-[var(--dash-text-muted)] hover:bg-[var(--dash-bg-page)] hover:text-[var(--dash-text-primary)]'
                  }`}
                >
                  <span className={`material-symbols-outlined !text-[26px] ${isActive ? 'fill' : ''}`}>{item.icon}</span>
                  <span className="dash-font-action">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto mb-4 px-6 border-t border-[var(--dash-border-subtle)] pt-4">
          <ul className="flex flex-col gap-1">
            <li>
               <button className="w-full text-left text-[var(--dash-text-muted)] py-2 flex items-center gap-4 hover:text-[var(--dash-text-primary)] transition-all duration-200 group">
                <span className="material-symbols-outlined !text-[26px] opacity-60 group-hover:opacity-100">settings</span>
                <span className="dash-font-action">Settings</span>
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left text-[var(--dash-text-muted)] py-2 flex items-center gap-4 hover:text-red-500 transition-all duration-200 group">
                <span className="material-symbols-outlined !text-[26px] opacity-60 group-hover:opacity-100">logout</span>
                <span className="dash-font-action">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Arena */}
      <main className="flex-1 md:ml-[260px] flex flex-col min-h-screen relative bg-[var(--dash-bg-page)] max-w-full">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 bg-[var(--dash-bg-surface)]/90 backdrop-blur-md text-[var(--dash-text-primary)] font-body h-16 md:h-[64px] px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-[var(--dash-text-primary)] hover:text-[var(--dash-accent)] transition-colors p-2">
              <span className="material-symbols-outlined">menu</span>
            </button>
            
            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-[var(--dash-bg-page)] rounded-full px-4 h-10 w-80 focus-within:ring-1 focus-within:ring-[var(--dash-accent)] transition-all group">
              <span className="material-symbols-outlined text-[var(--dash-text-muted)] mr-3 group-focus-within:text-[var(--dash-accent)] !text-[20px]">search</span>
              <input 
                className="bg-transparent border-none outline-none text-[var(--dash-text-primary)] w-full placeholder-[var(--dash-text-muted)] dash-font-body" 
                placeholder="Search resources..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Expanded Search */}
            {isSearchExpanded && (
              <div className="md:hidden absolute left-0 top-0 w-full h-full bg-[var(--dash-bg-surface)] z-50 flex items-center px-4">
                <div className="flex items-center bg-[var(--dash-bg-page)] rounded-lg h-10 w-full border border-[var(--dash-accent)] px-3">
                  <span className="material-symbols-outlined text-[var(--dash-accent)] mr-2 !text-[20px]">search</span>
                  <input 
                    autoFocus
                    className="bg-transparent border-none outline-none text-[var(--dash-text-primary)] w-full placeholder-[var(--dash-text-muted)] dash-font-body" 
                    placeholder="Search..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => { setIsSearchExpanded(false); setSearchQuery(''); }} className="ml-2 text-[var(--dash-text-muted)]">
                    <span className="material-symbols-outlined !text-[20px]">close</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {!isSearchExpanded && (
              <button 
                onClick={() => setIsSearchExpanded(true)}
                className="md:hidden text-[var(--dash-text-muted)] hover:text-[var(--dash-accent)] p-2"
              >
                <span className="material-symbols-outlined !text-[24px]">search</span>
              </button>
            )}

            <div className="flex items-center gap-2 md:gap-4 ml-2">
              <button className="text-[var(--dash-text-muted)] hover:text-[var(--dash-accent)] transition-colors p-2 relative">
                <span className="material-symbols-outlined !text-[22px]">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--dash-accent)] rounded-full border-2 border-[var(--dash-bg-surface)]"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end leading-none">
                   <span className="dash-font-body font-medium text-[var(--dash-text-primary)]">{user?.name}</span>
                   <span className="dash-font-card-title text-[var(--dash-text-muted)] uppercase tracking-wider mt-0.5">Administrator</span>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--dash-accent-muted)] text-[var(--dash-accent)]">
                  <span className="material-symbols-outlined !text-[24px]">account_circle</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-[var(--dash-pad-lg)] md:p-[var(--dash-pad-xl)] flex-1 max-w-[1440px] w-full mx-auto">
          {children}
        </div>

      </main>
    </div>
  );
};
