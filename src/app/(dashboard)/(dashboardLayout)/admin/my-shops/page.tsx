/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DollarSign, Store, Users, Package, Search, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useGetAllShopStatsQuery, useGetMyShopQuery, useDeleteShopMutation } from "@/redux/featured/shop/shopApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import toast from "react-hot-toast";

export default function Dashboard() {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?._id;

  const { data: myshopData, refetch } = useGetMyShopQuery(userId!, { skip: !userId });
  const [deleteShop] = useDeleteShopMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");
  const [selectedStatus, setSelectedStatus] = useState("all-status");

  const metrics = myshopData?.summary
    ? [
      {
        title: "Total Revenue",
        value: (myshopData.summary.totalRevenue ?? 0).toString(),
        icon: DollarSign,
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        title: "Active Shops",
        value: (myshopData.summary.totalShops ?? 0).toString(),
        subtitle: "Last 30 days",
        icon: Store,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        title: "Total Customers",
        value: "0",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Total Products",
        value: (myshopData.summary.totalProducts ?? 0).toString(),
        icon: Package,
        color: "text-pink-600",
        bgColor: "bg-pink-50",
      },
    ]
    : [];

  const statusCards = [
    { title: "Pending Shops", status: "Pending online", icon: Store, color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { title: "Suspend Shop", status: "Closed Products", icon: Store, color: "text-red-600", bgColor: "bg-red-50" },
    { title: "New Shop", status: "Closed Products", icon: Store, color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  const shopData = myshopData?.shops?.map((shop: any) => ({
    _id: shop._id,
    name: shop.basicInfo?.name || "N/A",
    category: shop.basicInfo?.slug || "N/A",
    status: shop.status || "pending",
    revenue: `$${shop.currentBalance || 0}`,
    customers: "---",
    products: shop.products?.length || 0,
    growth: "---",
    lastOrder: shop.shopMaintenanceSetting?.endTime
      ? new Date(shop.shopMaintenanceSetting.endTime).toLocaleString()
      : "No orders yet",
    growthPositive: null,
  })) || [];

  const filteredShopData = shopData.filter((shop: any) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all-categories" ||
      shop.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus =
      selectedStatus === "all-status" ||
      shop.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
      case "blocked":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Blocked</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this shop?");
    if (!confirmDelete) return;

    try {
      await deleteShop({ shopId, deletedBy: userId! }).unwrap();
      toast.success("Shop deleted successfully!");
      refetch(); // Refresh the shop list
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete shop");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 lg:py-6">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <Link href={"/admin/create-shop"}>
            <Button className="bg-black text-white hover:bg-gray-800 w-fit">
              <Plus className="mr-2 h-4 w-4" />
              Add New Shop
            </Button>
          </Link>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    {metric.subtitle && <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>}
                  </div>
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statusCards.map((card, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{card.status}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shop Management Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Shop Management</CardTitle>
            <p className="text-sm text-gray-600">Monitor and manage all your shops from one place</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    <SelectItem value="gadget">Gadget</SelectItem>
                    <SelectItem value="cloth">Cloth</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shop Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Growth</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShopData.map((shop: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{shop.name}</TableCell>
                      <TableCell>{shop.category}</TableCell>
                      <TableCell>{getStatusBadge(shop.status)}</TableCell>
                      <TableCell>{shop.revenue}</TableCell>
                      <TableCell>{shop.customers}</TableCell>
                      <TableCell>{shop.products}</TableCell>
                      <TableCell>
                        {shop.growth !== "---" ? (
                          <span className={shop.growthPositive ? "text-green-600" : "text-red-600"}>{shop.growth}</span>
                        ) : (
                          shop.growth
                        )}
                      </TableCell>
                      <TableCell>{shop.lastOrder}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
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
                            <DropdownMenuItem>Suspend</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteShop(shop._id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredShopData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                        No shops found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
