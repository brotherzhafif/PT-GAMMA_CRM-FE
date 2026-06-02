import axios from "axios";

// Menggunakan URL backend utama
const API_URL = import.meta.env.VITE_API_URL || "https://ai-crm.brotherzhafif.my.id/api";

export const appointmentService = {
  getAppointments: async (tanggal) => {
    // Endpoint dikembalikan ke /appointment untuk metode GET
    return await axios.get(`${API_URL}/appointment`, {
      params: { tanggal: tanggal }
    });
  },
  
  addAppointment: async (data) => {
    return await axios.post(`${API_URL}/appointment/appointments`, data);
  },
  
  updateAppointment: async (id, data) => {
    return await axios.put(`${API_URL}/appointment/appointments/${id}`, data);
  },
  
  deleteAppointment: async (id) => {
    return await axios.delete(`${API_URL}/appointment/appointments/${id}`);
  },

  createAppointmentModal: async (data) => {
    const response = await fetch(`${API_URL}/appointment/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 404) {
      throw new Error("Pasien tidak ditemukan. Daftarkan pasien baru terlebih dahulu.");
    }
    if (!response.ok) {
      throw new Error("Gagal membuat janji temu");
    }

    return response;
  }
};