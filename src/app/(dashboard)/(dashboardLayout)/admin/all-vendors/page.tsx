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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  StoreIcon,
  UsersIcon,
  DollarSign,
  PackageIcon,
  MoreVertical,
  Search,
  ChevronDown,
} from "lucide-react";
import { UserStatCard } from "@/components/modules/Dashboard/all-vendors/userStatCard";
import { UserStatCardEvg } from "@/components/modules/Dashboard/all-vendors/userStatCardEvg";
import { useGetAllVendorsQuery } from "@/redux/featured/allVendors/allvendorsApi";

export default function AllVendors() {
  const { data: vendors = [], isLoading } = useGetAllVendorsQuery();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || vendor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === "Active").length;
  const totalRevenue = vendors.reduce((sum, v) => {
    const clean = v.sales?.toString().replace(/[^0-9.-]+/g, "") || "0";
    return sum + parseFloat(clean);
  }, 0);
  const avgProducts =
    vendors.reduce((sum, v) => sum + (v.products || 0), 0) / vendors.length ||
    0;

  return (
    <div className="p-4 py-6 space-y-6 w-full">
      <div className="flex justify-end items-center">
        <Button className="bg-black text-white hover:bg-zinc-900">
          <Eye className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UserStatCard
          title="Total Vendors"
          value={String(totalVendors)}
          subtitle="+12% from last month"
          icon={<StoreIcon className="h-6 w-6 text-pink-600" />}
        />
        <UserStatCard
          title="Active Vendors"
          value={String(activeVendors)}
          subtitle="+5% from last month"
          icon={<UsersIcon className="h-6 w-6 text-green-600" />}
        />
        <UserStatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle="+18% from last month"
          icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        />

        <UserStatCardEvg
          title="Avg Products/Vendor"
          value={avgProducts.toFixed(0)}
          subtitle="-3 from last month"
          icon={<PackageIcon className="h-6 w-6 text-purple-600" />}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11 w-full"
          />
        </div>

        {/* All Categories Dropdown */}
        <div className="col-span-1 sm:col-span-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 w-full text-sm font-normal flex justify-between items-center min-w-0 truncate"
              >
                <span className="truncate">All Categories</span>
                <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Electronics</DropdownMenuItem>
              <DropdownMenuItem>Fashion</DropdownMenuItem>
              <DropdownMenuItem>Home</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* All Status Dropdown */}
        <div className="col-span-1 sm:col-span-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 w-full text-sm font-normal flex justify-between items-center min-w-0 truncate"
              >
                <span className="truncate">
                  {statusFilter === "All" ? "All Status" : statusFilter}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Suspended")}>
                Suspended
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border rounded-lg p-4 w-full bg-white dark:bg-background">
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold text-[#1B1F32]">
            Vendors ({totalVendors})
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#979797]">Vendor</TableHead>
                <TableHead className="text-[#979797]">Contact</TableHead>
                <TableHead className="text-[#979797]">Status</TableHead>
                <TableHead className="text-[#979797]">Joined Date</TableHead>
                <TableHead className="text-[#979797]">Products</TableHead>
                <TableHead className="text-[#979797]">Total Sales</TableHead>
                <TableHead className="text-[#979797] flex justify-end items-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold uppercase">
                        {vendor?.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {vendor?.name || "N/A"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ID: #{vendor?._id}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {vendor?.contactEmail}
                      <br />
                      {vendor?.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vendor?.status === "Active"
                          ? "bg-[#C7FFD6] text-green-700"
                          : "bg-red-700 text-white"
                      }`}
                    >
                      {vendor?.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {vendor?.createdAt
                      ? new Date(vendor.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-foreground">
                    {vendor?.products ?? 0}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-foreground">
                    {vendor?.sales ?? 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
