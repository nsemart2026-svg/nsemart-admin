
// Define the type locally since it's not exported
type WithdrawalsItem = {
  amount: string;
  name: string;
  account: string;
  date: string;
  fees: string;
  netAmount: number;
  status: string;
};
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, CreditCard, ChartSpline } from "lucide-react";
export const statsData = [
  {
    title: "Total Withdrawals",
    value: "$248,650",
    description: "+12% from last month",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
  {
    title: "Pending Withdrawals",
    value: "$12,450",
    description: "8 requests pending",
    icon: <Clock />,
    iconColor: "#F97316",
  },
  {
    title: "Processing Fees",
    value: "$846",
    description: "this month",
    icon: <CreditCard />,
    iconColor: "#000000",
  },
  {
    title: "Success Rate",
    value: "96.8%",
    description: "+2.1% this month",
    icon: <ChartSpline />,
    iconColor: "#22C55E",
  },
];
export const categoryData = [
  {
    label: "Bank Transfer",
    rate: "156",
    productCount: "Fee: 0.2%",
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "paypal",
    rate: "89",
    productCount: "Fee: 0.5%",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "stipe",
    rate: "67",
    productCount: "Fee: 0.3%",
    color: "bg-purple-100 text-purple-700",
  },
  {
    label: "Wise",
    rate: "34",
    productCount: "Fee: 0.4%",
    color: "bg-green-100 text-green-700",
  },
];

export const withdrawalsData: WithdrawalsItem[] = [
  {
    amount: "$2500",
    name: "bank transfer",
    account: "***1234520",
    date: "2024-2-15",
    fees: "$5.00",
    netAmount: 16234,
    status: "Completed",
  },
  {
    amount: "$1200",
    name: "paypal",
    account: "***123455",
    date: "2024-2-15",
    fees: "$5.00",
    netAmount: 869,
    status: "Processing",
  },
  {
    amount: "$850",
    name: "stripe",
    account: "***123458.5",
    date: "2024-2-15",
    fees: "$5.00",
    netAmount: 5667,
    status: "Pending",
  },
  {
    amount: "$3200",
    name: "bank transfer",
    account: "***1234519",
    date: "2024-2-15",
    fees: "$5.00",
    netAmount: 3645,
    status: "Completed",
  },
  {
    amount: "$680",
    name: "paypal",
    account: "***123450",
    date: "2024-2-15",
    fees: "$5.00",
    netAmount: 263,
    status: "Failed",
  },
];
export const withdrawalsColumns = [
  { header: "Amount", accessor: "amount" },
  { header: "Method", accessor: "name" },
  { header: "Account", accessor: "account" },
  { header: "Date", accessor: "date" },

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

  { header: "Fees", accessor: "fees" },
  { header: "Net Amount", accessor: "netAmount" },
  {
    header: "Actions",
    accessor: "actions",
    render: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="outline">
          Process
        </Button>
      </div>
    ),
  },
];
