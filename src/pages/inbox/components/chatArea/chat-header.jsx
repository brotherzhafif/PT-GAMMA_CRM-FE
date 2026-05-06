import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Phone, UserPlus } from "lucide-react";

export default function ChatHeader({ chat, onToggleProfile, showProfilePanel }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 pb-3  shadow-sm">
      <div
        className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity select-none "
        onClick={onToggleProfile}
        title={showProfilePanel ? "Hide profile" : "Show profile"}
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback className="text-xs">
            {chat.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm leading-tight">{chat.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span className="text-xs text-muted-foreground">WhatsApp</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
          <UserPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Assign to You</span>
        </Button>


        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
          <Phone className="w-4 h-4 text-muted-foreground" />
        </Button>


        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer h-8 text-xs border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
        >
          Mark Resolved
        </Button>
      </div>
    </div>
  );
}