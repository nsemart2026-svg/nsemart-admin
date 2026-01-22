"use client";

import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { formatDate, parseDate, presets } from "@/data/datePresets";

type Props = {
  selectedRange: [Date, Date];
  onSelectRange: (range: [Date, Date], label: string) => void;
};

const DateFilterPopover = ({ selectedRange, onSelectRange }: Props) => {
  const [open, setOpen] = useState(false);
  const [customRange, setCustomRange] = useState<DateRange>();
  const [showCustom, setShowCustom] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("Last 7 Days");

  const handlePresetClick = (range: [Date, Date], label: string) => {
    onSelectRange(range, label);
    setCustomRange(undefined);
    setShowCustom(false);
    setSelectedPreset(label);
    setOpen(false);
  };

  const handleInputChange = (field: "from" | "to", value: string) => {
    const date = parseDate(value);
    setCustomRange((prev) => ({
      from: field === "from" ? date : prev?.from,
      to: field === "to" ? date : prev?.to,
    }));
  };

  const handleConfirmCustom = () => {
    if (customRange?.from && customRange?.to) {
      onSelectRange([customRange.from, customRange.to], "Custom Range");
      setSelectedPreset("Custom Range");
      setOpen(false);
      setShowCustom(false);
    }
  };

  const formattedLabel = `${selectedRange
    .map((d) => formatDate(d))
    .join(" - ")}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>{formattedLabel}</Button>
      </PopoverTrigger>

      <PopoverContent className="w-full max-w-md md:max-w-[550px] p-4 overflow-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2 w-40">
            {presets.map(({ label, range }) => (
              <Button
                key={label}
                variant={selectedPreset === label ? "default" : "ghost"}
                className="justify-start text-left rounded-none"
                onClick={() => handlePresetClick(range, label)}
              >
                {label}
              </Button>
            ))}
            <Button
              variant={selectedPreset === "Custom Range" ? "default" : "ghost"}
              className="justify-start text-left rounded-none"
              onClick={() => {
                setShowCustom(true);
                setSelectedPreset("Custom Range");
              }}
            >
              Custom Range
            </Button>
          </div>

          {showCustom && (
            <div className="pt-2 border-t mt-2 space-y-3">
              <Calendar
                mode="range"
                selected={customRange}
                onSelect={setCustomRange}
                numberOfMonths={1}
                className="w-full"
              />

              <div className="flex gap-2 items-center">
                {["from", "to"].map((field) => (
                  <fieldset
                    key={field}
                    className="relative w-full border border-gray-300 rounded-md px-3"
                  >
                    <legend className="text-xs font-medium text-gray-700 px-1 capitalize">
                      {field}
                    </legend>
                    <Input
                      value={formatDate(customRange?.[field as "from" | "to"])}
                      onChange={(e) =>
                        handleInputChange(
                          field as "from" | "to",
                          e.target.value
                        )
                      }
                      placeholder="yyyy-MM-dd"
                      className="w-full border-0 p-0 m-0 focus:ring-0 focus:outline-none"
                    />
                  </fieldset>
                ))}
                <Button
                  onClick={handleConfirmCustom}
                  disabled={!customRange?.from || !customRange?.to}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilterPopover;
