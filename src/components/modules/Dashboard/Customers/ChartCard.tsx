'use client';

import { MoreVertical } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export type ChartCardProps = {
  chartData?: { name: string; value: number }[];
  activeCustomers?: string;
  repeatCustomers?: string;
  shopVisitors?: string;
  conversionRate?: string;
  timeframe?: string;
};

export function ChartCard({
  chartData,
  activeCustomers,
  repeatCustomers,
  shopVisitors,
  conversionRate,
  timeframe,
}: ChartCardProps) {
  const data =
    chartData || [
      { name: "Sun", value: 20000 },
      { name: "Mon", value: 30000 },
      { name: "Tue", value: 30000 },
      { name: "Wed", value: 25409 },
      { name: "Thu", value: 44000 },
      { name: "Fri", value: 25000 },
      { name: "Sat", value: 36000 },
    ];

  return (
    <div className="bg-white max-w-full rounded-2xl shadow-sm p-4 sm:p-6  lg:h-[495px] w-full">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        {/* Left Text Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-800">Customer Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm text-gray-500">
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {activeCustomers || "25k"}
              </p>
              <p className="border-b-2 border-green-500 pb-1">Active Customers</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {repeatCustomers || "5.6k"}
              </p>
              <p>Repeat Customers</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {shopVisitors || "250k"}
              </p>
              <p>Shop Visitor</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {conversionRate || "5.5%"}
              </p>
              <p>Conversion Rate</p>
            </div>
          </div>
        </div>

        {/* Timeframe and Actions */}
        <div className="flex items-center gap-2 self-end md:self-start">
          <button className="px-3 py-1 text-sm rounded-xl bg-green-100 text-green-700 font-medium">
            {timeframe || "This week"}
          </button>
          <button className="px-3 py-1 text-sm rounded-xl text-gray-600 hover:text-black">
            Last week
          </button>
          <MoreVertical className="w-4 h-4 text-gray-400 ml-2" />
        </div>
      </div>

      {/* Responsive Chart Container */}
      <div className="w-full h-[250px] sm:h-[180px] md:h-[240px] lg:h-[260px] xl:h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -24, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              stroke="#999"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#999"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#bbf7d0",
                color: "#000",
                borderRadius: "6px",
                border: "none",
              }}
              labelClassName="text-sm font-semibold text-black"
              formatter={(value) => value.toLocaleString()}
            />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#34d399"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
