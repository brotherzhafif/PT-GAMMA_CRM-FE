import { Button } from "@/components/ui/button";
import { 
  Download, 
  Plus, 
  // RefreshCw 
} from "lucide-react";

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
  // onRefresh,
  onAddPatient,
  onExportCsv,
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md sm:p-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900">Patients</h3>

          <p className="text-[11px] text-slate-500">{totalPatients} patients</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* <Button
            type="button"
            variant="ghost"
            onClick={onRefresh}
            title="Refresh patients"
            className="border border-gray-300 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </Button> */}

          <Button
            type="button"
            variant="ghost"
            onClick={onExportCsv}
            className="border border-gray-300 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>

          <Button type="button" onClick={onAddPatient}>
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Patient</span>
          </Button>
        </div>
      </div>

      <form onSubmit={onSearchSubmit} className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-slate-100">
        <div className="w-full flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <SearchInput
            value={searchQuery}
            disabled={isSearching}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto">
            <VisitFilter value={lastVisitDate} onChange={onLastVisitChange} />

            <TagsFilter value={selectedTag} options={tagOptions} onChange={onTagChange} />

            {/* More filters hidden until the next filter set is defined. */}
          </div>
        </div>
      </form>
    </div>
  );
}
