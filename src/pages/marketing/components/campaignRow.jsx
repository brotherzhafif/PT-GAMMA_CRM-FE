import CampaignStatusBadge from "./campaignStatusBadge";
import CampaignSegmentBadge from "./campaignSegmentBadge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { ChevronRight, Pencil } from "lucide-react";

export default function CampaignRow({ campaign, onEdit }) {
  return (
    <TableRow className="group border-gray-200">
      <TableCell className="px-4 py-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium transition group-hover:text-emerald-600">
              {campaign.name}
            </h4>

            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
          </div>

          <p className="max-w-[320px] truncate text-xs text-muted-foreground">
            {campaign.description}
          </p>
        </div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="flex flex-col gap-2">
          <CampaignSegmentBadge segment={campaign.segment} />

          <span className="text-xs text-muted-foreground">
            {campaign.audience}
          </span>
        </div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <CampaignStatusBadge status={campaign.status} />
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{campaign.date}</span>

          <span className="text-xs text-muted-foreground">
            Scheduled Campaign
          </span>
        </div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(campaign)}
            className="h-8 cursor-pointer border border-gray-300 text-xs shadow-sm"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
