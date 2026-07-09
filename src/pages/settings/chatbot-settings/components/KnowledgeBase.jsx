import { Search } from "lucide-react";
import { useRef, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { KnowledgeSearchResults } from "./KnowledgeSearchResults";
import { useKnowledgeSearch } from "../hooks/useKnowledgeSearch";

export default function KnowledgeBase({ settings, onChange, disabled }) {
  const fieldRefs = useRef({});
  const [keyword, setKeyword] = useState("");
  const results = useKnowledgeSearch(settings, keyword);

  const handleJumpTo = (field) => {
    const el = fieldRefs.current?.[field];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  return (
    <Card className="flex flex-col gap-6 border border-gray-300 shadow-md sm:gap-8">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-gray-300">
        <div className="flex flex-col items-start gap-0">
          <h3 className="text-base font-semibold sm:text-lg">
            Knowledge Base
          </h3>
          <span className="text-xs leading-4 text-gray-500">
            Informasi lokasi, biaya, dan layanan klinik.
          </span>
        </div>

        <Field orientation="horizontal" className="w-full max-w-64">
          <div className="relative w-full shadow-md border-gray-300 border rounded-md">
            <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari knowledge base..."
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

        <Field className="w-full">
          <FieldLabel>Lokasi</FieldLabel>
          <Input
            ref={(el) => (fieldRefs.current.lokasi = el)}
            value={settings.lokasi}
            onChange={(e) => onChange("lokasi", e.target.value)}
            disabled={disabled}
            placeholder="Jl. Raya No. 123, Jakarta"
            className="w-full border-gray-300 shadow-sm"
          />
        </Field>

        <Field className="w-full">
          <FieldLabel>Link Maps</FieldLabel>
          <Input
            ref={(el) => (fieldRefs.current.maps = el)}
            value={settings.maps}
            onChange={(e) => onChange("maps", e.target.value)}
            disabled={disabled}
            placeholder="https://maps.google.com/?q=..."
            className="w-full border-gray-300 shadow-sm"
          />
        </Field>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <Field className="w-full">
            <FieldLabel>Biaya Pendaftaran</FieldLabel>
            <Input
              ref={(el) => (fieldRefs.current.biaya_pendaftaran = el)}
              value={settings.biaya_pendaftaran}
              onChange={(e) => onChange("biaya_pendaftaran", e.target.value)}
              disabled={disabled}
              placeholder="Rp 50.000"
              className="w-full border-gray-300 shadow-sm"
            />
          </Field>

          <Field className="w-full">
            <FieldLabel>Biaya Konsultasi</FieldLabel>
            <Input
              ref={(el) => (fieldRefs.current.biaya_konsultasi = el)}
              value={settings.biaya_konsultasi}
              onChange={(e) => onChange("biaya_konsultasi", e.target.value)}
              disabled={disabled}
              placeholder="Rp 150.000"
              className="w-full border-gray-300 shadow-sm"
            />
          </Field>
        </div>

        <Field className="w-full">
          <FieldLabel>Layanan Poli</FieldLabel>
          <Input
            ref={(el) => (fieldRefs.current.layanan_poli = el)}
            value={settings.layanan_poli}
            onChange={(e) => onChange("layanan_poli", e.target.value)}
            disabled={disabled}
            placeholder="Poli Umum, Poli Gigi, Poli Anak"
            className="w-full border-gray-300 shadow-sm"
          />
        </Field>

        <Field className="w-full">
          <FieldLabel>Layanan Khusus</FieldLabel>
          <Input
            ref={(el) => (fieldRefs.current.layanan_khusus = el)}
            value={settings.layanan_khusus}
            onChange={(e) => onChange("layanan_khusus", e.target.value)}
            disabled={disabled}
            placeholder="Fisioterapi"
            className="w-full border-gray-300 shadow-sm"
          />
        </Field>

        <Field className="w-full">
          <FieldLabel>Layanan Penunjang</FieldLabel>
          <Input
            ref={(el) => (fieldRefs.current.layanan_penunjang = el)}
            value={settings.layanan_penunjang}
            onChange={(e) => onChange("layanan_penunjang", e.target.value)}
            disabled={disabled}
            placeholder="Laboratorium, Apotek"
            className="w-full border-gray-300 shadow-sm"
          />
        </Field>
      </CardContent>
    </Card>
  );
}