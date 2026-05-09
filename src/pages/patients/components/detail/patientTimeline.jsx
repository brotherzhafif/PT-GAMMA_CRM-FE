export default function PatientTimeline({ patient }) {
  return (
    <div className="flex flex-col gap-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm tracking-wide uppercase text-muted-foreground">
          Activity Timeline
        </h4>

        <button className="text-xs text-emerald-600 hover:text-emerald-700 transition">
          Filter
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {patient.timeline.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border p-3 hover:bg-muted/40 transition"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />

            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">
                {item.title}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}