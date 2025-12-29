import { useState, useEffect } from "react";
import { db, Order } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(db.orders.getAll());
  }, []);

  const updateStatus = (id: string, status: Order['status']) => {
    db.orders.updateStatus(id, status);
    setOrders(db.orders.getAll());
    toast.success(`Status updated to ${status}`, {
      style: { backgroundColor: '#383838', color: '#00E2E3', borderRadius: '0', border: '1px solid #00E2E3', textTransform: 'uppercase', fontSize: '10px' }
    });
  };

  return (
    <div className="space-y-12">
      <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">ORDERS</h1>
      
      <div className="border border-brand-gray bg-brand-gray/5">
        <table className="w-full text-[11px] tracking-wider text-left uppercase">
          <thead className="border-b border-brand-gray">
            <tr>
              <th className="p-6 font-medium text-brand-light/40">Order ID</th>
              <th className="p-6 font-medium text-brand-light/40">Customer</th>
              <th className="p-6 font-medium text-brand-light/40">Items</th>
              <th className="p-6 font-medium text-brand-light/40">Total</th>
              <th className="p-6 font-medium text-brand-light/40">Status</th>
              <th className="p-6 font-medium text-brand-light/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-brand-gray/10 transition-colors">
                <td className="p-6 font-mono text-[10px] text-brand-light/40">{order.id}</td>
                <td className="p-6">
                  <div className="font-medium text-brand-light">{order.customerName}</div>
                  <div className="text-[10px] text-brand-light/40">{order.email}</div>
                </td>
                <td className="p-6 text-brand-light/60">{order.items.length} items</td>
                <td className="p-6 text-brand-light/60">{order.totalAmount.toLocaleString()}</td>
                <td className="p-6">
                  <span className="px-3 py-1 border border-brand-cyan/30 text-brand-cyan text-[9px] font-bold">
                    {order.status}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as any)}
                    className="bg-brand-black border border-brand-gray text-brand-light text-[10px] tracking-widest p-2 rounded-none focus:outline-none focus:border-brand-cyan"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}