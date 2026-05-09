import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export function DoctorsCard() {
  return (
    <Card className="w-full flex flex-col gap-4 p-4 shadow-sm border border-gray-300 bg-white">
      <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Doctors</h3>
      <div className="flex flex-col gap-4">
        {[
          { name: "All Doctors", role: null },
          { name: "Dr. Siti Aminah", role: "General Dentist" },
          { name: "Dr. Hendra", role: "Orthodontist" },
          { name: "Dr. Maya Sari", role: "Dermatologist", color: "bg-orange-400" },
        ].map((doc, i) => (
          <div key={i} className="flex flex-row items-center gap-3">
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${doc.color || "bg-emerald-500"}`}>
              <Check className="w-3 h-3 text-white" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-slate-800 font-bold leading-none">{doc.name}</p>
              {doc.role && <p className="text-[10px] text-slate-400 mt-1 font-medium">{doc.role}</p>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}