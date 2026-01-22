"use client";

import InputField from "@/components/shared/InputField";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const MonitoringSettings = () => {
  const [performance, setPerformance] = useState(true);
  const [error, setError] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Monitoring Settings
          <p className="opacity-60 text-sm lg:text-base">
            Configure system monitoring and alerts
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p>Performance Monitoring</p>
            <p className="text-sm opacity-60">Monitor system performance</p>
          </div>
          <ToggleSwitch checked={performance} onChange={setPerformance} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p>Error Tracking</p>
            <p className="text-sm opacity-60">Track and log system errors</p>
          </div>
          <ToggleSwitch checked={error} onChange={setError} />
        </div>
        <InputField label="CPU Alert Threshold (%)" placeholder="80" />
        <InputField label="Memory Alert Threshold (%)" placeholder="85" />
        <InputField label="Alert Email" placeholder="admin@example.com" />
      </CardContent>
    </Card>
  );
};

export default MonitoringSettings;
