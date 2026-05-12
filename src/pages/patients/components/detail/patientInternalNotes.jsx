export default function PatientInternalNotes({ patient }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-slate-50 p-4 border border-slate-100">
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Internal Notes
        </h4>

        <button className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold transition">
          Add
        </button>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] text-amber-900">
        {patient.notes}
      </div>
    </div>
  );
}