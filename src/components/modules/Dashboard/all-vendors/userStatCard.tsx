'use client';

import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
};

export function UserStatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <div className="h-[130px] p-4 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex justify-between items-start">
      <div className="flex flex-col justify-between">
        <p className="text-[16px] md:text-wrap font-medium ">{title}</p>
        <p className="text-xl md:text-wrap py-2 lg:py-2 font-semibold text-foreground">{value}</p>
         <p className="text-xs md:text-sm text-green-600 truncate">{subtitle}</p>
      </div>
      <div>{icon}</div>
    </div>
  );
}