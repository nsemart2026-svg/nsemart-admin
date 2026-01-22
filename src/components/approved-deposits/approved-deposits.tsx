"use client";

import { useState, useMemo, useEffect } from "react"; // useEffect import করুন
import { Search, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { IWithdrawal } from "@/types/withdrawals";
import { useGetMyWithdrawalsQuery } from "@/redux/featured/withdrawals/withdrawalsApi";

const WithdrawalStatusPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?._id;

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1); // ✅ পেজিনেশনের জন্য নতুন state

  const itemsPerPage = 12; // ✅ প্রতি পৃষ্ঠায় আইটেমের সংখ্যা

  const { data, isLoading, error } = useGetMyWithdrawalsQuery(userId!, {
    skip: !userId,
  });

  const withdrawals: IWithdrawal[] = data?.data || [];

  // ✅ "paid" স্ট্যাটাসটি সরানো হয়েছে
  const statuses = [
    "All",
    "pending",
    "approved",
    "on-hold",
    "processing",
    "rejected",
  ];

  const filteredWithdrawals = useMemo(() => {
    // ... আগের ফিল্টারিং কোড এখানে অপরিবর্তিত থাকবে ...
    return withdrawals
      .filter((item) =>
        item._id?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) =>
        statusFilter === "All" ? true : item.status === statusFilter
      )
      .filter((item) => {
        if (!dateRange?.from || !item.createdAt) return true;
        const itemDate = new Date(item.createdAt);
        const fromDate = new Date(dateRange.from);
        const toDate = dateRange.to
          ? new Date(dateRange.to)
          : new Date(dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        return itemDate >= fromDate && itemDate <= toDate;
      });
  }, [withdrawals, searchTerm, statusFilter, dateRange]);

  // ✅ ফিল্টার পরিবর্তন হলে প্রথম পৃষ্ঠায় ফেরত আসার জন্য
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateRange]);

  // ✅ পেজিনেশন ক্যালকুলেশন
  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedWithdrawals = filteredWithdrawals.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // ✅ "paid" স্ট্যাটাসের case সরানো হয়েছে
  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "on-hold":
        return <Badge className="bg-orange-100 text-orange-800">On Hold</Badge>;
      case "processing":
        return (
          <Badge className="bg-indigo-100 text-indigo-800">Processing</Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (isLoading) return <div>লোড হচ্ছে...</div>;
  if (error) return <div>ডাটা আনতে সমস্যা হয়েছে!</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header and Controls ... অপরিবর্তিত */}
      <div>
        <h1 className="text-2xl font-semibold"></h1>
        <p className="text-sm text-gray-600 mt-1">
          View all your withdrawal records
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <Input
              placeholder="Search transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yy")} -{" "}
                      {format(dateRange.to, "dd/MM/yy")}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status)}
              className="capitalize text-xs h-8"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Premium Professional Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 hover:from-gray-50 hover:to-gray-100">
                <TableHead className="text-gray-700 font-bold text-xs uppercase tracking-wider py-4 px-6">
                  Transaction ID
                </TableHead>
                <TableHead className="text-gray-700 font-bold text-xs uppercase tracking-wider py-4 px-6 text-right">
                  Amount
                </TableHead>
                <TableHead className="text-gray-700 font-bold text-xs uppercase tracking-wider py-4 px-6">
                  Payment Method
                </TableHead>
                <TableHead className="text-gray-700 font-bold text-xs uppercase tracking-wider py-4 px-6">
                  Date
                </TableHead>
                <TableHead className="text-gray-700 font-bold text-xs uppercase tracking-wider py-4 px-6 text-center">
                  Status
                </TableHead>
                <TableHead className="text-gray-700 font-bold text-xs uppercase tracking-wider py-4 px-6">
                  Description
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100">
              {paginatedWithdrawals.length > 0 ? (
                paginatedWithdrawals.map((withdrawal) => (
                  <TableRow
                    key={withdrawal._id}
                    className="hover:bg-blue-50/30 transition-all duration-200 group"
                  >
                    <TableCell className="py-5 px-6">
                      <span className="text-gray-900 font-mono text-sm font-medium">
                        {withdrawal._id}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <span className="text-gray-900 font-bold text-base tracking-tight">
                        ৳{withdrawal.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700 capitalize font-medium text-sm">
                          {withdrawal.paymentMethod}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <span className="text-gray-600 text-sm font-medium">
                        {withdrawal.createdAt
                          ? format(
                              new Date(withdrawal.createdAt),
                              "dd MMM, yyyy"
                            )
                          : "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 px-6 text-center">
                      {getStatusBadge(withdrawal.status)}
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <span className="text-gray-600 text-sm line-clamp-2">
                        {withdrawal.description || "—"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-base">
                          No withdrawals found
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Your transaction history will appear here
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ✅ পেজিনেশন কন্ট্রোল */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default WithdrawalStatusPage;
