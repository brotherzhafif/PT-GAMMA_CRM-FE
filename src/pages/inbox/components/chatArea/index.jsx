import ChatHeader from "./chat-header";
import MessageBubble from "./message-bubble";
import MessageInput from "./message-input";
import EscalationDivider from "./escalation-divider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";

import { useChatMessages } from "../../hooks/useChatMessages.hook";

export default function ChatArea({
  chat,
  onToggleProfile,
  showProfilePanel,
}) {
  const { messages, loading } =
    useChatMessages(chat?.phone);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>

        <div>
          <p className="font-medium text-foreground">
            No conversation selected
          </p>

          <p className="text-sm text-muted-foreground mt-1">
            Pick a chat from the inbox to
            start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader
        chat={chat}
        onToggleProfile={
          onToggleProfile
        }
        showProfilePanel={
          showProfilePanel
        }
      />

      {loading && (
        <div className="px-4 py-2 text-xs text-muted-foreground">
          Loading messages...
        </div>
      )}

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="px-4 py-4">
            <div className="flex justify-center my-3">
              <Badge
                variant="secondary"
                className="text-xs font-normal px-3 py-0.5 rounded-full"
              >
                Today
              </Badge>
            </div>

            <div className="space-y-1">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.isEscalation && (
                    <EscalationDivider />
                  )}

                  <MessageBubble
                    msg={msg}
                  />
                </div>
              ))}

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

      <MessageInput />
    </div>
  );
}