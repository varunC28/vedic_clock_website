"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Prevent browser native scroll restore from fighting with smooth momentum
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Premium luxury momentum physics with exponential deceleration
    const lenis = new Lenis({
      duration: 1.25, // Silky weighted horological feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis frame updates directly through GSAP's central RAF ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── Force Scroll-to-Top on Route Navigation ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    const performScrollToTop = () => {
      // Respect anchor hash if one is present (e.g. /#journey)
      if (window.location.hash) {
        try {
          const target = document.querySelector(window.location.hash);
          if (target) {
            lenisRef.current?.scrollTo(target as HTMLElement, { immediate: true });
            return;
          }
        } catch {
          // Fall through to top if selector invalid
        }
      }

      // 1. Immediately reset Lenis internal scroll position & velocity
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }

      // 2. Immediately reset native window & document scroll positions
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate execution
    performScrollToTop();

    // Secondary execution on next frame to catch Next.js DOM swap
    const rafId = requestAnimationFrame(performScrollToTop);

    // Tertiary settle tick for image/font layout shifts
    const timer = setTimeout(() => {
      performScrollToTop();
      ScrollTrigger.refresh();
    }, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [pathname]);

  return <>{children}</>;
}
