"use client";

import React, { useRef, useState, Dispatch, SetStateAction, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export type Scroll01Item = {
  num?: string;
  title: string;
  titleHi?: string;
  subtitle?: string;
  description: string;
  pills?: string[];
  media: string | ReactNode;
};

export interface Scroll01Props {
  items: Scroll01Item[];
  variant?: "dark" | "parchment";
  className?: string;
}

function ScrollItem({
  item,
  index,
  setActive,
  variant = "dark",
}: {
  item: Scroll01Item;
  index: number;
  setActive: Dispatch<SetStateAction<number>>;
  variant?: "dark" | "parchment";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isParchment = variant === "parchment";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const opacityValues = index === 0 ? [1, 0.8, 1, 0.2] : [0.15, 0.8, 1, 0.2];
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    opacityValues
  );

  const isActive = useTransform(scrollYProgress, (v) => v > 0.35 && v < 0.65);

  useMotionValueEvent(isActive, "change", (v) => {
    if (v) {
      setActive((prev) => (prev === index ? prev : index));
    }
  });

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="flex flex-col items-start text-left max-w-lg select-text"
    >
      {item.num && (
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-widest mb-1.5 font-bold flex items-center gap-2",
            isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
          )}
        >
          <span>{item.num}</span>
          <span>·</span>
          <span className="font-hindi text-xs">{item.titleHi}</span>
        </span>
      )}
      <h3
        className={cn(
          "mb-1.5 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight",
          isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
        )}
      >
        {item.title}
      </h3>
      {item.subtitle && (
        <p
          className={cn(
            "text-xs sm:text-sm font-sans font-medium mb-3",
            isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
          )}
        >
          {item.subtitle}
        </p>
      )}
      <p
        className={cn(
          "text-xs sm:text-sm leading-relaxed font-sans mb-5",
          isParchment ? "text-[#6E5540]" : "text-ivory/70"
        )}
      >
        {item.description}
      </p>

      {item.pills && (
        <div className="flex flex-wrap gap-2 mt-1">
          {item.pills.map((pill, i) => (
            <span
              key={i}
              className={cn(
                "text-[10px] sm:text-xs font-mono font-medium px-3 py-1 rounded-full border transition-colors",
                isParchment
                  ? "border-[#B8873D]/30 bg-[#B8873D]/10 text-[#2D1B0E]"
                  : "border-[#D4A65A]/25 bg-[#D4A65A]/10 text-ivory/90"
              )}
            >
              {pill}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export function Scroll01({ items, variant = "dark", className }: Readonly<Scroll01Props>) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isParchment = variant === "parchment";

  return (
    <div className={cn("w-full", className)}>
      {/* ── Mobile Layout (Stacked Cards) ── */}
      <div className="space-y-12 md:hidden">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className={cn(
              "p-6 rounded-2xl border flex flex-col items-start text-left space-y-4",
              isParchment
                ? "bg-[#FAF6F0] border-[#DFCBB5] shadow-sm"
                : "bg-[#0A1122]/70 border-[#D4A65A]/20 shadow-md"
            )}
          >
            {item.num && (
              <span
                className={cn(
                  "font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2",
                  isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                )}
              >
                <span>{item.num}</span>
                <span>·</span>
                <span className="font-hindi text-xs">{item.titleHi}</span>
              </span>
            )}

            <div className="space-y-1">
              <h3
                className={cn(
                  "text-xl sm:text-2xl font-serif font-bold",
                  isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                )}
              >
                {item.title}
              </h3>
              {item.subtitle && (
                <p
                  className={cn(
                    "text-xs font-sans font-medium",
                    isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                  )}
                >
                  {item.subtitle}
                </p>
              )}
            </div>

            {/* Visual Media / Live Dial */}
            <div className="w-full h-64 overflow-hidden rounded-xl flex items-center justify-center p-4">
              {typeof item.media === "string" ? (
                <img
                  src={item.media}
                  alt={item.title}
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                item.media
              )}
            </div>

            <p
              className={cn(
                "text-xs leading-relaxed font-sans",
                isParchment ? "text-[#6E5540]" : "text-ivory/70"
              )}
            >
              {item.description}
            </p>

            {item.pills && (
              <div className="flex flex-wrap gap-2 pt-1">
                {item.pills.map((pill, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-[10px] font-mono px-2.5 py-0.5 rounded-full border",
                      isParchment
                        ? "border-[#B8873D]/30 bg-[#B8873D]/10 text-[#2D1B0E]"
                        : "border-[#D4A65A]/25 bg-[#D4A65A]/10 text-ivory/90"
                    )}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* ── Desktop / Tablet Split-Screen Pinned Showcase ── */}
      <div className="hidden md:grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Column: Sticky Pinned Visual Display */}
        <div
          className={cn(
            "sticky top-28 max-h-[75vh] h-[460px] lg:h-[500px] overflow-hidden rounded-3xl border flex items-center justify-center p-6 shadow-xl",
            isParchment
              ? "bg-[#FAF6F0] border-[#DFCBB5] shadow-[#B8873D]/5"
              : "bg-[#060D18]/80 border-[#D4A65A]/20 shadow-black/40"
          )}
        >
          {items.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              className="absolute inset-0 flex items-center justify-center p-6"
              initial={{ opacity: index === 0 ? 1 : 0 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                scale: activeIndex === index ? 1 : 0.94,
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {typeof item.media === "string" ? (
                <img
                  src={item.media}
                  alt={item.title}
                  className="aspect-4/3 h-full w-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {item.media}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Column: Natural Scrolling Track */}
        <div className="py-[15vh]">
          <div className="space-y-[32vh]">
            {items.map((item, index) => (
              <ScrollItem
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                setActive={setActiveIndex}
                variant={variant}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scroll01;
