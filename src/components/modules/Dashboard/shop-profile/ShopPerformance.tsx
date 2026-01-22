"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan 1", profit: 27 },
  { name: "Jan 2", profit: 25 },
  { name: "Jan 3", profit: 30 },
  { name: "Jan 4", profit: 27 },
  { name: "Jan 5", profit: 28 },
  { name: "Jan 6", profit: 33 },
  { name: "Jan 7", profit: 26 },
];

export default function ShopPerformance() {
  return (
    <Card className="w-full border rounded-lg">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-base font-semibold mb-5">Shop Performance</h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Orders", value: "567", change: "+4.8%", icon: "🛒", color: "text-orange-500" },
            { label: "Products", value: "128", change: "+2.5%", icon: "📦", color: "text-purple-500" },
            { label: "Revenue", value: "$45,621", change: "+8.1%", icon: "💵", color: "text-green-500" },
            { label: "Customers", value: "1,245", change: "+3.2%", icon: "👤", color: "text-gray-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-3 sm:p-4 shadow-sm"
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className={stat.color}>{stat.icon}</span>
                <span className="text-xs sm:text-sm font-medium">{stat.label}</span>
              </div>
              <p className="text-lg sm:text-xl font-semibold">{stat.value}</p>
              <p className="text-green-500 text-[10px] sm:text-xs">{stat.change} ↑</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="h-48 sm:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={10}
                tick={{ fontSize: 10 }}
              />
              <YAxis hide={true} domain={[0, 36]} />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
                formatter={(value) => [`${value}%`, "Profit"]}
              />
              <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center text-green-500 text-xs">
            <ArrowUpRight size={14} className="mr-1" />
            Performance is up 12% from last period
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
