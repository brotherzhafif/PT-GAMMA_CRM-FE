import { useState, useMemo } from "react";
import FeedbackMetrics from "./components/feedbackMetrics";
import FeedbackToolbar from "./components/feedbackToolbar";
import FeedbackList from "./components/feedbackList";
import FeedbackDetail from "./components/feedbackDetail";
import NewFeedbackModal from "./components/newFeedbackModal";
import { useFeedback } from "./hooks/useFeedback";

export default function Feedback() {
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
  };

  const handleUpdateStatus = (feedbackId, newStatus) => {
    updateStatusLocal(feedbackId, newStatus);
  };

  const handleAddFeedback = async (newFeedbackPayload) => {
    await addFeedback(newFeedbackPayload);
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full mb-9 overflow-x-hidden">
      {/* Title Header */}
      <div className="flex flex-col items-start">
        <h2 className="font-semibold">Feedback & Customer Care</h2>
        <p className="text-sm text-gray-500">
          Review patient experiences, ratings, sentiment trends, and manage immediate follow-ups.
        </p>
      </div>

      {/* Metrics & Analytics Dashboard */}
      <FeedbackMetrics feedbacks={feedbacks} dashboardStats={dashboardStats} />

      {/* Main split dashboard view */}
      <div className="flex gap-4 h-[calc(100vh-260px)] min-h-[480px] overflow-hidden w-full">
        {/* Left column: Filters + List */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden h-full">
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

          <div className="flex-1 overflow-hidden h-full">
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
          className={`flex-shrink-0 h-full overflow-hidden transition-all duration-300 ease-out ${
            activeSelectedFeedback ? "w-[420px]" : "w-0"
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