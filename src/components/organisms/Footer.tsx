"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl, WHATSAPP_CONFIG } from "@/config";

const NAVIGATE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/clock", label: "The Clock" },
  { href: "/faq", label: "FAQ" },
  { href: "/catalogue.pdf", label: "Catalogue (PDF)", download: "Vedic_Watch_Catalogue.pdf" },
  { href: "/contact", label: "Contact Us" },
];

const EXPLORE_LINKS = [
  { href: "/guide", label: "Panchang Guide" },
  { href: "/heritage", label: "Ujjain 0° Meridian" },
  { href: "/blog", label: "Articles & Editorial" },
  { href: "/glossary", label: "Horology Glossary" },
];

interface FooterProps {
  variant?: "dark" | "parchment";
  className?: string;
}

export function Footer({ variant = "dark", className }: FooterProps) {
  const isParchment = variant === "parchment";
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      className={cn(
        "w-full relative overflow-hidden select-none transition-colors duration-500",
        isParchment
          ? "bg-[#1E140C] text-[#FBF5E7] border-t border-[#B8873D]/30"
          : "bg-[#03060E] text-ivory border-t border-[#D4A65A]/15",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* ── Main 4-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-14 border-b border-white/5">
          {/* Col 1: Brand & Origin (Spans 4 cols) */}
          <div className="md:col-span-4 flex flex-col items-start text-left">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="group inline-flex flex-col items-start gap-0.5 mb-4 cursor-pointer"
            >
              <span className="font-serif text-[10px] sm:text-xs text-[#D4A65A] uppercase tracking-[0.35em] group-hover:text-[#FFF5D1] transition-colors">
                VIKRAMADITYA
              </span>
              <span className="font-hindi text-2xl sm:text-3xl text-[#FFF5D1] leading-none group-hover:text-[#E8B94B] transition-colors mt-1 font-semibold">
                वेदिक घड़ी
              </span>
            </Link>

            <p className="font-sans text-xs sm:text-[13px] text-ivory/60 leading-relaxed max-w-sm mb-6">
              Beyond artificial mechanical gears. Grounded in the sacred prime meridian of Ujjain, the Vedic Clock measures time through the Sun.
            </p>

            {/* Sacred Coordinates Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A65A]/10 border border-[#D4A65A]/25 text-[11px] font-sans text-[#E8B94B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B94B] animate-pulse" />
              <span>23.17° N · 75.77° E · उज्जयिनी</span>
            </div>
          </div>

          {/* Col 2: Navigate (Spans 2 cols) */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="font-sans text-[11px] font-semibold text-[#D4A65A] uppercase tracking-[0.25em] mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAVIGATE_LINKS.map((link) => (
                <li key={link.label}>
                  {link.download ? (
                    <a
                      href={link.href}
                      download={link.download}
                      className="font-sans text-xs text-ivory/65 hover:text-[#FFF5D1] transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-sans text-xs text-ivory/65 hover:text-[#FFF5D1] transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Heritage & Guides (Spans 3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="font-sans text-[11px] font-semibold text-[#D4A65A] uppercase tracking-[0.25em] mb-5">
              Heritage
            </h4>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-ivory/65 hover:text-[#FFF5D1] transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Bespoke Consultation (Spans 3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="font-sans text-[11px] font-semibold text-[#D4A65A] uppercase tracking-[0.25em] mb-5">
              Acquisition & Contact
            </h4>
            <p className="font-sans text-xs text-ivory/60 leading-relaxed mb-3">
              Limited artisan production for sacred sanctums, museums, and private estates.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ivory/75 hover:text-[#FFF5D1] transition-colors mb-2 flex items-center gap-1.5"
            >
              <span>💬</span>
              <span>WhatsApp: {WHATSAPP_CONFIG.formattedPhone}</span>
            </a>
            <a
              href="mailto:contact@thevedicghadi.in"
              className="font-sans text-xs text-ivory/75 hover:text-[#FFF5D1] transition-colors mb-3 flex items-center gap-1.5"
            >
              <span>✉️</span>
              <span>contact@thevedicghadi.in</span>
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans text-[#E8B94B] hover:text-[#FFF5D1] font-medium tracking-wide transition-colors group mb-2"
            >
              <span>Enquire on WhatsApp</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-sans text-ivory/60 hover:text-[#FFF5D1] transition-colors group"
            >
              <span>Contact Us Form</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-ivory/40">
          <p>© {new Date().getFullYear()} Vikramaditya Vedic Clock. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-hindi text-[#D4A65A]/70">कालचक्राय नमः</span>
            <span>·</span>
            <span>Ujjain, Bharat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
