"use client";

import Link from "next/link";
import { GoldDivider } from "@/components/atoms/GoldDivider";

const NAVIGATE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/clock", label: "The Clock" },
  { href: "/institutions", label: "Institutions" },
];

const EXPLORE_LINKS = [
  { href: "/panchang", label: "Panchang Guide" },
  { href: "/heritage", label: "Heritage" },
  { href: "/contact", label: "Enquire" },
];

export function Footer() {
  return (
    <footer className="w-full relative z-10 overflow-hidden">
      {/* Subtle gradient background — darker than body to create depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-navy via-void-navy to-[#060810] pointer-events-none" />

      {/* Top Divider */}
      <div className="relative z-10">
        <GoldDivider variant="dark" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Main Footer Content ── */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column — spans 5 cols on desktop */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="group inline-flex flex-col items-center md:items-start gap-1 mb-5">
              <span className="font-serif text-[10px] text-antique-gold/80 uppercase tracking-[0.4em] group-hover:text-antique-gold transition-colors duration-300">
                Vikramaditya
              </span>
              <span className="font-hindi text-3xl lg:text-4xl text-antique-gold leading-none group-hover:text-amber-glow transition-colors duration-300">
                वेदिक घड़ी
              </span>
            </Link>

            <p className="font-serif italic text-ivory/40 text-sm leading-relaxed max-w-xs mb-8">
              Time, as the ancients measured it.
            </p>

            {/* Decorative small diamond row */}
            <div className="flex items-center gap-2 opacity-30">
              <span className="block w-8 h-px bg-brass" />
              <span className="block w-1.5 h-1.5 rotate-45 bg-brass" />
              <span className="block w-1.5 h-1.5 rotate-45 bg-brass" />
              <span className="block w-1.5 h-1.5 rotate-45 bg-brass" />
              <span className="block w-8 h-px bg-brass" />
            </div>
          </div>

          {/* Navigation Columns — span 7 cols, split into two */}
          <div className="md:col-span-7 grid grid-cols-2 gap-8 lg:gap-12">

            {/* Navigate */}
            <div className="flex flex-col items-start">
              <h3 className="text-antique-gold uppercase tracking-[0.3em] text-[10px] font-sans mb-8 relative">
                Navigate
                <span className="absolute -bottom-3 left-0 w-6 h-px bg-brass/40" />
              </h3>
              <ul className="space-y-5">
                {NAVIGATE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center font-sans text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                    >
                      <span className="block w-0 group-hover:w-3 mr-0 group-hover:mr-2 h-px bg-antique-gold transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div className="flex flex-col items-start">
              <h3 className="text-antique-gold uppercase tracking-[0.3em] text-[10px] font-sans mb-8 relative">
                Explore
                <span className="absolute -bottom-3 left-0 w-6 h-px bg-brass/40" />
              </h3>
              <ul className="space-y-5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center font-sans text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                    >
                      <span className="block w-0 group-hover:w-3 mr-0 group-hover:mr-2 h-px bg-antique-gold transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-brass/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[11px] text-ivory/30 tracking-wide">
            &copy; {new Date().getFullYear()} Vikramaditya Vedic Clock
          </p>
          <p className="font-hindi text-[11px] text-ivory/20 tracking-wide">
            उज्जैन · भारत
          </p>
        </div>
      </div>
    </footer>
  );
}
