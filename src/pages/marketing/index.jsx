import { Trash2 } from "lucide-react";

import { AlertWithMedia } from "@/components/ui/alert-with-media";

import MarketingHeader from "./components/marketingHeader";
import CampaignsTable from "./components/campaignsTable";
import CampaignDetailModal from "./components/campaignDetailModal";
import CreateCampaignModal from "./components/createCampaignModal";
import { useMarketingCampaigns } from "./hooks/useMarketingCampaigns.hooks";

export default function MarketingPage() {
  const {
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
  } = useMarketingCampaigns();

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
        onDelete={handleDeleteCampaign}
      />

      <AlertWithMedia
        open={Boolean(campaignToDelete)}
        onOpenChange={(open) => !open && setCampaignToDelete(null)}
        icon={Trash2}
        title="Hapus campaign?"
        description={`Data campaign ${campaignToDelete?.name || ""} akan dihapus dari sistem.`}
        cancelLabel="Batal"
        actionLabel={deletingCampaign ? "Menghapus..." : "Hapus campaign"}
        onAction={handleConfirmDeleteCampaign}
      />
    </>
  );
}