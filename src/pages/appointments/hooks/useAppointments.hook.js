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
  return toArray(response?.data ?? response);
};

const getAppointmentId = (appointment) => {
  return appointment?.id || appointment?._id || appointment?.appointment_id || appointment?.uuid;
};

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getPatientName = (appointment) => {
  return (
    appointment?.patient?.name ||
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

  return {
    ...appointment,
    id: getAppointmentId(appointment),
    time: getAppointmentTime(appointment),
    duration: appointment?.duration || appointment?.durasi || "30m",
    doctor: appointment?.doctor || appointment?.namaDokter || appointment?.dokter?.nama || "Dokter Umum",
    status,
    source: appointment?.source || appointment?.sumber || "Admin",
    queueNumber: getQueueNumber(appointment),
    catatan,
    patient: {
      img: appointment?.patient?.img || "",
      name: getPatientName(appointment),
      type: catatan,
      phone: getPatientPhone(appointment),
    },
    statusColor:
      appointment?.statusColor ||
      (status === "COMPLETED"
        ? "bg-slate-100 text-slate-500 border-slate-200"
        : "bg-emerald-50 text-emerald-600 border-emerald-100"),
    tanggalKunjungan: getAppointmentDate(appointment),
  };
};

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const normalizedAppointments = useMemo(() => {
    return appointments.map(mapAppointmentForSchedule);
  }, [appointments]);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSearchPhone("");

    try {
      const response = await getAppointments({ tanggal: getTodayDate() });
      setAppointments(unwrapAppointments(response));
    } catch (err) {
      setAppointments([]);
      setError(err.response?.data?.message || err.message || "Gagal mengambil data appointment");
    } finally {
      setLoading(false);
    }
  }, []);

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
      fetchAppointments();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchAppointments]);

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
