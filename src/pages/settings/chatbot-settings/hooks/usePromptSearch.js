import { useMemo } from "react";
import { searchPromptSections } from "@/helpers/systemPrompt.helper";

export function usePromptSearch(settings, keyword) {
  return useMemo(
    () => searchPromptSections(settings, keyword),
    [settings, keyword]
  );
}