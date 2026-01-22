"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Filter,
  Store,
  Star,
  Package,
  UserCheck,
} from "lucide-react";

import StatCard from "@/components/modules/Dashboard/shop-transfer-request/StatCard";
import VendorCard from "@/components/modules/Dashboard/vendor-list/VendorCard";

// Vendor type
type Vendor = {
  name: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "Pending" | "Inactive";
  rating: number;
  products: number;
};

export default function VendorListPage() {
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const data: Vendor[] = [
        {
          name: "TechSupply Co.",
          contactName: "Michael Brown",
          email: "orders@techsupply.com",
          phone: "+1 (555) 111-2222",
          location: "San Francisco, CA",
          status: "Active",
          rating: 4.8,
          products: 45,
        },
        {
          name: "Office Essentials",
          contactName: "Jennifer White",
          email: "sales@officeessentials.com",
          phone: "+1 (555) 222-3333",
          location: "Chicago, IL",
          status: "Active",
          rating: 4.6,
          products: 67,
        },
        {
          name: "Global Electronics",
          contactName: "Robert Taylor",
          email: "info@globalelectronics.com",
          phone: "+1 (555) 333-4444",
          location: "New York, NY",
          status: "Active",
          rating: 4.9,
          products: 89,
        },
        {
          name: "Furniture Plus",
          contactName: "Amanda Green",
          email: "orders@furnitureplus.com",
          phone: "+1 (555) 444-5555",
          location: "Los Angeles, CA",
          status: "Pending",
          rating: 4.3,
          products: 23,
        },
        {
          name: "Quick Parts",
          contactName: "James Wilson",
          email: "support@quickparts.com",
          phone: "+1 (555) 555-6666",
          location: "Austin, TX",
          status: "Inactive",
          rating: 3.8,
          products: 34,
        },
      ];
      setVendors(data);
    };

    fetchVendors();
  }, []);

  // Calculated stats
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === "Active").length;
  const totalProducts = vendors.reduce((sum, v) => sum + v.products, 0);
  const avgRating =
    vendors.length > 0
      ? (
          vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length
        ).toFixed(1)
      : "0.0";

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Vendor List</h1>
          <p className="text-[#979797]">Manage your supplier relationships</p>
        </div>

        <Button className="bg-black text-white hover:bg-gray-800 h-9 text-sm rounded-md px-4">
          <Plus className="w-4 h-4 mr-2" />
          Add New Vendor
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Vendors"
          value={String(totalVendors)}
          icon={<Store className="text-purple-700 w-5 h-5" />}
          subtitle="Registered suppliers"
        />

        <StatCard
          title="Active Vendors"
          value={String(activeVendors)}
          icon={<UserCheck className="text-green-500 w-5 h-5" />} // Changed from CheckCircle
          subtitle="Currently supplying"
        />

        <StatCard
          title="Total Products"
          value={String(totalProducts)}
          icon={<Package className="text-indigo-500 w-5 h-5" />} // Changed from Boxes
          subtitle="Available from vendors"
        />

        <StatCard
          title="Avg Rating"
          value={avgRating}
          icon={<Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />} // Changed from PackageCheck
          subtitle="Vendor performance"
        />
      </div>

      {/* Vendor Directory */}
      <Card className="p-6 rounded-xl">
        <div className="mb-2">
          <h2 className="text-2xl font-bold">Vendor Directory</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Complete list of all registered vendors and suppliers
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search Vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Button variant="outline" className="h-9">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredVendors.map((vendor, index) => (
            <VendorCard
              key={index}
              name={vendor.name}
              contactName={vendor.contactName}
              email={vendor.email}
              phone={vendor.phone}
              location={vendor.location}
              status={vendor.status}
              rating={vendor.rating}
              products={vendor.products}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
