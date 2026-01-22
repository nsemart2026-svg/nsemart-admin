import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BandStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
  color?: string;  // Add this
}

export function BandStatCard({ title, value, subtitle, className, color }: BandStatCardProps) {
  return (
    <Card className={cn("rounded-xl border-[#C9C9C9] shadow-sm", className)}>
      <CardContent className="p-4">
        <p className="text-sm  font-medium">{title}</p>
        <h2 className={cn("text-2xl py-2 font-bold", color)}>{value}</h2>
        {subtitle && <p className="text-xs font-medium text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

