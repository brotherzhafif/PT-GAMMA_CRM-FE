import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import PatientsToolbar from "./components/patientsToolbar";
import PatientsTable from "./components/patientsTable";
import PatientDetailPanel from "./components/detail/patientDetailPanel";
import PatientFormModal from "./components/patientFormModal";
import { usePatients } from "./hooks/usePatients.hook";
import { AlertWithMedia } from "@/components/ui/alert-with-media";

export default function PatientsPage() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [formPatient, setFormPatient] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(false);
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
      try {
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
        toast.success("Data pasien diperbarui", {
          description: `${payload.namaLengkap || formPatient.name} berhasil disimpan.`,
        });
      } catch (error) {
        toast.error("Gagal memperbarui pasien", {
          description: error.response?.data?.message || error.message || "Coba beberapa saat lagi.",
        });
        throw error;
      }
      return;
    }

    try {
      await addPatient(payload);
      toast.success("Pasien berhasil dibuat", {
        description: `${payload.namaLengkap} sudah masuk ke database pasien.`,
      });
    } catch (error) {
      toast.error("Gagal membuat pasien", {
        description: error.response?.data?.message || error.message || "Coba beberapa saat lagi.",
      });
      throw error;
    }
  };

  const handleDeletePatient = (patient) => {
    setPatientToDelete(patient);
  };

  const handleConfirmDeletePatient = async () => {
    if (!patientToDelete) return;

    try {
      setDeletingPatient(true);
      await removePatient(patientToDelete.rmePatientId || patientToDelete.id);

      if (selectedPatient?.id === patientToDelete.id) {
        handleCloseDetail();
      }

      toast.success("Pasien dihapus", {
        description: `${patientToDelete.name} sudah dihapus dari database.`,
      });
      setPatientToDelete(null);
    } catch (error) {
      toast.error("Gagal menghapus pasien", {
        description: error.response?.data?.message || error.message || "Coba beberapa saat lagi.",
      });
    } finally {
      setDeletingPatient(false);
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
    toast.success("Export CSV selesai", {
      description: `${exportPatients.length} data pasien berhasil diunduh.`,
    });
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
      <AlertWithMedia
        open={Boolean(patientToDelete)}
        onOpenChange={(open) => !open && setPatientToDelete(null)}
        icon={Trash2}
        title="Hapus pasien?"
        description={`Data ${patientToDelete?.name || "pasien ini"} akan dihapus dari database pasien.`}
        cancelLabel="Batal"
        actionLabel={deletingPatient ? "Menghapus..." : "Hapus pasien"}
        onAction={handleConfirmDeletePatient}
      />
    </div>
  );
}
