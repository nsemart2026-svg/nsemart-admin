"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { subDays, startOfYear, endOfYear, format } from "date-fns";
import { ArrowRightLeft, CalendarIcon } from "lucide-react";
interface SelectPeriodProps {
  onChange?: (range: { start: string; end: string }) => void;
}
export default function SelectPeriod({ onChange }: SelectPeriodProps) {
  const [from, setFrom] = React.useState<Date | undefined>(subDays(new Date(), 7));
  const [to, setTo] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  const [displayRange, setDisplayRange] = React.useState<string>("Select Period");

  const setPreset = (preset: string) => {
    const today = new Date();
    switch (preset) {
      case "Today":
        setFrom(today);
        setTo(today);
        break;
      case "Yesterday":
        setFrom(subDays(today, 1));
        setTo(subDays(today, 1));
        break;
      case "Last 7 Days":
        setFrom(subDays(today, 6));
        setTo(today);
        break;
      case "Last 30 Days":
        setFrom(subDays(today, 29));
        setTo(today);
        break;
      case "This Year":
        setFrom(startOfYear(today));
        setTo(endOfYear(today));
        break;
      case "Last Year":
        const lastYear = new Date(today.getFullYear() - 1, 0, 1);
        setFrom(startOfYear(lastYear));
        setTo(endOfYear(lastYear));
        break;
    }
  };

  const handleSetDate = () => {
    if (from && to) {
      const formattedRange = {
        start: format(from, "yyyy-MM-dd"),
        end: format(to, "yyyy-MM-dd"),
      };
      setDisplayRange(`${format(from, "dd/MM/yyyy")} - ${format(to, "dd/MM/yyyy")}`);

      // Pass selected range to parent
      if (onChange) {
        onChange(formattedRange);
      }

      setOpen(false); // Close popover
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button  className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          {displayRange}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex gap-4 p-4 w-auto" align="start">
        {/* Left Sidebar */}
        <div className="flex flex-col border-r pr-4 min-w-[160px] text-sm">
          {["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Year", "Last Year"].map(
            (label) => (
              <button
                key={label}
                className="py-2 px-2 text-left hover:bg-gray-100 rounded"
                onClick={() => setPreset(label)}
              >
                {label}
              </button>
            )
          )}
          <div className="mt-2 font-medium">Custom Date Range</div>
        </div>

        {/* Right - Two Calendars */}
        <div className="flex gap-4 items-center">
          {/* From Date */}
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={from}
              onSelect={(date) => setFrom(date)}
              month={from}
              onMonthChange={(month) => setFrom(month)}
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                readOnly
                value={from ? format(from, "dd/MM/yyyy") : ""}
                className="border rounded px-2 py-1 text-sm w-28 text-center"
              />
              <Button
                size="sm"
                onClick={handleSetDate}
                className="text-xs"
              >
                Set Date
              </Button>
            </div>
          </div>
          <ArrowRightLeft/>
          {/* To Date */}
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={to}
              onSelect={(date) => setTo(date)}
              month={to}
              onMonthChange={(month) => setTo(month)}
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                readOnly
                value={to ? format(to, "dd/MM/yyyy") : ""}
                className="border rounded px-2 py-1 text-sm w-28 text-center"
              />
              <Button
                size="sm"
                onClick={handleSetDate}
                className="text-xs"
              >
                Set Date
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
