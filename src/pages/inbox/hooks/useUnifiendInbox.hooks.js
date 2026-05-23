import { useEffect, useState } from "react";
import { formatChatTime } from "@/utils/formatTime";
import { getLatestMessagesStream } from "@/services/unifiendBox.service"; 

export const useUnifiedInbox = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const es = getLatestMessagesStream(50); 

    es.onopen = () => {
      console.log("INBOX SSE CONNECTED");
      setLoading(false);
    };

    const handleSSEData = (e) => {
      try {
        const data = JSON.parse(e.data);
        const isArray = Array.isArray(data);
        const dataArray = isArray ? data : [data];

        const mappedChats = dataArray.map((msg) => ({
          id: msg.sender_number,
          name: msg.name || msg.sender_number,
          phone: msg.sender_number,
          last: msg.message_text || "Belum ada pesan",
          time: formatChatTime(msg.created_at),
          createdAt: msg.created_at,
          status: msg.is_handoff ? "needs-human" : "ai-handled",
          unread: msg.direction === "inbound" ? 1 : 0,
          channel: "whatsapp",
          isVip: false,
          direction: msg.direction,
          source: msg.source,
        }));

        if (isArray) {
          mappedChats.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setChats(mappedChats);
        } else {
          setChats((prevChats) => {
            const newChat = mappedChats[0];
            const existingIndex = prevChats.findIndex((c) => c.phone === newChat.phone);
            
            if (existingIndex !== -1) {
               const updatedList = [...prevChats];
               if (newChat.direction === "inbound") {
                   newChat.unread = updatedList[existingIndex].unread + 1;
               }
               updatedList.splice(existingIndex, 1);
               return [newChat, ...updatedList];
            }
            return [newChat, ...prevChats];
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("SSE parse error:", err);
        setError(err);
      }
    };

    es.addEventListener("initial", handleSSEData);
    es.addEventListener("update", handleSSEData);
    es.addEventListener("message", handleSSEData);

    es.onerror = (err) => {
      console.error("SSE error:", err);
      setError(err);
      setLoading(false);
    };

    return () => {
      es.close();
    };
  }, []);

  return { chats, loading, error };
};