import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MoreFilters() {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
    >
      <SlidersHorizontal className="w-4 h-4" />
      More Filters
    </Button>
  );
}