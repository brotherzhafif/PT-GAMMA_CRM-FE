import { useMemo, useState } from "react";

export function usePromptSearch(text = "", keyword = "") {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevKeyword, setPrevKeyword] = useState(keyword);

  const matches = useMemo(() => {
    const trimmed = keyword.trim();
    if (!trimmed || !text) return [];

    const lowerText = text.toLowerCase();
    const lowerKeyword = trimmed.toLowerCase();
    const positions = [];

    let from = 0;
    let idx = lowerText.indexOf(lowerKeyword, from);
    while (idx !== -1) {
      positions.push({ start: idx, end: idx + trimmed.length });
      from = idx + trimmed.length;
      idx = lowerText.indexOf(lowerKeyword, from);
    }
    return positions;
  }, [text, keyword]);

  if (keyword !== prevKeyword) {
    setPrevKeyword(keyword);
    setActiveIndex(0);
  }

  const safeActiveIndex = matches.length === 0 ? 0 : activeIndex % matches.length;

  const goNext = () => {
    if (matches.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % matches.length);
  };

  const goPrev = () => {
    if (matches.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + matches.length) % matches.length);
  };

  return {
    matches,
    total: matches.length,
    activeIndex: safeActiveIndex,
    activeMatch: matches[safeActiveIndex] || null,
    goNext,
    goPrev,
  };
}