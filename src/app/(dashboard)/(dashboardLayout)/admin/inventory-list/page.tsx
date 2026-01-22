"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Filter,
  Boxes,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import StatCard from "@/components/modules/Dashboard/shop-transfer-request/StatCard";

// Inventory mock data
const mockData = [
  {
    title: "Wireless Headphones",
    type: "Electronics",
    version: "WH-001",
    status: "In Stock",
    updated: 45,
    updatedBy: "$89.99",
  },
  {
    title: "Office Chair",
    type: "Furniture",
    version: "OC-002",
    status: "In Stock",
    updated: 12,
    updatedBy: "$299.99",
  },
  {
    title: "Laptop Stand",
    type: "Accessories",
    version: "LS-003",
    status: "Low Stock",
    updated: 8,
    updatedBy: "$49.99",
  },
  {
    title: "Desk Lamp",
    type: "Lighting",
    version: "DL-004",
    status: "Out of Stock",
    updated: 0,
    updatedBy: "$79.99",
  },
  {
    title: "Keyboard",
    type: "Electronics",
    version: "KB-005",
    status: "In Stock",
    updated: 23,
    updatedBy: "$129.99",
  },
  {
    title: "Monitor",
    type: "Electronics",
    version: "MN-006",
    status: "In Stock",
    updated: 15,
    updatedBy: "$349.99",
  },
];

export default function InventoryPage() {
  const [documents, setDocuments] = useState<typeof mockData>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDocuments(mockData);
    }, 200);
  }, []);

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const total = documents.length;
  const inStock = documents.filter((d) => d.status === "In Stock").length;
  const lowStock = documents.filter((d) => d.status === "Low Stock").length;
  const outStock = documents.filter((d) => d.status === "Out of Stock").length;

  return (
    <div className="space-y-6 py-6">
      {/* Button */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0">
          <div className="">
            <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap">
              Inventory Item List
            </h1>
            <p className="text-[#979797]">Manage your inventory items</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          <Button className="bg-black text-white hover:bg-gray-800 h-9 text-sm rounded-md px-4">
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Items"
          value={String(total)}
          icon={<Boxes className="text-muted-foreground w-5 h-5" />}
          subtitle="Active inventory items"
        />
        <StatCard
          title="In Stock"
          value={String(inStock)}
          icon={<CheckCircle className="text-green-500 w-5 h-5" />}
          subtitle="Available items"
        />
        <StatCard
          title="Low Stock"
          value={String(lowStock)}
          icon={<AlertTriangle className="text-yellow-500 w-5 h-5" />}
          subtitle="Need restocking"
        />
        <StatCard
          title="Out of Stock"
          value={String(outStock)}
          icon={<XCircle className="text-red-500 w-5 h-5" />}
          subtitle="Require immediate action"
        />
      </div>

      {/* Inventory Table */}
      <Card className="p-6 rounded-xl">
        <div className="mb-2">
          <h2 className="text-2xl font-bold">Inventory Items</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Complete list of all inventory items
          </p>
          <div className="w-full mb-2 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Button variant="outline" className="shrink-0 h-9">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-hidden border-b rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocs.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell className="py-4 font-medium">
                    {doc.title}
                  </TableCell>
                  <TableCell className="text-gray-400 py-4">
                    {doc.version}
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs px-2 py-1 bg-muted rounded-full border font-medium text-black">
                      {doc.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    {doc.updated}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    {doc.updatedBy}
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        doc.status === "In Stock"
                          ? "bg-blue-900 text-white"
                          : doc.status === "Low Stock"
                          ? "bg-gray-200 text-black"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4 flex justify-end gap-2">
                    <Pencil className="w-4 h-4 cursor-pointer text-muted-foreground" />
                    <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
              {filteredDocs.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
