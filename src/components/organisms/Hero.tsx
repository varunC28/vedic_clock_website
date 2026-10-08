"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { VedicClockReplica } from "./VedicClockReplica";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { BrassButton } from "@/components/atoms/BrassButton";

export const LOAD_SPEED = 0.55;

interface HeroProps {
  variant?: "dark" | "parchment";
  className?: string;
}

export function Hero({ variant = "dark", className }: HeroProps) {
  const isParchment = variant === "parchment";

  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const clockContainerRef = useRef<HTMLDivElement>(null);

  // Clock component refs
  const frameRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const archesRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<SVGGElement>(null);
  const plaquesRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);

  const [clockSize, setClockSize] = useState(300);

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 1024) {
        const targetWidth = w * 0.96;
        const sizeByWidth = Math.floor(targetWidth / 2.385);
        const sizeByHeight = Math.floor((h * 0.46) / 1.6);
        setClockSize(Math.max(130, Math.min(260, sizeByWidth, sizeByHeight)));
      } else {
        const containerW = Math.min(w, 1440);
        const rightColWidth = containerW * 0.60;
        const sizeByWidth = Math.floor((rightColWidth * 0.94) / 2.385);
        const sizeByHeight = Math.floor((h * 0.78) / 1.6);
        setClockSize(Math.max(220, Math.min(360, sizeByWidth, sizeByHeight)));
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // ── INITIAL STATES ───────────────────────────────────────────────────────
    gsap.set(leftColRef.current, { opacity: 0, y: 24 });
    gsap.set(clockContainerRef.current, { opacity: 0 });
    gsap.set(earthRef.current, { opacity: 0 });
    gsap.set(frameRef.current, { opacity: 0, scale: 1.15, rotation: -6 });
    if (iconsRef.current?.children) {
      gsap.set(iconsRef.current.children, { opacity: 0, scale: 0, rotation: -60 });
    }
    gsap.set(archesRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(progressRef.current, { opacity: 0 });
    gsap.set(plaquesRef.current, { opacity: 0, scale: 0.85 });
    gsap.set(digitsRef.current, { opacity: 0, scale: 0.92 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 1. Text reveals immediately
    tl.to(leftColRef.current, { opacity: 1, y: 0, duration: 1.2 * LOAD_SPEED }, 0.1);
    tl.to(clockContainerRef.current, { opacity: 1, duration: 0.8 * LOAD_SPEED }, 0.2);

    // 2. 3D Globe enters
    tl.to(earthRef.current, { opacity: 1, duration: 1.5 * LOAD_SPEED }, 0.3);

    // 3. Brass Frame wraps around Earth
    tl.to(frameRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 1.8 * LOAD_SPEED }, 0.7);

    // 4. 4 Medallions fly into their cutouts
    if (iconsRef.current?.children) {
      tl.to(
        iconsRef.current.children,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2 * LOAD_SPEED,
          stagger: 0.08 * LOAD_SPEED,
        },
        1.2
      );
    }

    // 5. 6 Sanskrit arched labels bloom
    tl.to(archesRef.current, { opacity: 1, scale: 1, duration: 1.4 * LOAD_SPEED }, 1.6);

    // 6. Karana & Yoga progress arcs fade in
    tl.to(progressRef.current, { opacity: 1, duration: 1.2 * LOAD_SPEED }, 2.0);

    // 7. Sunrise & Sunset wing plaques appear
    tl.to(plaquesRef.current, { opacity: 1, scale: 1, duration: 1.2 * LOAD_SPEED }, 2.3);

    // 8. 3D Gold marble digits ignite
    tl.to(digitsRef.current, { opacity: 1, scale: 1, duration: 1.4 * LOAD_SPEED }, 2.6);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden select-none flex items-center justify-center",
        "py-12 lg:py-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 transition-colors duration-500",
        isParchment ? "bg-[#F3E9D2]" : "bg-[#03060E]",
        className
      )}
    >

      {/* Ambient Radial Golden Glow */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] blur-3xl pointer-events-none rounded-full",
          isParchment
            ? "bg-gradient-to-tr from-[#B8873D]/10 via-[#D4A65A]/15 to-transparent"
            : "bg-gradient-to-tr from-[#D4A65A]/12 via-[#E8B94B]/4 to-transparent"
        )}
      />

      {/* ── 2-Column Responsive Product Landing Grid (40% Text, 60% Clock) ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-10 xl:gap-12 pt-8 lg:pt-0">
        
        {/* ── LEFT COLUMN: 40% Width (~38-40%) ───────────────────────────────── */}
        <div
          ref={leftColRef}
          className="w-full lg:w-[40%] xl:w-[38%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 shrink-0"
        >
          {/* Eyebrow Pill */}
          <SectionEyebrow
            en="THE LIVING CELESTIAL HOROLOGY"
            hi="वैदिक कालगणना"
            variant={isParchment ? "light" : "dark"}
            className="justify-center lg:justify-start"
          />

          {/* Main Titles */}
          <div className="space-y-1 sm:space-y-1.5">
            <h2
              className={cn(
                "text-3xl sm:text-4xl md:text-5xl font-hindi font-bold tracking-tight leading-tight",
                isParchment
                  ? "text-[#2A1B10] drop-shadow-sm"
                  : "text-[#FBF5E7] drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]"
              )}
            >
              वेदिक घड़ी
            </h2>
            <h1
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl xl:text-[38px] font-serif font-normal tracking-tight leading-tight",
                isParchment ? "text-[#B8873D]" : "text-[#D4A65A] drop-shadow-md"
              )}
            >
              The World&apos;s First Vedic Clock
            </h1>
          </div>

          <GoldDivider
            variant={isParchment ? "light" : "dark"}
            className="my-1.5 sm:my-2 max-w-xs scale-95 lg:scale-100 origin-center lg:origin-left"
          />

          {/* Introductory Narrative / Tagline */}
          <p
            className={cn(
              "text-xs sm:text-sm md:text-[15px] font-sans leading-relaxed max-w-lg",
              isParchment ? "text-[#3D2A1A]/85" : "text-ivory/80"
            )}
          >
            Beyond artificial mechanical ticking gears. Grounded in the sacred prime meridian of Ujjain, the Vedic Clock measures time through the Sun.
          </p>

          {/* Conversion CTA */}
          <div className="pt-2">
            <BrassButton
              en="Enquire Now"
              hi="पूछताछ करें"
              size="md"
              href="/contact"
            />
          </div>
        </div>

        {/* ── RIGHT COLUMN: 60% Width Showcase Clock (~60-62%) ─────────────── */}
        <div
          ref={clockContainerRef}
          className="w-full lg:w-[60%] xl:w-[62%] flex items-center justify-center relative min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]"
        >
          <VedicClockReplica
            size={clockSize}
            frameRef={frameRef}
            iconsRef={iconsRef}
            archesRef={archesRef}
            progressRef={progressRef}
            plaquesRef={plaquesRef}
            earthRef={earthRef}
            digitsRef={digitsRef}
          />
        </div>
      </div>
    </section>
  );
}
