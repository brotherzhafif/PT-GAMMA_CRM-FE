import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  CalendarClock,
  Clock,
  Eye,
  FileText,
  Stethoscope,
  User,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function DetailItem({ label, value }) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 break-words text-sm font-semibold text-slate-800">{value || "-"}</div>
    </div>
  );
}

function DetailSection({ icon: Icon, title, children }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 text-sm font-bold text-slate-800">
        <Icon className="h-4 w-4 text-emerald-600" />
        {title}
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-3">{children}</div>
    </section>
  );
}

function AppointmentDetailDialog({ appointment }) {
  const allergies = appointment.patient?.allergies?.length
    ? appointment.patient.allergies.join(", ")
    : "Tidak ada";
  const scheduleTime = appointment.jadwal?.jamSelesai
    ? `${appointment.jadwal?.jamMulai} - ${appointment.jadwal?.jamSelesai}`
    : appointment.duration;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700" title="Lihat Detail">
          <Eye size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="border-b border-slate-200 px-6 py-5 pr-12">
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="text-xl font-bold text-slate-900">
              {appointment.patient?.name || "Detail Appointment"}
            </DialogTitle>
            <Badge variant="outline" className={appointment.statusColor}>
              {appointment.status}
            </Badge>
            <Badge variant="outline" className="bg-slate-50 text-slate-700">
              {appointment.queueNumber || "-"}
            </Badge>
          </div>
          <DialogDescription className="text-slate-500">
            {appointment.patient?.noRm || "No RM belum tersedia"} - {formatDate(appointment.tanggalKunjungan)}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[72vh]">
          <div className="grid gap-4 bg-slate-50/70 p-6">
            <DetailSection icon={User} title="Data Pasien">
              <DetailItem label="Pasien" value={appointment.patient?.name} />
              <DetailItem label="No RM" value={appointment.patient?.noRm} />
              <DetailItem label="Tanggal Lahir" value={formatDate(appointment.patient?.birthDate)} />
              <DetailItem label="Alergi" value={allergies} />
              <DetailItem label="Jenis Kunjungan" value={appointment.jenisKunjunganBpjs} />
              <DetailItem label="No SEP" value={appointment.noSep} />
            </DetailSection>

            <DetailSection icon={Stethoscope} title="Jadwal Dokter">
              <DetailItem label="Dokter" value={appointment.doctor} />
              <DetailItem label="Spesialis" value={appointment.specialty} />
              <DetailItem label="Sesi" value={appointment.session} />
              <DetailItem label="Jam Praktik" value={scheduleTime} />
              <DetailItem label="Kapasitas" value={appointment.jadwal?.kapasitasMaks} />
              <DetailItem label="Status Jadwal" value={appointment.jadwal?.isAktif ? "Aktif" : "Tidak aktif"} />
            </DetailSection>

            <DetailSection icon={Clock} title="Timeline Kunjungan">
              <DetailItem label="Waktu Hadir" value={formatDateTime(appointment.waktuHadir)} />
              <DetailItem label="Waktu Dipanggil" value={formatDateTime(appointment.waktuDipanggil)} />
              <DetailItem label="Waktu Selesai" value={formatDateTime(appointment.waktuSelesai)} />
            </DetailSection>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                  <FileText className="h-4 w-4 text-amber-600" />
                  Catatan
                </div>
                <p className="text-sm leading-6 text-slate-600">{appointment.catatan || "-"}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                  <CalendarClock className="h-4 w-4 text-slate-600" />
                  Rujukan BPJS
                </div>
                <div className="grid gap-2 text-sm text-slate-600">
                  <div>No rujukan: <span className="font-semibold text-slate-800">{appointment.noRujukanFktp || "-"}</span></div>
                  <div>Tanggal rujukan: <span className="font-semibold text-slate-800">{formatDate(appointment.tanggalRujukan)}</span></div>
                  <div>Poli tujuan: <span className="font-semibold text-slate-800">{appointment.poliTujuanBpjs || "-"}</span></div>
                </div>
              </div>
            </section>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function TodaySchedule({ appointments = [], loading, error }) {
  if (loading) {
    return (
      <div className="text-center py-10 text-sm text-slate-500 border border-dashed rounded-lg">
        Memuat daftar appointment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm">
        {error}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-slate-400 border border-dashed rounded-lg">
        Tidak ada appointment yang ditemukan.
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="w-full min-w-[720px] overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[120px] pl-5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Jadwal
              </TableHead>
              <TableHead className="w-[260px] text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Pasien
              </TableHead>
              <TableHead className="w-[220px] text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Dokter
              </TableHead>
              <TableHead className="w-[130px] text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Status
              </TableHead>
              <TableHead className="w-[110px] text-right text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Antrian
              </TableHead>
              <TableHead className="w-[80px] pr-5 text-center text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((apt, index) => (
              <TableRow
                key={apt.id || index}
                className="border-slate-100 hover:bg-slate-50/70"
              >
                <TableCell className="py-3 pl-5">
                  <div className="text-sm font-bold leading-none text-slate-900">{apt.time}</div>
                  <div className="mt-1 text-[11px] font-medium text-slate-400">{apt.session || apt.duration}</div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0 border border-gray-200 shadow-sm">
                      <AvatarImage src={apt.patient?.img} />
                      <AvatarFallback className="bg-slate-100">
                        <User className="h-4 w-4 text-slate-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-bold text-slate-800">{apt.patient?.name}</div>
                      <div className="truncate text-[11px] text-slate-400">
                        {apt.patient?.noRm || "No RM -"}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex min-w-0 items-center gap-2">
                    <div className={`h-2 w-2 flex-shrink-0 rounded-full ${apt.dotColor || "bg-emerald-400"}`} />
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-semibold text-slate-700">{apt.doctor}</div>
                      <div className="truncate text-[11px] text-slate-400">{apt.specialty || apt.duration}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${apt.statusColor}`}
                  >
                    {apt.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Badge variant="outline" className="border-slate-200 bg-slate-50 font-bold text-slate-700">
                    {apt.queueNumber || String(index + 1).padStart(3, "0")}
                  </Badge>
                </TableCell>

                <TableCell className="pr-5 text-center">
                  <div className="flex items-center justify-center">
                    <AppointmentDetailDialog appointment={apt} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
