'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const data = [
  { month: 'JAN', sales: 100000 },
  { month: 'FEB', sales: 130000 },
  { month: 'MAR', sales: 120000 },
  { month: 'APR', sales: 220000 },
  { month: 'MAY', sales: 260000 },
  { month: 'JUN', sales: 200000 },
  { month: 'JUL', sales: 170000 },
  { month: 'AUG', sales: 90000 },
  { month: 'SEP', sales: 230000 },
  { month: 'OCT', sales: 310000 },
  { month: 'NOV', sales: 370000 },
  { month: 'DEC', sales: 400000 },
]

export default function SalesHistoryChart() {
  return (
    <div className="bg-white dark:bg-card rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-base font-semibold text-black dark:text-white mb-4">Sales History</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            formatter={(value) => [`${(value as number) / 1000}k`, 'Sales']}
          />
          <Bar
            dataKey="sales"
            radius={[8, 8, 0, 0]}
            fill="url(#gradient)"
            barSize={24}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
