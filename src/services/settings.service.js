import { api } from "@/lib/axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getHealthCheck = async () => {
  const res = await api.get("/");
  return res.data;
};

export const getChatbotSettings = async () => {
  const res = await api.get("/api/chatbot-settings");
  return res.data;
};

export const updateChatbotSettings = async (payload) => {
  const res = await api.put("/api/chatbot-settings", payload);
  return res.data;
};

export const getWhatsAppConnectionStream = () => {
  return new EventSource(`${API_BASE_URL}/api/status/whatsapp-connection`);
};

export const getRmeConnectionStream = () => {
  return new EventSource(`${API_BASE_URL}/api/status/rme-connection`);
};
