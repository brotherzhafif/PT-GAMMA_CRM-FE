import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel, } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { GitBranch } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function HybridAI({ settings, onChange, disabled }) {
  const threshold = Number(settings.handoff_threshold) || 0;

  return (
    <Card className="flex flex-col gap-8 border border-gray-300 shadow-md pt-0">
      <CardHeader className="relative pt-4 gap-0 flex flex-col items-start border-b bg-secondary border-gray-300">
        <div className="flex flex-row gap-3 items-center">
          <GitBranch className="w-6 h-6 text-secondary-foreground" />
          <h3 className="text-lg font-semibold text-secondary-foreground">
            Hybrid AI Threshold (Handoff)
          </h3>
        </div>
        <span className="text-xs text-gray-500">
          Control when the AI stops answering and transfers the chat to a human
          admin based on its confidence level.{" "}
        </span>

        <div className="absolute right-0 top-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md shadow-md font-bold rounded-tl-none rounded-br-none">
            CRUTIAL SETTINGS
        </div>
      </CardHeader>

      <CardContent className="px-6 gap-6 flex flex-col">
        <Field className="w-full">
            <FieldLabel htmlFor="confidenceThreshold">
                <span>Confidence Escalation Threshold</span>
                <span className="ml-auto text-primary">{threshold}%</span>
            </FieldLabel>

            <Progress value={threshold} className="h-2 rounded-md" />
            <Input
              id="confidenceThreshold"
              type="range"
              min="0"
              max="100"
              value={threshold}
              disabled={disabled}
              onChange={(event) =>
                onChange("handoff_threshold", Number(event.target.value))
              }
              className="h-2 cursor-pointer border-0 px-0 shadow-none"
            />
            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col gap-1 items-start">
                    <span className="text-red-500 text-xs">0 - {Math.max(threshold - 1, 0)}% Confidence</span>
                    <span className="text-xs">Will be escalated to a human immediately</span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                    <span className="text-green-500 text-xs">{threshold} - 100% Confidence</span>
                    <span className="text-xs">Will be handled by the AI</span>
                </div>
            </div>
        </Field>

        <Separator className="bg-gray-300" />

        <Field className="w-full">
            <FieldLabel htmlFor="escalationMessage">
                <span className="font-semibold">Escalation Message (Sent to Patient)</span>
            </FieldLabel>
            <Textarea
              id="escalationMessage"
              value={settings.handoff_message}
              disabled={disabled}
              onChange={(event) =>
                onChange("handoff_message", event.target.value)
              }
              placeholder="Enter the message that will be sent to the patient when their query is escalated to a human admin. This message should inform them that their request is being transferred and provide any relevant instructions or information."
              className="w-full border-gray-300 shadow-sm"
              rows={4}
            />
            <span className="text-xs">This message is sent right before routing the conversation to the "Needs Human" inbox.</span>
        </Field>
      </CardContent>
    </Card>
  );
}
