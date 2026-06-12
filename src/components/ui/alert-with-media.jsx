import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";

export function AlertWithMedia({
  open,
  onOpenChange,
  icon: Icon = TriangleAlert,
  title,
  description,
  cancelLabel = "Cancel",
  actionLabel = "Confirm",
  actionVariant = "destructive",
  onAction,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-amber-50 text-amber-600">
            <Icon className="size-8" />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost" className="cursor-pointer shadow-sm">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={actionVariant}
            className="cursor-pointer shadow-sm"
            onClick={onAction}
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
