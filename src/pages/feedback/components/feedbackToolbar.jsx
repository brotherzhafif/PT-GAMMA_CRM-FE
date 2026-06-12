import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, FilterX } from "lucide-react";

export default function FeedbackToolbar({
  search,
  setSearch,
  rating,
  setRating,
  category,
  setCategory,
  status,
  setStatus,
  onAddClick,
  onResetFilters
}) {
  const categories = ["Treatment", "Wait Time", "Facility", "Billing", "Service"];
  const statuses = ["Pending", "Replied", "Resolved"];
  const ratings = ["5", "4", "3", "2", "1"];

  const hasActiveFilters = search !== "" || rating !== "all" || category !== "all" || status !== "all";

  return (
    <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Patient Feedbacks</h3>
          <p className="text-xs text-muted-foreground">Monitor and manage clinical feedback reports</p>
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

      <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-gray-800">
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
        <div className="flex flex-wrap items-center gap-2">
          {/* Category */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[140px] bg-slate-50 border-gray-300 dark:bg-input/20 dark:border-gray-700 h-9 text-xs">
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
            <SelectTrigger className="w-[120px] bg-slate-50 border-gray-300 dark:bg-input/20 dark:border-gray-700 h-9 text-xs">
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
            <SelectTrigger className="w-[120px] bg-slate-50 border-gray-300 dark:bg-input/20 dark:border-gray-700 h-9 text-xs">
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
