"use client";
import InputField from "@/components/shared/InputField";
import { Select } from "@/components/shared/Select";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToggle } from "@/hooks/useToggle";

const ABTesting = () => {
  const [isABTestingEnabled, toggleABTesting] = useToggle(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          A/B Testing
          <p className="opacity-60 text-sm lg:text-base">
            Configure popup variations for testing
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p>Enable A/B Testing</p>
            <p className="text-xs opacity-60">Test different popup versions</p>
          </div>
          <ToggleSwitch
            checked={isABTestingEnabled}
            onChange={toggleABTesting}
          />
        </div>
        <Select label="Split Traffic" options={["50%", "70%"]} />
        <InputField
          label="Variant B Message"
          placeholder="Alternative message"
        />
        <InputField
          label="Test Duration (days)"
          type="number"
          placeholder="30"
        />
      </CardContent>
    </Card>
  );
};

export default ABTesting;
