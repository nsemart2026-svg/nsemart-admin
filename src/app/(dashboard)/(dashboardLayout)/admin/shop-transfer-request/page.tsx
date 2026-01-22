"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  Search,
  ChevronDown,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import StatusTabs from "@/components/modules/Dashboard/shop-transfer-request/StatusTabs";
import StatCard from "@/components/modules/Dashboard/shop-transfer-request/StatCard";

const requests = [
  {
    shop: "Tech World Store",
    category: "Electronics",
    currentOwner: { name: "John Smith", email: "john@techworld.com" },
    newOwner: { name: "Alice Johnson", email: "alice@email.com" },
    requestDate: "2024-01-20",
    status: "Pending",
    value: "$45,000",
    documents: ["Transfer Agreement", "ID Verification"],
  },
  {
    shop: "Tech World Store",
    category: "Electronics",
    currentOwner: { name: "John Smith", email: "john@techworld.com" },
    newOwner: { name: "Alice Johnson", email: "alice@email.com" },
    requestDate: "2024-01-20",
    status: "Pending",
    value: "$45,000",
    documents: ["Transfer Agreement", "ID Verification"],
  },
  {
    shop: "Fashion Central",
    category: "Fashion",
    currentOwner: { name: "Sarah Wilson", email: "sarah@fashioncentral.com" },
    newOwner: { name: "Mike Davis", email: "mike@email.com" },
    requestDate: "2024-01-18",
    status: "Approved",
    value: "$28,000",
    documents: ["Transfer Agreement", "Business Valuation", "Tax Documents"],
  },
  {
    shop: "Fashion Central",
    category: "Fashion",
    currentOwner: { name: "Sarah Wilson", email: "sarah@fashioncentral.com" },
    newOwner: { name: "Mike Davis", email: "mike@email.com" },
    requestDate: "2024-01-18",
    status: "Approved",
    value: "$28,000",
    documents: ["Transfer Agreement", "Business Valuation", "Tax Documents"],
  },
  {
    shop: "Home Essentials",
    category: "Home",
    currentOwner: { name: "David Brown", email: "david@homeessentials.com" },
    newOwner: { name: "Lisa Taylor", email: "lisa@email.com" },
    requestDate: "2024-01-15",
    status: "Rejected",
    value: "$18,500",
    documents: ["Transfer Agreement"],
  },
  {
    shop: "Home Essentials",
    category: "Home",
    currentOwner: { name: "David Brown", email: "david@homeessentials.com" },
    newOwner: { name: "Lisa Taylor", email: "lisa@email.com" },
    requestDate: "2024-01-15",
    status: "Rejected",
    value: "$18,500",
    documents: ["Transfer Agreement"],
  },
  {
    shop: "Sports Pro",
    category: "Sports",
    currentOwner: { name: "Tom Anderson", email: "tom@sportspro.com" },
    newOwner: { name: "Jenny Miller", email: "jenny@email.com" },
    requestDate: "2024-01-22",
    status: "Under Review",
    value: "$35,000",
    documents: ["Transfer Agreement", "ID Verification", "Family Documents"],
  },
  {
    shop: "Sports Pro",
    category: "Sports",
    currentOwner: { name: "Tom Anderson", email: "tom@sportspro.com" },
    newOwner: { name: "Jenny Miller", email: "jenny@email.com" },
    requestDate: "2024-01-22",
    status: "Under Review",
    value: "$35,000",
    documents: ["Transfer Agreement", "ID Verification", "Family Documents"],
  },
];

// 🆕 Extract unique categories
const categoryOptions = [
  "All Categories",
  ...Array.from(new Set(requests.map((r) => r.category))),
];

