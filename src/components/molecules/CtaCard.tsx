"use client";

import { cn } from "@/lib/utils";
import { BrassButton } from "@/components/atoms/BrassButton";

interface CtaCardProps {
  titleEn: string;
  titleHi: string;
  description: string;
  buttonTextEn: string;
  buttonTextHi?: string;
  buttonSize?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function CtaCard({
  titleEn,
  titleHi,
  description,
  buttonTextEn,
  buttonTextHi,
  buttonSize = "md",
  href = "/contact",
  className,
}: CtaCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full",
        "bg-void-navy border border-brass/20 rounded-2xl",
        "px-6 py-10 sm:px-10 sm:py-14",
        "flex flex-col items-center gap-8 text-center",
        className
      )}
    >
      {/* Background Accent (Faint glowing halo in top-right) */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-antique-gold/10 blur-3xl pointer-events-none" />

      {/* Text Column */}
      <div className="flex flex-col items-center flex-1 max-w-2xl z-10">
        <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-semibold leading-tight">
          {titleEn}
        </h2>
        <h3 className="font-hindi text-2xl sm:text-3xl text-antique-gold mt-2 leading-tight">
          {titleHi}
        </h3>
        <p className="font-sans text-sm sm:text-base text-ivory/60 leading-relaxed mt-4 max-w-xl">
          {description}
        </p>
      </div>

      {/* Button Column */}
      <div className="shrink-0 relative group z-10 flex justify-center">
        {/* The Heartbeat Glow Behind the Button */}
        <div className="absolute inset-0 -z-10 rounded-lg bg-antique-gold/50 blur-xl motion-safe:animate-heartbeat" />
        
        {/* The actual button */}
        <BrassButton
          en={buttonTextEn}
          hi={buttonTextHi}
          href={href}
          size={buttonSize}
          variant="primary"
          className="shadow-none" /* We remove its internal shadow because we are providing the heartbeat glow */
        />
      </div>
    </div>
  );
}
