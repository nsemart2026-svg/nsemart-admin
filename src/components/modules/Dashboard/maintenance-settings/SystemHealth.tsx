import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const usageMetrics = [
  { label: "CPU Usage", value: 45 },
  { label: "Memory Usage", value: 62 },
  { label: "Disk Usage", value: 78 },
];

const statusIndicators = [
  { label: "Database: Online", color: "bg-green-500" },
  { label: "API Responding", color: "bg-green-500" },
];

const SystemHealth = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          System Health
          <p className="opacity-60 text-sm lg:text-base">
            Monitor system health and performance
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Usage Metrics */}
        {usageMetrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{metric.label}</span>
              <span>{metric.value}%</span>
            </div>
            <Progress
              value={metric.value}
              className="h-2 [&>div]:bg-green-500"
            />
          </div>
        ))}

        {/* Status Indicators */}
        <div className="flex gap-6 text-sm mt-8">
          {statusIndicators.map((status) => (
            <div key={status.label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
              {status.label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
