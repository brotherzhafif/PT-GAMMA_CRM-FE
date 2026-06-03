import { api } from "@/lib/axios";

export const getAppointments = async (params = {}) => {
  const res = await api.get("/api/appointment", { params });
  return res.data;
};

export const getAppointmentsByPhone = async (phoneNumber) => {
  const res = await api.get("/api/appointment/appointments/by-phone", {
    params: {
      phone_number: phoneNumber,
    },
  });

  return res.data;
};

export const createAppointment = async (payload) => {
  const res = await api.post("/api/appointment/appointments", payload);
  return res.data;
};

export const deleteAppointment = async (appointmentId) => {
  const res = await api.delete(`/api/appointment/appointments/${appointmentId}`);
  return res.data;
};
