import { ScrollArea } from "@/components/ui/scroll-area";
import AIPersona from "./components/aiPersone";
import HybridAI from "./components/hybridAI";
import Transparancy from "./components/transparancy";

export default function ChatbotSettings() {
  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">AI Chatbot Settings</h3>
        <p className="text-xs text-gray-500">
          Configure how the AI assistant interacts with your patients and when
          it escalates to a human.
        </p>
      </div>

      <ScrollArea className="flex-1 flex-col w-full">
        <div className="flex flex-col gap-5 w-full pr-4">
            <AIPersona />
            <HybridAI />
            <Transparancy />
        </div>
      </ScrollArea>
    </div>
  );
}
