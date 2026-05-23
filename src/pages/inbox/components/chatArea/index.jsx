import ChatHeader from "./chat-header";
import MessageBubble from "./message-bubble";
import MessageInput from "./message-input";
import StatusDivider from "./statusDivider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { useChatMessages } from "../../hooks/useChatMessages.hook";

const TypingBubble = () => {
  return (
    <div className="flex justify-start mb-3 gap-2">
      <div className="flex items-end flex-shrink-0">
        <div className="bg-muted rounded-full p-1.5">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <div className="px-4 py-3.5 rounded-2xl bg-muted rounded-tl-sm flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};

export default function ChatArea({
  chat,
  onToggleProfile,
  showProfilePanel,
}) {
  const { messages, loading } = useChatMessages(chat?.phone);
  const bottomRef = useRef(null);
  const [isTyping] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-foreground">No conversation selected</p>
          <p className="text-sm text-muted-foreground mt-1">Pick a chat from the inbox to start messaging</p>
        </div>
      </div>
    );
  }

  let currentAgentHandler = "ai"; 

  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader
        chat={chat}
        onToggleProfile={onToggleProfile}
        showProfilePanel={showProfilePanel}
        isTyping={isTyping}
      />

      {loading && (
        <div className="px-4 py-2 text-xs text-muted-foreground">Loading messages...</div>
      )}

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="px-4 py-4">
            <div className="flex justify-center my-3">
              <Badge variant="secondary" className="text-xs font-normal px-3 py-0.5 rounded-full">
                Today
              </Badge>
            </div>

            <div className="space-y-1">
              {messages.map((msg) => {
                let showEscalation = msg.isEscalation;
                let showBotReturn = msg.isBotReturn;

                if (msg.sender === "agent") {
                  if (msg.senderType === "human" && currentAgentHandler === "ai") {
                    showEscalation = true;
                    currentAgentHandler = "human";
                  } else if (msg.senderType === "ai" && currentAgentHandler === "human") {
                    showBotReturn = true;
                    currentAgentHandler = "ai";
                  } else {
                    currentAgentHandler = msg.senderType;
                  }
                }

                return (
                  <div key={msg.id}>
                    {showEscalation && <StatusDivider type="human" />}
                    {showBotReturn && <StatusDivider type="bot" />}
                    <MessageBubble msg={msg} />
                  </div>
                );
              })}

              {isTyping && <TypingBubble />}
              <div ref={bottomRef} />
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="px-4 py-2 border-gray-400 border-t flex gap-2 flex-shrink-0 overflow-x-auto">
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shadow-md cursor-pointer border-gray-300 rounded-md px-3 py-1.5 hover:bg-muted transition-colors flex-shrink-0">
          Reschedule
        </button>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shadow-md cursor-pointer border-gray-300 rounded-md px-3 py-1.5 hover:bg-muted transition-colors flex-shrink-0">
          Send Reminder
        </button>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shadow-md cursor-pointer border-gray-300 rounded-md px-3 py-1.5 hover:bg-muted transition-colors flex-shrink-0">
          Send Form
        </button>
      </div>

      <MessageInput chat={chat} />
    </div>
  );
}