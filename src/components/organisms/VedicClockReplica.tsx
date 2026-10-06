"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { VedicClockState } from '@/models';
import { RASHI_ICONS } from '@/data/rashiAssets';
import { NAKSHATRA_ICONS } from '@/data/nakshatraAssets';
import { TITHI_ICONS } from '@/data/tithiAssets';

// Dynamic import for Earth3D (auto-rotating Three.js globe)
const Earth3D = dynamic(() => import('@/components/atoms/Earth3D').then((m) => m.Earth3D), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-full bg-[#040914] flex items-center justify-center">
      <img src="/assets/earth.jpg" alt="Earth" className="w-full h-full rounded-full object-cover opacity-85" />
    </div>
  ),
});

const DEITY_HI: Record<string, string> = {
  'Pushan': 'पूषा',
  'Pusha': 'पूषा',
  'Rudra': 'रुद्र',
  'Sarpa': 'सर्प',
  'Mitra': 'मित्र',
  'Pitrs': 'पितृ',
  'Pitri': 'पितृ',
  'Ashtavasus': 'अष्टवसु',
  'Varaha': 'वराह',
  'Vishvedevas': 'विश्वेदेवाः',
  'Brahma': 'ब्रह्मा',
  'Indra': 'इन्द्र',
  'Agni': 'अग्नि',
  'Nishachara': 'निशाचर',
  'Varuna': 'वरुण',
  'Aryaman': 'अर्यमन्',
  'Bhaga': 'भग',
  'Shiva': 'शिव',
  'Aja Ekapada': 'अजैकपाद',
  'Ahirbudhnya': 'अहिर्बुध्न्य',
  'Ashvins': 'अश्विनीकुमार',
  'Yama': 'यम',
  'Chandra': 'चन्द्र',
  'Aditi': 'अदिति',
  'Brihaspati': 'बृहस्पति',
  'Vishnu': 'विष्णु',
  'Surya': 'सूर्य',
};

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

interface VedicClockReplicaProps {
  size?: number; // Base reference size, defaults to 380
  state?: VedicClockState | null; // Live calculated Vedic Clock state
  frameRef?: React.RefObject<HTMLDivElement | null>;
  iconsRef?: React.RefObject<HTMLDivElement | null>;
  archesRef?: React.RefObject<SVGSVGElement | null>;
  plaquesRef?: React.RefObject<HTMLDivElement | null>;
  earthRef?: React.RefObject<HTMLDivElement | null>;
  digitsRef?: React.RefObject<HTMLDivElement | null>;
  progressRef?: React.RefObject<SVGGElement | null>;
}

// ── Math helpers direct from DialCore.tsx ──────────────────────────────────
function polar(cx: number, cy: number, r: number, ang: number): { x: number; y: number } {
  return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
}

