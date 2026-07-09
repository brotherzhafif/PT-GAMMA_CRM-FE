import { useEffect, useState, startTransition } from "react";
import { formatChatTime } from "@/lib/formatTime";
import {
  getChatMessagesStream,
  getMessageByPhoneNumber,
} from "@/services/unifiendBox.service";

const unwrapMessages = (response) => {
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;
  if (response?.data && typeof response.data === "object") return [response.data];
  if (response && typeof response === "object") return [response];
  return [];
};

const getSenderType = (msg = {}) => {
  if (msg.direction === "inbound") return "human";
  if (msg.source === "admin") return "human";

  return "ai";
};

export function useChatMessages(phone_number) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");

  const quickTemplates = {
    booking: `Halo Bapak/Ibu 😊

Mohon lengkapi data berikut untuk pendaftaran:

 Nama Lengkap:
 NIK:
 Tanggal Lahir (DD/MM/YYYY):
 Keluhan:
 Tanggal Kunjungan:

Terima kasih 🙏`,
  };

  const applyQuickTemplate = (type) => {
    const template = quickTemplates[type];

    if (!template) return;

    setDraftMessage(template);
  };

  const mapMessages = (data) => {
    return (data || [])
      .map((msg, i) => ({
        id: msg.id || `${msg.created_at}-${i}`,
        text: msg.message_text || "Teks kosong",
        sender: msg.direction === "inbound" ? "patient" : "agent",
        senderType: getSenderType(msg),
        time: msg.created_at ? formatChatTime(msg.created_at) : "",
        createdAt: msg.created_at,
        isEscalation: msg.is_escalation || false,
        isBotReturn: msg.is_bot_return || false,
      }))
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  };

  useEffect(() => {
    if (!phone_number) return;

    startTransition(() => {
      setLoading(true);
      setMessages([]);
    });

    let isActive = true;
    let es;

    const fetchInitialMessages = async () => {
      try {
        const response = await getMessageByPhoneNumber(phone_number);
        const initialMessages = mapMessages(unwrapMessages(response));

        if (isActive) {
          setMessages(initialMessages);
        }
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchInitialMessages();

    es = getChatMessagesStream(phone_number);

    es.onopen = () => {
      console.log("CHAT SSE CONNECTED");
    };

    const handleChatStream = (e) => {
      try {
        const data = JSON.parse(e.data);

        if (!data || (Array.isArray(data) && data.length === 0)) {
          setLoading(false);
          return;
        }

        if (Array.isArray(data)) {
          setMessages(mapMessages(data));
          setLoading(false);
        } else {
          const newMsg = mapMessages([data])[0];

          setMessages((prev) => {
            if (prev.some((msg) => msg.id === newMsg.id)) {
              return prev;
            }

            return [...prev, newMsg];
          });
        }
      } catch (err) {
        console.error("Chat SSE parse error:", err);
      }
    };

    es.addEventListener("initial", handleChatStream);
    es.addEventListener("update", handleChatStream);
    es.addEventListener("message", handleChatStream);
    es.addEventListener("new_message", handleChatStream);

    es.onerror = (err) => {
      console.error("CHAT SSE ERROR:", err);
      setLoading(false);
    };

    return () => {
      isActive = false;
      es.close();
    };
  }, [phone_number]);

  return {
    messages,
    loading,
    draftMessage,
    setDraftMessage,
    applyQuickTemplate,
  };
}
