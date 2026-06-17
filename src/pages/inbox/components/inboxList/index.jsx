import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Filter, Edit } from "lucide-react";
import ChatItem from "./chat-item";
import FilterTabs from "./filter-tabs";
import { useUnifiedInbox } from "../../hooks/useUnifiendInbox.hooks";

export default function InboxList({ initialSearch = "", onSelect, selectedId }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const { chats, loading, error } = useUnifiedInbox();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(initialSearch);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [initialSearch]);

  const filtered = chats.filter((chat) => {
    const query = search.toLowerCase();
    const matchSearch = [chat.name, chat.phone, chat.last, chat.channel]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));

    if (activeFilter === "all") return matchSearch;

    if (activeFilter === "unread") {
      return matchSearch && chat.unread > 0;
    }

    if (activeFilter === "ai-handled") {
      return matchSearch && chat.status === "ai-handled";
    }

    if (activeFilter === "needs-human") {
      return matchSearch && chat.status === "needs-human";
    }

    if (activeFilter === "waiting") {
      return matchSearch && chat.status === "waiting";
    }

    return matchSearch;
  });

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-4 pt-4 pb-3 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg">Inbox</h2>

          {/* <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <Filter className="w-4 h-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <Edit className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div> */}
        </div>

        <div className="relative">
          <Input
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm"
          />

          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />

            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </div>

      <div className="flex-shrink-0">
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="overflow-hidden">
            {loading ? (
              <div className="p-4 text-sm text-muted-foreground">
                Loading chats...
              </div>
            ) : error ? (
              <div className="p-4 text-sm text-red-500">
                Failed to load chats
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground">
                No chats found
              </div>
            ) : (
              filtered.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isSelected={chat.id === selectedId}
                  onClick={onSelect}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
