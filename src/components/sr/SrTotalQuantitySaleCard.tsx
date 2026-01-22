"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SrTotalSaleQuantityCardProps = {
  quantity: number;       // total sold quantity
  unit?: string;          // e.g., "pcs", "items", "units"
  diffPercent?: number;   // growth/drop percentage
  period?: string;        // e.g., "Last 30 days"
};

export default function SrTotalSaleQuantityCard({
  quantity,
  unit = "pcs",
  diffPercent = 0,
  period = "—",
}: SrTotalSaleQuantityCardProps) {
  const nf = new Intl.NumberFormat("en-US");
  const sign = diffPercent >= 0 ? "+" : "−";
  const abs = Math.abs(diffPercent).toFixed(1);
  const trendClass = diffPercent >= 0 ? "text-green-600" : "text-red-600";

  return (
    <Card className="w-full bg-gradient-to-br from-sky-50 to-white border-sky-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          Total Product Sale (Qty)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold">
          {nf.format(quantity)}{" "}
          <span className="text-base font-medium text-muted-foreground">{unit}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {period} •{" "}
          <span className={trendClass}>
            {sign}
            {abs}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
