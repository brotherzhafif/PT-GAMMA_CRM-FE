import { useState, useCallback, useEffect, useMemo } from "react";
import { getFeedbacks, createFeedback, getFeedbackDashboard } from "@/services/feedback.service";

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return [value];
  return [];
};

const mapBackendFeedback = (item, idx) => {
  const patientName = item?.nama || item?.patientName || "Pasien";
  const phone = item?.no_hp || item?.phone || "";
  const rating = Number(item?.rating) || 0;
  const comment = item?.ulasan || item?.comment || "";
  const id = item?.id || item?._id || idx + 1;
  const avatar = patientName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "P";
  const email = item?.email || "-";
  const category = item?.category || item?.kategori || "-";
  const sentiment = item?.sentiment || (rating >= 4 ? "Positive" : rating <= 2 ? "Negative" : "Neutral");
  const source = item?.source || item?.sumber || "-";
  const status = item?.status || "Pending";
  const date = item?.date || item?.tanggal || "-";
  const replies = item?.replies || [];

  return {
    id,
    patientName,
    avatar,
    phone,
    email,
    rating,
    category,
    sentiment,
    source,
    status,
    date,
    comment,
    replies
  };
};

export function useFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalizedFeedbacks = useMemo(() => {
    return feedbacks.map((item, idx) => mapBackendFeedback(item, idx));
  }, [feedbacks]);

  // Fetch Feedback list
  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFeedbacks();
      // Handle response structures: backend might return wrapped `{ data: [...] }` or raw array
      const rawData = response?.data || response;
      const list = toArray(rawData);

      setFeedbacks(list);
    } catch (err) {
      console.warn("Feedback API failed:", err);
      setFeedbacks([]);
      setError(err.response?.data?.message || err.message || "Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Dashboard Stats
  const fetchDashboardStats = useCallback(async () => {
    try {
      const response = await getFeedbackDashboard();
      const stats = response?.data || response;
      setDashboardStats(stats);
    } catch (err) {
      console.warn("Feedback dashboard stats API failed:", err);
      setDashboardStats(null);
    }
  }, []);

  // Submit Feedback
  const addFeedback = useCallback(async (payload) => {
    setLoading(true);
    try {
      // Map payload to backend keys
      const backendPayload = {
        nama: payload.patientName,
        no_hp: payload.phone,
        rating: payload.rating,
        ulasan: payload.comment
      };
      
      const response = await createFeedback(backendPayload);
      const created = response?.data || response;
      
      // Update local state
      setFeedbacks((prev) => [created || payload, ...prev]);
      
      // Refresh statistics
      fetchDashboardStats();
      return response;
    } catch (err) {
      console.error("Failed to post feedback:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchDashboardStats]);

  // Reply locally (canned / custom answers)
  const addReplyLocal = useCallback((feedbackId, replyText, channel) => {
    setFeedbacks((prev) =>
      prev.map((f) => {
        if (f.id === feedbackId) {
          const newReply = {
            id: Date.now(),
            sender: `Clinic Admin (via ${channel})`,
            message: replyText,
            date: new Date().toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) + ", " + new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            })
          };
          return {
            ...f,
            status: "Replied",
            replies: [...(f.replies || []), newReply]
          };
        }
        return f;
      })
    );
  }, []);

  // Update status locally
  const updateStatusLocal = useCallback((feedbackId, newStatus) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === feedbackId ? { ...f, status: newStatus } : f))
    );
  }, []);

  // Initialize
  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchFeedbacks();
      fetchDashboardStats();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchFeedbacks, fetchDashboardStats]);

  return {
    feedbacks: normalizedFeedbacks,
    dashboardStats,
    loading,
    error,
    fetchFeedbacks,
    fetchDashboardStats,
    addFeedback,
    addReplyLocal,
    updateStatusLocal
  };
}
