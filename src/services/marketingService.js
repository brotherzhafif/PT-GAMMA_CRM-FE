import { api } from "@/lib/axios";

export const getCampaigns = async () => {
  const response = await api.get(
    "/api/marketing/campaigns"
  );

  return response.data;
};

export const createCampaign = async (payload) => {
  const response = await api.post(
    "/api/marketing/campaigns",
    payload
  );

  return response.data;
};

export const updateCampaign = async (
  campaignName,
  payload
) => {
  const response = await api.patch(
    `/api/marketing/campaigns/by-name/${campaignName}`,
    payload
  );

  return response.data;
};