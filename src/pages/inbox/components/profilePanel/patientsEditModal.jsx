import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
import { updatePatient } from "@/services/patients.service";

export default function PatientEditModal({
  open,
  onOpenChange,
  patient,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const initialForm = useMemo(() => {
    return {
      nik: patient?.nik || "",
      namaLengkap: patient?.namaLengkap || patient?.name || "",
      tanggalLahir: patient?.tanggalLahir || "",
      jenisKelamin: patient?.jenisKelamin || "LAKI_LAKI",
      telepon: patient?.telepon || patient?.phone_number || "",
    };
  }, [patient]);
  const [form, setForm] = useState(initialForm);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("PATIENT:", patient);
    console.log("PATIENT ID:", patient?.id);
    console.log("RME PATIENT ID:", patient?.rme_patient_id);

    if (!patient?.rme_patient_id) {
      console.error("Patient ID not found");
      return;
    }

    try {
      setLoading(true);

      await updatePatient(patient.rme_patient_id, form);

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Update patient failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value) {
          setForm(initialForm);
        }

        onOpenChange(value);
      }}
    >
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Nama Lengkap</Label>

            <Input
              value={form.namaLengkap}
              onChange={(e) => handleChange("namaLengkap", e.target.value)}
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="grid gap-2">
            <Label>NIK</Label>

            <Input
              value={form.nik}
              onChange={(e) => handleChange("nik", e.target.value)}
              placeholder="16 digit NIK"
              maxLength={16}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Tanggal Lahir</Label>

              <Input
                type="date"
                value={form.tanggalLahir}
                onChange={(e) => handleChange("tanggalLahir", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Jenis Kelamin</Label>

              <Select
                value={form.jenisKelamin}
                onValueChange={(value) => handleChange("jenisKelamin", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>

                  <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Nomor Telepon</Label>

            <Input
              value={form.telepon}
              onChange={(e) => handleChange("telepon", e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
