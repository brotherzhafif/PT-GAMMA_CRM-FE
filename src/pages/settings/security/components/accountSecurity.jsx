import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { logoutAllDevices } from "@/services/auth.service";

export default function AccountSecurity() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogoutAllDevices = async () => {
    const confirmed = window.confirm(
      "Log out all devices? You will need to sign in again.",
    );

    if (!confirmed) return;

    setLoggingOut(true);
    await logoutAllDevices();
    navigate("/login", { replace: true });
  };

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

        <Separator orientation="horizontal" className="bg-gray-300 h-0.5" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-1">
            <h4 className="text-sm font-semibold">Log out all devices</h4>
            <p className="text-xs text-gray-500">
              End this browser session now. Other device revocation requires
              backend session invalidation support.
            </p>
          </div>

          <Button
            className="cursor-pointer sm:shrink-0"
            disabled={loggingOut}
            onClick={handleLogoutAllDevices}
            size="sm"
            variant="destructive"
          >
            {loggingOut ? "Logging out..." : "Log out all devices"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
