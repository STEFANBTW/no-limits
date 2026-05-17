import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder, Order } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useProduct } from '../context/ProductContext';
import { useDashboard, UIMood } from '../context/DashboardContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  LogOut, 
  Box, 
  Map as MapIcon, 
  Book, 
  Eye, 
  Sparkles, 
  Palette, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Truck,
  MessageSquare,
  PlusCircle,
  FolderOpen
} from 'lucide-react';
import StartDialogueForm from '../components/StartDialogueForm';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { getUserOrders } = useOrder();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { products } = useProduct();
  const { mood, setMood, projects, createProject, addToProject, userTier, totalSpend } = useDashboard();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'registry' | 'moodboards' | 'care' | 'early-access' | 'lookbook'>('overview');
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const orders = useMemo(() => (user ? getUserOrders(user.id) : []), [user, getUserOrders]);
  
  if (!user) return null;

  const handleConciergeClick = () => {
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  // Mock data for early access
  const earlyAccessProducts = products.filter(p => p.category === 'Art' || p.category === 'Furniture').slice(0, 3);
  
  // "Pairs With" Logic
  const boughtProductIds = new Set(orders.flatMap(o => o.items.map(i => i.id)));
  const recommendations = products.filter(p => !boughtProductIds.has(p.id)).slice(0, 4);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Hand-crafting in progress': return <Clock className="w-4 h-4" />;
      case 'Quality certification': return <ShieldCheck className="w-4 h-4" />;
      case 'White-glove transit': return <Truck className="w-4 h-4" />;
      default: return <Box className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen pt-4 md:pt-8 pb-16 transition-colors duration-1000 ${mood === 'Satin Night' ? 'mood-satin-night' : mood === 'Brutalist Raw' ? 'mood-brutalist-raw' : 'bg-[var(--dash-bg-page)]'}`}>
      <style> {`
        .dashboard-container {
          font-family: var(--dash-font-sans-theme);
        }
        .dashboard-container h1, .dashboard-container h2, .dashboard-container h3, .dashboard-container .serif-text {
          font-family: var(--dash-font-serif-theme);
        }
        ${userTier === 'Patron' ? `
          .patron-accent {
            border-color: #d4af37 !important;
            color: #d4af37 !important;
          }
          .patron-text {
            color: #d4af37 !important;
          }
        ` : ''}
      `} </style>

      <div className="max-w-[100vw] px-4 md:px-8 dashboard-container">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* 15% Navigation Sidebar - Sticky */}
          <aside className="lg:w-[15%] lg:min-w-[200px] lg:shrink-0 lg:sticky lg:top-12 lg:h-fit space-y-10 pb-8">
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-[var(--dash-text-muted)] uppercase tracking-[0.2em] opacity-60">Account</span>
              <div className="flex flex-col -mx-2">
                <NavButton active={activeTab === 'overview'} icon={<Eye className="w-4 h-4" />} label="Overview" onClick={() => setActiveTab('overview')} />
                <NavButton active={activeTab === 'registry'} icon={<Box className="w-4 h-4" />} label="Order Tracking" onClick={() => setActiveTab('registry')} count={orders.length} />
                <NavButton active={activeTab === 'moodboards'} icon={<FolderOpen className="w-4 h-4" />} label="Room Projects" onClick={() => setActiveTab('moodboards')} />
                <NavButton active={activeTab === 'care'} icon={<Book className="w-4 h-4" />} label="Care Guides" onClick={() => setActiveTab('care')} />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] font-bold text-[var(--dash-text-muted)] uppercase tracking-[0.2em] opacity-60">Discovery</span>
              <div className="flex flex-col -mx-2">
                <NavButton active={activeTab === 'early-access'} icon={<Clock className="w-4 h-4" />} label="Early Access" onClick={() => setActiveTab('early-access')} isLocked={userTier === 'Client'} />
                <NavButton active={activeTab === 'lookbook'} icon={<MapIcon className="w-4 h-4" />} label="Style Lookbook" onClick={() => setActiveTab('lookbook')} />
              </div>
            </div>

            {/* Loyalty Widget - Simplified */}
            <div className={`p-6 relative overflow-hidden group transition-all duration-700 ${userTier === 'Patron' ? 'patron-bg bg-[#d4af37]/5 rounded-lg' : 'bg-white/5 rounded-lg'}`}>
              <h4 className="text-lg font-serif italic mb-3">Service</h4>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-[9px] uppercase font-bold tracking-[0.1em]">
                  <span>Tier Status</span>
                  <span>{Math.min(100, Math.floor((totalSpend / 5000000) * 100))}%</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.floor((totalSpend / 5000000) * 100))}%` }}
                    className="absolute inset-y-0 left-0 bg-[var(--dash-accent)] shadow-[0_0_8px_rgba(232,168,67,0.5)]"
                  />
                </div>
                <button onClick={handleConciergeClick} className="w-full h-10 bg-[var(--dash-accent)] text-white text-[9px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_8px_20px_-4px_rgba(232,168,67,0.3)] transition-all">
                  <MessageSquare className="w-3 h-3" />
                  Chat with Us
                </button>
              </div>
            </div>
          </aside>

          {/* 85% Main Workspace Area */}
          <main className="lg:w-[85%] min-h-[600px]">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 pb-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <span className={`text-[9px] font-bold tracking-[0.2em] uppercase py-0.5 px-2 rounded-sm ${userTier === 'Patron' ? 'patron-accent bg-[#d4af37]/10' : 'bg-white/5'}`}>
                     {userTier}
                   </span>
                   {userTier === 'Patron' && <Sparkles className="w-3 h-3 patron-text" />}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-[var(--dash-text-primary)]">
                  Welcome, {user.name.split(' ')[0]}.
                </h1>
                <p className="text-[var(--dash-text-muted)] text-[15px] font-light italic">
                  Your collection is growing beautifully.
                </p>
              </div>

              <div className="flex items-center gap-3">
                 <button 
                   onClick={() => setShowMoodSelector(!showMoodSelector)}
                   className="h-10 px-4 flex items-center justify-center text-[var(--dash-text-muted)] hover:text-[var(--dash-accent)] transition-all bg-white/5 rounded-md"
                 >
                   <Palette className="w-4 h-4 mr-2" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Theme</span>
                 </button>
                 <button 
                   onClick={() => { logout(); navigate('/'); }}
                   className="h-10 px-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--dash-text-muted)] hover:text-white hover:bg-neutral-800 transition-all bg-white/5 rounded-md"
                 >
                   Sign Out
                 </button>
              </div>
            </header>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                  
                  {/* Account Snapshot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-8 h-full flex flex-col justify-between">
                       <div className="space-y-2 mb-6">
                         <span className="text-[9px] font-bold text-[var(--dash-text-muted)] uppercase tracking-[0.2em] opacity-60">Identity</span>
                         <h3 className="text-xl font-medium">{user.email}</h3>
                         <p className="text-xs text-[var(--dash-text-muted)] italic">Verified member since 2024</p>
                       </div>
                    </div>

                    <div className="bg-white/5 p-8 h-full flex flex-col justify-between">
                       <div className="space-y-2 mb-6">
                         <span className="text-[9px] font-bold text-[var(--dash-text-muted)] uppercase tracking-[0.2em] opacity-60">Total Value</span>
                         <h3 className="text-2xl font-serif italic text-[var(--dash-accent)]">₦{totalSpend.toLocaleString()}</h3>
                         <p className="text-xs text-[var(--dash-text-muted)]">{orders.length} items acquired</p>
                       </div>
                    </div>
                  </div>

                  {/* Recommendations "Pairs With" */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <h2 className="text-2xl font-serif italic text-[var(--dash-text-primary)]">Recommended Pairings</h2>
                      <Link to="/shop" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] flex items-center gap-1 transition-all">
                        View Catalogue <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {recommendations.map(product => (
                        <div key={product.id} className="group">
                          <div className="aspect-[3/4] bg-white/5 overflow-hidden mb-3 relative transition-all">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                          </div>
                          <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] mb-0.5 truncate group-hover:text-[var(--dash-accent)] transition-colors">{product.name}</h4>
                          <span className="text-[10px] text-[var(--dash-accent)] font-medium">₦{product.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Material Samples Section */}
                  <div className="bg-white/5 p-10 relative overflow-hidden group">
                     <div className="relative z-10 max-w-lg space-y-4">
                        <span className="text-[9px] font-bold text-[var(--dash-accent)] uppercase tracking-[0.2em]">Samples</span>
                        <h2 className="text-2xl font-serif italic">Free Material Samples</h2>
                        <p className="text-[var(--dash-text-muted)] text-xs leading-relaxed max-w-sm">
                          Order a free box of our leather, stone, and fabric samples to see how they look in your home.
                        </p>
                        <button className="h-10 px-8 bg-[var(--dash-text-primary)] text-[var(--dash-bg-page)] text-[10px] font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-all">
                          Order Sample Pack
                        </button>
                     </div>
                  </div>

                </motion.div>
              )}

              {activeTab === 'registry' && (
                <motion.div key="registry" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-10">
                   <header className="space-y-1">
                     <h2 className="text-3xl font-serif italic text-[var(--dash-text-primary)]">Order History</h2>
                     <p className="text-[var(--dash-text-muted)] text-xs font-light">Track your active commissions and past acquisitions.</p>
                   </header>

                   {orders.length === 0 ? (
                     <EmptyState 
                       icon={<PlusCircle className="w-10 h-10" />} 
                       message="You haven't made any acquisitions yet." 
                       actionLabel="Browse the shop"
                       onAction={() => navigate('/shop')}
                     />
                   ) : (
                     <div className="space-y-6">
                       {orders.map((order) => (
                         <div key={order.id} className="bg-white/5 group transition-all rounded-lg overflow-hidden">
                            <div className="p-6 flex flex-col md:flex-row justify-between gap-6 border-b border-white/5 bg-white/[0.02]">
                               <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
                                  <InfoBlock label="Date" value={new Date(order.date).toLocaleDateString()} />
                                  <InfoBlock label="ID" value={order.id} isMono />
                                  <InfoBlock label="Status" value={order.status} isAccent icon={getStatusIcon(order.status)} />
                               </div>
                               <div className="text-left md:text-right">
                                  <span className="text-[9px] font-bold text-[var(--dash-text-muted)] uppercase tracking-[0.2em] block">Value</span>
                                  <span className="text-xl font-serif italic text-[var(--dash-text-primary)]">₦{order.total.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <div className="p-6 space-y-4">
                               {order.items.map((item) => (
                                 <div key={item.id} className="flex gap-6 items-center">
                                   <div className="w-16 h-16 bg-white/5 shrink-0 overflow-hidden">
                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                   </div>
                                   <div className="flex-1">
                                     <h4 className="text-sm font-medium">{item.name}</h4>
                                     <div className="flex gap-3 text-[9px] font-bold uppercase tracking-widest text-[var(--dash-text-muted)] mt-1">
                                       <span>Qty: {item.quantity}</span>
                                       <span>•</span>
                                       <span>₦{item.price.toLocaleString()}</span>
                                     </div>
                                   </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                       ))}
                     </div>
                   )}
                </motion.div>
              )}

              {activeTab === 'moodboards' && (
                <motion.div key="moodboards" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-10">
                   <header className="flex justify-between items-end">
                     <div className="space-y-1">
                       <h2 className="text-3xl font-serif italic text-[var(--dash-text-primary)]">Room Projects</h2>
                       <p className="text-[var(--dash-text-muted)] text-xs font-light">Plan your living spaces visually.</p>
                     </div>
                     <button onClick={() => createProject(prompt('Name your project:') || 'New Project')} className="h-9 px-4 border border-[var(--dash-accent)] text-[var(--dash-accent)] text-[9px] font-bold uppercase tracking-[0.15em] hover:bg-[var(--dash-accent)] hover:text-white transition-all flex items-center gap-2">
                       <PlusCircle className="w-3 h-3" />
                       New Project
                     </button>
                   </header>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {projects.map((project) => (
                       <div key={project.id} className="bg-white/5 group overflow-hidden transition-all rounded-lg">
                          <div className="aspect-video bg-black/20 grid grid-cols-3 gap-px opacity-80 group-hover:opacity-100 transition-opacity">
                             {project.products.length === 0 ? (
                               <div className="col-span-3 flex items-center justify-center text-white/5">
                                 <PlusCircle className="w-12 h-12" />
                               </div>
                             ) : (
                               <>
                                 <div className="col-span-2 row-span-2">
                                   <img src={project.products[0]?.images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                 </div>
                                 {project.products.slice(1, 4).map(p => (
                                   <div key={p.id}>
                                     <img src={p.images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                   </div>
                                 ))}
                               </>
                             )}
                          </div>
                          <div className="p-6 flex justify-between items-center">
                            <div>
                               <h3 className="text-lg font-medium mb-0.5">{project.name}</h3>
                               <p className="text-[9px] uppercase font-bold tracking-[0.1em] text-[var(--dash-text-muted)]">{project.products.length} Saved Items</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[var(--dash-text-muted)]" />
                          </div>
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'care' && (
                <motion.div key="care" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-10">
                   <header className="space-y-1">
                     <h2 className="text-3xl font-serif italic text-[var(--dash-text-primary)]">Care Guides</h2>
                     <p className="text-[var(--dash-text-muted)] text-xs font-light">How to look after your acquired pieces.</p>
                   </header>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {orders.flatMap(o => o.items).map((item, idx) => (
                       <div key={`${item.id}-${idx}`} className="bg-white/5 p-6 space-y-5 hover:bg-white/10 transition-all group rounded-lg">
                          <div className="w-12 h-12 bg-black/20 overflow-hidden">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-opacity" referrerPolicy="no-referrer" />
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-base font-medium">{item.name}</h4>
                             <p className="text-[9px] uppercase font-bold tracking-widest text-[var(--dash-text-muted)]">PDF Manual</p>
                          </div>
                          <button className="w-full h-9 bg-white/5 text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-[var(--dash-accent)] hover:text-white transition-all">
                             Download
                          </button>
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'early-access' && (
                <motion.div key="early-access" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-10">
                   {userTier === 'Client' ? (
                     <div className="h-[400px] bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12 space-y-4">
                        <LockIndicator />
                        <h2 className="text-2xl font-serif italic">Restricted Section</h2>
                        <p className="text-xs text-[var(--dash-text-muted)] max-w-sm">This area is reserved for regular clients. Keep building your collection to unlock early access.</p>
                        <button onClick={() => navigate('/shop')} className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[var(--dash-accent)] pb-1 hover:text-[var(--dash-accent)] transition-all">Go Shop</button>
                     </div>
                   ) : (
                     <>
                       <header className="space-y-1">
                         <h2 className="text-3xl font-serif italic">Early Access</h2>
                         <p className="text-[var(--dash-accent)] font-bold tracking-[0.2em] text-[9px] uppercase">Shadow Gallery Live</p>
                       </header>

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {earlyAccessProducts.map(p => (
                           <div key={p.id} className="group">
                              <div className="aspect-[4/5] bg-neutral-900 overflow-hidden mb-4 relative">
                                <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
                                <div className="absolute top-3 left-3 z-20">
                                   <span className="bg-[var(--dash-accent)] text-white text-[8px] font-bold uppercase px-2 py-1 tracking-widest">Priority</span>
                                </div>
                              </div>
                              <h3 className="text-lg font-serif italic">{p.name}</h3>
                              <p className="text-xs text-[var(--dash-text-muted)] mb-3">Pre-release Item</p>
                              <Link to={`/product/${p.slug}`} className="h-9 w-full bg-[var(--dash-text-primary)] text-[var(--dash-bg-page)] flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-all">Reserve Now</Link>
                           </div>
                         ))}
                       </div>
                     </>
                   )}
                </motion.div>
              )}

              {activeTab === 'lookbook' && (
                <motion.div key="lookbook" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12 py-4">
                   <div className="max-w-xl space-y-3 mb-12">
                     <span className="text-[9px] font-bold text-[var(--dash-accent)] uppercase tracking-[0.2em]">Curated Views</span>
                     <h2 className="text-4xl font-serif italic">Style Lookbook</h2>
                     <p className="text-[var(--dash-text-muted)] text-sm font-light leading-relaxed">See how our pieces fit into real architectural spaces.</p>
                   </div>

                   <div className="space-y-20">
                     <EditorialPairing 
                        title="Industrial Minimal" 
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=60&w=1200" 
                        desc="Using raw materials to create peaceful, modern environments."
                        tags={['Material', 'Form', 'Light']}
                     />
                     <EditorialPairing 
                        title="Quiet Stone" 
                        image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=60&w=1200" 
                        desc="Exploring the relationship between texture and space."
                        tags={['Organic', 'Earthen']}
                        isReversed
                     />
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Request Section */}
            <section className="mt-20 pt-16 pb-12">
               <div className="max-w-xl mb-10">
                 <h2 className="text-2xl font-serif italic mb-3">Custom Requests</h2>
                 <p className="text-[var(--dash-text-muted)] text-xs leading-relaxed">Need a piece with custom dimensions or specific materials? Start a dialogue with our design team below.</p>
               </div>
               <StartDialogueForm isDashboard />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const NavButton = ({ active, icon, label, onClick, count, isLocked }: { active: boolean, icon: any, label: string, onClick: () => void, count?: number, isLocked?: boolean }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center justify-between w-full p-4 transition-all group rounded-md ${active ? 'bg-[var(--dash-accent)] text-white shadow-[0_8px_24px_-8px_rgba(232,168,67,0.4)]' : 'text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] hover:bg-white/5'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:scale-110 opacity-60'}`}>{icon}</div>
      <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${isLocked ? 'opacity-40' : ''}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {count !== undefined && count > 0 && <span className={`text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full ${active ? 'bg-white text-[var(--dash-accent)]' : 'bg-[var(--dash-accent)] text-white'}`}>{count}</span>}
      {isLocked && <Settings className="w-3 h-3 opacity-20" />}
    </div>
  </button>
);

const InfoBlock = ({ label, value, isMono, isAccent, icon }: { label: string, value: string, isMono?: boolean, isAccent?: boolean, icon?: any }) => (
  <div className="space-y-1.5">
    <span className="text-[9px] font-bold text-[var(--dash-text-muted)] uppercase tracking-[0.3em] block">{label}</span>
    <div className="flex items-center gap-2">
      {icon && <div className={`${isAccent ? 'text-[var(--dash-accent)]' : 'text-[var(--dash-text-muted)]'}`}>{icon}</div>}
      <span className={`text-[13px] font-semibold tracking-tight ${isMono ? 'font-mono text-[var(--dash-text-muted)]' : isAccent ? 'text-[var(--dash-accent)] italic font-bold' : 'text-[var(--dash-text-primary)]'}`}>{value}</span>
    </div>
  </div>
);

const EmptyState = ({ icon, message, actionLabel, onAction }: { icon: any, message: string, actionLabel?: string, onAction?: () => void }) => (
  <div className="h-[400px] border border-[var(--dash-border-subtle)] flex flex-col items-center justify-center text-center p-8 space-y-6">
    <div className="text-[var(--dash-text-muted)] opacity-20">{icon}</div>
    <p className="text-[var(--dash-text-muted)] text-sm italic">{message}</p>
    {actionLabel && <button onClick={onAction} className="h-11 px-8 border border-[var(--dash-text-primary)] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--dash-text-primary)] hover:text-[var(--dash-bg-page)] transition-all">{actionLabel}</button>}
  </div>
);

const EditorialPairing = ({ title, image, desc, tags, isReversed }: { title: string, image: string, desc: string, tags: string[], isReversed?: boolean }) => (
  <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center group`}>
    <div className="w-full md:w-1/2 aspect-video md:aspect-[4/5] bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] overflow-hidden">
       <img src={image} alt={title} className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-105" referrerPolicy="no-referrer" />
    </div>
    <div className="w-full md:w-1/2 space-y-8">
       <div className="flex gap-2">
         {tags.map(t => <span key={t} className="text-[8px] font-bold uppercase tracking-[0.3em] px-2 py-1 border border-[var(--dash-border-subtle)] text-[var(--dash-text-muted)]">{t}</span>)}
       </div>
       <h3 className="text-4xl font-serif italic leading-tight">{title}</h3>
       <p className="text-sm text-[var(--dash-text-muted)] font-light leading-relaxed max-w-sm">{desc}</p>
       <button className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[var(--dash-accent)] pb-1 hover:text-[var(--dash-accent)] transition-all">Explore Curated Pieces</button>
    </div>
  </div>
);

const LockIndicator = () => (
  <div className="w-16 h-16 border border-[var(--dash-border-subtle)] rounded-full flex items-center justify-center text-[var(--dash-text-muted)] relative">
     <Settings className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
     <div className="absolute inset-0 flex items-center justify-center">
       <div className="w-2 h-2 bg-[var(--dash-accent)] rounded-full" />
     </div>
  </div>
);

export default UserDashboard;
