import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Bot, UserPlus } from "lucide-react";

const EmptyInsight = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);

export default function ChatbotInsight({
  intents: intentItems = [],
  lowConfidence: lowConfidenceItems = [],
  escalated: escalatedItems = [],
  notes = [],
}) {
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

          {intentItems.length > 0 ? (
            intentItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
                <Progress value={item.percent} />
              </div>
            ))
          ) : (
            <EmptyInsight>Belum ada intent terdeteksi.</EmptyInsight>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-yellow-600 flex items-center gap-2">
            <AlertTriangle />
            Low Confidence Intents
          </h4>

          {lowConfidenceItems.length > 0 ? (
            lowConfidenceItems.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center text-sm bg-yellow-50 shadow-sm rounded-md px-3 py-2"
              >
                <span>{item.label}</span>
                <span className="text-yellow-600">{item.count}</span>
              </div>
            ))
          ) : (
            <EmptyInsight>Tidak ada intent low confidence.</EmptyInsight>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-red-500 flex items-center gap-2">
            <UserPlus />
            Frequently Escalated
          </h4>

          {escalatedItems.length > 0 ? (
            escalatedItems.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center text-sm bg-red-50 rounded-md px-3 py-2 shadow-sm"
              >
                <span>{item.label}</span>
                <span className="text-red-500">{item.count} handoffs</span>
              </div>
            ))
          ) : (
            <EmptyInsight>Tidak ada eskalasi berulang.</EmptyInsight>
          )}
        </div>

        {notes.length > 0 && (
          <div className="flex flex-col gap-1 border-t pt-3">
            {notes.map((note) => (
              <p key={note} className="text-xs text-muted-foreground">
                {note}
              </p>
            ))}
          </div>
        )}
      </CardContent>

      {/* <CardFooter className="mt-auto pt-4">
        <Button className="w-full border-none text-primary cursor-pointer hover:bg-secondary" variant="outline">
            <BrainCircuit />
          Train Chatbot
        </Button>
      </CardFooter> */}
    </Card>
  );
}
