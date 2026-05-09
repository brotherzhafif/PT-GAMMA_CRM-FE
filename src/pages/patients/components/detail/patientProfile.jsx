import PatientTags from "../patientTags";

export default function PatientProfile({ patient }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 border-b pb-5">
      <div className="w-20 h-20 rounded-full bg-muted" />

      <div className="space-y-1">
        <h3 className="text-xl font-semibold">
          {patient.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {patient.phone}
        </p>
      </div>

      <PatientTags tags={patient.tags} />
    </div>
  );
}