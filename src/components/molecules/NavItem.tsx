"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  en: string;
  hi?: string;
  variant?: "dark" | "light";
  forceActive?: boolean; // For sandbox demo purposes
  className?: string;
  download?: boolean | string;
}

export function NavItem({
  href,
  en,
  hi,
  variant = "dark",
  forceActive,
  className,
  download,
}: NavItemProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Check if active. Exact match for '/', startsWith for others.
  // forceActive overrides this for sandbox demonstration.
  const isActive =
    forceActive !== undefined
      ? forceActive
      : href === "/"
      ? pathname === href
      : pathname?.startsWith(href);

  const showUnderline = isActive || isHovered;

  // Colors based on variant (Dark for cosmic sections, Light for parchment)
  const textColor =
    variant === "dark"
      ? isActive || isHovered
        ? "text-ivory"
        : "text-ivory/80"
      : isActive || isHovered
      ? "text-deep-bronze" // Matching the YOGA pill
      : "text-deep-bronze/70";

  // Hindi text visibility improved by matching pill colors
  const hiColor = 
    variant === "dark" 
      ? "text-antique-gold/80" 
      : "text-deep-bronze/80";

  const isDownload = Boolean(download) || href.endsWith(".pdf");

  const linkContent = (
    <>
      <div className="relative pb-1">
        <span
          className={cn(
            "font-sans text-sm uppercase tracking-wider transition-colors duration-400 ease-[cubic-bezier(0.45,0,0.15,1)]",
            textColor
          )}
        >
          {en}
        </span>
        {/* Draw Underline */}
        <span
          className="absolute bottom-0 left-0 h-px bg-antique-gold motion-safe:transition-[width] motion-safe:duration-[400ms] motion-safe:ease-[cubic-bezier(0.45,0,0.15,1)]"
          style={{ width: showUnderline ? "100%" : "0%" }}
        />
      </div>
      
      {/* Optional Hindi Subtitle */}
      {hi && (
        <span className={cn("font-hindi text-xs", hiColor)}>
          {hi}
        </span>
      )}
    </>
  );

  if (isDownload) {
    return (
      <a
        href={href}
        download={typeof download === "string" ? download : true}
        className={cn("group flex flex-col items-center gap-1 cursor-pointer", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn("group flex flex-col items-center gap-1", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {linkContent}
    </Link>
  );
}
