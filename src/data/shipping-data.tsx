import { StatCardItem } from "@/components/shared/StatsCards";
import { ShippingItem } from "@/components/tables/ShippingManagementTable";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Box, Clock } from "lucide-react";
export const statsData: StatCardItem[] = [
  {
    title: "Shipping Methods",
    value: "12",
    description: "Active Methods",
    icon: <Truck />,
    iconColor: "#000000",
  },
  {
    title: "Carries",
    value: "8",
    description: "Integrated partners",
    icon: <Box />,
    iconColor: "#C710EB",
  },
  {
    title: "Avg Delivery Time",
    value: "2.4",
    description: "Days Average",
    icon: <Clock />,
    iconColor: "#F97316",
  },
  {
    title: "Shipping revenue",
    value: "$12,450",
    description: "this month",
    icon: <Truck />,
    iconColor: "#22C55E",
  },
];
export const categoryData = [
  {
    label: "Royal mail",
    rate: "1234",
    productCount: "UK",
    color: "bg-red-100 text-red-700",
  },
  {
    label: "DPD",
    rate: "567",
    productCount: "UK/EU",
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "DHL",
    rate: "567",
    productCount: "UK/EU",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Hermes",
    rate: "890",
    productCount: "UK",
    color: "bg-green-100 text-green-700",
  },
  {
    label: "UPS",
    rate: "23",
    productCount: "Global",
    color: "bg-pink-100 text-pink-700",
  },
];

export const shippingData: ShippingItem[] = [
  {
    name: "Standard delivery",
    carrier: "20%",
    cost: "20%",
    duration: "VAT",
    region: "UK",
    orders: 1234,
    status: "Active",
  },
  {
    name: "Next day delivery",
    carrier: "5%",
    cost: "5%",
    duration: "VAT",
    region: "UK",
    orders: 89,
    status: "Active",
  },
  {
    name: "express international",
    carrier: "8.5%",
    cost: "8.5%",
    duration: "Sales Tax",
    region: "California",
    orders: 567,
    status: "Active",
  },
  {
    name: "free shipping",
    carrier: "19%",
    cost: "19%",
    duration: "VAT",
    region: "Germany",
    orders: 345,
    status: "Active",
  },
  {
    name: "premium overnight",
    carrier: "0%",
    cost: "0%",
    duration: "Exempt",
    region: "Global",
    orders: 23,
    status: "Inactive",
  },
];
export const shippingColumns = [
  { header: "Method Name", accessor: "name" },
  { header: "Carrier", accessor: "carrier" },
  { header: "Cost", accessor: "cost" },
  { header: "Duration", accessor: "duration" },
  { header: "Region", accessor: "region" },
  { header: "Orders", accessor: "orders" },
  {
    header: "Status",
    accessor: "status",
    render: (value: string) => (
      <Badge
        variant="outline"
        className={
          value === "Active"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-red-700 border border-red-300"
        }
      >
        {value}
      </Badge>
    ),
  },
  {
    header: "Actions",
    accessor: "actions",
    render: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="outline">
          Rates
        </Button>
      </div>
    ),
  },
];
