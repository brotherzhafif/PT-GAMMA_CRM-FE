import PatientStatusBadge from "./patientStatusBadge";
import PatientTags from "./patientTags";

export default function PatientRow({
  patient,
  active,
  onClick,
}) {
  return (
    <tr
      onClick={onClick}
      className={`border-b cursor-pointer transition ${
        active ? "bg-emerald-50" : "hover:bg-muted/40"
      }`}
    >
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted" />

          <div>
            <p className="font-medium">{patient.name}</p>
            <p className="text-xs text-muted-foreground">
              {patient.gender}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-muted-foreground">
        {patient.phone}
      </td>

      <td className="px-6 py-5">{patient.lastVisit}</td>

      <td className="px-6 py-5">
        {patient.visits}
      </td>

      <td className="px-6 py-5">
        <PatientStatusBadge status={patient.status} />
      </td>

      <td className="px-6 py-5">
        <PatientTags tags={patient.tags} />
      </td>
    </tr>
  );
}