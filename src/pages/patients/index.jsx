import { useState } from "react";

import PatientsHeader from "./components/patientsHeader";
import PatientsToolbar from "./components/patientsToolbar";
import PatientsTable from "./components/patientsTable";

import PatientDetailPanel from "./components/detail/patientDetailPanel";

import { dummyPatients } from "./data/dummyPatients";

export default function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState(
    dummyPatients[0]
  );

  return (
    <div className="flex flex-col gap-6 w-full mb-9">
      <PatientsHeader />

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-4">
          <PatientsToolbar />

          <PatientsTable
            data={dummyPatients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        </div>

        {/* RIGHT DETAIL PANEL */}
        <div>
          <PatientDetailPanel patient={selectedPatient} />
        </div>
      </div>
    </div>
  );
}