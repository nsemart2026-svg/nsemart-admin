import { MoreVertical, ArrowUpRight, ArrowDownRight } from "lucide-react";

export type StatCardProps = {
  title?: string;
  value?: number | string;
  changePercent?: number;
  timeframe?: string;
};

export function StatCard({
  title,
  value,
  changePercent,
  timeframe,
}: StatCardProps) {
  return (
    <div className="bg-black text-white rounded-2xl shadow-md p-4 max-w-full md:w-[270px] lg:w-full w-full md:h-[155px] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <h2 className="text-sm font-medium">{title || "Total Customers"}</h2>
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </div>
      <div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-semibold">{value ?? "0"}</span>
          <span
            className={`flex items-center text-sm font-medium ${
              (changePercent ?? 0) >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {(changePercent ?? 0) >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(changePercent ?? 0).toFixed(1)}%
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{timeframe || "Last 7 days"}</p>
      </div>
    </div>
  );
}