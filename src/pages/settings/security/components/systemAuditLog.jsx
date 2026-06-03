import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, RefreshCcw, Settings, Shield, UserPlus } from "lucide-react";
import { useAuditLogs } from "../hooks/useSecurityActivity";

const getAuditIcon = (log) => {
  const source = `${log.action} ${log.description}`.toLowerCase();

  if (source.includes("user")) return UserPlus;
  if (source.includes("export") || source.includes("download")) return Download;
  if (source.includes("security") || source.includes("login")) return Shield;
  if (source.includes("sync") || source.includes("refresh")) return RefreshCcw;

  return Settings;
};

export default function SystemAuditLog() {
  const { error, loading, logs } = useAuditLogs();

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
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading audit logs...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No audit logs found.</p>
        ) : (
          logs.map((log) => {
            const AuditIcon = getAuditIcon(log);

            return (
              <div key={log.id} className="flex flex-row gap-4 items-center w-full">
                <div className="min-w-8 h-8 shadow-sm bg-slate-100 rounded-full border-gray-100 flex items-center justify-center">
                  <AuditIcon className="w-4 h-4" />
                </div>

                <Card className="flex flex-row items-center justify-between w-full px-4 py-2 rounded-md border-gray-100 shadow-sm">
                  <div className="flex flex-row gap-3 items-center min-w-0">
                    <h4 className="text-sm font-semibold whitespace-nowrap">
                      {log.actor}
                    </h4>
                    <span className="text-xs text-gray-500 truncate">
                      {log.description}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 whitespace-nowrap">
                    {log.time}
                  </p>
                </Card>
              </div>
            );
          })
        )}

        {logs.length > 0 && (
          <Button variant="link" size="sm" className="self-center shadow-md w-full py-5">
            Load More Events
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
