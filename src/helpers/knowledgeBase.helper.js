export const KNOWLEDGE_FIELD_LABELS = {
  lokasi: "Lokasi",
  maps: "Link Maps",
  biaya_pendaftaran: "Biaya Pendaftaran",
  biaya_konsultasi: "Biaya Konsultasi",
  layanan_poli: "Layanan Poli",
  layanan_khusus: "Layanan Khusus",
  layanan_penunjang: "Layanan Penunjang",
};

export function searchKnowledgeFields(settings, keyword) {
  const trimmed = keyword?.trim().toLowerCase();
  if (!trimmed) return [];

  const results = [];

  for (const field of Object.keys(KNOWLEDGE_FIELD_LABELS)) {
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
      label: KNOWLEDGE_FIELD_LABELS[field],
      count,
      snippet,
    });
  }

  return results;
}