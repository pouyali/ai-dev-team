import * as React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

interface AvatarImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const AvatarImage = ({ src, alt = "", className }: AvatarImageProps) => {
  const [error, setError] = React.useState(false);

  if (!src || error) {
    return null;
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      onError={() => setError(true)}
    />
  );
};
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-gray-800 text-white text-sm font-medium select-none",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
