"use client"


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { AudioLinesIcon, TerminalIcon, Settings2Icon, Activity, LayoutDashboardIcon, MessageSquare, Users, Calendar, Megaphone, Star, HelpCircle } from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Klinik CRM",
      logo: (
        <Activity />
      ),
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: (
        <LayoutDashboardIcon />
      ),
      isActive: true,
    },
    {
      title: "Unified Box",
      url: "/inbox",
      icon: (
        <MessageSquare />
      ),
    },
    {
      title: "Patients",
      url: "/patients",
      icon: (
        <Users />
      ),
    },
    {
      title: "Appointments",
      url: "/appointments",
      icon: (
        <Calendar />
      ),
    },
    {
      title: "Marketing",
      url: "/marketing",
      icon: (
        <Megaphone />
      ),
    },
    {
      title: "Loyalty",
      url: "/loyalty",
      icon: (
        <Star />
      ),
    },
  ],
  projects: [
    {
      name: "Settings",
      url: "/settings",
      icon: (
        <Settings2Icon />
      ),
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-300">
        {/* <NavUser user={data.user} /> */}
        <Button variant="link" size="sm" className="py-5 w-full flex flex-row items-center justify-start cursor-pointer text-gray-400 gap-2">
          <HelpCircle />
          <span>Help & Support</span>
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
