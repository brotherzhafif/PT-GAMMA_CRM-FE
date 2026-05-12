import { ScrollArea } from "@/components/ui/scroll-area";
import ClinicInformation from "./components/clinicInformation";
// import { Card, CardHeader } from "@/components/ui/card";
// import { Field } from "@/components/ui/field";
// import LocalizationSettings from "./components/localizationSettings";
import OperatingHours from "./components/operatingHours";

export default function General() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">General Settings</h3>
        <p className="text-xs text-gray-500">
          Update your clinic information, timezone, and operating hours.
        </p>
      </div>

      <ScrollArea className="flex-1 flex-col w-full">
        <div className="flex flex-col gap-5 w-full">
          <ClinicInformation />
{/* 
          <Card className=" flex flex-col gap-8 shadow-md border border-gray-300">
            <CardHeader className="gap-0 flex flex-col items-start border-b border-gray-300">
              <h2 className="text-sm">Timezone & Localization</h2>
              <span className="text-xs text-gray-500">
                Set the primary region for your scheduling and reporting.{" "}
              </span>
            </CardHeader>

            <CardContent className="px-6 gap-6 flex flex-col">
                <LocalizationSettings />
            </CardContent>
          </Card> */}

          <OperatingHours />
        </div>
      </ScrollArea>
    </div>  
  );
}
