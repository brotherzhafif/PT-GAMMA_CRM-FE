import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, UserX, BellRing } from "lucide-react";

export function DailySummaryCard({ appointments = [] }) {
  // Kalkulasi statistik dari data yang diberikan (array sudah terfilter per hari)
  const total = appointments.length;
  
  const confirmed = appointments.filter(
    (a) => a.status?.toLowerCase() === "confirmed" || a.status?.toLowerCase() === "konfirmasi"
  ).length;
  
  const cancelled = appointments.filter(
    (a) => a.status?.toLowerCase() === "cancelled" || a.status?.toLowerCase() === "batal"
  ).length;
  
  const noShow = appointments.filter(
    (a) => a.status?.toLowerCase() === "no show" || a.status?.toLowerCase() === "tidak hadir"
  ).length;
  
  // Menghitung status reminder yang telah terkirim
  const reminderSent = appointments.filter((a) => a.reminderSent === true).length;

  return (
    <Card className="mb-4 bg-white shadow-sm border-gray-200">
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
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">Konfirmasi</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{confirmed}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-rose-500">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">Batal</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{cancelled}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-amber-500">
              <UserX className="w-4 h-4" />
              <span className="text-xs font-semibold">Tidak Hadir</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{noShow}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-blue-500">
              <BellRing className="w-4 h-4" />
              <span className="text-xs font-semibold">Reminder Terkirim</span>
            </div>
            <span className="text-lg font-bold text-slate-800">{reminderSent}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}