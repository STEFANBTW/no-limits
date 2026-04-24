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
    <div className="flex-1 animate-in fade-in duration-500">
      {/* Header Section */}
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mt-6 pb-6 px-4 md:px-6">
        
        {/* Business Health (Top Row, Wide) */}
        <div className="col-span-1 xl:col-span-8 flex flex-col gap-3">
          {/* Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Metric Card 1 */}
            <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-3 group hover:border-[var(--dash-accent)] transition-all duration-300 relative overflow-hidden">
               <span className="material-symbols-outlined absolute top-1 right-1 text-3xl text-[var(--dash-accent)] opacity-5 transition-opacity group-hover:opacity-10">pending_actions</span>
               <h3 className="dash-font-card-title uppercase tracking-widest text-[var(--dash-text-muted)] font-bold mb-2">Awaiting Manifestation</h3>
               <div className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)] leading-tight">{pendingOrders}</div>
            </div>
            
            {/* Metric Card 2 */}
            <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-3 group hover:border-[var(--dash-accent)] transition-all duration-300 relative overflow-hidden">
               <span className="material-symbols-outlined absolute top-1 right-1 text-3xl text-[var(--dash-accent)] opacity-5 transition-opacity group-hover:opacity-10">payments</span>
               <h3 className="dash-font-card-title uppercase tracking-widest text-[var(--dash-text-muted)] font-bold mb-2">Total Revenue</h3>
               <div className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)] leading-tight truncate">₦{totalRevenue.toLocaleString()}</div>
            </div>

            {/* Metric Card 3 */}
            <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-3 group hover:border-[var(--dash-accent)] transition-all duration-300 relative overflow-hidden sm:col-span-2 md:col-span-1">
               <span className="material-symbols-outlined absolute top-1 right-1 text-3xl text-[var(--dash-accent)] opacity-5 transition-opacity group-hover:opacity-10">chair</span>
               <h3 className="dash-font-card-title uppercase tracking-widest text-[var(--dash-text-muted)] font-bold mb-2">Active Catalog</h3>
               <div className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)] leading-tight">{products.length}</div>
            </div>
          </div>

          {/* Performance Charts Area */}
          <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-4 h-[350px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)]">Collection Velocity</h3>
              <button className="dash-font-card-title font-bold uppercase tracking-widest text-[var(--dash-accent)] hover:text-[var(--dash-accent-hover)] transition-colors">Generate PDF</button>
            </div>
            
            <div className="flex-1 flex items-end gap-5 pb-3 relative">
              {/* Subtle Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03]">
                 <div className="border-t border-[var(--dash-text-primary)] w-full"></div>
                 <div className="border-t border-[var(--dash-text-primary)] w-full"></div>
                 <div className="border-t border-[var(--dash-text-primary)] w-full"></div>
                 <div className="border-t border-[var(--dash-text-primary)] w-full border-b"></div>
              </div>

              {[
                { label: 'SEATING', val: '70%', color: 'var(--dash-text-muted)' },
                { label: 'TABLES', val: '45%', color: 'var(--dash-text-muted)' },
                { label: 'VANGUARD', val: '95%', color: 'var(--dash-accent)' },
                { label: 'LIGHTING', val: '30%', color: 'var(--dash-text-muted)' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group z-10">
                  <div 
                    className="w-full rounded-t-sm transition-all duration-500 ease-out group-hover:brightness-110"
                    style={{ height: bar.val, backgroundColor: bar.color, opacity: bar.color === 'var(--dash-accent)' ? 1 : 0.2 }}
                  ></div>
                  <span className="mt-4 dash-font-card-title font-bold tracking-widest text-[var(--dash-text-muted)] group-hover:text-[var(--dash-text-primary)] transition-colors">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Quick Actions */}
        <div className="col-span-1 xl:col-span-4 flex flex-col gap-4">
          {/* Quick Actions */}
          <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-4">
            <h3 className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)] mb-4">Directives</h3>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 w-full p-3 border border-[var(--dash-border-subtle)] hover:border-[var(--dash-accent)] hover:bg-[var(--dash-accent-muted)] transition-all group text-left">
                <div className="w-10 h-10 rounded-full border border-[var(--dash-border-subtle)] flex items-center justify-center group-hover:text-[var(--dash-accent)]">
                  <span className="material-symbols-outlined text-xl">upload_file</span>
                </div>
                <div>
                  <div className="dash-font-body font-semibold text-[var(--dash-text-primary)]">Sync Global Assets</div>
                  
                </div>
              </button>
              <button className="flex items-center gap-3 w-full p-3 border border-[var(--dash-border-subtle)] hover:border-[var(--dash-accent)] hover:bg-[var(--dash-accent-muted)] transition-all group text-left">
                <div className="w-10 h-10 rounded-full border border-[var(--dash-border-subtle)] flex items-center justify-center group-hover:text-[var(--dash-accent)]">
                  <span className="material-symbols-outlined text-xl">dataset</span>
                </div>
                <div>
                  <div className="dash-font-body font-semibold text-[var(--dash-text-primary)]">Manifest Domain</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-4 flex-1 flex flex-col overflow-hidden">
            <h3 className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)] mb-5 shrink-0">Recent Timeline</h3>
            <div className="flex flex-col gap-4 relative overflow-y-auto pr-2 pb-3 flex-1">
              {/* Activity Items */}
              {filteredOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex gap-3 group">
                  <div className="relative flex-shrink-0 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--dash-accent)] mt-1.5 transition-transform group-hover:scale-125"></div>
                    <div className="w-px flex-1 bg-[var(--dash-border-subtle)] my-2"></div>
                  </div>
                  <div>
                    <div className="dash-font-body text-[var(--dash-text-primary)] font-medium mb-1 line-clamp-2">
                       Commission <span className="text-[var(--dash-accent)]">#{order.id}</span> by {order.userName}
                    </div>
                    
                  </div>
                </div>
              ))}
              
              {orders.length === 0 && null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
