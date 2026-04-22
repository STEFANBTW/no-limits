import React from 'react';
import { useOrder } from '../../context/OrderContext';
import { useProduct } from '../../context/ProductContext';

export const DashboardTab = ({ searchQuery = '' }: { searchQuery?: string }) => {
  const { orders } = useOrder();
  const { products } = useProduct();

  const filteredOrders = orders.filter(o => 
    o.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingOrders = orders.filter(o => o.status === 'Processing').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="pt-24 md:pt-28 pb-12 px-4 md:px-12 flex-1 overflow-y-auto">
      {/* Header Section */}
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-headline text-on-surface mb-2">Atelier Command Center</h2>
          <p className="text-on-surface-variant text-sm font-body max-w-xl">Overview of current operations, active inquiries, and collection performance across the digital gallery.</p>
        </div>
        <div className="text-left md:text-right">
          <p className="font-label text-xs uppercase tracking-widest text-secondary">Last updated</p>
          <p className="font-body text-sm text-on-surface">Just now</p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Business Health (Top Row, Wide) */}
        <div className="col-span-1 xl:col-span-8 flex flex-col gap-6 md:gap-8">
          {/* Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {/* Metric Card 1 */}
            <div className="bg-surface-container rounded-xl p-5 md:p-8 hover:bg-surface-container-high transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-5xl md:text-6xl text-primary">pending_actions</span>
              </div>
              <h3 className="font-label text-xs uppercase tracking-widest text-secondary mb-3 md:mb-4">Pending Commissions</h3>
              <div className="font-headline text-4xl md:text-5xl text-on-surface mb-2">{pendingOrders}</div>
              <div className="flex items-center gap-2 text-[10px] md:text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-xs text-primary">arrow_upward</span>
                <span>Requires action</span>
              </div>
            </div>
            
            {/* Metric Card 2 */}
            <div className="bg-surface-container rounded-xl p-5 md:p-8 hover:bg-surface-container-high transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-5xl md:text-6xl text-primary">forum</span>
              </div>
              <h3 className="font-label text-xs uppercase tracking-widest text-secondary mb-3 md:mb-4">Total Revenue</h3>
              <div className="font-headline text-3xl md:text-[2.5rem] text-on-surface mb-2 truncate">₦{totalRevenue.toLocaleString()}</div>
              <div className="flex items-center gap-2 text-[10px] md:text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-xs text-primary">arrow_upward</span>
                <span>From {orders.length} orders</span>
              </div>
            </div>

            {/* Metric Card 3 */}
            <div className="bg-surface-container rounded-xl p-5 md:p-8 hover:bg-surface-container-high transition-colors duration-500 group relative overflow-hidden sm:col-span-2 md:col-span-1">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-5xl md:text-6xl text-primary">chair</span>
              </div>
              <h3 className="font-label text-xs uppercase tracking-widest text-secondary mb-3 md:mb-4">Products</h3>
              <div className="font-headline text-4xl md:text-5xl text-on-surface mb-2">{products.length}</div>
              <div className="flex items-center gap-2 text-[10px] md:text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
                <span>Active in catalog</span>
              </div>
            </div>
          </div>

          {/* Performance Charts Area */}
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-4 sm:p-8 h-96 relative flex flex-col">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h3 className="font-headline text-xl md:text-2xl text-on-surface">Collection Traffic ("Worlds")</h3>
              <button className="text-[10px] sm:text-xs font-label uppercase tracking-widest text-primary hover:text-primary-dim transition-colors">View Report</button>
            </div>
            {/* Abstracted Chart Representation */}
            <div className="flex-1 flex items-end gap-2 sm:gap-6 pl-4 border-l border-outline-variant/15 pb-4 border-b border-outline-variant/15">
              <div className="flex flex-col items-center justify-end gap-3 flex-1 min-w-0 group h-full">
                <div className="w-full bg-surface-container-high group-hover:bg-primary/20 transition-colors h-[80%] rounded-t-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/10 rounded-t-sm"></div>
                </div>
                <span className="font-label text-[8px] sm:text-[10px] text-secondary tracking-widest truncate w-full text-center">SEATING</span>
              </div>
              <div className="flex flex-col items-center justify-end gap-3 flex-1 min-w-0 group h-full">
                <div className="w-full bg-surface-container-high group-hover:bg-primary/20 transition-colors h-[45%] rounded-t-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/10 rounded-t-sm"></div>
                </div>
                <span className="font-label text-[8px] sm:text-[10px] text-secondary tracking-widest truncate w-full text-center">TABLES</span>
              </div>
              <div className="flex flex-col items-center justify-end gap-3 flex-1 min-w-0 group h-full">
                <div className="w-full primary-gradient h-[95%] rounded-t-sm bg-gradient-to-t from-primary-container to-primary shadow-[0_0_15px_rgba(255,181,155,0.1)]"></div>
                <span className="font-label text-[8px] sm:text-[10px] text-primary font-medium tracking-widest truncate w-full text-center">VANGUARD</span>
              </div>
              <div className="flex flex-col items-center justify-end gap-3 flex-1 min-w-0 group h-full">
                <div className="w-full bg-surface-container-high group-hover:bg-primary/20 transition-colors h-[30%] rounded-t-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/10 rounded-t-sm"></div>
                </div>
                <span className="font-label text-[8px] sm:text-[10px] text-secondary tracking-widest truncate w-full text-center">LIGHTING</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Quick Actions */}
        <div className="col-span-1 xl:col-span-4 flex flex-col gap-6 md:gap-8">
          {/* Quick Actions */}
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-5 md:p-8">
            <h3 className="font-headline text-xl text-on-surface mb-4 md:mb-6">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-4 w-full p-4 bg-surface-container hover:bg-surface-container-high transition-colors rounded-lg group text-left">
                <div className="w-10 h-10 rounded-full bg-surface-dim flex items-center justify-center group-hover:bg-primary/10 transition-colors border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-xl">add_photo_alternate</span>
                </div>
                <div>
                  <div className="font-body text-sm font-medium text-on-surface">Upload Campaign Assets</div>
                  <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">High-Res Media Only</div>
                </div>
              </button>
              <button className="flex items-center gap-4 w-full p-4 bg-surface-container hover:bg-surface-container-high transition-colors rounded-lg group text-left">
                <div className="w-10 h-10 rounded-full bg-surface-dim flex items-center justify-center group-hover:bg-primary/10 transition-colors border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-xl">view_in_ar</span>
                </div>
                <div>
                  <div className="font-body text-sm font-medium text-on-surface">Create New Collection</div>
                  <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Define New World</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-surface-container rounded-xl p-5 md:p-8 flex-1 flex flex-col shadow-lg border border-outline-variant/5 overflow-hidden">
            <h3 className="font-headline text-lg md:text-xl text-on-surface mb-6 md:mb-8 shrink-0">Recent Activity</h3>
            <div className="flex flex-col gap-5 md:gap-6 relative overflow-y-auto pr-2 pb-4 flex-1">
              {/* Timeline line */}
              <div className="absolute left-[11px] top-2 bottom-0 w-px bg-outline-variant/30"></div>
              
              {filteredOrders.slice(0, 4).map((order, idx) => (
                <div key={order.id} className="flex gap-6 relative z-10">
                  <div className={`w-6 h-6 rounded-full bg-surface-container border-2 ${idx === 0 ? 'border-primary' : 'border-outline-variant'} flex-shrink-0 mt-1`}></div>
                  <div>
                    <div className="font-body text-sm text-on-surface mb-1">
                      Order <span className="font-medium text-primary">#{order.id}</span>
                    </div>
                    <div className="font-body text-xs text-on-surface-variant mb-2">
                       {order.userName} placed an order for ₦{order.total.toLocaleString()}
                    </div>
                    <div className="font-label text-[10px] uppercase text-secondary tracking-widest">
                       {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {orders.length === 0 && (
                <div className="text-sm text-on-surface-variant">No recent activity</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
