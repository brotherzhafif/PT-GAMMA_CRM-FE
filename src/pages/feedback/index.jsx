import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import FeedbackMetrics from "./components/feedbackMetrics";
import FeedbackToolbar from "./components/feedbackToolbar";
import FeedbackList from "./components/feedbackList";
import FeedbackDetail from "./components/feedbackDetail";
import NewFeedbackModal from "./components/newFeedbackModal";
import { useFeedback } from "./hooks/useFeedback";

export default function Feedback() {
  const [searchParams] = useSearchParams();
  const headerSearchQuery = searchParams.get("search");
  const {
    feedbacks,
    dashboardStats,
    loading,
    // error,
    addFeedback,
    addReplyLocal,
    updateStatusLocal
  } = useFeedback();

  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter States
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    if (headerSearchQuery !== null) {
      const timer = window.setTimeout(() => {
        setSearch(headerSearchQuery);
      }, 0);

      return () => window.clearTimeout(timer);
    }
  }, [headerSearchQuery]);

  // Reset all active filters
  const handleResetFilters = () => {
    setSearch("");
    setRating("all");
    setCategory("all");
    setStatus("all");
  };

  // Filter logic
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((item) => {
      const matchesSearch =
        item.patientName.toLowerCase().includes(search.toLowerCase()) ||
        item.comment.toLowerCase().includes(search.toLowerCase());
      const matchesRating = rating === "all" || item.rating.toString() === rating;
      const matchesCategory = category === "all" || item.category === category;
      const matchesStatus = status === "all" || item.status === status;
      return matchesSearch && matchesRating && matchesCategory && matchesStatus;
    });
  }, [feedbacks, search, rating, category, status]);

  // Derived selected feedback, ensuring details panel updates automatically
  const activeSelectedFeedback = useMemo(() => {
    if (!selectedFeedbackId) return null;
    return feedbacks.find((f) => f.id === selectedFeedbackId) || null;
  }, [feedbacks, selectedFeedbackId]);

  // Handlers
  const handleSelectFeedback = (feedback) => {
    setSelectedFeedbackId(feedback.id);
  };

  const handleCloseDetail = () => {
    setSelectedFeedbackId(null);
  };

  const handleAddReply = (feedbackId, replyText, channel) => {
    addReplyLocal(feedbackId, replyText, channel);
    toast.success("Balasan ditambahkan", {
      description: `Feedback sudah ditandai dibalas via ${channel}.`,
    });
  };

  const handleUpdateStatus = (feedbackId, newStatus) => {
    updateStatusLocal(feedbackId, newStatus);
    toast.info("Status feedback diperbarui", {
      description: `Status berubah menjadi ${newStatus}.`,
    });
  };

  const handleAddFeedback = async (newFeedbackPayload) => {
    const response = await addFeedback(newFeedbackPayload);
    if (!response) {
      toast.error("Gagal menambahkan feedback", {
        description: "Feedback belum tersimpan. Coba beberapa saat lagi.",
      });
      return;
    }

    setIsAddModalOpen(false);
    toast.success("Feedback ditambahkan", {
      description: `${newFeedbackPayload.patientName} berhasil masuk ke daftar feedback.`,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden sm:gap-6">
      {/* Title Header */}
      <div className="flex min-w-0 flex-col items-start">
        <h2 className="text-base font-semibold sm:text-lg">Feedback & Customer Care</h2>
        <p className="text-sm leading-5 text-gray-500">
          Review patient experiences, ratings, sentiment trends, and manage immediate follow-ups.
        </p>
      </div>

      {/* Metrics & Analytics Dashboard */}
      <FeedbackMetrics feedbacks={feedbacks} dashboardStats={dashboardStats} />
      {/* Main split dashboard view */}
      <div className="flex flex-col gap-4 min-h-0 overflow-visible w-full lg:h-[calc(100vh-260px)] lg:min-h-[620px] lg:overflow-hidden lg:flex-row">
        {/* Left column: Filters + List */}
        <div
          className={`min-h-0 flex-1 flex-col gap-4 overflow-visible lg:h-full lg:overflow-hidden ${
            activeSelectedFeedback ? "hidden lg:flex" : "flex"
          }`}
        >
          <FeedbackToolbar
            search={search}
            setSearch={setSearch}
            rating={rating}
            setRating={setRating}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
            onAddClick={() => setIsAddModalOpen(true)}
            onResetFilters={handleResetFilters}
          />

          <div className="min-h-[520px] flex-1 overflow-hidden lg:h-full lg:min-h-0">
            {loading && feedbacks.length === 0 ? (
              <div className="h-full flex items-center justify-center bg-white dark:bg-card border border-gray-200 dark:border-gray-800 rounded-2xl">
                <span className="text-sm text-muted-foreground animate-pulse">Loading feedback records...</span>
              </div>
            ) : (
              <FeedbackList
                data={filteredFeedbacks}
                selectedFeedback={activeSelectedFeedback}
                onSelectFeedback={handleSelectFeedback}
              />
            )}
          </div>
        </div>

        {/* Right column: Slide-out detailed view */}
        <div
          className={`min-h-[calc(100svh-6rem)] overflow-hidden transition-all duration-300 ease-out lg:h-full lg:min-h-0 lg:flex-shrink-0 ${
            activeSelectedFeedback ? "w-full lg:w-[420px]" : "hidden w-0 lg:block"
          }`}
        >
          <div
            className={`h-full transition-opacity duration-300 ease-out ${
              activeSelectedFeedback ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {activeSelectedFeedback && (
              <FeedbackDetail
                feedback={activeSelectedFeedback}
                onClose={handleCloseDetail}
                onAddReply={handleAddReply}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
          </div>
        </div>
      </div>

      {/* Dialog for adding feedback */}
      <NewFeedbackModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onConfirm={handleAddFeedback}
      />
    </div>
  );
}
