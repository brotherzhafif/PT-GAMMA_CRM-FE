export default function PatientStats({ patient }) {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200">
      <div className="flex flex-col items-center justify-center gap-1 border-r p-4">
        <p className="text-3xl font-bold">
          {patient.visits}
        </p>

        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Total Visits
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 p-4">
        <p className="text-3xl font-bold text-amber-500">
          {patient.points}
        </p>

        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Loyalty Points
        </p>
      </div>
    </div>
  );
}