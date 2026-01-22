"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan 1", profitMargin: 27 },
  { name: "Jan 2", profitMargin: 25 },
  { name: "Jan 3", profitMargin: 30 },
  { name: "Jan 4", profitMargin: 28 },
  { name: "Jan 5", profitMargin: 28 },
  { name: "Jan 6", profitMargin: 35 },
  { name: "Jan 7", profitMargin: 27 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
  }>;
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2">
        <p className="text-gray-800 font-medium">{label}</p>
        <p className="text-green-500 text-sm">Profit: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ProfitMarginAnalysis() {
  return (
    <div className="bg-white rounded-lg shadow-sm border-[#C9C9C9] border p-4">
      <h2 className="text-[24px] font-bold mb-4">Profit Margin Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#4b5563" }}
            minTickGap={10}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            domain={[0, "dataMax + 5"]}
            tick={{ fontSize: 12, fill: "#4b5563" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-gray-600">{value}</span>
            )}
          />
          <Bar
            dataKey="profitMargin"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            name="Profit Margin %"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
