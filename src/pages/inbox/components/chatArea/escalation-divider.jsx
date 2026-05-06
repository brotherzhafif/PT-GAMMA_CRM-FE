import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export default function EscalationDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 border-t border-dashed border-red-300" />
      <Badge
        variant="outline"
        className="border-red-300 text-red-500 bg-red-50 text-[10px] font-semibold tracking-wider px-3 py-1 flex items-center gap-1.5"
      >
        <AlertTriangle className="w-3 h-3" />
        ESCALATED TO HUMAN AGENT
      </Badge>
      <div className="flex-1 border-t border-dashed border-red-300" />
    </div>
  );
}