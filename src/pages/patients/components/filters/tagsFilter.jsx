import { Tags } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TagsFilter() {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
    >
      <Tags className="w-4 h-4" />
      Tags
    </Button>
  );
}