import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Transparancy({ settings, onChange, disabled }) {
  return (
    <Card className="flex flex-col gap-8 border border-gray-300 shadow-md">
      <CardHeader className="gap-0 flex flex-col items-start border-b border-gray-300">
        <h3 className="text-lg font-semibold">Transparency & Disclaimers</h3>
        <span className="text-xs text-gray-500">
          Manage how patients are informed about interacting with an AI.
        </span>
      </CardHeader>

      <CardContent className="px-6 gap-6 flex flex-col">
        <Field orientation="horizontal" className="w-full">
            <FieldContent>
                <FieldLabel htmlFor="includeDisclaimer">
                    Include AI Disclaimer
                </FieldLabel>
                <FieldDescription className="text-xs">
                    Automatically add an AI badge to the first message sent in a new conversation.
                </FieldDescription>
            </FieldContent>
            <Switch
              id="includeDisclaimer"
              checked={settings.ai_badge_enabled}
              disabled={disabled}
              onCheckedChange={(value) => onChange("ai_badge_enabled", value)}
            />
        </Field>

        <Field>
            <FieldLabel htmlFor="disclaimerText">Disclaimer Text</FieldLabel>
            <Input
              id="disclaimerText"
              value={
                settings.ai_badge_enabled
                  ? "AI badge is enabled for new conversations."
                  : "AI badge is disabled for new conversations."
              }
              disabled
              className="w-full border-gray-300 shadow-sm"
            />
        </Field>

      </CardContent>
    </Card>
  );
}
