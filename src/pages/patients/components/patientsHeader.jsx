import { Bell } from "lucide-react";

export default function PatientsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">Patient Database</h2>
        <p className="text-sm text-muted-foreground">
          Manage patient records and communication.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-muted-foreground" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">Dr. Siti Aminah</p>
            <p className="text-xs text-muted-foreground">
              Super Admin
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-emerald-100" />
        </div>
      </div>
    </div>
  );
}