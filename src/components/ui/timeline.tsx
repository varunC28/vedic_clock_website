// Built using Hyperiux Vault: https://vault.hyperiux.com
// Compact & Elegant: Vertically centered pinning with tight, refined spacing
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

type JourneyItem = {
  id: string;
  year: string;
  era: string;
  eraHi?: string;
  content: string;
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

// 4 Top Milestones (Always above the center line)
const topJourneyData: JourneyItem[] = [
  {
    id: "1500-bce",
    year: "1500 BCE",
    era: "Rigvedic Antiquity",
    eraHi: "ऋग्वेद काल",
    content: "Astronomical hymns formulate the solar cycle into 12 lunar months, 30 daily Muhurtas, and 27 Nakshatras.",
  },
  {
    id: "500-bce",
    year: "500 BCE",
    era: "Surya Siddhanta",
    eraHi: "सूर्य सिद्धान्त",
    content: "Mathematically fixes Ujjain as 0° Prime Meridian, calculating micro-intervals down to Truti (29.6 microseconds).",
  },
  {
    id: "505-ce",
    year: "505 CE",
    era: "Varahamihira",
    eraHi: "वराहमिहिर काल",
    content: "Compiles Pancha-Siddhantika in Ujjain, calibrating copper water bowls (Ghati-Yantra) to solar altitude.",
  },
  {
    id: "2026-ce",
    year: "2026 CE",
    era: "Modern Rebirth",
    eraHi: "नव पुनर्जागरण",
    content: "Ancient astronomical mathematics synthesized with high-precision micro-stepper horology in the Ujjain Tower Clock.",
  },
];

// 3 Bottom Milestones (Always below the center line)
const bottomJourneyData: JourneyItem[] = [
  {
    id: "1000-bce",
    year: "1000 BCE",
    era: "Vedanga Jyotisha",
    eraHi: "वेदांग ज्योतिष",
    content: "Lagadha's astronomical manual introduces horizon gnomon shadow reckoning and Solstice calibrations.",
  },
  {
    id: "57-bce",
    year: "57 BCE",
    era: "Vikramaditya Era",
    eraHi: "विक्रम संवत्",
    content: "Emperor Vikramaditya inaugurates the royal Vikram Samvat calendar, aligning civil governance with celestial ephemeris.",
  },
  {
    id: "1725-ce",
    year: "1725 CE",
    era: "Jantar Mantar",
    eraHi: "जंतर मंतर",
    content: "Monumental stone sundials and Samrat Yantras erected in Ujjain to measure local apparent solar time.",
  },
];

// Chronological order along the horizontal timeline track
const allJourneyItems: JourneyItem[] = [
  topJourneyData[0],    // 1. 1500 BCE (Top)
  bottomJourneyData[0], // 2. 1000 BCE (Bottom)
  topJourneyData[1],    // 3. 500 BCE (Top)
  bottomJourneyData[1], // 4. 57 BCE (Bottom)
  topJourneyData[2],    // 5. 505 CE (Top)
  bottomJourneyData[2], // 6. 1725 CE (Bottom)
  topJourneyData[3],    // 7. 2026 CE (Top)
];

export default function Timeline({
  title = "Vedic Chronology",
  periodLabel = "1500 BCE — 2026 CE",
  textColor = "#2D1B0E",
  mutedTextColor = "#6E5540",
  activeColor = "#B8873D",
  backgroundColor = "#FAF6F0",
  imageUrl = "/assets/mainbg.webp",
  imageAlt = "Vedic Astronomical Horology",
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
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
    allJourneyItems.forEach((item) => {
      const isTop = topJourneyData.some((t) => t.id === item.id);
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: isTop ? "bottom center" : "top center",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.milestone-content-${item.id}`, {
        opacity: 0,
        y: isTop ? -20 : 20,
      });
    });
    gsap.set(".journey-line", { width: "0%" });

    if (reducedMotion) {
      allJourneyItems.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.milestone-content-${item.id}`, { opacity: 1, y: 0 });
      });
      gsap.set(".journey-line", { width: "98%" });
      return;
    }

    // Exact horizontal distance needed to scroll all the way through
    const getTravelDistance = () => {
      const sliderWidth = slider.scrollWidth;
      const viewportWidth = window.innerWidth;
      return Math.max(0, sliderWidth - viewportWidth + 80);
    };

    // ── MASTER GSAP TIMELINE WITH PIN:TRUE ──
    // Pins right when centered in viewport, unpins right when finished!
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: () => `+=${getTravelDistance() + 80}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: "none",
      },
    });

    // 1. Move slider horizontally
    masterTl.to(slider, {
      x: () => -getTravelDistance(),
      ease: "none",
      duration: 1,
    });

    // 2. Central connecting line progress
    masterTl.to(
      ".journey-line",
      {
        width: "98%",
        ease: "none",
        duration: 0.95,
      },
      0
    );

    // 3. Staggered reveal for each milestone as it enters viewport center
    const totalItems = allJourneyItems.length;
    allJourneyItems.forEach((item, index) => {
      const triggerTime = 0.05 + (index / totalItems) * 0.85;

      masterTl
        // Draw connecting vertical stem
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
        // Smoothly reveal full milestone content (Year badge, Hindi tag, Title, Description together)
        .to(
          `.milestone-content-${item.id}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power2.out",
          },
          triggerTime + 0.02
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
      className="w-full h-[540px] sm:h-[580px] relative overflow-hidden transition-colors duration-500 flex items-center justify-center select-none my-2"
      style={sectionStyle}
    >
      {/* ── Viewport Pinned Container (Centered Vertically) ── */}
      <div className="w-full h-full relative overflow-hidden flex items-center">
        <div
          ref={wholeSliderRef}
          className="flex h-full items-center gap-[4vw] px-[5vw] max-[600px]:gap-[7vw] max-[600px]:px-[7vw] will-change-transform shrink-0"
        >
          {/* Leading Cover Plaque */}
          <div className="h-[380px] w-[240px] sm:w-[280px] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 shadow-xl relative shrink-0">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
              <span className="font-mono text-[10px] text-[#E8B94B] uppercase tracking-[0.25em]">
                Epoch Continuum
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-bold leading-tight mt-1">
                Avanti Meridian
              </h3>
              <p className="font-hindi text-xs sm:text-sm text-[#F3E9D2]/90 mt-1">
                उज्जैन · समय की शून्य रेखा
              </p>
            </div>
          </div>

          {/* ── Horizontal Track with Clear Top & Bottom Separation ── */}
          <div className="relative h-full flex flex-col justify-between shrink-0">
            
            {/* ═══ ABSOLUTE CENTER LINE (At exact 50% midpoint) ═══ */}
            <div className="w-full absolute left-0 top-[50%] -translate-y-1/2 flex items-center h-fit z-0 pointer-events-none">
              <div
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                style={activeStyle}
              />
              <div
                className="h-[2px] w-[0%] rounded-full journey-line shadow-[0_0_6px_currentColor]"
                style={activeStyle}
              />
              <div
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                style={activeStyle}
              />
            </div>

            {/* ═══ TOP TRACK (Exclusively above the center line) ═══ */}
            <div className="h-1/2 w-full flex items-end pb-7 sm:pb-9 relative z-10">
              {/* Left Title in Upper Half */}
              <div className="w-[16vw] min-w-[170px] text-left shrink-0 pr-4">
                <span className="font-mono text-[10px] uppercase tracking-widest block mb-1 opacity-60">
                  Chronology
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl leading-tight font-bold">
                  {title}
                </h2>
              </div>

              {/* Top Cards Stream */}
              <div className="flex gap-x-[11vw] max-[600px]:gap-x-[32vw]">
                {topJourneyData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative w-[24vw] min-w-[260px] max-w-[340px] px-2 max-[600px]:w-[68vw] text-left shrink-0 flex flex-col justify-end"
                  >
                    {/* Stem & Dot Dropping Down to Center Line */}
                    <div className="absolute left-0 bottom-[-28px] sm:bottom-[-36px] top-0 pointer-events-none w-4">
                      {/* Node Dot on the Center Line */}
                      <div
                        className={`size-3 -translate-x-[4px] absolute bottom-0 aspect-square rounded-full jd-${item.id} shadow-[0_0_8px_currentColor]`}
                        style={activeStyle}
                      />
                      {/* Vertical Stem Going Up to Card */}
                      <div
                        className={`h-full w-[2px] origin-bottom rounded-full jl-${item.id}`}
                        style={activeStyle}
                      />
                    </div>

                    {/* Milestone Copy (Guaranteed safely ABOVE the line) */}
                    <div className={`milestone-content-${item.id} space-y-1 pl-4`}>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                          style={mutedTextStyle}
                        >
                          {item.year}
                        </span>
                        {item.eraHi && (
                          <span
                            className="font-hindi text-[11px] opacity-75 font-medium"
                            style={mutedTextStyle}
                          >
                            {item.eraHi}
                          </span>
                        )}
                      </div>
                      <h4
                        className={`title-${item.id} font-serif text-lg sm:text-xl font-bold leading-snug`}
                      >
                        {item.era}
                      </h4>
                      <p
                        className={`desc-${item.id} font-sans text-xs leading-relaxed max-w-[320px]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ BOTTOM TRACK (Exclusively below the center line) ═══ */}
            <div className="h-1/2 w-full flex items-start pt-7 sm:pt-9 relative z-10 text-left">
              {/* Period Label in Lower Half */}
              <div className="w-[16vw] min-w-[170px] shrink-0 pr-4">
                <span className="font-mono text-[10px] uppercase tracking-widest block mb-1 opacity-60">
                  Era Span
                </span>
                <p
                  className="font-mono text-xs sm:text-sm tracking-wider font-bold"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              {/* Bottom Cards Stream */}
              <div className="flex gap-x-[11vw] ml-[7vw] max-[600px]:gap-x-[32vw] max-[600px]:ml-[5vw]">
                {bottomJourneyData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative w-[24vw] min-w-[260px] max-w-[340px] px-2 max-[600px]:w-[68vw] shrink-0 flex flex-col justify-start"
                  >
                    {/* Stem & Dot Rising Up to Center Line */}
                    <div className="absolute left-0 top-[-28px] sm:top-[-36px] bottom-0 pointer-events-none w-4">
                      {/* Node Dot on the Center Line */}
                      <div
                        className={`size-3 -translate-x-[4px] absolute top-0 aspect-square rounded-full jd-${item.id} shadow-[0_0_8px_currentColor]`}
                        style={activeStyle}
                      />
                      {/* Vertical Stem Going Down to Card */}
                      <div
                        className={`h-full origin-top w-[2px] rounded-full jl-${item.id}`}
                        style={activeStyle}
                      />
                    </div>

                    {/* Milestone Copy (Guaranteed safely BELOW the line) */}
                    <div className={`milestone-content-${item.id} space-y-1 pl-4`}>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                          style={mutedTextStyle}
                        >
                          {item.year}
                        </span>
                        {item.eraHi && (
                          <span
                            className="font-hindi text-[11px] opacity-75 font-medium"
                            style={mutedTextStyle}
                          >
                            {item.eraHi}
                          </span>
                        )}
                      </div>
                      <h4
                        className={`title-${item.id} font-serif text-lg sm:text-xl font-bold leading-snug`}
                      >
                        {item.era}
                      </h4>
                      <p
                        className={`desc-${item.id} font-sans text-xs leading-relaxed max-w-[320px]`}
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
