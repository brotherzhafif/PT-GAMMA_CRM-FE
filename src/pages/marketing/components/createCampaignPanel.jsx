import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Pencil, SendHorizonal, Sparkles } from "lucide-react";

import CampaignDatePicker from "./campaignDatePicker";
import CampaignFileUpload from "./campaignFileUpload";
import MessagePreview from "./messagePreview";
import ProgressBar from "./progressBar";
import TemplateSelector from "./templateSelector";

const defaultMessage =
  "Hello John, enjoy our exclusive dental whitening promotion with up to 25% discount this week. Book your appointment today.";

const getCampaignAttachment = (campaign) => {
  const url = campaign?.raw?.image_url || campaign?.raw?.attachment_url;
  if (!url) return null;

  return {
    url: url,
    filename: campaign.raw.filename,
  };
};

const getApiErrorMessage = (error) => {
  return error.response?.data?.detail || error.response?.data?.message || error.message || "Coba beberapa saat lagi.";
};

const campaignNamePathSeparatorPattern = /[\\/]/;

export default function CreateCampaignPanel({
  onCreateCampaign,
  onUpdateCampaign,
  selectedCampaign,
}) {
  const [campaignName, setCampaignName] = useState(
    selectedCampaign?.name || ""
  );
  const [selectedSegment, setSelectedSegment] = useState("VIP Patients");
  const [selectedDate, setSelectedDate] = useState(
    selectedCampaign?.raw?.schedule_date || ""
  );
  const [message, setMessage] = useState(
    selectedCampaign?.description || defaultMessage
  );
  const [status, setStatus] = useState(
    selectedCampaign?.status?.toLowerCase() || "scheduled"
  );
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBirthdayCampaign = selectedCampaign?.raw?.campaign_type === "birthday";
  const existingAttachment = getCampaignAttachment(selectedCampaign);

  const characterCount = message.length;

  const progressValue = useMemo(() => {
    let progress = 25;

    if (campaignName) progress += 25;
    if (selectedSegment) progress += 20;
    if (selectedDate) progress += 15;
    if (message.length > 20) progress += 15;

    return progress;
  }, [campaignName, selectedSegment, selectedDate, message]);

  const resetForm = () => {
    setCampaignName("");
    setSelectedSegment("VIP Patients");
    setSelectedDate("");
    setMessage(defaultMessage);
    setAttachmentFile(null);
  };

  const handleSubmit = async () => {
    if (!campaignName.trim() || !selectedDate || !message.trim()) {
      toast.warning("Lengkapi campaign", {
        description: "Nama, jadwal, dan pesan campaign wajib diisi.",
      });
      return;
    }

    if (campaignNamePathSeparatorPattern.test(selectedCampaign?.raw?.campaign_name || "")) {
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

    try {
      setIsSubmitting(true);

      const payload = {
        campaign_name: campaignName,
        schedule_date: selectedDate,
        campaign_message: message,
        status: status,
        ...(attachmentFile ? { file: attachmentFile } : {}),
      };

      const success = selectedCampaign
        ? await onUpdateCampaign(selectedCampaign.raw.campaign_name, payload)
        : await onCreateCampaign(payload);

      if (success) {
        toast.success(selectedCampaign ? "Campaign diperbarui" : "Campaign dibuat", {
          description: `${campaignName} berhasil disimpan.`,
        });
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error(selectedCampaign ? "Gagal memperbarui campaign" : "Gagal membuat campaign", {
        description: getApiErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="sticky top-4 gap-0 overflow-hidden rounded-lg py-0">
      <CardHeader className="border-b p-5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">
              {selectedCampaign ? "Edit Campaign" : "Create Campaign"}
            </CardTitle>
            <CardDescription className="text-xs">
              {selectedCampaign
                ? "Update campaign information."
                : "Configure and launch marketing campaign."}
            </CardDescription>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600">
            {selectedCampaign ? (
              <Pencil className="h-5 w-5" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2">
          <Label className="text-xs">Campaign Name</Label>
          <Input
            value={campaignName}
            onChange={(event) => setCampaignName(event.target.value)}
            placeholder="Enter campaign name..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-xs">Audience Segment</Label>
          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VIP Patients">VIP Patients</SelectItem>
              <SelectItem value="All Patients">All Patients</SelectItem>
              <SelectItem value="Inactive Patients">
                Inactive Patients
              </SelectItem>
              <SelectItem value="Teenagers">Teenagers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedCampaign && (
          <div className="flex flex-col gap-2">
            <Label className="text-xs">Campaign Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
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

        <CampaignDatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        <CampaignFileUpload
          file={attachmentFile}
          onFileChange={setAttachmentFile}
          existingAttachment={existingAttachment}
          readOnly={Boolean(selectedCampaign)}
        />

        <TemplateSelector onSelectTemplate={setMessage} />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Campaign Message</Label>
            <span className="text-xs text-muted-foreground">
              {characterCount}/300
            </span>
          </div>

          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            maxLength={300}
            placeholder="Write campaign message..."
            className="min-h-32 resize-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Delivery Progress</h4>
            <span className="text-xs text-muted-foreground">
              {progressValue}%
            </span>
          </div>

          <ProgressBar value={progressValue} />
        </div>

        <MessagePreview message={message} campaignName={campaignName} />

        <Button
          type="button"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <SendHorizonal className="mr-2 h-4 w-4" />
          {isSubmitting
            ? selectedCampaign
              ? "Updating..."
              : "Launching..."
            : selectedCampaign
              ? "Update Campaign"
              : "Launch Campaign"}
        </Button>
      </CardContent>
    </Card>
  );
}
