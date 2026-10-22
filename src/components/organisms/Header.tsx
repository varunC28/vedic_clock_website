"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/molecules/NavItem";
import { BrassButton } from "@/components/atoms/BrassButton";
import { CelestialThemeToggle } from "@/components/atoms/CelestialThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getWhatsAppUrl } from "@/config";

const NAV_LINKS = [
  { href: "/", en: "Home", hi: "मुख्य पृष्ठ" },
  { href: "https://app.thevedicghadi.in", en: "The Clock", hi: "वेदिक घड़ी" },
  { href: "/heritage", en: "Heritage", hi: "धरोहर" },
  { href: "/guide", en: "Guide", hi: "मार्गदर्शिका" },
  { href: "/blog", en: "Blog", hi: "लेख" },
  { href: "/faq", en: "FAQ", hi: "प्रश्नोत्तरी" },
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
    setMenuOpen(false);
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

  // Lock body and html scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          (alwaysVisible || scrolled || menuOpen)
            ? isParchment
              ? "translate-y-0 opacity-100 bg-[#F3E9D2]/95 backdrop-blur-lg border-b border-[#B8873D]/25 shadow-md shadow-[#3D2A1A]/5 pointer-events-auto"
              : "translate-y-0 opacity-100 bg-void-navy/90 backdrop-blur-lg border-b border-brass/10 shadow-lg shadow-black/30 pointer-events-auto"
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
            <span
              className={cn(
                "font-serif text-[10px] sm:text-xs uppercase tracking-[0.3em] transition-colors",
                isParchment
                  ? "text-[#3D2A1A] group-hover:text-[#8C5D33]"
                  : "text-ivory group-hover:text-antique-gold"
              )}
            >
              Vedic
            </span>
            <span
              className={cn(
                "font-hindi text-lg sm:text-xl leading-none transition-colors",
                isParchment
                  ? "text-[#8C5D33] group-hover:text-[#3D2A1A]"
                  : "text-antique-gold group-hover:text-ivory"
              )}
            >
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
                variant={isParchment ? "light" : "dark"}
              />
            ))}
          </nav>

          {/* Right: Desktop CTA + Sun/Night Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <BrassButton en="Enquire" size="sm" variant="primary" href={getWhatsAppUrl()} />
            
            {/* Luxury Celestial Horological Theme Toggle */}
            <CelestialThemeToggle
              isParchment={isParchment}
              onToggle={(e) => toggleTheme(e)}
            />
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <CelestialThemeToggle
              isParchment={isParchment}
              onToggle={(e) => toggleTheme(e)}
              size="sm"
              className="z-50"
            />

            <button
              className="flex flex-col items-center justify-center w-10 h-10 gap-1.5 relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <span
                className={cn(
                  "w-6 h-px transition-all duration-300 origin-center",
                  isParchment ? "bg-[#8C5D33]" : "bg-antique-gold",
                  menuOpen && "rotate-45 translate-y-[7px]"
                )}
              />
              <span
                className={cn(
                  "w-6 h-px transition-all duration-300",
                  isParchment ? "bg-[#8C5D33]" : "bg-antique-gold",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-6 h-px transition-all duration-300 origin-center",
                  isParchment ? "bg-[#8C5D33]" : "bg-antique-gold",
                  menuOpen && "-rotate-45 -translate-y-[7px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Menu - Positioned cleanly below the header with dedicated scrolling */}
      <div
        className={cn(
          "fixed top-16 sm:top-20 inset-x-0 bottom-0 z-40 transition-all duration-300 ease-in-out lg:hidden overflow-y-auto overscroll-contain",
          isParchment
            ? "bg-[#F3E9D2]/98 backdrop-blur-xl border-t border-[#B8873D]/15"
            : "bg-void-navy/98 backdrop-blur-xl border-t border-brass/10",
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        )}
      >
        <div className="min-h-full flex flex-col items-center py-8 px-4">
          <div className="my-auto flex flex-col items-center gap-7 w-full max-w-xs">
            <nav className="flex flex-col items-center gap-6 w-full">
              {NAV_LINKS.map((link) => (
                <div key={link.href} onClick={() => setMenuOpen(false)} className="w-full flex justify-center">
                  <NavItem
                    href={link.href}
                    en={link.en}
                    hi={link.hi} // Full bilingual on mobile
                    download={link.download}
                    variant={isParchment ? "light" : "dark"}
                    className="scale-105"
                  />
                </div>
              ))}
            </nav>

            <div onClick={() => setMenuOpen(false)} className="mt-2">
              <BrassButton
                en="Enquire Now"
                hi="पूछताछ करें"
                size="md"
                variant="primary"
                href={getWhatsAppUrl()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
