import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function AccountSecurity() {
  return (
    <Card className="flex flex-col gap-8 shadow-md border border-gray-300">
      <CardHeader className="flex flex-col items-start gap-0 border-b border-gray-300">
        <h3 className="text-lg font-semibold">Account Security</h3>
        <span className="text-xs text-gray-500">
          Manage authentication methods and password policies.
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 -mt-3 px-6">
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col items-start gap-1">
                <h4 className="text-sm font-semibold">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500">
                  Require a second form of verification for login attempts.
                </p>
            </div>

            <Button variant="ghost" size="sm" className="cursor-pointer shadow-md ">
              Enable 2FA
            </Button>
        </div>

        <Separator orientation="horizontal" className="bg-gray-300 h-0.5" />

        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col items-start gap-1">
                <h4 className="text-sm font-semibold">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500">
                  Require a second form of verification for login attempts.
                </p>
            </div>

            <Switch orientation="horizontal" className="bg-gray-300 " />
        </div>
      </CardContent>
    </Card>
  );
}
