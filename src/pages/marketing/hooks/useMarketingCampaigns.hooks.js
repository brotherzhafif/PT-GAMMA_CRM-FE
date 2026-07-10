import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "@/services/marketing.service";

const getApiErrorMessage = (error) => {
  return (
    error.response?.data?.detail ||
    error.response?.data?.message ||
    error.message ||
    "Coba beberapa saat lagi."
  );
};

const campaignNamePathSeparatorPattern = /[\\/]/;

const mapCampaign = (campaign) => ({
  id: campaign.id,
  name: campaign.campaign_name,
  description: campaign.campaign_message,
  status:
  campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1),
  date: campaign.schedule_date 
    ? new Date(campaign.schedule_date).toLocaleDateString("id-ID") 
    : "-",
  audience: "-",
  segment: "All Patients",
  raw: campaign,
});

const sortCampaigns = (campaignA, campaignB) => {
  const statusA = campaignA.raw?.status?.toLowerCase();
  const statusB = campaignB.raw?.status?.toLowerCase();

  if (statusA === "active" && statusB !== "active") return -1;
  if (statusB === "active" && statusA !== "active") return 1;

  const dateA = campaignA.raw?.schedule_date 
    ? new Date(campaignA.raw.schedule_date).getTime() 
    : 0; 
  const dateB = campaignB.raw?.schedule_date 
    ? new Date(campaignB.raw.schedule_date).getTime() 
    : 0;

  if (dateA !== dateB) {
    return dateB - dateA; 
  }

  return Number(campaignB.id || 0) - Number(campaignA.id || 0);
};

export function useMarketingCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [detailCampaign, setDetailCampaign] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSession, setModalSession] = useState(0);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [deletingCampaign, setDeletingCampaign] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCampaigns();

      const mappedCampaigns = data.map(mapCampaign).sort(sortCampaigns);

      setCampaigns(mappedCampaigns);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateCampaign = async (payload) => {
    try {
      await createCampaign(payload);
      await fetchCampaigns();

      setIsModalOpen(false);
      toast.success("Campaign dibuat", {
        description: `${payload.campaign_name} berhasil dijadwalkan.`,
      });
      return true;
    } catch (error) {
      console.error("Failed to create campaign:", error);
      toast.error("Gagal membuat campaign", {
        description: getApiErrorMessage(error),
      });
      return false;
    }
  };

  const handleUpdateCampaign = async (campaignName, payload) => {
    try {
      await updateCampaign(campaignName, payload);
      await fetchCampaigns();

      setSelectedCampaign(null);
      setIsModalOpen(false);
      toast.success("Campaign diperbarui", {
        description: `${payload.campaign_name} berhasil disimpan.`,
      });
      return true;
    } catch (error) {
      console.error("Failed to update campaign:", error);
      toast.error("Gagal memperbarui campaign", {
        description: getApiErrorMessage(error),
      });
      return false;
    }
  };

  const handleEditCampaign = (campaign) => {
    if (campaignNamePathSeparatorPattern.test(campaign.name || "")) {
      toast.error("Campaign tidak bisa diedit", {
        description:
          "Nama campaign mengandung / atau \\. Campaign tanpa simbol itu tetap bisa diedit.",
      });
      return;
    }

    setSelectedCampaign(campaign);
    setModalSession((session) => session + 1);
    setIsModalOpen(true);
  };

  const handleDeleteCampaign = (campaign) => {
    if (campaignNamePathSeparatorPattern.test(campaign.name || "")) {
      toast.error("Campaign tidak bisa dihapus", {
        description: "Nama campaign mengandung / atau \\.",
      });
      return;
    }
    setCampaignToDelete(campaign);
  };

  const handleConfirmDeleteCampaign = async () => {
    if (!campaignToDelete) return;

    try {
      setDeletingCampaign(true);
      await deleteCampaign(campaignToDelete.name);
      await fetchCampaigns();

      handleCloseDetail();
      setCampaignToDelete(null);
      toast.success("Campaign dihapus", {
        description: `${campaignToDelete.name} berhasil dihapus.`,
      });
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      toast.error("Gagal menghapus campaign", {
        description: getApiErrorMessage(error),
      });
    } finally {
      setDeletingCampaign(false);
    }
  };

  const handleDetailCampaign = (campaign) => {
    setDetailCampaign(campaign);
    setIsDetailOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedCampaign(null);
    setModalSession((session) => session + 1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCampaign(null);
    setIsModalOpen(false);
  };

  const handleCloseDetail = () => {
    setDetailCampaign(null);
    setIsDetailOpen(false);
  };

  const handleRefresh = async () => {
    await fetchCampaigns();
    toast.success("Campaign diperbarui", {
      description: "Daftar campaign sudah dimuat ulang.",
    });
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchCampaigns();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchCampaigns]);

  return {
    campaigns,
    selectedCampaign,
    detailCampaign,
    isDetailOpen,
    isModalOpen,
    modalSession,
    campaignToDelete,
    deletingCampaign,
    loading,
    error,
    handleCreateCampaign,
    handleUpdateCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    handleConfirmDeleteCampaign,
    handleDetailCampaign,
    handleCreateClick,
    handleCloseModal,
    handleCloseDetail,
    handleRefresh,
    setCampaignToDelete,
  };
}