import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ConversionFunnel() {
  const data = [
    {
      label: "Total Chats",
      value: 2450,
      percentage: 100,
      color: "bg-emerald-500",
    },
    {
      label: "Bookings",
      value: 1592,
      percentage: 65,
      color: "bg-emerald-700",
    },
    {
      label: "Visits",
      value: 1102,
      percentage: 45,
      color: "bg-emerald-400",
    },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <h3 className="text-sm font-semibold text-foreground">
          Conversion Funnel
        </h3>
      </CardHeader>

      <CardContent className="pt-0 pb-0 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex-1 overflow-hidden rounded-r-full bg-slate-200">
                <div
                  className={`${item.color} h-10 rounded-r-full flex items-center px-4 text-white font-semibold text-sm transition-all duration-300`}
                  style={{ width: `${item.percentage}%` }}
                >
                  {item.value.toLocaleString()}
                </div>
              </div>

              <span className="w-24 text-sm text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}