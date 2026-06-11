import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

import {
    X,
    Sparkles,
    SendHorizonal,
} from "lucide-react";

import TemplateSelector from "./templateSelector";
import CampaignDatePicker from "./campaignDatePicker";
import MessagePreview from "./messagePreview";

export default function CreateCampaignModal({
    open,
    onClose,
    selectedCampaign,
    onCreateCampaign,
    onUpdateCampaign,
}) {
    const [campaignName, setCampaignName] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedCampaign) {
            setCampaignName(selectedCampaign.name || "");
            setMessage(selectedCampaign.description || "");
            setScheduleDate(selectedCampaign.raw?.schedule_date || "");
        } else {
            setCampaignName("");
            setMessage("");
            setScheduleDate("");
        }
    }, [selectedCampaign]);

    // ✅ TEMPLATE LOGIC (INI YANG BARU)
    const handleSelectTemplate = (templateMessage) => {
        setMessage(templateMessage);
    };

    const handleSubmit = async () => {
        const payload = {
            campaign_name: campaignName,
            campaign_message: message,
            schedule_date: scheduleDate,
        };

        try {
            setLoading(true);

            let success = false;

            if (selectedCampaign) {
                success = await onUpdateCampaign(
                    selectedCampaign.name,
                    payload
                );
            } else {
                success = await onCreateCampaign(payload);
            }

            if (success) {
                onClose();
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden"
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.96,
                            y: 20,
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut",
                        }}
                    >

                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b border-gray-300 p-6 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600">
                                    <Sparkles className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {selectedCampaign ? "Edit Campaign" : "Create Campaign"}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Configure marketing campaign details.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="cursor-pointer rounded-xl border border-gray-300 p-2 transition-all duration-200 hover:scale-105 hover:bg-muted"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="clean-scrollbar flex-1 overflow-y-auto p-6 flex flex-col gap-5">

                            {/* Campaign Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">
                                    Campaign Name
                                </label>

                                <Input
                                    value={campaignName}
                                    onChange={(e) => setCampaignName(e.target.value)}
                                    placeholder="Enter campaign name..."
                                    className="border-gray-300"
                                />
                            </div>

                            <CampaignDatePicker
                                selectedDate={scheduleDate}
                                onDateChange={setScheduleDate}
                            />

                            <TemplateSelector
                                onSelectTemplate={handleSelectTemplate}
                            />

                            {/* Message */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">
                                    Campaign Message
                                </label>

                                <textarea
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write campaign message..."
                                    className="rounded-xl border border-gray-300 p-3 text-sm outline-none"
                                />
                            </div>

                            <MessagePreview
                                message={message}
                                campaignName={campaignName}
                            />
                        </div>

                        {/* FOOTER */}
                        <div className="flex items-center justify-end gap-3 border-t border-gray-300 p-6 shrink-0">
                            <Button
                                type="button"
                                variant="outline"
                                className="cursor-pointer border-gray-300 transition-all duration-200 hover:scale-[1.02]" onClick={onClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                            >                                <SendHorizonal className="mr-2 h-4 w-4" />
                                {loading
                                    ? "Saving..."
                                    : selectedCampaign
                                        ? "Update Campaign"
                                        : "Create Campaign"}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}