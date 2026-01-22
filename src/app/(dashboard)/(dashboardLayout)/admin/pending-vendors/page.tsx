"use client";

import { useEffect, useState } from "react";
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
import { Eye, Search, ChevronDown, CheckCircle, Clock, X } from "lucide-react";
import { StatCard } from "@/components/modules/Dashboard/pending-vendors/pending-card";

type Application = {
  id: number;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  date: string;
  documents: string[];
};

export default function PendingVendors() {
  const [apps, setApps] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "Digital Marketplace",
        email: "admin@digitalmp.com",
        phone: "+1 (555) 111-2222",
        businessType: "Electronics",
        date: "2024-01-20",
        documents: ["Business License", "Tax ID"],
      },
      {
        id: 2,
        name: "Organic Foods Co",
        email: "contact@organicfoods.com",
        phone: "+1 (555) 333-4444",
        businessType: "Food & Beverages",
        date: "2024-01-18",
        documents: ["Business License", "Food Safety Certificate"],
      },
      {
        id: 3,
        name: "Artisan Crafts",
        email: "hello@artisancrafts.com",
        phone: "+1 (555) 555-6666",
        businessType: "Handmade & Crafts",
        date: "2024-01-15",
        documents: ["Business License"],
      },
      {
        id: 4,
        name: "Tech Innovations",
        email: "support@techinnovations.com",
        phone: "+1 (555) 777-8888",
        businessType: "Technology",
        date: "2024-01-22",
        documents: ["Business License", "Tax ID", "Insurance Certificate"],
      },
    ];

    setApps(data);

    const uniqueCategories = [
      "All Categories",
      ...new Set(data.map((a) => a.businessType)),
    ];
    setCategories(uniqueCategories);
  }, []);

  const filteredApps = apps.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      app.businessType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 space-y-6 py-6 w-full">
      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button className="bg-black text-white hover:bg-white hover:text-black">
          <CheckCircle className="w-4 h-4 mr-2" />
          Bulk Approve
        </Button>
        <Button variant="outline" className="bg-black text-white ">
          <X className="w-4 h-4 mr-2" />
          Bulk Reject
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          title="Pending Applications"
          value="12"
          subtitle="+3 new this week"
        />
        <StatCard
          title="Avg Review Time"
          value="2.5 days"
          subtitle="-0.5 days improvement"
        />
        <StatCard
          title="Approval Rate"
          value="85%"
          subtitle="+5% from last month"
        />
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="relative w-full sm:w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pending vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11 w-full"
          />
        </div>

        <div className="w-full sm:w-1/4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 w-full text-sm font-normal flex justify-between items-center truncate"
              >
                {selectedCategory}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full sm:w-auto">
              {categories.map((cat, idx) => (
                <DropdownMenuItem
                  key={idx}
                  onSelect={() => setSelectedCategory(cat)}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg p-4 w-full bg-white dark:bg-background">
        <h2 className="text-xl font-semibold mb-4 text-[#1B1F32] flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Pending Applications ({filteredApps.length})
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold uppercase">
                        {app.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {app.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ID: #{app.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-pre-line text-sm text-muted-foreground">
                    {app.email}
                    {"\n"}
                    {app.phone}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
                      {app.businessType}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {app.date}
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    {app.documents.map((doc, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-gray-200 text-foreground"
                      >
                        {doc}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-[#f9f9fb] text-[#1b1f32] border border-transparent hover:border-gray-300"
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-[#f9f9fb] text-[#1b1f32] border border-transparent hover:border-gray-300"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-[#f9f9fb] text-[#1b1f32] border border-transparent hover:border-gray-300"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
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
