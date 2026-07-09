import { useEffect, useMemo, useState } from "react";

export function usePromptSearch(text = "", keyword = "") {
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    setActiveIndex(0);
  }, [keyword, matches.length]);

  const goNext = () => {
    if (matches.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % matches.length);
  };

  const goPrev = () => {
    if (matches.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + matches.length) % matches.length);
  };

  return {
    matches,              // ← ini yang ditambahin
    total: matches.length,
    activeIndex,
    activeMatch: matches[activeIndex] || null,
    goNext,
    goPrev,
  };
}