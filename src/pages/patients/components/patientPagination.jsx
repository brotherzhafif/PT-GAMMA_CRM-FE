export default function PatientPagination() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 text-sm">
      <p className="text-muted-foreground">
        Showing 1-5 of 2,845 patients
      </p>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-muted transition">
          1
        </button>

        <button className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-muted transition">
          2
        </button>

        <button className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-muted transition">
          3
        </button>
      </div>
    </div>
  );
}