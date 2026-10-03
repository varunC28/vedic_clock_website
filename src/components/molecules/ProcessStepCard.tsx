import { cn } from "@/lib/utils";

interface ProcessStepCardProps {
  step: number;
  icon: React.ReactNode;
  titleEn: string;
  titleHi: string;
  description: string;
  variant?: "dark" | "light";
  className?: string;
}

export function ProcessStepCard({
  step,
  icon,
  titleEn,
  titleHi,
  description,
  variant = "dark",
  className,
}: ProcessStepCardProps) {
  // Theme variants for readability
  const titleColor = variant === "dark" ? "text-ivory" : "text-deep-bronze";
  const descColor = variant === "dark" ? "text-ivory/70" : "text-deep-bronze/70";

  return (
    <div className={cn("flex flex-col items-center text-center px-4 py-6 max-w-[280px]", className)}>
      {/* 1. Step Number */}
      <div className="w-8 h-8 border-2 border-brass/50 rounded-full flex items-center justify-center">
        <span className="font-sans text-sm text-antique-gold font-bold leading-none">
          {step}
        </span>
      </div>

      {/* 2. Icon Container */}
      <div className="w-16 h-16 mt-4 text-antique-gold flex items-center justify-center drop-shadow-md">
        <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5]">
          {icon}
        </div>
      </div>

      {/* 3. Titles */}
      <h4 className={cn("font-serif text-lg font-semibold mt-4 leading-tight", titleColor)}>
        {titleEn}
      </h4>
      <h5 className="font-hindi text-base text-antique-gold mt-1">
        {titleHi}
      </h5>

      {/* 4. Description */}
      <p className={cn("font-sans text-sm mt-3 leading-relaxed", descColor)}>
        {description}
      </p>
    </div>
  );
}
