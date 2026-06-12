import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertWithMedia } from "@/components/ui/alert-with-media";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComputerIcon, Laptop, LogOut, Smartphone } from "lucide-react";
import { useLoginLogs } from "../hooks/useSecurityActivity";
import { logoutAllDevices } from "@/services/auth.service";

const getDeviceIcon = (device = "") => {
  const normalizedDevice = device.toLowerCase();

  if (
    normalizedDevice.includes("iphone") ||
    normalizedDevice.includes("android") ||
    normalizedDevice.includes("mobile")
  ) {
    return Smartphone;
  }

  if (
    normalizedDevice.includes("mac") ||
    normalizedDevice.includes("laptop") ||
    normalizedDevice.includes("windows")
  ) {
    return Laptop;
  }

  return ComputerIcon;
};

const getStatusClassName = (status = "") =>
  status.toLowerCase().includes("fail")
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";

const truncateText = (text = "", maxLength = 50) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export default function RecentLogin() {
  const navigate = useNavigate();
  const { error, loading, logs } = useLoginLogs();
  const [loggingOut, setLoggingOut] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const handleLogoutAllDevices = async () => {
    setLoggingOut(true);
    try {
      await logoutAllDevices();
      toast.success("Semua perangkat logout", {
        description: "Silakan login kembali untuk melanjutkan.",
      });
      navigate("/login", { replace: true });
    } catch (logoutError) {
      toast.error("Gagal logout semua perangkat", {
        description: logoutError.response?.data?.message || logoutError.message || "Coba beberapa saat lagi.",
      });
    } finally {
      setLoggingOut(false);
      setConfirmLogoutOpen(false);
    }
  };

  return (
    <Card className="flex flex-col gap-8 shadow-md border border-gray-300">
      <CardHeader className="gap-0 flex flex-row justify-between items-center border-b border-gray-300">
        <div className="flex flex-col gap-0 items-start">
          <h3 className="text-lg font-semibold">Recent Logins</h3>
          <span className="text-xs text-gray-500">
            Devices that have recently accessed your account.
          </span>
        </div>

        <Button
          disabled={loggingOut}
          onClick={() => setConfirmLogoutOpen(true)}
          variant="link"
          size="sm"
          className="cursor-pointer shadow-md text-red-500 hover:text-red-600"
        >
          {loggingOut ? "Logging out..." : "Log Out All Devices"}
        </Button>
      </CardHeader>

      <Table>
        <TableHeader className="border-none shadow-sm">
          <TableRow className="border-none">
            <TableHead className="px-6 text-gray-500">Device & Browser</TableHead>
            <TableHead className="px-6 text-gray-500">IP & Location</TableHead>
            <TableHead className="px-6 text-gray-500">Time</TableHead>
            <TableHead className="px-6 text-gray-500">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="border-none">
              <TableCell className="px-6 py-6 text-sm text-muted-foreground" colSpan={4}>
                Loading login logs...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow className="border-none">
              <TableCell className="px-6 py-6 text-sm text-red-500" colSpan={4}>
                {error}
              </TableCell>
            </TableRow>
          ) : logs.length === 0 ? (
            <TableRow className="border-none">
              <TableCell className="px-6 py-6 text-sm text-muted-foreground" colSpan={4}>
                No login logs found.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => {
              const DeviceIcon = getDeviceIcon(log.device);
              const deviceBrowser = `${log.device} - (${log.browser})`;

              return (
                <TableRow key={log.id} className="border-none shadow-sm">
                  <TableCell className="px-6 py-4 font-semibold text-xs">
                    <div
                      className="flex items-center gap-2 max-w-[360px]"
                      title={deviceBrowser}
                    >
                      <DeviceIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {truncateText(deviceBrowser)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="flex flex-col gap-1 px-6 py-4 items-start">
                    <span className="text-xs font-medium">{log.ip}</span>
                    <span className="text-xs text-gray-500">{log.location}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-xs text-gray-500">
                    {log.time}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${getStatusClassName(log.status)}`}
                    >
                      {log.status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <AlertWithMedia
        open={confirmLogoutOpen}
        onOpenChange={setConfirmLogoutOpen}
        icon={LogOut}
        title="Logout semua perangkat?"
        description="Sesi aktif akan diakhiri dan kamu perlu login kembali untuk mengakses CRM."
        cancelLabel="Batal"
        actionLabel={loggingOut ? "Logging out..." : "Log out all devices"}
        onAction={handleLogoutAllDevices}
      />
    </Card>
  );
}
