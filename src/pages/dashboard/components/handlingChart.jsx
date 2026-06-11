import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactApexChart from "react-apexcharts";

const PAGE_SIZE = 6;

export default function HandlingChart({
  categories = [],
  aiData = [],
  humanData = [],
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const hasData =
    aiData.some((value) => Number(value) > 0) ||
    humanData.some((value) => Number(value) > 0);
  const totalPoints = Math.max(categories.length, aiData.length, humanData.length);
  const totalPages = Math.max(Math.ceil(totalPoints / PAGE_SIZE), 1);
  const page = Math.min(currentPage, totalPages - 1);
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const visibleCategories = categories.slice(start, end);
  const visibleAiData = aiData.slice(start, end);
  const visibleHumanData = humanData.slice(start, end);
  const canPaginate = totalPoints > PAGE_SIZE;

  const series = [
    {
      name: "AI",
      data: visibleAiData,
    },
    {
      name: "Human",
      data: visibleHumanData,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      width: "100%",
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
      categories: visibleCategories,
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
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground">
            Handling (Chatbot vs Human)
          </h3>

          <div className="flex items-center gap-2">
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
            {canPaginate && (
              <div className="flex items-center gap-1">
                <Button
                  disabled={page === 0}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                  size="icon-xs"
                  type="button"
                  variant="ghost"
                >
                  <ChevronLeft />
                </Button>
                <span className="w-14 text-center text-xs text-muted-foreground">
                  {page + 1}/{totalPages}
                </span>
                <Button
                  disabled={page >= totalPages - 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  size="icon-xs"
                  type="button"
                  variant="ghost"
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-0 flex-1 flex min-w-0 items-center justify-center">
        {hasData ? (
          <div className="w-full min-w-0">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
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
