import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Activity, Database, Phone, Server } from "lucide-react";
import ApiCredential from "./components/api-credential";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConnectionStatus } from "./hooks/useConnectionStatus";

const StatusBadge = ({ connected, label }) => (
  <Badge
    className={`text-xs flex items-center gap-2 ${
      connected
        ? "text-green-600 bg-green-100"
        : "text-red-600 bg-red-100"
    }`}
  >
    <div
      className={`w-2 h-2 rounded-full ${
        connected ? "bg-green-500" : "bg-red-500"
      }`}
    />
    {label}
  </Badge>
);

const ConnectionSummary = ({ icon: Icon, title, connection }) => (
  <div className="flex flex-row items-center justify-between gap-4">
    <div className="flex flex-row gap-3 items-center min-w-0">
      <div
        className={`flex w-10 h-10 rounded-md items-center justify-center ${
          connection.connected ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            connection.connected ? "text-green-600" : "text-red-600"
          }`}
        />
      </div>

      <div className="flex flex-col gap-1 items-start min-w-0">
        <h4 className="font-semibold">{title}</h4>
        <h3 className="font-semibold truncate max-w-[360px]">
          {connection.phoneNumber}
        </h3>
        <p className="text-xs text-muted-foreground">
          Quality Rating: {connection.quality}
        </p>
        <p className="text-xs text-muted-foreground truncate max-w-[420px]">
          {connection.message}
        </p>
      </div>
    </div>

    <StatusBadge
      connected={connection.connected}
      label={connection.status}
    />
  </div>
);

export default function WhatsapApi() {
  const {
    apiHealthy,
    health,
    rmeConnection,
    whatsappConnection,
  } = useConnectionStatus();

  return (
    <div className="flex flex-col gap-5 h-full mb-10">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">WhatsApp API Settings</h3>
        <p className="text-xs text-gray-500">
          Manage your connection to the WhatsApp Cloud API and sync message
          templates.
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-5 pr-4">
          <Card className="w-full flex flex-col p-4 gap-4 shadow-md border border-gray-300 ">
            <div className="flex flex-row items-center justify-between border-b pb-4 border-gray-300" >
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-lg">Connection Status</h3>
                <span className="text-xs text-muted-foreground">
                  Live service health and integration status.
                </span>
              </div>

              <StatusBadge
                connected={apiHealthy}
                label={apiHealthy ? "API Healthy" : "API Unavailable"}
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-4 rounded-md bg-muted/40 p-3">
              <div className="flex flex-row gap-3 items-center min-w-0">
                <Server className="w-5 h-5 text-muted-foreground" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm">API Health Check</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {health?.message || "Checking API health."}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {health?.docs || "/docs"}
              </Badge>
            </div>

            <ConnectionSummary
              icon={Phone}
              title="WhatsApp Business Connection"
              connection={whatsappConnection}
            />

            <ConnectionSummary
              icon={Database}
              title="SmartClinic RME Connection"
              connection={rmeConnection}
            />

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="w-4 h-4" />
              Status updates are streamed from the API in real time.
            </div>
          </Card>

          {/* <ApiCredential /> */}
        </div>
      </ScrollArea>
    </div>
  );
}
