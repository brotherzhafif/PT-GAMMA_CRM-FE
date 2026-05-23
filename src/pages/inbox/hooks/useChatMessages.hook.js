import { useEffect, useState } from "react";
import { formatChatTime } from "@/utils/formatTime";
import { getChatMessagesStream } from "@/services/unifiendBox.service"; 

export function useChatMessages(phone_number) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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
        isBotReturn: msg.is_bot_return || false, 
      }))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };

  useEffect(() => {
    if (!phone_number) return;
    setLoading(true);
    setMessages([]);

    const es = getChatMessagesStream(phone_number); 

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
             if (prev.some(msg => msg.id === newMsg.id)) return prev;
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
    };

    return () => {
      es.close();
    };
  }, [phone_number]);

  return { messages, loading };
}