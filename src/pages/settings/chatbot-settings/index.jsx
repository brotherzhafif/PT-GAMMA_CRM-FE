import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AIPersona from "./components/aiPersone";
import HybridAI from "./components/hybridAI";
// import Transparancy from "./components/transparancy";
import { useChatbotSettings } from "./hooks/useChatbotSettings";
import KnowledgeBase from "./components/KnowledgeBase";

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
    <div className="flex flex-col gap-5 mb-10 px-3 py-3 sm:px-4 sm:gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-lg font-semibold sm:text-xl">
            AI Chatbot Settings
          </h3>
          <p className="text-xs leading-4 text-gray-500">
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
          className="w-full sm:w-auto sm:min-w-28"
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <ScrollArea className="flex-1 flex-col w-full">
        <div className="flex flex-col gap-5 w-full pr-0 sm:pr-4">
          <AIPersona
            settings={settings}
            onChange={handleChange}
            disabled={disabled}
          />
          <KnowledgeBase
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
