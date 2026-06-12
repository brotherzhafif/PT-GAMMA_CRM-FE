import { useState } from "react"; 
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Bot } from "lucide-react";
import { createHandoffByPhoneNumber, deleteHandoffByPhoneNumber } from "@/services/unifiendBox.service";

export default function ChatHeader({ chat, onToggleProfile, showProfilePanel, isTyping }) {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(chat?.status);
  const isHandedOff = currentStatus === "needs-human" || currentStatus === "human";

  const handleToggleHandoff = async () => {
    if (!chat?.phone) return;
    
    try {
      setLoading(true);
      if (isHandedOff) {
        await deleteHandoffByPhoneNumber(chat.phone);
        setCurrentStatus("ai-handled"); 
        toast.info("Conversation kembali ke bot", {
          description: `${chat.name || chat.phone} akan ditangani AI lagi.`,
        });
      } else {
        await createHandoffByPhoneNumber(chat.phone);
        setCurrentStatus("needs-human"); 
        toast.success("Conversation di-assign", {
          description: `${chat.name || chat.phone} sekarang ditangani tim klinik.`,
        });
      }
    } catch (error) {
      console.error("Gagal mengubah status handoff", error);
      toast.error("Gagal mengubah handoff", {
        description: error.response?.data?.message || error.message || "Coba beberapa saat lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 px-4 pb-3 shadow-sm">
      <div
        className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity select-none "
        onClick={onToggleProfile}
        title={showProfilePanel ? "Hide profile" : "Show profile"}
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback className="text-xs">
            {chat?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "??"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm leading-tight">{chat?.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`w-2 h-2 rounded-full inline-block ${isTyping ? "bg-green-500 animate-pulse" : "bg-green-500"}`} />
            
            {isTyping ? (
              <span className="text-xs text-green-600 font-medium italic">mengetik...</span>
            ) : (
              <span className="text-xs text-muted-foreground">WhatsApp</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleToggleHandoff}
          disabled={loading}
          className={`h-8 gap-1.5 text-xs cursor-pointer ${isHandedOff ? "text-red-500 hover:text-red-600 hover:bg-red-50" : "text-muted-foreground hover:text-foreground"}`}
        >
          {isHandedOff ? (
            <>
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{loading ? "Loading..." : "Return to Bot"}</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{loading ? "Loading..." : "Assign to You"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
