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
  Eye,
  Plus,
  FileText,
  FileCheck2,
  FileClock,
  CalendarDays,
  Search,
} from "lucide-react";
import { UserStatCard } from "@/components/shared/userStatCard"; // Ensure path is correct

// Mock Data
const mockData = [
  {
    title: "Terms of Service",
    type: "Terms",
    version: "v1.2",
    status: "published",
    updated: "2024-01-20",
    updatedBy: "Admin User",
  },
  {
    title: "Privacy Policy",
    type: "Privacy",
    version: "v1.1",
    status: "published",
    updated: "2024-01-18",
    updatedBy: "Legal Team",
  },
  {
    title: "Return Policy",
    type: "Returns",
    version: "v2.0",
    status: "draft",
    updated: "2024-01-22",
    updatedBy: "Policy Team",
  },
  {
    title: "Cookie Policy",
    type: "Cookies",
    version: "v1.0",
    status: "published",
    updated: "2024-01-15",
    updatedBy: "Tech Team",
  },
];

export default function TermsAndPoliciesPage() {
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
  const published = documents.filter((d) => d.status === "published").length;
  const drafts = documents.filter((d) => d.status === "draft").length;
  const updatesThisMonth = 3;

  return (
    <div className="space-y-6 py-6">
      {/* Stat Cards + Button */}
      <div className="flex justify-end">
        <Button className="bg-black text-white  hover:bg-gray-800 h-9 text-sm rounded-md px-4">
          <Plus className="w-4 h-4 mr-2" />
          Add New Document
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UserStatCard
          title="Total Documents"
          value={String(total)}
          subtitle="Legal documents"
          icon={<FileText className="w-5 h-5 text-pink-600" />}
        />
        <UserStatCard
          title="Published"
          value={String(published)}
          subtitle="Live documents"
          icon={<FileCheck2 className="w-5 h-5 text-green-600" />}
        />
        <UserStatCard
          title="Drafts"
          value={String(drafts)}
          subtitle="Under review"
          icon={<FileClock className="w-5 h-5 text-yellow-500" />}
        />
        <UserStatCard
          title="Updates This Month"
          value={String(updatesThisMonth)}
          subtitle="Document revisions"
          icon={<CalendarDays className="w-5 h-5 text-blue-600" />}
        />
      </div>
      {/* Table Section */}
      <Card className="p-6 rounded-xl">
        <div className="mb-2">
          <h2 className="text-xl font-semibold">Terms & Policies Management</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your legal documents, terms of service, and policies.
          </p>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="overflow-hidden border-b rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#979797]">Document Title</TableHead>
                <TableHead className="text-[#979797]">Type</TableHead>
                <TableHead className="text-[#979797]">Version</TableHead>
                <TableHead className="text-[#979797]">Status</TableHead>
                <TableHead className="text-[#979797]">Last Updated</TableHead>
                <TableHead className="text-[#979797]">Updated By</TableHead>
                <TableHead className="text-[#979797] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocs.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell className="py-4">{doc.title}</TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs px-2 py-1 bg-muted rounded-full border font-medium text-black">
                      {doc.type}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">{doc.version}</TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        doc.status === "published"
                          ? "bg-[#C7FFD6] text-green-700"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">{doc.updated}</TableCell>
                  <TableCell className="py-4">{doc.updatedBy}</TableCell>
                  <TableCell className="text-right py-4 flex justify-end">
                    <Eye className="w-4 h-4 text-black cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
              {filteredDocs.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No documents found.
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
