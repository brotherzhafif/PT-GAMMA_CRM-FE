import { useEffect, useMemo, useState } from "react";
import { getAuditLogs, getLoginLogs } from "@/services/notification.service";

const normalizeList = (data) => (Array.isArray(data) ? data : data?.data || []);

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return "";

  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return "Baru saja";
  if (diffMinutes < 60) return `${diffMinutes} menit lalu`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} jam lalu`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return `${diffDays} hari lalu`;

  return new Date(timestamp).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getErrorMessage = (error, fallback) =>
  error.response?.data?.detail || error.response?.data?.message || fallback;

const normalizeLoginLog = (item) => ({
  id: item.id,
  device: item.device || item.metadata?.device || "Unknown device",
  browser: item.browser || item.metadata?.browser || item.metadata?.user_agent || "-",
  ip: item.ip_address || item.ipAddress || item.ip || "-",
  location: item.location || item.metadata?.location || "-",
  time: formatRelativeTime(item.created_at || item.createdAt || item.timestamp),
  status:
    item.status ||
    item.metadata?.status ||
    (String(item.action || "").toLowerCase().includes("failed")
      ? "Failed"
      : "Success"),
});

const normalizeAuditLog = (item) => ({
  id: item.id,
  actor: item.from_actor || item.actor || item.user_name || "System",
  description: item.message || item.description || item.action || "-",
  action: item.action || item.category || "Activity",
  time: formatRelativeTime(item.created_at || item.createdAt || item.timestamp),
});

export function useLoginLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getLoginLogs()
      .then((data) => {
        if (!active) return;
        setLogs(normalizeList(data).map(normalizeLoginLog));
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(getErrorMessage(err, "Gagal memuat login logs."));
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { error, loading, logs };
}

export function useAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getAuditLogs()
      .then((data) => {
        if (!active) return;
        setLogs(normalizeList(data).map(normalizeAuditLog));
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(getErrorMessage(err, "Gagal memuat audit logs."));
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleLogs = useMemo(() => logs.slice(0, 8), [logs]);

  return { error, loading, logs: visibleLogs };
}