export default function ShopTransferRequest() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [activeTab, setActiveTab] = useState("All");

  const filteredRequests = requests.filter((r) => {
    const matchSearch =
      r.shop.toLowerCase().includes(search.toLowerCase()) ||
      r.currentOwner.name.toLowerCase().includes(search.toLowerCase()) ||
      r.newOwner.name.toLowerCase().includes(search.toLowerCase());

    const matchTab = activeTab === "All" || r.status === activeTab;
    const matchStatus = status === "All Status" || r.status === status;
    const matchCategory =
      category === "All Categories" || r.category === category;

    return matchSearch && matchTab && matchStatus && matchCategory;
  });

  const statusTabs = [
    { label: "All", count: requests.length },
    {
      label: "Pending",
      count: requests.filter((r) => r.status === "Pending").length,
    },
    {
      label: "Under Review",
      count: requests.filter((r) => r.status === "Under Review").length,
    },
    {
      label: "Approved",
      count: requests.filter((r) => r.status === "Approved").length,
    },
    {
      label: "Rejected",
      count: requests.filter((r) => r.status === "Rejected").length,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={requests.length.toString()}
          icon={<AlertTriangle className="text-gray-500 w-5 h-5" />}
          subtitle="All time requests"
        />
        <StatCard
          title="Pending"
          value={requests
            .filter((r) => r.status === "Pending")
            .length.toString()}
          icon={<Clock className="text-yellow-600 w-5 h-5" />}
          subtitle="Awaiting action"
        />
        <StatCard
          title="Under Review"
          value={requests
            .filter((r) => r.status === "Under Review")
            .length.toString()}
          icon={<AlertTriangle className="text-blue-500 w-5 h-5" />}
          subtitle="Being processed"
        />
        <StatCard
          title="Approved"
          value={requests
            .filter((r) => r.status === "Approved")
            .length.toString()}
          icon={<CheckCircle2 className="text-green-600 w-5 h-5" />}
          subtitle="Successfully transferred"
        />
      </div>

      {/* Table Section */}
      <div className="space-y-4 border rounded-lg p-4 bg-white">
        <div>
          <h2 className="text-lg font-semibold">Transfer Requests</h2>
          <p className="text-sm text-muted-foreground">
            Review shop ownership transfer requests and take appropriate action
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="relative w-full sm:w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="pl-9 h-10 w-full"
            />
          </div>

          {/* 🆕 Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-between w-full sm:w-auto"
              >
                {category}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categoryOptions.map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => setCategory(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-between w-full sm:w-auto"
              >
                {status}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[
                "All Status",
                "Pending",
                "Approved",
                "Rejected",
                "Under Review",
              ].map((s) => (
                <DropdownMenuItem key={s} onClick={() => setStatus(s)}>
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tabs */}
        <div className=" w-full">
          <StatusTabs
            items={statusTabs}
            defaultActive="All"
            onChange={setActiveTab}
          />
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-md border border-gray-200">
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow className="border-2 border-[#CFCFCF]">
                <TableHead>Shop Name</TableHead>
                <TableHead>Current Owner</TableHead>
                <TableHead>New Owner</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Shop Value</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((r, i) => (
                <TableRow key={i} className="border-none">
                  <TableCell>{r.shop}</TableCell>
                  <TableCell>
                    {r.currentOwner.name}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {r.currentOwner.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    {r.newOwner.name}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {r.newOwner.email}
                    </span>
                  </TableCell>
                  <TableCell>{r.requestDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                        r.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : r.status === "Rejected"
                          ? "bg-red-500 text-white"
                          : r.status === "Pending"
                          ? "bg-[#F3F3F6] text-[#1B1F32]"
                          : "bg-[#F3F3F6] text-[#1B1F32]"
                      }`}
                    >
                      {r.status === "Approved" && <CheckCircle2 size={14} />}
                      {r.status === "Rejected" && <XCircle size={14} />}
                      {r.status === "Pending" && <Clock size={14} />}
                      {r.status === "Under Review" && <AlertCircle size={14} />}
                      {r.status}
                    </span>
                  </TableCell>
                  <TableCell>{r.value}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <ul className="list-disc list-inside space-y-1">
                      {r.documents.map((doc, idx) => (
                        <li key={idx} className="text-xs">
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-100 text-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-500 text-white"
                      >
                        Reject
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}