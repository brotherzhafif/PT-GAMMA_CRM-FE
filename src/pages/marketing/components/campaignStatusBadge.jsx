import { Badge } from "@/components/ui/badge";

export default function CampaignStatusBadge({ status }) {
  const statusClasses = {
    Draft: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Scheduled: "border-blue-200 bg-blue-50 text-blue-700",
    Sent: "border-amber-200 bg-amber-50 text-amber-700",
    Active: "border-teal-200 bg-teal-50 text-teal-700",
  };

  return (
    <Badge variant="outline" className={statusClasses[status]}>
      {status}
    </Badge>
  );
}
