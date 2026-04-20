import React from 'react';
import { useOrder, Order } from '../../context/OrderContext';

export const OrdersTab = () => {
  const { orders, updateOrderStatus } = useOrder();

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="flex-1 mt-20 flex overflow-hidden">
      {/* Left Pane: Orders Feed (List) */}
      <section className="w-full lg:w-[400px] xl:w-[450px] bg-surface-container-low flex flex-col border-r-0 lg:border-r border-outline-variant/15 z-10">
        <div className="px-6 py-4 border-b border-outline-variant/15 shrink-0 flex items-center justify-between">
          <h2 className="font-headline text-2xl text-on-surface">Order History</h2>
          <div className="flex items-center gap-2">
            <span className="text-secondary-fixed-dim text-sm">{orders.length} Total</span>
          </div>
        </div>
        
        {/* Feed List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {orders.map((order, idx) => (
            <div key={order.id} className="bg-surface-container p-4 rounded-xl relative border border-outline-variant/10 group mb-2">
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
      <section className="hidden lg:flex flex-1 flex-col bg-surface-dim relative">
        <div className="flex items-center justify-center flex-1 text-on-surface-variant/50 font-headline text-xl">
          Select an order to view details
        </div>
      </section>
    </div>
  );
};
