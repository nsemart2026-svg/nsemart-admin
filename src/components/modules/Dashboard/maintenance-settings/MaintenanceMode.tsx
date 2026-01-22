"use client";

import InputField from "@/components/shared/InputField";
import { Textarea } from "@/components/shared/Textarea";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const MaintenanceMode = () => {
  const [enabled, setEnabled] = useState(true);
  const [admin, setAdmin] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Maintenance Mode
          <p className="opacity-60 text-sm lg:text-base">
            Enable or disable site maintenance mode
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex items-center justify-between bg-yellow-50 rounded-md p-4
        text-yellow-800"
        >
          <div>
            <p className="font-medium">Maintenance Mode</p>
            <p className="text-sm">Site is currently live</p>
          </div>
          <ToggleSwitch checked={enabled} onChange={setEnabled} />
        </div>
        <InputField
          label="Maintenance Page Title"
          placeholder="Site Under Maintenance"
        />

        <Textarea
          label="Maintenance Message"
          placeholder="We're currently performing scheduled maintenance. Please check back soon!"
        />
        <InputField label="Estimated Completion" type="date" />
        <div className="flex items-center justify-between">
          <div>
            <p>Allow Admin Access</p>
            <p className="text-sm opacity-60">
              Admins can access during maintenance
            </p>
          </div>
          <ToggleSwitch checked={admin} onChange={setAdmin} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceMode;
