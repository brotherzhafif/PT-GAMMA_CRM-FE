import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function AppointmentItem({ appointment, onCancel }) {
  const currentId = appointment.id || appointment._id;
  
  return (
    <div className="p-4 border rounded-xl flex justify-between items-center bg-white hover:shadow-sm transition-shadow">
      <div>
        <p className="font-bold text-slate-800">
          {appointment.patient?.name || appointment.namaPasien || "Nama Tidak Tersedia"}
        </p>
        <p className="text-sm text-slate-500">
          {appointment.doctor || appointment.namaDokter || "Dokter Umum"} • {appointment.catatan || appointment.patient?.type || "Konsultasi"}
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-slate-700">{appointment.time || appointment.jam || "Hari Ini"}</p>
          <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">
            {appointment.status || "CONFIRMED"}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
          title="Batalkan Janji Temu"
          onClick={() => onCancel(currentId)}
          disabled={!currentId}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function AppointmentList({ appointments, loading, error, isSearching, onCancel }) {
  if (loading) return <div className="text-center py-8 text-slate-500">{isSearching ? "Mencari data pasien..." : "Memuat daftar antrean..."}</div>;
  
  if (error) return <div className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl mb-4 text-sm">{error}</div>;
  
  if (appointments.length === 0) return <div className="text-center py-8 text-slate-400 border border-dashed rounded-xl">Tidak ada antrean yang ditemukan.</div>;

  return (
    <div className="space-y-3">
      {appointments.map((appt, index) => (
        <AppointmentItem 
          key={appt.id || appt._id || index} 
          appointment={appt} 
          onCancel={onCancel} 
        />
      ))}
    </div>
  );
}