import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchInput({ value, disabled, onChange }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

      <Input
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder="Search patient by name, NIK, RME, or phone..."
        className="pl-9"
      />
    </div>
  );
}
