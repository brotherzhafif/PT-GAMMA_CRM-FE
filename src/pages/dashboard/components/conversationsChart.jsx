import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReactApexChart from "react-apexcharts";

export default function ConversationChart() {
  const series = [
    {
      name: "Total Volume",
      data: [20, 40, 80, 160, 200],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    colors: ["#34d399"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["8a", "10a", "12p", "2p", "4p"],
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      theme: "light",
    },
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="-pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Conversations (Today)
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Total Volume
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-0 flex-1 flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={280}
          width={350}
        />
      </CardContent>
    </Card>
  );
}