import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw } from "lucide-react";

export function AppointmentSearch({ searchPhone, onSearchPhoneChange, onSearch, onRefresh, loading, isSearching }) {
  return (
    <div className="flex gap-2 mb-6 max-w-md">
      <form onSubmit={onSearch} className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Cari nomor telepon pasien..." 
          className="pl-10"
          value={searchPhone}
          onChange={(e) => onSearchPhoneChange(e.target.value)}
        />
      </form>
      <Button variant="secondary" onClick={onSearch} disabled={loading}>
        Cari
      </Button>
      <Button variant="outline" size="icon" onClick={onRefresh} title="Reset / Refresh Semua">
        <RefreshCw className={`h-4 w-4 ${loading && !isSearching ? "animate-spin" : ""}`} />
      </Button>
    </div>
  );
}
