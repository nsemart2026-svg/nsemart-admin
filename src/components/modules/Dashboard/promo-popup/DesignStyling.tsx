"use client";
import InputField from "@/components/shared/InputField";
import { Select } from "@/components/shared/Select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const DesignStyling = () => {
  const [scrollValue, setScrollValue] = useState([80]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Design & Styling
          <p className="opacity-60 text-sm lg:text-base">
            Customize popup appearance and colors
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select label="Popup Size" options={["Small", "Medium", "Large"]} />
        <Select label="Position" options={["Center", "Bottom"]} />
        <InputField
          label="Background Color"
          type="color"
          defaultValue="#ffffff"
        />
        <InputField label="Text Color" type="color" defaultValue="#000000" />
        <InputField label="Button Color" type="color" defaultValue="#000000" />

        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="opacity-90">Overlay Opacity: {scrollValue[0]}%</p>
          </div>
          <Slider
            defaultValue={scrollValue}
            max={100}
            step={1}
            onValueChange={setScrollValue}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignStyling;
