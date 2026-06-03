import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  User, 
  AlertCircle, 
  Eye, 
  Edit, 
  Trash2,
} from "lucide-react";

export function TodaySchedule({ appointments = [], loading, error, onDelete }) {
  if (loading) {
    return (
      <div className="text-center py-10 text-sm text-slate-500 border border-dashed rounded-lg">
        Memuat daftar appointment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm">
        {error}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-slate-400 border border-dashed rounded-lg">
        Tidak ada appointment yang ditemukan.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">

      {/* Tabel Utama */}
      <div className="w-full min-w-[640px] bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
        <Table>
          <TableHeader className="bg-slate-50/50 border-none shadow-sm">
            <TableRow className="border-none">
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider pl-6 w-[100px]">
                TIME
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider w-[200px]">
                PATIENT
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider w-[160px]">
                DOCTOR
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider w-[180px]">
                STATUS
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider text-right pr-6">
                NO. ANTREAN
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider text-center pr-6">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((apt, index) => (
              <TableRow
                key={apt.id || index}
                className={`group relative border-b border-gray-200 last:border-0 ${
                  apt.hasHighlight ? "bg-orange-50/30" : "hover:bg-slate-50/50"
                }`}
              >
                <TableCell className={`py-4 pl-6 ${apt.hasHighlight ? 'border-l-3 border-l-orange-400 pr-4' : ''}`}>
                  <div className="font-bold text-slate-900 text-sm leading-none">{apt.time}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{apt.duration}</div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-gray-200 shadow-sm flex-shrink-0">
                      <AvatarImage src={apt.patient?.img} />
                      <AvatarFallback className="bg-slate-100">
                        <User className="w-4 h-4 text-slate-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 text-[13px] truncate">{apt.patient?.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{apt.patient?.type}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${apt.dotColor || "bg-emerald-400"}`} />
                    <span className="text-[13px] font-semibold text-slate-700 truncate">{apt.doctor}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1.5 items-start">
                    <Badge
                      variant="outline"
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-md shadow-none whitespace-nowrap ${apt.statusColor}`}
                    >
                      {apt.status}
                    </Badge>
                    {apt.needsAction && (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 font-bold italic whitespace-nowrap">
                        <AlertCircle size={11} className="stroke-[3px]" /> Needs Action
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-right pr-6">
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 font-bold">
                    {apt.queueNumber || String(index + 1).padStart(3, "0")}
                  </Badge>
                </TableCell>

                <TableCell className="text-center pr-6">
                  <div className="flex items-center justify-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => onDelete?.(apt.id)}
                      disabled={!apt.id}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
