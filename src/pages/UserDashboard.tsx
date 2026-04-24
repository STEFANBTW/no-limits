import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useProduct } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { getUserOrders } = useOrder();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { products } = useProduct();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist'>('overview');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const orders = getUserOrders(user.id);
  const wishlistedProducts = wishlist;

  const handleConciergeClick = () => {
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  return (
    <div className="min-h-screen bg-[var(--dash-bg-page)] pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 text-[var(--dash-text-primary)] animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-[var(--dash-accent)] text-[var(--dash-font-12)] font-bold tracking-[0.2em] uppercase mb-2 block">Client Profile</span>
            <h1 className="text-[var(--dash-font-32)] font-serif italic text-[var(--dash-text-primary)]">Welcome, {user.name.split(' ')[0]}</h1>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="h-11 px-8 border border-[var(--dash-border-subtle)] text-[var(--dash-font-12)] font-bold uppercase tracking-widest text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] hover:border-[var(--dash-text-primary)] transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
          {/* Navigation Rail */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-2 relative overflow-hidden">
               {/* Decorative Element */}
               <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--dash-accent)] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

               <div className="flex flex-col gap-1">
                 <button 
                   onClick={() => setActiveTab('overview')} 
                   className={`flex items-center gap-4 px-6 py-4 transition-all text-left group ${
                     activeTab === 'overview' ? 'text-[var(--dash-accent)] bg-[var(--dash-accent-muted)]' : 'text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] hover:bg-[var(--dash-bg-page)]'
                   }`}
                 >
                   <span className="material-symbols-outlined !text-[20px]">person</span>
                   <span className="text-[var(--dash-font-14)] font-bold uppercase tracking-widest">Overview</span>
                 </button>

                 <button 
                   onClick={() => setActiveTab('orders')} 
                   className={`flex items-center gap-4 px-6 py-4 transition-all text-left group ${
                     activeTab === 'orders' ? 'text-[var(--dash-accent)] bg-[var(--dash-accent-muted)]' : 'text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] hover:bg-[var(--dash-bg-page)]'
                   }`}
                 >
                   <span className="material-symbols-outlined !text-[20px]">inventory_2</span>
                   <span className="text-[var(--dash-font-14)] font-bold uppercase tracking-widest">Orders</span>
                 </button>

                 <button 
                   onClick={() => setActiveTab('wishlist')} 
                   className={`flex items-center gap-4 px-6 py-4 transition-all text-left group ${
                     activeTab === 'wishlist' ? 'text-[var(--dash-accent)] bg-[var(--dash-accent-muted)]' : 'text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] hover:bg-[var(--dash-bg-page)]'
                   }`}
                 >
                   <span className="material-symbols-outlined !text-[20px]">favorite</span>
                   <div className="flex-1 flex justify-between items-center">
                     <span className="text-[var(--dash-font-14)] font-bold uppercase tracking-widest">Wishlist</span>
                     {wishlist.length > 0 && <span className="text-[10px] bg-[var(--dash-accent)] text-white px-1.5 py-0.5 rounded-full">{wishlist.length}</span>}
                   </div>
                 </button>
               </div>
            </div>
            
            {/* Context Widget */}
            <div className="border border-[var(--dash-accent)]/20 p-8 hover:bg-[var(--dash-accent-muted)] transition-colors duration-500">
              <h3 className="text-[var(--dash-font-20)] font-serif italic text-[var(--dash-accent)] mb-3">Concierge</h3>
              <p className="text-[var(--dash-font-14)] text-[var(--dash-text-muted)] mb-6 leading-relaxed">Assistance regarding shipment telemetry or bespoke artifacts is a message away.</p>
              <button onClick={handleConciergeClick} className="text-[var(--dash-font-12)] font-bold uppercase tracking-widest text-[var(--dash-text-primary)] border-b border-[var(--dash-accent)] pb-1 hover:text-[var(--dash-accent)] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                Message Lawrence
              </button>
            </div>
          </div>

          {/* Main Panel Area */}
          <div className="xl:col-span-3 space-y-8 min-h-[500px]">
             {/* Render tab content gracefully */}
             {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <h2 className="text-[var(--dash-font-32)] font-serif italic text-[var(--dash-text-primary)]">Identity & Verification</h2>
                  <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-8 max-w-2xl space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[var(--dash-border-subtle)] pb-4">
                      <span className="text-[var(--dash-font-12)] uppercase tracking-widest text-[var(--dash-text-muted)] font-bold">Email Address</span>
                      <span className="text-[var(--dash-font-16)] font-semibold text-[var(--dash-text-primary)] break-all">{user.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[var(--dash-border-subtle)] pb-4">
                      <span className="text-[var(--dash-font-12)] uppercase tracking-widest text-[var(--dash-text-muted)] font-bold">Client Level</span>
                      <span className="text-[var(--dash-font-16)] font-semibold text-[var(--dash-text-primary)] italic">Est. 2024 Member</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span className="text-[var(--dash-font-12)] uppercase tracking-widest text-[var(--dash-text-muted)] font-bold">Manifested Items</span>
                      <span className="text-[var(--dash-font-16)] font-semibold text-[var(--dash-text-primary)] italic">{orders.length}</span>
                    </div>
                  </div>
                </motion.div>
             )}

             {activeTab === 'orders' && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                 <h2 className="text-[var(--dash-font-32)] font-serif italic text-[var(--dash-text-primary)]">Historical Acquisitions</h2>
                 
                 {orders.length === 0 ? (
                   <div className="bg-[var(--dash-bg-surface)] p-16 border border-[var(--dash-border-subtle)] text-center flex flex-col items-center">
                     <span className="material-symbols-outlined text-6xl text-[var(--dash-text-muted)] opacity-20 mb-6">drafts</span>
                     <p className="text-[var(--dash-text-muted)] text-[var(--dash-font-16)] italic mb-8">No historical transactions recorded in our registry.</p>
                     <button onClick={() => navigate('/shop')} className="h-11 px-8 bg-[var(--dash-text-primary)] text-[var(--dash-bg-page)] text-[var(--dash-font-12)] font-bold uppercase tracking-widest hover:brightness-125 transition-all">
                       Explore Archive
                     </button>
                   </div>
                 ) : (
                   <div className="space-y-8">
                     {orders.map((order) => (
                       <div key={order.id} className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] overflow-hidden">
                         <div className="p-6 border-b border-[var(--dash-border-subtle)] bg-[var(--dash-bg-page)]/50">
                           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                             <div>
                               <span className="text-[var(--dash-font-12)] uppercase tracking-widest text-[var(--dash-text-muted)] font-bold block mb-1">Date</span>
                               <span className="text-[var(--dash-font-14)] font-semibold text-[var(--dash-text-primary)]">{new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                             </div>
                             <div>
                               <span className="text-[var(--dash-font-12)] uppercase tracking-widest text-[var(--dash-text-muted)] font-bold block mb-1">Total Valuation</span>
                               <span className="text-[var(--dash-font-14)] font-semibold text-[var(--dash-accent)]">₦{order.total.toLocaleString()}</span>
                             </div>
                             <div className="hidden lg:block">
                               <span className="text-[var(--dash-font-12)] uppercase tracking-widest text-[var(--dash-text-muted)] font-bold block mb-1">Identifer</span>
                               <span className="text-[var(--dash-font-14)] font-mono text-[var(--dash-text-primary)]">{order.id.slice(0, 13)}...</span>
                             </div>
                             <div className="text-right lg:text-left">
                               <span className="text-[var(--dash-font-12)] uppercase tracking-widest text-[var(--dash-text-muted)] font-bold block mb-1">Current Status</span>
                               <span className={`text-[var(--dash-font-14)] font-bold italic uppercase tracking-tight ${
                                  order.status === 'Delivered' ? 'text-green-500' : 'text-[var(--dash-accent)]'
                               }`}>{order.status}</span>
                             </div>
                           </div>
                         </div>
                         
                         <div className="p-6 divide-y divide-[var(--dash-border-subtle)]">
                           {order.items.map((item) => (
                             <div key={item.id} className="flex gap-6 items-center py-6 first:pt-0 last:pb-0 group">
                               <div className="w-20 h-20 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] group-hover:border-[var(--dash-accent)] transition-colors overflow-hidden shrink-0">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                               </div>
                               <div className="flex-1 min-w-0">
                                 <h4 className="text-[var(--dash-font-18)] text-[var(--dash-text-primary)] font-semibold mb-1 truncate">{item.name}</h4>
                                 <p className="text-[var(--dash-font-12)] text-[var(--dash-text-muted)] uppercase tracking-widest mb-4">QTY: {item.quantity} • ₦{item.price.toLocaleString()}</p>
                                 <Link to={`/product/${item.slug}`} className="text-[var(--dash-font-12)] font-bold uppercase tracking-widest text-[var(--dash-text-primary)] hover:text-[var(--dash-accent)] transition-colors border-b border-[var(--dash-border-subtle)] hover:border-[var(--dash-accent)] pb-0.5">
                                   Artifact Specification
                                 </Link>
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

             {activeTab === 'wishlist' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <h2 className="text-[var(--dash-font-32)] font-serif italic text-[var(--dash-text-primary)]">Curated Collection</h2>
                  
                  {wishlistedProducts.length === 0 ? (
                   <div className="bg-[var(--dash-bg-surface)] p-16 border border-[var(--dash-border-subtle)] text-center flex flex-col items-center">
                     <span className="material-symbols-outlined text-6xl text-[var(--dash-text-muted)] opacity-20 mb-6">favorite_border</span>
                     <p className="text-[var(--dash-text-muted)] text-[var(--dash-font-16)] italic mb-8">No artifacts have been prioritized for acquisition.</p>
                     <button onClick={() => navigate('/shop')} className="h-11 px-8 bg-[var(--dash-text-primary)] text-[var(--dash-bg-page)] text-[var(--dash-font-12)] font-bold uppercase tracking-widest hover:brightness-125 transition-all">
                       Manifest Desire
                     </button>
                   </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {wishlistedProducts.map(product => (
                        <div key={product.id} className="group relative bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] hover:border-[var(--dash-accent)] transition-all duration-500">
                          <div className="aspect-[3/4] relative overflow-hidden bg-[var(--dash-bg-page)]">
                             <img 
                               src={product.image} 
                               alt={product.name}
                               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                             />
                             <div className="absolute top-4 right-4 z-10">
                               <button 
                                 onClick={() => removeFromWishlist(product.id)}
                                 className="w-10 h-10 bg-black/60 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-white hover:text-red-500 transition-all border border-white/10"
                               >
                                 <span className="material-symbols-outlined text-lg">favorite</span>
                               </button>
                             </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-[var(--dash-font-18)] font-serif italic text-[var(--dash-text-primary)] mb-1 truncate">{product.name}</h3>
                            <div className="flex justify-between items-center pt-4 border-t border-[var(--dash-border-subtle)] mt-6">
                              <span className="text-[var(--dash-font-16)] font-semibold text-[var(--dash-text-primary)]">₦{product.price}</span>
                              <Link to={`/product/${product.slug}`} className="text-[var(--dash-font-12)] font-bold uppercase tracking-widest text-[var(--dash-accent)] hover:text-[var(--dash-accent-hover)] transition-all">
                                Secure Access
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
