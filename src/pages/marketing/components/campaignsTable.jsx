import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronLeft, ChevronRight } from "lucide-react";

import CampaignsToolbar from "./campaignsToolbar";
import CampaignRow from "./campaignRow";

const ITEMS_PER_PAGE = 10;

const csvHeaders = [
  "Campaign",
  "Description",
  "Audience",
  "Segment",
  "Status",
  "Schedule Date",
];

const escapeCsvCell = (value) => {
  const stringValue = value == null ? "" : String(value);

  return `"${stringValue.replace(/"/g, '""')}"`;
};

const downloadCsv = (campaigns) => {
  const rows = campaigns.map((campaign) => [
    campaign.name,
    campaign.description,
    campaign.audience,
    campaign.segment,
    campaign.status,
    campaign.date,
  ]);

  const csv = [csvHeaders, ...rows]
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "marketing-campaigns.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};

export default function CampaignsTable({
  campaigns = [],
  onEdit,
  onRefresh,
  onCreate,
}) {
  const [searchValue, setSearchValue] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch = campaign.name
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || campaign.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchValue, selectedStatus]);

  const totalPages = useMemo(
    () => Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE),
    [filteredCampaigns.length],
  );

  const paginatedCampaigns = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredCampaigns.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCampaigns, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Card className="h-full gap-0 rounded-lg border-gray-200 py-0 shadow-sm">
      <CampaignsToolbar
        searchValue={searchValue}
        onSearchChange={(value) => {
          setSearchValue(value);
          setCurrentPage(1);
        }}
        selectedStatus={selectedStatus}
        onStatusChange={(value) => {
          setSelectedStatus(value);
          setCurrentPage(1);
        }}
        onRefresh={onRefresh}
        onCreate={onCreate}
        onExportCsv={() => downloadCsv(filteredCampaigns)}
      />

      <CardContent className="px-0">
        <Table className="[&_td]:align-middle [&_th]:align-middle">
          <TableHeader className="bg-muted/40 ">
            <TableRow>
              <TableHead className="px-4 py-4 text-xs text-muted-foreground">
                Campaign
              </TableHead>

              <TableHead className="px-4 py-4 text-xs text-muted-foreground">
                Audience
              </TableHead>

              <TableHead className="px-4 py-4 text-xs text-muted-foreground">
                Status
              </TableHead>

              <TableHead className="px-4 py-4 text-xs text-muted-foreground">
                Schedule Date
              </TableHead>

              <TableHead className="px-4 py-4 text-center text-xs text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCampaigns.length > 0 ? (
              paginatedCampaigns.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  No campaigns found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-4 py-3">
        <div className="text-[11px] text-slate-500">
          Showing{" "}
          {filteredCampaigns.length === 0
            ? 0
            : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
          to {Math.min(currentPage * ITEMS_PER_PAGE, filteredCampaigns.length)}{" "}
          of {filteredCampaigns.length} campaigns
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="h-8 border border-gray-300 px-2 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1,
              ).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    page === currentPage
                      ? "h-8 w-8 p-0 text-[11px] font-medium"
                      : "h-8 w-8 border border-gray-300 p-0 text-[11px] font-medium shadow-sm"
                  }
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="h-8 border border-gray-300 px-2 shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
