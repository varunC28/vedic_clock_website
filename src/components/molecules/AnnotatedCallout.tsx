import { cn } from "@/lib/utils";

interface AnnotatedCalloutProps {
  number: number;
  titleEn: string;
  titleHi?: string;
  description: string;
  year?: string;
  layout?: "inline" | "timeline";
  variant?: "dark" | "light";
  className?: string;
}

export function AnnotatedCallout({
  number,
  titleEn,
  titleHi,
  description,
  year,
  layout = "inline",
  variant = "dark",
  className,
}: AnnotatedCalloutProps) {
  const titleColor = variant === "dark" ? "text-ivory" : "text-deep-bronze";
  const descColor = variant === "dark" ? "text-ivory/60" : "text-deep-bronze/70";
  const hindiColor = variant === "dark" ? "text-antique-gold/80" : "text-antique-gold";

  if (layout === "timeline") {
    return (
      <div className={cn("flex gap-4 sm:gap-5", className)}>
        {/* Left Column: Spine */}
        <div className="flex flex-col items-center">
          <div className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center bg-antique-gold text-void-navy font-sans text-xs font-bold shadow-md">
            {number}
          </div>
          <div className="w-px flex-1 bg-brass/30 my-2 min-h-[40px]" />
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col pt-0.5 pb-8">
          {year && (
            <span className="font-sans text-[10px] text-antique-gold uppercase tracking-widest">
              {year}
            </span>
          )}
          <h4
            className={cn(
              "font-serif text-base sm:text-lg font-semibold leading-tight",
              year ? "mt-1" : "mt-0",
              titleColor
            )}
          >
            {titleEn}
          </h4>
          {titleHi && (
            <span className={cn("font-hindi text-sm mt-0.5", hindiColor)}>
              {titleHi}
            </span>
          )}
          <p
            className={cn(
              "font-sans text-xs sm:text-sm leading-relaxed mt-2 max-w-[320px]",
              descColor
            )}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }

  // layout === "inline"
  return (
    <div className={cn("flex items-start gap-2 sm:gap-3", className)}>
      {/* Circle & Leader Line */}
      <div className="flex items-center gap-2 sm:gap-3 mt-1">
        <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full flex items-center justify-center bg-antique-gold text-void-navy font-sans text-[10px] sm:text-xs font-bold shadow-sm">
          {number}
        </div>
        <div className="w-4 sm:w-8 h-px bg-antique-gold/50" />
      </div>

      {/* Text Block */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <span className={cn("font-sans text-sm font-semibold", titleColor)}>
            {titleEn}
          </span>
          {titleHi && (
            <>
              <span className="text-brass/40 text-xs font-bold">·</span>
              <span className={cn("font-hindi text-sm", hindiColor)}>
                {titleHi}
              </span>
            </>
          )}
        </div>
        <p className={cn("font-sans text-xs leading-relaxed mt-1 max-w-[260px]", descColor)}>
          {description}
        </p>
      </div>
    </div>
  );
}
