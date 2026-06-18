import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilterX } from "lucide-react";

export default function FeedbackToolbar({
  search,
  setSearch,
  rating,
  setRating,
  category,
  setCategory,
  status,
  setStatus,
  onResetFilters
}) {
  const categories = ["Treatment", "Wait Time", "Facility", "Billing", "Service"];
  const statuses = ["Pending", "Replied", "Resolved"];
  const ratings = ["5", "4", "3", "2", "1"];

  const hasActiveFilters = search !== "" || rating !== "all" || category !== "all" || status !== "all";

  return (
    <div className="bg-white dark:bg-card rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-foreground sm:text-lg">Patient Feedbacks</h3>
          <p className="text-xs leading-4 text-muted-foreground">Monitor and manage clinical feedback reports</p>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onResetFilters}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 h-9"
            >
              <FilterX className="w-4 h-4" /> Reset Filters
            </Button>
          )}
          {/* <Button 
            onClick={onAddClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1.5 h-9 font-bold shadow-md cursor-pointer transition duration-150"
          >
            <Plus className="w-4 h-4 stroke-[3px]" /> Add Feedback
          </Button> */}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-gray-800 md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search patient, comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-50 border-gray-300 dark:bg-input/20 dark:border-gray-700 h-9 rounded-lg"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:flex md:flex-wrap md:items-center">
          {/* Category */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-slate-50 border-gray-300 dark:bg-input/20 dark:border-gray-700 h-9 text-xs md:w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating */}
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger className="w-full bg-slate-50 border-gray-300 dark:bg-input/20 dark:border-gray-700 h-9 text-xs md:w-[120px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              {ratings.map((r) => (
                <SelectItem key={r} value={r}>{r} Star{r !== "1" && "s"}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full bg-slate-50 border-gray-300 dark:bg-input/20 dark:border-gray-700 h-9 text-xs md:w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
