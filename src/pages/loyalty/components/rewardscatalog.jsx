import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket, Plus, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const rewards = [
  { title: "Free Dental...", points: 500, redeemed: "145x", status: "ACTIVE", color: "emerald" },
  { title: "15% Off Teeth...", points: 300, redeemed: "84x", status: "ACTIVE", color: "emerald" },
  { title: "Free Consultation", points: 150, redeemed: "312x", status: "ACTIVE", color: "slate" },
  { title: "Rp 50.000 Discount", points: 50, redeemed: "450x", status: "DRAFT", color: "orange" },
];


export function RewardsCatalog() {
  return (
    <Card className="flex-1 p-6 shadow-sm border-none bg-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Rewards Catalog</h3>
          <p className="text-sm text-slate-400">Vouchers and discounts available for point redemption.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold h-10 px-4">
          <Plus className="w-4 h-4 stroke-[3px]" /> CREATE REWARD
        </Button>
      </div>

      <ScrollArea className="h-[350px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward, i) => (
            <div key={i} className="flex border rounded-xl overflow-hidden group cursor-pointer hover:border-emerald-200 transition-colors">
              <div className={`w-24 flex flex-col items-center justify-center gap-2 p-4 ${
                reward.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' : 
                reward.color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-500'
              }`}>
                <Ticket className="w-8 h-8" />
                <span className="text-lg font-bold">{reward.points}</span>
                <span className="text-[10px] font-bold tracking-widest">PTS</span>
              </div>
              <div className="flex-1 p-4 bg-white flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-700 text-sm">{reward.title}</h4>
                  <Badge variant="outline" className={`text-[9px] font-bold ${
                    reward.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}>
                    {reward.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-4">
                  <User className="w-3 h-3" />
                  Redeemed: <span className="font-bold text-slate-600">{reward.redeemed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}