import { Calendar } from "@/components/ui/calendar";

export function AppointmentCalendar() {
  return (
    <Calendar
      mode="single"
      className="rounded-xl shadow-sm border border-gray-300 bg-white w-full"
    />
  );
}