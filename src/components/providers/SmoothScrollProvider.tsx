"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

import { getPendingHash } from "@/lib/hash-navigation";

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

  // ── Intelligent Hash Navigation & Scroll Management ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    let retryTimeout: NodeJS.Timeout | null = null;
    let confirmTimeout1: NodeJS.Timeout | null = null;
    let confirmTimeout2: NodeJS.Timeout | null = null;
    let attempts = 0;
    const maxAttempts = 25; // Poll up to ~2.5s to ensure dynamic hydration and layout paint

    const scrollToHashTarget = (rawHash: string) => {
      try {
        const id = rawHash.startsWith("#") ? rawHash.slice(1) : rawHash;
        const target = document.getElementById(id) || document.querySelector(`#${CSS.escape(id)}`);

        if (target) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(target as HTMLElement, {
              offset: -90, // Clearance for sticky header
              duration: 1.2,
            });
          } else {
            const y = target.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
          ScrollTrigger.refresh();
          return true;
        }
      } catch (err) {
        console.warn("Invalid hash target:", rawHash, err);
      }
      return false;
    };

    const pollHash = (targetHash: string) => {
      const found = scrollToHashTarget(targetHash);
      if (!found && attempts < maxAttempts) {
        attempts++;
        retryTimeout = setTimeout(() => pollHash(targetHash), 100);
      } else if (found) {
        // Re-confirm scroll position at 250ms and 500ms in case Next.js router scroll fought for (0,0)
        confirmTimeout1 = setTimeout(() => scrollToHashTarget(targetHash), 250);
        confirmTimeout2 = setTimeout(() => scrollToHashTarget(targetHash), 500);
      }
    };

    const targetHash = getPendingHash();

    if (targetHash) {
      // User requested a specific card/anchor (e.g. /glossary#dinamana)
      // Do NOT reset scroll to top (0, 0)! Poll until target is painted, then glide to it.
      pollHash(targetHash);
    } else {
      // Standard route navigation without hash — smoothly reset to top
      const performScrollToTop = () => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      performScrollToTop();
      const rafId = requestAnimationFrame(performScrollToTop);
      const timer = setTimeout(() => {
        // Only reset if no pending hash arrived in the interim
        if (!getPendingHash()) {
          performScrollToTop();
          ScrollTrigger.refresh();
        }
      }, 60);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timer);
      };
    }

    const handleHashEvent = () => {
      attempts = 0;
      const latestHash = getPendingHash();
      if (latestHash) {
        pollHash(latestHash);
      }
    };

    window.addEventListener("hashchange", handleHashEvent);
    window.addEventListener("app-hashchange", handleHashEvent);
    window.addEventListener("app-locationchange", handleHashEvent);

    return () => {
      if (retryTimeout) clearTimeout(retryTimeout);
      if (confirmTimeout1) clearTimeout(confirmTimeout1);
      if (confirmTimeout2) clearTimeout(confirmTimeout2);
      window.removeEventListener("hashchange", handleHashEvent);
      window.removeEventListener("app-hashchange", handleHashEvent);
      window.removeEventListener("app-locationchange", handleHashEvent);
    };
  }, [pathname]);

  return <>{children}</>;
}
