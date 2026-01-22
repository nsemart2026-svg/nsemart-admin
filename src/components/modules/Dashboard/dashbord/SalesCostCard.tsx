'use client';

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUpRight } from 'lucide-react';

const data = [
  { day: 'Mon', sales: 420, cost: 310 },
  { day: 'Tue', sales: 560, cost: 400 },
  { day: 'Wed', sales: 590, cost: 440 },
  { day: 'Thu', sales: 670, cost: 500 },
  { day: 'Fri', sales: 780, cost: 620 },
  { day: 'Sat', sales: 880, cost: 700 },
  { day: 'Sun', sales: 930, cost: 760 },
];

export default function SalesCostCard() {
  const totalSales = data.reduce((acc, d) => acc + d.sales, 0);
  const totalCost = data.reduce((acc, d) => acc + d.cost, 0);
  const growth = 8560;

  return (
    <div className="bg-[#1B1E2B] text-white rounded-xl p-4 shadow-lg flex flex-col md:flex-row gap-4 w-full max-w-[746px] lg:max-w-full md:h-[199px]  h-auto">
      {/* LEFT: Details */}
      <div className="md:w-1/2 w-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Total Sales & Costs</h3>
          <p className="text-sm font-medium text-gray-400">Last 7 days</p>
        </div>

        <div className="mt-4">
          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold">৳ {totalSales}</p>
            <p className="text-xl font-bold  text-red-500">৳ {totalCost}</p>
          </div>
          <div className="flex items-center text-sm font-medium text-green-400 mt-1">
            <ArrowUpRight size={16} className="mr-1" />
            <span>৳ {growth.toLocaleString()}</span>
            <span className="text-gray-400 ml-1">vs last 7 days</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Chart + Legend on Top */}
      <div className="md:w-1/2 w-full h-[150px] md:h-full flex flex-col">
        {/* Legend */}
        <div className="flex justify-start gap-4 text-xs text-white mb-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Sales</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>Cost</span>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#ccc" fontSize={10} />
              <Tooltip
                contentStyle={{ backgroundColor: '#2c2f3f', border: 'none' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#00FF6A"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#FF3B3B"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
