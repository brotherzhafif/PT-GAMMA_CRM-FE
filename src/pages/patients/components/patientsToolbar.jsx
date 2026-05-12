import { Button } from "@/components/ui/button";

import SearchInput from "./filters/searchInput";
import VisitFilter from "./filters/visitFilter";
import TagsFilter from "./filters/tagsFilter";
import FrequencyFilter from "./filters/frequencyFilter";
import MoreFilters from "./filters/moreFilters";

export default function PatientsToolbar() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Patients</h3>

          <p className="text-[11px] text-slate-500">2,845 patients</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>

          <Button>Add Patient</Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-slate-100">
        <div className="w-full flex flex-row items-center justify-between gap-2">
          <SearchInput />
          <div className="flex flex-row gap-2 items-center">
            <VisitFilter />

            <TagsFilter />

            <FrequencyFilter />
          </div>
        </div>

        <div className="flex w-full items-center justify-end">
          <MoreFilters />
        </div>
      </div>
    </div>
  );
}
