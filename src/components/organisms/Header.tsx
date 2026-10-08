"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/molecules/NavItem";
import { BrassButton } from "@/components/atoms/BrassButton";

const NAV_LINKS = [
  { href: "/", en: "Home", hi: "मुख्य पृष्ठ" },
  { href: "/clock", en: "The Clock", hi: "वेदिक घड़ी" },
  { href: "/guide", en: "Guide", hi: "मार्गदर्शिका" },
  { href: "/catalogue.pdf", en: "Catalogue", hi: "कैटलॉग", download: "Vedic_Watch_Catalogue.pdf" },
];

interface HeaderProps {
  alwaysVisible?: boolean;
}

export function Header({ alwaysVisible = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(alwaysVisible);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll to reveal header ONLY after maximum scrolled past the hero section (unless alwaysVisible)
  useEffect(() => {
    if (alwaysVisible) {
      setScrolled(true);
      return;
    }
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
          <Link href="/" className="flex flex-col items-start gap-0.5 group">
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

          {/* Right: Desktop CTA */}
          <div className="hidden lg:block">
            <BrassButton en="Enquire" size="sm" variant="primary" href="/contact" />
          </div>

          {/* Mobile: Hamburger Toggle */}
          <button
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 relative z-50"
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
