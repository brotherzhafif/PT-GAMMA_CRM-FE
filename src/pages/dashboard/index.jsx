import { useState } from "react";
import DatePicker from "@/components/datePicker";
import { Button } from "@/components/ui/button";
import {
  BrainCircuit,
  CalendarCheck,
  Inbox,
  Megaphone,
  MessageSquare,
  Smile,
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

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const dummyCard = [
    {
      title: "Total Conversations",
      value: "1,234",
      graph: "+5.23%",
      trend: "up",
      icon: MessageSquare,
    },
    {
      title: "Chatbot Resolved Rate",
      value: "85%",
      graph: "+2.10%",
      trend: "up",
      icon: BrainCircuit,
    },
    {
      title: "Human Handoff Rate",
      value: "15%",
      graph: "-1.20%",
      trend: "down",
      icon: UserPlus,
    },
    {
      title: "Booking Conversion",
      value: "35.4%",
      graph: "+5.23%",
      trend: "up",
      icon: CalendarCheck,
    },
    {
      title: "NPS Score",
      value: "8.4",
      graph: "+3%",
      trend: "up",
      icon: Smile,
    },
  ];
  return (
    <div className="flex flex-col gap-6 w-full mb-9 overflow-x-hidden">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <h2 className="font-semibold">CRM Dashboard</h2>
          <p className="text-sm text-gray-500">
            Real-Time insight on communication and chatbot performance
          </p>
        </div>
        <DatePicker value={date} onChange={setDate} />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Button
          variant="default"
          size="sm"
          className="flex flex-row items-center gap-2"
        >
          <Megaphone />
          Start Broadcast
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex flex-row items-center gap-2"
        >
          <Inbox />
          Open Inbox
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex flex-row items-center gap-2"
        >
          <BrainCircuit />
          Train Chatbot
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 w-full">
        {dummyCard.map((item, i) => {
          const Icon = item.icon;
          const isUp = item.trend === "up";

          return (
            <Card key={i} className="w-full h-full hover:shadow-md transition">
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
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`flex items-center gap-1 font-medium ${isUp ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {isUp ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {item.graph}
                  </span>
                  <span className="text-muted-foreground">vs Last Month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 w-full">
        <div className="h-full w-full">
          <ConversationChart />
        </div>
        <div className="h-full w-full">
          <HandlingChart />
        </div>
        <div className="h-full w-full">
          <ConversionFunnel />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 items-start justify-between">
        <div className="w-full lg:w-1/2">
          <ChatbotInsight />
        </div>
        <div className="w-full">
          <LiveActivity />
        </div>
      </div>
    </div>
  );
}
