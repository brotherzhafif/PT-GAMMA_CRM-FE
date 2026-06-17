import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "@/components/datePicker";
import { Button } from "@/components/ui/button";
import {
  BrainCircuit,
  CalendarCheck,
  Inbox,
  Megaphone,
  MessageSquare,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ConversationChart from "./components/conversationsChart";
import HandlingChart from "./components/handlingChart";
import ConversionFunnel from "./components/conversionFunnelChart";
import ChatbotInsight from "./components/chatbotInsight";
import LiveActivity from "./components/liveActivity";
import { useDashboardAnalytics } from "./hooks/useDashboardAnalytics";

const kpiIcons = {
  total_percakapan: MessageSquare,
  total_respons_chatbot: BrainCircuit,
  total_respons_admin: UserPlus,
  konversi_booking: CalendarCheck,
};

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const { activities, error, insights, kpiCards, loading, timeseries } =
    useDashboardAnalytics({ date });
  const conversionFunnelData = [];

  return (
    <div className="flex flex-col gap-6 w-full mb-9 overflow-x-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start">
          <h2 className="font-semibold">CRM Dashboard</h2>
          <p className="text-sm text-gray-500">
            Real-Time insight on communication and chatbot performance
          </p>
        </div>
        <DatePicker
          className="shrink-0 sm:w-[240px]"
          value={date}
          onChange={setDate}
        />
      </div>

      {error && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Data analytics belum bisa dimuat dari server.
        </div>
      )}

      <div className="flex flex-wrap gap-3 items-center">
        <Button
          asChild
          variant="default"
          size="sm"
          className="flex flex-row items-center gap-2"
        >
          <Link to="/marketing">
            <Megaphone />
            Start Broadcast
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="flex flex-row items-center gap-2 shadow-md border-gray-300"
        >
          <Link to="/inbox">
            <Inbox />
            Open Inbox
          </Link>
        </Button>
        {/* <Button
          variant="secondary"
          size="sm"
          className="flex flex-row items-center gap-2"
        >
          <BrainCircuit />
          Train Chatbot
        </Button> */}
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full transition-opacity ${
          loading ? "opacity-60" : "opacity-100"
        }`}
      >
        {kpiCards.length > 0 ? (
          kpiCards.map((item) => {
            const Icon = kpiIcons[item.key] || MessageSquare;
            const isUp = item.trend === "up";
            const isDown = item.trend === "down";

            return (
              <Card key={item.key} className="w-full h-full hover:shadow-md transition">
                <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500">
                      {item.title}
                    </p>
                  </div>

                  <div className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-green-500 bg-green-50 text-green-600">
                    <Icon className="w-5 h-5" />
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-2 -mt-8">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {item.value}
                  </h3>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`flex items-center gap-1 font-medium ${
                        isUp
                          ? "text-emerald-600"
                          : isDown
                            ? "text-rose-600"
                            : "text-slate-500"
                      }`}
                    >
                      {isUp && <ArrowUpRight className="w-4 h-4" />}
                      {isDown && <ArrowDownRight className="w-4 h-4" />}
                      {item.graph}
                    </span>
                    <span className="text-right text-muted-foreground text-[13px]">
                      {item.subtitle}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex h-28 items-center justify-center text-sm text-muted-foreground">
              Belum ada data KPI.
            </CardContent>
          </Card>
        )}
      </div>

      <div
        className={`grid grid-cols-1 gap-3 w-full ${
          conversionFunnelData.length > 0 ? "xl:grid-cols-3" : "xl:grid-cols-2"
        }`}
      >
        <div className="h-full min-w-0 w-full">
          <ConversationChart
            categories={timeseries.categories}
            data={timeseries.conversations}
          />
        </div>
        <div className="h-full min-w-0 w-full">
          <HandlingChart
            aiData={timeseries.ai}
            categories={timeseries.handlingCategories}
            humanData={timeseries.human}
          />
        </div>
        {conversionFunnelData.length > 0 && (
          <div className="h-full min-w-0 w-full">
            <ConversionFunnel data={conversionFunnelData} />
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-3 items-start justify-between">
        <div className="w-full lg:w-1/2">
          <ChatbotInsight
            escalated={insights.escalated}
            intents={insights.intents}
            lowConfidence={insights.lowConfidence}
            notes={insights.notes}
          />
        </div>
        <div className="w-full">
          <LiveActivity activities={activities} />
        </div>
      </div>
    </div>
  );
}
