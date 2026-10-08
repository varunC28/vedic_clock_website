"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { BrassButton } from "@/components/atoms/BrassButton";

export default function CataloguePage() {
  const specs = [
    { labelEn: "Prime Reference", labelHi: "प्रधान संदर्भ", val: "Ujjain 0° Sacred Meridian (23.17° N, 75.77° E)" },
    { labelEn: "Time Calibration", labelHi: "काल गणना", val: "True Solar Sunrise (Dynamic 30 Muhurtas)" },
    { labelEn: "Material Casework", labelHi: "निर्माण सामग्री", val: "Artisan Brushed Brass & Architectural Insets" },
    { labelEn: "Display Dimensions", labelHi: "आयाम", val: "Tithi, Nakshatra, Yoga, Karana, Rashi, Muhurta" },
    { labelEn: "Edition Type", labelHi: "संस्करण", val: "Numbered Limited Artisan Commissions" },
    { labelEn: "Origin", labelHi: "उत्पत्ति", val: "Ujjain, Madhya Pradesh, Bharat" },
  ];

  const editions = [
    {
      titleEn: "Sanctum Wall Mount",
      titleHi: "गर्भगृह भित्ति संस्करण",
      desc: "Designed for sacred temple sanctums, prayer halls, and heritage libraries with permanent sunrise synchronization.",
      badge: "Temples & Sanctuaries",
    },
    {
      titleEn: "Museum Pedestal Monument",
      titleHi: "संग्रहालय पीठिका संस्करण",
      desc: "Architectural freestanding installation with interactive sidereal dial engageable by visitors and astronomy curators.",
      badge: "Museums & Universities",
    },
    {
      titleEn: "Private Estate Heirloom",
      titleHi: "निजी निवास धरोहर संस्करण",
      desc: "A bespoke collector timepiece crafted for distinguished connoisseurs of Indian astronomical heritage.",
      badge: "Private Acquisitions",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#03060E] text-ivory overflow-x-hidden selection:bg-brass/30 selection:text-ivory">
      <Header />

      {/* ── Main Content ── */}
      <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans text-[#D4A65A]/80 hover:text-[#FFF5D1] transition-colors"
          >
            <span>←</span>
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionEyebrow
            en="OFFICIAL SPECIFICATION &amp; MONOGRAPH"
            hi="अधिकृत कैटलॉग एवं विवरण"
            variant="dark"
            className="mb-2 justify-center"
          />

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FBF5E7] tracking-tight leading-tight mt-2">
            The Master Catalogue
          </h1>
          <h2 className="text-xl sm:text-2xl font-hindi text-[#D4A65A] font-semibold mt-1.5">
            विक्रमादित्य वेदिक घड़ी — समग्र परिचय
          </h2>

          <GoldDivider variant="dark" className="my-4 max-w-xs scale-90" />

          <p className="font-sans text-sm sm:text-base text-ivory/75 leading-relaxed max-w-2xl">
            A comprehensive reference monograph detailing the celestial mechanics, sidereal mathematics, and hand-finished metallurgy of the world&apos;s first living Vedic Clock.
          </p>

          {/* Download & Acquisition Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <a
              href="#specifications"
              className="px-6 py-2.5 rounded-full bg-[#D4A65A] text-[#050A14] font-sans text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#E8B94B] transition-all shadow-[0_0_20px_rgba(212,166,90,0.3)] flex items-center gap-2"
            >
              <span>📖</span>
              <span>Browse Specifications</span>
            </a>

            <BrassButton
              en="Request Printed Monograph"
              hi="हार्डकॉपी हेतु अनुरोध करें"
              size="md"
              href="/contact"
            />
          </div>
        </div>

        {/* ── Key Horological Specifications ── */}
        <section id="specifications" className="mb-16 sm:mb-20">
          <div className="flex flex-col items-center text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF5E7] font-normal">
              Horological Architecture
            </h3>
            <span className="font-hindi text-base text-[#D4A65A] font-medium mt-0.5">
              तकनीकी एवं खगोलीय आयाम
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specs.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#070E1E]/80 border border-[#D4A65A]/20 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D4A65A]">
                    {s.labelEn}
                  </span>
                  <span className="font-hindi text-xs text-[#FFF5D1]/60">
                    {s.labelHi}
                  </span>
                </div>
                <p className="font-sans text-sm text-[#FBF5E7] font-medium">
                  {s.val}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Available Commission Editions ── */}
        <section className="mb-16 sm:mb-20">
          <div className="flex flex-col items-center text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF5E7] font-normal">
              Commission Editions
            </h3>
            <span className="font-hindi text-base text-[#D4A65A] font-medium mt-0.5">
              अधिष्ठापन संस्करण
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editions.map((ed, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#070E1E]/60 border border-[#D4A65A]/25 flex flex-col justify-between hover:border-[#D4A65A]/50 transition-colors"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#D4A65A]/15 text-[10px] font-sans font-semibold text-[#E8B94B] tracking-wide mb-4">
                    {ed.badge}
                  </span>
                  <h4 className="font-serif text-xl text-[#FBF5E7] font-medium">
                    {ed.titleEn}
                  </h4>
                  <h5 className="font-hindi text-sm text-[#D4A65A] font-medium mt-0.5 mb-3">
                    {ed.titleHi}
                  </h5>
                  <p className="font-sans text-xs text-ivory/70 leading-relaxed">
                    {ed.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <Link
                    href="/contact"
                    className="text-xs font-sans text-[#E8B94B] hover:text-[#FFF5D1] inline-flex items-center gap-1.5 transition-colors font-medium"
                  >
                    <span>Enquire for Edition</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Closing Consultation Callout ── */}
        <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#091020] to-[#040812] border border-[#D4A65A]/30">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF5E7] font-semibold">
            Bespoke Architectural Inquiries
          </h3>
          <p className="font-sans text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto mt-2 mb-6 leading-relaxed">
            Every Vedic Clock is customized to the longitude, latitude, and altitude of your specific sanctum or estate. Contact our curation team for architectural blueprints and custom dimensioning.
          </p>
          <BrassButton
            en="Contact Curators"
            hi="सलाहकार से संपर्क करें"
            size="lg"
            href="/contact"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