function arcLine(cx: number, cy: number, r: number, a1: number, a2: number, sweepFlag: number = 1): string {
  const p1 = polar(cx, cy, r, a1);
  const p2 = polar(cx, cy, r, a2);
  const largeArc = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} ${sweepFlag} ${p2.x} ${p2.y}`;
}

export function VedicClockReplica({
  size = 380,
  state,
  frameRef,
  iconsRef,
  archesRef,
  plaquesRef,
  earthRef,
  digitsRef,
  progressRef,
}: VedicClockReplicaProps) {
  const half = size / 2;
  const scale = size / 600;

  // ── Derived dynamic values from live state (locked to Ujjain) ──────────
  const mm = state ? pad2(state.muhurtaInDay) : '19';
  const kk1 = state ? pad2(state.kalaInMuhurta) : '11';
  const kk2 = state ? pad2(state.kashthaInKala) : '16';

  const muhurtaDeityRaw = state?.muhurta?.deity ?? 'Pushan';
  const deityHi = DEITY_HI[muhurtaDeityRaw] || state?.muhurta?.deity || 'पूषा';
  const muhurtaLine1 = `${state?.muhurta?.devanagari ?? 'पुष्य'} · ${state?.muhurta?.name ?? 'Pushya'}`;
  const muhurtaLine2 = `देवता : ${deityHi}`;
  const muhurtaLine3 = state?.panchang?.tithi?.paksha === 'shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';

  const formatTimeIst = (d?: Date) =>
    d
      ? d.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })
      : '';

  const sunsetStr = state ? formatTimeIst(state.sunsetUtc) : '18:02';
  const sunriseStr = state ? formatTimeIst(state.sunriseUtc) : '06:13';

  // 4 Medallion Icons
  const nakshatraIcon =
    state?.panchang?.nakshatra?.index !== undefined
      ? NAKSHATRA_ICONS[state.panchang.nakshatra.index] || '/assets/nakshatra/Ashlesha-Nakshatra.webp'
      : '/assets/nakshatra/Ashlesha-Nakshatra.webp';

  const moonRashiIcon =
    state?.panchang?.moonRashi?.index !== undefined
      ? RASHI_ICONS[state.panchang.moonRashi.index] || '/assets/rashi/cancer.webp'
      : '/assets/rashi/cancer.webp';

  const sunRashiIcon =
    state?.panchang?.sunRashi?.index !== undefined
      ? RASHI_ICONS[state.panchang.sunRashi.index] || '/assets/rashi/virgo.webp'
      : '/assets/rashi/virgo.webp';

  const tithiIcon =
    state?.panchang?.tithi?.index !== undefined
      ? TITHI_ICONS[state.panchang.tithi.index] || '/assets/images/moon1.webp'
      : '/assets/images/moon1.webp';

  // 6 Arches Texts
  const nakshatraText = `नक्षत्र : ${state?.panchang?.nakshatra?.nameHi ?? 'आश्लेषा'}`;
  const karanaText = `करण : ${state?.panchang?.karana?.nameHi ?? 'बालव'}`;
  const tithiText = `तिथि : ${state?.panchang?.tithi?.nameHi ?? 'एकादशी'}`;
  const moonRashiText = `चन्द्र राशि : ${state?.panchang?.moonRashi?.nameHi ?? 'कर्क'}`;
  const yogaText = `योग : ${state?.panchang?.yoga?.nameHi ?? 'साध्य'}`;
  const sunRashiText = `सूर्य राशि : ${state?.panchang?.sunRashi?.nameHi ?? 'कन्या'}`;

  // Dynamic slot calculations
  const activeKaranaSlot = state?.panchang?.karana?.slot ?? 50; // 0..59
  const yogaPercentage = state ? Math.round((state.panchang?.yoga?.progressFraction ?? 0.57) * 100) : 57;
  const activeYogaSlot = Math.min(59, Math.round((yogaPercentage / 100) * 59));

  // ── Frame and Cutouts Math from DialCore.tsx ──────────────────────────────
  const scaledSize = size * 1.60;
  const frameW = scaledSize * (2528 / 1696);
  const frameH = scaledSize;
  const frameCenterY = half + 4 * scale;

  const topCutoutX = half * 0.748;
  const topCutoutY = half * 0.620;
  const bottomCutoutX = half * 0.747;
  const bottomCutoutY = half * 0.537;

  const rashiSize = Math.max(size * 0.22, 52 * Math.sqrt(scale));
  const rashiBgSize = rashiSize * 0.999;

  // 4 Cutout Coordinates
  const nakshatraX = half - topCutoutX - rashiBgSize / 2;
  const nakshatraY = frameCenterY - topCutoutY - rashiBgSize / 2;

  const tithiX = half + topCutoutX - rashiBgSize / 2;
  const tithiY = frameCenterY - topCutoutY - rashiBgSize / 2;

  const moonX = half - bottomCutoutX - rashiBgSize / 2;
  const moonY = frameCenterY + bottomCutoutY - rashiBgSize / 2;

  const sunX = half + bottomCutoutX - rashiBgSize / 2;
  const sunY = frameCenterY + bottomCutoutY - rashiBgSize / 2;

  // Earth 3D Globe Sizing
  const videoSize = scaledSize * 0.655;
  const videoLeft = (size - videoSize) / 2;
  const videoTop = (size - videoSize) / 2 + 4 * scale;

  // SVG Arch Sizing
  const svgSize = size * 2.00;
  const svgHalf = svgSize / 2;
  const svgOffset = (svgSize - size) / 2;

  // Radii with clear breathing room
  const r_text_bottom = half * 1.30;
  const r_text_top = half * 1.36;
  const ARCH_BUDGET_DEG = 42;

  // Karana Arc
  const karanaStartAngleDeg = 250;
  const karanaAngleSpan = 40;
  const r_karana_tick_start = r_text_top + 30 * scale;
  const r_karana_tick_end = r_text_top + 44 * scale;
  const r_karana_label = r_text_top + 58 * scale;
  const r_karana_mid = (r_karana_tick_start + r_karana_tick_end) / 2;

  const karanaTicks = [];
  for (let i = 0; i < 60; i++) {
    const angleDeg = karanaStartAngleDeg + (i / 59) * karanaAngleSpan;
    const angleRad = (angleDeg * Math.PI) / 180;
    karanaTicks.push({
      key: i,
      cx: svgHalf + r_karana_mid * Math.cos(angleRad),
      cy: svgHalf + r_karana_mid * Math.sin(angleRad),
      rotation: angleDeg + 90,
      isActive: i <= activeKaranaSlot,
      isCurrent: i === activeKaranaSlot,
    });
  }

  // Yoga Arc
  const yogaStartAngleDeg = 110;
  const yogaAngleSpan = 40;
  const r_yoga_tick_start = r_text_bottom + 30 * scale;
  const r_yoga_tick_end = r_text_bottom + 44 * scale;
  const r_yoga_label = r_text_bottom + 62 * scale;
  const r_yoga_mid = (r_yoga_tick_start + r_yoga_tick_end) / 2;

  const yogaTicks = [];
  for (let i = 0; i < 60; i++) {
    const angleDeg = yogaStartAngleDeg - (i / 59) * yogaAngleSpan;
    const angleRad = (angleDeg * Math.PI) / 180;
    yogaTicks.push({
      key: i,
      cx: svgHalf + r_yoga_mid * Math.cos(angleRad),
      cy: svgHalf + r_yoga_mid * Math.sin(angleRad),
      rotation: angleDeg + 90,
      isActive: i <= activeYogaSlot,
      isCurrent: i === activeYogaSlot,
    });
  }

  // Curved word renderer - exactly centered on both radial and angular axes
  const renderCurvedWords = (
    text: string,
    cx: number,
    cy: number,
    r: number,
    midAngleDeg: number,
    isTopHalf: boolean = false,
    showBg: boolean = false,
    fontSizeOverride?: number,
    maxSpanDeg?: number
  ) => {
    const getVisualLength = (str: string) => {
      const baseStr = str.replace(/[\u0901-\u0903\u093E-\u094C\u094E-\u0954\u0962\u0963\u094D]/g, '');
      const halants = (str.match(/\u094D/g) || []).length;
      let len = baseStr.length - halants;
      len -= (str.match(/:/g) || []).length * 0.4;
      return Math.max(len, 0.1);
    };

    const words = text.split(' ');
    const spaceWidth = 0.7;
    let visualTotalChars = 0;
    const wordPositions: number[] = [];

    let currentVisualIndex = 0;
    words.forEach((w) => {
      const visualWordLen = getVisualLength(w);
      wordPositions.push(currentVisualIndex + visualWordLen / 2);
      currentVisualIndex += visualWordLen + spaceWidth;
    });
    visualTotalChars = currentVisualIndex - spaceWidth;

    const degreesPerVisualChar = 2.8;
    const paddingDegrees = 4;
    const budgetDeg = maxSpanDeg ?? 50;
    const span = Math.min(visualTotalChars * degreesPerVisualChar + paddingDegrees, budgetDeg);

    // Both text and dark arch pill share the EXACT same radius for perfect radial centering
    const effectiveR = r;
    const bgRadius = r;

    const startAngleDeg = isTopHalf ? midAngleDeg - span / 2 : midAngleDeg + span / 2;
    const endAngleDeg = isTopHalf ? midAngleDeg + span / 2 : midAngleDeg - span / 2;
    const isIncreasing = endAngleDeg > startAngleDeg;
    const padding = 2.0;
    const paddedStart = startAngleDeg + (isIncreasing ? -padding : padding);
    const paddedEnd = endAngleDeg + (isIncreasing ? padding : -padding);
    const sweep = isIncreasing ? 1 : 0;

    const bgPath = showBg
      ? arcLine(cx, cy, bgRadius, (paddedStart * Math.PI) / 180, (paddedEnd * Math.PI) / 180, sweep)
      : null;

    return (
      <g key={`${text}-${startAngleDeg}`}>
        {bgPath && (
          <path
            d={bgPath}
            stroke="rgba(0, 0, 0, 0.88)"
            strokeWidth={46 * scale}
            strokeLinecap="round"
            fill="none"
          />
        )}
        {words.map((word, i) => {
          const centerVisualIndex = wordPositions ? wordPositions[i] : 0;
          const t = visualTotalChars > 0 ? centerVisualIndex / visualTotalChars : 0.5;

          const angleDeg = startAngleDeg + t * (endAngleDeg - startAngleDeg);
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = cx + effectiveR * Math.cos(angleRad);
          const y = cy + effectiveR * Math.sin(angleRad);
          const rotation = isTopHalf ? angleDeg + 90 : angleDeg - 90;

          return (
            <text
              key={i}
              x={x}
              y={y}
              transform={`rotate(${rotation}, ${x}, ${y})`}
              fill="#E8B94B"
              fontSize={fontSizeOverride || 26 * scale}
              fontWeight="800"
              fontFamily="var(--font-hindi), 'Noto Sans Devanagari', sans-serif"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.95)) drop-shadow(0 0 3px rgba(232,185,75,0.3))",
              }}
            >
              {word}
            </text>
          );
        })}
      </g>
    );
  };

  // Capsule offsets for side wings - exactly centered on the horizontal midline
  const capsuleOffset = size * 0.72;
  const capWidth = 180 * scale;
  const capHeight = 120 * scale;
  const capTop = half + 4 * scale - capHeight / 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Layer 1: 3D Rotating Earth Sphere (Dark Realistic NASA Blue Marble) ─ */}
      <div
        ref={earthRef}
        style={{
          position: 'absolute',
          width: videoSize,
          height: videoSize,
          left: videoLeft,
          top: videoTop,
          borderRadius: videoSize / 2,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          zIndex: 1,
        }}
      >
        <Earth3D size={videoSize} />
      </div>

      {/* ── Layer 2: Ornate Brass Clock Frame (OnlyFrame.webp) ───────────────── */}
      <div
        ref={frameRef}
        style={{
          position: 'absolute',
          width: frameW,
          height: frameH,
          left: (size - frameW) / 2,
          top: (size - frameH) / 2 + 10 * scale,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      >
        <img
          src="/assets/images/OnlyFrame.webp"
          alt="Brass Vedic Clock Frame"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* ── Layer 3: 4 Diagonal Cutout Medallions ───────────────────────────── */}
      <div ref={iconsRef} style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
        {/* Top-Left: Nakshatra Cutout */}
        <div
          style={{
            position: 'absolute',
            left: nakshatraX,
            top: nakshatraY,
            width: rashiBgSize,
            height: rashiBgSize,
            borderRadius: '50%',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgba(0,0,0,0.9) inset',
          }}
        >
          <img
            src={nakshatraIcon}
            alt="Nakshatra"
            style={{ width: '75%', height: '75%', objectFit: 'contain' }}
          />
        </div>

        {/* Top-Right: Tithi (Moon) Cutout */}
        <div
          style={{
            position: 'absolute',
            left: tithiX,
            top: tithiY,
            width: rashiBgSize,
            height: rashiBgSize,
            borderRadius: '50%',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgba(0,0,0,0.9) inset',
          }}
        >
          <img
            src={tithiIcon}
            alt="Moon Tithi"
            style={{ width: '84%', height: '84%', objectFit: 'contain' }}
          />
        </div>

        {/* Bottom-Left: Chandra Rashi Cutout */}
        <div
          style={{
            position: 'absolute',
            left: moonX,
            top: moonY,
            width: rashiBgSize,
            height: rashiBgSize,
            borderRadius: '50%',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgba(0,0,0,0.9) inset',
          }}
        >
          <img
            src={moonRashiIcon}
            alt="Chandra Rashi"
            style={{ width: '75%', height: '75%', objectFit: 'contain' }}
          />
        </div>

        {/* Bottom-Right: Surya Rashi Cutout */}
        <div
          style={{
            position: 'absolute',
            left: sunX,
            top: sunY,
            width: rashiBgSize,
            height: rashiBgSize,
            borderRadius: '50%',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgba(0,0,0,0.9) inset',
          }}
        >
          <img
            src={sunRashiIcon}
            alt="Surya Rashi"
            style={{ width: '75%', height: '75%', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* ── Layer 4: Six Arches + Progress Ticks (Pure SVG from DialCore.tsx) ── */}
      <svg
        ref={archesRef}
        width={svgSize}
        height={svgSize}
        style={{
          position: 'absolute',
          left: -svgOffset,
          top: -svgOffset,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        {/* 1. Top-Left: Nakshatra Arch */}
        {renderCurvedWords(nakshatraText, svgHalf, svgHalf, r_text_top, 225, true, true, undefined, ARCH_BUDGET_DEG)}

        {/* 2. Top-Center: Karana Arch */}
        {renderCurvedWords(karanaText, svgHalf, svgHalf, r_text_top, 270, true, true, undefined, ARCH_BUDGET_DEG)}

        {/* 3. Top-Right: Tithi Arch */}
        {renderCurvedWords(tithiText, svgHalf, svgHalf, r_text_top, 315, true, true, undefined, ARCH_BUDGET_DEG)}

        {/* 4. Bottom-Left: Moon Rashi Arch */}
        {renderCurvedWords(moonRashiText, svgHalf, svgHalf, r_text_bottom, 135, false, true, undefined, ARCH_BUDGET_DEG)}

        {/* 5. Bottom-Center: Yoga Arch */}
        {renderCurvedWords(yogaText, svgHalf, svgHalf, r_text_bottom, 90, false, true, undefined, ARCH_BUDGET_DEG)}

        {/* 6. Bottom-Right: Sun Rashi Arch */}
        {renderCurvedWords(sunRashiText, svgHalf, svgHalf, r_text_bottom, 45, false, true, undefined, ARCH_BUDGET_DEG)}

        {/* Floating Percentage / Progress Bars */}
        <g ref={progressRef}>
          {/* Karana 60 Ticks */}
          {karanaTicks.map((tick) => (
            <path
              key={tick.key}
              transform={`translate(${tick.cx}, ${tick.cy}) rotate(${tick.rotation})`}
              d={`M 0 ${7 * scale} C ${-3.5 * scale} ${1.4 * scale}, ${-4.2 * scale} ${-4.2 * scale}, 0 ${-7 * scale} C ${4.2 * scale} ${-4.2 * scale}, ${3.5 * scale} ${1.4 * scale}, 0 ${7 * scale} Z`}
              fill={tick.isActive ? '#FF9933' : 'rgba(255, 255, 255, 0.15)'}
              stroke={tick.isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.25)'}
              strokeWidth={0.8 * scale}
            />
          ))}

          {/* Karana Active Slot Label */}
          {renderCurvedWords(`${activeKaranaSlot}/60`, svgHalf, svgHalf, r_karana_label + 15 * scale, 284, true, false, 18 * scale)}

          {/* Yoga 60 Ticks */}
          {yogaTicks.map((tick) => (
            <path
              key={tick.key}
              transform={`translate(${tick.cx}, ${tick.cy}) rotate(${tick.rotation})`}
              d={`M 0 ${7 * scale} C ${-3.5 * scale} ${1.4 * scale}, ${-4.2 * scale} ${-4.2 * scale}, 0 ${-7 * scale} C ${4.2 * scale} ${-4.2 * scale}, ${3.5 * scale} ${1.4 * scale}, 0 ${7 * scale} Z`}
              fill={tick.isActive ? '#FF9933' : 'rgba(255, 255, 255, 0.15)'}
              stroke={tick.isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.25)'}
              strokeWidth={0.8 * scale}
            />
          ))}

          {/* Yoga Percentage Label */}
          {renderCurvedWords(`${yogaPercentage}/100`, svgHalf, svgHalf, r_yoga_label, 88, false, false, 18 * scale)}
        </g>
      </svg>

      {/* ── Layer 5: Real 3D Gold Marble Digits Over Rotating Globe ───────── */}
      <div
        ref={digitsRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 6,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translateY(${58 * scale}px)`,
          }}
        >
          {/* mm : kk1 : kk2 live calculated digits port */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: `${4 * scale}px` }}>
            {/* mm - मुहूर्त */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', height: `${72 * scale}px` }}>
                <img src={`/assets/numbers/${mm[0]}.webp`} alt={mm[0]} style={{ height: '100%', objectFit: 'contain' }} />
                <img src={`/assets/numbers/${mm[1]}.webp`} alt={mm[1]} style={{ height: '100%', objectFit: 'contain' }} />
              </div>
              <span
                style={{
                  fontSize: `${24 * scale}px`,
                  color: '#E8B94B',
                  fontWeight: 800,
                  fontFamily: "var(--font-hindi), 'Noto Sans Devanagari', sans-serif",
                  marginTop: `${6 * scale}px`,
                  letterSpacing: `${1.5 * scale}px`,
                  textShadow: '0 1.5px 3px rgba(0, 0, 0, 0.85)',
                }}
              >
                मुहूर्त
              </span>
            </div>

            <div style={{ height: `${72 * scale}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: `${28 * scale}px` }}>
              <img src="/assets/numbers/colon.webp" alt=":" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            </div>

            {/* kk1 - कला */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', height: `${72 * scale}px` }}>
                <img src={`/assets/numbers/${kk1[0]}.webp`} alt={kk1[0]} style={{ height: '100%', objectFit: 'contain' }} />
                <img src={`/assets/numbers/${kk1[1]}.webp`} alt={kk1[1]} style={{ height: '100%', objectFit: 'contain' }} />
              </div>
              <span
                style={{
                  fontSize: `${24 * scale}px`,
                  color: '#E8B94B',
                  fontWeight: 800,
                  fontFamily: "var(--font-hindi), 'Noto Sans Devanagari', sans-serif",
                  marginTop: `${6 * scale}px`,
                  letterSpacing: `${1.5 * scale}px`,
                  textShadow: '0 1.5px 3px rgba(0, 0, 0, 0.85)',
                }}
              >
                कला
              </span>
            </div>

            <div style={{ height: `${72 * scale}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: `${28 * scale}px` }}>
              <img src="/assets/numbers/colon.webp" alt=":" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            </div>

            {/* kk2 - काष्ठा */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', height: `${72 * scale}px` }}>
                <img src={`/assets/numbers/${kk2[0]}.webp`} alt={kk2[0]} style={{ height: '100%', objectFit: 'contain' }} />
                <img src={`/assets/numbers/${kk2[1]}.webp`} alt={kk2[1]} style={{ height: '100%', objectFit: 'contain' }} />
              </div>
              <span
                style={{
                  fontSize: `${24 * scale}px`,
                  color: '#E8B94B',
                  fontWeight: 800,
                  fontFamily: "var(--font-hindi), 'Noto Sans Devanagari', sans-serif",
                  marginTop: `${6 * scale}px`,
                  letterSpacing: `${1.5 * scale}px`,
                  textShadow: '0 1.5px 3px rgba(0, 0, 0, 0.85)',
                }}
              >
                काष्ठा
              </span>
            </div>
          </div>

          {/* Subtitle details direct 1:1 port of DialCore EngravedText matching Image 1 */}
          <div
            style={{
              marginTop: `${30 * scale}px`,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${2 * scale}px`,
            }}
          >
            <span
              style={{
                fontSize: `${18 * scale}px`,
                fontWeight: 700,
                color: '#E8B94B',
                fontFamily: "var(--font-hindi), 'Noto Sans Devanagari', sans-serif",
                letterSpacing: `${2 * scale}px`,
                textShadow: '0 2px 2px rgba(0, 0, 0, 0.95), 0 0 16px rgba(255, 160, 0, 0.75)',
              }}
            >
              {muhurtaLine1}
            </span>
            <span
              style={{
                fontSize: `${18 * scale}px`,
                fontWeight: 700,
                color: '#E8B94B',
                fontFamily: "var(--font-hindi), 'Noto Sans Devanagari', sans-serif",
                letterSpacing: `${2 * scale}px`,
                textShadow: '0 2px 2px rgba(0, 0, 0, 0.95), 0 0 16px rgba(255, 160, 0, 0.75)',
              }}
            >
              {muhurtaLine2}
            </span>
            <span
              style={{
                fontSize: `${18 * scale}px`,
                fontWeight: 700,
                color: '#E8B94B',
                fontFamily: "var(--font-hindi), 'Noto Sans Devanagari', sans-serif",
                letterSpacing: `${2 * scale}px`,
                textShadow: '0 2px 2px rgba(0, 0, 0, 0.95), 0 0 16px rgba(255, 160, 0, 0.75)',
              }}
            >
              {muhurtaLine3}
            </span>
          </div>
        </div>
      </div>

      {/* ── Layer 6: Side Capsule Plaques (Sunset & Sunrise) ─────────────────── */}
      <div
        ref={plaquesRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 7,
        }}
      >
        {/* Left Plaque (Sunset / 18:02 / सूर्यास्त) */}
        <div
          style={{
            position: 'absolute',
            left: half - capsuleOffset - capWidth / 2,
            top: capTop,
            width: capWidth,
            height: capHeight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: `${30 * scale}px`,
              fontWeight: 800,
              color: '#FFF5D1',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.98)) drop-shadow(0 0 14px rgba(255,180,0,0.8))',
              fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
            }}
          >
            {sunsetStr}
          </span>
          <span
            style={{
              fontSize: `${20 * scale}px`,
              fontWeight: 800,
              color: '#D4A65A',
              letterSpacing: '1.5px',
              fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
              marginTop: `${3 * scale}px`,
              textShadow: '0 2px 4px rgba(0,0,0,0.98)',
            }}
          >
            सूर्यास्त
          </span>
        </div>

        {/* Right Plaque (Sunrise / 06:13 / सूर्योदय) */}
        <div
          style={{
            position: 'absolute',
            left: half + capsuleOffset - capWidth / 2,
            top: capTop, // Identical vertical placement to Sunset
            width: capWidth,
            height: capHeight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: `${30 * scale}px`,
              fontWeight: 800,
              color: '#FFF5D1',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.98)) drop-shadow(0 0 14px rgba(255,180,0,0.8))',
              fontFamily: "var(--font-hindi), var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
            }}
          >
            {sunriseStr}
          </span>
          <span
            style={{
              fontSize: `${20 * scale}px`,
              fontWeight: 800,
              color: '#D4A65A',
              letterSpacing: '1.5px',
              fontFamily: 'var(--font-hindi)',
              marginTop: `${3 * scale}px`,
              textShadow: '0 2px 4px rgba(0,0,0,0.98)',
            }}
          >
            सूर्योदय
          </span>
        </div>
      </div>
    </div>
  );
}
