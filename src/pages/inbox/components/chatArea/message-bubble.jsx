import { Bot, User, Check, CheckCheck } from "lucide-react";

export default function MessageBubble({ msg }) {
  const isMe = msg.from === "me";
  const isAi = msg.senderType === "ai";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3 gap-2`}>
      {!isMe && (
        <div className="flex items-end flex-shrink-0">
          <div className="bg-muted rounded-full p-1.5">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
        {isMe && isAi && (
          <div className="flex items-center gap-1 px-1">
            <Bot className="w-3 h-3 text-green-600" />
            <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">KlinikCare AI</span>
          </div>
        )}

        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
            ${isMe
              ? isAi
                ? "bg-green-50 text-green-900 border border-green-100 rounded-tr-sm"
                : "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm"
            }`}
        >
          {msg.text}
        </div>

        <div className={`flex items-center gap-1 px-1 ${isMe ? "flex-row-reverse" : ""}`}>
          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
          {isMe && msg.seen && <CheckCheck className="w-3 h-3 text-green-500" />}
          {isMe && !msg.seen && <Check className="w-3 h-3 text-muted-foreground" />}
        </div>
      </div>

      {isMe && (
        <div className="flex items-end flex-shrink-0">
          <div className={`rounded-full p-1.5 ${isAi ? "bg-green-100" : "bg-primary"}`}>
            {isAi
              ? <Bot className="w-3.5 h-3.5 text-green-600" />
              : <User className="w-3.5 h-3.5 text-primary-foreground" />
            }
          </div>
        </div>
      )}
    </div>
  );
}