"use client";
import InputField from "@/components/shared/InputField";
import { Select } from "@/components/shared/Select";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToggle } from "@/hooks/useToggle";

const TargetingRules = () => {
  const [isWeekendOnly, toggleWeekendOnly] = useToggle(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Targeting Rules
          <p className="opacity-60 text-sm lg:text-base">
            Configure when and where to show the popup
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select label="Select Pages" options={["All Pages", "Home"]} />
        <Select
          label="Visitor Type"
          options={["New Visitor", "Returning Visitor"]}
        />
        <Select label="Traffic Source" options={["All", "Social"]} />
        <InputField label="Country Targeting" placeholder="US, UK..." />
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p>Weekend Only</p>
            <p className="text-xs opacity-60">Show only on weekends</p>
          </div>
          <ToggleSwitch checked={isWeekendOnly} onChange={toggleWeekendOnly} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetingRules;
