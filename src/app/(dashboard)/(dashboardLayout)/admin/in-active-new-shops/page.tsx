/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Store,
  AlertCircle,
  Plus,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  useGetAllShopsQuery,
  useGetAllShopStatsQuery,
  usePatchShopStatsMutation,
} from "@/redux/featured/shop/shopApi";
import Link from "next/link";
import { useGetSingleUserQuery } from "@/redux/featured/user/userApi";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

export default function Component() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: shopData = [] } = useGetAllShopsQuery();
  const { data: metricsData } = useGetAllShopStatsQuery();
  const [patchShopStats] = usePatchShopStatsMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?._id



  const handleStatusChange = async (id: string, status: string) => {
    if (!userId) {
      return;
    }
    try {
      await patchShopStats({
        id,
        status,
        updatedBy: userId
      }).unwrap();
    } catch (error) {
    }
  };



  // Normalize status (capitalize first letter)
  const normalizeStatus = (status: string) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Calculate counts dynamically
  const statusCounts = shopData.reduce((acc: any, shop: any) => {
    const status = normalizeStatus(shop.status);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCount = shopData.length;

  const metrics = metricsData?.data
    ? [
      {
        title: "Total Shops",
        value: metricsData.data.totalShops.toString() || "0",
        subtitle: "Receiving attention",
        icon: Store,
        color: "bg-purple-50 text-purple-600",
        iconBg: "bg-purple-100",
      },
      {
        title: "Inactive Shops",
        value: metricsData.data.inactiveShops.toString() || "0",
        subtitle: "Need reactivation",
        icon: AlertCircle,
        color: "bg-red-50 text-red-600",
        iconBg: "bg-red-100",
      },
      {
        title: "New Shops",
        value: metricsData.data.activeShops.toString() || "0",
        subtitle: "Ready to order",
        icon: Plus,
        color: "bg-blue-50 text-blue-600",
        iconBg: "bg-blue-100",
      },
      {
        title: "Pending Shops",
        value: metricsData.data.pendingShops.toString() || "0",
        subtitle: "Awaiting approval",
        icon: Clock,
        color: "bg-yellow-50 text-yellow-600",
        iconBg: "bg-yellow-100",
      },
    ]
    : [];

  // Build filter tabs dynamically
  const filterTabs = [
    { label: "All", count: totalCount },
    { label: "Inactive", count: statusCounts["Inactive"] || 0 },
    { label: "New", count: statusCounts["New"] || 0 },
    { label: "Pending", count: statusCounts["Pending"] || 0 },
  ];

  // Badge renderer
  const getStatusBadge = (status: string) => {
    const normalized = normalizeStatus(status);

    switch (normalized) {
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            {normalized}
          </Badge>
        );
      case "New":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {normalized}
          </Badge>
        );
      case "Inactive":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            {normalized}
          </Badge>
        );
      default:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="secondary">{normalized}</Badge>;
    }
  };

  // Filter and Search Logic
  const filteredShops = shopData.filter((shop: any) => {
    const shopStatus = normalizeStatus(shop.status);
    const matchesTab = activeTab === "All" || shopStatus === activeTab;
    const matchesSearch =
      shop.basicInfo.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.basicInfo.owner?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.notificationEmail?.notificationEmail
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-4 py-6 sm:p-6 bg-gray-50 min-h-screen">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.value}
                    </p>
                    <p className="text-xs text-gray-500">{metric.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.iconBg}`}>
                    <Icon className={`h-6 w-6 ${metric.color.split(" ")[1]}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Shop Management
            </h2>
            <p className="text-sm text-gray-600">
              Review and manage registered newly registered shops
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filterTabs.map((tab) => (
              <Button
                key={tab.label}
                variant={activeTab === tab.label ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.label)}
                className={`${activeTab === tab.label
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {tab.label} ({tab.count})
              </Button>
            ))}
          </div>

          {/* Responsive Table Wrapper */}
          <div className="border rounded-lg bg-white overflow-x-auto shadow-sm">
            <Table className="min-w-[900px] text-sm">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-900">
                    Shop
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Owner
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Category
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Created
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-center">
                    Orders
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-center">
                    Commission
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredShops.map((shop: any, index: number) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition even:bg-gray-50/40"
                  >
                    {/* Shop Name */}
                    <TableCell>
                      <span className="font-medium text-gray-900">
                        {shop.basicInfo.name}
                      </span>
                    </TableCell>

                    {/* Owner */}
                    <TableCell>
                      <p className="font-medium text-gray-900">
                        {shop.basicInfo.name || "Unknown Owner"}
                      </p>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="text-gray-800 font-medium text-xs">
                      {shop.category ?? "No Category"}
                    </TableCell>

                    {/* Status */}
                    <TableCell>{getStatusBadge(shop.status)}</TableCell>

                    {/* Created Date */}
                    <TableCell className="text-gray-600 text-xs">
                      {new Date(shop.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>

                    {/* Orders */}
                    <TableCell className="text-center">
                      {shop.orders?.length > 0
                        ? shop.orders.length
                        : "No orders"}
                    </TableCell>

                    {/* Commission */}
                    <TableCell className="text-center font-medium text-xs text-gray-900">
                      {shop.commissionRate}%
                    </TableCell>

                    {/* Action dropdown */}
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              href={`https://mega-mart-customer.vercel.app/shops/shop/${shop._id}`}
                            >
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/admin/edit-shop/${shop._id}`}>
                              Edit Shop
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Contact Owner</DropdownMenuItem>
                          <DropdownMenuItem
                            className={shop.status === "inActive" ? "text-green-600" : "text-red-600"}
                            onClick={() =>
                              handleStatusChange(
                                shop._id,
                                shop.status === "inActive" ? "active" : "inActive"
                              )
                            }
                          >
                            {shop.status === "inActive" ? "Activate" : "Deactivate"}
                          </DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
