import { api } from "@/lib/axios";

export const getPatients = async () => {
  const res = await api.get("/api/patients");
  return res.data;
};

export const createPatient = async (payload) => {
  const res = await api.post("/api/patients", payload);
  return res.data;
};

export const getPatientByPhoneNumber = async (phoneNumber) => {
  const res = await api.get("/api/patients/by-phone", {
    params: {
      phone: phoneNumber,
      phone_number: phoneNumber,
    },
  });

  return res.data;
};

export const getPatientByRm = async (noRM) => {
  const res = await api.get(`/api/patients/rm/${noRM}`);
  return res.data;
};

export const getPatientById = async (patientId) => {
  const res = await api.get(`/api/patients/${patientId}`);
  return res.data;
};

export const updatePatient = async (patientId, payload) => {
  const res = await api.put(`/api/patients/${patientId}`, payload);
  return res.data;
};

export const deletePatient = async (patientId) => {
  const res = await api.delete(`/api/patients/${patientId}`);
  return res.data;
};
