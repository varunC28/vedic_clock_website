"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

export interface WheelCarouselItem {
  label: string;
  image: string;
  imageAlt?: string;
  subLabel?: string;
  detailHi?: string;
  detailEn?: string;
  num?: number;
}

export type WheelCarouselMode = "system" | "light" | "dark" | "custom";

export interface WheelCarouselProps {
  items?: WheelCarouselItem[];
  mode?: WheelCarouselMode;
  photoSide?: "left" | "right";
  photoWidth?: number;
  photoAspect?: "3/4" | "1/1" | "4/3" | "3/2";
  contentWidth?: number;
  gap?: number;
  photoRadius?: number;
  crossfadeDuration?: number;
  radius?: number;
  spacing?: number;
  visibleItems?: number;
  apexInset?: number;
  textColor?: string;
  selectedColor?: string;
  showMarker?: boolean;
  markerColor?: string;
  markerSize?: number;
  markerGap?: number;
  background?: string;
  panelColor?: string;
  scrollSpeed?: number;
  dragSpeed?: number;
  snap?: boolean;
  momentum?: boolean;
  appear?: boolean;
  edgeFade?: boolean;
  edgeFadeSize?: number;
  initialIndex?: number;
  activeIndex?: number;
  onActiveChange?: (item: WheelCarouselItem, index: number) => void;
  className?: string;
  photoClassName?: string;
  itemClassName?: string;
}

export const wheelCarouselDefaultItems: WheelCarouselItem[] = [
  { label: "01 · मेष · Aries", image: "/assets/rashi/aries.webp", detailHi: "साहस, नेतृत्व", detailEn: "courage, initiative" },
  { label: "02 · वृषभ · Taurus", image: "/assets/rashi/taurus.webp", detailHi: "स्थिरता, धन", detailEn: "stability, wealth" },
  { label: "03 · मिथुन · Gemini", image: "/assets/rashi/gemini.webp", detailHi: "संवाद, बुद्धि", detailEn: "communication, wit" },
  { label: "04 · कर्क · Cancer", image: "/assets/rashi/cancer.webp", detailHi: "गृह, पोषण", detailEn: "home, nurturing" },
  { label: "05 · सिंह · Leo", image: "/assets/rashi/leo.webp", detailHi: "सत्ता, प्रतिष्ठा", detailEn: "authority, pride" },
  { label: "06 · कन्या · Virgo", image: "/assets/rashi/virgo.webp", detailHi: "सेवा, विश्लेषण", detailEn: "service, analysis" },
  { label: "07 · तुला · Libra", image: "/assets/rashi/libra.webp", detailHi: "संतुलन, न्याय", detailEn: "balance, justice" },
  { label: "08 · वृश्चिक · Scorpio", image: "/assets/rashi/scorpio.webp", detailHi: "गहराई, परिवर्तन", detailEn: "depth, transformation" },
  { label: "09 · धनु · Sagittarius", image: "/assets/rashi/sagittarius.webp", detailHi: "ज्ञान, यात्रा", detailEn: "knowledge, travel" },
  { label: "10 · मकर · Capricorn", image: "/assets/rashi/capricon.webp", detailHi: "अनुशासन, महत्त्वाकांक्षा", detailEn: "discipline, ambition" },
  { label: "11 · कुंभ · Aquarius", image: "/assets/rashi/aquarius.webp", detailHi: "समाज, नवाचार", detailEn: "society, innovation" },
  { label: "12 · मीन · Pisces", image: "/assets/rashi/pisces.webp", detailHi: "अध्यात्म, करुणा", detailEn: "spirituality, compassion" },
];

const aspectRatios = {
  "3/4": "3 / 4",
  "1/1": "1 / 1",
  "4/3": "4 / 3",
  "3/2": "3 / 2",
} as const;

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function shortestOffset(index: number, rotation: number, length: number) {
  let offset = index - rotation;
  while (offset > length / 2) offset -= length;
  while (offset < -length / 2) offset += length;
  return offset;
}

