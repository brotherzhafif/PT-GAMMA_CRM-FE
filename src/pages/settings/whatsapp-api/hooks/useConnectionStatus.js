import { useEffect, useMemo, useState } from "react";
import {
  getHealthCheck,
  getRmeConnectionStream,
  getWhatsAppConnectionStream,
} from "@/services/settings.service";

const initialConnection = (message) => ({
  connected: false,
  status: "Connecting",
  message,
  phoneNumber: "-",
  quality: "-",
});

const parseEventData = (event) => {
  if (!event?.data || event.data === "null") return null;

  try {
    return JSON.parse(event.data);
  } catch {
    return event.data;
  }
};

const normalizeConnection = (payload) => {
  if (typeof payload === "string") {
    const rawStatus = payload.toLowerCase();
    const isConnected =
      rawStatus === "connected" ||
      rawStatus === "ok" ||
      rawStatus === "ready" ||
      rawStatus === "open";

    return {
      connected: isConnected,
      status: isConnected ? "Connected" : payload,
      message: isConnected
        ? "Connection stream reports an active session."
        : "Connection stream reports an inactive session.",
      phoneNumber: "-",
      quality: "-",
      updatedAt: new Date().toISOString(),
    };
  }

  const data = payload?.data || payload || {};
  const rawStatus = String(
    data.status ||
      data.connection_status ||
      data.connection_state ||
      data.state ||
      data.connected ||
      data.ready ||
      data.valid ||
      ""
  ).toLowerCase();
  const isConnected =
    data.connected === true ||
    data.ready === true ||
    data.valid === true ||
    rawStatus === "connected" ||
    rawStatus === "valid" ||
    rawStatus === "ok" ||
    rawStatus === "ready" ||
    rawStatus === "open";

  return {
    connected: isConnected,
    status: isConnected ? "Connected" : data.status || "Disconnected",
    message:
      data.message ||
      data.reason ||
      data.connection_state ||
      (isConnected
        ? "Connection stream reports an active session."
        : "Connection stream reports an inactive session."),
    phoneNumber:
      data.phone_number ||
      data.phoneNumber ||
      data.number ||
      data.telepon ||
      "-",
    quality: data.quality_rating || data.qualityRating || data.quality || "-",
    updatedAt:
      data.updated_at ||
      data.updatedAt ||
      data.timestamp ||
      data.cached_at ||
      null,
  };
};

export function useConnectionStatus() {
  const [health, setHealth] = useState(null);
  const [whatsappConnection, setWhatsappConnection] = useState(
    initialConnection("Waiting for WhatsApp connection stream.")
  );
  const [rmeConnection, setRmeConnection] = useState(
    initialConnection("Waiting for SmartClinic RME connection stream.")
  );

  useEffect(() => {
    getHealthCheck()
      .then(setHealth)
      .catch((error) => {
        console.error("Failed get health check:", error);
        setHealth({
          status: "error",
          message: "Unable to reach API health check.",
        });
      });
  }, []);

  useEffect(() => {
    const whatsappStream = getWhatsAppConnectionStream();
    const rmeStream = getRmeConnectionStream();

    const handleWhatsapp = (event) => {
      const payload = parseEventData(event);
      if (payload) {
        setWhatsappConnection(normalizeConnection(payload));
      }
    };

    const handleRme = (event) => {
      const payload = parseEventData(event);
      if (payload) {
        setRmeConnection(normalizeConnection(payload));
      }
    };

    whatsappStream.addEventListener("message", handleWhatsapp);
    whatsappStream.addEventListener("status", handleWhatsapp);
    whatsappStream.onmessage = handleWhatsapp;
    whatsappStream.onerror = () => {
      setWhatsappConnection((prev) => ({
        ...prev,
        status: prev.connected ? "Connected" : "Reconnecting",
        message: prev.connected
          ? "Last WhatsApp status was connected. Waiting for the next stream update."
          : "Waiting for WhatsApp connection stream to reconnect.",
      }));
    };

    rmeStream.addEventListener("message", handleRme);
    rmeStream.addEventListener("status", handleRme);
    rmeStream.onmessage = handleRme;
    rmeStream.onerror = () => {
      setRmeConnection((prev) => ({
        ...prev,
        status: prev.connected ? "Connected" : "Reconnecting",
        message: prev.connected
          ? "Last SmartClinic RME status was connected. Waiting for the next stream update."
          : "Waiting for SmartClinic RME connection stream to reconnect.",
      }));
    };

    return () => {
      whatsappStream.close();
      rmeStream.close();
    };
  }, []);

  const apiHealthy = useMemo(
    () => String(health?.status || "").toLowerCase() === "ok",
    [health]
  );

  return {
    apiHealthy,
    health,
    rmeConnection,
    whatsappConnection,
  };
}
