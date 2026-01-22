"use client";

import * as React from "react";
import { useGetOrderSummaryQuery } from "@/redux/featured/order/orderApi";
import OrderCard from "@/components/shared/OrderCard";

// import LastVendorPayoutTable from "@/components/modules/Dashboard/dashbord/LastVendorPayoutTable";
// import Maps from "@/components/modules/Dashboard/dashbord/Maps";
// import RecentOrdersTable from "@/components/modules/Dashboard/dashbord/RecentOrdersTable";
// import SalesCostCard from "@/components/modules/Dashboard/dashbord/SalesCostCard";
// import SalesHistoryChart from "@/components/modules/Dashboard/dashbord/SalesHistoryChart";
// import SessionCard from "@/components/modules/Dashboard/dashbord/SessionCard";
// import TodayOrderChart from "@/components/modules/Dashboard/dashbord/TodayOrderChart";
// import TopSellingCategory from "@/components/modules/Dashboard/dashbord/TopSellingCategory";
// import TopSellingProducts from "@/components/modules/Dashboard/dashbord/TopSellingProductsTable";
// import TrendingProducts from "@/components/modules/Dashboard/dashbord/TrendingProducts";
// import VendorCard from "@/components/modules/Dashboard/dashbord/VendorCard";
// import OrderCard, { OrderCardProps } from "@/components/shared/OrderCard";
// import ShopCard from "@/components/shared/ShopCard";
// import { Button } from "@/components/ui/button";
// import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";

// const ordersData = [
//   { value: 18000 },
//   { value: 20000 },
//   { value: 19000 },
//   { value: 22000 },
//   { value: 21000 },
//   { value: 23000 },
//   { value: 25700 },
// ];

// const activeOrdersData = [
//   { value: 12000 },
//   { value: 13000 },
//   { value: 12500 },
//   { value: 14000 },
//   { value: 14500 },
//   { value: 15000 },
//   { value: 15500 },
// ];

// // Define CardConfig type
// type CardConfig = { type: "order"; props: OrderCardProps } | { type: "vendor" };

const AdminDashboard = () => {
  const { data, isLoading, error } = useGetOrderSummaryQuery();
  if (isLoading) return <div>লোড হচ্ছে...</div>;
  if (error) return <div>ডাটা আনতে সমস্যা হয়েছে!</div>;

  const summary = data;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      {/* <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Explore now</h1>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full border border-gray-300 px-3 py-2 text-xs sm:text-sm font-medium
                flex items-center gap-2 whitespace-nowrap
                hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                transition duration-200 ease-in-out"
              aria-label="Select date range"
            >
              <CalendarIcon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 select-none hidden sm:inline">
                {date ? format(date, "PPP") : "Last 28 Days"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" side="bottom" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div> */}

      {/* Row 1: Sales and Sessions */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SalesCostCard />
        </div>
        <SessionCard />
      </div> */}

      {/* Row 2: Orders and Vendors (Dynamic Loop) */}
      <OrderCard summary={summary} />

      {/* Row 3: Shops */}
      {/* <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <Link href={"/all-shop"}>
          <ShopCard title="Total Shops" subtitle="Last 7 days" count={278} />
        </Link>
        <Link href={"/all-shop"}>
          <ShopCard title="Pending Order" subtitle="Last 7 days" count={549} />
        </Link>
        <Link href={"/all-shop"}>
          <ShopCard
            title="Processing Order"
            subtitle="Last 7 days"
            count={548}
          />
        </Link>
        <Link href={"/all-shop"}>
          <ShopCard
            title="Completed Order"
            subtitle="Last 7 days"
            count={2500}
          />
        </Link>
        <Link href={"/all-shop"}>
          <ShopCard
            title="Cancelled Order"
            subtitle="Last 7 days"
            count={490}
          />
        </Link>
      </div> */}

      {/* Row 4: Top selling products & trending */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TopSellingProducts />
        </div>
        <TrendingProducts />
      </div> */}

      {/* Row 5: Today's orders & recent orders */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <TodayOrderChart />
        </div>
        <div className="lg:col-span-2">
          <RecentOrdersTable />
        </div>
      </div> */}

      {/* Row 6: Last vendor payout & top category */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LastVendorPayoutTable />
        </div>
        <TopSellingCategory />
      </div> */}

      {/* Row 7: Map & sales history */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <Maps />
        </div>
        <div className="lg:col-span-2">
          <SalesHistoryChart />
        </div>
      </div> */}
    </div>
  );
};

export default AdminDashboard;