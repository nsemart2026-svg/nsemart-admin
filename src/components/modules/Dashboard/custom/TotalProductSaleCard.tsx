"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

interface TotalProductSaleCardProps {
  totalAmount: number; // total BDT of completed sales
  totalCount: number;  // total number of products sold
}

const fmt = (n: number, currency: string = "BDT") =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(n) + " " + currency;

export default function TotalProductSaleCard({
  totalAmount,
  totalCount,
}: TotalProductSaleCardProps) {
  return (
    <Card className="h-full bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base md:text-lg">Total Product Sale</CardTitle>
        <ShoppingBag className="size-5 md:size-6 text-indigo-600" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl md:text-3xl font-semibold tracking-tight">
          {fmt(totalAmount)}
        </div>
        <div className="text-sm text-muted-foreground">
          Total items sold: {totalCount}
        </div>
      </CardContent>
    </Card>
  );
}
