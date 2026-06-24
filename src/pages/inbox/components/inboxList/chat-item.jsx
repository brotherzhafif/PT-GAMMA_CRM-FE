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

const truncateText = (value = "", maxLength) => {
  if (value.length <= maxLength) return value;

  return `${value.slice(0, maxLength)}...`;
};

export default function ChatItem({ chat, isSelected, onClick }) {
  const badge = statusConfig[chat.status];

  const isHumanHandled = chat.status === "needs-human" || chat.status === "human";
  const showUnread = chat.unread > 0 && isHumanHandled;
  const displayName = chat.title || chat.name || "-";
  const displayLastMessage = chat.last || "";

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

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex min-w-0 items-center gap-2">
          <p
            className={`min-w-0 basis-0 flex-1 truncate text-sm font-medium ${
              showUnread ? "font-bold text-gray-900" : ""
            }`}
            title={displayName}
          >
            {truncateText(displayName, 16)}
          </p>

          <span
            className={`shrink-0 whitespace-nowrap text-xs ${
              showUnread ? "font-bold text-green-600" : "text-muted-foreground"
            }`}
          >
            {chat.time}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <p
            className={`min-w-0 basis-0 flex-1 truncate text-xs ${
              showUnread ? "font-medium text-gray-800" : "text-muted-foreground"
            }`}
            title={displayLastMessage}
          >
            {truncateText(displayLastMessage, 20)}
          </p>

          {showUnread && (
            <Badge className="flex h-4 min-w-4 shrink-0 animate-pulse items-center justify-center rounded-full bg-green-500 px-1 text-[10px] text-white hover:bg-green-500">
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
