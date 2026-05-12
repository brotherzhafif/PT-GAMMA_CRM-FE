import { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";

export default function UploadLogo() {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="flex items-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-[120px] h-[120px] rounded-2xl border border-dashed border-gray-500 bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center gap-2 overflow-hidden shadow-sm cursor-pointer"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <CloudUpload className="w-7 h-7 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">
              LOGO
            </span>
          </>
        )}
      </button>
    </div>
  );
}