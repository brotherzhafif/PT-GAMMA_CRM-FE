import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, X, MessageSquare, Send, CheckCircle2, Phone, Mail, Clock, MessageCircle, Laptop, Smartphone, Globe } from "lucide-react";

const channelIcons = {
  WhatsApp: { icon: MessageCircle, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
  Tablet: { icon: Smartphone, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20" },
  "Web Form": { icon: Laptop, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20" },
  Google: { icon: Globe, color: "text-rose-500 bg-rose-50 dark:bg-rose-950/20" }
};

const sentimentStyles = {
  Positive: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
  Neutral: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
  Negative: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50"
};

export default function FeedbackDetail({
  feedback,
  onClose,
  onAddReply,
  onUpdateStatus
}) {
  const [replyMessage, setReplyMessage] = useState("");
  const [replyChannel, setReplyChannel] = useState("WhatsApp");

  // Reset reply text when feedback item changes
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setReplyMessage("");
    }, 0);

    return () => window.clearTimeout(timer);
  }, [feedback?.id]);

  if (!feedback) {
    return (
      <Card className="h-full flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 p-8 text-center shadow-sm">
        <MessageSquare className="w-8 h-8 text-muted-foreground mb-2 opacity-50" />
        <h4 className="text-sm font-semibold text-foreground">Select feedback report</h4>
        <p className="text-xs text-muted-foreground max-w-xs mt-1">
          Click on any feedback from the list to view full comments, view sentiment analytics, and respond to the patient.
        </p>
      </Card>
    );
  }

  const sourceInfo = channelIcons[feedback.source] || { icon: Globe, color: "text-slate-500 bg-slate-50" };
  const SourceIcon = sourceInfo.icon;

  const quickReplies = [
    {
      label: "Thank Patient",
      message: `Dear ${feedback.patientName}, thank you so much for your positive feedback! We are thrilled to hear you had a great clinical treatment experience. We look forward to welcoming you back!`,
    },
    {
      label: "Apologize for Wait",
      message: `Dear ${feedback.patientName}, we sincerely apologize for the delay you experienced. We value your feedback and are currently restructuring our scheduling system to prevent appointment wait times.`,
    },
    {
      label: "Address Billing Query",
      message: `Dear ${feedback.patientName}, thank you for bringing this up. We want to be completely transparent. One of our billing officers will contact you at ${feedback.phone} shortly to clarify the fee structure.`,
    }
  ];

  const handleTemplateClick = (templateText) => {
    setReplyMessage(templateText);
  };

  const handleSend = () => {
    if (!replyMessage.trim()) return;
    onAddReply(feedback.id, replyMessage, replyChannel);
    setReplyMessage("");
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-gray-700"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">Feedback Details</span>
          <Badge variant="outline" className={`text-[10px] px-2 py-0 font-medium ${sentimentStyles[feedback.sentiment]}`}>
            {feedback.sentiment} Sentiment
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0 rounded-full cursor-pointer">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      {/* Main Content Area */}
      <ScrollArea className="flex-1 w-full">
        <div className="p-5 flex flex-col gap-5">
          {/* Patient Profile Snapshot using Card */}
          <Card className="flex items-start justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-150 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="font-bold text-sm bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  {feedback.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">{feedback.patientName}</span>
                <span className="text-[10px] text-muted-foreground">Patient Record</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 text-[10px] text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> <span>{feedback.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> <span>{feedback.email}</span>
              </div>
            </div>
          </Card>

          {/* Feedback Content */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              {renderStars(feedback.rating)}
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{feedback.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded border-none hover:bg-emerald-50 dark:hover:bg-emerald-950/20">
                Category: {feedback.category}
              </Badge>
              <div className="flex items-center gap-1">
                <div className={`p-1 rounded ${sourceInfo.color}`}>
                  <SourceIcon className="w-3 h-3" />
                </div>
                <span className="text-[10px] text-muted-foreground font-semibold">{feedback.source}</span>
              </div>
            </div>

            <Card className="mt-3 bg-white dark:bg-card border-slate-150 dark:border-gray-800">
              <CardContent className="p-4">
                <p className="text-xs text-foreground leading-relaxed italic">
                  "{feedback.comment}"
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Status Change Toolbar */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Feedback Status:</span>
              <Select value={feedback.status} onValueChange={(val) => onUpdateStatus(feedback.id, val)}>
                <SelectTrigger className="w-[120px] h-8 text-xs font-semibold bg-white dark:bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Replied">Replied</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="my-1" />
          </div>

          {/* Reply Log History */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-foreground">Responses History ({feedback.replies.length})</span>
            {feedback.replies.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No replies sent yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {feedback.replies.map((reply) => (
                  <Card key={reply.id} className="border border-slate-100 dark:border-gray-900 bg-slate-50/50 dark:bg-slate-900/30">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{reply.sender}</span>
                        <span className="text-[9px] text-muted-foreground">{reply.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{reply.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Reply Workspace */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3">
        {/* Quick Replies templates */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">Canned Responses</span>
          <div className="flex flex-wrap gap-1.5">
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                onClick={() => handleTemplateClick(qr.message)}
                className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-full border border-emerald-200/50 hover:bg-emerald-100/50 transition cursor-pointer"
              >
                {qr.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input & Channel Send Options */}
        <div className="flex flex-col gap-2 mt-1">
          <Textarea
            placeholder="Type your response to the patient..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="text-xs min-h-[70px] max-h-[120px] bg-white dark:bg-card border-gray-300 dark:border-gray-800"
          />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground">Channel:</span>
              <Select value={replyChannel} onValueChange={setReplyChannel}>
                <SelectTrigger className="w-[110px] h-7 text-[10px] font-semibold bg-white dark:bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="SMS">SMS Direct</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              {feedback.status !== "Resolved" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onUpdateStatus(feedback.id, "Resolved")}
                  className="h-8 text-[11px] font-semibold border-emerald-500/20 text-emerald-600 hover:bg-emerald-50/50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleSend}
                disabled={!replyMessage.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 text-white h-8 text-[11px] font-bold shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3 h-3" /> Send Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
