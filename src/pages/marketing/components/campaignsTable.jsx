import { useMemo, useState } from "react";

import CampaignsToolbar from "./campaignsToolbar";
import CampaignRow from "./campaignRow";

import { dummyCampaigns } from "../data/dummyCampaigns";

export default function CampaignsTable() {
  const [searchValue, setSearchValue] =
    useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const filteredCampaigns = useMemo(() => {
    return dummyCampaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" ||
        campaign.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, selectedStatus]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <CampaignsToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-muted/40">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Campaign
              </th>

              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Audience
              </th>

              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Performance
              </th>

              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Sent Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-muted-foreground"
                >
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}