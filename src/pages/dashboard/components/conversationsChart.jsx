import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactApexChart from "react-apexcharts";

const PAGE_SIZE = 6;

export default function ConversationChart({ categories = [], data = [] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const hasData = data.some((value) => Number(value) > 0);
  const totalPages = Math.max(Math.ceil(data.length / PAGE_SIZE), 1);
  const page = Math.min(currentPage, totalPages - 1);
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const visibleCategories = categories.slice(start, end);
  const visibleData = data.slice(start, end);
  const canPaginate = data.length > PAGE_SIZE;

  const series = [
    {
      name: "Total Volume",
      data: visibleData,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      width: "100%",
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
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground">
            Conversations (Today)
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Total Volume
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
              height={280}
              width="100%"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada data percakapan.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
