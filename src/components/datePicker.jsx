import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

export default function DatePicker({ value, onChange, className }) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(value || new Date());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "relative w-full cursor-pointer rounded-md shadow-sm sm:w-64",
            className,
          )}
        >
          <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          </div>

          <Input
            readOnly
            value={value ? formatDate(value) : ""}
            placeholder="Pick a date"
            className="pl-10 h-10"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          month={month}
          onMonthChange={setMonth}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
