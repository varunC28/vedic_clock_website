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
    md: "px-3.5 py-1.5 sm:px-4 sm:py-1.5",
  };

  const enSizeClasses = size === "md" ? "text-[10px] sm:text-xs" : "text-[10px] sm:text-[11px]";
  const hiSizeClasses = size === "md" ? "text-[11.5px] sm:text-sm" : "text-[11.5px] sm:text-[12px]";

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 max-w-full rounded-2xl sm:rounded-full ring-1 ring-inset leading-normal text-center",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      <span
        className={cn(
          "font-sans font-medium uppercase tracking-wider sm:tracking-widest text-center",
          enSizeClasses
        )}
      >
        {en}
      </span>
      <span className="opacity-40 font-bold text-xs shrink-0 hidden sm:inline select-none">·</span>
      <span className={cn("font-hindi font-normal text-center", hiSizeClasses)}>
        {hi}
      </span>
    </div>
  );
}
