import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";

export default function ApiCredential() {
  return (
    <Card className="p-4 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className=" font-semibold">API Credentials</h3>
        <p className="text-xs ">
          Configure tokens and IDs from your Meta Developer dashboard..
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>System User Access Token</Label>
          <div className="flex flex-row justify-between">
            <Input placeholder="Enter your access token" />
            <Button variant="outline" size="sm" className="cursor-pointer">
              Edit
            </Button>
          </div>
        </div>

        <div className="flex flex-row w-full gap-2 items-center justify-between">
          <div className="flex flex-col gap-2 w-full">
            <Label>Phone Number ID</Label>
            <Input placeholder="Enter your phone number ID" />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label>WhatsApp Business Account ID</Label>
            <Input placeholder="Enter your WhatsApp Business account ID" />
          </div>
        </div>
      </div>

      <Separator orientation="horizontal" className="bg-gray-500 h-1" />

      <div className="flex flex-col gap-1 w-full">
        <Label>Webhook URL</Label>
        <div className="flex flex-row justify-between">
          <Input placeholder="https://webhook.url" className="bg-green-100 text-green-500" />
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
