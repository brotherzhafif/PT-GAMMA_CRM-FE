import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, Filter, Download, RefreshCw, Plus } from "lucide-react";

export default function CampaignsToolbar({
  searchValue,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onRefresh,
  onCreate,
  onExportCsv,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-semibold">Campaign Management</h3>

          <p className="text-xs text-muted-foreground">
            Manage and monitor marketing campaigns.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            onClick={onExportCsv}
            className="cursor-pointer border border-gray-300 shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer border border-gray-300 shadow-sm"
            onClick={onRefresh}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
          </Button>

          <Button
            onClick={onCreate}
            className="cursor-pointer shadow-sm transition-all duration-200 hover:scale-[1.03]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search campaign..."
              className="pl-9"
            />
          </div>

          <Button
            variant="ghost"
            className="cursor-pointer border border-gray-300 shadow-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-muted/20 p-4 shadow-sm lg:flex-row lg:items-center">
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-medium">Campaign Status</Label>

              <Select value={selectedStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
