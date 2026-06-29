import { useEffect, useMemo, useRef } from "react";
import { FileText, Image, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const maxFileSize = 2 * 1024 * 1024;

const acceptedFileTypes = [
  "image/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",");

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const imageExtensionPattern = /\.(avif|gif|jpe?g|png|webp)$/i;

const documentExtensionPattern = /\.(docx?|pdf)$/i;

const isAllowedFile = (file) => {
  return file.type.startsWith("image/") || allowedMimeTypes.includes(file.type);
};

const isImageAttachment = (attachment) => {
  return imageExtensionPattern.test(attachment?.filename || attachment?.url || "");
};

const isBrowserPreviewUrl = (url) => {
  return /^(https?:|blob:|data:)/i.test(url || "");
};

const getDisplayName = (attachment) => {
  if (attachment?.filename) return attachment.filename;
  if (!attachment?.url) return "Campaign attachment";

  return attachment.url.split("/").pop() || "Campaign attachment";
};

const formatFileSize = (size) => {
  if (!size) return "0 KB";

  const sizeInKb = size / 1024;

  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(1)} KB`;
  }

  return `${(sizeInKb / 1024).toFixed(1)} MB`;
};

export default function CampaignFileUpload({
  file,
  onFileChange,
  existingAttachment,
  readOnly = false,
}) {
  const inputRef = useRef(null);
  const hasExistingAttachment = Boolean(existingAttachment?.url);
  const isExistingImage = isImageAttachment(existingAttachment);
  const existingAttachmentName = getDisplayName(existingAttachment);
  const existingAttachmentUrl = existingAttachment?.url || "";
  const isImage = file?.type?.startsWith("image/");
  const previewUrl = useMemo(() => {
    if (!file || !isImage) return "";

    return URL.createObjectURL(file);
  }, [file, isImage]);
  const hasAttachment = Boolean(file) || hasExistingAttachment;
  const shouldShowImagePreview = Boolean(
    (isImage && previewUrl) ||
      (!file && isExistingImage && isBrowserPreviewUrl(existingAttachmentUrl)),
  );
  const imagePreviewUrl = file ? previewUrl : existingAttachmentUrl;
  const attachmentName = file ? file.name : existingAttachmentName;

  useEffect(() => {
    if (!previewUrl) return undefined;

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!isAllowedFile(selectedFile)) {
      toast.warning("Tipe file tidak didukung", {
        description: "Gunakan gambar, PDF, DOC, atau DOCX.",
      });
      event.target.value = "";
      return;
    }

    if (selectedFile.size > maxFileSize) {
      toast.warning("File terlalu besar", {
        description: "Maksimal ukuran attachment adalah 2 MB.",
      });
      event.target.value = "";
      return;
    }

    if (selectedFile) {
      onFileChange?.(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    if (!readOnly) {
      onFileChange?.(null);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs">Campaign Attachment</Label>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedFileTypes}
        className="hidden"
        onChange={handleFileChange}
      />

      {hasAttachment ? (
        <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white text-gray-500">
              {shouldShowImagePreview ? (
                <img
                  src={imagePreviewUrl}
                  alt={attachmentName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="max-w-full truncate text-sm font-medium text-gray-900">
                {attachmentName}
              </p>
              <p className="text-xs text-muted-foreground">
                {file
                  ? formatFileSize(file.size)
                  : existingAttachment?.url
                    ? "Existing attachment"
                    : "Attachment"}
              </p>
            </div>

            {!readOnly && file ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>

          {shouldShowImagePreview ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <img
                src={imagePreviewUrl}
                alt={`${attachmentName} preview`}
                className="max-h-40 w-full object-contain"
              />
            </div>
          ) : null}
        </div>
      ) : readOnly ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-muted-foreground">
          No attachment uploaded.
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={readOnly}
          className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-center transition hover:bg-gray-100"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Upload attachment
            </p>
            <p className="text-xs text-muted-foreground">
              Image, PDF, DOC, or DOCX up to 2 MB
            </p>
          </div>
        </button>
      )}

      {!hasAttachment ? null : shouldShowImagePreview ? (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Image className="h-3.5 w-3.5" />
          Image preview ready
        </div>
      ) : existingAttachment?.url && documentExtensionPattern.test(attachmentName) ? (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          Document attachment ready
        </div>
      ) : null}
    </div>
  );
}
