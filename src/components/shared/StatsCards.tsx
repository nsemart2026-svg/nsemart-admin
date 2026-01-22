import { Card, CardContent } from "@/components/ui/card";
import React, { ReactNode } from "react";

export type StatCardItem = {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  iconColor?: string;
};

type StatsCardsProps = {
  items: StatCardItem[];
};

const StatsCards = ({ items }: StatsCardsProps) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2
    xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6"
    >
      {items.map((item, i) => (
        <Card className="rounded-[8px]" key={i}>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm opacity-80 ">{item.title}</p>
              <span className="text-xl" style={{ color: item.iconColor }}>
                {item.icon}
              </span>
            </div>

            <h2 className="text-xl font-semibold">{item.value}</h2>
            <p className="text-xs mt-1 opacity-60">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
