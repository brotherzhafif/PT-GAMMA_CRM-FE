import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagePreview({ message, campaignName }) {
  return (
    <Card className="gap-4 rounded-lg p-4">
      <CardHeader className="flex-row items-center justify-between p-0">
        <div className="flex flex-col">
          <CardTitle className="text-sm">Message Preview</CardTitle>
          <CardDescription className="text-xs">
            Live campaign message preview
          </CardDescription>
        </div>

        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700" variant="outline">
          WhatsApp
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-col gap-1 rounded-lg border bg-muted/20 p-3">
          <span className="text-xs text-muted-foreground">Campaign Name</span>
          <p className="text-sm font-medium">{campaignName || "Untitled Campaign"}</p>
        </div>

        <div className="flex flex-col gap-3 rounded-lg bg-[#E7FFDB] p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
              CRM
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-medium">Gamma CRM</span>
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
          </div>

          <div className="max-w-[95%] rounded-lg bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm">
            {message || "No message preview available."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
