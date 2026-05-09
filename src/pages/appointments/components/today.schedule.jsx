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
import { Bot, User, AlertCircle } from "lucide-react";

const appointments = [
  {
    time: "09:00 AM",
    duration: "30m",
    patient: { name: "Budi Santoso", type: "General Checkup", img: "" },
    doctor: "Dr. Siti Aminah",
    status: "COMPLETED",
    source: "AI Chat",
    statusColor: "bg-slate-100 text-slate-500 border-slate-200",
  },
  {
    time: "09:30 AM",
    duration: "45m",
    patient: { name: "Anita Wijaya", type: "Orthodontics", img: "" },
    doctor: "Dr. Hendra",
    status: "IN PROGRESS",
    source: "Admin",
    statusColor: "bg-emerald-50 text-emerald-500 border-emerald-100",
  },
  {
    time: "10:30 AM",
    duration: "1h",
    patient: { name: "Rina Melati", type: "Teeth Whitening", img: "" },
    doctor: "Dr. Siti Aminah",
    status: "WAITING IN LOBBY",
    source: "AI Chat",
    statusColor: "bg-orange-50 text-orange-500 border-orange-100",
    hasHighlight: true,
  },
  {
    time: "01:00 PM",
    duration: "30m",
    patient: { name: "Tommy Setiawan", type: "Skin Consultation", img: "" },
    doctor: "Dr. Maya Sari",
    status: "CONFIRMED",
    source: "Admin",
    statusColor: "bg-emerald-50 text-emerald-500 border-emerald-100",
    dotColor: "bg-orange-400",
  },
  {
    time: "02:00 PM",
    duration: "1h",
    patient: { name: "Siti Aisyah", type: "Dental Scaling", img: "" },
    doctor: "Dr. Siti Aminah",
    status: "PENDING CONFIRMATION",
    source: "AI Chat",
    statusColor: "bg-red-50 text-red-500 border-red-100",
    hasHighlight: true,
    needsAction: true,
  },
];

export function TodaySchedule() {
  return (
    <div className="w-full min-w-[640px] bg-white rounded-xl shadow-sm shadow-md overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50 border-none">
          <TableRow>
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
              SOURCE
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((apt, index) => (
            <TableRow
              key={index}
              className={`group relative border-b border-gray-200 last:border-0 ${
                apt.hasHighlight ? "bg-orange-50/30" : "hover:bg-slate-50/50"
              }`}
            >
              {apt.hasHighlight && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-400" />
              )}

              <TableCell className="py-4 pl-6">
                <div className="font-bold text-slate-900 text-sm leading-none">{apt.time}</div>
                <div className="text-[11px] text-slate-400 mt-1">{apt.duration}</div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border border-gray-200 shadow-sm flex-shrink-0">
                    <AvatarImage src={apt.patient.img} />
                    <AvatarFallback className="bg-slate-100">
                      <User className="w-4 h-4 text-slate-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 text-[13px] truncate">{apt.patient.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{apt.patient.type}</div>
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
                <div className="flex items-center justify-end gap-1.5 text-[11px] font-medium text-slate-400 whitespace-nowrap">
                  {apt.source === "AI Chat" ? (
                    <Bot size={13} className="text-emerald-500" />
                  ) : (
                    <User size={13} className="text-orange-400" />
                  )}
                  {apt.source}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}