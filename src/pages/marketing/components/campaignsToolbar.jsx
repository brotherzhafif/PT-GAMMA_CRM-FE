import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Search,
  Filter,
  Download,
  Plus,
} from "lucide-react";

export default function CampaignsToolbar({
  searchValue,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 p-5">
      {/* TOP SECTION */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Campaign Performance
          </h3>

          <p className="text-sm text-muted-foreground">
            Track campaign engagement and conversion activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-gray-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* SEARCH */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

            <Input
              value={searchValue}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search campaign..."
              className="pl-9 border-gray-300"
            />
          </div>

          {/* FILTER BUTTON */}
          <Button
            variant="outline"
            className="border-gray-300 w-full lg:w-auto"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* FILTER PANEL */}
        {showFilters && (
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-muted/20 p-4 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Campaign Status
              </label>

              <select
                value={selectedStatus}
                onChange={(e) =>
                  onStatusChange(e.target.value)
                }
                className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-sm outline-none"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="Draft">
                  Draft
                </option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}