import ChatHeader from "./chat-header";
import MessageBubble from "./message-bubble";
import MessageInput from "./message-input";
import EscalationDivider from "./escalation-divider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const messages = [
  { id: 1, text: "Hi, I need to book a dental checkup.", from: "user", senderType: "human", time: "09:30 AM" },
  { id: 2, text: "Hello! I can help you with that. We have slots available today at 2 PM or tomorrow at 10 AM. Which one works for you?", from: "me", senderType: "ai", time: "09:30 AM", seen: true },
  { id: 3, text: "Tomorrow at 10 AM please. Also, I have a slight toothache on the right side.", from: "user", senderType: "human", time: "09:32 AM" },
  { id: 4, text: "I need to escalate this to a human agent for special pricing", from: "me", senderType: "ai", isEscalation: true, time: "09:33 AM" },
  { id: 5, text: "Hi there! I'm handling your request now.", from: "me", senderType: "human", time: "09:35 AM" },
  { id: 6, text: "Great! Can I get a discount for annual package?", from: "user", senderType: "human", time: "09:36 AM" },
];

export default function ChatArea({ chat, onToggleProfile, showProfilePanel }) {
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

  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader
        chat={chat}
        onToggleProfile={onToggleProfile}
        showProfilePanel={showProfilePanel}
      />

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full ">
          <div className="px-4 py-4">
            <div className="flex justify-center my-3">
              <Badge variant="secondary" className="text-xs font-normal px-3 py-0.5 rounded-full">
                Today
              </Badge>
            </div>

            <div className="space-y-1">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.isEscalation && <EscalationDivider />}
                  <MessageBubble msg={msg} />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="px-4 py-2 border-gray-400 border-t flex gap-2 flex-shrink-0 overflow-x-auto">
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shadow-md cursor-pointer border-gray-300 rounded-md px-3 py-1.5 hover:bg-muted transition-colors flex-shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Reschedule
        </button>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shadow-md cursor-pointer border-gray-300 rounded-md px-3 py-1.5 hover:bg-muted transition-colors flex-shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Send Reminder
        </button>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shadow-md cursor-pointer border-gray-300 rounded-md px-3 py-1.5 hover:bg-muted transition-colors flex-shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Send Form
        </button>
      </div>

      <MessageInput />
    </div>
  );
}