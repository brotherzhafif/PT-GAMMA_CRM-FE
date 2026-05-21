import { useEffect, useRef, useState } from "react";
import { formatChatTime } from "@/utils/formatTime";
import { getMessageByPhoneNumber } from "@/services/unifiendBox.service";

export function useChatMessages(phone_number) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFetchingRef = useRef(false);

  const mapMessages = (data) => {
    return (data || [])
      .map((msg, i) => ({
        id: msg.id || `${msg.created_at}-${i}`,
        text: msg.message_text || "Teks kosong",
        sender: msg.direction === "inbound" ? "patient" : "agent",
        senderType: msg.source === "system" ? "ai" : "human",
        time: msg.created_at ? formatChatTime(msg.created_at) : "",
        createdAt: msg.created_at,
        isEscalation: msg.is_escalation || false,
      }))
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  };

  const fetchMessages = async () => {
    if (!phone_number || isFetchingRef.current) return;

    try {
      isFetchingRef.current = true;
      const res = await getMessageByPhoneNumber(phone_number);
      setMessages(mapMessages(res));
    } catch (err) {
      console.error("Fetch messages error:", err);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!phone_number) return;
    setLoading(true);
    setMessages([]);

    const es = new EventSource(
      `https://ai-crm.brotherzhafif.my.id/api/messages/${phone_number}`,
    );

    es.onopen = () => {
      console.log("CHAT SSE CONNECTED");
    };

    es.onmessage = async (e) => {
      try {
        const parsed = JSON.parse(e.data);

        console.log("CHAT EVENT:", parsed);

        const { type, data } = parsed;

        if (type === "heartbeat") {
          await fetchMessages();
          return;
        }

        if (type === "initial" || type === "update") {
          setMessages(mapMessages(data));

          setLoading(false);
        }

        if (type === "new_message") {
          const newMsg = mapMessages([data])[0];

          setMessages((prev) => [...prev, newMsg]);
        }
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    es.onerror = (err) => {
      console.error("CHAT SSE ERROR:", err);
    };

    return () => {
      es.close();
    };
  }, [phone_number]);

  return {
    messages,
    loading,
  };
}
