import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Calendar,
  Megaphone,
  MessageCircle,
  Settings,
  Star,
  UserRound,
  Users,
} from "lucide-react";

const getIcon = (type) => {
  switch (type) {
    case "chat":
      return <MessageCircle className="text-green-500" size={18} />;
    case "booking":
      return <Calendar className="text-green-500" size={18} />;
    case "handoff":
      return <UserRound className="text-yellow-500" size={18} />;
    case "feedback":
      return <Star className="text-yellow-500" size={18} />;
    case "patients":
      return <Users className="text-green-500" size={18} />;
    case "marketing":
      return <Megaphone className="text-green-500" size={18} />;
    case "system":
      return <Settings className="text-red-500" size={18} />;
    case "error":
      return <AlertCircle className="text-red-500" size={18} />;
    default:
      return <MessageCircle className="text-green-500" size={18} />;
  }
};

const getBadge = (status) => {
  if (!status) return null;

  if (status.color === "yellow")
    return (
      <Badge className="bg-yellow-100 text-yellow-700 shadow-md">
        {status.label}
      </Badge>
    );

  if (status.color === "green")
    return (
      <Badge className="bg-green-100 text-green-700 shadow-md">
        {status.label}
      </Badge>
    );

  if (status.color === "red")
    return (
      <Badge variant="destructive" className="shadow-md">
        {status.label}
      </Badge>
    );
};

const getIconWrapper = (type) => {
  switch (type) {
    case "chat":
      return "bg-green-100 text-green-600";
    case "booking":
      return "bg-green-100 text-green-600";
    case "handoff":
      return "bg-yellow-100 text-yellow-600";
    case "feedback":
      return "bg-yellow-100 text-yellow-600";
    case "patients":
      return "bg-green-100 text-green-600";
    case "marketing":
      return "bg-green-100 text-green-600";
    case "system":
      return "bg-red-100 text-red-600";
    case "error":
      return "bg-red-100 text-red-600";
    default:
      return "bg-muted text-foreground";
  }
};

export default function LiveActivity({ activities = [] }) {
  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-4 text-base font-semibold">
          Live Activity Feed
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </div>
        </CardTitle>

        {/* <Button
          variant="ghost"
          size="sm"
          className="text-sm text-primary cursor-pointer"
        >
          View All
        </Button> */}
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4 ">
          {activities.length > 0 ? (
            <div className="flex flex-col gap-4">
              {activities.map((item) => (
                <div
                  key={item.id || `${item.title}-${item.time}`}
                  className={`flex gap-3 p-3 rounded-lg shadow-md border ${
                    item.type === "error" || item.type === "system"
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div
                    className={`mt-1 flex items-center justify-center rounded-full w-8 h-8 ${getIconWrapper(
                      item.type,
                    )}`}
                  >
                    {getIcon(item.type)}
                  </div>

                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex justify-between items-start">
                      <h4
                        className={`text-sm font-semibold ${
                          item.type === "error" || item.type === "system"
                            ? "text-red-600"
                            : ""
                       }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {item.desc}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      {getBadge(item.status)}

                      {item.action && (
                        <Button size="sm" variant="destructive">
                          Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Belum ada aktivitas live.
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
