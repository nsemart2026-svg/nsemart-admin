import React from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { LuClock4 } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";

type Transaction = {
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: string;
  usage: string[];
  status: "active" | "expired";
  date: string;
};

const transactions: Transaction[] = [
  {
    code: "WELCOME20",
    description: "Welcome discount for new customers",
    type: "percentage",
    value: "20%",
    usage: ["245 / 1000", "25% used"],
    status: "active",
    date: "2024-12-31",
  },
  {
    code: "WELCOME20",
    description: "Welcome discount for new customers",
    type: "percentage",
    value: "20%",
    usage: ["245 / 1000", "25% used"],
    status: "active",
    date: "2024-12-31",
  },
  {
    code: "WELCOME20",
    description: "Welcome discount for new customers",
    type: "percentage",
    value: "20%",
    usage: ["245 / 1000", "25% used"],
    status: "active",
    date: "2024-12-31",
  },
];

// const formatAmount = (amount: number) => {
//     const color = amount >= 0 ? 'text-green-600' : 'text-red-600';
//     return <span className={color}>${Math.abs(amount).toFixed(2)}</span>;
// };

const StatusBadge = ({ status }: { status: string }) => {
  const base = "px-2 py-1 rounded-full text-xs font-medium";
  if (status === "active")
    return (
      <span className={`${base} bg-green-100 text-green-600`}>active</span>
    );
  if (status === "expired")
    return <span className={`${base} bg-red-100 text-red-600`}>expired</span>;
  return <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>;
};

const paymentTransactions = () => {
  return (
    <div className="py-6">
      <div>
        <div className="flex w-full justify-end ">
         <Link href="/admin/coupons/add-new-coupons">
           <button className="p-2 text-white rounded-lg bg-black flex items-center mt-2 mb-5 gap-2">
             <IoAdd />
             Add New Coupon{" "}
           </button>
         </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 flex flex-col justify-between rounded-lg border-2 space-y-3">
            <div className="flex justify-between items-center">
              <h2>Total Coupons</h2>
              <HiArrowTrendingUp className="text-green-400 text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-2xl">3</h2>
              <p className="text-gray-400 text-sm">All promotional code</p>
            </div>
          </div>
          <div className="bg-white p-6 flex flex-col justify-between rounded-lg border-2 space-y-3">
            <div className="flex justify-between items-center">
              <h2>Active Coupons</h2>
              <HiArrowTrendingDown className="text-red-400 text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-2xl">2</h2>
              <p className="text-gray-400 text-sm">Currently available</p>
            </div>
          </div>
          <div className="bg-white p-6 flex flex-col justify-between rounded-lg border-2 space-y-3">
            <div className="flex justify-between items-center">
              <h2>Total Usage</h2>
              <LuClock4 className="text-yellow-400 text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-2xl">534</h2>
              <p className="text-gray-400 text-sm">Time used</p>
            </div>
          </div>
          <div className="bg-white p-6 flex flex-col justify-between rounded-lg border-2 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Expired</h2>
              <LuDollarSign className="text-green-400 text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-2xl">1</h2>
              <p className="text-gray-400 text-sm">No longer valid</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-8 p-5 border-2 rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">Coupon Management</h1>
        <p className="text-gray-400 mb-6 text-sm">
          Manage your promotional codes and discount coupons.
        </p>
        <input
          type="text"
          placeholder="Search coupons..."
          className="px-4 py-2 border rounded w-full my-5"
        />
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Coupon Code</TableHead>
                <TableHead className="text-gray-400">Description</TableHead>
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Value</TableHead>
                <TableHead className="text-gray-400">Usage</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Valid Until</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.code} className="border-t">
                  <TableCell className="p-3">{txn.code}</TableCell>
                  <TableCell className="p-3">{txn.description}</TableCell>
                  <TableCell className="p-3 ">
                    <p className="border rounded-full w-fit">{txn.type}</p>
                  </TableCell>
                  <TableCell className="p-3">{txn.value}</TableCell>
                  <TableCell className="p-3">
                    <p>{txn.usage[0]}</p>
                    <p className="text-gray-400">{txn.usage[1]}</p>
                  </TableCell>
                  <TableCell className="p-3">
                    <StatusBadge status={txn.status} />
                  </TableCell>
                  <TableCell className="p-3">{txn.date}</TableCell>
                  <TableCell className="p-3">
                    <Link href="/coupons/add-new-coupons">
                      <FaRegEdit size={16} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default paymentTransactions;
