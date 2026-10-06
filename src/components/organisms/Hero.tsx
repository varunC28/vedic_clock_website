"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VedicClockReplica } from "./VedicClockReplica";
import { useVedicClock } from "@/hooks/useVedicClock";
import { DEFAULT_LOCATION } from "@/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MONTH_HI = [
  'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
];

export function Hero() {
  const clockState = useVedicClock();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const clockContainerRef = useRef<HTMLDivElement>(null);

  // Clock component refs
  const frameRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const archesRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<SVGGElement>(null);
  const plaquesRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);

  // 4 Corner Boxes refs
  const cornerTopLeftRef = useRef<HTMLDivElement>(null);
  const cornerTopRightRef = useRef<HTMLDivElement>(null);
  const cornerBottomLeftRef = useRef<HTMLDivElement>(null);
  const cornerBottomRightRef = useRef<HTMLDivElement>(null);

  // Calibrated size so entire clock fits in full viewport height with comfortable margins
  const [clockSize, setClockSize] = useState(360);

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const idealFromHeight = Math.floor(h * 0.58);
      if (w < 640) {
        setClockSize(Math.min(270, idealFromHeight));
      } else if (w < 1024) {
        setClockSize(Math.min(340, idealFromHeight));
      } else if (w < 1440) {
        setClockSize(Math.min(420, idealFromHeight));
      } else {
        setClockSize(Math.min(460, idealFromHeight));
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // ── SCENE 0 INITIAL STATE ────────────────────────────────────────────────
    // At scroll = 0: ONLY Cosmic Background + Center Bold Title + Scroll Prompt
    gsap.set(clockContainerRef.current, { opacity: 0 });
    gsap.set(earthRef.current, { opacity: 0, scale: 1 });
    gsap.set(frameRef.current, { opacity: 0, scale: 1 });
    if (iconsRef.current?.children) {
      gsap.set(iconsRef.current.children, { opacity: 0, scale: 0, rotation: -90 });
    }
    gsap.set(archesRef.current, { opacity: 0, scale: 0.92 });
    gsap.set(progressRef.current, { opacity: 0 });
    gsap.set(plaquesRef.current, { opacity: 0, y: 15 });
    gsap.set(digitsRef.current, { opacity: 0, scale: 0.85 });

    // 4 Corner boxes hidden in Scene 0
    gsap.set(
      [
        cornerTopLeftRef.current,
        cornerTopRightRef.current,
        cornerBottomLeftRef.current,
        cornerBottomRightRef.current,
      ],
      { opacity: 0, scale: 0.88 }
    );

    // ── REORDERED WAKING UP SCROLL TIMELINE ───────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=320%",
        scrub: 1.2,
        pin: true,
      },
    });

    // 0. Scroll prompt fades out immediately on first scroll touch
    tl.to(
      scrollPromptRef.current,
      {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: "power2.in",
      },
      0
    );

    // 1. Text smoothly ascends towards the top and dissolves cleanly
    tl.to(
      textRef.current,
      {
        y: "-44vh",
        scale: 0.32,
        opacity: 0,
        duration: 1.6,
        ease: "power2.inOut",
      },
      0
    );

    // Clock container reveals
    tl.to(
      clockContainerRef.current,
      {
        opacity: 1,
        duration: 0.6,
      },
      0.6
    );

    // 2. Earth starts at MAX SIZE (no zooming) and smoothly fades in to come live
    tl.to(
      earthRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
      },
      0.8
    );

    // 3. Brass Frame wraps around the Earth at full size!
    tl.to(
      frameRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
      },
      1.8
    );

    // 4. 4 Medallion Icons fly into their diagonal cutouts
    if (iconsRef.current?.children) {
      tl.to(
        iconsRef.current.children,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
        },
        3.0
      );
    }

    // 5. The 6 Arches bloom with Sanskrit text
    tl.to(
      archesRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
      },
      4.2
    );

    // 6. Floating percentage / progress bars appear (Karana 51/60, Yoga 57/100)
    tl.to(
      progressRef.current,
      {
        opacity: 1,
        duration: 1.5,
        ease: "power1.out",
      },
      5.2
    );

    // 7. Sunrise / Sunset text appears in side wings
    tl.to(
      plaquesRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power1.out",
      },
      6.0
    );

    // 8. 4 Corner asset boxes appear
    tl.to(
      [
        cornerTopLeftRef.current,
        cornerTopRightRef.current,
        cornerBottomLeftRef.current,
        cornerBottomRightRef.current,
      ],
      {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        stagger: 0.1,
        ease: "power2.out",
      },
      6.8
    );

    // 9. Central Vedic gold digits ignite over the Earth!
    tl.to(
      digitsRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
      },
      7.6
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const nowIst = clockState ? new Date(clockState.nowUtc.getTime() + (5 * 60 + 30) * 60 * 1000) : null;
  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  const time12 = nowIst
    ? `${((nowIst.getUTCHours() % 12) || 12)}:${pad2(nowIst.getUTCMinutes())} ${nowIst.getUTCHours() >= 12 ? 'PM' : 'AM'}`
    : '7:37 PM';

  const time24 = nowIst
    ? `${pad2(nowIst.getUTCHours())}:${pad2(nowIst.getUTCMinutes())}:${pad2(nowIst.getUTCSeconds())} IST`
    : '19:37:00 IST';

  const dateHi = nowIst
    ? `${nowIst.getUTCDate()} ${MONTH_HI[nowIst.getUTCMonth()]} ${nowIst.getUTCFullYear()}`
    : '6 अक्टूबर 2026';

  const varaMonth = clockState
    ? `${clockState.panchang?.vara?.nameHi ?? 'मंगलवार'} | ${clockState.lunarMonthHi ?? 'आश्विन'}`
    : 'मंगलवार | आश्विन';

  const samvatYear = clockState?.vikramSamvatYear ?? 2083;

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-[#040814] overflow-hidden select-none"
    >
      {/* ── Fixed Cosmic Background (Image 1) ────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{
          backgroundImage: "url('/assets/mainbg.webp')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* ── 4 Symmetrical Corner Brass Plaques ── */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {/* Top-Left: Time (12h / 24h IST) */}
        <div
          ref={cornerTopLeftRef}
          className="absolute top-[88px] sm:top-[92px] lg:top-[96px] left-8 sm:left-14 lg:left-20 w-[270px] sm:w-[305px] lg:w-[335px] h-[130px] sm:h-[150px] lg:h-[165px] flex items-center justify-center text-center"
        >
          <img
            src="/assets/images/corner_assest.webp"
            alt="Plaque Frame"
            className="absolute inset-0 w-full h-full object-fill filter drop-shadow-2xl"
          />
          <div className="relative z-10 flex flex-col items-center justify-center px-8">
            <span
              className="text-base sm:text-lg lg:text-xl text-[#FFF5D1]"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.98)) drop-shadow(0 0 14px rgba(255,180,0,0.8))",
                fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
                fontWeight: 800,
              }}
            >
              {time12}
            </span>
            <span
              className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#E8B94B] tracking-wider uppercase mt-1.5"
              style={{
                filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.95))",
                fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
                fontWeight: 700,
              }}
            >
              {time24}
            </span>
          </div>
        </div>

        {/* Top-Right: Hindu Date */}
        <div
          ref={cornerTopRightRef}
          className="absolute top-[88px] sm:top-[92px] lg:top-[96px] right-8 sm:left-auto sm:right-14 lg:right-20 w-[270px] sm:w-[305px] lg:w-[335px] h-[130px] sm:h-[150px] lg:h-[165px] flex items-center justify-center text-center"
        >
          <img
            src="/assets/images/corner_assest.webp"
            alt="Plaque Frame"
            className="absolute inset-0 w-full h-full object-fill filter drop-shadow-2xl"
          />
          <div className="relative z-10 flex flex-col items-center justify-center px-8">
            <span
              className="text-base sm:text-lg lg:text-xl text-[#FFF5D1]"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.98)) drop-shadow(0 0 14px rgba(255,180,0,0.8))",
                fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
                fontWeight: 800,
              }}
            >
              {dateHi}
            </span>
            <span
              className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#E8B94B] tracking-wider mt-1.5"
              style={{
                filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.95))",
                fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
                fontWeight: 700,
              }}
            >
              {varaMonth}
            </span>
          </div>
        </div>

        {/* Bottom-Left: Vikram Samvat */}
        <div
          ref={cornerBottomLeftRef}
          className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-8 sm:left-14 lg:left-20 w-[270px] sm:w-[305px] lg:w-[335px] h-[130px] sm:h-[150px] lg:h-[165px] flex items-center justify-center text-center"
        >
          <img
            src="/assets/images/corner_assest.webp"
            alt="Plaque Frame"
            className="absolute inset-0 w-full h-full object-fill filter drop-shadow-2xl"
          />
          <div className="relative z-10 flex flex-col items-center justify-center px-8">
            <span
              className="text-base sm:text-lg lg:text-xl text-[#FFF5D1]"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.98)) drop-shadow(0 0 14px rgba(255,180,0,0.8))",
                fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
                fontWeight: 800,
              }}
            >
              {samvatYear}
            </span>
            <span
              className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#E8B94B] tracking-wider mt-1.5"
              style={{
                filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.95))",
                fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
                fontWeight: 700,
              }}
            >
              विक्रम संवत्
            </span>
          </div>
        </div>

        {/* Bottom-Right: Singular Location */}
        <div
          ref={cornerBottomRightRef}
          className="absolute bottom-8 sm:bottom-12 lg:bottom-16 right-8 sm:left-auto sm:right-14 lg:right-20 w-[270px] sm:w-[305px] lg:w-[335px] h-[130px] sm:h-[150px] lg:h-[165px] flex items-center justify-center text-center"
        >
          <img
            src="/assets/images/corner_assest.webp"
            alt="Plaque Frame"
            className="absolute inset-0 w-full h-full object-fill filter drop-shadow-2xl"
          />
          <div className="relative z-10 flex flex-col items-center justify-center px-8">
            <span
              className="text-base sm:text-lg lg:text-xl text-[#FFF5D1]"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.98)) drop-shadow(0 0 14px rgba(255,180,0,0.8))",
                fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
                fontWeight: 800,
              }}
            >
              {DEFAULT_LOCATION.cityHi}
            </span>
            <span
              className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#E8B94B] tracking-wider uppercase mt-1.5"
              style={{
                filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.95))",
                fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
                fontWeight: 700,
              }}
            >
              {`${DEFAULT_LOCATION.latitude.toFixed(2)}°N · ${DEFAULT_LOCATION.longitude.toFixed(2)}°E`}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Viewport Center Area ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        {/* SCENE 0: Centered Majestic Bilingual Title */}
        <div
          ref={textRef}
          className="absolute z-30 flex flex-col items-center text-center origin-center pointer-events-none px-4"
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-hindi text-[#FBF5E7] font-bold tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            वेदिक घड़ी
          </h2>
          <div className="w-36 sm:w-56 h-0.5 bg-gradient-to-r from-transparent via-[#D4A65A] to-transparent opacity-75 my-4 sm:my-6" />
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#D4A65A] tracking-[0.25em] uppercase whitespace-nowrap drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            The Vedic Clock
          </h1>
        </div>

        {/* SCENE 0: Animated Scroll Prompt Indicator */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2.5 pointer-events-none z-30"
        >
          <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.35em] text-[#D4A65A]/85 drop-shadow-md">
            Scroll to Awaken
          </span>
          <div className="w-5 h-8 rounded-full border border-[#D4A65A]/50 flex items-start justify-center p-1 shadow-[0_0_12px_rgba(212,166,90,0.2)]">
            <div className="w-1 h-2 rounded-full bg-[#D4A65A] animate-bounce" />
          </div>
        </div>

        {/* ── Centerpiece Vedic Clock Assembly ───────────────────────────────── */}
        <div ref={clockContainerRef} className="relative flex items-center justify-center mt-3 sm:mt-5">
          <VedicClockReplica
            size={clockSize}
            state={clockState}
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
    </div>
  );
}
