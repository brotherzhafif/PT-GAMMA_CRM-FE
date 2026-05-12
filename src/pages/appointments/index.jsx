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
              MAR 12, 2024
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
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 h-9 px-4 font-bold shadow-md">
              <Plus className="w-4 h-4 stroke-[3px]" /> New Booking
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 pb-6 pt-2">
            <TodaySchedule />
          </div>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
    </div>
  );
}