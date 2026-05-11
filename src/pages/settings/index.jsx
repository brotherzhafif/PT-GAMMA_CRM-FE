import { Card } from "@/components/ui/card";
import { Bot, LayoutDashboard, MessageCircle, Shield, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NavLink, Outlet } from "react-router-dom";

const menus = [
  { label: "General", path: "/settings", icon: LayoutDashboard },
  { label: "WhatsApp API", path: "/settings/whatsapp-api", icon: MessageCircle },
  { label: "Chatbot Settings", path: "/settings/chatbot-settings", icon: Bot },
  { label: "Users & Roles", path: "/settings/user-roles", icon: Users },
  { label: "Security", path: "/settings/security", icon: Shield },
];

export default function Settings() {
  return (
    <div className="flex flex-col w-full gap-6 h-[76vh] overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg">CRM Configuration</h3>
        <p className="text-gray-500 text-sm">
          Manage system preference, integration, and user access.
        </p>
      </div>

      {/* Main */}
      <Card className="w-full flex flex-row flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-[240px] border-r p-4 flex flex-col gap-2">
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/settings"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <Separator orientation="vertical" />

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-6">
            <Outlet />
          </div>
        </div>

      </Card>
    </div>
  );
}