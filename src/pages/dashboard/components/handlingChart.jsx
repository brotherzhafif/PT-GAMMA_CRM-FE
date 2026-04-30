import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReactApexChart from "react-apexcharts";

export default function HandlingChart() {
  const series = [
    {
      name: "AI",
      data: [70, 75, 65, 80, 68, 72, 78],
    },
    {
      name: "Human",
      data: [30, 25, 35, 20, 32, 28, 22],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 6,
      },
    },
    colors: ["#065f46", "#f59e0b"], 
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      show: false,
    },
    legend: {
      show: false,
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
            Handling (Chatbot vs Human)
          </h3>

          <div className="flex flex-col items-start gap-0 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
              <span className="text-muted-foreground">AI</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-muted-foreground">Human</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-0 flex-1 flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={260}
          width={350}
        />
      </CardContent>
    </Card>
  );
}