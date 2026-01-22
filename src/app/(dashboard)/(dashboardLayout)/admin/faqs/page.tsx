/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Search, Plus } from "lucide-react";
import FaqStatCard from "@/components/modules/Dashboard/faqs/StatCard";
import { Button } from "@/components/ui/button";
import { useGetAllFaqsQuery } from "@/redux/featured/faqs/faqs";
import Link from "next/link";

export default function FaqTableOnly() {
  const { data: faqData = [], isLoading, isError } = useGetAllFaqsQuery();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (faqData?.length) {
      setFaqs(faqData);
    } else {
      setFaqs([]);
    }
  }, [faqData]);

  const filteredFaqs = faqs.filter((faq) =>
    faq?.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Stat Calculations
  const total = faqs.length;
  const published = faqs.filter((f) => f.status === "published").length;
  const drafts = faqs.filter((f) => f.status === "draft").length;
  const uniqueCategories = new Set(faqs.map((f) => f.type)).size;

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-end">
        <Link href={`/admin/terms`}>
          <Button className="bg-[#1E1F25] hover:bg-[#2c2d34] text-white rounded-lg px-6 h-10 text-sm font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Add New FAQ
          </Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <FaqStatCard
          title="Total FAQs"
          value={total}
          description="All frequently asked questions"
        />
        <FaqStatCard
          title="Published"
          value={published}
          description="Live on website"
        />
        <FaqStatCard
          title="Drafts"
          value={drafts}
          description="Pending publication"
        />
        <FaqStatCard
          title="Categories"
          value={uniqueCategories}
          description="Different topics"
        />
      </div>

      {/* FAQ Table */}
      <Card className="p-6 rounded-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">FAQs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your frequently asked questions and help content.
          </p>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 max-w-full"
            />
          </div>
        </div>

        <div className="rounded-md overflow-hidden border-b">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#979797]">Question</TableHead>
                <TableHead className="text-[#979797]">Category</TableHead>
                <TableHead className="text-[#979797]">Created</TableHead>
                <TableHead className="text-[#979797]">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Loading FAQs...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-red-500"
                  >
                    Failed to load FAQs.
                  </TableCell>
                </TableRow>
              ) : filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="py-4">{faq.title}</TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs px-2 py-1 bg-muted rounded-full border text-muted-foreground">
                        {faq.type}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      {new Date(faq.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-4">
                      {new Date(faq.updatedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No FAQs found.
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
