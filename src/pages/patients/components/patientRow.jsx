import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Eye, Pencil, Trash2 } from "lucide-react";
import PatientStatusBadge from "./patientStatusBadge";
import PatientTags from "./patientTags";

export default function PatientRow({
  patient,
  active,
  isSelected,
  onSelect,
  onClick,
  onEdit,
  onDelete,
}) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-slate-100 cursor-pointer transition ${active ? "bg-emerald-50/50" : "hover:bg-slate-50/50"} last:border-0`}
    >
      <td className="px-6 py-3" onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </td>

      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border border-gray-200 shadow-sm flex-shrink-0">
            <AvatarFallback className="bg-slate-100 text-[10px]">
              <User className="w-3 h-3 text-slate-400" />
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-900 truncate">{patient.name}</p>
            <p className="text-xs text-slate-400 truncate">
              {patient.gender}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-3 text-[10px] text-slate-600 font-semibold">
        {patient.phone}
      </td>

      <td className="px-6 py-3 text-[10px] text-slate-600">{patient.lastVisit}</td>

      <td className="px-6 py-3 text-[10px] text-slate-600">
        {patient.visits}
      </td>

      <td className="px-6 py-3">
        <PatientStatusBadge status={patient.status} />
      </td>

      <td className="px-6 py-3">
        <PatientTags tags={patient.tags} />
      </td>

      <td className="px-6 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClick}
            className="h-7 w-7 p-0 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="h-7 w-7 p-0 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-7 w-7 p-0 text-slate-600 hover:text-rose-600 hover:bg-rose-50"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
