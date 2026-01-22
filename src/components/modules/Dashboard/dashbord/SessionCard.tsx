'use client';

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ArrowDownRight } from 'lucide-react';

const data = [
  { value: 16500 },
  { value: 12000 },
  { value: 12500 },
  { value: 14000 },
  { value: 13500 },
  { value: 16000 },
  { value: 15500 },
];

export default function SessionCard() {
  const change = -3;
  const currentSessions = 16500;

  return (
    <div className="relative bg-[#C9C9C926] text-card-foreground rounded-xl p-4 shadow-sm w-full h-[200px] lg:max-w-full md:w-full aspect-[454/199] md:h-[199px]  flex flex-col justify-between overflow-hidden">
      {/* Top Section */}
      <div>
        <h3 className="text-xl font-semibold">Sessions</h3>
        <p className="text-sm font-medium text-muted-foreground">Last 7 days</p>
      </div>

      {/* Main Value */}
      <div className="text-3xl font-bold mt-1">
        {(currentSessions / 1000).toFixed(1)}K
      </div>

      {/* Change */}
      <div className="flex items-center text-sm text-destructive">
        <ArrowDownRight className="w-4 h-4 mr-1" />
        {Math.abs(change)}%
        <span className="ml-1 text-muted-foreground">vs last 7 days</span>
      </div>

      {/* Chart */}
      <div className="absolute right-4 bottom-4 w-[50%] h-[70%] pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip wrapperStyle={{ display: 'none' }} />
            <defs>
              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
              fill="url(#redGradient)"
              fillOpacity={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
