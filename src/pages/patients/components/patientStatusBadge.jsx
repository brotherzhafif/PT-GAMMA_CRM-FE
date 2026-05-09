import { getStatusClasses } from "../utils/patientHelpers";

export default function PatientStatusBadge({
  status,
}) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}