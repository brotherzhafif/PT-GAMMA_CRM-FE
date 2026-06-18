import { Card } from "@/components/ui/card";
import {
  Bot,
  // LayoutDashboard,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const menus = [
  // { label: "General", path: "/settings", icon: LayoutDashboard },
  {
    label: "WhatsApp API",
    path: "/settings",
    icon: MessageCircle,
  },
  { label: "Chatbot Settings", path: "/settings/chatbot-settings", icon: Bot },
  { label: "Users & Roles", path: "/settings/user-roles", icon: Users },
  { label: "Security", path: "/settings/security", icon: Shield },
];

export default function Settings() {
  return (
    <div className="flex flex-col w-full gap-4 overflow-visible md:h-[81vh] md:overflow-hidden md:gap-6">
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-base font-semibold sm:text-lg">CRM Configuration</h3>
        <p className="text-gray-500 text-sm leading-5">
          Manage system preference, integration, and user access.
        </p>
      </div>

      <Card className="w-full flex flex-col overflow-visible border border-gray-300 shadow-md md:min-h-0 md:flex-1 md:overflow-hidden md:flex-row">
        <div className="border-b border-gray-300 md:w-[240px] md:border-b-0 md:border-r">
          <ScrollArea className="w-full whitespace-nowrap md:h-full">
            <div className="flex w-max gap-2 p-3 md:w-full md:flex-col md:p-4">
              {menus.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/settings"}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
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
            <ScrollBar orientation="horizontal" className="md:hidden" />
          </ScrollArea>
        </div>

        <div className="min-h-0 flex-1 overflow-visible md:overflow-hidden">
          <ScrollArea className="w-full md:h-full">
            <Outlet />
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
}
