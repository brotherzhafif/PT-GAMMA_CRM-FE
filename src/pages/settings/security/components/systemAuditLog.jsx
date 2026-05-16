import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, RefreshCcw, Settings, UserPlus } from "lucide-react";

export default function SystemAuditLog() {
    const auditLogs = [
        {
            id: 1,
            icon: Settings,
            action: "Admin Klinik",
            description: "Changed Chatbot Escalation Threshold to 85%",
            time: "2 hours ago",
        },
        {
            id: 2,
            icon: Download,
            action: "Dr. Siti Aminah",
            description: "Exported Patient Data (CSV)",
            time: "yesterday"
        },
        {
            id: 3,
            icon: UserPlus,
            action: "Admin Klinik",
            description: "Added new user: John Doe",
            time: "3 days ago"
        },
        {
            id: 4,
            icon: RefreshCcw,
            action: "System",
            description: "WhatsApp API Auto-Sync Completed",
            time: "5 days ago"
        }
    ]
  return (
    <Card className="flex flex-col gap-4 shadow-md border border-gray-300">
      <CardHeader className="gap-0 flex flex-row justify-between items-center border-b border-gray-300">
        <div className="flex flex-col gap-0 items-start">
          <h3 className="text-lg font-semibold">System Audit Log</h3>
          <span className="text-xs text-gray-500">
            Record of important changes made within the CRM.
          </span>
        </div>

        <Button variant="ghost" size="sm" className="cursor-pointer shadow-md">
          <Download />
          Export CSV
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 px-6">
        {auditLogs.map((log) => (
            <div key={log.id} className="flex flex-row gap-4 items-center w-full">
                <div className="min-w-8 h-8 shadow-sm bg-slate-100 rounded-full border-gray-100 flex items-center justify-center">
                    <log.icon className="w-4 h-4" />
                </div>

                <Card className='flex flex-row items-center justify-between w-full px-4 py-2 rounded-md border-gray-100 shadow-sm'>
                    <div className="flex flex-row gap-3 items-center">
                        <h4 className="text-sm font-semibold">{log.action}</h4>
                    <span className="text-xs text-gray-500">{log.description}</span>
                    </div>
                    <p className="text-xs text-gray-500">{log.time}</p>
                </Card>
            </div>
        ))}
        <Button variant="link" size="sm" className="self-center shadow-md w-full py-5">Load More Events</Button>
      </CardContent>
    </Card>
  );
}
