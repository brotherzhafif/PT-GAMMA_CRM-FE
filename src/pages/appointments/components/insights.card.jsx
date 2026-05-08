import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function InsightsCard() {
  return (
    <Card className="w-full flex flex-col gap-3 p-4 shadow-sm border border-gray-300 bg-white">
      <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Insights (Today)</h3>
      <div className="flex justify-between items-end">
        <p className="text-sm font-semibold text-slate-700">No-Show Rate</p>
        <p className="text-sm font-bold text-emerald-500">2.4%</p>
      </div>
      <Progress value={25} className="h-2 bg-slate-100" />
      <p className="text-[10px] text-slate-400 italic font-medium leading-tight">
        Great! Below the 5% threshold.
      </p>
    </Card>
  );
}