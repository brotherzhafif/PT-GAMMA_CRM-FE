import { Badge } from "@/components/ui/badge";

export default function CampaignSegmentBadge({
  segment,
}) {
  return (
    <Badge
      variant="outline"
      className="border-gray-200 bg-gray-50 text-gray-700"
    >
      {segment}
    </Badge>
  );
}
