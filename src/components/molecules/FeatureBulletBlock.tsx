import { cn } from "@/lib/utils";

export interface BulletItem {
  label: string;
  description: string;
}

interface FeatureBulletBlockProps {
  titleEn: string;
  titleHi?: string;
  bullets: BulletItem[];
  variant?: "dark" | "light";
  className?: string;
}

export function FeatureBulletBlock({
  titleEn,
  titleHi,
  bullets,
  variant = "dark",
  className,
}: FeatureBulletBlockProps) {
  const isDark = variant === "dark";

  const titleColorEn = isDark ? "text-ivory" : "text-deep-bronze";
  const titleColorHi = isDark ? "text-antique-gold" : "text-brass";
  const markerColor = isDark ? "bg-antique-gold/70" : "bg-brass/70";
  
  const labelColor = isDark ? "text-ivory" : "text-deep-bronze";
  const dashColor = isDark ? "text-ivory/40" : "text-deep-bronze/40";
  const descColor = isDark ? "text-ivory/60" : "text-deep-bronze/70";

  return (
    <div className={cn("flex flex-col max-w-lg w-full", className)}>
      {/* Title Block */}
      <div>
        <h3 className={cn("font-serif text-xl sm:text-2xl font-semibold leading-tight", titleColorEn)}>
          {titleEn}
        </h3>
        {titleHi && (
          <h4 className={cn("font-hindi text-lg sm:text-xl mt-1 leading-tight", titleColorHi)}>
            {titleHi}
          </h4>
        )}
      </div>

      {/* Bullet List */}
      <div className="mt-6 space-y-5">
        {bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-3">
            {/* Diamond Marker */}
            <div className={cn("w-2 h-2 shrink-0 mt-1.5 rotate-45", markerColor)} />
            
            {/* Text Block */}
            <p className="font-sans text-sm leading-relaxed">
              <span className={cn("font-semibold", labelColor)}>{bullet.label}</span>
              <span className={cn("mx-1.5", dashColor)}>—</span>
              <span className={descColor}>{bullet.description}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
