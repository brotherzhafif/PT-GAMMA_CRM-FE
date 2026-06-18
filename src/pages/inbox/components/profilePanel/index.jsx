import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  X,
  // Bot,
  // UserPlus,
  // RefreshCw,
  // FileText,
  // Info,
  // ChevronDown,
} from "lucide-react";
import { usePatientProfile } from "../../hooks/usePatientProfile.hook";
import PatientEditModal from "./patientsEditModal";

const formatDate = (date) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export default function ProfilePanel({ chat, onClose }) {
  const { patient } = usePatientProfile({
    patientId: chat?.patientId,
    phoneNumber: chat?.phone,
  });
  const [openEdit, setOpenEdit] = useState(false);

  if (!chat) return null;

  const patientName = patient?.namaLengkap || patient?.name || chat.name;
  const patientPhone = patient?.telepon || patient?.phone_number || chat.phone;

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-5">
        {onClose && (
          <div className="flex justify-end md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
              aria-label="Close profile"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        <div className="flex flex-col items-center text-center pt-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback className="text-lg font-semibold">
              {patientName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-3 font-semibold text-base">
            {patientName}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {patientPhone}
          </p>{" "}
          <div className="flex gap-2 mt-2">
            {chat.isVip && (
              <Badge
                variant="outline"
                className="text-amber-600 border-amber-300 bg-amber-50 text-xs"
              >
                VIP PATIENT
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-green-600 border-green-300 bg-green-50 text-xs"
            >
              ACTIVE
            </Badge>
          </div>
        </div>

        {/* <Separator /> */}

        {/* <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Bot className="w-4 h-4 text-green-600" />
            <h3 className="text-xs font-semibold uppercase  text-muted-foreground">
              AI Insights
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground text-sm">
                Intent Detected
              </span>
              <span className="font-semibold text-foreground text-xs">
                Book Appointment
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Confidence Score</span>
                <span className="font-semibold text-green-600 text-xs">
                  98%
                </span>
              </div>
              <Progress value={98} className="h-1.5 [&>div]:bg-green-500" />
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
              <div className="flex gap-2">
                <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Patient mentioned toothache. Recommended action: Assign to
                  dentist with endodontic specialty.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* <Separator /> */}

        {/* Action Buttons */}
        {/* <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-16 flex-col gap-1.5 text-xs font-medium cursor-pointer shadow-md border-gray-300"
          >
            <UserPlus className="w-4 h-4 text-green-600" />
            Assign Agent
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-16 flex-col gap-1.5 text-xs font-medium cursor-pointer shadow-md border-gray-300"
          >
            <RefreshCw className="w-4 h-4 text-amber-500" />
            Change Status
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-12 flex-col gap-1 text-xs font-medium cursor-pointer shadow-md border-gray-300 col-span-2"
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            Add Internal Note
          </Button>
        </div> */}

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Patient Details
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-green-600 hover:text-green-700 px-2"
              onClick={() => setOpenEdit(true)}
            >
              Edit
            </Button>
            <PatientEditModal
              open={openEdit}
              onOpenChange={setOpenEdit}
              patient={patient}
            />
          </div>

          <div className="space-y-2.5 text-sm">
            {[
              {
                label: "No RM",
                value: patient?.noRm || "-",
              },
              {
                label: "Tanggal Lahir",
                value: formatDate(patient?.tanggalLahir),
              },
              {
                label: "Jenis Kelamin",
                value: patient?.jenisKelamin?.replace("_", " ") || "-",
              },
              {
                label: "NIK",
                value: patient?.nik || "-",
              },
            ].map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-muted-foreground text-xs">
                  {item.label}
                </span>
                <span className="font-medium text-right text-xs">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* <Button
            variant="ghost"
            size="sm"
            className="w-full cursor-pointer mt-3 text-xs text-muted-foreground hover:text-foreground gap-1"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            Show more
          </Button> */}
        </div>
      </div>
    </ScrollArea>
  );
}
