import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BringToFront, Megaphone, Shield, Star } from "lucide-react";

export default function RolePermissions() {
  return (
    <Card className="flex flex-col gap-8 shadow-md border border-gray-300">
      <CardHeader className="gap-0 flex flex-row justify-between items-center border-b border-gray-300">
        <div className="flex flex-col gap-0 items-start">
          <h3 className="text-lg font-semibold">Role Permissions</h3>
          <span className="text-xs text-gray-500">
            Define what each role can access and modify.
          </span>
        </div>

        <Button variant="ghost" size="sm" className="cursor-pointer shadow-md ">
          <Shield />
          Invite Users
        </Button>
      </CardHeader>

      <CardContent className="px-6 gap-4 flex flex-col">
        <Card className="px-6 flex flex-row justify-between items-center shadow-sm py-4">
          <div className="flex flex-col gap-1 items-start">
            <div className="flex flex-row gap-2 items-center">
              <Star className="text-yellow-500" />
              <h3 className="text-sm font-semibold">Super Admin</h3>
            </div>
            <span className="text-xs text-gray-500">
              Full Access to all settings, billing, and user management.
            </span>
          </div>

          <Button variant="link" size="sm" className="cursor-pointer shadow-md ">
            View Details
          </Button>
        </Card>
        <Card className="px-6 flex flex-row justify-between items-center shadow-sm py-4">
          <div className="flex flex-col gap-1 items-start">
            <div className="flex flex-row gap-2 items-center">
              <BringToFront className="text-green-500" />
              <h3 className="text-sm font-semibold">Front Desk</h3>
            </div>
            <span className="text-xs text-gray-500">
              Can access unified inbox, appointments, and patient profiles.
            </span>
          </div>

          <Button variant="link" size="sm" className="cursor-pointer shadow-md ">
            View Details
          </Button>
        </Card>
        <Card className="px-6 flex flex-row justify-between items-center shadow-sm py-4">
          <div className="flex flex-col gap-1 items-start">
            <div className="flex flex-row gap-2 items-center">
              <Megaphone className="text-green-500" />
              <h3 className="text-sm font-semibold">Marketing</h3>
            </div>
            <span className="text-xs text-gray-500">
             Can manage campaigns, broadcast messages, and view analytics.
            </span>
          </div>

          <Button variant="link" size="sm" className="cursor-pointer shadow-md ">
            View Details
          </Button>
        </Card>
      </CardContent>
    </Card>
  );
}
