import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon, UserPlus } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

export default function TeamMembers() {
  const teamMembers = [
    {
      id: 1,
      nama: "Admin Klinik",
      email: "admin@gmail.com",
      role: "Super Admin",
      status: "Aktif",
      img: "",
    },
    {
      id: 2,
      nama: "Dokter Gigi",
      email: "dokter.gigi@gmail.com",
      role: "Dokter",
      status: "Aktif",
      img: "",
      statusColor: "bg-secondary text-secondary-foreground border-secondary/50",
    },
    {
      id: 3,
      nama: "Resepsionis",
      email: "resepsionis@gmail.com",
      role: "Resepsionis",
      status: "Aktif",
      img: "",
      statusColor: "bg-secondary text-secondary-foreground border-secondary/50",
    },
    {
      id: 4,
      nama: "Kasir",
      email: "kasir@gmail.com",
      role: "Kasir",
      status: "Offline",
      img: "",
      statusColor: "bg-muted text-muted-foreground border-muted/50",
    },
    {
      id: 5,
      nama: "Asisten Dokter",
      email: "asisten.dokter@gmail.com",
      role: "Asisten Dokter",
      status: "Pending",
      img: "",
      statusColor: "bg-yellow-300 text-yellow-800 border-yellow-300",
    },
  ];
  return (
    <Card className="flex flex-col gap-8 shadow-md border border-gray-300">
      <CardHeader className="gap-0 flex flex-row justify-between items-center border-b border-gray-300">
        <div className="flex flex-col gap-0 items-start">
          <h3 className="text-lg font-semibold">Team Members</h3>
          <span className="text-xs text-gray-500">
            Invite and manage users in your organization.{" "}
          </span>
        </div>

        <Button variant="default" size="sm" className="cursor-pointer ">
          <UserPlus />
          Invite Users
        </Button>
      </CardHeader>

      <Table>
        <TableHeader className=" border-none shadow-sm">
          <TableRow className="border-none ">
            <TableHead className="px-6 text-gray-500">User</TableHead>
            <TableHead className="px-6 text-gray-500">Role</TableHead>
            <TableHead className="px-6 text-gray-500">Status</TableHead>
            <TableHead className="px-6 text-gray-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((apt, index) => (
            <TableRow key={index} className="border-none shadow-sm">
              <TableCell className="px-6 flex flex-row gap-3 items-center py-4">
                <Avatar className="h-10 min-w-10 border border-gray-100 shadow-sm flex-shrink-0">
                  <AvatarImage src={apt.img} />
                  <AvatarFallback className="bg-slate-100 flex items-center justify-center border border-gray-100">
                    <UserPlus className="w-4 h-4 text-slate-400" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-start gap-0">
                  <h4 className="text-sm font-semibold">{apt.nama}</h4>
                  <p className="text-xs text-gray-500">{apt.email}</p>
                </div>
              </TableCell>

              <TableCell className="px-6">
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-2 py-1"
                >
                  {apt.role}
                </Badge>
              </TableCell>
              <TableCell className="px-6">
                <Badge
                  variant="secondary"
                  className={`text-xs font-medium px-2 py-1 ${apt.statusColor}`}
                >
                  {apt.status}
                </Badge>
              </TableCell>
              <TableCell className="px-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-300" />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
