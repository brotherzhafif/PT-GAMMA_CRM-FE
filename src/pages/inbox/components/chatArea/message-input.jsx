import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, LayoutTemplate } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MessageInput() {
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setValue("");
    }
  };

  return (
    <div className="px-4 py-3 border-t border-gray-400">
      <div className="flex items-end gap-2 border border-gray-400 rounded-xl px-3 py-1 bg-background focus-within:ring-1 focus-within:ring-ring transition">
        <div className="flex gap-1 mb-0.5">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
            <LayoutTemplate className="w-4 h-4" />
          </Button>
        </div>

        <Input
          placeholder="Type a message or press '/' for templates..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 border-0 shadow-none resize-none focus-visible:ring-0 p-0 text-sm min-h-0 max-h-32 bg-transparent"
        />

        <Button
          size="icon"
          className="h-8 w-8 rounded-lg bg-green-600 hover:bg-green-700 text-white mb-0.5 items-center justify-center flex"
          disabled={!value.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}