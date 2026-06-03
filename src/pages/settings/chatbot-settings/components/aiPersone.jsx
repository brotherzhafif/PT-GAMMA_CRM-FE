import { Briefcase, Heart, Smile, } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function AIPersona({ settings, onChange, disabled }) {
  const toneOptions = [
    {
      value: "friendly",
      label: "Friendly & Empathetic",
      icon: Smile,
    },
    {
      value: "professional",
      label: "Professional & Direct",
      icon: Briefcase,
    },
    {
      value: "caring",
      label: "Caring & Soft",
      icon: Heart,
    },
  ];

  return (
    <Card className="flex flex-col gap-8 border border-gray-300 shadow-md">
      <CardHeader className="flex flex-col items-start gap-0 border-b border-gray-300">
        <h3 className="text-lg font-semibold">
          AI Persona & Identity
        </h3>
        <span className="text-xs text-gray-500">
          Set the name, tone, and language of your AI.
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 px-6">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <Field className="w-full">
            <FieldLabel>AI Name</FieldLabel>
            <Input
              value={settings.ai_name}
              onChange={(event) => onChange("ai_name", event.target.value)}
              disabled={disabled}
              placeholder="Enter a name for your AI assistant (e.g., Dr. Bot)"
              className="w-full border-gray-300 shadow-sm"
            />
          </Field>

          <Field className="w-full">
            <FieldLabel>Primary Language</FieldLabel>
            <Select
              value={settings.primary_language}
              onValueChange={(value) => onChange("primary_language", value)}
              disabled={disabled}
            >
              <SelectTrigger className="w-full border-gray-300 shadow-sm">
                <SelectValue placeholder="Select the primary language for your AI assistant" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="id">
                    Bahasa Indonesia
                  </SelectItem>
                  <SelectItem value="en">
                    English
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field className="w-full">
          <FieldLabel>Conversation Tone</FieldLabel>

          <div className="flex w-full gap-4">
            {toneOptions.map((item) => {
              const Icon = item.icon;
              const isActive = settings.conversation_tone === item.value;

              return (
                <Button
                  key={item.value}
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  onClick={() => onChange("conversation_tone", item.value)}
                  className={cn(
                    "h-8 flex-1 justify-center gap-2 border-gray-300 shadow-sm transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </Field>
      </CardContent>
    </Card>
  );
}
