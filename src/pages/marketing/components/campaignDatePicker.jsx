import { useMemo } from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const getDateParts = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return {
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDate(),
    };
  }

  const [dateValue] = String(value).split("T");
  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) return null;

  return { year, month, day };
};

const getDateFromValue = (value) => {
  const parts = getDateParts(value);

  if (!parts) return undefined;

  return new Date(parts.year, parts.month - 1, parts.day);
};

export default function CampaignDatePicker({ selectedDate, onDateChange }) {
  const date = getDateFromValue(selectedDate);

  const formattedDate = useMemo(() => {
    if (!date) {
      return "Select schedule date";
    }

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [date]);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs font-medium">Schedule Date</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-10 w-full justify-between px-3 font-normal hover:bg-muted/40"
          >
            <span className={date ? "text-foreground" : "text-muted-foreground"}>
              {formattedDate}
            </span>

            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto rounded-lg p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => {
              if (!selected) return;

              const year = selected.getFullYear();
              const month = String(selected.getMonth() + 1).padStart(2, "0");
              const day = String(selected.getDate()).padStart(2, "0");

              onDateChange?.(`${year}-${month}-${day}`);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
