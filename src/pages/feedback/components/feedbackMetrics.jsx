import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, MessageSquare, AlertCircle, Smile, Meh, Frown, ClipboardCheck } from "lucide-react";

export default function FeedbackMetrics({ feedbacks, dashboardStats }) {
  const total = feedbacks.length;
  
  // Average rating
  const avgRating = dashboardStats?.rata_rating !== undefined
    ? Number(dashboardStats.rata_rating).toFixed(1)
    : (total > 0 
        ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1)
        : "0.0");
    
  // Pending actions count
  const pendingCount = feedbacks.filter(f => f.status === "Pending").length;
  
  // Total survey metrics
  const totalSurveys = dashboardStats?.total_survey_terkirim ?? total;
  const filledCount = dashboardStats?.total_ngisi ?? total;
  const ignoreCount = dashboardStats?.total_gak_ngisi ?? Math.max(totalSurveys - filledCount, 0);
  const responseRate = totalSurveys > 0 ? Math.round((filledCount / totalSurveys) * 100) : 0;

  // Sentiment percentages
  const positiveCount = feedbacks.filter(f => f.sentiment === "Positive").length;
  const neutralCount = feedbacks.filter(f => f.sentiment === "Neutral").length;
  const negativeCount = feedbacks.filter(f => f.sentiment === "Negative").length;
  
  const positivePct = total > 0 ? Math.round((positiveCount / total) * 100) : 0;
  const neutralPct = total > 0 ? Math.round((neutralCount / total) * 100) : 0;
  const negativePct = total > 0 ? Math.round((negativeCount / total) * 100) : 0;

  const metrics = [
    {
      title: "Average Rating (CSAT)",
      value: `${avgRating} / 5.0`,
      icon: Star,
      color: "bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50",
      description: "Average clinical experience score"
    },
    {
      title: "Survey Delivery",
      value: `${filledCount} / ${totalSurveys}`,
      icon: ClipboardCheck,
      color: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/50",
      description: `${responseRate}% Filled (${ignoreCount} unanswered)`
    },
    {
      title: "Total Feedbacks",
      value: (dashboardStats?.total_feedback ?? total).toString(),
      icon: MessageSquare,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50",
      description: "Total registered patient ulasan"
    },
    {
      title: "Pending Action",
      value: pendingCount.toString(),
      icon: AlertCircle,
      color: pendingCount > 0 
        ? "bg-rose-50 text-rose-600 border-rose-200 animate-pulse dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50" 
        : "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800",
      description: "Requires administrator responses"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      {metrics.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className="hover:shadow-md transition duration-200 border border-gray-200 dark:border-gray-800 bg-white dark:bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                {item.title}
              </span>
              <div className={`p-2 rounded-xl border ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {item.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.description}
              </span>
            </CardContent>
          </Card>
        );
      })}

      {/* Sentiment Analytics Section */}
      <Card className="col-span-1 md:col-span-2 xl:col-span-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-card">
        <CardContent className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">Patient Sentiment Breakdown</span>
            <span className="text-xs text-muted-foreground">Automated feedback tone classification</span>
          </div>

          <div className="flex-1 max-w-xl flex flex-col gap-2">
            {/* Visual stacked progress bar */}
            <div className="h-4 w-full rounded-full overflow-hidden flex bg-gray-100 dark:bg-gray-850 border border-gray-200 dark:border-gray-700">
              <div 
                style={{ width: `${positivePct}%` }} 
                className="h-full bg-emerald-500 transition-all duration-500" 
                title={`Positive: ${positivePct}%`} 
              />
              <div 
                style={{ width: `${neutralPct}%` }} 
                className="h-full bg-amber-400 transition-all duration-500" 
                title={`Neutral: ${neutralPct}%`} 
              />
              <div 
                style={{ width: `${negativePct}%` }} 
                className="h-full bg-rose-500 transition-all duration-500" 
                title={`Negative: ${negativePct}%`} 
              />
            </div>

            {/* Labels and legends */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold text-foreground">{positivePct}%</span> Positive
              </div>
              <div className="flex items-center gap-1">
                <Meh className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold text-foreground">{neutralPct}%</span> Neutral
              </div>
              <div className="flex items-center gap-1">
                <Frown className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-semibold text-foreground">{negativePct}%</span> Negative
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
