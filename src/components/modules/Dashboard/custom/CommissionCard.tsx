"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";

interface CommissionCardProps {
  amount: number;      // total commission amount
  rate?: number;       // optional commission rate (0–1)
}

const fmt = (n: number, currency: string = "BDT") =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(n) +
  " " +
  currency;

export default function CommissionCard({ amount, rate = 0 }: CommissionCardProps) {
  return (
    <Card className="h-full bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base md:text-lg">Commission</CardTitle>
        <Percent className="size-5 md:size-6 text-emerald-600" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl md:text-3xl font-semibold tracking-tight">
          {fmt(amount)}
        </div>
        <div className="text-sm text-muted-foreground">
          {rate}%
        </div>
      </CardContent>
    </Card>
  );
}
