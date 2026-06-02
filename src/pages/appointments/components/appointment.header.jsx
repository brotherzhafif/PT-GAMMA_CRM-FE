import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AppointmentHeader({ todayDate, onOpenModal }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Daftar Antrean Janji Temu</h1>
        <p className="text-sm text-slate-500 mt-1">Tanggal: {todayDate}</p>
      </div>
      
      <Button 
        onClick={onOpenModal}
        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
      >
        <Plus className="h-4 w-4" /> Tambah Janji Temu
      </Button>
    </div>
  );
}