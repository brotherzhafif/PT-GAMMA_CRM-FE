import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getAccessToken } from "@/services/auth.service";
import {
  getDashboardInsights,
  getDashboardMessagesChart,
  getDashboardOverview,
  getDashboardSourceBreakdown,
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

const emptyActivities = [];

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

const normalizeList = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.data) return Array.isArray(data.data) ? data.data : [data.data];
  return [data];
};

const toNumber = (value, fallback = 0) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

const formatDateParts = (date) => {
  if (!date) return undefined;
  const parsedDate = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return undefined;

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return { year, month, day };
};

const formatDateRangeParams = (date) => {
  const parts = formatDateParts(date);
  if (!parts) return {};

  const dateText = `${parts.year}-${parts.month}-${parts.day}`;

  return {
    start_date: `${dateText}T00:00:00`,
    end_date: `${dateText}T23:59:59`,
  };
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
  if (summary.cards) {
    const cardConfigs = [
      {
        key: "total_percakapan",
        title: "Total Percakapan",
        source: summary.cards.total_conversations,
      },
      {
        key: "total_respons_chatbot",
        title: "Total Respons Chatbot",
        source: summary.cards.chatbot_response,
      },
      {
        key: "total_respons_admin",
        title: "Total Respons Admin",
        source: summary.cards.admin_response,
      },
      {
        key: "konversi_booking",
        title: "Konversi Booking",
        source: summary.cards.booking_conversion,
      },
    ];

    return cardConfigs.map((config) => {
      const card = config.source ?? {};
      const trend = normalizeTrend(card.direction);
      const change = toNumber(card.change_percent);
      const sign = change > 0 ? "+" : "";

      return {
        key: config.key,
        title: config.title,
        value: formatValue(card.value, card.unit),
        graph: `${sign}${change.toFixed(1)}%`,
        trend,
        subtitle: "dibanding sebelumnya",
      };
    });
  }

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
  const points = toArray(timeseries.series ?? timeseries.titik);

  return {
    categories: points.map((point) => point.label || formatBucketLabel(point.mulai_bucket)),
    conversations: points.map((point) =>
      toNumber(point.unique_senders ?? point.inbound ?? point.total_percakapan),
    ),
    handlingCategories: [],
    ai: [],
    human: [],
  };
};

const normalizeSourceBreakdown = (sourceBreakdown = {}) => {
  const breakdown = toArray(sourceBreakdown.breakdown);
  const human = breakdown
    .filter((item) => item.source === "admin")
    .reduce((sum, item) => sum + toNumber(item.count), 0);
  const ai = breakdown
    .filter((item) => item.source !== "admin")
    .reduce((sum, item) => sum + toNumber(item.count), 0);

  return {
    handlingCategories: ["AI", "Human"],
    ai: [ai],
    human: [human],
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
      value: toNumber(item.jumlah ?? item.nilai ?? item.value ?? item.count),
      count: toNumber(item.jumlah ?? item.nilai ?? item.count ?? item.value),
    })),
  );
};

const normalizeInsights = (insights = {}) => {
  return {
    intents: normalizeIntentItems(
      insights.top_detected_intents ?? insights.intent_terdeteksi_teratas,
    ),
    lowConfidence: withPercent(
      toArray(
        insights.low_confidence_intents ?? insights.intent_kepercayaan_rendah,
      ).map((item) => ({
        label: item.intent || item.label || "Unknown",
        value: `${formatValue(item.estimated_confidence ?? item.value ?? item.count, "%")}`,
        count: toNumber(
          item.estimated_confidence ?? item.count ?? item.value,
        ),
      })),
    ),
    escalated: withPercent(
      toArray(insights.frequently_escalated ?? insights.sering_dieskalasi).map(
        (item) => ({
          label: item.topic || item.intent || item.label || "Unknown",
          value: toNumber(item.handoff_count ?? item.value ?? item.count),
          count: toNumber(item.handoff_count ?? item.count ?? item.value),
        }),
      ),
    ),
    notes: toArray(insights.catatan),
  };
};

const formatActivityTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const normalizeActivityType = (category) => {
  if (category === "appointments") return "booking";
  if (category === "handoff") return "handoff";
  if (category === "feedback") return "feedback";
  if (category === "patients") return "patients";
  if (category === "auth" || category === "system_config") return "system";
  if (category === "marketing") return "marketing";
  return "chat";
};

const normalizeActivities = (rawInput) => {
  const list = Array.isArray(rawInput) ? rawInput : toArray(rawInput?.activities);
  
  return list.filter(Boolean).map((item) => ({
    id: item.id,
    type: normalizeActivityType(item.category),
    title: item.action || item.category || "Aktivitas",
    desc: item.message || "-",
    time: formatActivityTime(item.created_at),
    status: item.category
      ? {
          label: item.category,
          color:
            item.category === "handoff"
              ? "yellow"
              : item.category === "system_config"
                ? "red"
                : "green",
        }
      : null,
  }));
};

export function useDashboardAnalytics({ date } = {}) {
  const [summary, setSummary] = useState({});
  const [timeseries, setTimeseries] = useState(emptyTimeseries);
  const [insights, setInsights] = useState(emptyInsights);
  const [activities, setActivities] = useState(emptyActivities);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [error, setError] = useState(null);

  const activeRef = useRef(true);

  const params = useMemo(() => {
    return formatDateRangeParams(date);
  }, [date]);

  const fetchAnalytics = useCallback(async () => {
    setLoadingAnalytics(true);
    setError(null);

    try {
      const [
        overviewResponse,
        messagesChartResponse,
        sourceBreakdownResponse,
        insightsResponse,
      ] = await Promise.all([
        getDashboardOverview(params),
        getDashboardMessagesChart({ ...params, group_by: "hour" }),
        getDashboardSourceBreakdown(params),
        getDashboardInsights(params),
      ]);

      setSummary(unwrap(overviewResponse));
      setTimeseries({
        ...normalizeTimeseries(unwrap(messagesChartResponse)),
        ...normalizeSourceBreakdown(unwrap(sourceBreakdownResponse)),
      });
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
      setLoadingAnalytics(false);
    }
  }, [params]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchAnalytics();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchAnalytics]);


  useEffect(() => {
    activeRef.current = true;
    const controller = new AbortController();
    const token = getAccessToken();

    const connectActivitiesStream = async () => {
      setActivities(emptyActivities);
      setLoadingActivities(true);
      
      try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/activity`);
        
        if (params.start_date) url.searchParams.append("start_date", params.start_date);
        if (params.end_date) url.searchParams.append("end_date", params.end_date);
        url.searchParams.append("limit", "50");

        await fetchEventSource(url.toString(), {
          method: "GET",
          headers: {
            "Accept": "text/event-stream",
            "Authorization": `Bearer ${token}`
          },
          signal: controller.signal,
          onopen(res) {
            if (res.ok && activeRef.current) {
              setLoadingActivities(false);
            } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
              throw new Error(`Akses ditolak (Status: ${res.status})`);
            }
          },
          onmessage(event) {
            if (!activeRef.current) return;
            try {
              const data = JSON.parse(event.data);
              
              const incomingItems = normalizeActivities(normalizeList(data));
              if (incomingItems.length === 0) return;

              setActivities((prev) => {
                const uniqueNew = incomingItems.filter(
                  (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id)
                );
                
                return [...uniqueNew, ...prev].slice(0, 50);
              });
            } catch (err) {
              console.error("Gagal parsing SSE dashboard activities:", err);
            }
          },
          onerror(err) {
            if (activeRef.current) {
              console.error("SSE Error Dashboard Activities:", err);
              setLoadingActivities(false);
            }
            throw err;
          }
        });
      } catch (err) {
        if (activeRef.current && err.name !== "AbortError") {
          console.error(`Gagal menghubungkan stream activities: ${err.message}`);
          setLoadingActivities(false);
        }
      }
    };

    connectActivitiesStream();

    return () => {
      activeRef.current = false;
      controller.abort();
    };
  }, [params]);


  const kpiCards = useMemo(() => normalizeSummaryCards(summary), [summary]);
  
  const loading = loadingAnalytics || loadingActivities; 

  return {
    activities,
    error,
    fetchAnalytics,
    insights,
    kpiCards,
    loading,
    summary,
    timeseries,
  };
}