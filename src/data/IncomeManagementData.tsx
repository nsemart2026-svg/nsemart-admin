import { StatCardItem } from "@/components/shared/StatsCards";
import { IncomeManagementItem } from "@/components/tables/IncomeManagementTable";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
export const statsData: StatCardItem[] = [
  {
    title: "Total Income",
    value: "$45,050",
    description: "+12.5% from last month",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
  {
    title: "Pending Income",
    value: "$8,900",
    description: "Awaiting confirmation",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
  {
    title: "Income Sources",
    value: "6",
    description: "Active income streams",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
];

export const IncomeManagementData: IncomeManagementItem[] = [
  {
    source: "Product Sales",
    category: "Sales",
    amount: "$2,500",
    date: "2024-01-15",
    status: "Received",
  },
  {
    source: "Service Revenue",
    category: "Services",
    amount: "$4,500",
    date: "2024-01-15",
    status: "Pending",
  },
  {
    source: "Subscription Fees",
    category: "Recurring",
    amount: "$5,500 Tax",
    date: "2024-01-15",
    status: "Received",
  },
  {
    source: "Affiliate Commission",
    category: "Commission",
    amount: "$2,900",
    date: "2024-01-15",
    status: "Received",
  },
  {
    source: "Digital Downloads",
    category: "Digital",
    amount: "$9,00",
    date: "2024-01-15",
    status: "Received",
  },
  {
    source: "Consultation Fees",
    category: "Services",
    amount: "$1,900",
    date: "2024-01-15",
    status: "Received",
  },
];
export const incomeManagementColumns = [
  { header: "Source", accessor: "source" },

  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "amount",
    accessor: "amount",
    render: (value: string) => <div className="text-[#16A34A]">{value}</div>,
  },
  { header: "date", accessor: "date" },
  {
    header: "Status",
    accessor: "status",
    render: (value: string) => (
      <Badge
        variant="outline"
        className={
          value === "Received"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-yellow-700 border border-yellow-300"
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
      <Button size="sm" variant="outline">
        Edit
      </Button>
    ),
  },
];
