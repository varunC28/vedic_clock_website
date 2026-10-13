// Built using Hyperiux Vault: https://vault.hyperiux.com
// Adapted for Vedic Horology & Dual Themes (Cosmic / Parchment) with GSAP ScrollTrigger Pinning
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
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
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

export type VedicJourneyItem = {
  id: string;
  year: string;
  era: string;
  eraHi: string;
  title: string;
  content: string;
  order: number;
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  topData?: VedicJourneyItem[];
  bottomData?: VedicJourneyItem[];
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

const defaultTopJourneyData: VedicJourneyItem[] = [
  {
    id: "1500-bce",
    year: "1500+ BCE",
    era: "Vedic Antiquity",
    eraHi: "ऋग्वेद काल",
    title: "360-Spoke Wheel",
    content: "Rigvedic astronomical hymns formulate the solar cycle into 12 lunar months, 30 daily Muhurtas, and 27 Nakshatras.",
    order: 1,
  },
  {
    id: "57-bce",
    year: "57 BCE",
    era: "Vikramaditya Era",
    eraHi: "विक्रम संवत्",
    title: "The Royal Calendar",
    content: "Emperor Vikramaditya of Ujjain inaugurates the Vikram Samvat calendar, standardizing civil and celestial reckoning.",
    order: 3,
  },
  {
    id: "2026-ce",
    year: "2024–2026",
    era: "Modern Rebirth",
    eraHi: "नव पुनर्जागरण",
    title: "Vedic Clock Tower",
    content: "Ancient astronomical ephemeris synthesized with high-precision micro-stepper horology in a monumental tower clock.",
    order: 5,
  },
];

const defaultBottomJourneyData: VedicJourneyItem[] = [
  {
    id: "500-bce",
    year: "500 BCE",
    era: "Surya Siddhanta",
    eraHi: "सूर्य सिद्धान्त",
    title: "Zero Prime Meridian",
    content: "The Surya Siddhanta mathematically fixes Ujjain (Avantika) as 0° longitude, calculating time down to Truti (29.6 microseconds).",
    order: 2,
  },
  {
    id: "505-ce",
    year: "505 CE",
    era: "Varahamihira",
    eraHi: "वराहमिहिर काल",
    title: "Ghati-Yantra Calibration",
    content: "Royal astronomer Varahamihira compiles the Pancha-Siddhantika, calibrating copper water bowls to precise 24-minute intervals.",
    order: 4,
  },
];

export default function Timeline({
  title = "Vedic Chronology",
  periodLabel = "1500 BCE — 2026 CE",
  textColor = "var(--color-foreground, #2D1B0E)",
  mutedTextColor = "var(--color-muted-foreground, #6E5540)",
  activeColor = "#B8873D",
  backgroundColor = "var(--color-background, #FAF6F0)",
  imageUrl = "/assets/mainbg.webp",
  imageAlt = "Vedic Astronomical Horology",
  topData = defaultTopJourneyData,
  bottomData = defaultBottomJourneyData,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const allJourneyItems = [...topData, ...bottomData].sort(
    (a, b) => a.order - b.order
  );

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

    // Set initial states
    allJourneyItems.forEach((item) => {
      const isTop = topData.some((t) => t.id === item.id);
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: isTop ? "bottom center" : "top center",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 0, y: isTop ? -20 : 20 });
      gsap.set(`.desc-${item.id}`, { opacity: 0, y: isTop ? -15 : 15 });
    });
    gsap.set(".journey-line", { width: "0%" });

    if (reducedMotion) {
      allJourneyItems.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, y: 0 });
        gsap.set(`.desc-${item.id}`, { opacity: 1, y: 0 });
      });
      gsap.set(".journey-line", { width: "98%" });
      return;
    }

    // Function to calculate exact horizontal travel distance
    const getScrollDistance = () => {
      const totalWidth = slider.scrollWidth;
      const viewportWidth = window.innerWidth;
      return Math.max(0, totalWidth - viewportWidth + 120);
    };

    // Master Timeline with ScrollTrigger PINNING:
    // This locks vertical page scroll while scrub is active!
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 2.5, getScrollDistance() * 1.2)}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: "none",
      },
    });

    // 1. Horizontal track movement across the viewport
    masterTl.to(slider, {
      x: () => -getScrollDistance(),
      ease: "none",
      duration: 1,
    });

    // 2. Central connecting line growth
    masterTl.to(
      ".journey-line",
      {
        width: "98%",
        ease: "none",
        duration: 0.95,
      },
      0
    );

    // 3. Reveal milestones as they scroll into view
    const itemCount = allJourneyItems.length;
    allJourneyItems.forEach((item, index) => {
      // Stagger activation evenly across the timeline duration
      const itemTriggerTime = 0.08 + (index / (itemCount || 1)) * 0.82;

      masterTl
        // Draw the vertical stem
        .to(
          `.jl-${item.id}`,
          {
            scaleY: 1,
            duration: 0.08,
            ease: "power2.out",
          },
          itemTriggerTime
        )
        // Pop the node dot
        .to(
          `.jd-${item.id}`,
          {
            scale: 1,
            duration: 0.08,
            ease: "back.out(2)",
          },
          itemTriggerTime
        )
        // Fade in title & description
        .to(
          `.title-${item.id}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power2.out",
          },
          itemTriggerTime + 0.02
        )
        .to(
          `.desc-${item.id}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power2.out",
          },
          itemTriggerTime + 0.03
        );
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [reducedMotion], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="w-full h-screen relative overflow-hidden transition-colors duration-500 flex flex-col justify-center"
      style={sectionStyle}
    >
      {/* ── Viewport Pinned Viewport Container ── */}
      <div className="w-full h-full relative overflow-hidden flex items-center justify-start">
        <div
          ref={wholeSliderRef}
          className="flex h-[36vw] min-h-[460px] max-h-[620px] items-center gap-[5vw] px-[6vw] max-[600px]:h-[78vh] max-[600px]:gap-[8vw] max-[600px]:px-[8vw] will-change-transform shrink-0"
        >
          {/* Leading Cover / Intro Plaque */}
          <div className="h-full w-[26vw] min-w-[280px] max-w-[380px] overflow-hidden rounded-[2vw] max-[600px]:h-[65vw] max-[600px]:w-[80vw] max-[600px]:rounded-[5vw] border border-black/10 dark:border-white/10 shadow-2xl relative shrink-0">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-[2.5vw] text-left">
              <span className="font-mono text-[0.85vw] max-[600px]:text-[3vw] text-[#E8B94B] uppercase tracking-[0.25em]">
                Epoch Continuum
              </span>
              <h3 className="font-serif text-[1.8vw] max-[600px]:text-[5vw] text-white font-bold leading-tight mt-1">
                Avanti Meridian
              </h3>
              <p className="font-hindi text-[1.1vw] max-[600px]:text-[3.2vw] text-[#F3E9D2]/90 mt-1">
                उज्जैन · समय की शून्य रेखा
              </p>
            </div>
          </div>

          {/* Connected Horizontal Timeline Rail */}
          <div className="relative h-full flex flex-col justify-between shrink-0">
            {/* Center connecting axis line */}
            <div className="w-full absolute left-0 top-[50%] -translate-y-1/2 flex items-center h-fit z-0">
              <div
                className="h-[.9vw] w-[.9vw] max-[600px]:h-[2.5vw] max-[600px]:w-[2.5vw] rounded-full shadow-[0_0_8px_currentColor]"
                style={activeStyle}
              ></div>
              <div
                className="h-[2px] w-[0%] rounded-full journey-line shadow-[0_0_6px_currentColor]"
                style={activeStyle}
              ></div>
              <div
                className="h-[.9vw] w-[.9vw] max-[600px]:h-[2.5vw] max-[600px]:w-[2.5vw] rounded-full shadow-[0_0_8px_currentColor]"
                style={activeStyle}
              ></div>
            </div>

            {/* TOP TRACK (Odd Milestones: 1, 3, 5) */}
            <div className="flex h-1/2 w-full items-center justify-start gap-[1vw] relative z-10">
              {/* Left Title in Upper Half */}
              <div className="h-full w-[18vw] min-w-[200px] pt-[2vw] max-[600px]:h-fit max-[600px]:pt-[4vw] text-left shrink-0">
                <h2 className="w-[85%] font-serif text-[2.4vw] leading-[1.05] max-[600px]:text-[6.5vw] font-bold">
                  {title}
                </h2>
              </div>

              {/* Top Cards Stream */}
              <div className="flex h-full gap-x-[12vw] max-[600px]:gap-x-[36vw]">
                {topData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[26vw] min-w-[280px] max-w-[380px] px-[2vw] max-[600px]:w-[68vw] max-[600px]:px-[6vw] text-left shrink-0"
                  >
                    {/* Vertical Stem & Dot (Bottom to Top) */}
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full pointer-events-none">
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] -translate-x-1/2 relative aspect-square rounded-full jd-${item.id} shadow-[0_0_12px_currentColor]`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`h-[92%] w-[2px] origin-bottom rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    {/* Milestone Copy */}
                    <div className="mt-[-0.8vw] space-y-[0.5vw] max-[600px]:mt-[-2vw]">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-[1vw] max-[600px]:text-[3vw] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                          style={mutedTextStyle}
                        >
                          {item.year}
                        </span>
                        <span
                          className="font-hindi text-[0.9vw] max-[600px]:text-[2.8vw] opacity-80 font-medium"
                          style={mutedTextStyle}
                        >
                          {item.eraHi}
                        </span>
                      </div>
                      <h4
                        className={`title-${item.id} font-serif text-[1.8vw] leading-tight max-[600px]:text-[5vw] font-bold`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`desc-${item.id} w-[92%] font-sans text-[1.1vw] leading-[1.35] max-[600px]:w-[90%] max-[600px]:text-[3.8vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM TRACK (Even Milestones: 2, 4) */}
            <div className="h-1/2 flex items-center justify-start w-full text-left relative z-10">
              {/* Period Label in Lower Half */}
              <div className="w-[18vw] min-w-[200px] pt-[2vw] max-[600px]:pt-[4vw] h-full shrink-0">
                <p
                  className="font-mono text-[1.1vw] tracking-wider leading-none max-[600px]:text-[3.5vw] uppercase font-bold"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              {/* Bottom Cards Stream (Offset slightly to sit between top cards) */}
              <div className="flex h-full gap-x-[14vw] ml-[8vw] max-[600px]:gap-x-[36vw] max-[600px]:ml-[6vw]">
                {bottomData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[26vw] min-w-[280px] max-w-[380px] px-[2vw] max-[600px]:w-[68vw] max-[600px]:px-[6vw] shrink-0"
                  >
                    {/* Vertical Stem & Dot (Top to Bottom) */}
                    <div className="w-full absolute left-0 bottom-[-1%] h-full pointer-events-none">
                      <div
                        className={`h-[92%] origin-top w-[2px] rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] -translate-x-1/2 relative aspect-square rounded-full jd-${item.id} shadow-[0_0_12px_currentColor]`}
                        style={activeStyle}
                      ></div>
                    </div>

                    {/* Milestone Copy */}
                    <div className="flex h-full w-full flex-col justify-end space-y-[0.5vw]">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-[1vw] max-[600px]:text-[3vw] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                          style={mutedTextStyle}
                        >
                          {item.year}
                        </span>
                        <span
                          className="font-hindi text-[0.9vw] max-[600px]:text-[2.8vw] opacity-80 font-medium"
                          style={mutedTextStyle}
                        >
                          {item.eraHi}
                        </span>
                      </div>
                      <h4
                        className={`title-${item.id} font-serif text-[1.8vw] leading-tight max-[600px]:text-[5vw] font-bold`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`desc-${item.id} w-[92%] font-sans text-[1.1vw] leading-[1.35] max-[600px]:w-[90%] max-[600px]:text-[3.8vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
