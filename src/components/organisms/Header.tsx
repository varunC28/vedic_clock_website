"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/molecules/NavItem";
import { BrassButton } from "@/components/atoms/BrassButton";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_LINKS = [
  { href: "/", en: "Home", hi: "मुख्य पृष्ठ" },
  { href: "/clock", en: "The Clock", hi: "वेदिक घड़ी" },
  { href: "/heritage", en: "Heritage", hi: "धरोहर" },
  { href: "/guide", en: "Guide", hi: "मार्गदर्शिका" },
  { href: "/catalogue.pdf", en: "Catalogue", hi: "कैटलॉग", download: "Vedic_Watch_Catalogue.pdf" },
];

interface HeaderProps {
  alwaysVisible?: boolean;
}

export function Header({ alwaysVisible = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(alwaysVisible);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isParchment, toggleTheme } = useTheme();

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

  // Detect scroll to reveal header ONLY after maximum scrolled past the hero section (unless alwaysVisible)
  useEffect(() => {
    if (alwaysVisible) return;
    const onScroll = () => {
      const heroThreshold = window.innerHeight * 0.7;
      setScrolled(window.scrollY >= heroThreshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysVisible]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          (alwaysVisible || scrolled)
            ? "translate-y-0 opacity-100 bg-void-navy/90 backdrop-blur-lg border-b border-brass/10 shadow-lg shadow-black/30 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex flex-col items-start gap-0.5 group cursor-pointer"
          >
            <span className="font-serif text-[10px] sm:text-xs text-ivory uppercase tracking-[0.3em] group-hover:text-antique-gold transition-colors">
              Vedic
            </span>
            <span className="font-hindi text-lg sm:text-xl text-antique-gold leading-none group-hover:text-ivory transition-colors">
              वेदिक घड़ी
            </span>
          </Link>

          {/* Center: Desktop Nav (English Only) */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                en={link.en}
                download={link.download}
              />
            ))}
          </nav>

          {/* Right: Desktop CTA + Sun/Night Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <BrassButton en="Enquire" size="sm" variant="primary" href="/contact" />
            
            {/* Night / Sun Theme Toggle */}
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              aria-label={isParchment ? "Switch to Cosmic Night Mode" : "Switch to Parchment Day Mode"}
              title={isParchment ? "Switch to Cosmic Night Mode" : "Switch to Parchment Day Mode"}
              className={cn(
                "relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0",
                isParchment
                  ? "bg-[#FAF5E8] border border-[#B8873D]/40 text-[#8C5D33] hover:border-[#B8873D] hover:bg-white shadow-sm"
                  : "bg-[#080E1C] border border-[#D4A65A]/35 text-[#E8B94B] hover:border-[#D4A65A] hover:bg-[#0D152A] hover:shadow-[0_0_12px_rgba(212,166,90,0.3)]"
              )}
            >
              {!isParchment ? (
                /* Moon icon when in dark mode (click moon to illuminate page to white/day) */
                <svg className="w-4 h-4 transition-transform duration-300 hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                /* Sun icon when in parchment day mode (click sun to return to cosmic night) */
                <svg className="w-4 h-4 transition-transform duration-500 hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              aria-label={!isParchment ? "Switch to Parchment Day Mode" : "Switch to Cosmic Night Mode"}
              className={cn(
                "relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 z-50",
                isParchment
                  ? "bg-[#FAF5E8] border border-[#B8873D]/40 text-[#8C5D33]"
                  : "bg-[#080E1C] border border-[#D4A65A]/35 text-[#E8B94B]"
              )}
            >
              {!isParchment ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            <button
              className="flex flex-col items-center justify-center w-10 h-10 gap-1.5 relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <span
                className={cn(
                  "w-6 h-px bg-antique-gold transition-all duration-300 origin-center",
                  menuOpen && "rotate-45 translate-y-[7px]"
                )}
              />
              <span
                className={cn(
                  "w-6 h-px bg-antique-gold transition-all duration-300",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-6 h-px bg-antique-gold transition-all duration-300 origin-center",
                  menuOpen && "-rotate-45 -translate-y-[7px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-void-navy/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <div key={link.href} onClick={() => setMenuOpen(false)}>
              <NavItem
                href={link.href}
                en={link.en}
                hi={link.hi} // Full bilingual on mobile
                download={link.download}
                className="scale-110"
              />
            </div>
          ))}
        </nav>
        
        <div onClick={() => setMenuOpen(false)} className="mt-4">
          <BrassButton
            en="Enquire Now"
            hi="पूछताछ करें"
            size="md"
            variant="primary"
            href="/contact"
          />
        </div>
      </div>
    </>
  );
}
