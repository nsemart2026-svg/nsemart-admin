"use client"

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export function DatePickerForm() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <form className="space-y-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-[240px] pl-3 text-left font-normal ${
              !date && "text-muted-foreground"
            }`}
          >
            {date ? format(date, "PPP") : <span>mm/dd/yyyy</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </form>
  );
}
