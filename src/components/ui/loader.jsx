import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

function Loader({ className, size = "default", text, ...props }) {
  const sizeClasses = {
    xs: "w-3.5 h-3.5",
    sm: "w-5 h-5",
    default: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-14 h-14",
  }

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      {...props}
    >
      <div className="relative">
        <Loader2
          className={cn(
            "animate-spin",
            sizeClasses[size],
          )}
          style={{ color: "#3E5F47" }}
        />
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: "#3E5F47" }}
        />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  )
}

function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader size="xl" text={text} />
    </div>
  )
}

export { Loader, PageLoader }
