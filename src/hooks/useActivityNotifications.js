import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getActivityNotifications,
  markActivityRead,
  markAllActivityRead,
} from "@/services/activity.service";
import { useNotificationSound } from "@/hooks/useNotificationSound";

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

const normalizeNotification = (item) => ({
  id: item.id,
  title: item.title || item.action || item.category || "Notifikasi",
  message: item.message || item.description || "-",
  time: formatRelativeTime(item.created_at || item.createdAt || item.timestamp),
  unread: item.is_read === false || item.read === false,
  raw: item,
});

export function useActivityNotifications({
  pollInterval = 30000,
  soundSrc = null,
} = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const previousUnreadCount = useRef(0);
  const initialized = useRef(false);
  const { play } = useNotificationSound(soundSrc);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.unread).length,
    [notifications],
  );

  const loadNotifications = useCallback(async () => {
    try {
      const data = await getActivityNotifications();
      const nextNotifications = normalizeList(data).map(normalizeNotification);
      const nextUnreadCount = nextNotifications.filter((item) => item.unread).length;

      if (initialized.current && nextUnreadCount > previousUnreadCount.current) {
        play();
      }

      previousUnreadCount.current = nextUnreadCount;
      initialized.current = true;
      setNotifications(nextNotifications);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Gagal memuat notifikasi.",
      );
    } finally {
      setLoading(false);
    }
  }, [play]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (active) {
        await loadNotifications();
      }
    };

    load();

    const intervalId = window.setInterval(load, pollInterval);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [loadNotifications, pollInterval]);

  const markRead = async (id) => {
    await markActivityRead(id);
    await loadNotifications();
  };

  const markAllRead = async () => {
    await markAllActivityRead();
    await loadNotifications();
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
