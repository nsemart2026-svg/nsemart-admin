"use client";

import InputField from "@/components/shared/InputField";
import { Select } from "@/components/shared/Select";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
const CleanupSettings = () => {
  const [cleanup, setCleanup] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Cleanup Settings
          <p className="opacity-60 text-sm lg:text-base">
            Configure automatic cleanup and optimization
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p>Auto Cleanup</p>
            <p className="text-sm opacity-60">
              Automatically clean temporary files
            </p>
          </div>
          <ToggleSwitch checked={cleanup} onChange={setCleanup} />
        </div>

        <Select
          label="Cleanup Frequency"
          options={["Daily", "Weekly", "Monthly"]}
        />
        <InputField label="Log Retention (days)" placeholder="90" />
        <InputField label="Cache Cleanup Interval (hours)" placeholder="24" />
        <Button className="w-full">Run Cleanup Now</Button>
      </CardContent>
    </Card>
  );
};

export default CleanupSettings;
