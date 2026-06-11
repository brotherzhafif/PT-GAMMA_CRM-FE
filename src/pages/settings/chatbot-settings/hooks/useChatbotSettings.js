import { useEffect, useState } from "react";
import {
  getChatbotSettings,
  updateChatbotSettings,
} from "@/services/settings.service";

const initialSettings = {
  ai_name: "",
  primary_language: "id",
  conversation_tone: "friendly",
  handoff_threshold: 70,
  handoff_message: "",
  ai_badge_enabled: true,
};

export function useChatbotSettings() {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await getChatbotSettings();
        setSettings({
          ...initialSettings,
          ...(response?.data || response),
        });
      } catch (error) {
        console.error("Failed get chatbot settings:", error);
        setStatusMessage("Unable to load chatbot settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setStatusMessage("");

      const payload = {
        ai_name: settings.ai_name,
        primary_language: settings.primary_language,
        conversation_tone: settings.conversation_tone,
        handoff_threshold: Number(settings.handoff_threshold),
        handoff_message: settings.handoff_message,
        ai_badge_enabled: settings.ai_badge_enabled,
      };

      const response = await updateChatbotSettings(payload);
      setSettings({
        ...settings,
        ...(response?.data || response || payload),
      });
      setStatusMessage("Settings saved.");
    } catch (error) {
      console.error("Failed update chatbot settings:", error);
      setStatusMessage("Unable to save chatbot settings.");
    } finally {
      setSaving(false);
    }
  };

  return {
    disabled: loading || saving,
    handleChange,
    handleSave,
    loading,
    saving,
    settings,
    statusMessage,
  };
}
