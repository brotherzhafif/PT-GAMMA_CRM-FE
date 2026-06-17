"use client"


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { getStoredUser } from "@/services/auth.service"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  AudioLinesIcon, 
  TerminalIcon, 
  Settings2Icon, 
  Activity, 
  LayoutDashboardIcon, 
  MessageSquare, 
  Users, 
  Calendar, 
  Megaphone, 
  // Star, 
  HelpCircle 
} from "lucide-react"

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
      title: "Feedback",
      url: "/feedback",
      icon: (
        <HelpCircle />
      ),
    },
    // {
    //   title: "Loyalty & Rewards",
    //   url: "/loyalty",
    //   icon: (
    //     <Star />
    //   ),
    // },
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
  const storedUser = getStoredUser()
  const user = {
    name: storedUser?.name || storedUser?.email || data.user.name,
    email: storedUser?.email || data.user.email,
    avatar: storedUser?.image || storedUser?.avatar || data.user.avatar,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
