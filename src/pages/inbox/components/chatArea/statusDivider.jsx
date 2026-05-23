import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bot } from "lucide-react";

export default function StatusDivider({ type = "human" }) {
  const isBot = type === "bot";

  const config = {
    bot: {
      colorClass: "border-green-300 text-green-600 bg-green-50",
      lineClass: "border-green-300",
      icon: <Bot className="w-3 h-3" />,
      text: "HANDED BACK TO AI BOT",
    },
    human: {
      colorClass: "border-red-300 text-red-500 bg-red-50",
      lineClass: "border-red-300",
      icon: <AlertTriangle className="w-3 h-3" />,
      text: "ESCALATED TO HUMAN AGENT",
    },
  };

  const current = isBot ? config.bot : config.human;

  return (
    <div className="flex items-center gap-3 my-5">
      <div className={`flex-1 border-t border-dashed ${current.lineClass}`} />
      <Badge
        variant="outline"
        className={`${current.colorClass} text-[10px] font-semibold tracking-wider px-3 py-1 flex items-center gap-1.5`}
      >
        {current.icon}
        {current.text}
      </Badge>
      <div className={`flex-1 border-t border-dashed ${current.lineClass}`} />
    </div>
  );
}