import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AIPersona from "./components/aiPersone";
import HybridAI from "./components/hybridAI";
// import Transparancy from "./components/transparancy";
import { useChatbotSettings } from "./hooks/useChatbotSettings";

export default function ChatbotSettings() {
  const {
    disabled,
    handleChange,
    handleSave,
    loading,
    saving,
    settings,
    statusMessage,
  } = useChatbotSettings();

  return (
    <div className="flex flex-col gap-6 mb-10 px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold">AI Chatbot Settings</h3>
          <p className="text-xs text-gray-500">
            Configure how the AI assistant interacts with your patients and when
            it escalates to a human.
          </p>
          {statusMessage && (
            <p className="text-xs text-muted-foreground">{statusMessage}</p>
          )}
        </div>

        <Button
          onClick={handleSave}
          disabled={loading || saving}
          className="min-w-28"
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <ScrollArea className="flex-1 flex-col w-full">
        <div className="flex flex-col gap-5 w-full pr-4">
            <AIPersona
              settings={settings}
              onChange={handleChange}
              disabled={disabled}
            />
            <HybridAI
              settings={settings}
              onChange={handleChange}
              disabled={disabled}
            />
            {/* <Transparancy
              settings={settings}
              onChange={handleChange}
              disabled={disabled}
            /> */}
        </div>
      </ScrollArea>
    </div>
  );
}
