import { useState } from "react";
import { AppSidebar } from "../components/app-sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet } from "react-router-dom";
import { useMatches } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Bell, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MainLayout() {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const title = currentMatch?.handle?.title || "Default Title";

  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-full max-w-[100vw] overflow-x-hidden">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-w-0 overflow-x-hidden">
            <header className="flex h-14 sm:h-16 items-center gap-2 px-3 sm:px-4 shadow-md">
              <div className="flex flex-row w-full h-full justify-between items-center gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <SidebarTrigger className="shrink-0" />
                  <Separator
                    orientation="vertical"
                    className="hidden sm:block bg-gray-300"
                  />
                  <h2 className="hidden sm:block text-sm font-semibold text-foreground truncate">
                    {title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <div className="relative hidden md:block w-44 lg:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full pl-10 rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <MobileSearch />
                  <NotificationBell />

                  <Separator
                    orientation="vertical"
                    className="hidden sm:block bg-gray-300"
                  />

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden sm:flex flex-col items-start leading-tight">
                      <h4 className="text-sm font-medium text-foreground whitespace-nowrap">
                        Dr. John Doe
                      </h4>
                      <span className="text-xs text-muted-foreground">Admin</span>
                    </div>
                    <UserAvatar />
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1 min-w-0 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}

function MobileSearch() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-full hover:bg-muted transition-colors"
      >
        {open ? (
          <X className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Search className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-64 z-50 bg-white dark:bg-card shadow-lg rounded-xl p-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              autoFocus
              type="search"
              placeholder="Search..."
              className="w-full pl-10 rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationBell() {
  const [open, setOpen] = useState(false);

  const notifications = [
    { id: 1, title: "Pasien baru terdaftar", time: "2 menit lalu", unread: true },
    { id: 2, title: "Janji temu hari ini", time: "10 menit lalu", unread: true },
    { id: 3, title: "Promo berhasil dikirim", time: "1 jam lalu", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-full hover:bg-muted transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
      </button>

      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
      )}

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-card rounded-xl shadow-lg p-2 z-50">
            <p className="text-sm font-semibold px-2 py-1">Notifikasi</p>
            <div className="flex flex-col gap-1 mt-1">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => setOpen(false)}
                  className={`p-2 rounded-lg text-sm cursor-pointer hover:bg-muted transition-colors ${
                    notif.unread ? "bg-muted/50" : ""
                  }`}
                >
                  <p className="text-foreground">{notif.title}</p>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function UserAvatar() {
  const user = { name: "Dr. John Doe", image: "" };
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage src={user.image} />
            <AvatarFallback className="text-xs sm:text-sm">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-300" />
        <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}