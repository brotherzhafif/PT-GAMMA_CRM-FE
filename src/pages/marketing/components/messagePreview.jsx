export default function MessagePreview({
  message,
  campaignName,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h4 className="text-sm font-medium">
            Message Preview
          </h4>

          <span className="text-xs text-muted-foreground">
            Live campaign message preview
          </span>
        </div>

        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-medium text-emerald-700">
          WhatsApp
        </span>
      </div>

      {/* CAMPAIGN INFO */}
      <div className="flex flex-col gap-1 rounded-xl border border-gray-200 bg-muted/20 p-3">
        <span className="text-xs text-muted-foreground">
          Campaign Name
        </span>

        <p className="text-sm font-medium">
          {campaignName || "Untitled Campaign"}
        </p>
      </div>

      {/* CHAT PREVIEW */}
      <div className="flex flex-col gap-3 rounded-2xl bg-[#E7FFDB] p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
            CRM
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-medium">
              Gamma CRM
            </span>

            <span className="text-[10px] text-muted-foreground">
              Online
            </span>
          </div>
        </div>

        <div className="max-w-[95%] rounded-2xl bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm">
          {message || "No message preview available."}
        </div>
      </div>
    </div>
  );
}