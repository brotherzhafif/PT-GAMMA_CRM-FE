import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const emptyForm = {
  jenisKelamin: "LAKI_LAKI",
  namaLengkap: "",
  nik: "",
  tanggalLahir: "",
  telepon: "",
};

const buildInitialForm = (patient) => {
  if (!patient) return emptyForm;

  return {
    jenisKelamin: patient.jenisKelamin || (patient.gender === "Female" ? "PEREMPUAN" : "LAKI_LAKI"),
    namaLengkap: patient.namaLengkap || patient.name || "",
    nik: patient.nik === "-" ? "" : patient.nik || "",
    tanggalLahir: patient.tanggalLahir || patient.birthDate || "",
    telepon: patient.telepon || patient.phone || "",
  };
};

function PatientForm({ patient, onCancel, onSubmit }) {
  const [form, setForm] = useState(() => buildInitialForm(patient));
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="namaLengkap">Nama Lengkap</Label>
        <Input
          id="namaLengkap"
          value={form.namaLengkap}
          onChange={(event) => updateField("namaLengkap", event.target.value)}
          placeholder="Budi Santoso"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="nik">NIK</Label>
        <Input
          id="nik"
          value={form.nik}
          onChange={(event) => updateField("nik", event.target.value)}
          placeholder="3273010101010001"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input
            id="tanggalLahir"
            type="date"
            value={form.tanggalLahir}
            onChange={(event) => updateField("tanggalLahir", event.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label>Jenis Kelamin</Label>
          <Select value={form.jenisKelamin} onValueChange={(value) => updateField("jenisKelamin", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
              <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="telepon">Telepon</Label>
        <Input
          id="telepon"
          value={form.telepon}
          onChange={(event) => updateField("telepon", event.target.value)}
          placeholder="6281234567890"
          required
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="border border-gray-300 shadow-sm"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Patient"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function PatientFormModal({ open, patient, onOpenChange, onSubmit }) {
  const isEdit = Boolean(patient);

  const handleSubmit = async (payload) => {
    await onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Patient" : "Add Patient"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update patient data from RME." : "Create a patient manually."}
          </DialogDescription>
        </DialogHeader>

        {open && (
          <PatientForm
            key={patient?.id || "new-patient"}
            patient={patient}
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
