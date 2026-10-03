import { cn } from "@/lib/utils";

interface PanchangTableRowProps {
  index: number | string;
  nameHi: string;
  nameEn: string;
  nature?: "shubha" | "ashubha";
  detail: string;
  deity?: string;
  isHighlighted?: boolean;
  className?: string;
}

export function PanchangTableRow({
  index,
  nameHi,
  nameEn,
  nature,
  detail,
  deity,
  isHighlighted = false,
  className,
}: PanchangTableRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 border-b border-white/5 rounded-md motion-safe:transition-all motion-safe:duration-300",
        isHighlighted
          ? "bg-brass/10 border-l-2 border-l-antique-gold"
          : "border-l-2 border-l-transparent bg-transparent",
        className
      )}
    >
      {/* 1. Index Circle */}
      <div
        className={cn(
          "w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center font-sans text-[10px] sm:text-xs font-bold transition-colors duration-300",
          isHighlighted
            ? "bg-antique-gold text-void-navy"
            : "bg-brass/10 text-antique-gold/80"
        )}
      >
        {index}
      </div>

      {/* 2. Bilingual Name */}
      <div className="flex flex-col min-w-[70px] sm:min-w-[100px]">
        <span
          className={cn(
            "font-hindi text-sm font-medium leading-tight transition-colors duration-300",
            isHighlighted ? "text-antique-gold" : "text-antique-gold/80"
          )}
        >
          {nameHi}
        </span>
        <span
          className={cn(
            "font-sans text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors duration-300 mt-0.5",
            isHighlighted ? "text-ivory/80" : "text-ivory/50"
          )}
        >
          {nameEn}
        </span>
      </div>

      {/* 3. Nature Badge (Optional) */}
      {nature && (
        <div className="shrink-0 w-14 sm:w-20">
          <span
            className={cn(
              "text-[9px] sm:text-[10px] font-sans uppercase tracking-widest",
              nature === "shubha" ? "text-shubha" : "text-ashubha"
            )}
          >
            {nature}
          </span>
        </div>
      )}

      {/* 4. Deity (Optional - Hidden on mobile) */}
      {deity && (
        <div className="font-sans text-xs text-ivory/50 hidden sm:block min-w-[80px]">
          {deity}
        </div>
      )}

      {/* 5. Detail Text */}
      <div
        className={cn(
          "flex-1 font-sans text-[11px] sm:text-xs leading-relaxed transition-colors duration-300 text-right sm:text-left",
          isHighlighted ? "text-ivory/90" : "text-ivory/60"
        )}
      >
        {detail}
      </div>
    </div>
  );
}
