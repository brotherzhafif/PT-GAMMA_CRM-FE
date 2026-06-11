import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon, UserPlus } from "lucide-react";
import { useTeamMembers } from "../hooks/useTeamMembers";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

const getStatus = (user) => {
  if (user.is_active === false) {
    return {
      label: "Inactive",
      className: "bg-muted text-muted-foreground border-muted/50",
    };
  }

  return {
    label: "Active",
    className: "bg-green-100 text-green-700 border-green-200",
  };
};

export default function TeamMembers() {
  const {
    dialogOpen,
    error,
    form,
    handleDelete,
    handleFormChange,
    handleSubmit,
    isEditing,
    loading,
    openCreateDialog,
    openEditDialog,
    saving,
    setDialogOpen,
    sortedUsers,
  } = useTeamMembers();

  return (
    <>
      <Card className="flex flex-col gap-8 shadow-md border border-gray-300">
        <CardHeader className="gap-0 flex flex-row justify-between items-center border-b border-gray-300">
          <div className="flex flex-col gap-0 items-start">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <span className="text-xs text-gray-500">
              Invite and manage users in your organization.
            </span>
          </div>

          <Button
            variant="default"
            size="sm"
            className="cursor-pointer"
            onClick={openCreateDialog}
          >
            <UserPlus />
            Invite Users
          </Button>
        </CardHeader>

        {error && (
          <div className="mx-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <Table className="table-fixed">
          <TableHeader className="border-none shadow-sm">
            <TableRow className="border-none">
              <TableHead className="px-6 text-gray-500 w-[46%]">User</TableHead>
              <TableHead className="px-6 text-gray-500 w-[24%]">Role</TableHead>
              <TableHead className="px-6 text-gray-500 w-[16%]">Status</TableHead>
              <TableHead className="px-6 text-gray-500 w-[14%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="border-none">
                <TableCell
                  className="px-6 py-6 text-sm text-muted-foreground"
                  colSpan={4}
                >
                  Loading users...
                </TableCell>
              </TableRow>
            ) : sortedUsers.length === 0 ? (
              <TableRow className="border-none">
                <TableCell
                  className="px-6 py-6 text-sm text-muted-foreground"
                  colSpan={4}
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              sortedUsers.map((user) => {
                const status = getStatus(user);

                return (
                  <TableRow key={user.id} className="border-none shadow-sm">
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-row gap-3 items-center min-w-0">
                      <Avatar className="h-10 min-w-10 border border-gray-100 shadow-sm flex-shrink-0">
                        <AvatarImage src={user.avatar || user.image} />
                        <AvatarFallback className="bg-slate-100 flex items-center justify-center border border-gray-100 text-xs font-semibold">
                          {getInitials(user.name || user.email)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col items-start gap-0 min-w-0">
                        <h4
                          className="text-sm font-semibold truncate max-w-full"
                          title={user.name || "-"}
                        >
                          {user.name || "-"}
                        </h4>
                        <p
                          className="text-xs text-gray-500 truncate max-w-full"
                          title={user.email || "-"}
                        >
                          {user.email || "-"}
                        </p>
                      </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-6 min-w-0">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium px-2 py-1 max-w-full"
                        title={user.role || "-"}
                      >
                        <span className="block truncate">{user.role || "-"}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 min-w-0">
                      <Badge
                        variant="secondary"
                        className={`text-xs font-medium px-2 py-1 max-w-full ${status.className}`}
                        title={status.label}
                      >
                        <span className="block truncate">{status.label}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontalIcon />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(user)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-300" />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(user)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit User" : "Invite User"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update role dan status akses user."
                : "Buat akun admin atau staff baru untuk CRM."}
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="user-name">Name</Label>
              <Input
                id="user-name"
                value={form.name}
                onChange={(event) =>
                  handleFormChange("name", event.target.value)
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  handleFormChange("email", event.target.value)
                }
                disabled={isEditing}
                required
              />
            </div>

            {!isEditing && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="user-password">Password</Label>
                <Input
                  id="user-password"
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    handleFormChange("password", event.target.value)
                  }
                  required
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="user-role">Role</Label>
              <Input
                id="user-role"
                value={form.role}
                onChange={(event) =>
                  handleFormChange("role", event.target.value)
                }
                placeholder="super_admin, admin, front_desk"
                required
              />
            </div>

            {isEditing && (
              <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="user-active">Active user</Label>
                  <span className="text-xs text-muted-foreground">
                    User aktif bisa mengakses dashboard.
                  </span>
                </div>
                <Switch
                  id="user-active"
                  checked={form.is_active}
                  onCheckedChange={(checked) =>
                    handleFormChange("is_active", checked)
                  }
                />
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Invite User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
