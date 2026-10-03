import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  en: string;
  hi: string;
  variant?: "dark" | "light";
  className?: string;
}

export function SectionEyebrow({
  en,
  hi,
  variant = "dark",
  className,
}: SectionEyebrowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        variant === "dark" ? "text-brass" : "text-deep-bronze",
        className
      )}
    >
      <span className="font-sans uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold">
        {en}
      </span>
      <span className="opacity-40 text-[10px] sm:text-xs">/</span>
      <span className="font-hindi text-sm sm:text-base font-medium">
        {hi}
      </span>
    </div>
  );
}
