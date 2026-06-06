import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getDashboardInsights,
  getDashboardSummary,
  getDashboardTimeseries,
} from "@/services/dashboard.service";

const emptyTimeseries = {
  categories: [],
  conversations: [],
  handlingCategories: [],
  ai: [],
  human: [],
};

const emptyInsights = {
  intents: [],
  lowConfidence: [],
  escalated: [],
  notes: [],
};

const emptySummaryCards = [
  {
    kunci: "total_percakapan",
    judul: "Total Percakapan",
    nilai: 0,
    perubahan_persen: 0,
    arah_tren: "stabil",
    label_tren: "0.0% dibanding periode sebelumnya",
  },
  {
    kunci: "total_respons_chatbot",
    judul: "Total Respons Chatbot",
    nilai: 0,
    perubahan_persen: 0,
    arah_tren: "stabil",
    label_tren: "0.0% dibanding periode sebelumnya",
  },
  {
    kunci: "total_respons_admin",
    judul: "Total Respons Admin",
    nilai: 0,
    perubahan_persen: 0,
    arah_tren: "stabil",
    label_tren: "0.0% dibanding periode sebelumnya",
  },
  {
    kunci: "konversi_booking",
    judul: "Konversi Booking",
    nilai: 0,
    perubahan_persen: 0,
    arah_tren: "stabil",
    label_tren: "0.0% dibanding periode sebelumnya",
    satuan: "%",
  },
];

const unwrap = (response) => response?.data ?? response ?? {};

const toArray = (value) => (Array.isArray(value) ? value : []);

const toNumber = (value, fallback = 0) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

const formatDateParam = (date) => {
  if (!date) return undefined;
  const parsedDate = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return undefined;

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatBucketLabel = (bucket) => {
  if (!bucket) return "";
  const date = new Date(bucket);
  if (Number.isNaN(date.getTime())) return bucket;

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatValue = (value, unit) => {
  const numberValue = toNumber(value);
  const formattedValue = Number.isInteger(numberValue)
    ? numberValue.toLocaleString("id-ID")
    : numberValue.toLocaleString("id-ID", {
        maximumFractionDigits: 1,
      });

  return unit ? `${formattedValue}${unit}` : formattedValue;
};

const normalizeTrend = (trend) => {
  if (trend === "naik" || trend === "up") return "up";
  if (trend === "turun" || trend === "down") return "down";
  return "stable";
};

const normalizeSummaryCards = (summary = {}) => {
  const cards = toArray(summary.kartu);
  const sourceCards = cards.length > 0 ? cards : emptySummaryCards;

  return sourceCards.map((card) => {
    const trend = normalizeTrend(card.arah_tren);
    const change = toNumber(card.perubahan_persen);
    const sign = card.simbol_tren ?? (change > 0 ? "+" : "");

    return {
      key: card.kunci,
      title: card.judul || card.kunci,
      value: formatValue(card.nilai, card.satuan),
      graph: `${sign}${change.toFixed(1)}%`,
      trend,
      subtitle: card.label_tren || "dibanding periode sebelumnya",
    };
  });
};

const normalizeTimeseries = (timeseries = {}) => {
  const points = toArray(timeseries.titik);

  return {
    categories: points.map((point) => formatBucketLabel(point.mulai_bucket)),
    conversations: points.map((point) => toNumber(point.total_percakapan)),
    handlingCategories: points.map((point) => formatBucketLabel(point.mulai_bucket)),
    ai: points.map((point) => toNumber(point.total_respons_chatbot)),
    human: points.map((point) => toNumber(point.total_respons_admin)),
  };
};

const withPercent = (items) => {
  const max = Math.max(...items.map((item) => item.count), 0);

  return items.map((item) => ({
    ...item,
    percent: max > 0 ? Math.round((item.count / max) * 100) : 0,
  }));
};

const normalizeIntentItems = (items) => {
  return withPercent(
    toArray(items).map((item) => ({
      label: item.intent || item.label || item.nama || "Unknown",
      value: toNumber(item.jumlah ?? item.nilai ?? item.value),
      count: toNumber(item.jumlah ?? item.nilai ?? item.count),
    })),
  );
};

const normalizeInsights = (insights = {}) => {
  return {
    intents: normalizeIntentItems(insights.intent_terdeteksi_teratas),
    lowConfidence: normalizeIntentItems(insights.intent_kepercayaan_rendah),
    escalated: normalizeIntentItems(insights.sering_dieskalasi),
    notes: toArray(insights.catatan),
  };
};

export function useDashboardAnalytics({ date } = {}) {
  const [summary, setSummary] = useState({});
  const [timeseries, setTimeseries] = useState(emptyTimeseries);
  const [insights, setInsights] = useState(emptyInsights);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useMemo(() => {
    const selectedDate = formatDateParam(date);
    return selectedDate ? { date: selectedDate } : {};
  }, [date]);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [summaryResponse, timeseriesResponse, insightsResponse] =
        await Promise.all([
          getDashboardSummary(params),
          getDashboardTimeseries(params),
          getDashboardInsights(params),
        ]);

      setSummary(unwrap(summaryResponse));
      setTimeseries(normalizeTimeseries(unwrap(timeseriesResponse)));
      setInsights(normalizeInsights(unwrap(insightsResponse)));
    } catch (err) {
      console.warn("Dashboard analytics API failed:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil data analytics dashboard",
      );
      setSummary({});
      setTimeseries(emptyTimeseries);
      setInsights(emptyInsights);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchAnalytics();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchAnalytics]);

  const kpiCards = useMemo(() => normalizeSummaryCards(summary), [summary]);

  return {
    error,
    fetchAnalytics,
    insights,
    kpiCards,
    loading,
    summary,
    timeseries,
  };
}
