"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Filter,
  DollarSign,
  Clock,
  Layers,
 
} from "lucide-react";
import StatCard from "@/components/modules/Dashboard/income-management/StatCard";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Mock income data
const mockIncomeData = [
  { source: "Product Sales", category: "Sales", amount: 24500, date: "2024-01-15", status: "Received" },
  { source: "Service Revenue", category: "Services", amount: 8900, date: "2024-01-14", status: "Pending" },
  { source: "Subscription Fees", category: "Recurring", amount: 3200, date: "2024-01-13", status: "Received" },
  { source: "Affiliate Commission", category: "Commission", amount: 1850, date: "2024-01-12", status: "Received" },
  { source: "Digital Downloads", category: "Digital", amount: 2100, date: "2024-01-11", status: "Received" },
  { source: "Consultation Fees", category: "Services", amount: 4500, date: "2024-01-10", status: "Received" },
];

export default function IncomeManagementPage() {
  const [incomeRecords, setIncomeRecords] = useState<typeof mockIncomeData>([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<{
    start: Date;
    end: Date;
  }>({
    start: new Date(2024, 0, 10), // Jan 10
    end: new Date(2024, 6, 15),   // July 15
  });

  useEffect(() => {
    setTimeout(() => {
      setIncomeRecords(mockIncomeData);
    }, 200);
  }, []);

  const filteredRecords = incomeRecords.filter((record) =>
    record.source.toLowerCase().includes(search.toLowerCase())
  );

  const totalIncome = incomeRecords.reduce((sum, r) => sum + r.amount, 0);
  const pendingIncome = incomeRecords
    .filter((r) => r.status === "Pending")
    .reduce((sum, r) => sum + r.amount, 0);
  const incomeSources = incomeRecords.length;

  return (
    <div className="space-y-6 py-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap">
            Income Management
          </h1>
          <p className="text-[#979797]">Track and manage all income sources</p>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800 h-9 text-sm rounded-md px-4">
          <Plus className="w-4 h-4 mr-2" />
          Add New Income
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={<DollarSign className="text-green-500 w-5 h-5" />}
          subtitle="+12.5% from last month"
        />
        <StatCard
          title="Pending Income"
          value={`$${pendingIncome.toLocaleString()}`}
          icon={<Clock className="text-yellow-500 w-5 h-5" />}
          subtitle="Awaiting confirmation"
        />
        <StatCard
          title="Income Sources"
          value={String(incomeSources)}
          icon={<Layers className="text-blue-500 w-5 h-5" />}
          subtitle="Active income streams"
        />
      </div>

      {/* Income Records Table */}
      <Card className="p-6 rounded-xl">
        <div className="mb-2">
          <h2 className="text-2xl font-bold">Income Records</h2>
          <p className="text-sm text-muted-foreground mb-4">
            View and manage all your income entries
          </p>

         <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
  {/* Search Input */}
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
    <Input
      placeholder="Search income..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="pl-9 w-full"
    />
  </div>

  {/* Filter Button */}
  <Button
    variant="outline"
    className="shrink-0 h-9 flex items-center gap-2 border border-gray-300 w-full sm:w-auto"
  >
    <Filter className="w-4 h-4" />
    <span className="text-sm">Filter</span>
  </Button>

  {/* Date Range Picker */}
  <Popover>
    <PopoverTrigger asChild>
      <div
        className="bg-[#0F172A] text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap cursor-pointer w-full sm:w-auto"
      >
        {format(dateRange.start, "dd/MM/yyyy")} - {format(dateRange.end, "dd/MM/yyyy")}
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="range"
        selected={{ from: dateRange.start, to: dateRange.end }}
        onSelect={(range) => {
          if (range?.from && range?.to) {
            setDateRange({ start: range.from, end: range.to });
          }
        }}
        numberOfMonths={2}
      />
    </PopoverContent>
  </Popover>
</div>

        </div>

        <div className="overflow-hidden border-b rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="py-4 font-medium">{record.source}</TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full border font-medium text-black">
                      {record.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4 text-green-600 font-medium">
                    ${record.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        record.status === "Received"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    Edit
                  </TableCell>
                </TableRow>
              ))}
              {filteredRecords.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No income records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Net Income Row */}
        <div className="mt-4 flex w-1/2 justify-between font-bold">
          <span >Net Income</span>
          <span>${totalIncome.toLocaleString()}</span>
        </div>
      </Card>
    </div>
  );
}
