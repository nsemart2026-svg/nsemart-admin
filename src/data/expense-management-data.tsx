import { StatCardItem } from "@/components/shared/StatsCards";
import { ExpenseManagementItem } from "@/components/tables/ExpenseManagementTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
export const statsData: StatCardItem[] = [
  {
    title: "Total Expense",
    value: "$5,050",
    description: "+12.5% from last month",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
  {
    title: "Pending Expense",
    value: "$1,900",
    description: "Awaiting confirmation",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
  {
    title: "Expense Categories",
    value: "6",
    description: "Active income streams",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
];

export const ExpenseManagementData: ExpenseManagementItem[] = [
  {
    description: "Office Rent",
    category: "Rent",
    amount: "$2,500",
    date: "2024-01-15",
    status: "Received",
  },
  {
    description: "Marketing Campaign",
    category: "Marketing",
    amount: "$4,500",
    date: "2024-01-15",
    status: "Pending",
  },
  {
    description: "Software Subscriptions",
    category: "Software",
    amount: "$5,500 Tax",
    date: "2024-01-15",
    status: "Received",
  },
  {
    description: "Office Supplies",
    category: "Supplies",
    amount: "$2,900",
    date: "2024-01-15",
    status: "Received",
  },
  {
    description: "Equipment Purchase",
    category: "Travel",
    amount: "$9,00",
    date: "2024-01-15",
    status: "Received",
  },
  {
    description: "Travel Expenses",
    category: "Travel",
    amount: "$1,900",
    date: "2024-01-15",
    status: "Received",
  },
];
export const ExpenseManagementColumns = [
  { header: "description", accessor: "description" },

  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "amount",
    accessor: "amount",
    render: (value: string) => <div className="text-[#DC2626]">{value}</div>,
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
