import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminLayout = ({ children, activeTab, setActiveTab }: { children: React.ReactNode, activeTab: string, setActiveTab: (tab: string) => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    <div className="admin-theme min-h-screen flex selection:bg-primary-container selection:text-on-primary-container font-body antialiased">
      {/* SideNavBar */}
      <nav className="h-screen w-64 fixed left-0 top-0 z-40 bg-[#131313] border-r border-[#1c1b1b] flex-col py-8 gap-6 hidden md:flex font-headline tracking-tight text-lg overflow-y-auto">
        <div className="px-8 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-primary text-xl">architecture</span>
            </div>
            <h1 className="text-xl italic text-on-surface">No Limits CMS</h1>
          </div>
          <p className="text-xs font-label text-on-surface-variant uppercase tracking-widest pl-11">Digital Atelier</p>
        </div>

        <div className="px-6 mb-4">
          <button className="w-full py-3 px-4 rounded-md bg-gradient-to-br from-primary to-primary-container text-on-primary font-label text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">add</span>
            New Commission
          </button>
        </div>

        <ul className="flex flex-col flex-1 mt-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button 
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left pl-4 py-3 flex items-center gap-4 transition-all duration-300 mx-4 rounded-xl ${
                    isActive ? 'text-primary font-semibold border-l-2 border-primary bg-[#201f1f] rounded-l-none' : 'text-[#dcc1b8] hover:bg-[#201f1f] hover:text-primary'
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>{item.icon}</span>
                  <span className="font-body text-base">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto px-4">
          <ul className="flex flex-col border-t border-outline-variant/15 pt-4">
            <li>
              <button className="w-full text-left text-[#dcc1b8] pl-4 py-3 flex items-center gap-4 hover:bg-[#201f1f] hover:text-primary transition-all duration-300 rounded-xl">
                <span className="material-symbols-outlined">settings</span>
                <span className="font-body text-base">Settings</span>
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left text-[#dcc1b8] pl-4 py-3 flex items-center gap-4 hover:bg-[#201f1f] hover:text-error transition-all duration-300 rounded-xl">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-body text-base">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Arena */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative bg-surface-container-lowest">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-[#131313]/80 backdrop-blur-xl border-b border-outline-variant/15 text-primary font-body font-medium uppercase tracking-widest text-xs flex justify-between items-center h-20 px-8 md:px-12">
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden md:flex items-center bg-surface-container-highest rounded-md px-4 py-2 w-64 border-b border-outline-variant/40 focus-within:border-primary transition-colors group">
              <span className="material-symbols-outlined text-secondary-fixed-dim mr-3 group-focus-within:text-primary">search</span>
              <input className="bg-transparent border-none outline-none text-on-surface w-full placeholder-on-surface-variant font-body normal-case tracking-normal text-sm" placeholder="Search..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <span className="hidden lg:block text-[#dcc1b8]">No Limits Furniture</span>
            <div className="w-px h-6 bg-surface-container-highest hidden lg:block"></div>
            <div className="flex items-center gap-6">
              <button className="text-[#dcc1b8] hover:text-primary transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-[#dcc1b8] hover:text-primary transition-colors">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
              <button 
                onClick={() => setActiveTab('products')}
                className="hidden md:flex bg-primary text-on-primary font-body font-semibold normal-case tracking-normal text-sm py-2 px-5 rounded-md hover:bg-primary/90 transition-colors shadow-sm items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
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
