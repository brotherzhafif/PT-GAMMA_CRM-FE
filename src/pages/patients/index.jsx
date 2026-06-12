import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientsToolbar from "./components/patientsToolbar";
import PatientsTable from "./components/patientsTable";
import PatientDetailPanel from "./components/detail/patientDetailPanel";
import PatientFormModal from "./components/patientFormModal";
import { usePatients } from "./hooks/usePatients.hook";

export default function PatientsPage() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [formPatient, setFormPatient] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const {
    patients,
    allPatients,
    tagOptions,
    loading,
    error,
    searchQuery,
    lastVisitDate,
    selectedTag,
    isSearching,
    setSearchQuery,
    setLastVisitDate,
    setSelectedTag,
    searchPatients,
    fetchPatients,
    getPatientDetailById,
    addPatient,
    editPatient,
    removePatient,
  } = usePatients();

  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    setShowDetailPanel(true);

    try {
      const detail = await getPatientDetailById(patient.rmePatientId || patient.id);
      if (detail) {
        setSelectedPatient(detail);
      }
    } catch {
      setSelectedPatient(patient);
    }
  };

  const handleCloseDetail = () => {
    setSelectedPatient(null);
    setShowDetailPanel(false);
  };

  const handleAddPatient = () => {
    setFormPatient(null);
    setFormOpen(true);
  };

  const handleEditPatient = (patient) => {
    setFormPatient(patient);
    setFormOpen(true);
  };

  const handleSubmitPatient = async (payload) => {
    if (formPatient) {
      const response = await editPatient(formPatient.rmePatientId || formPatient.id, payload);
      const updatedPatient = response?.data || response || payload;

      setSelectedPatient((prev) =>
        prev?.id === formPatient.id
          ? {
              ...prev,
              ...updatedPatient,
              nik: updatedPatient.nik || payload.nik,
              name: updatedPatient.namaLengkap || payload.namaLengkap,
              phone: updatedPatient.telepon || payload.telepon,
              birthDate: updatedPatient.tanggalLahir || payload.tanggalLahir,
              gender: (updatedPatient.jenisKelamin || payload.jenisKelamin) === "PEREMPUAN" ? "Female" : "Male",
            }
          : prev,
      );
      return;
    }

    await addPatient(payload);
  };

  const handleDeletePatient = async (patient) => {
    const confirmed = window.confirm(`Hapus pasien ${patient.name}?`);
    if (!confirmed) return;

    await removePatient(patient.rmePatientId || patient.id);

    if (selectedPatient?.id === patient.id) {
      handleCloseDetail();
    }
  };

  const handleMessagePatient = (patient) => {
    if (!patient?.phone) return;

    navigate("/inbox", {
      state: {
        phone: patient.phone,
      },
    });
  };

  const handleExportCsv = () => {
    const headers = ["id", "nik", "namaLengkap", "tanggalLahir", "jenisKelamin", "telepon"];
    const exportPatients = patients.length > 0 ? patients : allPatients;
    const rows = exportPatients.map((patient) => [
      patient.rmePatientId || patient.id,
      patient.nik,
      patient.name,
      patient.birthDate,
      patient.jenisKelamin || patient.gender,
      patient.phone,
    ]);
    const csv = "\uFEFF" + [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "patients.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 w-full ">
      <div className="flex gap-4 h-[calc(100vh-150px)] overflow-hidden w-full">
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <PatientsToolbar
            totalPatients={patients.length}
            searchQuery={searchQuery}
            lastVisitDate={lastVisitDate}
            selectedTag={selectedTag}
            tagOptions={tagOptions}
            isSearching={isSearching}
            onSearchChange={setSearchQuery}
            onLastVisitChange={setLastVisitDate}
            onTagChange={setSelectedTag}
            onSearchSubmit={searchPatients}
            onRefresh={fetchPatients}
            onAddPatient={handleAddPatient}
            onExportCsv={handleExportCsv}
          />

          <PatientsTable
            data={patients}
            loading={loading}
            error={error}
            selectedPatient={selectedPatient}
            onSelectPatient={handleSelectPatient}
            onRetry={fetchPatients}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        </div>

        <div className={`flex-shrink-0 h-full overflow-hidden transition-all duration-300 ease-out ${showDetailPanel && selectedPatient ? "w-[350px]" : "w-0"}`}>
          <div className={`h-full transition-opacity duration-300 ease-out ${showDetailPanel && selectedPatient ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {selectedPatient && (
              <PatientDetailPanel 
                patient={selectedPatient}
                onClose={handleCloseDetail}
                onMessage={handleMessagePatient}
              />
            )}
          </div>
        </div>
      </div>

      <PatientFormModal
        open={formOpen}
        patient={formPatient}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmitPatient}
      />
    </div>
  );
}
