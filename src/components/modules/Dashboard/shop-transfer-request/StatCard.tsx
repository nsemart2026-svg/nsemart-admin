"use client";

import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}: StatCardProps) {
  return (
    <div className="w-full border  rounded-lg p-4 sm:p-5 md:p-6 bg-white shadow-sm">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Title + Icon */}
        <div className="flex items-start justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="p-2  rounded-full text-muted-foreground">
            {icon}
          </div>
        </div>

        {/* Value */}
        <h3 className="text-2xl font-bold break-words">{value}</h3>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground line-clamp-1">{subtitle}</p>
      </div>
    </div>
  );
}
