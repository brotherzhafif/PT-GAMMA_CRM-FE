import { useState } from "react";

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
import MessagePreview from "./messagePreview";
import TemplateSelector from "./templateSelector";

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const payload = {
      campaign_name: campaignName,
      campaign_message: message,
      schedule_date: scheduleDate,
    };

    try {
      setLoading(true);

      const success = selectedCampaign
        ? await onUpdateCampaign(selectedCampaign.name, payload)
        : await onCreateCampaign(payload);

      if (success) {
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
          <DialogHeader className="flex-row items-center gap-3 border-b border-gray-200 p-5 pr-14">
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
            <div className="flex flex-col gap-5 p-5">
              <div className="flex flex-col gap-2">
                <Label className="text-xs">Campaign Name</Label>
                <Input
                  value={campaignName}
                  onChange={(event) => setCampaignName(event.target.value)}
                  placeholder="Enter campaign name..."
                />
              </div>

              <CampaignDatePicker
                selectedDate={scheduleDate}
                onDateChange={setScheduleDate}
              />

              <TemplateSelector onSelectTemplate={setMessage} />

              <div className="flex flex-col gap-2">
                <Label className="text-xs">Campaign Message</Label>
                <Textarea
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write campaign message..."
                  className="min-h-32 resize-none"
                />
              </div>

              <MessagePreview message={message} campaignName={campaignName} />
            </div>
          </ScrollArea>

          <DialogFooter className="border-t border-gray-200 p-5">
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
