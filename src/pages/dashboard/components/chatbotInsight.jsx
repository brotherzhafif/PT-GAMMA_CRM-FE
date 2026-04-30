import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Bot, BrainCircuit, UserPlus } from "lucide-react";

const intents = [
  { label: "Book Appointment", value: 482, percent: 80 },
  { label: "Operating Hours", value: 215, percent: 45 },
  { label: "Pricing Inquiry", value: 156, percent: 35 },
];

const lowConfidence = [
  { label: "Insurance Claims", percent: 32, count: 45 },
  { label: "Complex Symptoms", percent: 28, count: 38 },
];

const escalated = [
  { label: "Billing Dispute", count: 120 },
  { label: "Reschedule Request", count: 85 },
];

export default function ChatbotInsight() {
  return (
    <Card className="w-full h-full flex flex-col">
      
      <CardHeader className="flex items-center gap-3 pb-2">
        <div className="w-9 h-9 flex items-center justify-center rounded-md bg-secondary">
          <Bot className="text-primary" size={20} />
        </div>
        <h3 className="font-semibold text-base">AI Chatbot Insights</h3>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold ">
            Top Detected Intents
          </h4>

          {intents.map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
              <Progress value={item.percent} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-yellow-600 flex items-center gap-2">
            <AlertTriangle />
            Low Confidence Intents
          </h4>

          {lowConfidence.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-sm bg-yellow-50 shadow-sm rounded-md px-3 py-2"
            >
              <span>{item.label}</span>
              <span className="text-yellow-600">
                {item.percent}% conf. ({item.count})
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-red-500 flex items-center gap-2">
            <UserPlus />
            Frequently Escalated
          </h4>

          {escalated.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-sm bg-red-50  rounded-md px-3 py-2 shadow-sm"
            >
              <span>{item.label}</span>
              <span className="text-red-500">
                {item.count} handoffs
              </span>
            </div>
          ))}
        </div>

      </CardContent>

      <CardFooter className="mt-auto pt-4">
        <Button className="w-full border-none text-primary cursor-pointer hover:bg-secondary" variant="outline">
            <BrainCircuit />
          Train Chatbot
        </Button>
      </CardFooter>
    </Card>
  );
}