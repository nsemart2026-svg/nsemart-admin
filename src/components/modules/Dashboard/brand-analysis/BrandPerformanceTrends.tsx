"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan 1", revenue: 45000, profit: 15000 },
  { name: "Jan 2", revenue: 45000, profit: 14000 },
  { name: "Jan 3", revenue: 58000, profit: 16000 },
  { name: "Jan 4", revenue: 44000, profit: 14000 },
  { name: "Jan 5", revenue: 51000, profit: 15000 },
  { name: "Jan 6", revenue: 59000, profit: 17000 },
  { name: "Jan 7", revenue: 47000, profit: 14000 },
];

export default function BrandPerformanceTrends() {
  return (
    <div className="bg-white rounded-lg shadow-sm border-[#C9C9C9] border p-4">
      <h2 className="text-[24px] font-bold mb-4">Brand Performance Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#4b5563" }} />
          <YAxis
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12, fill: "#4b5563" }}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, value === data[0].revenue ? "Revenue" : "Profit"]}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
          />
          <Legend
            formatter={(value) => (
              <span className="text-green-600 capitalize">{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#34d399"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
