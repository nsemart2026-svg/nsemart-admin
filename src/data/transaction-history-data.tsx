/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatCardItem } from "@/components/shared/StatsCards";
import { TransactionsItem } from "@/components/tables/TransactionHistoryTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  ArrowUpRight,
  CreditCard,
  ArrowDownLeft,
} from "lucide-react";
export const statsData: StatCardItem[] = [
  {
    title: "Total Volume",
    value: "$124,500",
    description: "This month",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
  {
    title: "Successful Payments",
    value: "1,234",
    description: "+8% from last month",
    icon: <ArrowUpRight />,
    iconColor: "#22C55E",
  },
  {
    title: "Pending Transactions",
    value: "24",
    description: "Awaiting processing",
    icon: <CreditCard />,
    iconColor: "#F97316",
  },
  {
    title: "Failed Transactions",
    value: "18",
    description: "2.3% failure rate",
    icon: <ArrowDownLeft />,
    iconColor: "#EF4444",
  },
];

export const transactionsData: TransactionsItem[] = [
  {
    transactionId: "TXN001",
    type: "Payment",
    amount: "$2500",
    name: "Bank Transfer",
    customer: "Alice Johnson",
    date: "2024-02-15",
    orderId: "ORD-1001",
    status: "Completed",
  },
  {
    transactionId: "TXN002",
    type: "Refund",
    amount: "$1200",
    name: "PayPal",
    customer: "Bob Smith",
    date: "2024-02-15",
    orderId: "ORD-1002",
    status: "Processing",
  },
  {
    transactionId: "TXN003",
    type: "Payment",
    amount: "$850",
    name: "Stripe",
    customer: "Carla Martinez",
    date: "2024-02-15",
    orderId: "ORD-1003",
    status: "Pending",
  },
  {
    transactionId: "TXN004",
    type: "Withdrawal",
    amount: "$3200",
    name: "Bank Transfer",
    customer: "David Kim",
    date: "2024-02-15",
    orderId: "ORD-1004",
    status: "Completed",
  },
  {
    transactionId: "TXN005",
    type: "Payment",
    amount: "$54",
    name: "PayPal",
    customer: "Eva Zhang",
    date: "2024-02-15",
    orderId: "ORD-1005",
    status: "Failed",
  },
  {
    transactionId: "TXN006",
    type: "Chargeback",
    amount: "$33",
    name: "PayPal",
    customer: "Frank Miller",
    date: "2024-02-15",
    orderId: "ORD-1006",
    status: "Disputed",
  },
];

export const transactionsColumns = [
  { header: "Transaction ID", accessor: "transactionId" },
  {
    header: "Type",
    accessor: "type",
    render: (value: string) => {
      let icon = <ArrowUpRight className="text-gray-500" size={16} />;
      let textColor = "";

      switch (value) {
        case "Payment":
          icon = <ArrowUpRight className="text-green-500" size={16} />;
          textColor = "text-green-600";
          break;
        case "Refund":
          icon = <ArrowDownLeft className="text-yellow-500" size={16} />;
          textColor = "text-yellow-600";
          break;
        case "Withdrawal":
          icon = <ArrowDownLeft className="text-blue-500" size={16} />;
          textColor = "text-blue-600";
          break;
        case "Chargeback":
          icon = <ArrowDownLeft className="text-red-500" size={16} />;
          textColor = "text-red-600";
          break;
        default:
          textColor = "text-gray-600";
      }

      return (
        <div className="flex items-center gap-2">
          {icon}
          <span className={`text-sm font-medium ${textColor}`}>{value}</span>
        </div>
      );
    },
  },
  {
    header: "Amount",
    accessor: "amount",
    render: (value: string, row: any) => {
      const type = row.type;
      const isPositive = type === "Payment" || type === "Withdrawal";
      const color = isPositive ? "text-green-600" : "text-red-600";

      return <span className={`font-semibold ${color}`}>{value}</span>;
    },
  },
  { header: "Method", accessor: "name" },
  { header: "Customer", accessor: "customer" },
  { header: "Date", accessor: "date" },
  { header: "Order Id", accessor: "orderId" },

  {
    header: "Status",
    accessor: "status",
    render: (value: string) => {
      let className = "";

      switch (value) {
        case "Completed":
          className = "bg-green-100 text-green-700 border border-green-300";
          break;
        case "Failed":
          className = "bg-red-100 text-red-700 border border-red-300";
          break;
        case "Disputed":
          className = "bg-red-100 text-red-700 border border-red-300";
          break;
        case "Pending":
          className = "bg-yellow-100 text-yellow-700 border border-yellow-300";
          break;
        case "Processing":
          className = "bg-white text-gray-700 border border-gray-300";
          break;
        default:
          className = "bg-gray-100 text-gray-700 border border-gray-300";
      }

      return (
        <Badge variant="outline" className={className}>
          {value}
        </Badge>
      );
    },
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
          Resolve
        </Button>
      </div>
    ),
  },
];
