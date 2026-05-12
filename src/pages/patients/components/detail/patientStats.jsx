export default function PatientStats({ patient }) {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center justify-center gap-1 border-r border-slate-200 p-4">
        <p className="text-2xl font-bold text-slate-900">
          {patient.visits}
        </p>

        <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
          Total Visits
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 p-4">
        <p className="text-2xl font-bold text-amber-500">
          {patient.points}
        </p>

        <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
          Loyalty Points
        </p>
      </div>
    </div>
  );
}