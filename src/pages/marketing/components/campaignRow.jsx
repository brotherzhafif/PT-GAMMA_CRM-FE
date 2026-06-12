import CampaignStatusBadge from "./campaignStatusBadge";
import CampaignSegmentBadge from "./campaignSegmentBadge";

import {
  ChevronRight,
  Pencil,
} from "lucide-react";

export default function CampaignRow({
  campaign,
  onEdit,
}) {
  return (
    <tr className="group border-b border-gray-300 transition hover:bg-muted/30">
      {/* CAMPAIGN */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium transition group-hover:text-emerald-600">
              {campaign.name}
            </h4>

            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
          </div>

          <p className="max-w-[320px] text-sm text-muted-foreground">
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

      {/* ACTIONS */}
      <td className="px-6 py-5">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() =>
              onEdit?.(campaign)
            }
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-muted hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}