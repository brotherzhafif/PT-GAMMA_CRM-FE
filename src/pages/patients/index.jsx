import { useState } from "react";

import PatientsToolbar from "./components/patientsToolbar";
import PatientsTable from "./components/patientsTable";

import PatientDetailPanel from "./components/detail/patientDetailPanel";

import { dummyPatients } from "./data/dummyPatients";

export default function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setShowDetailPanel(true);
  };

  const handleCloseDetail = () => {
    setSelectedPatient(null);
    setShowDetailPanel(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full ">

      <div className="flex gap-4 h-[calc(100vh-150px)] overflow-hidden w-full">
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <PatientsToolbar />

          <PatientsTable
            data={dummyPatients}
            selectedPatient={selectedPatient}
            onSelectPatient={handleSelectPatient}
          />
        </div>

        <div className={`flex-shrink-0 h-full overflow-hidden transition-all duration-300 ease-out ${showDetailPanel && selectedPatient ? "w-[350px]" : "w-0"}`}>
          <div className={`h-full transition-opacity duration-300 ease-out ${showDetailPanel && selectedPatient ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {selectedPatient && (
              <PatientDetailPanel 
                patient={selectedPatient}
                onClose={handleCloseDetail}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}