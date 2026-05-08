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
    hasHighlight: true, // Garis oranye di kiri
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
    hasHighlight: true, // Garis oranye di kiri
    needsAction: true,
  },
];

export function TodaySchedule() {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider pl-6">TIME</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider">PATIENT</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider">DOCTOR</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider">STATUS</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider text-right pr-6">SOURCE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((apt, index) => (
            <TableRow
              key={index}
              className={`group relative border-b border-gray-300 last:border-0 ${
                apt.hasHighlight ? "bg-orange-50/30" : "hover:bg-slate-50/50"
              }`}
            >
              {/* Garis Vertikal Oranye (Left Border Highlight) */}
              {apt.hasHighlight && (
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-orange-400" />
              )}

              <TableCell className="py-5 pl-6">
                <div className="font-bold text-slate-900 text-sm leading-none">{apt.time}</div>
                <div className="text-[11px] text-slate-400 mt-1">{apt.duration}</div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border-2 border-gray-300 border-white shadow-sm">
                    <AvatarImage src={apt.patient.img} />
                    <AvatarFallback className="bg-slate-100">
                      <User className="w-4 h-4 text-slate-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-slate-800 text-[13px]">{apt.patient.name}</div>
                    <div className="text-[11px] text-slate-400">{apt.patient.type}</div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${apt.dotColor || "bg-emerald-400"}`} />
                  <span className="text-[13px] font-semibold text-slate-700">{apt.doctor}</span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-col gap-1.5 items-start">
                  <Badge
                    variant="outline"
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-md border border-gray-300 shadow-none ${apt.statusColor}`}
                  >
                    {apt.status}
                  </Badge>
                  {apt.needsAction && (
                    <div className="flex items-center gap-1 text-[10px] text-red-500 font-bold italic">
                      <AlertCircle size={12} className="stroke-[3px]" /> Needs Action
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell className="text-right pr-6">
                <div className="flex items-center justify-end gap-2 text-[11px] font-medium text-slate-400">
                  {apt.source === "AI Chat" ? (
                    <Bot size={14} className="text-emerald-500" />
                  ) : (
                    <User size={14} className="text-orange-400" />
                  )}
                  {apt.source === "AI Chat" ? "AI C" : "Adn"}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}