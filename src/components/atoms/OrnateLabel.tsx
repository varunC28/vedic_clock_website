"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface OrnateLabelProps {
  primary: string;
  secondary?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function OrnateLabel({
  primary,
  secondary,
  size = "md",
  className,
}: OrnateLabelProps) {
  const sizeConfig = {
    sm: {
      container: "w-[160px] h-[90px]",
      primary: "text-sm font-hindi",
      secondary: "text-[10px] font-sans mt-0.5",
    },
    md: {
      container: "w-[220px] h-[125px]",
      primary: "text-base font-hindi",
      secondary: "text-xs font-sans mt-0.5",
    },
    lg: {
      container: "w-[300px] h-[170px]",
      primary: "text-lg font-hindi",
      secondary: "text-sm font-sans mt-1",
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center shrink-0",
        config.container,
        className
      )}
    >
      {/* Background Plaque Image */}
      <div className="absolute inset-0 opacity-90 pointer-events-none">
        <Image
          src="/assets/images/corner_assest.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 300px, 300px"
          style={{ objectFit: "fill" }}
        />
      </div>

      {/* Text Content */}
      {/* px-8 keeps text from overflowing onto the ornate scrollwork at the ends */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-8">
        <span
          className={cn(
            "text-antique-gold font-bold text-center leading-tight whitespace-nowrap w-full overflow-hidden text-ellipsis drop-shadow-md",
            config.primary
          )}
        >
          {primary}
        </span>
        {secondary && (
          <span
            className={cn(
              "text-brass/80 uppercase tracking-wider text-center leading-tight whitespace-nowrap w-full overflow-hidden text-ellipsis",
              config.secondary
            )}
          >
            {secondary}
          </span>
        )}
      </div>
    </div>
  );
}
