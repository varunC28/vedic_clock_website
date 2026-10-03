import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: string;
  attributionEn: string;
  attributionHi?: string;
  role?: string;
  variant?: "dark" | "light";
  className?: string;
}

export function QuoteCard({
  quote,
  attributionEn,
  attributionHi,
  role,
  variant = "dark",
  className,
}: QuoteCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "relative flex flex-col px-6 sm:px-8 py-8 sm:py-10 max-w-[520px] w-full",
        isDark && "bg-void-navy/40 backdrop-blur-sm rounded-xl",
        className
      )}
    >
      {/* Opening Quote (Decorative) */}
      <div className="font-serif text-5xl sm:text-6xl text-antique-gold/30 leading-none select-none mb-2">
        {"\u201C"}
      </div>

      {/* Quote Text */}
      <p
        className={cn(
          "font-serif text-base sm:text-lg italic leading-relaxed md:leading-loose text-left",
          isDark ? "text-ivory" : "text-deep-bronze"
        )}
      >
        {quote}
      </p>

      {/* Attribution Line */}
      <div className="mt-6 sm:mt-8 flex flex-col items-end text-right">
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className="text-antique-gold/60 select-none">—</span>
          <span className="font-sans text-sm text-antique-gold font-medium">
            {attributionEn}
          </span>
          {attributionHi && (
            <span className="font-hindi text-sm text-antique-gold/70">
              {attributionHi}
            </span>
          )}
        </div>
        
        {role && (
          <span
            className={cn(
              "font-sans text-[10px] uppercase tracking-widest mt-1.5",
              isDark ? "text-ivory/50" : "text-deep-bronze/50"
            )}
          >
            {role}
          </span>
        )}
      </div>
    </div>
  );
}
