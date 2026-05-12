import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VisitFilter() {
  return (
    <Button
      variant="ghost"
      className="flex shadow-md items-center gap-2"
    >
      <CalendarDays className="w-4 h-4" />
      Last Visit
    </Button>
  );
}