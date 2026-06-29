import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Eye } from "lucide-react";

import CampaignFileUpload from "./campaignFileUpload";
import CampaignStatusBadge from "./campaignStatusBadge";

const getCampaignAttachment = (campaign) => {
  if (!campaign?.raw?.attachment_url) return null;

  return {
    url: campaign.raw.attachment_url,
    filename: campaign.raw.filename,
  };
};

const formatDateTime = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default function CampaignDetailModal({ campaign, open, onClose }) {
  const attachment = getCampaignAttachment(campaign);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-lg border-gray-200 p-0 shadow-lg">
        <div className="flex max-h-[85vh] w-full flex-col overflow-hidden bg-white">
          <DialogHeader className="flex-row items-center gap-3 border-b border-gray-200 px-5 py-4 pr-14">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600">
              <Eye className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-base">Campaign Detail</DialogTitle>
              <DialogDescription className="text-xs">
                View campaign schedule, message, and attachment.
              </DialogDescription>
            </div>
          </DialogHeader>

          <ScrollArea className="min-h-0 flex-1">
            <div className="flex flex-col gap-4 px-5 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Campaign Name</Label>
                  <div className="flex min-h-10 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                    {campaign?.name || "-"}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Status</Label>
                  <div className="flex min-h-10 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                    <CampaignStatusBadge status={campaign?.status} />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Schedule Date</Label>
                  <div className="flex min-h-10 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                    {formatDateTime(campaign?.raw?.schedule_date)}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Audience Segment</Label>
                  <div className="flex min-h-10 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                    {campaign?.segment || "-"}
                  </div>
                </div>
              </div>

              <CampaignFileUpload
                existingAttachment={attachment}
                readOnly
              />

              <div className="flex flex-col gap-2">
                <Label className="text-xs">Campaign Message</Label>
                <div className="min-h-28 whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm leading-relaxed">
                  {campaign?.description || "-"}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
