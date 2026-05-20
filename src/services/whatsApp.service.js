import { api } from "@/lib/axios";

export const getWhatsAppStatus = async () => {
    const res = await api.get("/api/wa/status")
    return res.data;
}

export const getWhatsAppQrCode = async () => {
    const res = await api.get("/api/wa/qr")
    return res.data;
}