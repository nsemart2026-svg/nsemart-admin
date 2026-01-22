/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { CircleChevronUp, CircleChevronDown, ChevronDown, Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetAllOrdersQuery } from "@/redux/featured/order/orderApi";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

type OrderStatus = "Pending" | "Confirmed" | "Processing" | "Picked" | "Shipped" | "Delivered" | "Cancelled";

type Order = {
  order_id: string;
  created: string;
  customer: string;
  total: number;
  profit: number;
  profit_percent: number;
  status: OrderStatus;
  rawData: any;
};

const ORDER_STATUSES: OrderStatus[] = ["Pending", "Confirmed", "Processing", "Picked", "Shipped", "Delivered", "Cancelled"];

const OrderPage = () => {
  const { data: orderData = [] } = useGetAllOrdersQuery();
  const currentUser: any = useAppSelector(selectCurrentUser);

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OrderStatus>("Pending");
  const [ordersByStatus, setOrdersByStatus] = useState<Record<OrderStatus, Order[]>>({
    Pending: [],
    Confirmed: [],
    Processing: [],
    Picked: [],
    Shipped: [],
    Delivered: [],
    Cancelled: [],
  });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!orderData || orderData.length === 0 || !currentUser) return;

    // Filter orders by vendor
    const filteredOrders = orderData.filter((order: any) =>
      order.orderInfo.some((info: any) => info.vendorId === currentUser?._id)
    );

    // Transform orders
    const transformed: Order[] = filteredOrders.map((raw: any) => ({
      order_id: raw._id,
      created: new Date(raw.createdAt).toLocaleString(),
      customer: `${raw.customerInfo?.firstName || ""} ${raw.customerInfo?.lastName || ""}`.trim() || "Unknown",
      total: raw.totalAmount || 0,
      profit: raw.orderInfo?.[0]?.profit || 0,
      profit_percent: raw.orderInfo?.[0]?.profitPercent || 0,
      status: raw.orderInfo?.[0]?.status || "Pending",
      rawData: raw, // store raw data for modal
    }));

    // Group by status
    const grouped: Record<OrderStatus, Order[]> = {
      Pending: [],
      Confirmed: [],
      Processing: [],
      Picked: [],
      Shipped: [],
      Delivered: [],
      Cancelled: [],
    };

    transformed.forEach((order) => {
      if (ORDER_STATUSES.includes(order.status)) grouped[order.status].push(order);
      else grouped["Pending"].push(order);
    });

    setOrdersByStatus(grouped);
  }, [orderData, currentUser]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const currentStatus = Object.keys(ordersByStatus).find((status) =>
      ordersByStatus[status as OrderStatus].some((o) => o.order_id === orderId)
    ) as OrderStatus;

    if (!currentStatus || newStatus === currentStatus) return;

    const updatedOrder = ordersByStatus[currentStatus].find((o) => o.order_id === orderId);
    if (!updatedOrder) return;

    const newOrder = { ...updatedOrder, status: newStatus };

    const updatedOrdersByStatus = {
      ...ordersByStatus,
      [currentStatus]: ordersByStatus[currentStatus].filter((o) => o.order_id !== orderId),
      [newStatus]: [newOrder, ...ordersByStatus[newStatus]],
    };

    setOrdersByStatus(updatedOrdersByStatus);
    setActiveTab(newStatus);
    setExpandedOrder(null);
  };

  return (
    <div className="p-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pt-6">
        <div className="relative w-full sm:w-1/3 bg-white">
          <input
            type="text"
            placeholder="Search by order id"
            className="w-full rounded-md px-4 py-2 text-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
        </div>
        <button className="rounded-md bg-white text-gray-500 px-3 py-2 text-sm flex items-center gap-1 shadow-sm hover:bg-gray-100">
          Filter by date range
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Tabs */}
      <Tabs.Root value={activeTab} onValueChange={(val) => setActiveTab(val as OrderStatus)}>
        <Tabs.List className="flex overflow-x-auto">
          {ORDER_STATUSES.map((status) => (
            <Tabs.Trigger
              key={status}
              value={status}
              className="flex-1 h-[45px] px-4 bg-white text-sm text-center hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:border-b-2 data-[state=active]:border-violet-500"
              onClick={() => setActiveTab(status)}
            >
              {status}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {ORDER_STATUSES.map((status) => (
          <Tabs.Content key={status} value={status} className="grow bg-white p-5 rounded-b-md">
            <div className="overflow-x-auto">
              <Table className="min-w-[678px]">
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>ORDER ID</TableHead>
                    <TableHead>CREATED</TableHead>
                    <TableHead>CUSTOMER</TableHead>
                    <TableHead>TOTAL</TableHead>
                    <TableHead>PROFIT</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(ordersByStatus[status] || [])
                    .filter((item) => item.order_id.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item) => (
                      <TableRow key={item.order_id}>
                        <TableCell className="text-center">
                          <button
                            className="rounded-full border p-1 text-gray-500"
                            onClick={() => setExpandedOrder(expandedOrder === item.order_id ? null : item.order_id)}
                          >
                            {expandedOrder === item.order_id ? <CircleChevronUp /> : <CircleChevronDown />}
                          </button>
                        </TableCell>
                        <TableCell>{item.order_id}</TableCell>
                        <TableCell>{item.created}</TableCell>
                        <TableCell>{item.customer}</TableCell>
                        <TableCell>৳{item.total}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>৳{item.profit}</span>
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 text-xs rounded-md font-semibold">
                              {item.profit_percent}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md ${
                                  item.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : item.status === "Confirmed"
                                    ? "bg-blue-100 text-blue-800"
                                    : item.status === "Processing"
                                    ? "bg-purple-100 text-purple-800"
                                    : item.status === "Picked"
                                    ? "bg-indigo-100 text-indigo-800"
                                    : item.status === "Shipped"
                                    ? "bg-cyan-100 text-cyan-800"
                                    : item.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.status}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {ORDER_STATUSES.map((statusOption) => (
                                <DropdownMenuItem key={statusOption} onSelect={() => handleStatusChange(item.order_id, statusOption)}>
                                  {statusOption}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* Expanded Modal */}
      {expandedOrder && (
        <div className="bg-[#00000085] fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-xl shadow-2xl w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setExpandedOrder(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {(() => {
              const rawOrder = orderData.find((o: any) => o._id === expandedOrder);
              if (!rawOrder) return <p>Order not found.</p>;

              return (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      Order <span className="font-bold">{rawOrder._id}</span>
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(rawOrder.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Customer Info */}
                  <div className="flex flex-col sm:flex-row justify-between gap-6">
                    <div className="bg-[#F3F4F6] sm:w-2/3 p-4 rounded-lg shadow-sm">
                      <h3 className="font-medium mb-2">Customer Information</h3>
                      <p><span className="font-semibold">Name:</span> {rawOrder.customerInfo.firstName} {rawOrder.customerInfo.lastName}</p>
                      <p><span className="font-semibold">Email:</span> {rawOrder.customerInfo.email}</p>
                      <p><span className="font-semibold">Phone:</span> {rawOrder.customerInfo.phone}</p>
                      <p>
                        <span className="font-semibold">Address:</span> {rawOrder.customerInfo.address}, {rawOrder.customerInfo.city}, {rawOrder.customerInfo.postalCode}, {rawOrder.customerInfo.country}
                      </p>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-[#F3F4F6] sm:w-1/3 p-4 rounded-lg shadow-sm">
                      <h3 className="font-medium mb-2">Payment</h3>
                      <p><span className="font-semibold">Method:</span> {rawOrder.paymentInfo}</p>
                      <p><span className="font-semibold">Total:</span> ৳{rawOrder.totalAmount}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-[#F3F4F6] p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <div className="overflow-x-auto">
                      <Table className="min-w-[600px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Tracking</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rawOrder.orderInfo.map((item: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell>{item.productInfo._id}</TableCell>
                              <TableCell>{item.trackingNumber}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.status}</TableCell>
                              <TableCell>৳{(item.productInfo?.price || 0) * (item.quantity || 0)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
