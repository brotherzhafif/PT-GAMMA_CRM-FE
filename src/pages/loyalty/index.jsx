import { LoyaltyStats } from "./components/loyaltystats";
import { RewardsCatalog } from "./components/rewardscatalog";
import { Card } from "@/components/ui/card";
import { Star, ArrowDown } from "lucide-react";


export default function LoyaltyDashboard() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* Top Stats */}
      <LoyaltyStats />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Points System */}
        <div className="w-full lg:w-80 space-y-6">
          <Card className="p-6 shadow-sm border-none bg-white">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-slate-800">Points System</h3>
              </div>
              <button className="text-emerald-500 text-sm font-bold">Settings</button>
            </div>

            <div className="space-y-4">
              {/* Earning Rule */}
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 relative overflow-hidden">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Earning Rule</p>
                <p className="text-lg font-bold text-slate-800">Rp 100.000 = 10 Points</p>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Patients earn points for every completed visit based on invoice total.
                </p>
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <div className="bg-white p-1 rounded-full border shadow-sm text-slate-300">
                  <ArrowDown className="w-4 h-4" />
                </div>
              </div>

              {/* Conversion Value */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Conversion Value</p>
                <p className="text-lg font-bold text-slate-800">1 Point = Rp 1.000</p>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Points can be redeemed for discounts or exclusive vouchers.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Rewards Catalog */}
        <RewardsCatalog />
      </div>
    </div>
  );
}