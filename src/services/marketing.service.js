import { api } from "@/lib/axios";

const campaignNamePathSeparatorPattern = /[\\/]/;

const validateCampaignName = (campaignName) => {
  if (campaignNamePathSeparatorPattern.test(campaignName)) {
    throw new Error("Nama campaign tidak boleh mengandung / atau \\ karena dipakai sebagai path endpoint.");
  }
};

const getCampaignScheduleDate = (scheduleDate) => {
  if (!scheduleDate || String(scheduleDate).includes("T")) {
    return scheduleDate;
  }

  return `${scheduleDate}T00:00:00+07:00`;
};

const createCampaignWithUpload = async (payload) => {
  const formData = new FormData();

  formData.append("campaign_name", payload.campaign_name);
  formData.append("schedule_date", getCampaignScheduleDate(payload.schedule_date));
  formData.append("campaign_message", payload.campaign_message);

  if (payload.status) {
    formData.append("status", payload.status);
  }

  if (payload.file) {
    formData.append("file", payload.file);
  }

  if (payload.attachment_url) {
    formData.append("attachment_url", payload.attachment_url);
  }

  const response = await api.post("/api/marketing/campaigns/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getCampaigns = async () => {
  const response = await api.get("/api/marketing/campaigns");
  return response.data;
};

export const createCampaign = async (payload) => {
  validateCampaignName(payload.campaign_name || "");

  if (payload.file) {
    return createCampaignWithUpload(payload);
  }

  const response = await api.post("/api/marketing/campaigns", payload);
  return response.data;
};

export const updateCampaign = async (campaignName, payload) => {
  validateCampaignName(campaignName);
  validateCampaignName(payload.campaign_name || "");

  const encodedCampaignName = encodeURIComponent(String(campaignName).trim());

  const response = await api.patch(
    `/api/marketing/campaigns/by-name/${encodedCampaignName}`,
    payload,
  );
  return response.data;
};

export const deleteCampaign = async (campaignName) => {
  validateCampaignName(campaignName);

  const encodedCampaignName = encodeURIComponent(String(campaignName).trim());

  const response = await api.delete(
    `/api/marketing/campaigns/by-name/${encodedCampaignName}`
  );
  return response.data;
};
