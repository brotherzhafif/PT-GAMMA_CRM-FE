import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function PatientQuickActions({ patient, onMessage }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <Button
        type="button"
        onClick={() => onMessage?.(patient)}
        disabled={!patient?.phone}
        className="flex h-auto cursor-pointer flex-col gap-1 py-3 shadow-md"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs">Message</span>
      </Button>
    </div>
  );
}
