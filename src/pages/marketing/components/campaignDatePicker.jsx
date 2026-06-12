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

    const [year, month, day] =
      selectedDate.split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        Schedule Date
      </label>

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
                ? (() => {
                    const [year, month, day] =
                      selectedDate.split("-");

                    return new Date(
                      Number(year),
                      Number(month) - 1,
                      Number(day)
                    );
                  })()
                : undefined
            }
            onSelect={(date) => {
              if (!date) return;

              const year =
                date.getFullYear();

              const month = String(
                date.getMonth() + 1
              ).padStart(2, "0");

              const day = String(
                date.getDate()
              ).padStart(2, "0");

              onDateChange?.(
                `${year}-${month}-${day}`
              );
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}