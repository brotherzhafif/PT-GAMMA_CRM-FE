import { useEffect, useState } from "react";

import { formatChatTime } from "@/utils/formatTime";

export const useUnifiedInbox = () => {
  const [chats, setChats] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const es = new EventSource(
      "https://ai-crm.brotherzhafif.my.id/api/messages/latest",
    );

    es.onopen = () => {
      console.log("INBOX SSE CONNECTED");

      setLoading(false);
    };

    es.onmessage = (e) => {
      console.log("RAW SSE:", e.data);
      try {
        const parsed = JSON.parse(e.data);

        console.log("EVENT TYPE:", parsed.type);
        console.log(parsed);
        const { type, data } = parsed;
        // ignore heartbeat
        if (type === "heartbeat") {
          return;
        }

        // initial load
        if (type === "initial") {
          const mappedChats = (data || []).map((msg) => ({
            id: msg.sender_number,
            name: msg.name || msg.sender_number,
            phone: msg.sender_number,
            last: msg.message_text || "Belum ada pesan",
            time: formatChatTime(msg.created_at),
            createdAt: msg.created_at,
            status: msg.is_handoff ? "needs-human" : "ai-handled",
            unread: 0,
            channel: "whatsapp",
            isVip: false,
            direction: msg.direction,
            source: msg.source,
          }));

          mappedChats.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

          setChats(mappedChats);

          setLoading(false);

          return;
        }

        // realtime update
        if (type === "update") {
          setChats((prevChats) => {
            const phone = data.sender_number;

            const existingChat = prevChats.find((chat) => chat.phone === phone);

            // update existing chat
            if (existingChat) {
              const updated = prevChats.map((chat) => {
                if (chat.phone !== phone) return chat;

                return {
                  ...chat,

                  last: data.message_text,

                  time: formatChatTime(data.created_at),

                  createdAt: data.created_at,

                  status: data.is_handoff ? "needs-human" : "ai-handled",

                  unread:
                    data.direction === "inbound"
                      ? chat.unread + 1
                      : chat.unread,
                };
              });

              // move top
              const selected = updated.find((x) => x.phone === phone);

              return [selected, ...updated.filter((x) => x.phone !== phone)];
            }

            // new chat
            const newChat = {
              id: phone,

              name: data.name || phone,

              phone,

              last: data.message_text,

              time: formatChatTime(data.created_at),

              createdAt: data.created_at,

              status: data.is_handoff ? "needs-human" : "ai-handled",

              unread: data.direction === "inbound" ? 1 : 0,

              channel: "whatsapp",

              isVip: false,

              direction: data.direction,

              source: data.source,
            };

            return [newChat, ...prevChats];
          });

          return;
        }
      } catch (err) {
        console.error("SSE parse error:", err);

        setError(err);

        setLoading(false);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error:", err);

      setError(err);

      setLoading(false);
    };

    return () => {
      es.close();
    };
  }, []);

  return {
    chats,
    loading,
    error,
  };
};
