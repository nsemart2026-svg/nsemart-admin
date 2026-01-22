import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleCheckBig, CircleX, Clock } from "lucide-react";

export const PendingDepositsData = [
  {
    transactionId: "TXN001",
    account: "Primary Business Account",
    amount: "$2500",
    date: "2024-02-15",
    description: "Client payment for services",
    status: "Pending",
  },
  {
    transactionId: "TXN002",
    account: "PayPal Business",
    amount: "$2500",
    date: "2024-02-15",
    description: "Online product sales",
    status: "Pending",
  },
  {
    transactionId: "TXN003",
    account: "Stripe Account",
    amount: "$2500",
    date: "2024-02-15",
    description: "Subscription renewal",
    status: "Pending",
  },
  {
    transactionId: "TXN004",
    account: "Stripe Account",
    amount: "$2500",
    date: "2024-02-15",
    description: "Investment return",
    status: "Approved",
  },
];

export const pendingDepositsItemsColumns = [
  { header: "Transaction Id", accessor: "transactionId" },
  { header: "account", accessor: "account" },
  { header: "amount", accessor: "amount" },
  { header: "date", accessor: "date" },
  { header: "description", accessor: "description" },
  {
    header: "Status",
    accessor: "status",
    render: (value: string) => (
      <Badge
        variant="outline"
        className={
          value === "Approved"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-yellow-100 text-yellow-700 border border-yellow-300"
        }
      >
        {value === "Approved" ? (
          <CircleCheckBig className="mr-1 h-4 w-4" />
        ) : (
          <Clock className="mr-1 h-4 w-4" />
        )}
        {value}
      </Badge>
    ),
  },

  {
    header: "Actions",
    accessor: "actions",
    render: () => (
      <div className="flex gap-2 opacity-80 font-normal">
        <Button size="sm" variant="outline">
          <CircleCheckBig /> Approve
        </Button>
        <Button size="sm" variant="destructive">
          <CircleX /> Reject
        </Button>
      </div>
    ),
  },
];
