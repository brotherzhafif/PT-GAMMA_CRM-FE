import { getStatusClasses } from "../../../helpers/patientHelpers";

export default function PatientStatusBadge({
  status,
}) {
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap ${getStatusClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}