import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PatientRow from "./patientRow";

const ITEMS_PER_PAGE = 4;

export default function PatientsTable({
  data,
  loading,
  error,
  selectedPatient,
  onSelectPatient,
  onRetry,
  onEditPatient,
  onDeletePatient,
}) {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedData.map((p) => p.id)));
    }
  };

  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
  const visiblePage = Math.min(currentPage, totalPages);
  const startIndex = (visiblePage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Card className="h-full flex flex-col rounded-2xl border-slate-200 shadow-md  overflow-hidden">
      <ScrollArea className="flex-1 w-full overflow-x-auto overflow-y-auto">
        <Table>
          <TableHeader className="bg-slate-50/50 border-none sticky top-0 z-10">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-12 px-6 py-4">
                <Checkbox
                  checked={selectedIds.size === paginatedData.length && paginatedData.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider px-6 py-4 min-w-[200px]">
                PATIENT
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider px-6 py-4 min-w-[150px]">
                CONTACT
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider px-6 py-4 min-w-[120px]">
                LAST VISIT
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider px-6 py-4 min-w-[80px]">
                VISITS
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider px-6 py-4 min-w-[120px]">
                STATUS
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider px-6 py-4 min-w-[150px]">
                TAGS
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 tracking-wider px-6 py-4 text-right min-w-[80px]">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading &&
              Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
                <TableRow key={index} className="border-b border-slate-100">
                  <TableCell colSpan={8} className="px-6 py-4">
                    <Skeleton className="h-9 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!loading && error && (
              <TableRow>
                <TableCell colSpan={8} className="px-6 py-10">
                  <Alert variant="destructive">
                    <AlertTitle>Gagal memuat pasien</AlertTitle>
                    <AlertDescription className="flex items-center justify-between gap-4">
                      <span>{error}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onRetry}
                        className="border border-gray-300 shadow-sm"
                      >
                        Retry
                      </Button>
                    </AlertDescription>
                  </Alert>
                </TableCell>
              </TableRow>
            )}

            {!loading && !error && paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="px-6 py-16 text-center text-xs text-slate-500">
                  No patients found.
                </TableCell>
              </TableRow>
            )}

            {!loading && !error && paginatedData.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                active={selectedPatient?.id === patient.id}
                isSelected={selectedIds.has(patient.id)}
                onSelect={() => handleSelectRow(patient.id)}
                onClick={() => onSelectPatient(patient)}
                onEdit={() => onEditPatient(patient)}
                onDelete={() => onDeletePatient(patient)}
              />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="px-6 py-4 border-t border-slate-100 flex-shrink-0 bg-white flex items-center justify-between">
        <div className="text-[11px] text-slate-500">
          Showing {data.length === 0 ? 0 : startIndex + 1} to {Math.min(visiblePage * ITEMS_PER_PAGE, data.length)} of {data.length} patients
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevPage}
            disabled={visiblePage === 1}
            className="h-8 px-2 border border-gray-300 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
              const startPage = Math.min(Math.max(visiblePage - 1, 1), Math.max(totalPages - 2, 1));
              return startPage + index;
            }).map((page) => (
              <Button
                key={page}
                variant={page === visiblePage ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 p-0 text-[11px] font-medium ${
                  page === visiblePage ? "" : "border border-gray-300 shadow-sm"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextPage}
            disabled={visiblePage === totalPages}
            className="h-8 px-2 border border-gray-300 shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
