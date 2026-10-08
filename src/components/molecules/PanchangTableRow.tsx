import { cn } from "@/lib/utils";

export interface PanchangTableRowProps {
  index: number | string;
  nameHi: string;
  nameEn: string;
  nature?: "shubha" | "ashubha" | "highly_auspicious" | "auspicious" | "inauspicious" | "conditional" | string;
  natureLabelHi?: string;
  natureLabelEn?: string;
  detail?: string;
  detailHi?: string;
  deity?: string;
  secondary?: string;
  secondaryHi?: string;
  avoid?: string;
  avoidHi?: string;
  badge?: string;
  isHighlighted?: boolean;
  variant?: "dark" | "parchment" | "document";
  onClick?: () => void;
  nameClassName?: string;
  className?: string;
}

export function PanchangTableRow({
  index,
  nameHi,
  nameEn,
  nature,
  natureLabelHi,
  natureLabelEn,
  detail,
  detailHi,
  deity,
  secondary,
  secondaryHi,
  avoid,
  avoidHi,
  badge,
  isHighlighted = false,
  variant = "dark",
  onClick,
  nameClassName,
  className,
}: PanchangTableRowProps) {
  // Document variant matching book document style (Zebra tables)
  if (variant === "document") {
    const isMultiColumn = Boolean(avoid || avoidHi || nature || natureLabelHi || natureLabelEn);

    // 2-Column Document Table (e.g. 12 Rashis: राशि · Sign | भाव · Signifies)
    if (!isMultiColumn) {
      return (
        <div
          onClick={onClick}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          className={cn(
            "w-full flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-6 py-3 transition-colors duration-150 border-b border-[#DFCBB5]/40",
            onClick && "cursor-pointer hover:bg-[#EBD6BE]/50",
            isHighlighted && "bg-[#EBD6BE]/70",
            className
          )}
        >
          {/* Column 1: Sign (Disc + Bilingual Name) */}
          <div className="w-1/2 sm:w-2/5 shrink-0 flex items-center gap-2.5 sm:gap-3.5">
            {index !== undefined && (
              <div
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center font-sans text-[11px] sm:text-xs font-bold transition-all",
                  isHighlighted
                    ? "bg-[#B8873D] text-[#FFF9F0] shadow-sm scale-105"
                    : "bg-[#EADCCB] text-[#5C4230]"
                )}
              >
                {index}
              </div>
            )}
            <div className="flex flex-col text-left min-w-0">
              <span className="font-hindi font-bold text-xs sm:text-[14px] text-[#2D1B0E] leading-tight">
                {nameHi}
              </span>
              <span className="font-sans text-[11px] sm:text-xs text-[#5C4230] mt-0.5">
                {nameEn}
              </span>
            </div>
          </div>

          {/* Column 2: Signifies (Bilingual Text) */}
          <div className="flex-1 flex flex-col text-left">
            <span className="font-hindi font-bold text-xs sm:text-[14px] text-[#2D1B0E] leading-tight">
              {detailHi}
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-[#5C4230] mt-0.5">
              {detail}
            </span>
          </div>
        </div>
      );
    }

    // 5-Column Document Table (e.g. 30 Muhurtas)
    return (
      <div
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        className={cn(
          "w-full transition-colors duration-150 border-b border-[#DFCBB5]/40",
          onClick && "cursor-pointer hover:bg-[#EBD6BE]/50",
          isHighlighted && "bg-[#EBD6BE]/70",
          className
        )}
      >
        {/* Mobile View (< md): Clean, Fully Responsive Bilingual Card */}
        <div className="md:hidden p-3 sm:p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* 1. # Disc */}
              <div
                className={cn(
                  "w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-sans text-[11px] font-bold transition-all",
                  isHighlighted
                    ? "bg-[#B8873D] text-[#FFF9F0] shadow-sm scale-105"
                    : "bg-[#EADCCB] text-[#5C4230]"
                )}
              >
                {index}
              </div>
              {/* 2. Muhurta Name */}
              <div className="flex flex-col min-w-0">
                <span className="font-hindi font-bold text-sm text-[#2D1B0E] leading-tight truncate">
                  {nameHi}
                </span>
                <span className="font-sans text-[11px] text-[#5C4230] truncate">
                  {nameEn}
                </span>
              </div>
            </div>

            {/* 3. Nature */}
            <div className="shrink-0 text-right">
              <span className="font-hindi font-semibold text-xs text-[#2D1B0E] block leading-tight">
                {natureLabelHi || nature}
              </span>
              <span className="font-sans text-[10.5px] text-[#5C4230] block">
                {natureLabelEn || nature}
              </span>
            </div>
          </div>

          {/* 4. Do & 5. Avoid Grid */}
          {(detailHi || detail || avoidHi || avoid) && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#DFCBB5]/40">
              <div className="bg-[#FAF5EC]/90 rounded-xl p-2.5 border border-[#DFCBB5]/50 flex flex-col">
                <span className="font-sans font-bold text-[10.5px] text-[#256029] uppercase tracking-wider flex items-center gap-1">
                  <span>✓</span> करें · Do
                </span>
                {detailHi && (
                  <p className="font-hindi font-medium text-xs text-[#2D1B0E] mt-1 leading-snug">
                    {detailHi}
                  </p>
                )}
                {detail && (
                  <p className="font-sans text-[10.5px] text-[#5C4230] mt-0.5 leading-tight">
                    {detail}
                  </p>
                )}
              </div>

              <div className="bg-[#FAF5EC]/90 rounded-xl p-2.5 border border-[#DFCBB5]/50 flex flex-col">
                <span className="font-sans font-bold text-[10.5px] text-[#A63620] uppercase tracking-wider flex items-center gap-1">
                  <span>✕</span> न करें · Avoid
                </span>
                {avoidHi && (
                  <p className="font-hindi font-medium text-xs text-[#2D1B0E] mt-1 leading-snug">
                    {avoidHi}
                  </p>
                )}
                {avoid && (
                  <p className="font-sans text-[10.5px] text-[#5C4230] mt-0.5 leading-tight">
                    {avoid}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop / Tablet View (md and above): Exact 5-Column Table matching book scan */}
        <div className="hidden md:flex items-center gap-4 px-6 py-3">
          {/* 1. # */}
          <div className="w-12 shrink-0 flex items-center justify-center">
            <div
              className={cn(
                "w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all duration-200",
                isHighlighted
                  ? "bg-[#B8873D] text-[#FFF9F0] shadow-sm scale-105"
                  : "bg-[#EADCCB] text-[#5C4230]"
              )}
            >
              {index}
            </div>
          </div>

          {/* 2. मुहूर्त · Muhurta */}
          <div className="w-36 shrink-0 flex flex-col text-left">
            <span className="font-hindi font-bold text-[14px] text-[#2D1B0E] leading-tight">
              {nameHi}
            </span>
            <span className="font-sans text-xs text-[#5C4230] mt-0.5">
              {nameEn}
            </span>
          </div>

          {/* 3. प्रकृति · Nature */}
          <div className="w-44 shrink-0 flex flex-col text-left">
            <span className="font-hindi font-bold text-[14px] text-[#2D1B0E] leading-tight">
              {natureLabelHi || nature}
            </span>
            <span className="font-sans text-xs text-[#5C4230] mt-0.5">
              {natureLabelEn || nature}
            </span>
          </div>

          {/* 4. करें · Do */}
          <div className="flex-1 min-w-[130px] flex flex-col text-left">
            <span className="font-hindi font-bold text-[14px] text-[#2D1B0E] leading-tight">
              {detailHi}
            </span>
            <span className="font-sans text-xs text-[#5C4230] mt-0.5">
              {detail}
            </span>
          </div>

          {/* 5. न करें · Avoid */}
          <div className="flex-1 min-w-[130px] flex flex-col text-left">
            <span className="font-hindi font-bold text-[14px] text-[#2D1B0E] leading-tight">
              {avoidHi}
            </span>
            <span className="font-sans text-xs text-[#5C4230] mt-0.5">
              {avoid}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const isParchment = variant === "parchment";

  // Nature normalization
  const isAuspicious = nature === "shubha" || nature === "auspicious";
  const isHighlyAuspicious = nature === "highly_auspicious";
  const isInauspicious = nature === "ashubha" || nature === "inauspicious";
  const isConditional = nature === "conditional";

  const natureText =
    natureLabelHi && natureLabelEn
      ? `${natureLabelHi} · ${natureLabelEn}`
      : natureLabelEn || natureLabelHi || nature;

  // Check if detail starts with '=' for calculation alignment
  const isEquation = typeof detail === "string" && detail.trim().startsWith("=");

  const hasNatureOrBadge = Boolean(nature || badge);
  const hasDeityOrSecondary = Boolean(deity || secondary || secondaryHi);

  // Strict CSS Grid tracks ensuring identical column widths across all rows
  let gridColsClass = "grid-cols-[36px_1fr_auto] sm:grid-cols-[44px_180px_1fr]"; // 3 cols (Units)
  if (hasNatureOrBadge && hasDeityOrSecondary) {
    // 5 cols (Muhurtas) - fixed width tracks on desktop
    gridColsClass = "grid-cols-[36px_1fr_auto] sm:grid-cols-[44px_130px_160px_120px_1fr]";
  } else if (hasNatureOrBadge || hasDeityOrSecondary) {
    // 4 cols (Vara, Karana, Table of Contents)
    gridColsClass = "grid-cols-[36px_1fr_auto] sm:grid-cols-[44px_180px_160px_1fr]";
  }

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "group relative grid items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-3.5 transition-all duration-200 select-none",
        gridColsClass,
        isParchment
          ? isHighlighted
            ? "border-2 border-[#9E672B] border-l-[4px] border-l-[#7E4A19] bg-[#EBD6BE] rounded-2xl shadow-[0_4px_16px_rgba(110,65,25,0.12)] my-1"
            : "border-b border-[#DFCBB5]/50 hover:bg-[#F3E6D3]/40 last:border-b-0"
          : isHighlighted
          ? "border-2 border-[#E5A84B] border-l-[4px] border-l-[#F59E0B] bg-[#181512] rounded-2xl shadow-[0_0_16px_rgba(229,168,75,0.25)] my-1"
          : "border-b border-white/[0.05] hover:bg-white/[0.02] last:border-b-0",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* 1. Index Disc (Track 1) */}
      <div className="flex items-center justify-start shrink-0">
        <div
          className={cn(
            "w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center font-sans text-[11px] sm:text-xs font-bold transition-all duration-200",
            isParchment
              ? isHighlighted
                ? "bg-[#B8873D] text-[#FFF9F0] shadow-sm scale-105"
                : "bg-[#EADCCB] text-[#5C4230]"
              : isHighlighted
              ? "bg-[#E5A84B] text-[#120F0B] shadow-[0_0_12px_rgba(229,168,75,0.4)] scale-105"
              : "bg-white/[0.08] text-white/70"
          )}
        >
          {index}
        </div>
      </div>

      {/* 2. Bilingual Name (Track 2) */}
      <div className={cn("min-w-0 flex flex-col justify-center text-left", nameClassName)}>
        <span
          className={cn(
            "font-hindi text-sm sm:text-base font-bold leading-tight transition-colors duration-200 truncate",
            isParchment
              ? "text-[#3D2314]"
              : isHighlighted
              ? "text-[#FCD34D]"
              : "text-[#E5A84B]"
          )}
        >
          {nameHi}
        </span>
        <span
          className={cn(
            "font-sans text-[11px] sm:text-xs tracking-wide transition-colors duration-200 mt-0.5 truncate",
            isParchment ? "text-[#70523C] font-medium" : "text-ivory/55"
          )}
        >
          {nameEn}
        </span>
      </div>

      {/* 3. Badge / Nature Pill (Track 3: strictly fixed width, wraps text so height can differ) */}
      {hasNatureOrBadge && (
        <div className="min-w-0 flex items-center justify-start">
          {badge && (
            <span
              className={cn(
                "inline-block px-2.5 py-1 rounded-full text-[10.5px] font-medium border text-center break-words leading-tight max-w-full",
                isParchment
                  ? "bg-[#EEDEC8] border-[#D9C4AB] text-[#3D2314]"
                  : "bg-brass/15 border-brass/30 text-antique-gold"
              )}
            >
              {badge}
            </span>
          )}

          {nature && (
            <span
              className={cn(
                "inline-flex items-center justify-center px-2 sm:px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-sans font-medium tracking-wide border text-center leading-tight break-words max-w-full",
                isParchment
                  ? isHighlyAuspicious
                    ? "bg-[#FFF4D6] border-[#E8C265] text-[#8C5D00]"
                    : isAuspicious
                    ? "bg-[#EAF5E9] border-[#A9D8A6] text-[#256029]"
                    : isConditional
                    ? "bg-[#FAF0E4] border-[#DFCBB5] text-[#7A4F23]"
                    : "bg-[#FDECE8] border-[#F2B9AC] text-[#A63620]"
                  : isHighlyAuspicious
                  ? "bg-[#2D2210] border-[#78350F] text-[#FBBF24]"
                  : isAuspicious
                  ? "bg-[#0E281C] border-[#144A32] text-[#4ADE80]"
                  : isConditional
                  ? "bg-[#221B13] border-[#5E4720] text-[#E5A84B]"
                  : "bg-[#2E1216] border-[#581A22] text-[#EF4444]"
              )}
            >
              {natureText}
            </span>
          )}
        </div>
      )}

      {/* 4. Deity / Planet / Secondary Column (Track 4: strictly locked at same column) */}
      {hasDeityOrSecondary && (
        <div className="min-w-0 flex flex-col justify-center text-left">
          {(deity || secondaryHi) && (
            <span
              className={cn(
                "text-xs sm:text-sm font-medium leading-snug truncate",
                isParchment ? "text-[#2D1B0E]" : "text-white/90"
              )}
            >
              {deity || secondaryHi}
            </span>
          )}
          {secondary && (
            <span
              className={cn(
                "font-sans text-[10.5px] sm:text-[11px] leading-snug mt-0.5 truncate",
                isParchment ? "text-[#70523C]" : "text-ivory/50"
              )}
            >
              {secondary}
            </span>
          )}
        </div>
      )}

      {/* 5. Detail / Equation / Influence (Track 5: flex remainder - height can differ) */}
      {(detail || detailHi) && (
        <div
          className={cn(
            "col-span-full sm:col-auto min-w-0 flex flex-col justify-center text-left pt-1 sm:pt-0",
            isParchment
              ? isHighlighted
                ? "text-[#2D1B0E]"
                : "text-[#3D2314]"
              : isHighlighted
              ? "text-ivory/95"
              : "text-ivory/70"
          )}
        >
          {detailHi && (
            <span className="font-hindi text-xs sm:text-sm font-medium leading-tight">
              {detailHi}
            </span>
          )}
          {detail && (
            <span
              className={cn(
                "text-xs sm:text-sm leading-relaxed",
                isEquation
                  ? isParchment
                    ? "font-sans font-medium text-[#482D1C]"
                    : "font-sans font-medium text-ivory/85"
                  : isParchment
                  ? "font-sans text-[#5C4230]"
                  : "font-sans text-ivory/60"
              )}
            >
              {detail}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
