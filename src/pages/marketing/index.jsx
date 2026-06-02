import { useEffect, useState } from "react";

import {
  getCampaigns,
  createCampaign,
  updateCampaign,
} from "@/services/marketingService";

import MarketingHeader from "./components/marketingHeader";
import MarketingStats from "./components/marketingStats";
import CampaignsTable from "./components/campaignsTable";
import CreateCampaignPanel from "./components/createCampaignPanel";

export default function MarketingPage() {
  const [campaigns, setCampaigns] =
    useState([]);

  const [
    selectedCampaign,
    setSelectedCampaign,
  ] = useState(null);

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
            campaign.status
              ?.charAt(0)
              .toUpperCase() +
            campaign.status?.slice(1),

          date: new Date(
            campaign.schedule_date
          ).toLocaleDateString(
            "id-ID"
          ),

          audience: "-",

          performance: "-",

          clicked: "-",

          segment:
            "All Patients",

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
        await createCampaign(
          payload
        );

        await fetchCampaigns();

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

        setSelectedCampaign(
          null
        );

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
    console.log(
      "Selected Campaign:",
      campaign
    );

    setSelectedCampaign(
      campaign
    );
  };

  const handleRefresh = async () => {
    setSelectedCampaign(null);

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
    <div className="flex flex-col gap-6 w-full mb-9">
      <MarketingHeader />

      <MarketingStats />

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
        <div>
          <CampaignsTable
            campaigns={campaigns}
            onEdit={
              handleEditCampaign
            }
            onRefresh={
              handleRefresh
            }
          />
        </div>

        <div>
          <CreateCampaignPanel
            onCreateCampaign={
              handleCreateCampaign
            }
            onUpdateCampaign={
              handleUpdateCampaign
            }
            selectedCampaign={
              selectedCampaign
            }
          />
        </div>
      </div>
    </div>
  );
}