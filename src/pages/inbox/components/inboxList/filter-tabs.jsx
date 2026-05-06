import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "waiting", label: "Waiting" },
  { id: "ai-handled", label: "AI Handled" },
  { id: "needs-human", label: "Needs Human" },
];

export default function FilterTabs({ activeFilter, onFilterChange }) {
  return (
    <ScrollArea className="w-full ">
      <div className="flex gap-1.5 px-4 py-3">
        {filterOptions.map((filter) => (
          <Button
            key={filter.id}
            variant={ "ghost"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={`cursor-pointer whitespace-nowrap h-7 text-xs px-3 flex-shrink-0 ${
              activeFilter === filter.id
                ? "  text-green-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-1" />
    </ScrollArea>
  );
}