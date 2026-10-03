import { cn } from "@/lib/utils";

interface InstitutionCardProps {
  icon: React.ReactNode;
  titleEn: string;
  titleHi: string;
  tagline: string;
  bullets?: string[];
  variant?: "dark" | "light";
  className?: string;
}

export function InstitutionCard({
  icon,
  titleEn,
  titleHi,
  tagline,
  bullets = [],
  variant = "dark",
  className,
}: InstitutionCardProps) {
  // Theme variants for readability and aesthetics
  const isDark = variant === "dark";

  const containerClasses = isDark
    ? "bg-void-navy/60 border border-brass/20 shadow-[inset_0_1px_0_rgba(184,135,61,0.15)] hover:border-brass/40"
    : "bg-white/40 border border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] hover:border-brass/40 backdrop-blur-sm";

  const iconColor = isDark ? "text-antique-gold" : "text-brass";
  const titleColorEn = isDark ? "text-ivory" : "text-deep-bronze";
  const titleColorHi = isDark ? "text-antique-gold" : "text-brass";
  const taglineColor = isDark ? "text-ivory/70" : "text-deep-bronze/80";
  const dividerColor = isDark ? "bg-brass/30" : "bg-brass/40";
  const bulletMarkerColor = isDark ? "bg-antique-gold/60" : "bg-brass/60";
  const bulletTextColor = isDark ? "text-ivory/60" : "text-deep-bronze/70";

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center px-6 py-8 max-w-[280px] w-full rounded-xl motion-safe:transition-all motion-safe:duration-300",
        containerClasses,
        className
      )}
    >
      {/* 1. Icon */}
      <div className={cn("w-12 h-12 sm:w-14 sm:h-14 mb-4 flex items-center justify-center drop-shadow-sm", iconColor)}>
        <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5] [&>svg]:stroke-currentColor [&>svg]:fill-none">
          {icon}
        </div>
      </div>

      {/* 2. Titles */}
      <h4 className={cn("font-serif text-lg font-semibold leading-tight", titleColorEn)}>
        {titleEn}
      </h4>
      <h5 className={cn("font-hindi text-base mt-1", titleColorHi)}>
        {titleHi}
      </h5>

      {/* 3. Tagline */}
      <p className={cn("font-sans text-sm mt-3 leading-relaxed", taglineColor)}>
        {tagline}
      </p>

      {/* 4. Divider (only show if there are bullets) */}
      {bullets.length > 0 && (
        <>
          <div className={cn("w-12 h-px my-5 mx-auto", dividerColor)} />

          {/* 5. Bullets */}
          <ul className="text-left w-full space-y-2.5">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className={cn("w-1.5 h-1.5 rounded-full shrink-0 mt-1.5", bulletMarkerColor)} />
                <span className={cn("font-sans text-[11px] sm:text-xs leading-relaxed", bulletTextColor)}>
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
