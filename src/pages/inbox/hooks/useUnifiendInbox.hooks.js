import { useEffect, useState } from "react";
import { getPatients, getLatestMessages } from "@/services/unifiendBox.service"; 
import { formatChatTime } from "@/utils/formatTime";

export const useUnifiedInbox = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const [patientsResponse, latestMessagesResponse] = await Promise.all([
        getPatients(),
        getLatestMessages()
      ]);

      const mappedChats = patientsResponse.map((patient) => {
        const lastMsg = (latestMessagesResponse || []).find(
          (msg) => 
            msg.sender_number === patient.phone_number || 
            msg.phone_number === patient.phone_number
        );

        return {
          id: patient.id,
          name: patient.name,
          phone: patient.phone_number,
          last: lastMsg?.message_text || "Belum ada pesan",
          time: formatChatTime(lastMsg?.created_at || patient.created_at),
          status: "ai-handled",
          unread: 0,
          channel: "whatsapp",
          isVip: false,
        };
      });

      setChats(mappedChats);
    } catch (err) {
      console.error("Fetch chats error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    loading,
    error,
    refetch: fetchChats,
  };
};