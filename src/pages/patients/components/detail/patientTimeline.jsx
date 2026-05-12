export default function PatientTimeline({ patient }) {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-semibold tracking-wide uppercase text-slate-500">
          Activity Timeline
        </h4>

        <button className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold transition">
          Filter
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {patient.timeline.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-100/50 transition"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />

            <div className="flex flex-col gap-0.5">
              <p className="text-[12px] font-medium text-slate-900">
                {item.title}
              </p>

              <p className="text-[10px] text-slate-500">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}