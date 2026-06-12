import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PatientProfile from "./patientProfile";
import PatientQuickActions from "./patientQuickActions";

const detailRows = [
  ["RME ID", "rmePatientId"],
  ["NIK", "nik"],
  ["Nama Lengkap", "name"],
  ["Tanggal Lahir", "birthDate"],
  ["Jenis Kelamin", "gender"],
  ["Telepon", "phone"],
];

export default function PatientDetailPanel({ patient, onClose, onMessage }) {
  if (!patient) {
    return (
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="flex items-center justify-center min-h-[400px] text-[12px] text-slate-400">
          Select a patient to view details
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
        <h3 className="text-sm font-semibold text-slate-900">Patient Details</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 overflow-hidden">
        <div className="p-5 flex flex-col gap-5">
          <PatientProfile patient={patient} />

          <PatientQuickActions patient={patient} onMessage={onMessage} />

            <h4 className="mb-3 text-[11px] font-semibold uppercase text-slate-500">
              Patient Information
            </h4>
            <div className="divide-y divide-slate-200">
              {detailRows.map(([label, key]) => (
                <div key={key} className="grid grid-cols-[110px_1fr] gap-3 py-2">
                  <span className="text-[11px] font-medium text-slate-500">{label}</span>
                  <span className="min-w-0 break-words text-[12px] font-semibold text-slate-900">
                    {patient[key] || "-"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
