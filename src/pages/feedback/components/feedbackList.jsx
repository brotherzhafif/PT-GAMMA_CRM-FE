import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, MessageCircle, Laptop, Smartphone, Star, Globe } from "lucide-react";

const ITEMS_PER_PAGE = 5;

const channelIcons = {
  WhatsApp: { icon: MessageCircle, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
  Tablet: { icon: Smartphone, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20" },
  "Web Form": { icon: Laptop, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20" },
  Google: { icon: Globe, color: "text-rose-500 bg-rose-50 dark:bg-rose-950/20" }
};

const sentimentColors = {
  Positive: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
  Neutral: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
  Negative: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50"
};

const statusColors = {
  Pending: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  Replied: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  Resolved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
};

export default function FeedbackList({
  data,
  selectedFeedback,
  onSelectFeedback
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE)), [data.length]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating 
                ? "text-amber-400 fill-amber-400" 
                : "text-slate-200 dark:text-gray-700"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="flex flex-col bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm h-full">
      <ScrollArea className="flex-1 w-full overflow-hidden">
        {paginatedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-sm text-muted-foreground font-medium">No feedback matches your filter criteria.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-3 sm:p-4">
            {paginatedData.map((item) => {
              const isActive = selectedFeedback?.id === item.id;
              const sourceInfo = channelIcons[item.source] || { icon: Globe, color: "text-slate-500 bg-slate-50" };
              const SourceIcon = sourceInfo.icon;

              return (
                <Card
                  key={item.id}
                  onClick={() => onSelectFeedback(item)}
                  className={`flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/10 shadow-sm"
                      : "border-gray-100 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
                  }`}
                >
                  {/* Card Header area */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs font-bold bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-slate-300">
                          {item.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-xs font-bold text-foreground">{item.patientName}</span>
                        <span className="text-[10px] text-muted-foreground">{item.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className={`text-[9px] px-1.5 py-0 font-medium ${sentimentColors[item.sentiment]}`}>
                        {item.sentiment}
                      </Badge>
                      <Badge className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold border-none ${statusColors[item.status]}`}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Content: Rating & Preview */}
                  <div className="flex items-center gap-3 mt-1">
                    {renderStars(item.rating)}
                    <Separator orientation="vertical" className="h-3" />
                    <div className="flex items-center gap-1">
                      <div className={`p-1 rounded ${sourceInfo.color}`}>
                        <SourceIcon className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] font-semibold text-muted-foreground">{item.source}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mt-1">
                    {item.comment}
                  </p>

                  {/* Card Footer area */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-1 pt-2 border-t border-slate-100 dark:border-gray-900">
                    <Badge variant="secondary" className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded border-none hover:bg-emerald-50 dark:hover:bg-emerald-950/20">
                      {item.category}
                    </Badge>
                    {item.replies.length > 0 && (
                      <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> {item.replies.length} Repl{item.replies.length > 1 ? "ies" : "y"}
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Pagination Footer */}
      {data.length > ITEMS_PER_PAGE && (
        <CardFooter className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-card flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[10px] text-muted-foreground font-semibold">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, data.length)} of {data.length} reports
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="h-7 w-7 p-0 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-[10px] text-muted-foreground font-bold">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="h-7 w-7 p-0 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
