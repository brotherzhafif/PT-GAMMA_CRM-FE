import { Button } from "@/components/ui/button";
import {
  Calendar,
  MessageCircle,
  NotebookPen,
} from "lucide-react";

export default function PatientQuickActions() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button className="flex flex-col gap-1 h-auto py-3 cursor-pointer shadow-md">
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs">Message</span>
      </Button>

      <Button
        variant="ghost"
        className="flex flex-col gap-1 h-auto py-3 cursor-pointer shadow-md"
      >
        <Calendar className="w-4 h-4" />
        <span className="text-xs">Book</span>
      </Button>

      <Button
        variant="default"
        className="flex flex-col gap-1 h-auto py-3 cursor-pointer shadow-md"
      >
        <NotebookPen className="w-4 h-4" />
        <span className="text-xs">Note</span>
      </Button>
    </div>
  );
}