import MarketingHeader from "./components/marketingHeader";
import MarketingStats from "./components/marketingStats";
import CampaignsTable from "./components/campaignsTable";
import CreateCampaignPanel from "./components/createCampaignPanel";

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-6 w-full mb-9">
      <MarketingHeader />

      <MarketingStats />

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
        {/* LEFT SECTION */}
        <div>
          <CampaignsTable />
        </div>

        {/* RIGHT SECTION */}
        <div>
          <CreateCampaignPanel />
        </div>
      </div>
    </div>
  );
}