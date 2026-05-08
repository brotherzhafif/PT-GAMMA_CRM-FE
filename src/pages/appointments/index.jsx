import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppointmentCalendar } from "./components/appointment.calendar";
import { DoctorsCard } from "./components/doctors.card";
import { InsightsCard } from "./components/insights.card";
import { TodaySchedule } from "./components/today.schedule";


export default function Appointments() {
  const [viewMode, setViewMode] = useState("Daily");

  return (
    <div className="w-full h-screen flex gap-4 p-4 bg-[#f8fafc] overflow-hidden">
      {/* SIDEBAR KIRI */}
      <aside className="w-80 h-full flex-shrink-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4 p-1">
            {/* Calendar Card */}
            <AppointmentCalendar />

            {/* Doctors Card */}
            <DoctorsCard />

            {/* Insights Card */}
            <InsightsCard />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </aside>

      {/* MAIN CONTENT - KANAN */}
      <main className="flex-1 h-full bg-white rounded-xl shadow-sm border border-gray-300 flex flex-col overflow-hidden">
        {/* Header Table */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Today's Schedule</h3>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none px-2 py-0.5">
              MAR 12, 2024
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-gray-300 shadow-inner">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewMode("Daily")}
                className={viewMode === "Daily" ? "bg-white shadow-sm h-7 text-xs px-4 rounded-md" : "text-slate-500 hover:text-slate-800 h-7 text-xs px-4"}
              >
                Daily
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewMode("Weekly")}
                className={viewMode === "Weekly" ? "bg-white shadow-sm h-7 text-xs px-4 rounded-md" : "text-slate-500 hover:text-slate-800 h-7 text-xs px-4"}
              >
                Weekly
              </Button>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 h-9 px-4 font-bold shadow-md">
              <Plus className="w-4 h-4 stroke-[3px]" /> New Booking
            </Button>
          </div>
        </div>

        {/* Table Area */}
        <ScrollArea className="flex-1">
          <div className="px-6 pb-6">
            <TodaySchedule />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}