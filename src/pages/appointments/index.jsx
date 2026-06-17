import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AppointmentCalendar } from "./components/appointment.calendar";
import { TodaySchedule } from "./components/today.schedule";
import { AppointmentSearch } from "./components/appointment.search";
import { DailySummaryCard } from "./components/daily.summary.card";
import { formatDateForApi, useAppointments } from "./hooks/useAppointments.hook";

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const headerSearchQuery = searchParams.get("search");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("ALL");
  const {
    appointments,
    loading,
    error,
    searchPhone,
    isSearching,
    setSearchPhone,
    fetchAppointments,
  } = useAppointments(selectedDate);

  useEffect(() => {
    if (headerSearchQuery !== null) {
      setSearchPhone(headerSearchQuery);
    }
  }, [headerSearchQuery, setSearchPhone]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setStatusFilter("ALL");
    fetchAppointments(selectedDate);
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const scheduleTitle = isToday ? "Today's Schedule" : "Schedule";
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  const formattedDateTime = isToday
    ? `${formattedDate} - ${currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}`
    : formattedDate;

  const filteredAppointments = appointments.filter((apt) => {
    const dateString = apt.tanggalKunjungan || apt.date;
    const matchesDate = !dateString || dateString.slice(0, 10) === formatDateForApi(selectedDate);
    const matchesStatus = statusFilter === "ALL" || apt.status === statusFilter;
    const keyword = searchPhone.trim().toLowerCase();
    const searchableText = [
      apt.patient?.name,
      apt.patient?.noRm,
      apt.patient?.phone,
      apt.queueNumber,
      apt.doctor,
      apt.specialty,
      apt.status,
      apt.catatan,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesDate && matchesStatus && (!keyword || searchableText.includes(keyword));
  });

  return (
    <div className="w-full flex gap-4 h-[78vh] min-h-0 overflow-hidden">
      <aside className="w-72 flex-shrink-0 h-full min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4 p-1 pr-4">
            <AppointmentCalendar 
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
            />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </aside>

      <main className="flex-1 min-w-0 h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{scheduleTitle}</h3>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none px-2 py-0.5">
              {formattedDateTime}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="lg" className="bg-white border-gray-300 text-slate-600 hover:text-emerald-600  shadow-sm" title="Lihat Ringkasan Harian">
                  <Eye className="w-4 h-4" /> Summary
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[750px] max-w-[90vw] p-0 border-none shadow-none bg-transparent" align="end" sideOffset={8}>
                <DailySummaryCard appointments={filteredAppointments} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 pb-6 pt-2">
            <AppointmentSearch
              searchPhone={searchPhone}
              onSearchPhoneChange={setSearchPhone}
              onSearch={(event) => event?.preventDefault()}
              onRefresh={handleRefresh}
              loading={loading}
              isSearching={isSearching}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              appointments={appointments}
            />
            <TodaySchedule
              appointments={filteredAppointments}
              loading={loading}
              error={error}
            />
          </div>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
    </div>
  );
}
