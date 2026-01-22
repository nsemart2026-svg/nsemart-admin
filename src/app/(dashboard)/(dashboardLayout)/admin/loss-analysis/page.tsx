"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

import { FrequentLossTable } from "@/components/modules/Dashboard/loss-analysis/frequent-loss-table";
import { HighValueLossTable } from "@/components/modules/Dashboard/loss-analysis/high-value-loss-table";
import { LossStatCard } from "@/components/modules/Dashboard/loss-analysis/loss-stats-card";
import { LossTrendsChart } from "@/components/modules/Dashboard/loss-analysis/loss-trends-chart";

export default function LossAnalysisPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Loss Analysis
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md">
            Comprehensive analysis of product losses, damages, and high-risk
            items
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-gray-900 text-white hover:bg-gray-800 px-4">
                {date ? format(date, "MM/dd/yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300 text-gray-700"
          >
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="bg-gray-200 rounded-lg p-1 w-full sm:w-auto h-[40px] flex">
    <TabsTrigger
      value="daily"
      className="data-[state=active]:bg-white data-[state=active]:shadow-sm 
                 data-[state=active]:text-gray-900 text-gray-600 rounded-md 
                 px-4 h-full flex items-center justify-center 
                 transition-colors w-full sm:w-auto"
    >
      Daily Loss 
    </TabsTrigger>
    <TabsTrigger
      value="monthly"
      className="data-[state=active]:bg-white data-[state=active]:shadow-sm 
                 data-[state=active]:text-gray-900 text-gray-600 rounded-md 
                 px-4 h-full flex items-center justify-center 
                 transition-colors w-full sm:w-auto"
    >
      Monthly Loss 
    </TabsTrigger>
  </TabsList>

        <TabsContent value="daily">
          <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <LossStatCard
              title="Total Loss Value"
              value="$16,450"
              subtitle="Last 7 days"
              color="text-[#EF4444]"
            />
            <LossStatCard
              title="High Loss Items"
              value="$12,610"
              subtitle="Critical losses"
              color="text-[#EF4444]"
            />
            <LossStatCard
              title="Damaged Items"
              value="62"
              subtitle="Total damaged units"
              color="text-[#DB7706]"
            />
            <LossStatCard
              title="Avg Loss %"
              value="16.0%"
              subtitle="Average loss percentage"
              color="text-[#DB7706]"
            />
          </div>

          <div className="mb-4">
            <LossTrendsChart />
          </div>

          <div className="flex items-center justify-between gap-3 pb-4 flex-wrap">
            {/* Loss Analysis Dropdown */}
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400">
              <option>Loss Analysis</option>
              <option>Option 2</option>
            </select>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 px-4 h-[36px] text-sm">
                    {date ? format(date, "MM/dd/yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 h-[36px] text-sm"
              >
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <HighValueLossTable />
            <FrequentLossTable />
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <p className="text-muted-foreground p-4">
            Monthly analysis coming soon...
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
