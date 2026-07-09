import { Briefcase, ChevronDown, ChevronUp, Heart, Search, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const toneOptions = [
  { value: "friendly", label: "Friendly & Empathetic", icon: Smile },
  { value: "professional", label: "Professional & Direct", icon: Briefcase },
  { value: "caring", label: "Caring & Soft", icon: Heart },
];

const SHARED_TEXT_STYLE =
  "px-3 py-2 text-sm leading-6 whitespace-pre-wrap break-words border border-transparent";

function buildHighlightNodes(text, matches, activeIndex, activeMarkRef) {
  if (!matches.length) return text || "";

  const nodes = [];
  let cursor = 0;

  matches.forEach((match, i) => {
    if (match.start > cursor) {
      nodes.push(text.slice(cursor, match.start));
    }
    const isActive = i === activeIndex;
    nodes.push(
      <mark
        key={i}
        ref={isActive ? activeMarkRef : null}
        className={cn(
          "rounded-sm",
          isActive ? "bg-orange-400/70" : "bg-yellow-200/70"
        )}
      >
        {text.slice(match.start, match.end)}
      </mark>
    );
    cursor = match.end;
  });

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

export default function AIPersona({ settings, onChange, disabled }) {
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const activeMarkRef = useRef(null);
  const [keyword, setKeyword] = useState("");

  const { total, activeIndex, matches, goNext, goPrev } = usePromptSearch(
    settings.system_prompt,
    keyword
  );

  useEffect(() => {
    const markEl = activeMarkRef.current;
    const textarea = textareaRef.current;
    const mirror = mirrorRef.current;
    if (!markEl || !textarea) return;

    const target =
      markEl.offsetTop - textarea.clientHeight / 2 + markEl.offsetHeight / 2;
    const clamped = Math.max(
      0,
      Math.min(target, textarea.scrollHeight - textarea.clientHeight)
    );

    textarea.scrollTop = clamped;
    if (mirror) mirror.scrollTop = clamped;
  }, [activeIndex, keyword]);

  const handleTextareaScroll = (e) => {
    if (mirrorRef.current) {
      mirrorRef.current.scrollTop = e.target.scrollTop;
      mirrorRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.shiftKey ? goPrev() : goNext();
    } else if (e.key === "Escape") {
      setKeyword("");
    }
  };

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
      </CardHeader>

      <CardContent className="flex flex-col gap-6 px-4 sm:px-6">
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

        <Field className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <FieldLabel>System Prompt</FieldLabel>

            <div className="relative w-full max-w-80">
              <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Cari di system prompt..."
                className="h-8 pr-24 pl-8 text-xs border-gray-300 shadow-sm"
              />

              <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-0.5">
                {keyword && (
                  <>
                    <span className="mr-1 min-w-9 text-center text-[11px] text-gray-500">
                      {total > 0 ? `${activeIndex + 1}/${total}` : "0/0"}
                    </span>

                    <button
                      type="button"
                      disabled={total === 0}
                      onClick={goPrev}
                      className="rounded p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ChevronUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={total === 0}
                      onClick={goNext}
                      className="rounded p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ChevronDown className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setKeyword("")}
                      className="ml-0.5 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <X className="size-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="relative min-h-[480px] w-full">
            <div
              ref={mirrorRef}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 overflow-hidden rounded-md text-gray-900",
                SHARED_TEXT_STYLE
              )}
            >
              {buildHighlightNodes(
                settings.system_prompt,
                matches,
                activeIndex,
                activeMarkRef
              )}
            </div>

            <Textarea
              ref={textareaRef}
              value={settings.system_prompt}
              onChange={(e) => onChange("system_prompt", e.target.value)}
              onScroll={handleTextareaScroll}
              disabled={disabled}
              placeholder="Tulis seluruh system prompt di sini..."
              className={cn(
                "absolute inset-0 h-full w-full resize-none overflow-y-auto rounded-md border-gray-300 bg-transparent text-transparent caret-gray-900 shadow-sm placeholder:text-gray-400",
                SHARED_TEXT_STYLE
              )}
            />
          </div>
        </Field>

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