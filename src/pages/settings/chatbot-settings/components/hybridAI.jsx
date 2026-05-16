import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel, } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { GitBranch } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function HybridAI() {
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
                <span className="ml-auto text-primary">86%</span>
            </FieldLabel>

            <Progress value={86} className="h-2 rounded-md" />
            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col gap-1 items-start">
                    <span className="text-red-500 text-xs">0 - 85% Confidence</span>
                    <span className="text-xs">Will be escalated to a human immediately</span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                    <span className="text-green-500 text-xs">86 - 100% Confidence</span>
                    <span className="text-xs">Will be handled by the AI</span>
                </div>
            </div>
        </Field>

        <Separator className="bg-gray-300" />

        <Field className="w-full">
            <FieldLabel htmlFor="escalationMessage">
                <span className="font-semibold">Escalation Message (Sent to Patient)</span>
            </FieldLabel>
            <Textarea id="escalationMessage" placeholder="Enter the message that will be sent to the patient when their query is escalated to a human admin. This message should inform them that their request is being transferred and provide any relevant instructions or information." className="w-full border-gray-300 shadow-sm" rows={4} />
            <span className="text-xs">This message is sent right before routing the conversation to the "Needs Human" inbox.</span>
        </Field>
      </CardContent>
    </Card>
  );
}
