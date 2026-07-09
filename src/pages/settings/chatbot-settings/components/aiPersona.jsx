import { Briefcase, Heart, Search, Smile } from "lucide-react";
import { useRef, useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePromptSearch } from "../hooks/usePromptSearch";
import { KnowledgeSearchResults } from "./KnowledgeSearchResults";

const PROMPT_SECTIONS = [
  {
    key: "persona_identity",
    label: "Identitas & Peran AI",
    placeholder: "Nama, peran, nada bicara, aturan sapaan...",
    rows: 5,
  },
  {
    key: "capabilities",
    label: "Kapabilitas",
    placeholder: "Hal-hal yang boleh dibantu AI...",
    rows: 4,
  },
  {
    key: "restrictions",
    label: "Batasan Tegas",
    placeholder: "Hal-hal yang tidak boleh dilakukan AI...",
    rows: 4,
  },
  {
    key: "mandatory_flow",
    label: "Alur Wajib (saat pasien sebut gejala)",
    placeholder: "Langkah-langkah & mapping poli berdasarkan gejala...",
    rows: 8,
  },
  {
    key: "general_rules",
    label: "Aturan Umum & Larangan Mutlak",
    placeholder: "Topik yang boleh dijawab, larangan mutlak, teks penolakan...",
    rows: 8,
  },
  {
    key: "disclaimer",
    label: "Disclaimer",
    placeholder: "Teks disclaimer di akhir pesan...",
    rows: 3,
  },
];

export default function AIPersona({ settings, onChange, disabled }) {
  const fieldRefs = useRef({});
  const [keyword, setKeyword] = useState("");
  const results = usePromptSearch(settings, keyword);

  const handleJumpTo = (field) => {
    const el = fieldRefs.current?.[field];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  const toneOptions = [
    { value: "friendly", label: "Friendly & Empathetic", icon: Smile },
    { value: "professional", label: "Professional & Direct", icon: Briefcase },
    { value: "caring", label: "Caring & Soft", icon: Heart },
  ];

  return (
    <Card className="flex flex-col gap-6 border border-gray-300 shadow-md sm:gap-8">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-gray-300">
        <div className="flex flex-col items-start gap-0">
          <h3 className="text-base font-semibold sm:text-lg">
            AI Persona & Identity
          </h3>
          <span className="text-xs leading-4 text-gray-500">
            Set the name, tone, and language of your AI.
          </span>
        </div>

        <Field orientation="horizontal" className="w-full max-w-64">
          <div className="relative w-full shadow-md border-gray-300 border rounded-md">
            <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari di system prompt..."
              className="pl-8"
            />
          </div>
        </Field>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 px-4 sm:px-6">
        <KnowledgeSearchResults
          results={results}
          keyword={keyword}
          onJumpTo={handleJumpTo}
        />

        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        {PROMPT_SECTIONS.map((section) => (
          <Field key={section.key} className="w-full">
            <FieldLabel>{section.label}</FieldLabel>
            <Textarea
              ref={(el) => (fieldRefs.current[section.key] = el)}
              value={settings[section.key]}
              onChange={(e) => onChange(section.key, e.target.value)}
              disabled={disabled}
              placeholder={section.placeholder}
              className="min-h-24 w-full border-gray-300 shadow-sm"
              rows={section.rows}
            />
          </Field>
        ))}

        <Field className="w-full">
          <FieldLabel>Conversation Tone</FieldLabel>

          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
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
                    "h-auto min-h-9 justify-center gap-2 whitespace-normal border-gray-300 px-2 py-2 text-center text-xs leading-4 shadow-sm transition-all sm:text-sm",
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