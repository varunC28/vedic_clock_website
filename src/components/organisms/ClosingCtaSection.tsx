"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CtaCard } from "@/components/molecules/CtaCard";

interface ClosingCtaSectionProps {
  variant?: "dark" | "parchment";
  className?: string;
}

export function ClosingCtaSection({ variant = "dark", className }: ClosingCtaSectionProps) {
  const isParchment = variant === "parchment";

  return (
    <section
      id="closing-cta"
      className={cn(
        "relative w-full flex flex-col items-center justify-center transition-colors duration-500",
        "py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 select-none overflow-hidden",
        isParchment ? "bg-[#F3E9D2] text-[#2A1B10]" : "bg-[#03060E] text-ivory",
        className
      )}
    >
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <CtaCard
          unboxed
          variant={isParchment ? "light" : "dark"}
          titleEn="Own a Piece of Time"
          titleHi="समय का एक अंश अपने नाम करें"
          description="Bring the living celestial wisdom of Ujjain's sunrise timekeeping into your personal space. Limited artisan production — now open for private acquisitions and bespoke commissions."
          buttonTextEn="Enquire Now"
          buttonTextHi="पूछताछ करें"
          buttonSize="lg"
          href="/contact"
        />
      </div>
    </section>
  );
}
