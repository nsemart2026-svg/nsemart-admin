'use client';

import { MoreVertical } from 'lucide-react';

type OrderStatus = 'Pending' | 'Completed';

interface Order {
  id: string;
  customer: string;
  status: OrderStatus;
  total: number;
}

const orders: Order[] = [
  { id: '#6548', customer: 'Saniat Hossain', status: 'Pending', total: 18690 },
  { id: '#6548', customer: 'Nazmul Sharker', status: 'Completed', total: 18690 },
  { id: '#6548', customer: 'Samir Habib', status: 'Pending', total: 18690 },
  { id: '#6548', customer: 'Rifat hasan', status: 'Pending', total: 18690 },
  { id: '#6548', customer: 'Sanim hossain', status: 'Completed', total: 18690 },
];

const statusColor: Record<OrderStatus, string> = {
  Pending: 'text-yellow-500',
  Completed: 'text-green-600',
};

export default function RecentOrdersTable() {
  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-md p-4 w-full max-w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-base font-semibold">Recent Orders</h2>
        <div className="flex items-center gap-2 text-sm text-blue-500 cursor-pointer">
          View All
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-muted border-b text-muted-foreground">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order, idx) => (
              <tr className='border-none' key={idx}>
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.customer}</td>
                <td className={`p-2 font-medium ${statusColor[order.status]}`}>{order.status}</td>
                <td className="p-2 text-right">৳ {order.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
