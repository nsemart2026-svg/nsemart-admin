"use client";

import { Select } from "@/components/shared/Select";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";

const UpdateSettings = () => {
  const [update, setUpdate] = useState(true);
  const [notifications, setNotifications] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Update Settings
          <p className="opacity-60 text-sm lg:text-base">
            Configure system update preferences
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p>Auto Updates</p>
            <p className="text-sm opacity-60">
              Automatically install security updates
            </p>
          </div>
          <ToggleSwitch checked={update} onChange={setUpdate} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p>Update Notifications</p>
            <p className="text-sm opacity-60">
              Notify when updates are available
            </p>
          </div>
          <ToggleSwitch checked={notifications} onChange={setNotifications} />
        </div>
        <Select label="Update Channel" options={["Stable", "Beta", "Alpha"]} />
        <Select
          label="Maintenance Window"
          options={[
            "Night (2:00 AM - 6:00 AM)",
            "Weekend (Saturday 2:00 AM)",
            "Custom Schedule",
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default UpdateSettings;
