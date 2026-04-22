import React, { useState } from 'react';
import { useOrder, Order } from '../../context/OrderContext';

export const OrdersTab = ({ searchQuery = '' }: { searchQuery?: string }) => {
  const { orders, updateOrderStatus } = useOrder();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter(o => 
    o.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.userEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="flex-1 mt-20 flex overflow-hidden">
      {/* Left Pane: Orders Feed (List) */}
      <section className={`w-full lg:w-[400px] xl:w-[450px] bg-surface-container-low flex-col border-r-0 lg:border-r border-outline-variant/15 z-10 ${selectedOrderId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="px-6 py-4 border-b border-outline-variant/15 shrink-0 flex items-center justify-between">
          <h2 className="font-headline text-2xl text-on-surface">Order History</h2>
          <div className="flex items-center gap-2">
            <span className="text-secondary-fixed-dim text-sm">{searchQuery ? `${filteredOrders.length}/${orders.length}` : orders.length} Total</span>
          </div>
        </div>
        
        {/* Feed List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-0 relative pb-24">
          <div className="px-2 pb-2 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            {searchQuery ? `Search Results (${filteredOrders.length})` : `Order Feed (${filteredOrders.length})`}
          </div>
          {filteredOrders.map((order, idx) => (
            <div 
              key={order.id} 
              onClick={() => setSelectedOrderId(order.id)}
              className={`bg-surface p-4 relative border-b last:border-b-0 ${selectedOrderId === order.id ? 'bg-surface-container-high' : 'border-outline-variant/10 hover:bg-surface-container-low'} group cursor-pointer transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${order.status === 'Processing' ? 'bg-primary' : 'bg-outline-variant'}`}></span>
                  <h3 className="font-body text-on-surface font-medium">{order.userName}</h3>
                </div>
                <span className="font-label text-xs text-on-surface-variant">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-end mt-3">
                <p className="font-headline text-lg text-theme-text-muted italic mb-1">₦{order.total.toLocaleString()}</p>
                <select 
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                  className="bg-surface-container-highest border border-outline-variant/30 text-on-surface font-label text-[10px] uppercase p-1.5 rounded outline-none focus:border-primary"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mt-2 text-xs text-on-surface-variant line-clamp-1">
                Order ID: {order.id}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="p-4 text-center text-on-surface-variant text-sm mt-10">
              No orders found.
            </div>
          )}
        </div>
      </section>

      {/* Right Pane: Detail View */}
      <section className={`flex-1 flex flex-col bg-surface-dim relative overflow-y-auto ${selectedOrderId ? 'flex absolute inset-0 z-20 lg:static' : 'hidden lg:flex'}`}>
        {selectedOrder ? (
          <div className="p-4 sm:p-6 lg:p-12 max-w-5xl mx-auto w-full pb-32">
            
            {/* Mobile Back Button */}
            <button 
               onClick={() => setSelectedOrderId(null)} 
               className="lg:hidden mb-6 flex items-center gap-2 text-primary hover:text-primary-dim transition-colors font-label text-[10px] uppercase tracking-widest border border-primary/20 px-4 py-2 w-max"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Orders
            </button>

            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between xl:items-center border-b border-outline-variant/20 pb-4 md:pb-6 mb-6 md:mb-8 gap-4">
              <div>
                <h2 className="text-2xl lg:text-4xl font-headline text-on-surface mb-2">Order #{selectedOrder.id.split('-')[1]}</h2>
                <p className="text-on-surface-variant font-body text-sm md:text-base">Placed on <span className="text-on-surface">{new Date(selectedOrder.date).toLocaleString()}</span></p>
              </div>
              <div className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center w-max ${
                selectedOrder.status === 'Delivered' ? 'bg-green-900/20 text-green-400 border border-green-700/50' :
                selectedOrder.status === 'Shipped' ? 'bg-blue-900/20 text-blue-400 border border-blue-700/50' :
                selectedOrder.status === 'Cancelled' ? 'bg-red-900/20 text-red-400 border border-red-700/50' :
                'bg-primary/20 text-primary border border-primary/30'
              }`}>
                {selectedOrder.status}
              </div>
            </div>

            {/* Customer Info (Mocked from Order) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="bg-surface-container-low p-4 md:p-6 border border-outline-variant/10">
                <h3 className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-2 bg-transparent md:mb-4">Customer Details</h3>
                <p className="font-headline text-lg md:text-xl text-on-surface mb-1 truncate">{selectedOrder.userName}</p>
                <p className="font-body text-xs md:text-sm text-on-surface-variant font-mono truncate">ID: {selectedOrder.userId}</p>
              </div>
              <div className="bg-surface-container-low p-4 md:p-6 border border-outline-variant/10">
                <h3 className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-2 md:mb-4">Payment & Fulfillment</h3>
                <p className="font-body text-xs md:text-sm text-on-surface-variant mb-1">Method: <span className="text-on-surface truncate">{selectedOrder.paymentMethod || 'Credit Card'}</span></p>
                <p className="font-body text-xs md:text-sm text-on-surface-variant">Shipping: <span className="text-on-surface">White Glove Delivery (Est. 4-6 Weeks)</span></p>
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-8 border border-outline-variant/10 bg-surface-container overflow-hidden rounded-xl">
               <div className="flex flex-col">
                 <div className="hidden md:grid grid-cols-12 gap-4 bg-surface-container-low border-b border-outline-variant/10 py-4 px-6 text-[10px] tracking-widest font-bold uppercase text-on-surface-variant">
                    <div className="col-span-6">Artifact</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                 </div>
                 <div className="bg-surface-container flex flex-col">
                   {selectedOrder.items.map(item => (
                     <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-outline-variant/5 last:border-0 hover:bg-white/[0.02] transition-colors py-4 px-4 md:px-6">
                       <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                          <div className="w-16 h-16 bg-surface-dim border border-outline-variant/10 shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-serif text-lg text-on-surface">{item.name}</p>
                            <p className="font-mono text-xs text-on-surface-variant uppercase mt-1">SKU: {item.id.substring(0,6)}</p>
                          </div>
                       </div>
                       <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                          <span className="md:hidden text-[10px] uppercase text-on-surface-variant">Qty:</span>
                          <span className="font-body text-on-surface">{item.quantity}</span>
                       </div>
                       <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                          <span className="md:hidden text-[10px] uppercase text-on-surface-variant">Price:</span>
                          <span className="font-body text-on-surface">₦{(item.price).toLocaleString()}</span>
                       </div>
                       <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                          <span className="md:hidden text-[10px] uppercase text-on-surface-variant">Total:</span>
                          <span className="font-body font-medium text-on-surface">₦{(item.price * item.quantity).toLocaleString()}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Financials & Status Update */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
              {/* Order Status Update Tool */}
              <div className="bg-surface-container p-6 w-full md:p-8 border border-outline-variant/10 flex flex-col justify-center">
                <h3 className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-4 md:mb-6">Update Fulfillment Status</h3>
                <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-2 md:gap-3">
                   {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                     <button 
                       key={s}
                       onClick={() => handleStatusChange(selectedOrder.id, s as any)}
                       className={`px-3 md:px-4 py-2 md:py-3 text-[9px] md:text-[10px] block font-bold uppercase tracking-[0.2em] transition-all border ${
                         selectedOrder.status === s 
                         ? 'bg-primary text-on-primary border-primary shadow-md' 
                         : 'bg-transparent text-on-surface-variant border-outline-variant/20 hover:border-primary/50 hover:text-primary'
                       }`}
                     >
                       {s}
                     </button>
                   ))}
                </div>
              </div>

              {/* Financial Totals */}
              <div className="bg-surface-container p-6 md:p-8 border border-outline-variant/10 space-y-4">
                 <div className="flex justify-between font-body text-xs md:text-sm text-on-surface-variant">
                   <span>Subtotal</span>
                   <span>₦{selectedOrder.total.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between font-body text-sm text-on-surface-variant">
                   <span>Freight & White Glove Delivery</span>
                   <span>Complimentary</span>
                 </div>
                 <div className="flex justify-between font-body text-sm text-on-surface-variant">
                   <span>Tax & Duties</span>
                   <span>Included</span>
                 </div>
                 <div className="pt-6 mt-4 border-t border-outline-variant/20 flex justify-between items-center">
                   <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface">Grand Total</span>
                   <span className="font-serif italic text-3xl text-primary">₦{selectedOrder.total.toLocaleString()}</span>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <div className="text-center">
               <span className="material-symbols-outlined text-outline-variant text-[64px] mb-4">receipt_long</span>
               <p className="text-on-surface-variant font-body text-lg">Select an order from the feed to view details</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
