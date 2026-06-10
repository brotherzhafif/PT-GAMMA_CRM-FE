import { Calendar } from "@/components/ui/calendar";

export function AppointmentCalendar(props) {
  return (
    <Calendar
      mode="single"
      className="w-full rounded-lg border border-gray-300 bg-white p-2 shadow-sm [--cell-size:--spacing(7)]"
      {...props}
    />
  );
}
