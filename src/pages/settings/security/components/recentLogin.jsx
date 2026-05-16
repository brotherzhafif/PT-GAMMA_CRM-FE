import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ComputerIcon, Laptop, Smartphone } from "lucide-react";

export default function RecentLogin() {
    const devices = [
        {
            id: 1,
            icon: Laptop,
            device: "MAC OS",
            browser: "Chrome",
            ip: "192.168.1.1",
            location: "Jakarta, Indonesia",
            time: "10 minutes ago",
            status: "Success",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: 2,
            icon: Smartphone,
            device: "Iphone",
            browser: "Safari",
            ip: "192.168.1.2",
            location: "Bandung, Indonesia",
            time: "1 hour ago",
            status: "Failed",
            statusColor: "bg-red-100 text-red-800",
        },
        {
            id: 3,
            icon: ComputerIcon,
            device: "Windows",
            browser: "Edge",
            ip: "192.168.1.3",
            location: "Surabaya, Indonesia",
            time: "2 hours ago",
            status: "Success",
            statusColor: "bg-green-100 text-green-800",
        }
    ];
  return (
    <Card className="flex flex-col gap-8 shadow-md border border-gray-300">
      <CardHeader className="gap-0 flex flex-row justify-between items-center border-b border-gray-300">
        <div className="flex flex-col gap-0 items-start">
          <h3 className="text-lg font-semibold">Recent Logins</h3>
          <span className="text-xs text-gray-500">
            Devices that have recently accessed your account.
          </span>
        </div>

        <Button variant="link" size="sm" className="cursor-pointer shadow-md ">
          Log Out All Devices
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
            {devices.map((device) => (
                <TableRow key={device.id} className="border-none shadow-sm">
                    <TableCell className="px-6 py-4 font-semibold text-xs">
                        <div className="flex items-center gap-2">
                            <device.icon className="w-4 h-4" />
                            {device.device} - ({device.browser})
                        </div>
                    </TableCell>
                    <TableCell className="flex flex-col gap-1 px-6 py-4 items-start">
                        <span className="text-xs font-medium">{device.ip}</span>
                        <span className="text-xs text-gray-500">{device.location}</span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-xs text-gray-500">{device.time}</TableCell>
                    <TableCell className="px-6 py-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${device.statusColor}`}>
                            {device.status}
                        </span>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}
