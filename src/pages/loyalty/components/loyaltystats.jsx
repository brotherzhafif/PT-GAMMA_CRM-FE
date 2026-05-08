import { Card } from "@/components/ui/card";
import { Users, Ticket, Coins, Gift, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "ACTIVE MEMBERS", value: "1,842", trend: "+12%", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "REDEMPTION RATE", value: "42.5%", trend: "+5.4%", icon: Ticket, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "POINTS ISSUED (MTD)", value: "45,200", trend: "+18%", icon: Coins, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "VALUE REDEEMED", value: "Rp 8.5M", trend: "+2.1%", icon: Gift, color: "text-emerald-500", bg: "bg-emerald-50" },
];

export function LoyaltyStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="p-5 shadow-sm border-none bg-white relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none flex gap-0.5 items-center text-[10px]">
              <ArrowUpRight className="w-3 h-3" /> {stat.trend}
            </Badge>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{stat.value}</h2>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider mt-1">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}