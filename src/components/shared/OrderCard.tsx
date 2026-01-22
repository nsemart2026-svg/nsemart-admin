// src/components/shared/OrderCard.tsx
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  CircleDollarSign,
  CreditCard,
} from "lucide-react";

export default function OrderCard({ summary }: { summary: any }) {
  const data = [
    {
      label: "Total Orders",
      value: summary?.totalOrders || 0,
      icon: <ShoppingBag className="w-5 h-5 text-blue-500" />,
      color: "text-blue-500",
    },
    {
      label: "Cancel Orders",
      value: summary?.canceledOrders || 0,
      icon: <ShoppingBag className="w-5 h-5 text-blue-500" />,
      color: "text-blue-500",
    },
    {
      label: "Pending Orders",
      value: summary?.pendingOrders || 0,
      icon: <CircleDollarSign className="w-5 h-5 text-orange-500" />,
      color: "text-orange-500",
    },
    {
      label: "Paid Orders",
      value: summary?.paidOrders || 0,
      icon: <CreditCard className="w-5 h-5 text-green-500" />,
      color: "text-green-500",
    },
    {
      label: "SR Orders",
      value: summary?.srOrders || 0,
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      color: "text-indigo-500",
    },
    {
      label: "SR canceled Orders",
      value: summary?.srCanceledOrders || 0,
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      color: "text-indigo-500",
    },
    {
      label: "Customers Orders",
      value: summary?.customersOrders || 0,
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      color: "text-indigo-500",
    },
    {
      label: "Total Sale Amount",
      value: `${summary?.totalOrderSaleAmount || 0}৳`,
      icon: <TrendingUp className="w-5 h-5 text-teal-500" />,
      color: "text-teal-500",
    },
    {
      label: "Total Pending Sale",
      value: `${summary?.totalPendingSale || 0}৳`,
      icon: <TrendingDown className="w-5 h-5 text-red-500" />,
      color: "text-red-500",
    },
    {
      label: "Total Paid Order Sale",
      value: `${summary?.totalPaidOrderSaleAmount || 0}৳`,
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      {data.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm font-medium">{item.label}</p>
            {item.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
