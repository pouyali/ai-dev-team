import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  className?: string
  size?: number
}

export function Avatar({ src, alt, fallback, className, size = 40 }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)

  if (src && !imgError) {
    return (
      <div
        className={cn("relative overflow-hidden rounded-full bg-gray-200", className)}
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={alt || fallback || "avatar"}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gray-800 text-white font-medium select-none",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-label={alt || fallback || "avatar"}
    >
      {fallback || "?"}
    </div>
  )
}

// Backward-compatible exports matching original radix-ui style interface
export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentPropsWithoutRef<typeof Image> & { src?: string; alt?: string }
>(({ src, alt, className, ...props }, ref) => {
  if (!src) return null
  return (
    <Image
      ref={ref as React.Ref<HTMLImageElement>}
      src={src}
      alt={alt || ""}
      width={40}
      height={40}
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-800 text-white font-medium", className)}
    {...props}
  >
    {children}
  </span>
))
AvatarFallback.displayName = "AvatarFallback"
