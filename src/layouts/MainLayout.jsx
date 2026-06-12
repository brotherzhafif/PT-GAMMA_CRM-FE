import { useState } from "react";
import { AppSidebar } from "../components/app-sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSe parator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet, useMatches, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Bell, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getStoredUser, logout } from "@/services/auth.service";
import { useActivityNotifications } from "@/hooks/useActivityNotifications";
import { toast } from "sonner";

export default function MainLayout() {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const title = currentMatch?.handle?.title || "Default Title";
  const user = getStoredUser();
  const userName = user?.name || user?.email || "Admin";
  const userRole = user?.role || "Admin";

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
                        {userName}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {userRole}
                      </span>
                    </div>
                    <UserAvatar user={user} />
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
  const {
    error,
    loading,
    markAllRead,
    markRead,
    notifications,
    unreadCount,
  } = useActivityNotifications();

  const handleNotificationClick = async (notification) => {
    if (notification.unread) {
      await markRead(notification.id);
    }

    setOpen(false);
  };

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
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:bg-card z-50">
            <div className="flex items-center justify-between px-2 py-1.5">
              <p className="text-sm font-semibold">Notifikasi</p>
              {unreadCount > 0 && (
                <button
                  className="text-xs text-primary hover:underline"
                  onClick={(event) => {
                    event.stopPropagation();
                    markAllRead();
                  }}
                >
                  Tandai dibaca
                </button>
              )}
            </div>
            <ScrollArea className="mt-1 h-80 pr-2">
              <div className="flex flex-col gap-1">
                {loading ? (
                  <div className="p-2 text-sm text-muted-foreground">
                    Loading notifications...
                  </div>
                ) : error ? (
                  <div className="p-2 text-sm text-red-500">{error}</div>
                ) : notifications.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">
                    Belum ada notifikasi.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`rounded-lg p-2 text-sm cursor-pointer hover:bg-muted transition-colors ${
                        notif.unread ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 truncate text-sm font-medium text-foreground">
                          {notif.title}
                        </p>
                        {notif.unread && (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-muted-foreground">
                        {notif.message}
                      </p>
                      <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">
                        {notif.time}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}

function UserAvatar({ user }) {
  const navigate = useNavigate();
  const displayName = user?.name || user?.email || "Admin";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout berhasil", {
        description: "Sesi admin sudah diakhiri.",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Logout gagal", {
        description: error.response?.data?.message || error.message || "Coba beberapa saat lagi.",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage src={user?.image || user?.avatar} />
            <AvatarFallback className="text-xs sm:text-sm">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator className="bg-gray-300" /> */}
        <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
