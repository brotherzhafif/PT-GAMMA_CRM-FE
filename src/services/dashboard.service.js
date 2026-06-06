import { api } from "@/lib/axios";

export const getDashboardSummary = async (params = {}) => {
  const res = await api.get("/api/analytics/summary", { params });
  return res.data;
};

export const getDashboardTimeseries = async (params = {}) => {
  const res = await api.get("/api/analytics/timeseries", { params });
  return res.data;
};

export const getDashboardInsights = async (params = {}) => {
  const res = await api.get("/api/analytics/insights", { params });
  return res.data;
};
