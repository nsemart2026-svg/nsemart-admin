/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { MoreVertical, UserIcon, UsersIcon } from "lucide-react";

import { UserStatCard } from "@/components/shared/userStatCard";
import { UserFilterBar } from "@/components/shared/UserFilterBar";
import { useGetAllAdminsQuery } from "@/redux/featured/adminprofile/adminprofileApi";

export type Admin = {
  name: string;
  email: string;
  role: "admin" | "customer";
  status: "Active" | "Inactive";
  designation: string;
};

const AdminListPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: admins = [] } = useGetAllAdminsQuery();

  // Filtered data
  const filtered = admins.filter((admin: Admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || admin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(
    (admin: Admin) => admin.status === "Active"
  ).length;

  return (
    <div className="p-4 space-y-6 py-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UserStatCard
          title="Total Admins"
          value={totalAdmins.toString()}
          subtitle="Across all departments"
          icon={<UserIcon className="h-6 w-6 text-pink-600" />}
        />
        <UserStatCard
          title="Active Admins"
          value={totalAdmins.toString()}
          subtitle="Currently online"
          icon={<UsersIcon className="h-6 w-6 text-green-600" />}
        />
      </div>

      {/* Filter Bar */}
      <UserFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Admin Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border border-[#CFCFCF]">
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permission</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((admin: Admin, i: number) => (
              <TableRow key={i} className="border-none">
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground font-medium">
                      {admin.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{admin.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {admin.designation}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">{admin.email}</TableCell>
                <TableCell className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      admin.status === "Active"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {admin.status}
                  </span>
                </TableCell>
                {/* Permission from role */}
                <TableCell className="py-4">
                  {admin.role === "admin" ? (
                    <Badge className="bg-purple-500 text-white">Admin</Badge>
                  ) : (
                    <Badge className="bg-blue-500 text-white">Customer</Badge>
                  )}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
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
  );
};

export default AdminListPage;
