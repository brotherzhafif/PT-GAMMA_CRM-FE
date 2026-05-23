import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const statusConfig = {
  escalated: {
    label: "ESCALATED",
    className: "bg-red-100 text-red-600 border-red-200 hover:bg-red-100",
  },
  "needs-human": {
    label: "NEEDS HUMAN",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  },
  "ai-handled": {
    label: "AI HANDLED",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },
  human: {
    label: "HUMAN",
    className: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  },
};

const channelDotColor = {
  whatsapp: "bg-green-500",
  sms: "bg-blue-500",
};

export default function ChatItem({ chat, isSelected, onClick }) {
  const badge = statusConfig[chat.status];

  const isHumanHandled = chat.status === "needs-human" || chat.status === "human";
  const showUnread = chat.unread > 0 && isHumanHandled;

  return (
    <div
      onClick={() => onClick(chat)}
      className={`flex items-start gap-3 px-4 py-2 cursor-pointer shadow-sm border-b border-gray-300 transition-colors overflow-hidden
    ${isSelected ? "bg-green-50" : "hover:bg-muted/50"}`}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback className="text-xs font-medium">
            {chat.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
            channelDotColor[chat.channel] || "bg-gray-400"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="flex items-center gap-1 min-w-0">
          <p className={`font-medium text-sm truncate flex-1 min-w-0 ${showUnread ? "text-gray-900 font-bold" : ""}`}>
            {chat.name}
          </p>
          <span className={`text-xs flex-shrink-0 whitespace-nowrap ${showUnread ? "text-green-600 font-bold" : "text-muted-foreground"}`}>
            {chat.time}
          </span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <p
            className={`text-xs truncate flex-1 min-w-0 ${showUnread ? "text-gray-800 font-medium" : "text-muted-foreground"}`}
            title={chat.last}
          >
            {chat.last?.length > 23
              ? `${chat.last.slice(0, 23)}......`
              : chat.last}
          </p>

          {showUnread && (
            <Badge className="h-4 min-w-4 px-1 flex items-center justify-center bg-green-500 hover:bg-green-500 text-white text-[10px] rounded-full flex-shrink-0 animate-pulse">
              {chat.unread}
            </Badge>
          )}
        </div>
        {badge && (
          <div className="mt-0.5">
            <Badge
              variant="outline"
              className={`text-[10px] px-1.5 py-0 h-4 font-semibold tracking-wide ${badge.className}`}
            >
              {badge.label}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}