// Built using Hyperiux Vault: https://vault.hyperiux.com
// Universal Device Responsiveness: iPhone SE/16 -> iPad Mini/Pro -> Laptops & Desktops
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

export interface MilestoneItem {
  id: string;
  year: string;
  era: string;
  eraHi?: string;
  content: string;
  isTop: boolean;
}

// ── 7 Milestones in Strict Chronological Alternating Order ──
// Top -> Bottom -> Top -> Bottom -> Top -> Bottom -> Top
export const ALL_MILESTONES: MilestoneItem[] = [
  {
    id: "1500-bce",
    year: "1500 BCE",
    era: "Rigvedic Antiquity",
    eraHi: "ऋग्वेद काल",
    content: "Astronomical hymns formulate the solar cycle into 12 lunar months, 30 daily Muhurtas, and 27 Nakshatras.",
    isTop: true,
  },
  {
    id: "1000-bce",
    year: "1000 BCE",
    era: "Vedanga Jyotisha",
    eraHi: "वेदांग ज्योतिष",
    content: "Lagadha's astronomical manual introduces horizon gnomon shadow reckoning and Solstice calibrations.",
    isTop: false,
  },
  {
    id: "500-bce",
    year: "500 BCE",
    era: "Surya Siddhanta",
    eraHi: "सूर्य सिद्धान्त",
    content: "Mathematically fixes Ujjain as 0° Prime Meridian, calculating micro-intervals down to Truti (29.6 microseconds).",
    isTop: true,
  },
  {
    id: "57-bce",
    year: "57 BCE",
    era: "Vikramaditya Era",
    eraHi: "विक्रम संवत्",
    content: "Emperor Vikramaditya inaugurates the royal Vikram Samvat calendar, aligning civil governance with celestial ephemeris.",
    isTop: false,
  },
  {
    id: "505-ce",
    year: "505 CE",
    era: "Varahamihira",
    eraHi: "वराहमिहिर काल",
    content: "Compiles Pancha-Siddhantika in Ujjain, calibrating copper water bowls (Ghati-Yantra) to solar altitude.",
    isTop: true,
  },
  {
    id: "1725-ce",
    year: "1725 CE",
    era: "Jantar Mantar",
    eraHi: "जंतर मंतर",
    content: "Monumental stone sundials and Samrat Yantras erected in Ujjain to measure local apparent solar time.",
    isTop: false,
  },
  {
    id: "2026-ce",
    year: "2026 CE",
    era: "Modern Rebirth",
    eraHi: "नव पुनर्जागरण",
    content: "Ancient astronomical mathematics synthesized with high-precision micro-stepper horology in the Ujjain Tower Clock.",
    isTop: true,
  },
];