export function WheelCarousel({
  items = wheelCarouselDefaultItems,
  mode = "system",
  photoSide = "left",
  photoWidth = 28,
  photoAspect = "1/1",
  contentWidth = 900,
  gap = 20,
  photoRadius = 20,
  crossfadeDuration = 0.4,
  radius = 320,
  spacing = 15,
  visibleItems = 7,
  apexInset = 34,
  textColor,
  selectedColor,
  showMarker = true,
  markerColor,
  markerSize = 14,
  markerGap = 18,
  background,
  panelColor,
  scrollSpeed = 0.008,
  dragSpeed = 0.02,
  snap = true,
  momentum = true,
  appear = true,
  edgeFade = true,
  edgeFadeSize = 25,
  initialIndex = 0,
  activeIndex,
  onActiveChange,
  className,
  photoClassName,
  itemClassName,
}: WheelCarouselProps) {
  const instanceId = useId();
  const { isParchment } = useTheme();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolvedMode =
    mode === "system"
      ? isParchment
        ? "light"
        : "dark"
      : mode;

  const carouselItems = items.length ? items : wheelCarouselDefaultItems;
  const itemCount = carouselItems.length;
  const startingIndex = wrapIndex(activeIndex ?? initialIndex, itemCount);
  const [rotation, setRotation] = useState(startingIndex);
  const [selectedIndex, setSelectedIndex] = useState(startingIndex);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(startingIndex);
  const selectedRef = useRef(startingIndex);
  const appliedActiveIndexRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const dragOriginRef = useRef({ y: 0, rotation: startingIndex });
  const previousDragRotationRef = useRef(startingIndex);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const normalizedIndex = wrapIndex(selectedRef.current, itemCount);
    if (normalizedIndex === selectedRef.current) return;
    selectedRef.current = normalizedIndex;
    rotationRef.current = normalizedIndex;
    setSelectedIndex(normalizedIndex);
    setRotation(normalizedIndex);
  }, [itemCount]);

  const palette = useMemo(() => {
    if (resolvedMode === "dark") {
      return {
        background: background ?? "#060A14",
        text: textColor ?? "rgba(251, 245, 231, 0.45)",
        selected: selectedColor ?? "#FBF5E7",
        marker: markerColor ?? "#D4A65A",
        panel: panelColor ?? "#091020",
        border: "rgba(212, 166, 90, 0.25)",
      };
    }
    if (resolvedMode === "light") {
      return {
        background: background ?? "#FAF6F0",
        text: textColor ?? "rgba(61, 42, 26, 0.45)",
        selected: selectedColor ?? "#2D1B0E",
        marker: markerColor ?? "#B8873D",
        panel: panelColor ?? "#F2ECE1",
        border: "rgba(184, 135, 61, 0.3)",
      };
    }
    return {
      background: background ?? "#060A14",
      text: textColor ?? "rgba(251, 245, 231, 0.5)",
      selected: selectedColor ?? "#FBF5E7",
      marker: markerColor ?? "#D4A65A",
      panel: panelColor ?? "#091020",
      border: "rgba(212, 166, 90, 0.25)",
    };
  }, [
    background,
    markerColor,
    panelColor,
    resolvedMode,
    selectedColor,
    textColor,
  ]);

  const commitRotation = useCallback(
    (nextRotation: number) => {
      rotationRef.current = nextRotation;
      setRotation(nextRotation);
      const nextIndex = wrapIndex(Math.round(nextRotation), itemCount);
      if (nextIndex !== selectedRef.current) {
        selectedRef.current = nextIndex;
        setSelectedIndex(nextIndex);
        onActiveChange?.(carouselItems[nextIndex]!, nextIndex);
      }
    },
    [carouselItems, itemCount, onActiveChange],
  );

  const commitRotationRef = useRef(commitRotation);
  commitRotationRef.current = commitRotation;

  const runAnimation = useCallback(() => {
    if (frameRef.current !== null) return;

    const tick = () => {
      let keepAnimating = false;

      if (!draggingRef.current && Math.abs(velocityRef.current) > 0.0008) {
        commitRotation(rotationRef.current + velocityRef.current);
        velocityRef.current *=
          momentum && !reduceMotion ? (snap ? 0.9 : 0.94) : 0.8;
        keepAnimating = true;
      } else if (!draggingRef.current && snap) {
        velocityRef.current = 0;
        const target = Math.round(rotationRef.current);
        const delta = target - rotationRef.current;
        if (Math.abs(delta) > 0.001 && !reduceMotion) {
          commitRotation(rotationRef.current + delta * 0.22);
          keepAnimating = true;
        } else {
          commitRotation(target);
        }
      } else if (!draggingRef.current) {
        velocityRef.current = 0;
      }

      if (keepAnimating) frameRef.current = requestAnimationFrame(tick);
      else frameRef.current = null;
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [commitRotation, momentum, reduceMotion, snap]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      const delta = event.deltaY * scrollSpeed;
      commitRotation(rotationRef.current + delta);
      velocityRef.current = delta * 0.2;
      runAnimation();
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [commitRotation, runAnimation, scrollSpeed]);

  useEffect(() => {
    if (activeIndex === undefined) return;
    const controlledIndex = wrapIndex(activeIndex, itemCount);
    if (appliedActiveIndexRef.current === controlledIndex) return;
    appliedActiveIndexRef.current = controlledIndex;
    const currentIndex = wrapIndex(Math.round(rotationRef.current), itemCount);
    let delta = controlledIndex - currentIndex;
    if (delta > itemCount / 2) delta -= itemCount;
    if (delta < -itemCount / 2) delta += itemCount;
    selectedRef.current = controlledIndex;
    setSelectedIndex(controlledIndex);
    commitRotationRef.current(rotationRef.current + delta);
  }, [activeIndex, itemCount]);

  const moveBy = (amount: number) => {
    velocityRef.current = 0;
    commitRotation(rotationRef.current + amount);
    runAnimation();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    draggingRef.current = true;
    setIsDragging(true);
    velocityRef.current = 0;
    dragOriginRef.current = { y: event.clientY, rotation: rotationRef.current };
    previousDragRotationRef.current = rotationRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const distance = event.clientY - dragOriginRef.current.y;
    const nextRotation = dragOriginRef.current.rotation - distance * dragSpeed;
    velocityRef.current = nextRotation - previousDragRotationRef.current;
    previousDragRotationRef.current = nextRotation;
    commitRotation(nextRotation);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    runAnimation();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      velocityRef.current = 0;
      commitRotation(rotationRef.current - selectedIndex);
      runAnimation();
    }
    if (event.key === "End") {
      event.preventDefault();
      velocityRef.current = 0;
      const lastIndex = itemCount - 1;
      commitRotation(rotationRef.current + lastIndex - selectedIndex);
      runAnimation();
    }
  };

  const safeSelectedIndex = wrapIndex(selectedIndex, itemCount);
  const selectedItem = carouselItems[safeSelectedIndex]!;
  const mask = edgeFade
    ? `linear-gradient(to bottom, transparent 0%, black ${edgeFadeSize}%, black ${100 - edgeFadeSize}%, transparent 100%)`
    : undefined;

  return (
    <div
      className={cn(
        "flex min-h-[380px] sm:min-h-[440px] w-full items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-500",
        className,
      )}
      style={{
        backgroundColor: palette.background,
        borderColor: palette.border,
      }}
    >
      <div
        ref={stageRef}
        role="listbox"
        aria-label="Wheel carousel"
        aria-activedescendant={
          Math.abs(shortestOffset(safeSelectedIndex, rotation, itemCount)) <=
          visibleItems + 1
            ? `${instanceId}-item-${safeSelectedIndex}`
            : undefined
        }
        tabIndex={0}
        className={cn(
          "flex h-full w-full touch-none select-none items-center overflow-hidden outline-none p-4 sm:p-8",
          photoSide === "right" && "flex-row-reverse",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ maxWidth: contentWidth, gap }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        {/* ── Left Column: Active Item Spotlight & Artwork ── */}
        <div
          className="flex flex-col shrink-0 items-center justify-center gap-3"
          style={{
            width: `${photoWidth}%`,
            minWidth: "140px",
          }}
        >
          <div
            className={cn(
              "relative w-full overflow-hidden shadow-lg border transition-all duration-300",
              photoClassName,
            )}
            style={{
              aspectRatio: aspectRatios[photoAspect],
              borderRadius: photoRadius,
              backgroundColor: palette.panel,
              borderColor: palette.border,
            }}
          >
            {/* Smooth Crossfading Image */}
            <img
              key={`${safeSelectedIndex}-${selectedItem.image}`}
              src={selectedItem.image}
              alt={selectedItem.imageAlt ?? selectedItem.label}
              className="absolute inset-0 h-full w-full object-contain p-2 sm:p-4 transition-all duration-500 animate-in fade-in zoom-in-95"
              draggable={false}
            />
          </div>

          {/* Rashi Signifies Sub-badge */}
          {(selectedItem.detailHi || selectedItem.detailEn) && (
            <div className="flex flex-col items-center text-center px-2">
              {selectedItem.detailHi && (
                <span className="font-hindi text-xs sm:text-sm font-semibold tracking-wide" style={{ color: palette.selected }}>
                  {selectedItem.detailHi}
                </span>
              )}
              {selectedItem.detailEn && (
                <span className="font-sans text-[11px] sm:text-xs tracking-wider opacity-70 capitalize mt-0.5" style={{ color: palette.text }}>
                  {selectedItem.detailEn}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Right Column: Rotating Orbit Labels ── */}
        <div
          className="relative h-[320px] sm:h-[380px] min-w-0 flex-1 overflow-hidden"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          {showMarker && (
            <span
              aria-hidden="true"
              className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(212,166,90,0.4)] transition-all"
              style={{
                left: `calc(${apexInset}% - ${markerGap}px)`,
                width: markerSize,
                height: markerSize,
                marginLeft: -markerSize,
                backgroundColor: palette.marker,
              }}
            />
          )}

          {carouselItems.map((item, index) => {
            const offset = shortestOffset(index, rotation, itemCount);
            if (Math.abs(offset) > visibleItems + 1) return null;

            const angle = offset * spacing;
            const radians = (angle * Math.PI) / 180;
            const x = -radius * (1 - Math.cos(radians));
            const y = radius * Math.sin(radians);
            const distance = Math.min(Math.abs(offset) / visibleItems, 1);
            const opacity = Math.cos((distance * Math.PI) / 2);
            const scale = 1 - Math.min(Math.abs(offset) * 0.04, 0.45);
            const selected = Math.abs(offset) < 0.5;

            return (
              <div
                id={`${instanceId}-item-${index}`}
                key={`${item.label}-${index}`}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  const delta = shortestOffset(index, rotationRef.current, itemCount);
                  moveBy(delta);
                }}
                className={cn(
                  "pointer-events-auto cursor-pointer absolute top-1/2 origin-left whitespace-nowrap text-sm sm:text-base md:text-lg font-medium leading-none tracking-tight transition-colors duration-200",
                  selected ? "font-bold scale-105" : "hover:opacity-90",
                  itemClassName,
                )}
                style={{
                  left: `${apexInset}%`,
                  color: selected ? palette.selected : palette.text,
                  opacity: selected ? 1 : Math.max(0.15, opacity),
                  transform: `translate(${x}px, ${y}px) translateY(-50%) rotate(${angle}deg) scale(${scale})`,
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {selectedItem.label}, item {safeSelectedIndex + 1} of {itemCount}
      </span>
    </div>
  );
}

export default WheelCarousel;
