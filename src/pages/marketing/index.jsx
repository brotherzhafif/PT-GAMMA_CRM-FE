import { useEffect, useState } from "react";

import {
  getCampaigns,
  createCampaign,
  updateCampaign,
} from "@/services/marketing.service";

import MarketingHeader from "./components/marketingHeader";
import CampaignsTable from "./components/campaignsTable";
import CreateCampaignModal from "./components/createCampaignModal";

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState([]);

  const [selectedCampaign, setSelectedCampaign] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);

      const data = await getCampaigns();

      const mappedCampaigns = data.map(
        (campaign) => ({
          id: campaign.id,

          name:
            campaign.campaign_name,

          description:
            campaign.campaign_message,

          status:
            campaign.status?.charAt(0).toUpperCase() +
            campaign.status?.slice(1),

          date: new Date(
            campaign.schedule_date
          ).toLocaleDateString("id-ID"),

          audience: "-",

          segment: "All Patients",

          raw: campaign,
        })
      );

      setCampaigns(mappedCampaigns);
    } catch (err) {
      console.error(
        "Failed to fetch campaigns:",
        err
      );

      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign =
    async (payload) => {
      try {
        await createCampaign(payload);

        await fetchCampaigns();

        setIsModalOpen(false);

        return true;
      } catch (error) {
        console.error(
          "Failed to create campaign:",
          error
        );

        return false;
      }
    };

  const handleUpdateCampaign =
    async (
      campaignName,
      payload
    ) => {
      try {
        await updateCampaign(
          campaignName,
          payload
        );

        await fetchCampaigns();

        setSelectedCampaign(null);

        setIsModalOpen(false);

        return true;
      } catch (error) {
        console.error(
          "Failed to update campaign:",
          error
        );

        return false;
      }
    };

  const handleEditCampaign = (
    campaign
  ) => {
    setSelectedCampaign(
      campaign
    );

    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedCampaign(null);

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCampaign(null);

    setIsModalOpen(false);
  };

  const handleRefresh = async () => {
    await fetchCampaigns();
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading campaigns...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load campaigns.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 w-full mb-9">
        <MarketingHeader />

        <CampaignsTable
          campaigns={campaigns}
          onEdit={
            handleEditCampaign
          }
          onRefresh={
            handleRefresh
          }
          onCreate={
            handleCreateClick
          }
        />
      </div>

      <CreateCampaignModal
        open={isModalOpen}
        onClose={
          handleCloseModal
        }
        selectedCampaign={
          selectedCampaign
        }
        onCreateCampaign={
          handleCreateCampaign
        }
        onUpdateCampaign={
          handleUpdateCampaign
        }
      />
    </>
  );
}