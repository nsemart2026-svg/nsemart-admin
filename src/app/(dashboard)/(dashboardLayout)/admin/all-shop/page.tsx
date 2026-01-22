/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Package,
  Plus,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { StatsCard } from "@/components/all-shop/stats-card";
import { SearchAndFilters } from "@/components/all-shop/search-filters";
import { ShopCard } from "@/components/all-shop/shop-card";
import { ShopDetailsModal } from "@/components/all-shop/shop-details-modal";
import {
  useGetAllShopsQuery,
  useGetAllShopStatsQuery,
} from "@/redux/featured/shop/shopApi";

export default function ShopsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: shopData = [] } = useGetAllShopsQuery();
  const { data: statsResponse } = useGetAllShopStatsQuery();

  const categories = [
    "all",
    "Electronics",
    "Fashion",
    "Home",
    "Food",
    "Sports",
  ];
  const statuses = ["all", "Active", "Inactive"];

  // Map API stats data
  // Map API stats data
  const statsData = statsResponse?.data
    ? [
        {
          title: "Total Shops",
          value: statsResponse.data.totalShops.toString(),
          icon: ShoppingBag,
          color: "bg-purple-100 text-purple-600",
        },
        {
          title: "Total Orders",
          value: statsResponse.data.totalOrders.toString(),
          icon: TrendingUp,
          color: "bg-green-100 text-green-600",
        },
        {
          title: "Total Revenue",
          value: `$${statsResponse.data.totalRevenue.toLocaleString()}`,
          icon: BarChart3,
          color: "bg-blue-100 text-blue-600",
        },
        {
          title: "Total Products",
          value: statsResponse.data.totalProducts.toString(),
          icon: Package,
          color: "bg-pink-100 text-pink-600",
        },
      ]
    : [];

  const filteredShops = shopData.filter((shop: any) => {
    const normalizedSearch = searchTerm.toLowerCase();
    const matchesSearch =
      shop.basicInfo?.name?.toLowerCase().includes(normalizedSearch) ||
      shop.basicInfo?.description?.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      selectedCategory === "all" || shop.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || shop.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const mappedShops = filteredShops.map((shop: any) => ({
    id: shop._id,
    name: shop.basicInfo?.name || "Unnamed Shop",
    tagline: shop.basicInfo?.slug || "",
    description: shop.basicInfo?.description || "",
    location: `${shop.shopAddress?.city || ""}, ${
      shop.shopAddress?.country || ""
    }`,
    created: shop.createdAt
      ? new Date(shop.createdAt).toLocaleDateString()
      : "",
    revenue: shop.currentBalance
      ? `$${shop.currentBalance.toLocaleString()}`
      : "$0",
    orders: shop.orders?.length?.toString() || "0",
    products: shop.products?.length?.toString() || "0",
    avatar: shop.coverImage,
    logo: shop.logo || "",
    fullShop: shop,
  }));

  const handleViewShop = (shop: any) => {
    setSelectedShop(shop.fullShop);
    setIsModalOpen(true);
  };

  const handleEditShop = (id: string) => console.log(`Edit shop ${id}`);
  const handleDeleteShop = (id: string) => console.log(`Delete shop ${id}`);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header with Add Shop Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Shops</h1>
          <Link href={"/admin/create-shop"}>
            <Button
              variant="default"
              className="bg-black text-white hover:bg-black/80"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Shop
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          categories={categories}
          statuses={statuses}
        />

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mappedShops.length > 0 ? (
            mappedShops.map((shop: any) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                onView={() => handleViewShop(shop)}
                onEdit={() => handleEditShop(shop.id)}
                onDelete={() => handleDeleteShop(shop.id)}
              />
            ))
          ) : (
            <Card className="bg-white col-span-full flex flex-col items-center justify-center p-10 rounded-xl shadow-lg">
              <CardContent className="text-center">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-gray-700 text-2xl font-semibold mb-2">
                  No Shops Found
                </h2>
                <p className="text-gray-500">
                  Sorry we could not find any shops matching your criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Shop Details Modal */}
      {selectedShop && (
        <ShopDetailsModal
          shop={selectedShop}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
