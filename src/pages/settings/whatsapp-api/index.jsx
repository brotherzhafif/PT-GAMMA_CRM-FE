import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";
import ApiCredential from "./components/api-credential";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WhatsapApi() {
  return (
    <div className="flex flex-col gap-5 h-full">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">WhatsApp API Settings</h3>
        <p className="text-xs text-gray-500">
          Manage your connection to the WhatsApp Cloud API and sync message
          templates.
        </p>
      </div>

      {/* Scroll Area */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-5 pr-4">

          <Card className="w-full flex flex-col p-4 gap-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-start">
                <h4 className="font-semibold">Connection Status</h4>
                <span className="text-xs">
                  Your WhatsApp Business account integration status.
                </span>
              </div>

              <Badge className="text-xs flex items-center gap-2 text-green-500 bg-green-100">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Connected
              </Badge>
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-3 items-center">
                <div className="flex w-10 h-10 bg-green-100 rounded-md items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <h4 className="font-semibold">Connected Phone Number</h4>
                  <h3 className="font-semibold">+62 123 456 789</h3>
                  <p className="text-xs">Quality Rating: High</p>
                </div>
              </div>

              <Badge variant="destructive" className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                Disconnected
              </Badge>
            </div>
          </Card>

          <ApiCredential />

        </div>
      </ScrollArea>
    </div>
  );
}