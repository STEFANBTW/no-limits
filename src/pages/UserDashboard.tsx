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
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleConciergeClick = () => {
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  return (
    <div className="min-h-screen bg-theme-panel pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 font-sans text-theme-text-muted">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-6">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">My Account</span>
            <h1 className="text-3xl md:text-4xl font-serif text-theme-text italic">Welcome, {user.name.split(' ')[0]}</h1>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="w-full md:w-auto border border-theme-border px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-theme-text-inverse transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 xl:gap-12">
          {/* Unified Sidebar Rail */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-[#141414]/80 backdrop-blur-md p-3 md:p-6 border border-theme-border flex flex-row xl:flex-col gap-2 relative overflow-x-auto no-scrollbar rounded-sm">
               {/* Ambient Background Glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none hidden xl:block"></div>

               <button 
                 onClick={() => setActiveTab('overview')} 
                 className={`flex whitespace-nowrap items-center gap-3 md:gap-4 p-3 md:p-4 transition-colors text-left relative z-10 w-auto xl:w-full min-w-max ${
                   activeTab === 'overview' ? 'text-primary' : 'text-theme-text-subtle hover:text-theme-text'
                 }`}
               >
                 <span className="material-symbols-outlined text-[18px] md:text-[20px]">person</span>
                 <span className="font-serif text-base md:text-lg tracking-wide uppercase">Overview</span>
               </button>

               <button 
                 onClick={() => setActiveTab('orders')} 
                 className={`flex whitespace-nowrap items-center gap-3 md:gap-4 p-3 md:p-4 transition-colors text-left relative z-10 w-auto xl:w-full min-w-max ${
                   activeTab === 'orders' ? 'text-primary' : 'text-theme-text-subtle hover:text-theme-text'
                 }`}
               >
                 <span className="material-symbols-outlined text-[18px] md:text-[20px]">history</span>
                 <span className="font-serif text-base md:text-lg tracking-wide uppercase">Order History</span>
               </button>

               <button 
                 onClick={() => setActiveTab('wishlist')} 
                 className={`flex whitespace-nowrap items-center gap-3 md:gap-4 p-3 md:p-4 transition-colors text-left relative z-10 w-auto xl:w-full min-w-max ${
                   activeTab === 'wishlist' ? 'text-primary' : 'text-theme-text-subtle hover:text-theme-text'
                 }`}
               >
                 <span className="material-symbols-outlined text-[18px] md:text-[20px]">favorite</span>
                 <div className="flex-1 flex justify-between items-center gap-4">
                    <span className="font-serif text-base md:text-lg tracking-wide uppercase">Wishlist</span>
                    {wishlist.length > 0 && <span className="text-[10px] bg-theme-border px-2 py-0.5">{wishlist.length}</span>}
                 </div>
               </button>
            </div>
            
            <div className="bg-primary/5 p-8 border border-primary/20 hover:bg-primary/10 transition-colors duration-500 rounded-sm">
              <h3 className="text-xl font-serif text-primary mb-3">Concierge Service</h3>
              <p className="text-sm text-theme-text-subtle mb-6 leading-relaxed">Need assistance tracking your order, or interested in a bespoke commission?</p>
              <button onClick={handleConciergeClick} className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-text border-b border-primary pb-1 hover:text-primary transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                Message Sawyer
              </button>
            </div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="xl:col-span-3 space-y-8 min-h-[500px]">
             {/* Render tab content gracefully */}
             {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl md:text-4xl font-serif text-theme-text">Account Overview</h2>
                  <div className="bg-[#141414]/80 p-6 md:p-8 border border-theme-border max-w-2xl">
                    <div className="space-y-4 md:space-y-6 text-sm font-light">
                      <div className="flex justify-between items-center border-b border-theme-border/50 pb-3">
                        <span className="text-[10px] uppercase tracking-widest text-[#54524F] font-bold">Email</span>
                        <span className="text-theme-text font-serif italic text-base md:text-lg break-all ml-4 truncate">{user.email}</span>
                      </div>
                      <div className="flex justify-between border-b border-theme-border/50 pb-3">
                        <span className="text-[10px] uppercase tracking-widest text-[#54524F] font-bold">Membership</span>
                        <span className="text-theme-text font-serif italic text-lg">Since 2024</span>
                      </div>
                      <div className="flex justify-between border-b border-theme-border/50 pb-3">
                        <span className="text-[10px] uppercase tracking-widest text-[#54524F] font-bold">Total Commissions</span>
                        <span className="text-theme-text font-serif italic text-lg">{orders.length}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
             )}

             {activeTab === 'orders' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                 <h2 className="text-3xl md:text-4xl font-serif text-theme-text">Order History</h2>
                 
                 {orders.length === 0 ? (
                   <div className="bg-[#141414] p-8 md:p-16 border border-theme-border text-center flex flex-col items-center">
                     <span className="material-symbols-outlined text-5xl md:text-6xl text-[#3A3836] mb-6">inventory_2</span>
                     <p className="text-[#54524F] text-base md:text-lg font-serif italic mb-8">You haven't commissioned any pieces yet.</p>
                     <button onClick={() => navigate('/shop')} className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/30 px-6 py-3 hover:bg-primary/10 transition-colors">
                       Explore Collection
                     </button>
                   </div>
                 ) : (
                   <div className="space-y-8">
                     {orders.map((order) => (
                       <div key={order.id} className="bg-[#141414] border border-theme-border overflow-hidden">
                         <div className="p-4 md:p-6 border-b border-theme-border flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white/[0.01]">
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full text-xs">
                             <div className="flex flex-col gap-1">
                               <span className="text-[#54524F] uppercase tracking-[0.2em] font-bold text-[9px]">Date Placed</span>
                               <span className="font-serif italic text-base text-theme-text">{new Date(order.date).toLocaleDateString()}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                               <span className="text-[#54524F] uppercase tracking-[0.2em] font-bold text-[9px]">Total Amount</span>
                               <span className="font-serif italic text-base text-primary">₦{order.total.toLocaleString()}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                               <span className="text-[#54524F] uppercase tracking-[0.2em] font-bold text-[9px]">Order Number</span>
                               <span className="font-serif italic text-base text-theme-text">{order.id}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                               <span className="text-[#54524F] uppercase tracking-[0.2em] font-bold text-[9px]">Status</span>
                               <span className={`font-serif italic text-base ${
                                  order.status === 'Delivered' ? 'text-green-500' : 
                                  order.status === 'Shipped' ? 'text-blue-500' : 
                                  order.status === 'Cancelled' ? 'text-red-500' : 'text-yellow-500'
                               }`}>{order.status}</span>
                             </div>
                           </div>
                         </div>
                         
                         <div className="p-4 md:p-6">
                           {order.items.map((item, index) => (
                             <div key={item.id} className={`flex gap-4 md:gap-6 items-center ${index !== 0 ? 'mt-6 pt-6 border-t border-theme-border/30' : ''}`}>
                               <div className="w-16 h-16 md:w-24 md:h-24 bg-theme-surface shrink-0 hidden sm:block">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                               </div>
                               <div className="flex-1">
                                 <h4 className="text-lg md:text-xl text-theme-text font-serif italic mb-1">{item.name}</h4>
                                 <p className="text-[10px] md:text-xs text-[#54524F] tracking-widest uppercase mb-3 md:mb-4">QTY: {item.quantity} • ₦{item.price.toLocaleString()}</p>
                                 <Link to={`/product/${item.slug}`} className="text-[9px] uppercase tracking-widest text-theme-text-subtle border-b border-theme-border pb-1 hover:text-primary transition-colors">
                                   View Artifact Details
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
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl md:text-4xl font-serif text-theme-text">Curated Wishlist</h2>
                  
                  {wishlistedProducts.length === 0 ? (
                   <div className="bg-[#141414] p-8 md:p-16 border border-theme-border text-center flex flex-col items-center">
                     <span className="material-symbols-outlined text-5xl md:text-6xl text-[#3A3836] mb-6">heart_broken</span>
                     <p className="text-[#54524F] text-base md:text-lg font-serif italic mb-8">Your curated collection is empty.</p>
                     <button onClick={() => navigate('/shop')} className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/30 px-6 py-3 hover:bg-primary/10 transition-colors">
                       Discover Artifacts
                     </button>
                   </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistedProducts.map(product => (
                        <div key={product.id} className="group relative bg-[#141414] border border-theme-border hover:border-outline-variant/40 transition-all duration-300">
                          <div className="aspect-[4/5] relative overflow-hidden bg-surface-container-low">
                             <img 
                               src={product.images[0]} 
                               alt={product.name}
                               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                             />
                             <div className="absolute top-4 right-4 z-10">
                               <button 
                                 onClick={() => removeFromWishlist(product.id)}
                                 className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-red-500 hover:text-white hover:bg-red-500 transition-colors border border-white/10"
                               >
                                 <span className="material-symbols-outlined text-lg">favorite</span>
                               </button>
                             </div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-serif italic text-xl text-theme-text mb-1">{product.name}</h3>
                            <p className="font-sans text-[10px] tracking-widest uppercase text-[#54524F] mb-4">{product.category}</p>
                            <div className="flex justify-between items-center mt-6">
                              <span className="font-mono text-sm text-theme-text">₦{product.price}</span>
                              <Link to={`/product/${product.slug}`} className="text-[9px] uppercase tracking-widest text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors">
                                View
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
