import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function VisitFilter({ value, onChange }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 shadow-md sm:w-auto"
        >
          <CalendarDays className="w-4 h-4" />
          {value || "Last Visit"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <div className="grid gap-3">
          <Input type="date" value={value} onChange={(event) => onChange(event.target.value)} />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            className="border border-gray-300 shadow-sm"
          >
            Clear Date
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
