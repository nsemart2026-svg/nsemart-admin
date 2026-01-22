"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, Plus } from "lucide-react"

const shops = [
  {
    id: 1,
    name: "Tech Gadgets Store",
    image: "/modern-tech-gadgets.png",
    status: "Active",
    orders: 128,
    products: 547,
    revenue: "$45,621",
  },
  {
    id: 2,
    name: "Fashion Outlet",
    image: "/fashion-store-interior.png",
    status: "Active",
    orders: 96,
    products: 324,
    revenue: "$28,450",
  },
  {
    id: 3,
    name: "Home Decor",
    image: "/modern-furniture-showroom.png",
    status: "Inactive",
    orders: 72,
    products: 189,
    revenue: "$15,890",
  },
  {
    id: 4,
    name: "Sports Equipment",
    image: "/sports-equipment-store.png",
    status: "Active",
    orders: 45,
    products: 302,
    revenue: "$9,720",
  },
  {
    id: 5,
    name: "Organic Foods",
    image: "/organic-grocery-store.png",
    status: "Active",
    orders: 64,
    products: 156,
    revenue: "$12,340",
  },
  {
    id: 6,
    name: "Kids Toys",
    image: "/colorful-toy-store.png",
    status: "Inactive",
    orders: 38,
    products: 85,
    revenue: "$6,890",
  },
]

export default function MyShopsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');

  // Filter and sort shops
  const filteredShops = shops
    .filter(shop => {
      // Search filter
      const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && shop.status === 'Active') || 
                          (statusFilter === 'inactive' && shop.status === 'Inactive');
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortOption === 'newest') {
        return b.id - a.id; // Assuming higher ID means newer
      } else if (sortOption === 'oldest') {
        return a.id - b.id;
      } else if (sortOption === 'revenue') {
        // Remove $ and commas, then convert to number for comparison
        const revenueA = Number(a.revenue.replace(/[^0-9.-]+/g, ''));
        const revenueB = Number(b.revenue.replace(/[^0-9.-]+/g, ''));
        return revenueB - revenueA;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Shops</h1>
            <p className="text-gray-600 text-sm">Manage all your shops in one place.</p>
          </div>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New Shop
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search shops..." 
                  className="pl-10 bg-white" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select 
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full md:w-32 bg-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Shops</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select 
                  value={sortOption}
                  onValueChange={setSortOption}
                >
                  <SelectTrigger className="w-full md:w-40 bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="revenue">Highest Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredShops.length} of {shops.length} shops
        </div>

        {/* Shop Cards Grid */}
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <Card key={shop.id} className="overflow-hidden bg-white hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <span className="text-gray-400">Shop Image</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`absolute top-3 left-3 text-xs ${
                      shop.status === "Active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {shop.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 p-1 h-auto bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">{shop.name}</h3>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Orders</div>
                      <div className="font-semibold text-gray-900">{shop.orders}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Products</div>
                      <div className="font-semibold text-gray-900">{shop.products}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Revenue</div>
                      <div className="font-semibold text-gray-900">{shop.revenue}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-4">No shops found matching your criteria</div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setSortOption('newest');
                }}
              >
                Reset filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}