import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

export function AppointmentSearch({
  searchPhone,
  onSearchPhoneChange,
  statusFilter = "ALL",
  onStatusFilterChange,
  appointments = [],
}) {
  const statusOptions = [
    "ALL",
    ...new Set(appointments.map((appointment) => appointment.status).filter(Boolean)),
  ];

  return (
    <div className="flex flex-col gap-3 mb-4 rounded-lg border border-slate-200 bg-slate-50/60 p-3 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Cari nama, no RM, antrian, dokter, catatan..."
          className="h-9 bg-white pl-10"
          value={searchPhone}
          onChange={(e) => onSearchPhoneChange(e.target.value)}
        />
      </div>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="h-9 w-full bg-white sm:w-48">
          <Filter className="h-4 w-4 text-slate-400" />
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status === "ALL" ? "Semua Status" : status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}