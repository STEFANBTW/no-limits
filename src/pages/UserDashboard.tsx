import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { getUserOrders } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const orders = getUserOrders(user.id);

  return (
    <div className="min-h-screen bg-theme-panel pt-32 pb-24 px-6 md:px-12 font-sans text-theme-text-muted">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">My Account</span>
            <h1 className="text-4xl md:text-4xl font-serif text-theme-text italic">Welcome, {user.name.split(' ')[0]}</h1>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="w-full md:w-auto border border-theme-border px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-theme-text-inverse transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar / Stats */}
          <div className="space-y-6">
            <div className="bg-theme-surface p-8 border border-theme-border">
              <h3 className="text-lg font-serif text-theme-text mb-6">Account Overview</h3>
              <div className="space-y-4 text-sm font-light">
                <div className="flex justify-between border-b border-theme-border pb-2">
                  <span className="text-theme-text-subtle">Email</span>
                  <span className="text-theme-text">{user.email}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-2">
                  <span className="text-theme-text-subtle">Member Since</span>
                  <span className="text-theme-text">2024</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-2">
                  <span className="text-theme-text-subtle">Total Orders</span>
                  <span className="text-theme-text">{orders.length}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/10 p-8 border border-primary/20">
              <h3 className="text-lg font-serif text-primary mb-2">Concierge Service</h3>
              <p className="text-xs text-theme-text-subtle mb-4">Need assistance with your order or a bespoke commission?</p>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-text border-b border-primary pb-1 hover:text-primary transition-colors">
                Contact Support
              </button>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl font-serif text-theme-text">Order History</h2>
            
            {orders.length === 0 ? (
              <div className="bg-theme-surface p-12 border border-theme-border text-center">
                <span className="material-symbols-outlined text-4xl text-slate-600 mb-4">history</span>
                <p className="text-theme-text-subtle mb-6">You haven't placed any orders yet.</p>
                <Link to="/shop" className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:underline">
                  Browse Collection
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-theme-surface border border-theme-border overflow-hidden group"
                  >
                    <div className="p-6 border-b border-theme-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.02]">
                      <div className="flex flex-wrap gap-4 sm:gap-8 text-xs">
                        <div>
                          <span className="block text-theme-text-subtle uppercase tracking-wider mb-1">Order Placed</span>
                          <span className="text-theme-text">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="block text-theme-text-subtle uppercase tracking-wider mb-1">Total</span>
                          <span className="text-theme-text">${order.total.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="block text-theme-text-subtle uppercase tracking-wider mb-1">Order #</span>
                          <span className="text-theme-text">{order.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-500' : 
                          order.status === 'Shipped' ? 'bg-blue-500' : 
                          order.status === 'Cancelled' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-theme-text">{order.status}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <div className="w-16 h-16 bg-theme-surface shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" loading="lazy" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-theme-text font-serif">{item.name}</h4>
                            <p className="text-xs text-theme-text-subtle">Qty: {item.quantity}</p>
                          </div>
                          <Link to={`/product/${item.slug}`} className="text-[10px] uppercase tracking-widest text-primary hover:underline">
                            View Item
                          </Link>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
