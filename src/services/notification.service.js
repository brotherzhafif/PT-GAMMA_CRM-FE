import { api } from "@/lib/axios";

export const getActivityLogs = async () => {
  const res = await api.get("/api/activity");
  return res.data;
};

export const getActivityNotifications = async () => {
  const res = await api.get("/api/activity/notifications");
  return res.data;
};

export const getAuditLogs = async () => {
  const res = await api.get("/api/activity/audit");
  return res.data;
};

export const getLoginLogs = async () => {
  const res = await api.get("/api/activity/logins");
  return res.data;
};

export const markActivityRead = async (id) => {
  const res = await api.put(`/api/activity/${id}/read`);
  return res.data;
};

export const markAllActivityRead = async () => {
  const res = await api.put("/api/activity/read-all");
  return res.data;
};
