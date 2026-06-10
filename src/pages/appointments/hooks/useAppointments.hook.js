import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAppointmentsByPhone,
} from "@/services/appointment.service";

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return [value];
  return [];
};

const unwrapAppointments = (response) => {
  if (Array.isArray(response?.data?.data)) return response.data.data;
  return toArray(response?.data ?? response);
};

const getAppointmentId = (appointment) => {
  return appointment?.id || appointment?._id || appointment?.appointment_id || appointment?.uuid;
};

export const formatDateForApi = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getPatientName = (appointment) => {
  return (
    appointment?.patient?.name ||
    appointment?.pasien?.namaLengkap ||
    appointment?.pasien?.nama ||
    appointment?.namaPasien ||
    appointment?.nama_pasien ||
    appointment?.name ||
    "Nama Tidak Tersedia"
  );
};

const getPatientPhone = (appointment) => {
  return (
    appointment?.patient?.phone_number ||
    appointment?.patient?.phone ||
    appointment?.pasien?.noTelepon ||
    appointment?.pasien?.phone ||
    appointment?.phone_number ||
    appointment?.no_hp ||
    appointment?.nomorTelepon ||
    ""
  );
};

const getAppointmentDate = (appointment) => {
  return (
    appointment?.tanggalKunjungan ||
    appointment?.tanggal_kunjungan ||
    appointment?.tanggal ||
    appointment?.date ||
    appointment?.created_at ||
    ""
  );
};

const getAppointmentTime = (appointment) => {
  return (
    appointment?.time ||
    appointment?.jam ||
    appointment?.jamMulai ||
    appointment?.jadwal?.jam ||
    appointment?.jadwal?.jamMulai ||
    "Hari Ini"
  );
};

const getQueueNumber = (appointment) => {
  return (
    appointment?.nomorAntrean ||
    appointment?.noAntrian ||
    appointment?.nomor_antrean ||
    appointment?.noAntrean ||
    appointment?.no_antrean ||
    appointment?.queueNumber ||
    appointment?.queue_number ||
    appointment?.nomorAntrian ||
    appointment?.nomor_antrian ||
    ""
  );
};

export const mapAppointmentForSchedule = (appointment) => {
  const status = appointment?.status || appointment?.appointment_status || "CONFIRMED";
  const catatan = appointment?.catatan || appointment?.keluhan || "Konsultasi";
  const doctorName =
    appointment?.doctor ||
    appointment?.namaDokter ||
    appointment?.dokter?.nama ||
    appointment?.jadwal?.dokter?.namaLengkap ||
    "Dokter Umum";
  const specialty = appointment?.jadwal?.dokter?.spesialis || appointment?.spesialis || "";
  const session = appointment?.jadwal?.sesi || appointment?.sesi || "";
  const startTime = appointment?.jadwal?.jamMulai || appointment?.jamMulai || appointment?.time || "";
  const endTime = appointment?.jadwal?.jamSelesai || appointment?.jamSelesai || "";

  return {
    ...appointment,
    id: getAppointmentId(appointment),
    time: getAppointmentTime(appointment),
    duration: endTime ? `${startTime} - ${endTime}` : appointment?.duration || appointment?.durasi || "30m",
    doctor: doctorName,
    specialty,
    session,
    status,
    source: appointment?.source || appointment?.sumber || "Admin",
    queueNumber: getQueueNumber(appointment),
    catatan,
    patient: {
      img: appointment?.patient?.img || "",
      name: getPatientName(appointment),
      type: catatan,
      phone: getPatientPhone(appointment),
      noRm: appointment?.pasien?.noRm || appointment?.patient?.medicalRecord || appointment?.noRm || "",
      birthDate: appointment?.pasien?.tanggalLahir || appointment?.patient?.birthDate || "",
      allergies: appointment?.pasien?.alergi || appointment?.patient?.allergies || [],
    },
    statusColor:
      appointment?.statusColor ||
      (status === "SELESAI" || status === "COMPLETED"
        ? "bg-slate-100 text-slate-600 border-slate-200"
        : status === "DIPERIKSA"
          ? "bg-blue-50 text-blue-700 border-blue-100"
          : status === "BATAL" || status === "CANCELLED"
            ? "bg-rose-50 text-rose-700 border-rose-100"
            : "bg-emerald-50 text-emerald-700 border-emerald-100"),
    tanggalKunjungan: getAppointmentDate(appointment),
  };
};

export function useAppointments(selectedDate = new Date()) {
  const [appointments, setAppointments] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const normalizedAppointments = useMemo(() => {
    return appointments.map(mapAppointmentForSchedule);
  }, [appointments]);

  const fetchAppointments = useCallback(async (date = selectedDate) => {
    setLoading(true);
    setError(null);
    setSearchPhone("");
    setAppointments([]);

    try {
      const response = await getAppointments({ tanggal: formatDateForApi(date) });
      setAppointments(unwrapAppointments(response));
    } catch (err) {
      setAppointments([]);
      setError(err.response?.data?.message || err.message || "Gagal mengambil data appointment");
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  const searchAppointmentsByPhone = useCallback(
    async (event) => {
      event?.preventDefault();

      if (!searchPhone.trim()) {
        await fetchAppointments();
        return;
      }

      setIsSearching(true);
      setLoading(true);
      setError(null);

      try {
        const response = await getAppointmentsByPhone(searchPhone.trim());
        setAppointments(unwrapAppointments(response));
      } catch (err) {
        setAppointments([]);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Pasien dengan nomor telepon tersebut tidak ditemukan",
        );
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    },
    [fetchAppointments, searchPhone],
  );

  const addAppointment = useCallback(async (payload) => {
    const response = await createAppointment(payload);
    const createdAppointment = response?.data || response;

    if (createdAppointment) {
      setAppointments((prev) => [...prev, createdAppointment]);
    }

    return response;
  }, []);

  const removeAppointment = useCallback(async (appointmentId) => {
    if (!appointmentId) return;

    await deleteAppointment(appointmentId);
    setAppointments((prev) => prev.filter((appointment) => getAppointmentId(appointment) !== appointmentId));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchAppointments(selectedDate);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchAppointments, selectedDate]);

  return {
    appointments: normalizedAppointments,
    loading,
    error,
    searchPhone,
    isSearching,
    setSearchPhone,
    fetchAppointments,
    searchAppointmentsByPhone,
    addAppointment,
    removeAppointment,
  };
}
