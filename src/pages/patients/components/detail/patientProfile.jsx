import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import PatientTags from "../patientTags";

export default function PatientProfile({ patient }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 border-b border-slate-100 pb-5">
      <Avatar className="h-20 w-20 border-2 border-slate-200">
        <AvatarFallback className="bg-slate-100">
          <User className="w-8 h-8 text-slate-400" />
        </AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-900">
          {patient.name}
        </h3>

        <p className="text-[11px] text-slate-500">
          {patient.phone}
        </p>
      </div>

      <PatientTags tags={patient.tags} />
    </div>
  );
}