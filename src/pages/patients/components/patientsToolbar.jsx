import { Button } from "@/components/ui/button";

import SearchInput from "./filters/searchInput";
import VisitFilter from "./filters/visitFilter";
import TagsFilter from "./filters/tagsFilter";
import FrequencyFilter from "./filters/frequencyFilter";
import MoreFilters from "./filters/moreFilters";

export default function PatientsToolbar() {
  return (
    <div className="bg-card border border-gray-200 rounded-2xl p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            Patients
          </h3>

          <p className="text-xs text-muted-foreground">
            2,845 patients
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            Export
          </Button>

          <Button>
            Add Patient
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput />

        <VisitFilter />

        <TagsFilter />

        <FrequencyFilter />

        <MoreFilters />
      </div>
    </div>
  );
}