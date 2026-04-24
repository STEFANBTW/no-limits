import React, { useState } from 'react';
import { useOrder, Order } from '../../context/OrderContext';

export const OrdersTab = ({ searchQuery = '' }: { searchQuery?: string }) => {
  const { orders, updateOrderStatus } = useOrder();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter(o => 
    o.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="flex-1 flex overflow-hidden animate-in fade-in duration-500">
      {/* Left Pane: Orders Feed (List) */}
      <section className={`w-full lg:w-[400px] xl:w-[450px] bg-[var(--dash-bg-surface)] flex flex-col border-r border-[var(--dash-border-subtle)] z-10 ${selectedOrderId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="px-6 py-6 border-b border-[var(--dash-border-subtle)] shrink-0 flex items-center justify-between bg-[var(--dash-bg-page)]/50">
          <h2 className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)]">Transaction Ledger</h2>
          <span className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest">{filteredOrders.length} Events</span>
        </div>
        
        {/* Feed List */}
        <div className="flex-1 overflow-y-auto flex flex-col relative">
          {filteredOrders.map((order, idx) => (
            <div 
              key={order.id} 
              onClick={() => setSelectedOrderId(order.id)}
              className={`p-6 border-b border-[var(--dash-border-subtle)] cursor-pointer transition-all duration-300 ${selectedOrderId === order.id ? 'bg-[var(--dash-accent-muted)] border-l-4 border-l-[var(--dash-accent)]' : 'hover:bg-[var(--dash-bg-page)]'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                   <div className={`w-2 h-2 rounded-full ${order.status === 'Processing' ? 'bg-[var(--dash-accent)]' : 'bg-[var(--dash-text-muted)] opacity-30'}`}></div>
                   <h3 className="dash-font-section-title text-[var(--dash-text-primary)] font-semibold">{order.userName}</h3>
                </div>
                <span className="dash-font-card-title text-[var(--dash-text-muted)] font-medium">
                  {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)]">₦{order.total.toLocaleString()}</p>
                <div className={`px-2 py-0.5 dash-font-card-title font-bold uppercase tracking-widest border ${
                  order.status === 'Delivered' ? 'border-green-500/30 text-green-500 bg-green-500/5' :
                  order.status === 'Cancelled' ? 'border-red-500/30 text-red-500 bg-red-500/5' :
                  'border-[var(--dash-accent)]/30 text-[var(--dash-accent)] bg-[var(--dash-accent)]/5'
                }`}>
                  {order.status}
                </div>
              </div>
              <div className="mt-2 dash-font-card-title text-[var(--dash-text-muted)] font-mono uppercase tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
                ID: {order.id}
              </div>
            </div>
          ))}
          
          {orders.length === 0 && (
            <div className="p-12 text-center text-[var(--dash-text-muted)] italic">
              The ledger is currently empty.
            </div>
          )}
        </div>
      </section>

      {/* Right Pane: Detail View */}
      <section className={`flex-1 flex flex-col bg-[var(--dash-bg-page)] relative overflow-y-auto ${selectedOrderId ? 'flex absolute inset-0 z-20 lg:static' : 'hidden lg:flex'}`}>
        {selectedOrder ? (
          <div className="p-8 lg:p-12 max-w-5xl mx-auto w-full animate-in slide-in-from-right-4 duration-300">
            
            {/* Mobile Back Button */}
            <button 
               onClick={() => setSelectedOrderId(null)} 
               className="lg:hidden mb-8 h-10 px-4 border border-[var(--dash-border-subtle)] dash-font-card-title font-bold uppercase tracking-widest text-[var(--dash-text-muted)] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return to Ledger
            </button>

            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between xl:items-end border-b border-[var(--dash-border-subtle)] pb-8 mb-8 gap-6">
              <div>
                <h2 className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)] mb-2">Commission Detail</h2>
                <div className="flex items-center gap-3 text-[var(--dash-text-muted)] dash-font-body">
                   <span className="font-bold text-[var(--dash-text-primary)]">#{selectedOrder.id.split('-')[1]}</span>
                   <span>•</span>
                   <span>Manifested {new Date(selectedOrder.date).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order['status'])}
                  className="h-10 bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] px-4 dash-font-card-title font-bold uppercase tracking-widest outline-none focus:border-[var(--dash-accent)] text-[var(--dash-text-primary)]"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
               <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-5">
                  <h3 className="dash-font-card-title font-bold uppercase tracking-widest text-[var(--dash-text-muted)] mb-4">Principal Transactor</h3>
                  <div className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)] mb-1">{selectedOrder.userName}</div>
                  <div className="dash-font-body text-[var(--dash-text-muted)] font-mono">{selectedOrder.userId}</div>
               </div>
               <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-5">
                  <h3 className="dash-font-card-title font-bold uppercase tracking-widest text-[var(--dash-text-muted)] mb-4">Fulfillment Logistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between dash-font-body">
                      <span className="text-[var(--dash-text-muted)]">Method:</span>
                      <span className="font-medium text-[var(--dash-text-primary)]">{selectedOrder.paymentMethod || 'SECURE CHECKOUT'}</span>
                    </div>
                    <div className="flex justify-between dash-font-body">
                      <span className="text-[var(--dash-text-muted)]">Service:</span>
                      <span className="font-medium text-[var(--dash-text-primary)] uppercase tracking-tight">White Glove Delivery (Curated)</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Line Items Table */}
            <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] mb-12 overflow-hidden">
               <div className="hidden md:grid grid-cols-12 gap-4 bg-[var(--dash-bg-page)]/50 border-b border-[var(--dash-border-subtle)] py-4 px-8 dash-font-card-title font-bold uppercase tracking-widest text-[var(--dash-text-muted)]">
                  <div className="col-span-6">Manifested Item</div>
                  <div className="col-span-2 text-center">Unit</div>
                  <div className="col-span-4 text-right">Valuation</div>
               </div>
               <div className="divide-y divide-[var(--dash-border-subtle)]">
                 {selectedOrder.items.map(item => (
                   <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 px-8 hover:bg-[var(--dash-bg-page)]/30 transition-colors">
                     <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                        <div className="w-16 h-16 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="dash-font-body font-semibold text-[var(--dash-text-primary)]">{item.name}</p>
                          <p className="dash-font-card-title font-mono text-[var(--dash-text-muted)] mt-1 uppercase">ARCHIVE: {item.id.substring(0,8)}</p>
                        </div>
                     </div>
                     <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden dash-font-card-title font-bold text-[var(--dash-text-muted)]">QUANTITY</span>
                        <span className="dash-font-body text-[var(--dash-text-primary)]">{item.quantity}</span>
                     </div>
                     <div className="col-span-1 md:col-span-4 flex justify-between md:justify-end items-center">
                        <span className="md:hidden dash-font-card-title font-bold text-[var(--dash-text-muted)]">TOTAL VALUE</span>
                        <span className="dash-font-body font-semibold text-[var(--dash-text-primary)]">₦{(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toLocaleString()}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-5 space-y-3">
              <div className="flex justify-between dash-font-body text-[var(--dash-text-muted)]">
                <span className="uppercase tracking-widest font-bold">Subtotal Ledger</span>
                <span>₦{selectedOrder.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between dash-font-body text-[var(--dash-text-muted)]">
                <span className="uppercase tracking-widest font-bold">Logistics Surcharge</span>
                <span className="text-[var(--dash-accent)] italic">COMPLIMENTARY</span>
              </div>
              <div className="pt-8 mt-8 border-t border-[var(--dash-border-subtle)] flex justify-between items-center">
                <span className="dash-font-body font-black uppercase tracking-[0.3em] text-[var(--dash-text-primary)]">Final Reconciliation</span>
                <span className="dash-font-page-title font-serif italic text-[var(--dash-accent)]">₦{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-4">
               <button className="h-11 px-6 border border-[var(--dash-border-subtle)] dash-font-action font-bold uppercase tracking-widest text-[var(--dash-text-muted)] hover:bg-[var(--dash-bg-surface)] transition-all">Print Invoice</button>
               <button className="h-11 px-6 bg-[var(--dash-text-primary)] text-[var(--dash-bg-page)] dash-font-action font-bold uppercase tracking-widest hover:brightness-125 transition-all">Archive Event</button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 p-12">
            <div className="text-center max-w-md">
               <span className="material-symbols-outlined text-[var(--dash-text-muted)] text-[64px] mb-6 opacity-20">inventory_2</span>
               <h3 className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)] mb-1">Reconciliation Required</h3>
               <p className="text-[var(--dash-text-muted)] dash-font-body">Select a transaction fragment from the ledger to initiate deep verification and logistical oversight.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
