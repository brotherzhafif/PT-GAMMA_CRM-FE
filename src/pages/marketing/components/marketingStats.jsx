import {
  Megaphone,
  MousePointerClick,
  Users,
  TrendingUp,
} from "lucide-react";

import MarketingStatCard from "./marketingStatCard";

export default function MarketingStats() {
  const stats = [
    {
      title: "Active Campaigns",
      value: "24",
      growth: "+12%",
      description: "Compared to last month",
      icon: Megaphone,
    },

    {
      title: "Click Through Rate",
      value: "38.2%",
      growth: "+4.8%",
      description: "Engagement increased",
      icon: MousePointerClick,
    },

    {
      title: "Audience Reach",
      value: "18.4K",
      growth: "+9.2%",
      description: "Users reached this week",
      icon: Users,
    },

    {
      title: "Conversion Rate",
      value: "12.6%",
      growth: "+2.1%",
      description: "Successful conversions",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <MarketingStatCard
          key={index}
          title={item.title}
          value={item.value}
          growth={item.growth}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
  );
}