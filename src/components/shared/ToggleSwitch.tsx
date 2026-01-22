"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const ToggleSwitch = ({ checked, onChange, className }: ToggleSwitchProps) => {
  return (
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      className={cn(
        "data-[state=checked]:bg-[#2D367C]",
        "data-[state=unchecked]:bg-gray-300",
        className
      )}
    />
  );
};

export default ToggleSwitch;
