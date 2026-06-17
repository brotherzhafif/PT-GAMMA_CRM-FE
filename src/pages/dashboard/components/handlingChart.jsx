import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReactApexChart from "react-apexcharts";

export default function HandlingChart({
  aiData = [],
  humanData = [],
}) {
  const aiTotal = aiData.reduce((sum, value) => sum + Number(value || 0), 0);
  const humanTotal = humanData.reduce((sum, value) => sum + Number(value || 0), 0);
  const hasData = aiTotal > 0 || humanTotal > 0;
  const series = [aiTotal, humanTotal];

  const options = {
    chart: {
      type: "donut",
      width: "100%",
      toolbar: { show: false },
    },
    labels: ["AI", "Human"],
    colors: ["#065f46", "#f59e0b"],
    dataLabels: {
      enabled: true,
      formatter: (value) => `${value.toFixed(1)}%`,
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: "12px",
      markers: {
        size: 8,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "68%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => `${aiTotal + humanTotal}`,
            },
          },
        },
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => `${value} respons`,
      },
    },
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="-pb-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground">
            Handling (Chatbot vs Human)
          </h3>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{aiTotal} AI</span>
            <span>{humanTotal} Human</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-0 flex-1 flex min-w-0 items-center justify-center">
        {hasData ? (
          <div className="w-full min-w-0">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={260}
              width="100%"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada data handling.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
