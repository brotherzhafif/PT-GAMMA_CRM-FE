import { useEffect, useMemo, useState, useRef } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getAccessToken } from "@/services/auth.service"; 

const normalizeList = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.data) return Array.isArray(data.data) ? data.data : [data.data];
  return [data];
};

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

const normalizeLoginLog = (item) => {
  const isSuccess = 
    item.message?.toLowerCase().includes("berhasil") || 
    String(item.action).toUpperCase() === "LOGIN";

  return {
    id: item.id,
    device: item.device || item.metadata?.device || "Unknown device",
    browser: item.browser || item.metadata?.browser || item.metadata?.user_agent || "-",
    ip: item.ip_address || item.ipAddress || item.ip || "-",
    location: item.location || item.metadata?.location || "-",
    time: formatRelativeTime(item.created_at || item.createdAt || item.timestamp),
    status: isSuccess ? "Success" : "Failed",
  };
};

const normalizeAuditLog = (item) => ({
  id: item.id,
  actor: item.from_actor || item.actor || item.user_name || "System",
  description: item.message || item.description || item.action || "-",
  action: item.action || item.category || "Activity",
  time: formatRelativeTime(item.created_at || item.createdAt || item.timestamp),
});

function useSSELogs(endpoint, normalizerFn, errorMessage) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    const controller = new AbortController();
    const sseUrl = `${import.meta.env.VITE_API_URL}${endpoint}`;

    const connectStream = async () => {
      const token = getAccessToken();

      try {
        await fetchEventSource(sseUrl, {
          method: "GET",
          headers: {
            "Accept": "text/event-stream",
            "Authorization": `Bearer ${token}`
          },
          signal: controller.signal,
          onopen(res) {
            if (res.ok && res.status >= 200 && res.status < 300) {
              if (activeRef.current) {
                setLoading(false);
                setError("");
              }
            } 
            else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
              throw new Error(`Akses ditolak (Status: ${res.status})`);
            }
          },
          onmessage(event) {
            if (!activeRef.current) return;
            try {
              const data = JSON.parse(event.data);
              const newLogs = normalizeList(data).map(normalizerFn);

              setLogs((prevLogs) => {
                const uniqueNewLogs = newLogs.filter(
                  (newLog) => !prevLogs.some((prevLog) => prevLog.id === newLog.id)
                );
                return [...uniqueNewLogs, ...prevLogs];
              });
            } catch (err) {
              console.error(`Gagal parsing data SSE dari ${endpoint}:`, err);
            }
          },
          onerror(err) {
            if (activeRef.current) {
              console.error(`SSE Error [${endpoint}]:`, err);
              setError(errorMessage);
            }
          }
        });
      } catch (err) {
        if (activeRef.current && err.name !== "AbortError") {
          setLoading(false);
          setError(`Gagal terhubung: ${err.message}`);
        }
      }
    };

    connectStream();

    return () => {
      activeRef.current = false;
      controller.abort(); 
    };
  }, [endpoint, normalizerFn, errorMessage]);

  return { error, loading, logs };
}

export function useLoginLogs() {
  return useSSELogs(
    "/api/activity/logins", 
    normalizeLoginLog, 
    "Koneksi log terputus. Sistem mencoba menghubungkan kembali..."
  );
}

export function useAuditLogs() {
  const { error, loading, logs } = useSSELogs(
    "/api/activity/audit", 
    normalizeAuditLog, 
    "Koneksi audit terputus. Sistem mencoba menghubungkan kembali..."
  );
  
  const visibleLogs = useMemo(() => logs.slice(0, 8), [logs]);

  return { error, loading, logs: visibleLogs };
}

