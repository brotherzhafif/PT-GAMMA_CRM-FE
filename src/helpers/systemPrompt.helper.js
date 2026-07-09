export const PROMPT_SECTION_LABELS = {
  persona_identity: "Identitas & Peran AI",
  capabilities: "Kapabilitas",
  restrictions: "Batasan Tegas",
  mandatory_flow: "Alur Wajib (saat pasien sebut gejala)",
  general_rules: "Aturan Umum & Larangan Mutlak",
  disclaimer: "Disclaimer",
};

const MARK = {
  knowledgeBase: "=== KNOWLEDGE BASED GROQ LLM ===",
  kapabilitas: "KAPABILITAS:",
  batasan: "BATASAN TEGAS:",
  alurWajib: "=== ALUR WAJIB SAAT PASIEN SEBUT GEJALA/KELUHAN ===",
  aturanWajib: "=== ATURAN WAJIB",
  disclaimerMark: "📋 Catatan",
};

const EMPTY_SECTIONS = {
  persona_identity: "",
  capabilities: "",
  restrictions: "",
  mandatory_flow: "",
  general_rules: "",
  disclaimer: "",
};

function extractSection(text, startMarker, endMarkers = []) {
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) return "";

  const from = startIdx + startMarker.length;
  let endIdx = text.length;

  for (const marker of endMarkers) {
    const idx = text.indexOf(marker, from);
    if (idx !== -1 && idx < endIdx) {
      endIdx = idx;
    }
  }

  return text.slice(from, endIdx).trim();
}

export function parseSystemPrompt(raw) {
  if (!raw || typeof raw !== "string") return { ...EMPTY_SECTIONS };

  if (!raw.includes(MARK.knowledgeBase) && !raw.includes(MARK.alurWajib)) {
    return { ...EMPTY_SECTIONS, general_rules: raw.trim() };
  }

  const persona_identity = extractSection(raw, MARK.knowledgeBase, [MARK.kapabilitas]);
  const capabilities = extractSection(raw, MARK.kapabilitas, [MARK.batasan]);
  const restrictions = extractSection(raw, MARK.batasan, [MARK.alurWajib]);
  const mandatory_flow = extractSection(raw, MARK.alurWajib, [MARK.aturanWajib]);
  const general_rules = extractSection(raw, MARK.aturanWajib, [MARK.disclaimerMark]);

  const aturanWajibIdx = raw.indexOf(MARK.aturanWajib);
  const lastDisclaimerIdx = raw.lastIndexOf(MARK.disclaimerMark);
  const disclaimer =
    lastDisclaimerIdx !== -1 && lastDisclaimerIdx > aturanWajibIdx
      ? raw.slice(lastDisclaimerIdx).trim()
      : "";

  return {
    persona_identity,
    capabilities,
    restrictions,
    mandatory_flow,
    general_rules,
    disclaimer,
  };
}

export function buildSystemPrompt(settings) {
  return [
    settings.persona_identity,
    settings.capabilities,
    settings.restrictions,
    settings.mandatory_flow,
    settings.general_rules,
    settings.disclaimer,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function resolveSystemPromptSections(data = {}) {
  const hasSeparateFields = Object.keys(EMPTY_SECTIONS).some((key) => data[key]);

  if (hasSeparateFields) {
    return Object.keys(EMPTY_SECTIONS).reduce(
      (acc, key) => ({ ...acc, [key]: data[key] || "" }),
      {}
    );
  }

  return parseSystemPrompt(data.system_prompt);
}

export function searchPromptSections(settings, keyword) {
  const trimmed = keyword?.trim().toLowerCase();
  if (!trimmed) return [];

  const results = [];

  for (const field of Object.keys(PROMPT_SECTION_LABELS)) {
    const text = settings[field] || "";
    const lowerText = text.toLowerCase();
    if (!lowerText.includes(trimmed)) continue;

    const count = lowerText.split(trimmed).length - 1;
    const idx = lowerText.indexOf(trimmed);
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + trimmed.length + 40);
    const snippet = `${start > 0 ? "…" : ""}${text.slice(start, end)}${
      end < text.length ? "…" : ""
    }`;

    results.push({
      field,
      label: PROMPT_SECTION_LABELS[field],
      count,
      snippet,
    });
  }

  return results;
}