import { Button } from "@/components/ui/button";

export default function PatientPagination() {
  return (
    <div className="flex items-center justify-between text-sm">
      <p className="text-[11px] text-slate-500">
        Showing 1-5 of 2,845 patients
      </p>

      <div className="flex items-center gap-2">
        <Button className="w-8 h-8 rounded-md border border-slate-200 hover:bg-slate-50 text-[12px] font-medium text-slate-600 transition">
          1
        </Button>

        <Button className="w-8 h-8 rounded-md border border-slate-200 hover:bg-slate-50 text-[12px] font-medium text-slate-600 transition">
          2
        </Button>

        <Button className="w-8 h-8 rounded-md border border-slate-200 hover:bg-slate-50 text-[12px] font-medium text-slate-600 transition">
          3
        </Button>
      </div>
    </div>
  );
}