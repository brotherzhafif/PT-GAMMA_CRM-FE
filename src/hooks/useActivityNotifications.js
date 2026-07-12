import { useEffect, useMemo, useRef, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getAccessToken } from "@/services/auth.service";
import {
  markActivityRead,
  markAllActivityRead,
} from "@/services/notification.service";
import { useNotificationSound } from "@/hooks/useNotificationSound";
import { handleSSEUnauthorized } from "@/lib/sse";

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

const normalizeNotification = (item) => {
  if (!item) return null;

  return {
    id: item.id,
    title: item.title || item.action || item.category || "Notifikasi",
    message: item.message || item.description || "-",
    time: formatRelativeTime(
      item.created_at || item.createdAt || item.timestamp,
    ),
    unread: item.is_read === false || item.read === false,
    raw: item,
  };
};

export function useActivityNotifications({ soundSrc = null } = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initialized = useRef(false);
  const { play } = useNotificationSound(soundSrc);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.unread).length,
    [notifications],
  );

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const token = getAccessToken();
    const sseUrl = `${import.meta.env.VITE_API_URL}/api/activity/notifications`;

    const connectStream = async () => {
      try {
        await fetchEventSource(sseUrl, {
          method: "GET",
          headers: {
            Accept: "text/event-stream",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
          onopen(res) {
            if (handleSSEUnauthorized(res)) {
              return;
            }

            if (res.ok && active) {
              setLoading(false);
              setError("");
              return;
            }

            if (res.status >= 400 && res.status < 500 && res.status !== 429) {
              throw new Error(`Akses ditolak (Status: ${res.status})`);
            }
          },
          onmessage(event) {
            if (!active) return;
            try {
              const data = JSON.parse(event.data);
              const incomingItems = normalizeList(data)
                .map(normalizeNotification)
                .filter(Boolean);

              if (incomingItems.length === 0) return;

              setNotifications((prev) => {
                const uniqueNew = incomingItems.filter(
                  (newItem) =>
                    !prev.some((prevItem) => prevItem.id === newItem.id),
                );

                const newUnreadCount = uniqueNew.filter(
                  (item) => item.unread,
                ).length;

                if (initialized.current && newUnreadCount > 0) {
                  play();
                }

                initialized.current = true;

                return [...uniqueNew, ...prev];
              });
            } catch (err) {
              console.error("Gagal parsing SSE Notifikasi:", err);
            }
          },
          onerror(err) {
            if (active) {
              setError("Koneksi notifikasi terputus. Memulihkan...");
              setLoading(false);
            }
            throw err;
          },
        });
      } catch (err) {
        if (active && err.name !== "AbortError") {
          setError(`Gagal memuat notifikasi: ${err.message}`);
          setLoading(false);
        }
      }
    };

    connectStream();

    return () => {
      active = false;
      controller.abort();
    };
  }, [play]);

  const markRead = async (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif,
      ),
    );
    try {
      await markActivityRead(id);
    } catch (err) {
      console.error("Gagal update status read ke server:", err);
    }
  };

  const markAllRead = async () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false })),
    );

    try {
      await markAllActivityRead();
    } catch (err) {
      console.error("Gagal update semua status read ke server:", err);
    }
  };

  return {
    error,
    loading,
    markAllRead,
    markRead,
    notifications,
    unreadCount,
  };
}
