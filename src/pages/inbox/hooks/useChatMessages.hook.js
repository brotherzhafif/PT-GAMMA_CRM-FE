import { useEffect, useState } from "react";
import { getMessageByPhoneNumber } from "@/services/unifiendBox.service";
import { formatChatTime } from "@/utils/formatTime"; 

export function useChatMessages(phone_number) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phone_number) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await getMessageByPhoneNumber(phone_number);

        const mapped = (res || []).map((msg, i) => ({
          id: msg.id || i,
          text: msg.message_text || "Teks kosong",
          sender: msg.direction === "inbound" ? "patient" : "agent",
          senderType: msg.source === "system" ? "ai" : "human",
          time: msg.created_at ? formatChatTime(msg.created_at) : "",
          isEscalation: msg.is_escalation || false,
        }));

        setMessages(mapped);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [phone_number]);

  return { messages, loading };
}