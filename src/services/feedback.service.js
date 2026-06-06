import { api } from "@/lib/axios";

export const getFeedbacks = async () => {
  const res = await api.get("/api/feedback");
  return res.data;
};

export const createFeedback = async (payload) => {
  const res = await api.post("/api/feedback", payload);
  return res.data;
};

export const getFeedbackDashboard = async () => {
  const res = await api.get("/api/feedback/dashboard");
  return res.data;
};
