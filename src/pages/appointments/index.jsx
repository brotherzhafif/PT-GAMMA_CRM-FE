import { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppointmentCalendar } from "./components/appointment.calendar";
import { DoctorsCard } from "./components/doctors.card";
import { InsightsCard } from "./components/insights.card";
import { TodaySchedule } from "./components/today.schedule";
import { BookingModal } from "./components/new.booking.modal";
import { appointmentService } from "@/services/appointment.service";

const initialAppointments = [
  {
    time: "09:00 AM",
    duration: "30m",
    patient: { name: "Budi Santoso", type: "General Checkup", img: "" },
    doctor: "Dr. Siti Aminah",
    status: "COMPLETED",
    source: "AI Chat",
    statusColor: "bg-slate-100 text-slate-500 border-slate-200",
  },
];

export default function Appointments() {
  const [viewMode, setViewMode] = useState("Daily");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // State tambahan untuk fitur pencarian dan error handling
  const [searchPhone, setSearchPhone] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Update waktu secara real-time setiap detik
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. Fungsi Ambil Semua Antrean (Mengembalikan Array)
  const fetchQueues = async () => {
    setLoading(true);
    setError(null);
    setSearchPhone("");
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      const API_URL = import.meta.env.VITE_API_URL || "https://ai-crm.brotherzhafif.my.id/api";
      const response = await fetch(`${API_URL}/appointment?tanggal=${todayDate}`);
      if (!response.ok) throw new Error("Gagal mengambil data antrean");
      
      const resData = await response.json();
      
      // Pastikan data yang dimasukkan berbentuk Array
      if (Array.isArray(resData.data)) {
        setAppointments(resData.data);
      } else {
        setAppointments([]); // Jika kosong atau bukan array, reset jadi array kosong
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fungsi Cari Berdasarkan Nomor Telepon (Bisa mengembalikan Object Tunggal)
  const handleSearchByPhone = async (e) => {
    if (e) e.preventDefault();
    if (!searchPhone.trim()) {
      fetchQueues();
      return;
    }

    setIsSearching(true);
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://ai-crm.brotherzhafif.my.id/api";
      const response = await fetch(`${API_URL}/appointment/appointments/by-phone?phone_number=${encodeURIComponent(searchPhone)}`);
      if (response.status === 404) {
        setAppointments([]);
        throw new Error("Pasien dengan nomor telepon tersebut tidak ditemukan");
      }
      if (!response.ok) throw new Error("Gagal mencari antrean");

      const resData = await response.json();
      
      // VALIDASI DI SINI: Jika API mengembalikan Object tunggal, bungkus ke dalam Array [ ]
      if (Array.isArray(resData.data)) {
        setAppointments(resData.data);
      } else if (resData.data && typeof resData.data === "object") {
        setAppointments([resData.data]); // Dibungkus menjadi array satu elemen agar bisa di-.map()
      } else {
        setAppointments([]);
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  // POST: Menambahkan appointment baru ke API RME
  const handleAddAppointment = async (newAppointment) => {
    try {
      const response = await appointmentService.addAppointment(newAppointment);
      const addedData = response.data?.data || newAppointment;
      setAppointments((prev) => [...prev, addedData]);
    } catch (err) {
      console.error("Gagal mendaftarkan appointment ke RME:", err);
      // Fallback: Menyimpan ke local state jika API gagal
      setAppointments((prev) => [...prev, newAppointment]);
    }
  };

  // PUT: Update data appointment ke API RME (contoh penggunaan untuk aksi edit nanti)
  const handleUpdateAppointment = async (id, updatedData) => {
    try {
      const response = await appointmentService.updateAppointment(id, updatedData);
      if (response.data) {
        setAppointments((prev) => prev.map(apt => apt.id === id ? { ...apt, ...updatedData } : apt));
      }
    } catch (err) {
      console.error("Gagal mengubah data appointment:", err);
    }
  };

  // DELETE: Menghapus data appointment dari API RME (contoh penggunaan untuk aksi hapus)
  const handleDeleteAppointment = async (id) => {
    try {
      await appointmentService.deleteAppointment(id);
      setAppointments((prev) => prev.filter(apt => apt.id !== id));
    } catch (err) {
      console.error("Gagal menghapus data appointment:", err);
    }
  };

  // Format tanggal dan waktu untuk header
  const formattedDateTime = `${currentTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase()} - ${currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}`;

  return (
    <div className="w-full flex gap-4 h-[78vh] min-h-0 overflow-hidden">
      <aside className="w-80 flex-shrink-0 h-full min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4 p-1 pr-4">
            <AppointmentCalendar />
            <DoctorsCard />
            <InsightsCard />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </aside>

      <main className="flex-1 min-w-0 h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Today's Schedule</h3>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none px-2 py-0.5">
              {formattedDateTime}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-gray-300 shadow-inner">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("Daily")}
                className={
                  viewMode === "Daily"
                    ? "bg-white shadow-sm h-7 text-xs px-4 rounded-md"
                    : "text-slate-500 hover:text-slate-800 h-7 text-xs px-4"
                }
              >
                Daily
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("Weekly")}
                className={
                  viewMode === "Weekly"
                    ? "bg-white shadow-sm h-7 text-xs px-4 rounded-md"
                    : "text-slate-500 hover:text-slate-800 h-7 text-xs px-4"
                }
              >
                Weekly
              </Button>
            </div>
            <Button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 h-9 px-4 font-bold shadow-md"
            >
              <Plus className="w-4 h-4 stroke-[3px]" /> New Booking
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 pb-6 pt-2">
            <TodaySchedule appointments={appointments} />
          </div>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
      
      {/* Modal Dialog New Booking dari Header */}
      <BookingModal 
        open={isBookingModalOpen} 
        onOpenChange={setIsBookingModalOpen}
        onConfirm={handleAddAppointment}
      />
    </div>
  );
}