export default function Timeline({
  title = "Vedic Chronology",
  periodLabel = "1500 BCE — 2026 CE",
  textColor = "#2D1B0E",
  mutedTextColor = "#6E5540",
  activeColor = "#B8873D",
  backgroundColor = "#FAF6F0",
  imageUrl = "/assets/images/ancient-temple-celestial-wheel.webp",
  imageAlt = "Ancient Temple Beneath the Celestial Wheel - Avanti Meridian",
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useGSAP(() => {
    const section = sectionRef.current;
    const slider = wholeSliderRef.current;
    if (!section || !slider) return;

    // Reset initial states
    ALL_MILESTONES.forEach((item) => {
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: item.isTop ? "bottom center" : "top center",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.milestone-content-${item.id}`, {
        opacity: 0,
        y: item.isTop ? -18 : 18,
      });
    });
    gsap.set(".journey-line", { width: "0%" });
    gsap.set(".journey-axis", { opacity: 0 });

    if (reducedMotion) {
      ALL_MILESTONES.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.milestone-content-${item.id}`, { opacity: 1, y: 0 });
      });
      gsap.set(".journey-line", { width: "98%" });
      gsap.set(".journey-axis", { opacity: 1 });
      return;
    }

    // Dynamic travel distance based on exact rendered track width on current screen
    const getTravelDistance = () => {
      const sliderWidth = slider.scrollWidth;
      const viewportWidth = window.innerWidth;
      const extraBuffer = viewportWidth < 640 ? 40 : 80;
      return Math.max(0, sliderWidth - viewportWidth + extraBuffer);
    };

    // ── MASTER PINNED TIMELINE ──
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: () => (window.innerWidth < 640 ? "top 64px" : "top 76px"),
        end: () => `+=${Math.round(getTravelDistance() * 1.05 + 160)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: "none",
      },
    });

    // 1. Smooth horizontal glide
    masterTl.to(slider, {
      x: () => -getTravelDistance(),
      ease: "none",
      duration: 1,
    });

    // 2. Central connecting line growth across screen & fade in axis from 0 at starting
    masterTl
      .fromTo(
        ".journey-axis",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.04,
          ease: "power2.out",
        },
        0
      )
      .to(
        ".journey-line",
        {
          width: "98%",
          ease: "none",
          duration: 0.94,
        },
        0
      );

    // 3. Sequential reveals for each milestone along the track
    const totalItems = ALL_MILESTONES.length;
    ALL_MILESTONES.forEach((item, index) => {
      const triggerTime = 0.06 + (index / (totalItems - 0.5)) * 0.84;

      masterTl
        // Draw stem
        .to(
          `.jl-${item.id}`,
          {
            scaleY: 1,
            duration: 0.08,
            ease: "power2.out",
          },
          triggerTime
        )
        // Pop circular node dot on the line
        .to(
          `.jd-${item.id}`,
          {
            scale: 1,
            duration: 0.08,
            ease: "back.out(2)",
          },
          triggerTime
        )
        // Reveal milestone card content (Year badge, title, Hindi tag & description)
        .to(
          `.milestone-content-${item.id}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power2.out",
          },
          triggerTime + 0.015
        );
    });

    // ── Multi-Stage Refresh for Next.js Client-Side Route Transitions ──
    const refreshTrigger = () => {
      ScrollTrigger.refresh();
    };

    // 1. Next animation frame
    const rafId = requestAnimationFrame(refreshTrigger);

    // 2. When web fonts are ready
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(refreshTrigger).catch(() => {});
    }

    // 3. Staggered timers for Next.js hydration and image loading
    const t1 = setTimeout(refreshTrigger, 100);
    const t2 = setTimeout(refreshTrigger, 350);
    const t3 = setTimeout(refreshTrigger, 800);
    const t4 = setTimeout(refreshTrigger, 1500);

    // 4. ResizeObserver to track layout shifts above the timeline
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && typeof document !== "undefined") {
      ro = new ResizeObserver(() => {
        refreshTrigger();
      });
      ro.observe(document.body);
      if (section.parentElement) {
        ro.observe(section.parentElement);
      }
    }

    // 5. Window event listeners
    window.addEventListener("resize", refreshTrigger);
    window.addEventListener("orientationchange", refreshTrigger);
    window.addEventListener("load", refreshTrigger);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", refreshTrigger);
      window.removeEventListener("orientationchange", refreshTrigger);
      window.removeEventListener("load", refreshTrigger);
    };
  }, { dependencies: [reducedMotion], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="w-full max-w-full h-[480px] sm:h-[510px] md:h-[530px] relative overflow-hidden transition-colors duration-500 block select-none my-0 py-0"
      style={sectionStyle}
    >
      {/* ── Viewport Container: Locked to Exact Center Vertically ── */}
      <div
        ref={viewportRef}
        className="w-full h-full relative overflow-hidden"
      >
        {/* ═══ ABSOLUTE HORIZONTAL AXIS (Exact 50% midpoint of screen) ═══ */}
        <div className="w-full absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10 journey-axis opacity-0">
          <div
            className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shadow-[0_0_8px_currentColor] shrink-0"
            style={activeStyle}
          />
          <div
            className="h-[2px] w-0 rounded-full journey-line shadow-[0_0_6px_currentColor]"
            style={activeStyle}
          />
          <div
            className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shadow-[0_0_8px_currentColor] shrink-0"
            style={activeStyle}
          />
        </div>

        {/* ═══ THE HORIZONTAL SLIDER TRACK (Fixed full height via absolute inset-0) ═══ */}
        <div
          ref={wholeSliderRef}
          className="absolute inset-0 w-max flex will-change-transform gap-6 sm:gap-10 md:gap-14 px-5 sm:px-10 md:px-16 shrink-0 z-20"
        >
          {/* 1. Leading Plaque (Epoch Continuum / Avanti Meridian) */}
          <div className="h-full flex flex-col justify-center shrink-0">
            <div className="h-[310px] sm:h-[330px] md:h-[350px] w-[190px] sm:w-[220px] md:w-[250px] overflow-hidden rounded-2xl md:rounded-3xl border border-black/10 dark:border-white/10 shadow-xl relative">
              <img
                src={imageUrl}
                alt={imageAlt}
                draggable={false}
                className="h-full w-full object-cover scale-105"
                onLoad={() => ScrollTrigger.refresh()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5 text-left">
                <span className="font-mono text-[8px] sm:text-[10px] text-[#E8B94B] uppercase tracking-[0.25em]">
                  Epoch Continuum
                </span>
                <h3 className="font-serif text-base sm:text-xl md:text-2xl text-white font-bold leading-tight mt-1">
                  Avanti Meridian
                </h3>
                <p className="font-hindi text-[11px] sm:text-xs text-[#F3E9D2]/90 mt-1">
                  उज्जैन · समय की शून्य रेखा
                </p>
              </div>
            </div>
          </div>

          {/* 2. Intro Title Column: Upper Half Title, Lower Half Era Span */}
          <div className="w-[120px] sm:w-[150px] md:w-[170px] h-full shrink-0 flex flex-col justify-between text-left">
            {/* Top Half: Title */}
            <div className="h-1/2 w-full flex flex-col justify-end pb-3 sm:pb-4 pr-2 pt-2 sm:pt-3">
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest block mb-0.5 opacity-60">
                Chronology
              </span>
              <h2 className="font-serif text-base sm:text-xl md:text-2xl leading-tight font-bold">
                {title}
              </h2>
            </div>

            {/* Bottom Half: Era Span */}
            <div className="h-1/2 w-full flex flex-col justify-start pt-3 sm:pt-4 pr-2 pb-3 sm:pb-4">
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest block mb-0.5 opacity-60">
                Era Span
              </span>
              <p
                className="font-mono text-xs sm:text-sm tracking-wider font-bold"
                style={mutedTextStyle}
              >
                {periodLabel}
              </p>
            </div>
          </div>

          {/* 3. The 7 Alternating Milestones (Equidistant & Non-Overlapping) */}
          {ALL_MILESTONES.map((item) => {
            const isTop = item.isTop;
            return (
              <div
                key={item.id}
                className="relative w-[210px] sm:w-[250px] md:w-[290px] h-full shrink-0 flex flex-col justify-between"
              >
                {/* ─── UPPER HALF (Always 50% height) ─── */}
                <div className="h-1/2 w-full flex flex-col justify-end items-start pb-0 pt-2 sm:pt-3 relative">
                  {isTop ? (
                    <>
                      {/* Milestone Card Copy */}
                      <div
                        className={cn(
                          "w-full pl-5 sm:pl-6 pr-2 select-text text-left pb-2 sm:pb-3",
                          `milestone-content-${item.id}`
                        )}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                          <span
                            className="font-mono text-[9px] sm:text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                            style={mutedTextStyle}
                          >
                            {item.year}
                          </span>
                          {item.eraHi && (
                            <span
                              className="font-hindi text-[9px] sm:text-[11px] opacity-75 font-medium"
                              style={mutedTextStyle}
                            >
                              {item.eraHi}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-sm sm:text-base md:text-lg font-bold leading-snug">
                          {item.era}
                        </h4>
                        <p
                          className="font-sans text-[11px] sm:text-xs leading-relaxed mt-1 line-clamp-4 sm:line-clamp-none max-w-[270px]"
                          style={mutedTextStyle}
                        >
                          {item.content}
                        </p>
                      </div>

                      {/* Stem Line (Drops down to junction) */}
                      <div className="w-5 flex justify-center shrink-0">
                        <div
                          className={cn(
                            "w-[2px] h-8 sm:h-10 md:h-12 origin-bottom rounded-full shadow-[0_0_6px_currentColor]",
                            `jl-${item.id}`
                          )}
                          style={activeStyle}
                        />
                      </div>
                    </>
                  ) : null}
                </div>

                {/* ─── EXACT CENTER JUNCTION (Directly on 50% axis) ─── */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-5 flex justify-center pointer-events-none z-30">
                  <div
                    className={cn(
                      "size-2.5 sm:size-3 rounded-full aspect-square shadow-[0_0_8px_currentColor]",
                      `jd-${item.id}`
                    )}
                    style={activeStyle}
                  />
                </div>

                {/* ─── LOWER HALF (Always 50% height) ─── */}
                <div className="h-1/2 w-full flex flex-col justify-start items-start pt-0 pb-2 sm:pb-3 relative">
                  {!isTop ? (
                    <>
                      {/* Stem Line (Rises up from junction) */}
                      <div className="w-5 flex justify-center shrink-0">
                        <div
                          className={cn(
                            "w-[2px] h-8 sm:h-10 md:h-12 origin-top rounded-full shadow-[0_0_6px_currentColor]",
                            `jl-${item.id}`
                          )}
                          style={activeStyle}
                        />
                      </div>

                      {/* Milestone Card Copy */}
                      <div
                        className={cn(
                          "w-full pl-5 sm:pl-6 pr-2 select-text text-left pt-2 sm:pt-3",
                          `milestone-content-${item.id}`
                        )}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                          <span
                            className="font-mono text-[9px] sm:text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                            style={mutedTextStyle}
                          >
                            {item.year}
                          </span>
                          {item.eraHi && (
                            <span
                              className="font-hindi text-[9px] sm:text-[11px] opacity-75 font-medium"
                              style={mutedTextStyle}
                            >
                              {item.eraHi}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-sm sm:text-base md:text-lg font-bold leading-snug">
                          {item.era}
                        </h4>
                        <p
                          className="font-sans text-[11px] sm:text-xs leading-relaxed mt-1 line-clamp-4 sm:line-clamp-none max-w-[270px]"
                          style={mutedTextStyle}
                        >
                          {item.content}
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
