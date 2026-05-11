import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  CalendarDays,
  SendHorizonal,
  Sparkles,
} from "lucide-react";

import MessagePreview from "./messagePreview";
import ProgressBar from "./progressBar";
import CampaignDatePicker from "./campaignDatePicker";
import TemplateSelector from "./templateSelector";

export default function CreateCampaignPanel() {
  const [campaignName, setCampaignName] =
    useState("");

  const [selectedSegment, setSelectedSegment] =
    useState("VIP Patients");

  const [selectedDate, setSelectedDate] =
    useState(null);

  const [message, setMessage] = useState(
    "Hello John, enjoy our exclusive dental whitening promotion with up to 25% discount this week. Book your appointment today."
  );

  const characterCount = message.length;

  const progressValue = useMemo(() => {
    let progress = 25;

    if (campaignName) progress += 25;

    if (selectedSegment) progress += 20;

    if (selectedDate) progress += 15;

    if (message.length > 20) progress += 15;

    return progress;
  }, [
    campaignName,
    selectedSegment,
    selectedDate,
    message,
  ]);

  return (
    <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {/* HEADER */}
      <div className="border-b border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Create Campaign
            </h3>

            <p className="text-sm text-muted-foreground">
              Configure and launch marketing campaign.
            </p>
          </div>

          <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-5 p-5">
        {/* CAMPAIGN NAME */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Campaign Name
          </label>

          <Input
            value={campaignName}
            onChange={(e) =>
              setCampaignName(e.target.value)
            }
            placeholder="Enter campaign name..."
            className="border-gray-300"
          />
        </div>

        {/* AUDIENCE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Audience Segment
          </label>

          <select
            value={selectedSegment}
            onChange={(e) =>
              setSelectedSegment(e.target.value)
            }
            className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-sm outline-none"
          >
            <option>VIP Patients</option>
            <option>All Patients</option>
            <option>Inactive Patients</option>
            <option>Teenagers</option>
          </select>
        </div>

        {/* DATE PICKER */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Schedule Date
          </label>

          <CampaignDatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        {/* TEMPLATE */}
        <TemplateSelector
          onSelectTemplate={setMessage}
        />

        {/* MESSAGE */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Campaign Message
            </label>

            <span className="text-xs text-muted-foreground">
              {characterCount}/300
            </span>
          </div>

          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            rows={5}
            maxLength={300}
            placeholder="Write campaign message..."
            className="resize-none rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
          />
        </div>

        {/* PROGRESS */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Delivery Progress
            </h4>

            <span className="text-xs text-muted-foreground">
              {progressValue}%
            </span>
          </div>

          <ProgressBar value={progressValue} />
        </div>

        {/* PREVIEW */}
        <MessagePreview
          message={message}
          campaignName={campaignName}
        />

        {/* BUTTON */}
        <Button className="w-full">
          <SendHorizonal className="w-4 h-4 mr-2" />
          Launch Campaign
        </Button>
      </div>
    </div>
  );
}