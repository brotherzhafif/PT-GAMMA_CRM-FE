export const formatChatTime = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.toDateString() ===
    now.toDateString();

  const isYesterday =
    new Date(now.setDate(now.getDate() - 1))
      .toDateString() ===
    date.toDateString();

  // jam (09:45)
  const time = date.toLocaleTimeString(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  if (isToday) return time;

  if (isYesterday) return "Yesterday";

  // fallback tanggal
  return date.toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
    }
  );
};