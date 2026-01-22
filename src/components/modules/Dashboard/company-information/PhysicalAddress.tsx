"use client";
import InputField from "@/components/shared/InputField";
import { Select } from "@/components/shared/Select";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToggle } from "@/hooks/useToggle";
import React from "react";

const PhysicalAddress = () => {
  const [isPhysicalAddressEnabled, togglePhysicalAddress] = useToggle(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Physical Address
          <p className="opacity-60 text-sm lg:text-base">
            Company headquarters and mailing address
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputField label="Street Address" placeholder="123 Business Ave" />
        <InputField label="Address Line 2" placeholder="Suite 100 (optional)" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputField label="City" placeholder="Business City" />
          <InputField label="State/Province" placeholder="State" />
          <InputField label="Postal Code" placeholder="123 " />
          <Select label="Country" options={["USA", "BD"]} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p>Same as Billing Address</p>
            <p className="text-sm opacity-60">Use for billing purposes</p>
          </div>
          <ToggleSwitch
            checked={isPhysicalAddressEnabled}
            onChange={togglePhysicalAddress}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhysicalAddress;
