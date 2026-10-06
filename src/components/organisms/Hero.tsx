"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { VedicClockReplica } from "./VedicClockReplica";
import { useVedicClock } from "@/hooks/useVedicClock";
import { DEFAULT_LOCATION } from "@/config";

const MONTH_HI = [
  'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
];

// ─────────────────────────────────────────────────────────────────────────────
// ⚡ LOAD SPEED CONTROLLER (Change this single variable to speed up / slow down)
// ─────────────────────────────────────────────────────────────────────────────
// 1.0 = Default Cinematic Pace (~3.3s total)
// 1.5 = Snappy & Fast (~2.2s total)
// 2.0 = Ultra Fast (~1.6s total)
// 0.5 = Slow & Majestic Pace
export const LOAD_SPEED = 0.5;

export function Hero() {
  const clockState = useVedicClock();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

    // ── INITIAL STATES ───────────────────────────────────────────────────────
    // Title is initially visible
    gsap.set(textRef.current, { opacity: 1, scale: 1, y: 0 });

    // Clock container and all pieces are initially hidden
    gsap.set(clockContainerRef.current, { opacity: 0 });
    gsap.set(earthRef.current, { opacity: 0 });
    gsap.set(frameRef.current, { opacity: 0, scale: 1.18, rotation: -8 });
    if (iconsRef.current?.children) {
      gsap.set(iconsRef.current.children, { opacity: 0, scale: 0, rotation: -45 });
    }
    gsap.set(archesRef.current, { opacity: 0, scale: 0.94 });
    gsap.set(progressRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(plaquesRef.current, { opacity: 0, scaleX: 0.65 });
    gsap.set(digitsRef.current, { opacity: 0, scale: 0.78 });
    gsap.set(
      [
        cornerTopLeftRef.current,
        cornerTopRightRef.current,
        cornerBottomLeftRef.current,
        cornerBottomRightRef.current,
      ],
      { opacity: 0, scale: 0.88, y: 16 }
    );

    // ── CINEMATIC AUTO-ASSEMBLY TIMELINE (Controlled by single LOAD_SPEED) ───
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // ⚡ Scale animation speed via LOAD_SPEED variable
    tl.timeScale(LOAD_SPEED);

    // ── PHASE 1: "वेदिक घड़ी" Title Display & Smooth Dissolve ──────────────
    tl.to(
      textRef.current,
      {
        opacity: 0,
        y: -38,
        scale: 0.94,
        duration: 0.7,
        ease: "power2.inOut",
      },
      0.8 // Holds title for 0.8s, then smoothly dissolves away
    );

    // ── PHASE 2: Clock Reveals & Auto-Assembles In Place ──────────────────────
    tl.to(clockContainerRef.current, { opacity: 1, duration: 0.5 }, 1.3);

    // 1. Earth illuminates in cosmic space (pure opacity, no CSS scale so WebGL canvas retains 100% true bounds)
    tl.to(earthRef.current, { opacity: 1, duration: 0.85 }, 1.4);
    tl.call(() => {
      window.dispatchEvent(new Event('resize'));
    }, undefined, 1.4);

    // 2. Brass Frame wraps securely around Earth
    tl.to(frameRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 0.95, ease: "power2.out" }, 1.55);

    // 3. 4 Medallions fly into their 4 cutout sockets
    if (iconsRef.current?.children) {
      tl.to(
        iconsRef.current.children,
        { opacity: 1, scale: 1, rotation: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.7)" },
        1.8
      );
    }

    // 4. 6 Arches bloom with Sanskrit script
    tl.to(archesRef.current, { opacity: 1, scale: 1, duration: 0.75, ease: "power2.out" }, 2.0);

    // 5. Karana and Yoga progress arc tracks expand
    tl.to(progressRef.current, { opacity: 1, scale: 1, duration: 0.7 }, 2.15);

    // 6. Side wings (Sunrise & Sunset) slide outward
    tl.to(plaquesRef.current, { opacity: 1, scaleX: 1, duration: 0.75, ease: "back.out(1.2)" }, 2.25);

    // 7. 4 Corner brass plaques glide into place
    tl.to(
      [
        cornerTopLeftRef.current,
        cornerTopRightRef.current,
        cornerBottomLeftRef.current,
        cornerBottomRightRef.current,
      ],
      { opacity: 1, scale: 1, y: 0, duration: 0.75, stagger: 0.08, ease: "power2.out" },
      2.35
    );

    // 8. Central 3D Golden Vedic Digits ignite live in full brilliance!
    tl.to(
      digitsRef.current,
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
      2.5
    );

    return () => {
      tl.kill();
    };
  }, []);

  const nowIst = clockState ? new Date(clockState.nowUtc.getTime() + (5 * 60 + 30) * 60 * 1000) : null;
  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  const time12 = nowIst
    ? `${((nowIst.getUTCHours() % 12) || 12)}:${pad2(nowIst.getUTCMinutes())} ${nowIst.getUTCHours() >= 12 ? 'PM' : 'AM'}`
    : '7:37 PM';

  const time24 = nowIst
    ? `${pad2(nowIst.getUTCHours())}:${pad2(nowIst.getUTCMinutes())}:${pad2(nowIst.getUTCSeconds())} IST`
    : '19:37:54 IST';

  const dateHi = nowIst
    ? `${nowIst.getUTCDate()} ${MONTH_HI[nowIst.getUTCMonth()]} ${nowIst.getUTCFullYear()}`
    : '6 अक्टूबर 2026';

  const varaMonth = clockState
    ? `${clockState.panchang.vara.nameHi} | ${clockState.lunarMonthHi}`
    : 'मङ्गलवार | आश्विन';

  const samvatYear = clockState ? clockState.vikramSamvatYear : 2083;

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

        {/* Bottom-Right: Singular Location (Ujjain / उज्जैन) */}
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
        {/* Step 1: Centered Majestic Bilingual Title (Reveals first, then dissolves) */}
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

        {/* Step 2: Centerpiece Vedic Clock Assembly ───────────────────────────── */}
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
