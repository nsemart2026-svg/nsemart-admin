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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  UserIcon,
  UsersIcon,
  CalendarDaysIcon,
} from "lucide-react";
import { UserStatCard } from "@/components/shared/userStatCard";
import { UserFilterBar } from "@/components/shared/UserFilterBar";

import { format } from "date-fns";
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/featured/user/userApi";

const AllUsersPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: users = [], isLoading, refetch } = useGetAllUsersQuery();
  const [updateUserStatus, { isLoading: updating }] = useUpdateUserMutation();

  if (isLoading) return <p>Loading...</p>;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (user.email?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const newThisMonth = users.length;

  // ✅ Function to handle activation
  const handleActivateUser = async (id: string, email: string) => {
    try {
      await updateUserStatus({
        id, // 👈 user id
        data: { email, status: "active" }, // 👈 wrapped in data
      }).unwrap();

      toast.success(`User ${email} activated successfully!`);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to activate user");
    }
  };

  return (
    <div className="p-4 py-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <UserStatCard
          title="All Users"
          value={String(totalUsers)}
          subtitle="+2 from last week"
          icon={<UserIcon className="h-6 w-6 text-pink-600" />}
        />
        <UserStatCard
          title="Active Users"
          value={String(activeUsers)}
          subtitle={`${Math.round(
            (activeUsers / totalUsers) * 100 || 0
          )}% active rate`}
          icon={<UsersIcon className="h-6 w-6 text-green-600" />}
        />
        <UserStatCard
          title="New This Month"
          value={String(newThisMonth)}
          subtitle="+50% from last month"
          icon={<CalendarDaysIcon className="h-6 w-6 text-pink-600" />}
        />
      </div>

      {/* Filter Bar */}
      <UserFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* User Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border border-[#CFCFCF] ">
              <TableHead className="text-center">User</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Join Date</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead className="text-center">Wallet Point</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index} className="border-none">
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-muted-foreground font-medium">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-center">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.role}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4 text-center">{user.email}</TableCell>

                <TableCell className="py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>

                <TableCell className="py-4 text-center">
                  {user.createdAt
                    ? format(new Date(user.createdAt), "MMM dd, yyyy")
                    : "—"}
                </TableCell>

                <TableCell className="py-4 text-center">
                  {user.orders ?? 0}
                </TableCell>

                <TableCell className="py-4 text-center">
                  {user.walletPoint ?? 0}
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
                      {user.status !== "active" && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleActivateUser(user._id, user.email)
                          }
                          disabled={updating}
                          className="text-green-600"
                        >
                          Activate User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
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

export default AllUsersPage;
