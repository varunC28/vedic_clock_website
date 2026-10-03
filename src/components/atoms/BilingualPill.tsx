import { cn } from "@/lib/utils";

interface BilingualPillProps {
  en: string;
  hi: string;
  size?: "sm" | "md";
  variant?: "dark" | "light" | "outline";
  className?: string;
}

export function BilingualPill({
  en,
  hi,
  size = "sm",
  variant = "dark",
  className,
}: BilingualPillProps) {
  // Define styles for each variant based on spec
  const variantClasses = {
    dark: "bg-brass/15 ring-brass/30 text-antique-gold",
    light: "bg-deep-bronze/10 ring-deep-bronze/20 text-deep-bronze",
    outline: "bg-transparent ring-brass/30 text-ivory",
  };

  // Define size-specific styles (md scales up on sm: breakpoint)
  const sizeClasses = {
    sm: "px-3 py-1",
    md: "px-3 py-1 sm:px-4 sm:py-1.5",
  };

  const enSizeClasses = size === "md" ? "text-[11px] sm:text-xs" : "text-[11px]";
  const hiSizeClasses = size === "md" ? "text-[12px] sm:text-sm" : "text-[12px]";

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full ring-1 ring-inset",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      <span
        className={cn(
          "font-sans font-medium uppercase tracking-widest",
          enSizeClasses
        )}
      >
        {en}
      </span>
      <span className="opacity-40 font-bold text-xs">·</span>
      <span className={cn("font-hindi font-normal", hiSizeClasses)}>
        {hi}
      </span>
    </div>
  );
}
