// Built using Hyperiux Vault: https://vault.hyperiux.com
// Adapted for Vedic Horology & Dual Themes (Cosmic / Parchment)
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

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
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

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
  scrollDuration?: number;
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
  duration,
  scrollDuration = 1.2,
  topData = defaultTopJourneyData,
  bottomData = defaultBottomJourneyData,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);

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

    if (!section) return;

    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -57 : -65;
    const lineWidth = isMobile ? "65%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    const slideEnd = isMobile ? "82% 50%" : "92% bottom";
    const lineEnd = isMobile ? "80% 50%" : "92% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent },
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
      },
    });
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items = allJourneyItems;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, {
          opacity: 1,
          clearProps: "transform",
        });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: "bottom bottom",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 1 });
      gsap.set(`.description-${item.id}`, { opacity: 1 });
    });

    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

    items.forEach((item) => {
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });

      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });
    });

    const createItemTimeline = (
      item: VedicJourneyItem,
      startPos: number,
      endPos: number,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];

      const isTop = topData.some((topItem) => topItem.id === item.id);

      if (!isTop) {
        gsap.set(lineSelector, { transformOrigin: "top top" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${startPos}% 30%`,
          end: `${endPos}% 50%`,
          scrub: true,
        },
      });

      timeline
        .to(lineSelector, {
          scaleY: 1,
          duration: normalizedDuration * 0.4,
        })
        .to(
          dotSelector,
          {
            scale: 1,
            duration: normalizedDuration * 0.4,
          },
          "<",
        )
        .fromTo(
          titleLines,
          { y: 100 },
          {
            y: 0,
            delay: -0.8 * normalizedDuration,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
        )
        .fromTo(
          descriptionLines,
          { y: 100 },
          {
            y: 0,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<",
        );

      return timeline;
    };

    // Calculate positions evenly for the items
    const count = items.length;
    const positions: ReadonlyArray<readonly [number, number]> =
      window.innerWidth < 600
        ? items.map((_, i) => {
            const step = 60 / (count || 1);
            const start = 20 + i * step;
            return [Math.round(start), Math.round(start + 12)] as const;
          })
        : items.map((_, i) => {
            const step = 65 / (count || 1);
            const start = 6 + i * step;
            return [Math.round(start), Math.round(start + 20)] as const;
          });

    items.forEach((item, index) => {
      const [startPos, endPos] = positions[index] || [10, 30];
      createItemTimeline(item, startPos, endPos);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[200vw] max-[600px]:h-[400vh] w-full relative transition-colors duration-500"
      style={sectionStyle}
    >
      <div className="h-screen w-screen sticky top-[0%] pt-[8%] overflow-hidden max-[600px]:top-[5%]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[32vw] w-[240vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[800vw] max-[600px]:px-[7vw]"
        >
          {/* Leading Cover Card */}
          <div className="h-full w-[28vw] overflow-hidden rounded-[1.5vw] max-[600px]:h-[65vw] max-[600px]:w-[85vw] max-[600px]:rounded-[5vw] border border-black/10 dark:border-white/10 shadow-2xl relative">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-[2.5vw] text-left">
              <span className="font-mono text-[1vw] max-[600px]:text-[3vw] text-[#E8B94B] uppercase tracking-[0.25em]">
                Epoch Continuum
              </span>
              <h3 className="font-serif text-[2vw] max-[600px]:text-[5.5vw] text-white font-bold leading-tight mt-1">
                Avanti Meridian
              </h3>
              <p className="font-hindi text-[1.2vw] max-[600px]:text-[3.5vw] text-[#F3E9D2]/80 mt-1">
                उज्जैन · समय की शून्य रेखा
              </p>
            </div>
          </div>

          {/* Connected Horizontal Timeline Rail */}
          <div className="relative h-full w-full">
            {/* Center connecting axis line */}
            <div className="w-full absolute left-0 top-[49%] -translate-y-1/2 flex items-center h-fit">
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full shadow-[0_0_8px_currentColor]"
                style={activeStyle}
              ></div>
              <div
                className="h-[2px] w-[0%] rounded-full journey-line shadow-[0_0_4px_currentColor]"
                style={activeStyle}
              ></div>
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full shadow-[0_0_8px_currentColor]"
                style={activeStyle}
              ></div>
            </div>

            {/* TOP TRACK (Odd milestones) */}
            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[20%] pt-[2vw] max-[600px]:h-fit max-[600px]:pt-[5vw] text-left">
                <h2 className="w-[85%] font-serif text-[2.5vw] leading-[1.05] max-[600px]:text-[7vw] font-bold">
                  {title}
                </h2>
              </div>

              <div className="w-full flex h-full gap-x-[15vw] max-[600px]:gap-x-[40vw]">
                {topData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[30vw] px-[3vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[7vw] text-left"
                  >
                    {/* Vertical Stem & Dot */}
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full">
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] -translate-x-1/2 relative aspect-square rounded-full jd-${item.id} shadow-[0_0_10px_currentColor]`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`h-[94%] w-[2px] origin-bottom rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    {/* Milestone Copy */}
                    <div className="mt-[-1vw] space-y-[0.6vw] max-[600px]:mt-[-2vw]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[1.1vw] max-[600px]:text-[3.2vw] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10" style={mutedTextStyle}>
                          {item.year}
                        </span>
                        <span className="font-hindi text-[1vw] max-[600px]:text-[3vw] opacity-75 font-medium" style={mutedTextStyle}>
                          {item.eraHi}
                        </span>
                      </div>
                      <h4
                        className={`title-${item.id} font-serif text-[2vw] leading-tight max-[600px]:text-[5.5vw] font-bold`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`description-${item.id} w-[92%] font-sans text-[1.25vw] leading-[1.3] max-[600px]:w-[90%] max-[600px]:text-[4.2vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM TRACK (Even milestones) */}
            <div className="h-1/2 flex items-center justify-start w-full text-left">
              <div className="w-[34%] pt-[2vw] max-[600px]:pt-[5vw] max-[600px]:w-[30%] h-full">
                <p
                  className="font-mono text-[1.3vw] tracking-wider leading-none max-[600px]:text-[3.8vw] uppercase font-bold"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              <div className="w-full flex h-full gap-x-[20vw] ml-[7vw] max-[600px]:gap-x-[40vw] max-[600px]:ml-[7vw]">
                {bottomData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[28vw] px-[3vw] max-[600px]:w-[70vw] max-[600px]:px-[7vw]"
                  >
                    {/* Vertical Stem & Dot */}
                    <div className="w-full absolute left-0 bottom-[-1%] h-full">
                      <div
                        className={`h-[94%] origin-top w-[2px] rounded-full max-[600px]:h-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] -translate-x-1/2 relative w-auto aspect-square rounded-full jd-${item.id} shadow-[0_0_10px_currentColor]`}
                        style={activeStyle}
                      ></div>
                    </div>

                    {/* Milestone Copy */}
                    <div className="flex h-full w-full flex-col justify-end space-y-[0.6vw]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[1.1vw] max-[600px]:text-[3.2vw] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10" style={mutedTextStyle}>
                          {item.year}
                        </span>
                        <span className="font-hindi text-[1vw] max-[600px]:text-[3vw] opacity-75 font-medium" style={mutedTextStyle}>
                          {item.eraHi}
                        </span>
                      </div>
                      <h4
                        className={`title-${item.id} font-serif text-[2vw] leading-tight max-[600px]:text-[5.5vw] font-bold`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`description-${item.id} w-[92%] font-sans text-[1.25vw] leading-[1.3] max-[600px]:w-[90%] max-[600px]:text-[4.2vw]`}
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
