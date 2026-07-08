import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import { SendHorizonal, Sparkles } from "lucide-react";

import CampaignDatePicker from "./campaignDatePicker";
import CampaignFileUpload from "./campaignFileUpload";
import MessagePreview from "./messagePreview";
import TemplateSelector from "./templateSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const campaignNamePathSeparatorPattern = /[\\/]/;

const getCampaignAttachment = (campaign) => {
  const url = campaign?.raw?.image_url || campaign?.raw?.attachment_url;
  if (!url) return null;

  return {
    url: url,
    filename: campaign.raw.filename,
  };
};

export default function CreateCampaignModal({
  open,
  onClose,
  selectedCampaign,
  onCreateCampaign,
  onUpdateCampaign,
}) {
  const [campaignName, setCampaignName] = useState(
    selectedCampaign?.name || ""
  );
  const [scheduleDate, setScheduleDate] = useState(
    selectedCampaign?.raw?.schedule_date || ""
  );
  const [message, setMessage] = useState(
    selectedCampaign?.description || ""
  );
  const [status, setStatus] = useState(
    selectedCampaign?.status?.toLowerCase() || "scheduled"
  );
  const [attachmentFile, setAttachmentFile] = useState(null);

  const isBirthdayCampaign = selectedCampaign?.raw?.campaign_type === "birthday";
  const [loading, setLoading] = useState(false);
  const existingAttachment = getCampaignAttachment(selectedCampaign);

  const handleSubmit = async () => {
    if (!campaignName.trim() || !message.trim() || !scheduleDate) {
      toast.warning("Lengkapi campaign", {
        description: "Nama, jadwal, dan pesan campaign wajib diisi.",
      });
      return;
    }

    if (campaignNamePathSeparatorPattern.test(selectedCampaign?.name || "")) {
      toast.error("Campaign tidak bisa diedit", {
        description: "Nama campaign lama mengandung / atau \\. Endpoint by-name backend membacanya sebagai path.",
      });
      return;
    }

    if (campaignNamePathSeparatorPattern.test(campaignName)) {
      toast.warning("Nama campaign tidak valid", {
        description: "Gunakan tanda - untuk tanggal, contoh: Test Diskon 18-06-2026.",
      });
      return;
    }

    const payload = {
      campaign_name: campaignName,
      campaign_message: message,
      schedule_date: scheduleDate,
      status: status,
      ...(!selectedCampaign && attachmentFile ? { file: attachmentFile } : {}),
    };

    try {
      setLoading(true);

      const success = selectedCampaign
        ? await onUpdateCampaign(selectedCampaign.name, payload)
        : await onCreateCampaign(payload);

      if (success) {
        setAttachmentFile(null);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-lg border-gray-200 p-0 shadow-lg">
        <div className="flex h-[85vh] w-full flex-col overflow-hidden bg-white">
          <DialogHeader className="flex-row items-center gap-3 border-b border-gray-200 px-5 py-4 pr-14">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-base">
                {selectedCampaign ? "Edit Campaign" : "Create Campaign"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Configure marketing campaign details.
              </DialogDescription>
            </div>
          </DialogHeader>

          <ScrollArea className="min-h-0 flex-1">
            <div className="flex flex-col gap-4 px-5 py-5">
              <div className="flex flex-col gap-2">
                <Label className="text-xs">Campaign Name</Label>
                <Input
                  value={campaignName}
                  onChange={(event) => setCampaignName(event.target.value)}
                  placeholder="Enter campaign name..."
                  className="h-10 px-3"
                />
              </div>

              <CampaignDatePicker
                selectedDate={scheduleDate}
                onDateChange={setScheduleDate}
              />

              {selectedCampaign && (
                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Campaign Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-10 px-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {!isBirthdayCampaign && (
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      )}
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <TemplateSelector onSelectTemplate={setMessage} />

              <CampaignFileUpload
                file={attachmentFile}
                onFileChange={setAttachmentFile}
                existingAttachment={existingAttachment}
                readOnly={Boolean(selectedCampaign)}
              />

              <div className="flex flex-col gap-2">
                <Label className="text-xs">Campaign Message</Label>
                <Textarea
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write campaign message..."
                  className="min-h-28 resize-none px-3 py-3"
                />
              </div>

              <MessagePreview message={message} campaignName={campaignName} />
            </div>
          </ScrollArea>

          <DialogFooter className="border-t border-gray-200 px-5 py-4">
            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer border border-gray-300 shadow-sm"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="cursor-pointer"
            >
              <SendHorizonal className="mr-2 h-4 w-4" />
              {loading
                ? "Saving..."
                : selectedCampaign
                  ? "Update Campaign"
                  : "Create Campaign"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
