import { api } from "@/lib/axios";

export const getDashboardOverview = async (params = {}) => {
  const res = await api.get("/api/analytics/overview", { params });
  return res.data;
};

export const getDashboardMessagesChart = async (params = {}) => {
  const res = await api.get("/api/analytics/messages/chart", { params });
  return res.data;
};

export const getDashboardSourceBreakdown = async (params = {}) => {
  const res = await api.get("/api/analytics/source-breakdown", { params });
  return res.data;
};

export const getDashboardInsights = async (params = {}) => {
  const res = await api.get("/api/analytics/insights", { params });
  return res.data;
};

export const getDashboardActivities = async (params = {}) => {
  const res = await api.get("/api/analytics/activities", { params });
  return res.data;
};
