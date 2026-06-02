import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { appointmentService } from "@/services/appointment.service";

// 1. KOMPONEN MODAL DENGAN INTEGRASI API POST (BUAT JANJI TEMU)
export function BookingModal({ open, onOpenChange, onRefresh }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jadwalId, setJadwalId] = useState("jadwal-default-123"); // Sesuai kebutuhan API Anda
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tanggal kunjungan otomatis diset hari ini (YYYY-MM-DD)
  const todayDate = new Date().toISOString().split('T')[0];

  if (!open) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      alert("Nomor telepon wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    try {
      await appointmentService.createAppointmentModal({
        phone_number: phoneNumber,
        jadwalId: jadwalId,
        tanggalKunjungan: todayDate,
        catatan: catatan || "Pendaftaran via Admin Dashboard",
        jenisKunjunganBpjs: "NON_BPJS",
        noRujukanFktp: ""
      });

      alert("Janji temu berhasil dibuat!");
      
      // Bersihkan form
      setPhoneNumber("");
      setCatatan("");
      
      // Tutup modal dan refresh data pada tabel utama
      onOpenChange(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tambah Janji Temu Baru</h2>
          <button onClick={() => onOpenChange(false)} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nomor Telepon Pasien</label>
            <Input 
              placeholder="Contoh: 08123456789" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ID Jadwal Dokter</label>
            <Input 
              value={jadwalId}
              onChange={(e) => setJadwalId(e.target.value)}
              placeholder="Masukkan ID Jadwal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Catatan Tambahan</label>
            <Input 
              placeholder="Keluhan awal / Catatan admin"
              value={catatan} 
              onChange={(e) => setCatatan(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Janji Temu"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}