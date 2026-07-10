import { api } from "@/lib/axios";

export const markActivityRead = async (id) => {
  const res = await api.put(`/api/activity/${id}/read`);
  return res.data;
};

export const markAllActivityRead = async () => {
  const res = await api.put("/api/activity/read-all");
  return res.data;
};