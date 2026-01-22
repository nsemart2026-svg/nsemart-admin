"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Filter,
  Boxes,
  CheckCircle,
  Store,
  PackageCheck,
} from "lucide-react";

import StatCard from "@/components/modules/Dashboard/shop-transfer-request/StatCard";
import StoreLocationsCard from "@/components/modules/Dashboard/store-list/StoreLocationsCard";

// Store type definition (optional but recommended)
type Store = {
  name: string;
  location: string;
  phone: string;
  manager: string;
  items: number;
  status: "Active" | "Maintenance";
};

export default function StoreListPage() {
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState<Store[]>([]);

  // In future replace this with API call
  useEffect(() => {
    const fetchStores = async () => {
      const data: Store[] = [
        {
          name: "Downtown Store",
          location: "123 Main St, Downtown",
          phone: "+1 (555) 123-4567",
          manager: "John Smith",
          items: 245,
          status: "Active",
        },
        {
          name: "Mall Location",
          location: "456 Shopping Center, Mall",
          phone: "+1 (555) 234-5678",
          manager: "Sarah Johnson",
          items: 189,
          status: "Active",
        },
        {
          name: "Warehouse",
          location: "789 Industrial Blvd",
          phone: "+1 (555) 345-6789",
          manager: "Mike Davis",
          items: 567,
          status: "Active",
        },
        {
          name: "Outlet Store",
          location: "321 Outlet Dr",
          phone: "+1 (555) 456-7890",
          manager: "Lisa Chen",
          items: 134,
          status: "Maintenance",
        },
        {
          name: "Online Store",
          location: "Virtual Location",
          phone: "+1 (555) 567-8901",
          manager: "David Wilson",
          items: 423,
          status: "Active",
        },
      ];
      setStores(data);
    };

    fetchStores();
  }, []);

  // Stat Calculations
  const totalStores = stores.length;
  const activeStores = stores.filter(
    (store) => store.status === "Active"
  ).length;
  const totalItems = stores.reduce((sum, store) => sum + store.items, 0);
  const avgItems = totalStores > 0 ? Math.round(totalItems / totalStores) : 0;

  // Filtered List
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Store List</h1>
          <p className="text-[#979797]">
            Manage your store locations and inventory
          </p>
        </div>

        <Button className="bg-black text-white hover:bg-gray-800 h-9 text-sm rounded-md px-4">
          <Plus className="w-4 h-4 mr-2" />
          Add New Store
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Stores"
          value={String(totalStores)}
          icon={<Store className="text-purple-700 w-5 h-5" />}
          subtitle="Managed locations"
        />

        <StatCard
          title="Active Stores"
          value={String(activeStores)}
          icon={<CheckCircle className="text-green-500 w-5 h-5" />}
          subtitle="Currently operational"
        />

        <StatCard
          title="Total Items"
          value={String(totalItems)}
          icon={<Boxes className="text-indigo-500 w-5 h-5" />}
          subtitle="Across all stores"
        />

        <StatCard
          title="Avg Items/Store"
          value={String(avgItems)}
          icon={<PackageCheck className="text-blue-500 w-5 h-5" />}
          subtitle="Items per location"
        />
      </div>

      {/* Store Cards */}
      <Card className="p-6 rounded-xl">
        <div className="mb-2">
          <h2 className="text-2xl font-bold">Store Locations</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Manage all your store locations and their inventory
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search stores..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredStores.map((store, index) => (
            <StoreLocationsCard
              key={index}
              name={store.name}
              location={store.location}
              phone={store.phone}
              manager={store.manager}
              items={store.items}
              status={store.status}
              onViewDetails={() => {}}
              onEdit={() => {}}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
