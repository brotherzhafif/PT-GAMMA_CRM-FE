import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export default function MarketingStatCard({
  title,
  value,
  growth,
  description,
  icon: Icon,
}) {
  return (
    <Card className="rounded-lg py-0 transition hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
            <ArrowUpRight className="h-4 w-4" />
            {growth}
          </div>

          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
