import { api } from "@/lib/axios";

const SSE_BASE_URL = `${import.meta.env.VITE_API_URL}/api/messages`;

export const getMessages = async () => {
  const res = await api.get("/api/messages");
  return res.data;
};

export const getLatestMessages = async () => {
  const res = await api.get("/api/messages/latest");
  return res.data;
};

export const getMessageByPhoneNumber = async (phone_number) => {
  const res = await api.get(`/api/messages/${phone_number}`);
  return res.data;
};

export const sendMessage = async (payload) => {
  const res = await api.post("/api/send", payload);
  return res.data;
};

export const sendMessageBroadcast = async (payload) => {
  const res = await api.post("/api/send/broadcast", payload);
  return res.data;
};

export const getHandoff = async () => {
  const res = await api.get("/api/handoff");
  return res.data;
};

export const createHandoffByPhoneNumber = async (phone_number) => {
  const res = await api.post(`/api/handoff/${phone_number}`);
  return res.data;
};

export const deleteHandoffByPhoneNumber = async (phone_number) => {
  const res = await api.delete(`/api/handoff/${phone_number}`);
  return res.data;
};

export const createReplyHandoffByPhoneNumber = async (
  phone_number,
  payload,
) => {
  const res = await api.post(`/api/handoff/${phone_number}/reply`, payload);
  return res.data;
};

// stream function
export const getLatestMessagesStream = (limit = 50) => {
  return new EventSource(`${SSE_BASE_URL}/latest?limit=${limit}`);
};

export const getChatMessagesStream = (phone_number) => {
  return new EventSource(`${SSE_BASE_URL}/${phone_number}`);
};
