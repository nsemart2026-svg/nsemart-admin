"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type SrTotalSaleCardProps = {
  total: number; // মোট প্রোডাক্ট সেল কাউন্ট
  diffPercent?: number; // গ্রোথ %
  period?: string; // "Last 30 days" ইত্যাদি
  currency?: string | null; // চাইলে টাকা দেখাবে, না হলে কাউন্ট
};

export default function SrTotalSaleCard({
  total,
  diffPercent = 0,
  period = "—",
  currency = null,
}: SrTotalSaleCardProps) {
  const sign = diffPercent >= 0 ? "+" : "−";
  const abs = Math.abs(diffPercent).toFixed(1);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          Total Product Sale
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold">
          {currency
            ? `${currency}${total.toLocaleString()}`
            : total.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">
          {period} •{" "}
          <span
            className={diffPercent >= 0 ? "text-green-600" : "text-red-600"}
          >
            {sign}
            {abs}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
