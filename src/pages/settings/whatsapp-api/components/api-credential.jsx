import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";

export default function ApiCredential() {
  return (
    <Card className="p-4 flex flex-col gap-8 shadow-md border border-gray-300">
      <div className="flex flex-col gap-1 border-b border-gray-300 pb-4">
        <h3 className="font-semibold text-lg">API Credentials</h3>
        <p className="text-xs text-muted-foreground">
          Configure tokens and IDs from your Meta Developer dashboard..
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>System User Access Token</Label>
          <div className="flex flex-row gap-4 justify-between">
            <Input placeholder="Enter your access token" className="border-gray-300 shadow-sm" />
            <Button variant="ghost" size="lg" className="cursor-pointer">
              Edit
            </Button>
          </div>
        </div>

        <div className="flex flex-row w-full gap-2 items-center justify-between">
          <div className="flex flex-col gap-2 w-full">
            <Label>Phone Number ID</Label>
            <Input placeholder="Enter your phone number ID" className="border-gray-300 shadow-sm" />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label>WhatsApp Business Account ID</Label>
            <Input placeholder="Enter your WhatsApp Business account ID" className="border-gray-300 shadow-sm" />
          </div>
        </div>
      </div>

      <Separator orientation="horizontal" className="bg-gray-300 h-0.5" />

      <div className="flex flex-col gap-2 w-full">
        <Label>Webhook URL</Label>
        <div className="flex flex-row gap-4 justify-between">
          <Input placeholder="https://webhook.url" className="bg-green-50  border-gray-300 shadow-sm" />
          <Button variant="ghost" size="sm" className="cursor-pointer">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
