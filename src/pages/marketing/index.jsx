import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getCampaigns,
  createCampaign,
  updateCampaign,
} from "@/services/marketing.service";

import MarketingHeader from "./components/marketingHeader";
import CampaignsTable from "./components/campaignsTable";
import CampaignDetailModal from "./components/campaignDetailModal";
import CreateCampaignModal from "./components/createCampaignModal";

const getApiErrorMessage = (error) => {
  return error.response?.data?.detail || error.response?.data?.message || error.message || "Coba beberapa saat lagi.";
};

const campaignNamePathSeparatorPattern = /[\\/]/;

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [detailCampaign, setDetailCampaign] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSession, setModalSession] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCampaigns();

      const mappedCampaigns = data
        .map((campaign) => ({
          id: campaign.id,
          name: campaign.campaign_name,
          description: campaign.campaign_message,
          status:
            campaign.status?.charAt(0).toUpperCase() +
            campaign.status?.slice(1),
          date: new Date(campaign.schedule_date).toLocaleDateString("id-ID"),
          audience: "-",
          segment: "All Patients",
          raw: campaign,
        }))
        .sort((campaignA, campaignB) => {
          const dateA = new Date(campaignA.raw?.schedule_date).getTime();
          const dateB = new Date(campaignB.raw?.schedule_date).getTime();

          if (dateA !== dateB) {
            return dateB - dateA;
          }

          return Number(campaignB.id || 0) - Number(campaignA.id || 0);
        });

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
        description: "Nama campaign mengandung / atau \\. Campaign tanpa simbol itu tetap bisa diedit.",
      });
      return;
    }

    setSelectedCampaign(campaign);
    setModalSession((session) => session + 1);
    setIsModalOpen(true);
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

  if (loading) {
    return <div className="p-6">Loading campaigns...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load campaigns.</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-6 w-full mb-9">
        <MarketingHeader />

        <CampaignsTable
          campaigns={campaigns}
          onDetail={handleDetailCampaign}
          onEdit={handleEditCampaign}
          onRefresh={handleRefresh}
          onCreate={handleCreateClick}
        />
      </div>

      <CreateCampaignModal
        key={`${selectedCampaign?.id || "new-campaign"}-${modalSession}`}
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedCampaign={selectedCampaign}
        onCreateCampaign={handleCreateCampaign}
        onUpdateCampaign={handleUpdateCampaign}
      />

      <CampaignDetailModal
        campaign={detailCampaign}
        open={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
}
