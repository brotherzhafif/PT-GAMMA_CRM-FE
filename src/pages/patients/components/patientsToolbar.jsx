import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCw } from "lucide-react";

import SearchInput from "./filters/searchInput";
import VisitFilter from "./filters/visitFilter";
import TagsFilter from "./filters/tagsFilter";

export default function PatientsToolbar({
  totalPatients = 0,
  searchQuery,
  lastVisitDate,
  selectedTag,
  tagOptions,
  isSearching,
  onSearchChange,
  onLastVisitChange,
  onTagChange,
  onSearchSubmit,
  onRefresh,
  onAddPatient,
  onExportCsv,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Patients</h3>

          <p className="text-[11px] text-slate-500">{totalPatients} patients</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onRefresh}
            title="Refresh patients"
            className="border border-gray-300 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onExportCsv}
            className="border border-gray-300 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>

          <Button type="button" onClick={onAddPatient}>
            <Plus className="w-4 h-4" />
            Add Patient
          </Button>
        </div>
      </div>

      <form onSubmit={onSearchSubmit} className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-slate-100">
        <div className="w-full flex flex-row items-center justify-between gap-2">
          <SearchInput
            value={searchQuery}
            disabled={isSearching}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <div className="flex flex-row gap-2 items-center">
            <VisitFilter value={lastVisitDate} onChange={onLastVisitChange} />

            <TagsFilter value={selectedTag} options={tagOptions} onChange={onTagChange} />

            {/* More filters hidden until the next filter set is defined. */}
          </div>
        </div>
      </form>
    </div>
  );
}
