import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, Loader2, X,  } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  createReplyHandoffByPhoneNumber,
  sendMediaMessage,
} from "@/services/unifiendBox.service";

export default function MessageInput({ chat, value, onChange }) {
  const [isSending, setIsSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (!selectedImage) return null;
    return URL.createObjectURL(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning("Format tidak didukung", {
        description: "Hanya file gambar (JPG, PNG, dll) yang diperbolehkan.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.warning("Ukuran file terlalu besar", {
        description: "Maksimal ukuran gambar adalah 5MB.",
      });
      return;
    }

    setSelectedImage(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSend = async () => {
    if ((!value?.trim() && !selectedImage) || !chat?.phone) return;

    try {
      setIsSending(true);

      if (selectedImage) {
        await sendMediaMessage({
          target: chat.phone,
          message: value.trim(),
          file: selectedImage,
        });
      } else {
        await createReplyHandoffByPhoneNumber(chat.phone, {
          message: value.trim(),
        });
      }

      onChange("");
      setSelectedImage(null);

      toast.success("Pesan terkirim", {
        description: `Balasan ke ${chat.name || chat.phone} sudah dikirim.`,
      });
    } catch (error) {
      console.error("Gagal mengirim pesan", error);
      toast.error("Gagal mengirim pesan", {
        description:
          error.response?.data?.message ||
          error.message ||
          "Coba beberapa saat lagi.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-3 border-t border-gray-400 flex flex-col gap-2">
      {/* Image Preview Box */}
      {previewUrl && (
        <div className="relative self-start inline-block rounded-lg border border-gray-200 bg-gray-50 p-1 shadow-sm">
          <Button
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-5 w-5 rounded-full shadow-md z-10"
            onClick={removeImage}
            disabled={isSending}
          >
            <X className="h-3 w-3" />
          </Button>
          <div className="flex items-center justify-center overflow-hidden rounded-md bg-white">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-16 w-16 object-cover"
            />
          </div>
        </div>
      )}

      <div className="flex items-end gap-2 border border-gray-400 rounded-xl px-3 py-1 bg-background focus-within:ring-1 focus-within:ring-ring transition">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="flex gap-1 mb-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSending}
          >
            <Paperclip className="w-4 h-4" />
          </Button>
        </div>

        <Input
          placeholder={
            selectedImage
              ? "Tambahkan keterangan (opsional)..."
              : "Type a message or press '/' for templates..."
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
          className="flex-1 border-0 shadow-none resize-none focus-visible:ring-0 p-0 text-sm min-h-0 max-h-32 bg-transparent"
        />

        <Button
          size="icon"
          className="h-8 w-8 rounded-lg bg-green-600 hover:bg-green-700 text-white mb-0.5 items-center justify-center flex"
          disabled={(!value.trim() && !selectedImage) || isSending}
          onClick={handleSend}
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
