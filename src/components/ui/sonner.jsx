import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      closeButton={false}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#111827",
          "--normal-border": "var(--border)",
          "--success-bg": "#f0fdf4",
          "--success-text": "#166534",
          "--success-border": "#bbf7d0",
          "--error-bg": "#fef2f2",
          "--error-text": "var(--destructive)",
          "--error-border": "#fecaca",
          "--border-radius": "var(--radius)"
        }
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast bg-white text-slate-900 border border-gray-200 shadow-lg",
          success: "border-green-200 bg-green-50 text-green-800 [&_[data-icon]]:text-green-600",
          error: "border-red-200 bg-red-50 text-red-700 [&_[data-icon]]:text-red-600",
          warning: "border-amber-200 bg-white text-amber-700 [&_[data-icon]]:text-amber-500",
          info: "border-gray-200 bg-white text-slate-700 [&_[data-icon]]:text-slate-500",
        },
      }}
      {...props} />
  );
}

export { Toaster }
