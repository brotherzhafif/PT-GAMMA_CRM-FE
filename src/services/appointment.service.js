import axios from "axios";

// Menggunakan URL backend utama dari environment variable atau fallback ke URL produksi
const API_URL = import.meta.env.VITE_API_URL || "https://ai-crm.brotherzhafif.my.id/api";

export const appointmentService = {
  
  /**
   * Mengambil data janjitemu berdasarkan filter tanggal.
   * Pastikan parameter 'tanggal' memiliki format YYYY-MM-DD (misal: '2026-06-03')
   * untuk menghindari error 422 dari backend.
   */
  getAppointments: async (tanggal) => {
    return await axios.get(`${API_URL}/appointment`, {
      params: { tanggal: tanggal }
    });
  },
  
  /**
   * Menambahkan data janjitemu baru menggunakan Axios.
   */
  addAppointment: async (data) => {
    return await axios.post(`${API_URL}/appointment/appointments`, data);
  },
  
  /**
   * Memperbarui data janjitemu berdasarkan ID.
   */
  updateAppointment: async (id, data) => {
    return await axios.put(`${API_URL}/appointment/${id}`, data);
  },
  
  /**
   * Menghapus data janjitemu berdasarkan ID.
   */
  deleteAppointment: async (id) => {
    return await axios.delete(`${API_URL}/appointment/${id}`);
  },

  /**
   * Menambahkan data janjitemu via Modal dengan menggunakan Fetch API.
   * Memiliki penanganan error spesifik (Error 404) ketika data pasien tidak ditemukan.
   */
  createAppointmentModal: async (data) => {
    const response = await fetch(`${API_URL}/appointment/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Validasi spesifik jika pasien belum terdaftar di database CRM
    if (response.status === 404) {
      throw new Error("Pasien tidak ditemukan. Daftarkan pasien baru terlebih dahulu.");
    }

    // Penanganan error validasi atau server error lainnya (termasuk potensi error 422)
    if (!response.ok) {
      let errorMessage = "Gagal membuat janji temu.";
      try {
        const errData = await response.json();
        // Mengambil detail pesan error dari backend jika tersedia
        errorMessage = errData.message || (errData.errors ? JSON.stringify(errData.errors) : errorMessage);
      } catch (e) {
        // Abaikan jika response error bukan berupa objek JSON
      }
      throw new Error(errorMessage);
    }

    return response;
  }
};