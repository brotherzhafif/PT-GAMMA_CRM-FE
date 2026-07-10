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
  const res = await api.get(`/api/messages/${encodeURIComponent(phone_number)}`);
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

export const sendMediaMessage = async (payload) => {
  const formData = new FormData();
  formData.append("target", payload.target); 
  
  if (payload.message) {
    formData.append("message", payload.message);
  }
  
  if (payload.file) {
    formData.append("file", payload.file); 
  }

  const res = await api.post("/api/send/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// stream function
export const getLatestMessagesStream = (limit) => {
  const url = limit ? `${SSE_BASE_URL}/latest?limit=${limit}` : `${SSE_BASE_URL}/latest`;
  return new EventSource(url);
};

export const getChatMessagesStream = (phone_number) => {
  return new EventSource(`${SSE_BASE_URL}/${encodeURIComponent(phone_number)}`);
};
