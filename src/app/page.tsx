import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { BilingualPill } from "@/components/atoms/BilingualPill";
import { BrassButton } from "@/components/atoms/BrassButton";
import { IconMedallion } from "@/components/atoms/IconMedallion";
import { GlowingDigit } from "@/components/atoms/GlowingDigit";
import { ProgressArc } from "@/components/atoms/ProgressArc";
import { OrnateLabel } from "@/components/atoms/OrnateLabel";
import { NavItem } from "@/components/molecules/NavItem";
import { DataPlaque } from "@/components/molecules/DataPlaque";
import { FeatureBulletBlock } from "@/components/molecules/FeatureBulletBlock";
import { ZodiacMedallion } from "@/components/molecules/ZodiacMedallion";
import { ProcessStepCard } from "@/components/molecules/ProcessStepCard";
import { PanchangTableRow } from "@/components/molecules/PanchangTableRow";
import { AnnotatedCallout } from "@/components/molecules/AnnotatedCallout";
import { InstitutionCard } from "@/components/molecules/InstitutionCard";
import { QuoteCard } from "@/components/molecules/QuoteCard";
import { CtaCard } from "@/components/molecules/CtaCard";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Hero } from "@/components/organisms/Hero";
import { MUHURTAS } from "@/data/muhurtas";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main className="flex min-h-screen flex-col items-center pt-24 pb-16 px-4 sm:px-8">
        <div className="w-full max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-3xl sm:text-4xl font-serif text-brass">
            Vedic Clock Component Sandbox
          </h1>
          <p className="text-inkMuted text-sm sm:text-base">
            Reviewing components across breakpoints (375px to 1440px+).
          </p>
        </div>

        {/* Atoms Section */}
        <div className="space-y-12">
          <h2 className="text-xl sm:text-2xl font-sans font-semibold text-ivory border-b border-white/10 pb-4">
            Phase 1: Atoms
          </h2>

          {/* A8: Section Eyebrow Label */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                A8. Section Eyebrow Label
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Responsive typography. Stacks/wraps gracefully on tiny screens.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex items-center justify-center">
                <SectionEyebrow en="The Idea" hi="विचार" variant="dark" />
              </div>
              <div className="p-8 bg-parchment rounded-lg border border-black/5 flex items-center justify-center">
                <SectionEyebrow en="The Idea" hi="विचार" variant="light" />
              </div>
            </div>
          </div>

          {/* A1: Gold Flourish Divider */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                A1. Gold Flourish Divider
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Pure SVG styling. Always fills container width, perfect center.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <GoldDivider variant="dark" />
              </div>
              <div className="p-12 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center text-center space-y-6">
                <SectionEyebrow en="Heritage" hi="विरासत" variant="dark" />
                <GoldDivider variant="dark" className="max-w-md mx-auto" />
                <h4 className="font-serif text-2xl text-ivory">The Ancient Science</h4>
              </div>
              <div className="p-8 bg-parchment rounded-lg border border-black/5">
                <GoldDivider variant="light" />
              </div>
            </div>
          </div>

          {/* A2: Bilingual Pill Badge */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                A2. Bilingual Pill Badge
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Inline concept tags. Never wraps to multiple lines.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <div className="flex flex-wrap gap-4 justify-center">
                  <BilingualPill en="Muhurta" hi="मुहूर्त" size="md" variant="dark" />
                  <BilingualPill en="Tithi" hi="तिथि" size="sm" variant="dark" />
                  <BilingualPill en="Nakshatra" hi="नक्षत्र" size="sm" variant="dark" />
                </div>
              </div>
              <div className="p-8 bg-parchment rounded-lg border border-black/5">
                <div className="flex flex-wrap gap-4 justify-center">
                  <BilingualPill en="Yoga" hi="योग" size="md" variant="light" />
                  <BilingualPill en="Karana" hi="करण" size="sm" variant="light" />
                </div>
              </div>
              <div className="p-8 bg-deep-indigo rounded-lg border border-white/5">
                <div className="flex flex-wrap gap-4 justify-center">
                  <BilingualPill en="Vara" hi="वार" size="md" variant="outline" />
                </div>
              </div>
            </div>
          </div>

          {/* A3: Brass Button */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                A3. Brass Button
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Primary CTA. Brass gradient, ambient glow, hover intensify, active press-in.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-4 uppercase tracking-wider">Primary — sm / md / lg</p>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <BrassButton en="Submit" hi="भेजें" size="sm" />
                  <BrassButton en="Enquire Now" hi="पूछें" size="md" />
                  <BrassButton en="Explore Heritage" hi="विरासत" size="lg" />
                </div>
              </div>
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-4 uppercase tracking-wider">Ghost variant</p>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <BrassButton en="Learn More" size="md" variant="ghost" />
                  <BrassButton en="View Details" hi="विवरण" size="md" variant="ghost" />
                </div>
              </div>
              <div className="p-8 bg-parchment rounded-lg border border-black/5">
                <p className="text-xs text-deep-bronze/60 mb-4 uppercase tracking-wider">On parchment</p>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <BrassButton en="Enquire Now" hi="पूछें" size="md" />
                </div>
              </div>
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-4 uppercase tracking-wider">Disabled</p>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <BrassButton en="Submit" hi="भेजें" size="md" disabled />
                  <BrassButton en="Learn More" size="md" variant="ghost" disabled />
                </div>
              </div>
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-4 uppercase tracking-wider">English only (no Hindi)</p>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <BrassButton en="Learn More" size="md" />
                  <BrassButton en="Get Started" size="lg" />
                </div>
              </div>
            </div>
          </div>

          {/* A4: Icon Medallion Frame */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                A4. Icon Medallion Frame
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Brass coin-frame for mounting icons, planets, and concepts. Pure CSS layers.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">Sizes: sm / md / lg</p>
                <div className="flex flex-wrap gap-6 items-end justify-center">
                  <IconMedallion src="/assets/rashi/aries.webp" alt="Mesha (Aries)" size="sm" />
                  <IconMedallion src="/assets/rashi/leo.webp" alt="Simha (Leo)" size="md" />
                  <IconMedallion src="/assets/rashi/scorpio.webp" alt="Vrishchika (Scorpio)" size="lg" />
                </div>
              </div>
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">Active Glow State</p>
                <div className="flex flex-wrap gap-12 items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <IconMedallion src="/assets/rashi/leo.webp" alt="Normal" size="md" />
                    <span className="text-xs text-inkMuted">Normal</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <IconMedallion src="/assets/rashi/leo.webp" alt="Glowing" size="md" glow={true} />
                    <span className="text-xs text-brass">glow={`{true}`}</span>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">Celestial Bodies (transparency check)</p>
                <div className="flex flex-wrap gap-8 items-center justify-center">
                  <IconMedallion src="/assets/images/sun.webp" alt="Surya (Sun)" size="lg" />
                  <IconMedallion src="/assets/images/moon.webp" alt="Chandra (Moon)" size="lg" />
                </div>
              </div>
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 overflow-hidden">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">Zodiac Strip</p>
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <IconMedallion src="/assets/rashi/aries.webp" alt="Aries" size="sm" />
                  <IconMedallion src="/assets/rashi/taurus.webp" alt="Taurus" size="sm" />
                  <IconMedallion src="/assets/rashi/gemini.webp" alt="Gemini" size="sm" />
                  <IconMedallion src="/assets/rashi/cancer.webp" alt="Cancer" size="sm" />
                  <IconMedallion src="/assets/rashi/leo.webp" alt="Leo" size="sm" />
                  <IconMedallion src="/assets/rashi/virgo.webp" alt="Virgo" size="sm" />
                </div>
              </div>
            </div>
          </div>

          {/* A5: Glowing Data Digit */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                A5. Glowing Data Digit
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Animated brass-marble numbers for live time data readouts.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* All Digits Array */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">All Digits (md)</p>
                <div className="flex flex-wrap gap-1 items-center justify-center">
                  {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":"].map((val) => (
                    <GlowingDigit key={val} value={val} size="md" />
                  ))}
                </div>
              </div>

              {/* Size Comparison */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">Sizes (sm / md / lg)</p>
                <div className="flex flex-wrap gap-8 items-end justify-center">
                  <GlowingDigit value="7" size="sm" />
                  <GlowingDigit value="7" size="md" />
                  <GlowingDigit value="7" size="lg" />
                </div>
              </div>

              {/* Composition Demo */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">Composed Time Display (12:45)</p>
                <div className="flex items-center justify-center gap-1">
                  <GlowingDigit value="1" size="lg" />
                  <GlowingDigit value="2" size="lg" />
                  <div className="px-1"><GlowingDigit value=":" size="lg" /></div>
                  <GlowingDigit value="4" size="lg" />
                  <GlowingDigit value="5" size="lg" />
                </div>
              </div>

              {/* Glow Visibility */}
              <div className="p-16 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center justify-center">
                <p className="text-xs text-inkMuted mb-8 uppercase tracking-wider">Amber Radial Backlight</p>
                <GlowingDigit value="8" size="lg" />
              </div>
            </div>
          </div>

          {/* A6: Progress Arc Segment */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                A6. Progress Arc Segment
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Diamond-shaped tick marks along a curved arc. Ported from DialCore.tsx.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Karana-style (Up arc) */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">Karana — 29/60 (arc up)</p>
                <ProgressArc current={29} total={60} width={280} direction="up" />
              </div>

              {/* Yoga-style (Down arc) */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center">
                <p className="text-xs text-inkMuted mb-6 uppercase tracking-wider">Yoga — 73/100 (arc down)</p>
                <ProgressArc current={73} total={100} width={280} direction="down" />
              </div>

              {/* Size Comparison */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Size: 200 / 300 / 400</p>
                <ProgressArc current={20} total={60} width={200} direction="up" />
                <ProgressArc current={20} total={60} width={300} direction="up" />
                <ProgressArc current={20} total={60} width={400} direction="up" />
              </div>

              {/* Edge Cases */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Edge Cases: 0 / 1 / 60 of 60</p>
                <ProgressArc current={0} total={60} width={280} direction="up" />
                <ProgressArc current={1} total={60} width={280} direction="up" />
                <ProgressArc current={60} total={60} width={280} direction="up" />
              </div>
            </div>
          </div>

          {/* A7: Ornate Label (Corner Bracket) */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                A7. Ornate Label (Nameplate)
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Brass plaque container for key data values. Stretches dynamically.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Three Sizes */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Sizes (sm / md / lg)</p>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6">
                  <OrnateLabel primary="उज्जैन" secondary="23.18°N · 75.78°E" size="sm" />
                  <OrnateLabel primary="उज्जैन" secondary="23.18°N · 75.78°E" size="md" />
                  <OrnateLabel primary="उज्जैन" secondary="23.18°N · 75.78°E" size="lg" />
                </div>
              </div>

              {/* Realistic Data Examples */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Realistic Use Cases</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl place-items-center">
                  <OrnateLabel primary="09:45 IST" secondary="सूर्योदय" size="md" />
                  <OrnateLabel primary="2083" secondary="विक्रम संवत्" size="md" />
                  <OrnateLabel primary="उज्जैन" secondary="23.18°N · 75.78°E" size="md" />
                  <OrnateLabel primary="शनि" secondary="Saturn · Vara" size="md" />
                </div>
              </div>

              {/* Extreme Edge Cases (Stress Test) */}
              <div className="p-8 bg-void-navy rounded-lg border border-red-500/20 flex flex-col items-center gap-6">
                <p className="text-xs text-red-400/80 uppercase tracking-wider">Stress Test (Longest Possible Strings)</p>
                <div className="flex flex-col gap-6 w-full items-center">
                  {/* Adhika Masa Date Edge Case */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <OrnateLabel primary="28 मार्गशीर्ष 2026" secondary="बृहस्पतिवार | अधिक मार्गशीर्ष" size="sm" />
                    <OrnateLabel primary="28 मार्गशीर्ष 2026" secondary="बृहस्पतिवार | अधिक मार्गशीर्ष" size="md" />
                    <OrnateLabel primary="28 मार्गशीर्ष 2026" secondary="बृहस्पतिवार | अधिक मार्गशीर्ष" size="lg" />
                  </div>
                  {/* Long Location Edge Case */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <OrnateLabel primary="Thiruvananthapuram" secondary="-33.86°S · 151.20°E" size="sm" />
                    <OrnateLabel primary="Thiruvananthapuram" secondary="-33.86°S · 151.20°E" size="md" />
                    <OrnateLabel primary="Thiruvananthapuram" secondary="-33.86°S · 151.20°E" size="lg" />
                  </div>
                </div>
              </div>

              {/* Primary Only */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Primary Only (No subtitle)</p>
                <OrnateLabel primary="नमस्ते" size="md" />
              </div>

              {/* Side-by-side Pair (TopBar simulation) */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">TopBar Simulation</p>
                <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                  <OrnateLabel primary="09:45 IST" secondary="सूर्यास्त" size="md" />
                  <div className="hidden sm:block flex-1 border-t border-white/10 border-dashed mx-4"></div>
                  <OrnateLabel primary="25 अप्रैल" secondary="शनिवार" size="md" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Molecules Section */}
        <div className="space-y-12 pt-12">
          <h2 className="text-xl sm:text-2xl font-sans font-semibold text-ivory border-b border-white/10 pb-4">
            Phase 2: Molecules
          </h2>

          {/* M9: Nav Item */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M9. Nav Item (Underline Draw)
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Hover each link to see the gold ink-draw underline animation.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* All Links Row */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Top-Level Header Simulation</p>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 w-full">
                  <NavItem href="#" en="Home" forceActive={true} />
                  <NavItem href="#clock" en="The Clock" />
                  <NavItem href="#heritage" en="Heritage" />
                  <NavItem href="#panchang" en="Panchang Guide" />
                  <NavItem href="#institutions" en="For Institutions" />
                  <NavItem href="#contact" en="Enquire" />
                </div>
              </div>

              {/* Bilingual Variants */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Bilingual Support</p>
                <div className="flex flex-wrap items-center justify-center gap-12 w-full">
                  <NavItem href="#m9-b1" en="The Clock" hi="वेदिक घड़ी" />
                  <NavItem href="#m9-b2" en="Heritage" hi="विरासत" />
                  <NavItem href="#m9-b3" en="Panchang Guide" hi="पंचांग" />
                </div>
              </div>

              {/* Parchment Theme */}
              <div className="p-8 bg-parchment rounded-lg border border-black/5 flex flex-col items-center gap-6">
                <p className="text-xs text-deep-bronze/60 uppercase tracking-wider">Parchment Theme</p>
                <div className="flex flex-wrap items-center justify-center gap-12 w-full">
                  <NavItem href="#m9-p1" en="History" hi="इतिहास" variant="light" forceActive={true} />
                  <NavItem href="#m9-p2" en="Astrology" hi="ज्योतिष" variant="light" />
                  <NavItem href="#m9-p3" en="Time" hi="समय" variant="light" />
                </div>
              </div>
            </div>
          </div>

          {/* M1: Data Plaque */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M1. Data Plaque
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Primary data display card. Composes A5 (GlowingDigit) and A6 (ProgressArc) into a styled instrument panel.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. Named Type - Panchang Limbs */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Named Type (Panchang Limbs)</p>
                <div className="flex flex-wrap justify-center gap-6 w-full">
                  <DataPlaque label="MUHURTA" labelHi="मुहूर्त" type="named" nameHi="रुद्र" nameEn="Rudra" progress={0.6} progressTotal={30} size="md" />
                  <DataPlaque label="TITHI" labelHi="तिथि" type="named" nameHi="पंचमी" nameEn="Panchami" progress={0.35} progressTotal={30} size="md" />
                  <DataPlaque label="NAKSHATRA" labelHi="नक्षत्र" type="named" nameHi="रोहिणी" nameEn="Rohini" progress={0.75} progressTotal={60} size="md" />
                  <DataPlaque label="YOGA" labelHi="योग" type="named" nameHi="सौभाग्य" nameEn="Saubhagya" progress={0.5} progressTotal={100} size="md" />
                  <DataPlaque label="VARA" labelHi="वार" type="named" nameHi="शनि" nameEn="Shani" progress={0.45} progressTotal={100} size="md" />
                </div>
              </div>

              {/* 2 & 3. Numeric Type - Time Readouts */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Numeric Type (Time Readouts)</p>
                <div className="flex flex-col xl:flex-row flex-wrap justify-center items-center gap-8 w-full">
                  <DataPlaque 
                    label="IST TIME" labelHi="भारतीय समय" type="numeric" 
                    digits="09:45:23" digitLabels={["Hour", "Min", "Sec"]} size="lg" 
                  />
                  <DataPlaque 
                    label="VEDIC TIME" labelHi="वेदिक समय" type="numeric" 
                    digits="08:22:14" digitLabels={["मुहूर्त", "कला", "काष्ठा"]} size="lg" 
                  />
                </div>
              </div>

              {/* 4. Size Comparison */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Size Comparison (sm / md / lg)</p>
                <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6">
                  <DataPlaque label="MUHURTA" type="named" nameHi="रुद्र" nameEn="Rudra" progress={0.6} progressTotal={30} size="sm" />
                  <DataPlaque label="MUHURTA" type="named" nameHi="रुद्र" nameEn="Rudra" progress={0.6} progressTotal={30} size="md" />
                  <DataPlaque label="MUHURTA" type="named" nameHi="रुद्र" nameEn="Rudra" progress={0.6} progressTotal={30} size="lg" />
                </div>
              </div>
            </div>
          </div>

          {/* M2: Zodiac / Planet Medallion */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M2. Zodiac / Planet Medallion
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Avatar component for celestial tracking. Composes A4 (Icon Medallion) and A6 (Progress Arc).
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. Active Zodiac with Progress */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Active State (With Progress Cupping)</p>
                <div className="flex justify-center">
                  <ZodiacMedallion 
                    iconSrc="/assets/rashi/aries.webp" 
                    nameEn="Aries" 
                    nameHi="मेष" 
                    progress={0.6} 
                    progressTotal={30} 
                    isActive={true} 
                    size="lg" 
                  />
                </div>
              </div>

              {/* 2. Row of Panchang Limbs */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Panchang Limbs (Inactive, No Progress)</p>
                <div className="flex flex-wrap justify-center gap-8">
                  <ZodiacMedallion iconSrc="/assets/images/sun.webp" nameEn="Sun" nameHi="सूर्य" size="md" />
                  <ZodiacMedallion iconSrc="/assets/images/moon1.webp" nameEn="Moon" nameHi="चंद्र" size="md" />
                </div>
              </div>

              {/* 3. Size Comparison */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">Size Comparison (sm / md / lg)</p>
                <div className="flex flex-row flex-wrap items-end justify-center gap-8">
                  <ZodiacMedallion iconSrc="/assets/rashi/leo.webp" nameEn="Leo" nameHi="सिंह" size="sm" progress={0.3} />
                  <ZodiacMedallion iconSrc="/assets/rashi/leo.webp" nameEn="Leo" nameHi="सिंह" size="md" progress={0.3} />
                  <ZodiacMedallion iconSrc="/assets/rashi/leo.webp" nameEn="Leo" nameHi="सिंह" size="lg" progress={0.3} />
                </div>
              </div>
            </div>
          </div>

          {/* M3: Process Step Card */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M3. Process Step Card
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Static narrative cards for the &quot;How it Works&quot; strip. Uses inline SVGs.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. All Three Steps */}
              <div className="p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider">The Three Steps (Dark Theme)</p>
                <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full">
                  <ProcessStepCard 
                    step={1}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                    }
                    titleEn="Ancient Wisdom"
                    titleHi="प्राचीन ज्ञान"
                    description="5,000 years of Vedic astronomical science, encoded in Sanskrit texts and observed through generations."
                  />
                  <ProcessStepCard 
                    step={2}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                      </svg>
                    }
                    titleEn="Precise Astronomy"
                    titleHi="खगोल विज्ञान"
                    description="Real-time sunrise-based calculations using the astronomy-engine, accurate to the second."
                  />
                  <ProcessStepCard 
                    step={3}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
                      </svg>
                    }
                    titleEn="Modern Technology"
                    titleHi="आधुनिक तकनीक"
                    description="Delivered through a handcrafted brass instrument powered by modern web technology."
                  />
                </div>
              </div>

              {/* 2. Parchment Theme */}
              <div className="p-8 bg-parchment rounded-lg border border-black/5 flex flex-col items-center gap-6">
                <p className="text-xs text-deep-bronze/60 uppercase tracking-wider">Parchment Theme</p>
                <div className="flex justify-center">
                  <ProcessStepCard 
                    step={2}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                      </svg>
                    }
                    titleEn="Precise Astronomy"
                    titleHi="खगोल विज्ञान"
                    description="Real-time sunrise-based calculations using the astronomy-engine, accurate to the second."
                    variant="light"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* M4: Feature Bullet Block */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M4. Feature Bullet Block
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Core typography block for lists and features. Borderless, uses diamond markers.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. Dark Theme - Product Specs */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-start gap-4">
                <p className="text-xs text-inkMuted uppercase tracking-wider mb-2">Dark Theme (Product Specs)</p>
                <div className="w-full flex justify-center">
                  <FeatureBulletBlock
                    titleEn="Sunrise-Based Precision"
                    titleHi="सूर्योदय आधारित सटीकता"
                    bullets={[
                      { label: "Real Astronomical Data", description: "Not fixed tables. Every calculation uses live sun position from your GPS coordinates." },
                      { label: "Muhurta Accuracy", description: "Each of the 30 daily Muhurtas is computed to the exact second, not rounded to the nearest minute." },
                      { label: "Location-Aware", description: "Adjusts automatically for your city's latitude and longitude. What's auspicious in Ujjain differs from Chennai." },
                    ]}
                  />
                </div>
              </div>

              {/* 2. Light Theme - Heritage on Parchment */}
              <div className="p-6 sm:p-8 bg-parchment rounded-lg border border-black/5 flex flex-col items-start gap-4">
                <p className="text-xs text-deep-bronze/60 uppercase tracking-wider mb-2">Parchment Theme (Heritage)</p>
                <div className="w-full flex justify-center">
                  <FeatureBulletBlock
                    titleEn="Why Sunrise, Not Midnight?"
                    titleHi="सूर्योदय क्यों, मध्यरात्रि क्यों नहीं?"
                    bullets={[
                      { label: "The Vedic Day Begins at Dawn", description: "Ancient seers defined the day's start by the sun's first ray, not an arbitrary midnight point." },
                      { label: "Aligned with Nature", description: "Every living creature responds to sunrise. Human circadian rhythms, bird song, flower blooming — all follow the sun." },
                      { label: "Muhurta Quality Changes", description: "The auspiciousness of each Muhurta is tied to solar position. A midnight-start clock cannot reflect this." },
                    ]}
                    variant="light"
                  />
                </div>
              </div>

              {/* 3. Dark Theme - Institutions (Short, No Hindi) */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-start gap-4">
                <p className="text-xs text-inkMuted uppercase tracking-wider mb-2">Dark Theme (B2B, English Only)</p>
                <div className="w-full flex justify-center">
                  <FeatureBulletBlock
                    titleEn="Why Vedic Ghadi?"
                    bullets={[
                      { label: "Handcrafted in India", description: "Every unit is assembled by artisans in Ujjain, the ancient seat of Indian astronomy." },
                      { label: "Zero Maintenance", description: "Powered by silent, efficient electronics. No winding, no calibration, no internet required." },
                      { label: "API Integration", description: "For digital displays — our REST API delivers real-time Panchang data in JSON format." },
                      { label: "White-Label Ready", description: "Custom branding for your institution's name, logo, and color scheme." },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* M5: Panchang Table Row */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M5. Panchang Table Row
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Horizontal data rows for educational tables. Includes a subtle gold highlight state when active.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. Muhurta Table */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col gap-4">
                <p className="text-xs text-inkMuted uppercase tracking-wider mb-2">Muhurta List (Showing rows 1-6)</p>
                <div className="flex flex-col">
                  {MUHURTAS.slice(0, 6).map((m) => (
                    <PanchangTableRow
                      key={m.index}
                      index={m.index + 1}
                      nameHi={m.devanagari}
                      nameEn={m.name}
                      nature={m.nature}
                      deity={m.deity}
                      detail={m.suitableFor}
                      isHighlighted={m.index === 2} // Mitra is highlighted
                    />
                  ))}
                </div>
              </div>

              {/* 2. Vedic Time Units */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col gap-4">
                <p className="text-xs text-inkMuted uppercase tracking-wider mb-2">Vedic Time Units (No deity/nature tags)</p>
                <div className="flex flex-col">
                  <PanchangTableRow index={1} nameHi="त्रुटि" nameEn="Truti" detail="= 29.6 microseconds" />
                  <PanchangTableRow index={2} nameHi="तत्पर" nameEn="Tatpara" detail="= 100 Truti ≈ 3.2 milliseconds" />
                  <PanchangTableRow index={3} nameHi="निमेष" nameEn="Nimesha" detail="= 45 Tatpara ≈ 0.13 seconds (one eye-blink)" />
                  <PanchangTableRow index={4} nameHi="काष्ठा" nameEn="Kashtha" detail="= 18 Nimesha ≈ 2.4 seconds" />
                </div>
              </div>

              {/* 3. Edge Case: Highlighted Ashubha */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col gap-4">
                <p className="text-xs text-inkMuted uppercase tracking-wider mb-2">Edge Case: Highlighted Ashubha Row</p>
                <div className="flex flex-col">
                  <PanchangTableRow
                    index={MUHURTAS[0].index + 1}
                    nameHi={MUHURTAS[0].devanagari}
                    nameEn={MUHURTAS[0].name}
                    nature={MUHURTAS[0].nature}
                    deity={MUHURTAS[0].deity}
                    detail={MUHURTAS[0].suitableFor}
                    isHighlighted={true} // Rudra is highlighted
                  />
                </div>
              </div>
            </div>
          </div>

          {/* M6: Annotated Callout Node */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M6. Annotated Callout Node
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Pointers used for technical diagrams (inline) or chronological histories (timeline).
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. Inline Layout */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-start gap-4">
                <p className="text-xs text-inkMuted uppercase tracking-wider mb-2">Inline Layout (Diagram Annotations)</p>
                <div className="flex flex-col gap-6">
                  <AnnotatedCallout
                    number={1}
                    titleEn="Muhurta Hand"
                    titleHi="मुहूर्त सूचक"
                    description="The main brass hand indicates the current Muhurta out of 30 in the Vedic day."
                    layout="inline"
                  />
                  <AnnotatedCallout
                    number={2}
                    titleEn="Kala Ring"
                    titleHi="कला वलय"
                    description="The inner ring of 30 ticks shows Kala divisions within the current Muhurta."
                    layout="inline"
                  />
                  <AnnotatedCallout
                    number={3}
                    titleEn="Diamond Ticks"
                    titleHi="हीरक चिह्न"
                    description="Each diamond represents one Kashtha, the smallest displayed unit."
                    layout="inline"
                  />
                </div>
              </div>

              {/* 2. Timeline Layout */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-start gap-4">
                <p className="text-xs text-inkMuted uppercase tracking-wider mb-2">Timeline Layout (History of Muhurta)</p>
                <div className="flex flex-col">
                  <AnnotatedCallout
                    number={1}
                    year="~1500 BCE"
                    titleEn="Vedanga Jyotisha"
                    titleHi="वेदाङ्ग ज्योतिष"
                    description="The earliest known Vedic astronomical text, codifying the system of Muhurtas."
                    layout="timeline"
                  />
                  <AnnotatedCallout
                    number={2}
                    year="~500 BCE"
                    titleEn="Surya Siddhanta"
                    titleHi="सूर्य सिद्धान्त"
                    description="Refined sunrise-based calculations and introduced precise planetary models."
                    layout="timeline"
                  />
                  <AnnotatedCallout
                    number={3}
                    year="57 BCE"
                    titleEn="Vikram Samvat"
                    titleHi="विक्रम संवत"
                    description="King Vikramaditya established the calendar era still used across India today."
                    layout="timeline"
                  />
                  <AnnotatedCallout
                    number={4}
                    year="2024 CE"
                    titleEn="Vedic Ghadi"
                    titleHi="वेदिक घड़ी"
                    description="A modern digital instrument bringing the ancient Muhurta system to life."
                    layout="timeline"
                  />
                </div>
              </div>

              {/* 3. Parchment Theme */}
              <div className="p-6 sm:p-8 bg-parchment rounded-lg border border-black/5 flex flex-col items-start gap-4">
                <p className="text-xs text-deep-bronze/60 uppercase tracking-wider mb-2">Parchment Theme (Light Mode)</p>
                <div className="flex flex-col">
                  <AnnotatedCallout
                    number={2}
                    titleEn="Kala Ring"
                    titleHi="कला वलय"
                    description="The inner ring of 30 ticks shows Kala divisions within the current Muhurta."
                    layout="inline"
                    variant="light"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* M7: Institution-Type Card */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M7. Institution-Type Card
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                B2B showcase panels used in &quot;Who it&apos;s for&quot; grids. Minimal motion, high credibility.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. Four Card Grid (Dark) */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider w-full text-left">Who it&apos;s for (Dark Theme)</p>
                {/* Changed from lg:grid-cols-4 to xl:grid-cols-4 to give cards more breathing room on standard laptops */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 w-full justify-items-center max-w-7xl mx-auto">
                  <InstitutionCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 3L4 10h16z" />
                        <path d="M6 10v12M18 10v12M10 10v12M14 10v12" />
                        <path d="M2 22h20" />
                        <path d="M12 1v2" />
                      </svg>
                    }
                    titleEn="Temples"
                    titleHi="मंदिर"
                    tagline="Display auspicious Muhurtas for daily worship schedules."
                    bullets={["Automatic Puja timing", "Festival countdowns", "Donation kiosk display"]}
                  />
                  <InstitutionCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 22h18M4 22V10M10 22V10M14 22V10M20 22V10M2 10l10-7 10 7H2z" />
                      </svg>
                    }
                    titleEn="Museums"
                    titleHi="संग्रहालय"
                    tagline="Bring ancient Indian timekeeping to life in your exhibits."
                    bullets={["Interactive Panchang display", "Cultural heritage showcase", "Visitor engagement tool"]}
                  />
                  <InstitutionCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 10L12 5 2 10l10 5 10-5z" />
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                        <path d="M22 10v7" />
                      </svg>
                    }
                    titleEn="Education"
                    titleHi="शिक्षा"
                    tagline="Teach Vedic astronomy with a live, tangible instrument."
                    bullets={["Classroom demonstration aid", "Sanskrit numeral learning", "Astronomy curriculum support"]}
                  />
                  <InstitutionCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 22h16M6 22V8l6-4 6 4v14M10 22V14h4v8M12 4V1" />
                        <path d="M12 1h4v3h-4" />
                      </svg>
                    }
                    titleEn="Government"
                    titleHi="शासन"
                    tagline="Showcase Indian scientific heritage in civic spaces."
                    bullets={["Lobby & reception display", "Swadeshi technology symbol", "Tourism board installations"]}
                  />
                </div>
              </div>

              {/* 2. Parchment Theme */}
              <div className="p-6 sm:p-8 bg-parchment rounded-lg border border-black/5 flex flex-col items-center gap-6">
                <p className="text-xs text-deep-bronze/60 uppercase tracking-wider w-full text-left">Parchment Theme</p>
                <div className="flex justify-center w-full">
                  <InstitutionCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 10L12 5 2 10l10 5 10-5z" />
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                        <path d="M22 10v7" />
                      </svg>
                    }
                    titleEn="Education"
                    titleHi="शिक्षा"
                    tagline="Teach Vedic astronomy with a live, tangible instrument."
                    bullets={["Classroom demonstration aid", "Sanskrit numeral learning", "Astronomy curriculum support"]}
                    variant="light"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* M8: Quote / Testimonial Card */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M8. Quote / Testimonial Card
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                Editorial pull-quote blocks used for scriptures and testimonials. Left-aligned text with right-aligned attribution.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. Dark Variant - Scripture */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6 relative">
                {/* Background image simulation to show the backdrop-blur */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                
                <p className="text-xs text-inkMuted uppercase tracking-wider w-full text-left relative z-10">Dark Theme (Scriptural Quote)</p>
                <div className="w-full flex justify-center relative z-10">
                  <QuoteCard
                    quote="The division of the day into thirty Muhurtas was ordained by the seers so that man might live in harmony with the rhythm of the cosmos."
                    attributionEn="Surya Siddhanta"
                    attributionHi="सूर्य सिद्धान्त"
                    role="Ancient Astronomical Treatise, ~500 BCE"
                  />
                </div>
              </div>

              {/* 2. Dark Variant - Testimonial */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider w-full text-left">Dark Theme (Testimonial)</p>
                <div className="w-full flex justify-center">
                  <QuoteCard
                    quote="Installing the Vedic Ghadi in our temple hall has transformed how devotees connect with the daily Muhurta cycle. It is both a spiritual instrument and a work of art."
                    attributionEn="Pandit Ramesh Sharma"
                    attributionHi="पंडित रमेश शर्मा"
                    role="Head Priest, Mahakaleshwar Temple, Ujjain"
                  />
                </div>
              </div>

              {/* 3. Light Variant - Parchment */}
              <div className="p-6 sm:p-8 bg-parchment rounded-lg border border-black/5 flex flex-col items-center gap-6">
                <p className="text-xs text-deep-bronze/60 uppercase tracking-wider w-full text-left">Parchment Theme (Light Mode)</p>
                <div className="w-full flex justify-center">
                  <QuoteCard
                    quote="Time is the supreme force. It is through time that all beings come into existence and through time that they cease to be."
                    attributionEn="Atharvaveda"
                    attributionHi="अथर्ववेद"
                    role="~1200 BCE"
                    variant="light"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* M10: CTA Card */}
          <div className="bg-bgLift border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-ivory mb-1">
                M10. CTA Card
              </h3>
              <p className="text-sm text-inkMuted mb-6">
                The conversion closer. Features a wide dark panel, a radial accent glow, and the signature &quot;heartbeat&quot; button pulse.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* 1. Home Page CTA */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider w-full text-left">Home Page Layout</p>
                <div className="w-full">
                  <CtaCard
                    titleEn="Own a Piece of Time"
                    titleHi="समय का एक अंश अपने नाम करें"
                    description="Bring the ancient wisdom of Ujjain's sunrise-based timekeeping into your space. Limited artisan production — now open for inquiries."
                    buttonTextEn="Enquire Now"
                    buttonTextHi="पूछताछ करें"
                    href="/contact"
                  />
                </div>
              </div>

              {/* 2. Institutions Page CTA */}
              <div className="p-6 sm:p-8 bg-void-navy rounded-lg border border-white/5 flex flex-col items-center gap-6">
                <p className="text-xs text-inkMuted uppercase tracking-wider w-full text-left">Institutions Layout</p>
                <div className="w-full">
                  <CtaCard
                    titleEn="Bring Vedic Time to Your Institution"
                    titleHi="वैदिक समय अपने संस्थान में लाएँ"
                    description="Custom installations for temples, museums, universities, and government buildings. Speak with our heritage team."
                    buttonTextEn="Request a Consultation"
                    buttonTextHi="परामर्श अनुरोध"
                    href="/contact"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
