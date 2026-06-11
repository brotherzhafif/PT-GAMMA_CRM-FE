import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ConversionFunnel({ data = [] }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="-pb-2">
        <h3 className="text-sm font-semibold text-foreground">
          Conversion Funnel
        </h3>
      </CardHeader>

      <CardContent className="pt-0 pb-0 flex-1 flex flex-col justify-center">
        {data.length > 0 ? (
          <div className="flex flex-col gap-3">
            {data.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex-1 overflow-hidden rounded-r-full bg-slate-200">
                  <div
                    className={`${item.color || "bg-emerald-500"} h-10 rounded-r-full flex items-center px-4 text-white font-semibold text-sm transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  >
                    {item.value?.toLocaleString?.("id-ID") ?? item.value}
                  </div>
                </div>

                <span className="w-24 text-sm text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada data funnel konversi.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
