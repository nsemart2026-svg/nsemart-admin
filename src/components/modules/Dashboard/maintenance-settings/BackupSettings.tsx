"use client";

import InputField from "@/components/shared/InputField";
import { Select } from "@/components/shared/Select";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const BackupSettings = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Backup Settings
          <p className="opacity-60 text-sm lg:text-base">
            Configure automatic backup schedules
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p>Auto Backup</p>
            <p className="text-sm opacity-60">Enable automatic backups</p>
          </div>
          <ToggleSwitch checked={enabled} onChange={setEnabled} />
        </div>
        <Select
          label="Backup Frequency"
          options={["Daily", "Weekly", "Monthly", "Manual"]}
        />
        <InputField label="Backup Time" type="time" />
        <InputField label="Retention Period (days)" placeholder="30" />

        <div
          className="flex justify-between bg-green-50 rounded-md p-4
        text-green-800"
        >
          <div>
            <p className="text-sm font-medium">Last Backup</p>
            <p className="text-xs ">backup-2024-01-15-02-00.sql.gz (2.4 MB)</p>
          </div>
          <p className="text-xs">2 hours ago</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackupSettings;
