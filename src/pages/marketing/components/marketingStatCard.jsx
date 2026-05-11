import { ArrowUpRight } from "lucide-react";

export default function MarketingStatCard({
  title,
  value,
  growth,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-sm transition">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h3 className="text-3xl font-semibold tracking-tight">
            {value}
          </h3>
        </div>

        <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
          <ArrowUpRight className="w-4 h-4" />

          {growth}
        </div>

        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}