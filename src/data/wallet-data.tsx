import { StatCardItem } from "@/components/shared/StatsCards";
import { DollarSign, Wallet, CreditCard } from "lucide-react";
export const statsData: StatCardItem[] = [
  {
    title: "Total Balance",
    value: "$92,271.5",
    description: "Across active wallets",
    icon: <DollarSign />,
    iconColor: "#1EB564",
  },
  {
    title: "Active Wallets",
    value: "5",
    description: "Currently accessible",
    icon: <Wallet />,
    iconColor: "#F97316",
  },
  {
    title: "Bank Accounts",
    value: "2",
    description: "Traditional banking",
    icon: <CreditCard />,
    iconColor: "#979797",
  },
  {
    title: "Digital Wallets",
    value: "2",
    description: "Online payment systems",
    icon: <Wallet />,
    iconColor: "#F97316",
  },
];

export const walletsData = [
  {
    name: "Primary Business Account",
    type: "Bank Account",
    balance: "$45,680.5",
    lastTransaction: "2024-01-15",
    status: "Active",
    icon: <CreditCard size={16} />,
  },
  {
    name: "PayPal Business",
    type: "Digital Wallet",
    balance: "$12,340.25",
    lastTransaction: "2024-01-14",
    status: "Active",
    icon: <Wallet size={16} />,
  },
  {
    name: "Stripe Account",
    type: "Payment Processor",
    balance: "$8,750.75",
    lastTransaction: "2024-01-13",
    status: "Active",
    icon: <DollarSign size={16} />,
  },
  {
    name: "Petty Cash",
    type: "Cash",
    balance: "$500",
    lastTransaction: "2024-01-12",
    status: "Active",
    icon: <Wallet size={16} />,
  },
  {
    name: "Savings Account",
    type: "Bank Account",
    balance: "$25,000",
    lastTransaction: "2024-01-10",
    status: "Active",
    icon: <CreditCard size={16} />,
  },
  {
    name: "Crypto Wallet",
    type: "Cryptocurrency",
    balance: "$3,250.8",
    lastTransaction: "2024-01-05",
    status: "Inactive",
    icon: <DollarSign size={16} />,
  },
];
