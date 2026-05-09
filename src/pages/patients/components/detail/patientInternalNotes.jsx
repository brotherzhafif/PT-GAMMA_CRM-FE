export default function PatientInternalNotes({ patient }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Internal Notes
        </h4>

        <button className="text-xs text-emerald-600 hover:text-emerald-700 transition">
          Add
        </button>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50">
        {patient.notes}
      </div>
    </div>
  );
}