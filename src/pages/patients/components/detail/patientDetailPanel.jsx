import PatientProfile from "./patientProfile";
import PatientStats from "./patientStats";
import PatientQuickActions from "./patientQuickActions";
import PatientInternalNotes from "./patientInternalNotes";
import PatientTimeline from "./patientTimeline";

export default function PatientDetailPanel({ patient }) {
  if (!patient) {
    return (
      <div className="border border-gray-200 rounded-2xl">
        <div className="flex items-center justify-center min-h-[400px] text-sm text-muted-foreground">
          Select a patient to view details
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-4 rounded-2xl border bg-card p-5 flex flex-col gap-5">
      <PatientProfile patient={patient} />

      <PatientStats patient={patient} />

      <PatientQuickActions />

      <PatientInternalNotes patient={patient} />

      <PatientTimeline patient={patient} />
    </div>
  );
}