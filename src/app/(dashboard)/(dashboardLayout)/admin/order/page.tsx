/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useReactToPrint } from "react-to-print";
import { CircleChevronUp, CircleChevronDown, Search } from "lucide-react";

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

import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/featured/order/orderApi";

type OrderStatus =
  | "pending"
  | "processing"
  | "at-local-facility"
  | "delivered"
  | "cancelled"
  | "paid";

type Order = {
  order_id: string;
  created: string;
  createdAt: string;
  customer: string;
  total: number;
  status: OrderStatus;
  userType: "sr" | "customer";
};

const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "at-local-facility",
  "delivered",
  "cancelled",
  "paid",
];

const OrderPage = () => {
  // ✅ FIX 1: Correctly read the data array from the hook.
  // Your data structure is an array `[...]`, not a nested object.
  const { data: orderData = [] } = useGetAllOrdersQuery();

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OrderStatus>("pending");
  const [searchValue, setSearchValue] = useState("");

  const [sortType, setSortType] = useState<"customer" | "sr">("customer");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [ordersByStatus, setOrdersByStatus] = useState<
    Record<OrderStatus, Order[]>
  >({
    pending: [],
    processing: [],
    "at-local-facility": [],
    delivered: [],
    cancelled: [],
    paid: [],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!orderData || orderData.length === 0) return;

    const transformOrder = (raw: any): Order => {
      const userRole = raw.userRole || "customer";

      // ✅ FIX 2: Type-safe status check to fix TypeScript error
      let orderStatus: OrderStatus = "pending";
      if (raw.status && ORDER_STATUSES.includes(raw.status)) {
        orderStatus = raw.status;
      }

      return {
        order_id: raw._id,
        created: new Date(raw.createdAt).toLocaleString(),
        createdAt: raw.createdAt,
        customer:
          `${raw.customerInfo.firstName} ${raw.customerInfo.lastName}`.trim() ||
          "Unknown",
        total: raw.totalAmount || 0,
        status: orderStatus, // Use the validated status
        userType: userRole === "sr" ? "sr" : "customer",
      };
    };

    const transformed = orderData.map(transformOrder);

    const grouped: Record<OrderStatus, Order[]> = {
      pending: [],
      processing: [],
      "at-local-facility": [],
      delivered: [],
      cancelled: [],
      paid: [],
    };

    // This grouping logic is now safe because `order.status` is guaranteed
    // to be of type `OrderStatus` by the `transformOrder` function.
    transformed.forEach((order) => {
      grouped[order.status].push(order);
    });

    setOrdersByStatus(grouped);
  }, [orderData]);

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();

      // Find which status list the order is currently in
      const currentStatus = Object.keys(ordersByStatus).find((status) =>
        ordersByStatus[status as OrderStatus].some(
          (o) => o.order_id === orderId
        )
      ) as OrderStatus;

      if (!currentStatus || newStatus === currentStatus) return;

      // Find the order
      const updatedOrder = ordersByStatus[currentStatus].find(
        (o) => o.order_id === orderId
      );
      if (!updatedOrder) return;

      // Create a new order object with the updated status
      const newOrder = { ...updatedOrder, status: newStatus };

      // Optimistically update the state
      const updatedOrdersByStatus = {
        ...ordersByStatus,
        // Remove from old status list
        [currentStatus]: ordersByStatus[currentStatus].filter(
          (o) => o.order_id !== orderId
        ),
        // Add to new status list
        [newStatus]: [newOrder, ...ordersByStatus[newStatus]],
      };

      setOrdersByStatus(updatedOrdersByStatus);
      setExpandedOrder(null);
    } catch (err: any) {
      console.error(
        "Failed to update status:",
        err?.data?.message || err.message
      );
      alert("Failed to update status!");
    }
  };

  // 🔹 Filter orders by SR/Customer + date + search
  const getFilteredOrders = (status: OrderStatus) => {
    return (ordersByStatus[status] || [])
      .filter((item) => {
        if (sortType === "sr") return item.userType === "sr";
        return item.userType === "customer";
      })
      .filter((item) =>
        item.order_id.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((item) => {
        if (startDate && endDate) {
          const created = new Date(item.createdAt).getTime();
          // Adjust start date to be start of the day
          const start = new Date(startDate).setHours(0, 0, 0, 0);
          // Adjust end date to be end of the day
          const end = new Date(endDate).setHours(23, 59, 59, 999);
          return created >= start && created <= end;
        }
        return true;
      });
  };

  // 🔹 Pagination logic
  const filteredOrders = getFilteredOrders(activeTab);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // reset page when filters change
  }, [activeTab, searchValue, sortType, startDate, endDate]);

  return (
    <>
      {/* 🔹 Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pt-6">
        {/* Search */}
        <div className="relative w-full sm:w-1/3 bg-white">
          <input
            type="text"
            placeholder="Search by order id"
            className="w-full rounded-md px-4 py-2 text-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          />
        </div>

        {/* Sort + Filter by Date */}
        <div className="flex flex-wrap gap-2">
          <div className="relative inline-block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 rounded-md bg-white text-gray-700 px-4 py-3 text-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <span>
                Sort by: {sortType === "customer" ? "Customer" : "SR"}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute left-0 mt-2 w-42 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSortType("customer");
                      setIsOpen(false);
                    }}
                    className="block w-full text-left  px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
                  >
                    Sort by: Customer
                  </button>
                  <button
                    onClick={() => {
                      setSortType("sr");
                      setIsOpen(false);
                    }}
                    className="block w-full text-left  px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
                  >
                    Sort by: SR
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm">
            <span className="text-sm text-gray-500">Filter by date:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as OrderStatus)}
      >
        <Tabs.List className="flex overflow-x-auto">
          {ORDER_STATUSES.map((status) => (
            <Tabs.Trigger
              key={status}
              value={status}
              className="flex-1 h-[45px] px-4 bg-white text-sm text-center hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 capitalize"
            >
              {status.replace("-", " ")} ({getFilteredOrders(status).length})
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {ORDER_STATUSES.map((status) => (
          <Tabs.Content
            key={status}
            value={status}
            className="grow bg-white p-5 rounded-b-md"
          >
            <div className="overflow-x-auto">
              <Table className="min-w-[678px]">
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="text-gray-400">ORDER ID</TableHead>
                    <TableHead className="text-gray-400">CREATED</TableHead>
                    <TableHead className="text-gray-400">CUSTOMER</TableHead>
                    <TableHead className="text-gray-400">TOTAL</TableHead>
                    <TableHead className="text-gray-400">STATUS</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {status === activeTab &&
                    paginatedOrders.map((item) => (
                      <TableRow key={item.order_id}>
                        <TableCell className="text-center">
                          <button
                            className="rounded-full border p-1 text-gray-500"
                            onClick={() =>
                              setExpandedOrder(
                                expandedOrder === item.order_id
                                  ? null
                                  : item.order_id
                              )
                            }
                          >
                            {expandedOrder === item.order_id ? (
                              <CircleChevronUp />
                            ) : (
                              <CircleChevronDown />
                            )}
                          </button>
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.order_id}
                        </TableCell>
                        <TableCell>{item.created}</TableCell>
                        <TableCell>{item.customer}</TableCell>
                        <TableCell>৳{item.total}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md capitalize ${
                                  item.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : item.status === "processing"
                                    ? "bg-purple-100 text-purple-800"
                                    : item.status === "at-local-facility"
                                    ? "bg-blue-100 text-blue-800"
                                    : item.status === "delivered"
                                    ? "bg-cyan-100 text-cyan-800"
                                    : item.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.status.replace("-", " ")}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {ORDER_STATUSES.map((statusOption) => (
                                <DropdownMenuItem
                                  key={statusOption}
                                  className="capitalize"
                                  onSelect={() =>
                                    handleStatusChange(
                                      item.order_id,
                                      statusOption
                                    )
                                  }
                                >
                                  {statusOption.replace("-", " ")}
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

            {/* 🔹 Pagination */}
            {status === activeTab && totalPages > 0 && (
              <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {/* Logic for showing limited page numbers */}
                {(() => {
                  const pages = [];
                  const maxButtons = 5;
                  let start = Math.max(
                    1,
                    currentPage - Math.floor(maxButtons / 2)
                  );
                  const end = Math.min(totalPages, start + maxButtons - 1);

                  if (end - start < maxButtons - 1) {
                    start = Math.max(1, end - maxButtons + 1);
                  }

                  if (start > 1) {
                    pages.push(1);
                    if (start > 2) pages.push("...");
                  }

                  for (let i = start; i <= end; i++) {
                    pages.push(i);
                  }

                  if (end < totalPages) {
                    if (end < totalPages - 1) pages.push("...");
                    pages.push(totalPages);
                  }

                  return pages.map((num, idx) =>
                    num === "..." ? (
                      <span key={idx} className="px-2">
                        ...
                      </span>
                    ) : (
                      <button
                        key={num}
                        onClick={() => setCurrentPage(num as number)}
                        className={`px-3 py-1 border rounded ${
                          num === currentPage
                            ? "bg-violet-500 text-white border-violet-500"
                            : "bg-white"
                        }`}
                      >
                        {num}
                      </button>
                    )
                  );
                })()}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* 🔹 Expanded Order Modal */}
      {expandedOrder && (
        <div className="bg-[#00000085] fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-xl shadow-2xl w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex gap-2 absolute top-2 right-2 no-print">
              <button
                className="border p-2 border-blue-500"
                onClick={reactToPrintFn}
              >
                Print
              </button>
              <button
                onClick={() => setExpandedOrder(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {(() => {
              // This .find() will now work correctly on the orderData array
              const rawOrder = orderData.find(
                (o: any) => o._id === expandedOrder
              );
              if (!rawOrder) return <p>Order not found.</p>;

              // All logic below is correct for your data structure
              return (
                <div ref={contentRef} className="space-y-6 px-4">
                  {/* Header */}
                  <div className="pb-4 text-center">
                    <h1 className="text-3xl font-bold uppercase mb-2">
                      ORDER MEMO
                    </h1>
                    <p className="text-sm text-gray-600">
                      Order #{rawOrder._id}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(rawOrder.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Order By info from root */}
                  <div className="flex flex-col gap-1 font-medium">
                    <p className="text-sm text-gray-600 capitalize">
                      Order By : {rawOrder.userRole || "Unknown"}
                    </p>
                  { (rawOrder.orderBy?.name ) &&
                      <p className="text-sm text-gray-600">
                      Name : {rawOrder.orderBy?.name || "Unknown"}
                    </p>
                  }
                  { (rawOrder.orderBy?._id) && <p className="text-sm text-gray-600">
                      Id: {rawOrder.orderBy?._id || "Unknown"}
                    </p>}
                  </div>

                  {/* Customer Info + Payment */}
                  <div className="flex flex-col sm:flex-row justify-between gap-6">
                    <div className="border border-gray-300 sm:w-2/3 p-4 rounded">
                      <h3 className="font-bold mb-3 uppercase text-sm border-b pb-2">
                        Customer Information
                      </h3>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {rawOrder.customerInfo.firstName}{" "}
                          {rawOrder.customerInfo.lastName}
                        </p>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          {rawOrder.customerInfo.phone}
                        </p>
                        <p>
                          <span className="font-semibold">Address:</span>{" "}
                          {rawOrder.customerInfo.address}
                        </p>
                      </div>
                    </div>

                    <div className="border border-gray-300 sm:w-1/3 p-4 rounded">
                      <h3 className="font-bold mb-3 uppercase text-sm border-b pb-2">
                        Payment
                      </h3>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-semibold">Method:</span>{" "}
                          {rawOrder.paymentInfo}
                        </p>
                        <p>
                          <span className="font-semibold">Total:</span> ৳
                          {rawOrder.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border border-gray-300 p-4 rounded">
                    <h3 className="font-bold mb-3 uppercase text-sm border-b pb-2">
                      Order Items
                    </h3>
                    <div className="overflow-x-auto">
                      <Table className="min-w-[600px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">Product</TableHead>
                            <TableHead className="font-bold">
                              Tracking
                            </TableHead>
                            <TableHead className="font-bold">Price</TableHead>
                            <TableHead className="font-bold">
                              Quantity
                            </TableHead>
                            <TableHead className="font-bold">Status</TableHead>
                            <TableHead className="font-bold">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rawOrder?.orderInfo.map((item: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell>
                                {item?.productInfo?.description?.name}
                              </TableCell>
                              <TableCell>{rawOrder.trackingNumber}</TableCell>
                              <TableCell className="text-right">
                                {item.selectedPrice}
                              </TableCell>
                              <TableCell className="text-right">
                                {item.quantity}
                              </TableCell>
                              <TableCell className="capitalize">
                                {rawOrder?.status || ""}
                              </TableCell>
                              <TableCell className="text-right">
                                ৳{item.totalAmount.total}
                              </TableCell>
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
    </>
  );
};

export default OrderPage;
