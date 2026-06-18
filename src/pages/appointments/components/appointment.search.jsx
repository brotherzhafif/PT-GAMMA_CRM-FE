import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, RefreshCw, Search } from "lucide-react";

export function AppointmentSearch({
  searchPhone,
  onSearchPhoneChange,
  onSearch,
  onRefresh,
  loading,
  isSearching,
  statusFilter = "ALL",
  onStatusFilterChange,
  appointments = [],
}) {
  const statusOptions = ["ALL", ...new Set(appointments.map((appointment) => appointment.status).filter(Boolean))];

  return (
    <div className="flex flex-col gap-3 mb-4 rounded-lg border border-slate-200 bg-slate-50/60 p-3 md:flex-row md:items-center">
      <form onSubmit={onSearch} className="relative min-w-0 flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Cari nama, no RM, antrian, dokter, catatan..."
          className="h-9 bg-white pl-10"
          value={searchPhone}
          onChange={(e) => onSearchPhoneChange(e.target.value)}
        />
      </form>
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 sm:flex sm:flex-wrap">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="h-9 w-full bg-white">
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
        <Button variant="secondary" onClick={onSearch} disabled={loading} className="h-9 px-4 shadow-md">
          Cari
        </Button>
        <Button variant="outline" size="icon" onClick={onRefresh} title="Reset / Refresh Semua" className="h-9 w-9 bg-white">
          <RefreshCw className={`h-4 w-4 ${loading && !isSearching ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
  );
}
