export default function CampaignStatusBadge({
  status,
}) {
  const statusClasses = {
    Draft:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",

    Scheduled:
      "bg-blue-100 text-blue-700 border border-blue-200",

    Sent:
      "bg-amber-100 text-amber-700 border border-amber-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        statusClasses[status]
      }`}
    >
      {status}
    </span>
  );
}