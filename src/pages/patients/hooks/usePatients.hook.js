import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createPatient,
  deletePatient,
  getPatientById,
  getPatientByPhoneNumber,
  getPatientByRmeId as fetchPatientByRmeId,
  getPatients,
  updatePatient,
} from "@/services/patients.service";

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return [value];
  return [];
};

const unwrapPatients = (response) => {
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.data)) return response.data;
  return toArray(response?.data ?? response);
};

const getPatientId = (patient) => {
  return patient?.id || patient?._id || patient?.rme_patient_id || patient?.rmePatientId || patient?.uuid;
};

const formatGender = (gender) => {
  if (gender === "LAKI_LAKI") return "Male";
  if (gender === "PEREMPUAN") return "Female";
  return gender || "-";
};

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateForInput = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "";

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getPatientTags = (patient, { nik, rmePatientId }) => {
  const sourceTags =
    patient?.tags ||
    patient?.patientTags ||
    patient?.patient_tags ||
    patient?.labels ||
    patient?.tag;

  if (Array.isArray(sourceTags)) {
    return sourceTags.filter(Boolean);
  }

  if (typeof sourceTags === "string" && sourceTags.trim()) {
    return sourceTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  const tags = [];

  if (rmePatientId) tags.push("RME");
  if (nik && nik !== "-") tags.push("NIK");

  return tags;
};

export const mapPatientForTable = (patient, idx = 0) => {
  const id = getPatientId(patient) || idx + 1;
  const name = patient?.namaLengkap || patient?.name || patient?.nama || "Nama Tidak Tersedia";
  const phone = patient?.telepon || patient?.phone_number || patient?.phone || "";
  const nik = patient?.nik || "-";
  const birthDate = patient?.tanggalLahir || patient?.birth_date || "";
  const rmePatientId = patient?.rme_patient_id || patient?.rmePatientId || patient?.id || "";
  const lastVisitRaw =
    patient?.lastVisit || patient?.last_visit || patient?.updated_at || patient?.created_at || "";

  return {
    ...patient,
    id,
    rmePatientId,
    nik,
    name,
    gender: formatGender(patient?.jenisKelamin || patient?.gender),
    phone,
    birthDate,
    lastVisit: formatDate(lastVisitRaw),
    lastVisitDate: formatDateForInput(lastVisitRaw),
    visits: Number(patient?.visits || patient?.totalVisits || patient?.total_visits || 0),
    points: Number(patient?.points || patient?.loyaltyPoints || patient?.loyalty_points || 0),
    status: patient?.status || "-",
    tags: getPatientTags(patient, { nik, rmePatientId }),
    notes: patient?.notes || "",
    timeline: patient?.timeline || [],
  };
};

const normalizePayload = (payload) => ({
  jenisKelamin: payload.jenisKelamin,
  namaLengkap: payload.namaLengkap || payload.name,
  nik: payload.nik,
  tanggalLahir: payload.tanggalLahir || payload.birthDate,
  telepon: payload.telepon || payload.phone,
});

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastVisitDate, setLastVisitDate] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const normalizedPatients = useMemo(() => {
    return patients.map((patient, idx) => mapPatientForTable(patient, idx));
  }, [patients]);

  const filteredPatients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const tag = selectedTag.toLowerCase();

    return normalizedPatients.filter((patient) => {
      const matchesQuery =
        !query ||
        isSearching ||
        [patient.name, patient.phone, patient.nik, patient.rmePatientId]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      const matchesDate = !lastVisitDate || patient.lastVisitDate === lastVisitDate;
      const matchesTag =
        selectedTag === "all" || (patient.tags || []).some((patientTag) => patientTag.toLowerCase() === tag);

      return matchesQuery && matchesDate && matchesTag;
    });
  }, [isSearching, lastVisitDate, normalizedPatients, searchQuery, selectedTag]);

  const tagOptions = useMemo(() => {
    const tags = new Set();
    normalizedPatients.forEach((patient) => {
      (patient.tags || []).forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort();
  }, [normalizedPatients]);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getPatients();
      setPatients(unwrapPatients(response));
    } catch (err) {
      setPatients([]);
      setError(err.response?.data?.message || err.message || "Gagal mengambil data pasien");
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPatients = useCallback(
    async (event) => {
      event?.preventDefault();

      const query = searchQuery.trim();
      if (!query) {
        await fetchPatients();
        return;
      }

      const onlyPhoneCharacters = /^[\d\s+()-]+$/.test(query);
      if (!onlyPhoneCharacters) return;

      setIsSearching(true);
      setLoading(true);
      setError(null);

      try {
        const response = await getPatientByPhoneNumber(query);
        setPatients(unwrapPatients(response));
      } catch (err) {
        setPatients([]);
        setError(err.response?.data?.message || err.message || "Pasien dengan nomor telepon tersebut tidak ditemukan");
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    },
    [fetchPatients, searchQuery],
  );

  const getPatientByRmeId = useCallback(async (rmeId) => {
    if (!rmeId) return null;

    const response = await fetchPatientByRmeId(rmeId);
    return mapPatientForTable(response?.data || response);
  }, []);

  const getPatientDetailById = useCallback(async (patientId) => {
    if (!patientId) return null;

    const response = await getPatientById(patientId);
    return mapPatientForTable(response?.data || response);
  }, []);

  const addPatient = useCallback(async (payload) => {
    const response = await createPatient(normalizePayload(payload));
    const createdPatient = response?.data || response;

    if (createdPatient) {
      setPatients((prev) => [createdPatient, ...prev]);
    }

    return response;
  }, []);

  const editPatient = useCallback(async (patientId, payload) => {
    if (!patientId) return null;

    const response = await updatePatient(patientId, normalizePayload(payload));
    const updatedPatient = response?.data || response;

    setPatients((prev) =>
      prev.map((patient) => (getPatientId(patient) === patientId ? { ...patient, ...updatedPatient } : patient)),
    );

    return response;
  }, []);

  const removePatient = useCallback(async (patientId) => {
    if (!patientId) return null;

    const response = await deletePatient(patientId);
    setPatients((prev) => prev.filter((patient) => getPatientId(patient) !== patientId));
    return response;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchPatients();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchPatients]);

  return {
    patients: filteredPatients,
    allPatients: normalizedPatients,
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
    fetchPatients,
    searchPatients,
    getPatientByRmeId,
    getPatientDetailById,
    addPatient,
    editPatient,
    removePatient,
  };
}
