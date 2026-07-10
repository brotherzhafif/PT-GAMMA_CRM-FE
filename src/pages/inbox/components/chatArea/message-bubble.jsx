import { Bot, User, Check, CheckCheck } from "lucide-react";

const getFullImageUrl = (url) => {
  if (!url) return "";
  if (/^(https?:|blob:|data:)/i.test(url)) return url;
  const baseUrl = import.meta.env.VITE_API_URL || "";
  const separator = url.startsWith("/") ? "" : "/";
  return `${baseUrl}${separator}${url}`;
};

export default function MessageBubble({ msg }) {
  const isMe = msg.sender === "agent";
  const isAi = msg.senderType === "ai";
  const hasImage = Boolean(msg.imageUrl);

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3 gap-2`}>
      {!isMe && (
        <div className="flex items-end flex-shrink-0">
          <div className="bg-muted rounded-full p-1.5">
            {isAi ? (
              <Bot className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <User className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </div>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
        {isMe && isAi && (
          <div className="flex items-center gap-1 px-1">
            <Bot className="w-3 h-3 text-green-600" />
            <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">
              KlinikCare AI
            </span>
          </div>
        )}

        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${
            isMe
              ? isAi
                ? "bg-green-50 text-green-900 border border-green-100 rounded-tr-sm"
                : "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm"
          }`}
        >
          {/* Render Gambar jika ada */}
          {hasImage && (
            <div className="mb-2 overflow-hidden rounded-md border border-black/10 bg-black/5">
              <img
                src={getFullImageUrl(msg.imageUrl)}
                alt="Attachment"
                className="max-h-64 w-auto max-w-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          {/* Render Teks jika tidak kosong */}
          {msg.text && <div>{msg.text}</div>}
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
            {isAi ? (
              <Bot className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <User className="w-3.5 h-3.5 text-primary-foreground" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}