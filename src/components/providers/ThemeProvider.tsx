"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

export type Theme = "cosmic" | "parchment";

interface ThemeContextType {
  theme: Theme;
  isParchment: boolean;
  toggleTheme: (event?: React.MouseEvent) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "cosmic",
  isParchment: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("cosmic");
  const [fallbackRipple, setFallbackRipple] = useState<{
    x: number;
    y: number;
    color: string;
    targetRadius: number;
  } | null>(null);

  const rippleRef = useRef<HTMLDivElement>(null);

  // Synchronize with localStorage if available, defaulting to "cosmic"
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vedic-theme") as Theme | null;
      if (saved === "cosmic" || saved === "parchment") {
        setThemeState(saved);
      }
    } catch {
      // ignore in environments without localStorage
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("vedic-theme", newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = (event?: React.MouseEvent) => {
    const next: Theme = theme === "cosmic" ? "parchment" : "cosmic";

    // 1. Get click coordinates originating from the Moon / Sun toggle button
    let x = typeof window !== "undefined" ? window.innerWidth - 60 : 0;
    let y = 35;

    if (event?.currentTarget) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      x = Math.round(rect.left + rect.width / 2);
      y = Math.round(rect.top + rect.height / 2);
    } else if (event?.clientX !== undefined && event?.clientY !== undefined) {
      x = event.clientX;
      y = event.clientY;
    }

    const endRadius = typeof window !== "undefined"
      ? Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        )
      : 1200;

    // 2. Modern Native View Transition API (Chrome, Edge, Safari 18+)
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const savedScrollY = typeof window !== "undefined" ? window.scrollY : 0;

      const transition = (document as any).startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
        });
        // Anchor scroll position to prevent layout shifts or pin-spacer recalculation jumps
        if (typeof window !== "undefined" && window.scrollY !== savedScrollY) {
          window.scrollTo({ top: savedScrollY, behavior: "instant" });
        }
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500, // Silky, responsive 500ms horological reveal
            easing: "cubic-bezier(0.22, 1, 0.36, 1)", // Luxury deceleration
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
      return;
    }

    // 3. Fallback Smooth Circular Shockwave for older browsers without startViewTransition
    setFallbackRipple({
      x,
      y,
      color: next === "parchment" ? "#F3E9D2" : "#03060E",
      targetRadius: endRadius,
    });

    setTimeout(() => {
      setTheme(next);
    }, 250);

    setTimeout(() => {
      setFallbackRipple(null);
    }, 600);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isParchment: theme === "parchment",
        toggleTheme,
        setTheme,
      }}
    >
      {children}

      {/* Fallback Animated Radial Shockwave Overlay */}
      {fallbackRipple && (
        <div
          ref={rippleRef}
          className="fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-500"
          style={{
            backgroundColor: fallbackRipple.color,
            clipPath: `circle(${fallbackRipple.targetRadius}px at ${fallbackRipple.x}px ${fallbackRipple.y}px)`,
            transition: "clip-path 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
