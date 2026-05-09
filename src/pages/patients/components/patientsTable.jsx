import {
  Card,
  CardContent,
} from "@/components/ui/card";

import PatientRow from "./patientRow";
import PatientPagination from "./patientPagination";

export default function PatientsTable({
  data,
  selectedPatient,
  onSelectPatient,
}) {
  return (
    <Card className="rounded-2xl border border-gray-200">
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40 text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-4">Patient</th>
              <th className="text-left px-6 py-4">Contact</th>
              <th className="text-left px-6 py-4">Last Visit</th>
              <th className="text-left px-6 py-4">Visits</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Tags</th>
            </tr>
          </thead>

          <tbody>
            {data.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                active={selectedPatient?.id === patient.id}
                onClick={() => onSelectPatient(patient)}
              />
            ))}
          </tbody>
        </table>

        <PatientPagination />
      </CardContent>
    </Card>
  );
}