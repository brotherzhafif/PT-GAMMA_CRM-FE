import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FrequencyFilter() {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
    >
      <BarChart3 className="w-4 h-4" />
      Frequency
    </Button>
  );
}