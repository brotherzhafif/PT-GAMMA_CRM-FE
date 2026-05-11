import { useMemo } from "react";

import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

export default function CampaignDatePicker({
  selectedDate,
  onDateChange,
}) {
  const formattedDate = useMemo(() => {
    if (!selectedDate) {
      return "Select schedule date";
    }

    return new Date(
      selectedDate
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [selectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-full justify-between border-gray-300 font-normal hover:bg-muted/40"
        >
          <span
            className={
              selectedDate
                ? "text-foreground"
                : "text-muted-foreground"
            }
          >
            {formattedDate}
          </span>

          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto rounded-2xl border border-gray-200 p-0 shadow-lg"
      >
        <Calendar
          mode="single"
          selected={
            selectedDate
              ? new Date(selectedDate)
              : undefined
          }
          onSelect={(date) =>
            onDateChange(date)
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}