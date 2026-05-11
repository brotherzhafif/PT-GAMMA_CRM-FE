import CampaignStatusBadge from "./campaignStatusBadge";
import CampaignSegmentBadge from "./campaignSegmentBadge";

import {
  ChevronRight,
  MousePointerClick,
} from "lucide-react";

export default function CampaignRow({
  campaign,
}) {
  return (
    <tr className="group cursor-pointer border-b border-gray-200 transition hover:bg-muted/30">
      {/* CAMPAIGN */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium transition group-hover:text-emerald-600">
              {campaign.name}
            </h4>

            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
          </div>

          <p className="max-w-[260px] text-sm text-muted-foreground">
            {campaign.description}
          </p>
        </div>
      </td>

      {/* AUDIENCE */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-2">
          <CampaignSegmentBadge
            segment={campaign.segment}
          />

          <span className="text-xs text-muted-foreground">
            {campaign.audience}
          </span>
        </div>
      </td>

      {/* STATUS */}
      <td className="px-6 py-5">
        <CampaignStatusBadge
          status={campaign.status}
        />
      </td>

      {/* PERFORMANCE */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600">
              <MousePointerClick className="w-4 h-4" />
            </div>

            <div className="flex flex-col">
              <p className="font-medium">
                {campaign.performance}
              </p>

              <span className="text-xs text-muted-foreground">
                {campaign.clicked}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* DATE */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            {campaign.date}
          </span>

          <span className="text-xs text-muted-foreground">
            Scheduled Campaign
          </span>
        </div>
      </td>
    </tr>
  );
}