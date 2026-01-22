"use client";

import { MoreVertical } from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";

const data = [
  { time: "12am", value: 0 },
  { time: "4am", value: 80 },
  { time: "8am", value: 0 },
  { time: "12pm", value: 60 },
  { time: "4pm", value: 0 },
  { time: "8pm", value: 90 },
];

export default function TodayOrderChart() {
  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-md p-4 w-full max-w-full">
      {/* Top row: title & menu icon */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-base font-medium">Today Order</h1>
        <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
      </div>

      {/* Row: total count & percentage change */}
      <div className="flex justify-between items-center w-full mb-1">
        <h2 className="text-2xl font-bold">457</h2>
        <p className="text-xs text-green-600">
          ↑ 6%{" "}
          <span className="text-muted-foreground">vs last day</span>
        </p>
      </div>

      {/* Subtitle */}
      <p className="text-xs text-muted-foreground mb-3">
        Orders Over Time
      </p>

      {/* Chart */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
