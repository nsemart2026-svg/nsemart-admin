import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ChartData {
  date: string;
  totalLoss: number;
  frequentLoss?: number;
}

const data: ChartData[] = [
  { date: "Jan 1", totalLoss: 2500, frequentLoss: 2000 },
  { date: "Jan 2", totalLoss: 3000, frequentLoss: 2500 },
  { date: "Jan 3", totalLoss: 2000, frequentLoss: 1500 },
  { date: "Jan 4", totalLoss: 2400, frequentLoss: 2000 },
  { date: "Jan 5", totalLoss: 2800, frequentLoss: 2500 },
  { date: "Jan 6", totalLoss: 3100, frequentLoss: 2700 },
  { date: "Jan 7", totalLoss: 2600, frequentLoss: 2100 },
];

function LegendCircle({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="white" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function LossTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-2xl font-bold">Loss Trends Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="frequentLoss"
                stroke="#f97316"
                strokeWidth={2}
                name="High Frequent Loss"
                strokeDasharray={2}
              />
              <Line
                type="monotone"
                dataKey="totalLoss"
                stroke="#ef4444"
                strokeWidth={2}
                name="Total Loss"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Responsive Legend */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">
          <div className="flex items-center gap-2 text-[#EF4444] font-medium text-sm sm:text-lg">
            <LegendCircle color="#EF4444" />
            Total Loss Value
          </div>
          <div className="flex items-center gap-2 text-[#DB7706] font-medium text-sm sm:text-lg">
            <LegendCircle color="#DB7706" />
            High Frequent Loss
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
