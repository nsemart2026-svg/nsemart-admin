"use client";

import InputField from "@/components/shared/InputField";
import { Textarea } from "@/components/shared/Textarea";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const MainPopupConfig = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Main Popup Configuration
          <p className="opacity-60 text-sm lg:text-base">
            Basic popup settings and activation
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex items-center justify-between bg-blue-100 rounded-md p-4
        text-blue-600"
        >
          <div>
            <p className="font-medium">Enable Popup</p>
            <p className="text-sm ">Show promotional popup to visitors</p>
          </div>
          <ToggleSwitch checked={enabled} onChange={setEnabled} />
        </div>
        <InputField label="Popup Title" placeholder="Special Offer!" />
        <InputField
          label="Subtitle"
          placeholder="Subscribe to our mailing list"
        />
        <Textarea
          label="Main Message"
          placeholder="Get 20% off your order..."
        />
        <InputField label="Button Text" placeholder="Claim Offer" />
        <InputField label="Button Link" placeholder="https://..." />
      </CardContent>
    </Card>
  );
};

export default MainPopupConfig;
