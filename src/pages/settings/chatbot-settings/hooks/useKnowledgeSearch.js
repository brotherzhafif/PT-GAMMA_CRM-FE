import { useMemo } from "react";
import { searchKnowledgeFields } from "@/helpers/knowledgeBase.helper";

export function useKnowledgeSearch(settings, keyword) {
  return useMemo(
    () => searchKnowledgeFields(settings, keyword),
    [settings, keyword]
  );
}