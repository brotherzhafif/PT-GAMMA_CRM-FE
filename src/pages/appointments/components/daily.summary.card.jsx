import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, Clock3, Users, XCircle } from "lucide-react";

export function DailySummaryCard({ appointments = [] }) {
  const total = appointments.length;
  const waiting = appointments.filter((a) => a.status === "MENUNGGU").length;
  const inProgress = appointments.filter((a) => a.status === "DIPERIKSA").length;
  const done = appointments.filter((a) => a.status === "SELESAI" || a.status === "COMPLETED").length;
  const cancelled = appointments.filter((a) => a.status === "BATAL" || a.status === "CANCELLED").length;

  return (
    <Card className="bg-white shadow-xl border-gray-200">
      <CardHeader className="pb-2 pt-4 px-5">
        <CardTitle className="text-sm font-bold text-slate-800">
          Ringkasan Harian
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-4 h-4" />
              <span className="text-xs font-semibold">Total Antrean</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{total}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-emerald-500">
              <Clock3 className="w-4 h-4" />
              <span className="text-xs font-semibold">Menunggu</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{waiting}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-blue-500">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-semibold">Diperiksa</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{inProgress}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-500">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">Selesai</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{done}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-rose-500">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">Batal</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{cancelled}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
