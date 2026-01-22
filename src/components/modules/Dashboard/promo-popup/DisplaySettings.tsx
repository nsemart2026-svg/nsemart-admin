"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select } from "@/components/shared/Select";
import InputField from "@/components/shared/InputField";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { useToggle } from "@/hooks/useToggle";

const DisplaySettings = () => {
  const [scrollValue, setScrollValue] = useState([50]);

  const [closeOnBgClick, toggleCloseOnBgClick] = useToggle(false);
  const [showCloseButton, toggleShowCloseButton] = useToggle(false);

  const toggles = [
    {
      label: "Close on Background Click",
      subtext: "Allow Closing by Pressing Esc",
      value: closeOnBgClick,
      toggle: toggleCloseOnBgClick,
    },
    {
      label: "Show Close Button",
      subtext: "Display X Button on Popup",
      value: showCloseButton,
      toggle: toggleShowCloseButton,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Display Settings
          <p className="opacity-60 text-sm lg:text-base">
            Configure when and how the popup appears
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select label="Trigger Type" options={["Time", "Scroll"]} />
        <InputField label="Delay (seconds)" type="number" placeholder="5" />

        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="opacity-90">Scroll Percentage: {scrollValue[0]}%</p>
          </div>
          <Slider
            defaultValue={scrollValue}
            max={100}
            step={1}
            onValueChange={setScrollValue}
          />
        </div>

        <Select label="Show Frequency" options={["Daily", "Weekly"]} />
        <div className="flex flex-col gap-4 w-full">
          {toggles.map(({ label, subtext, value, toggle }, index) => (
            <div key={index} className="flex justify-between space-x-2">
              <div className="text-sm">
                <p>{label}</p>
                <p className="text-xs opacity-60">{subtext}</p>
              </div>
              <ToggleSwitch checked={value} onChange={toggle} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplaySettings;
