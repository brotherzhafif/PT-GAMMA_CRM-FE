import { useEffect, useState } from "react";
import {
  getChatbotSettings,
  updateChatbotSettings,
} from "@/services/settings.service";
import { toast } from "sonner";
import {
  buildSystemPrompt,
  resolveSystemPromptSections,
} from "@/helpers/systemPrompt.helper";

const initialSettings = {
  ai_name: "",
  primary_language: "id",
  conversation_tone: "friendly",
  handoff_threshold: 70,
  handoff_message: "",
  ai_badge_enabled: true,
  system_prompt: "",
  // 6 section pecahan system_prompt
  persona_identity: "",
  capabilities: "",
  restrictions: "",
  mandatory_flow: "",
  general_rules: "",
  disclaimer: "",
  // knowledge base klinik
  lokasi: "",
  maps: "",
  biaya_pendaftaran: "",
  biaya_konsultasi: "",
  layanan_poli: "",
  layanan_khusus: "",
  layanan_penunjang: "",
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
        const data = response?.data || response || {};

        setSettings({
          ...initialSettings,
          ...data,
          ...resolveSystemPromptSections(data),
        });
      } catch (error) {
        console.error("Failed get chatbot settings:", error);
        setStatusMessage("Unable to load chatbot settings.");
        toast.error("Gagal memuat pengaturan chatbot", {
          description:
            error.response?.data?.message || error.message || "Coba muat ulang halaman.",
        });
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
        system_prompt: buildSystemPrompt(settings), // ini jadi 6 section di FE di BE tetep satu string
        lokasi: settings.lokasi,
        maps: settings.maps,
        biaya_pendaftaran: settings.biaya_pendaftaran,
        biaya_konsultasi: settings.biaya_konsultasi,
        layanan_poli: settings.layanan_poli,
        layanan_khusus: settings.layanan_khusus,
        layanan_penunjang: settings.layanan_penunjang,
      };

      const response = await updateChatbotSettings(payload);
      setSettings({
        ...settings,
        ...(response?.data || response || payload),
      });
      setStatusMessage("Settings saved.");
      toast.success("Pengaturan chatbot disimpan", {
        description: "Perubahan konfigurasi AI sudah aktif.",
      });
    } catch (error) {
      console.error("Failed update chatbot settings:", error);
      setStatusMessage("Unable to save chatbot settings.");
      toast.error("Gagal menyimpan pengaturan", {
        description:
          error.response?.data?.message || error.message || "Coba beberapa saat lagi.",
      });
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