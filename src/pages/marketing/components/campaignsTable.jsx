import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import CampaignsToolbar from "./campaignsToolbar";
import CampaignRow from "./campaignRow";

const ITEMS_PER_PAGE = 10;

export default function CampaignsTable({
  campaigns = [],
  onEdit,
  onRefresh,
  onCreate,
}) {
  const [searchValue, setSearchValue] =
    useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name
          ?.toLowerCase()
          .includes(
            searchValue.toLowerCase()
          );

      const matchesStatus =
        selectedStatus === "All" ||
        campaign.status ===
          selectedStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    campaigns,
    searchValue,
    selectedStatus,
  ]);

  const totalPages = useMemo(
    () =>
      Math.ceil(
        filteredCampaigns.length /
          ITEMS_PER_PAGE
      ),
    [filteredCampaigns.length]
  );

  const paginatedCampaigns =
    useMemo(() => {
      const startIndex =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

      return filteredCampaigns.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );
    }, [
      filteredCampaigns,
      currentPage,
    ]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(
        currentPage - 1
      );
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        currentPage + 1
      );
    }
  };

  return (
    <div className="rounded-2xl border border-gray-300 bg-white overflow-hidden">
      <CampaignsToolbar
        searchValue={searchValue}
        onSearchChange={
          setSearchValue
        }
        selectedStatus={
          selectedStatus
        }
        onStatusChange={
          setSelectedStatus
        }
        onRefresh={onRefresh}
        onCreate={onCreate}
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-300 bg-muted/40">
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
                Schedule Date
              </th>

              <th className="px-6 py-4 text-sm font-medium text-muted-foreground text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedCampaigns.length >
            0 ? (
              paginatedCampaigns.map(
                (campaign) => (
                  <CampaignRow
                    key={
                      campaign.id
                    }
                    campaign={
                      campaign
                    }
                    onEdit={
                      onEdit
                    }
                  />
                )
              )
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

      {/* PAGINATION */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
        <div className="text-[11px] text-slate-500">
          Showing{" "}
          {filteredCampaigns.length === 0
            ? 0
            : (currentPage - 1) *
                ITEMS_PER_PAGE +
              1}{" "}
          to{" "}
          {Math.min(
            currentPage *
              ITEMS_PER_PAGE,
            filteredCampaigns.length
          )}{" "}
          of{" "}
          {filteredCampaigns.length}{" "}
          campaigns
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={
                handlePrevPage
              }
              disabled={
                currentPage === 1
              }
              className="h-8 px-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from(
                {
                  length:
                    totalPages,
                },
                (_, i) => i + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={
                    page ===
                    currentPage
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }
                  className="h-8 w-8 p-0 text-[11px] font-medium"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={
                handleNextPage
              }
              disabled={
                currentPage ===
                totalPages
              }
              className="h-8 px-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}