/**
 * Adhika Masa detection + Purnimanta month boundary logic.
 *
 * Two-layer algorithm:
 *
 *   Layer 1 — Amanta (detection):
 *     Bracket the date by two consecutive Amavasyas (new moons) using
 *     astronomy-engine's `SearchMoonPhase`. Compare the Sun's sidereal
 *     rashi at each Amavasya:
 *       • Same rashi at both boundaries → no Sankranti → Adhika Masa.
 *       • Different rashi → normal (Nija) month.
 *     The month is named by the Sun's rashi at the START of the Amanta
 *     month, fed into the existing LUNAR_MONTH lookup tables.
 *
 *   Layer 2 — Purnimanta (display):
 *     Check the current Paksha via Moon–Sun elongation:
 *       • Shukla Paksha (0°–180°): displayed month = current Amanta month.
 *       • Krishna Paksha (180°–360°): displayed month = NEXT Amanta month.
 *     This ensures the month name rolls over at Purnima, matching the
 *     Purnimanta convention the UI already follows.
 *
 * Cost: 2–3 `SearchMoonPhase` calls (~1–2 ms each) + a few sun-longitude
 * evaluations. Computed once per sunrise rollover in `bundleForSunrise`,
 * so there is zero per-tick overhead.
 *
 * Accuracy: astronomy-engine is arcsecond-level for Sun and Moon. The
 * Adhika boundary is a ~30-day window — detection margin is enormous
 * compared to any ephemeris error. Works for any date within the
 * library's accuracy range (centuries either side of J2000).
 */

import * as Astronomy from 'astronomy-engine';
import { tropicalToSidereal, normaliseDeg } from './ayanamsha';
import {
  sunLongitudeTropical,
  moonLongitudeTropical,
} from './solar';

// ── Public interface ─────────────────────────────────────────────────────

export interface LunarMonthInfo {
  /** Whether the displayed Purnimanta month is Adhika (intercalary). */
  isAdhika: boolean;
  /** Rashi index (0–11) to feed into LUNAR_MONTH_EN / LUNAR_MONTH_HI. */
  monthRashiIndex: number;
}

export interface DayLunarMonths {
  shuklaMonth: LunarMonthInfo;
  krishnaMonth: LunarMonthInfo;
  /** Properties of the next Amanta month (used if Amavasya occurs today). */
  nextAmantaMonth: LunarMonthInfo;
  /** The exact UTC time of the upcoming New Moon (Amavasya) transition. */
  nextNewMoonUtc: Date;
}

/**
 * Pre-calculate the Shukla and Krishna month configurations for the day starting at sunrise.
 * Keeps expensive ephemeris searches inside a single daily execution.
 */
export function calculateDayLunarMonths(sunriseUtc: Date): DayLunarMonths {
  // ── Layer 1: current Amanta month ────────────────────────────────────
  const prevAmavasya = findPreviousNewMoon(sunriseUtc);
  const nextAmavasya = findNextNewMoon(sunriseUtc);
  const nextNextAmavasya = findNextNewMoon(nextAmavasya);

  const startRashi = sunSiderealRashiAt(prevAmavasya);
  const endRashi = sunSiderealRashiAt(nextAmavasya);
  const nextEndRashi = sunSiderealRashiAt(nextNextAmavasya);

  const currentAmantaIsAdhika = startRashi === endRashi;
  const nextAmantaIsAdhika = endRashi === nextEndRashi;

  return {
    shuklaMonth: {
      isAdhika: currentAmantaIsAdhika,
      monthRashiIndex: startRashi,
    },
    krishnaMonth: {
      isAdhika: currentAmantaIsAdhika,
      monthRashiIndex: endRashi, // base name advances to next Amanta
    },
    nextAmantaMonth: {
      isAdhika: nextAmantaIsAdhika,
      monthRashiIndex: endRashi,
    },
    nextNewMoonUtc: nextAmavasya,
  };
}

/**
 * Detect the correct Purnimanta lunar month for UI display.
 *
 * @param utcDate — the UTC instant to evaluate (typically sunrise).
 * @returns the month's rashi index and whether it is Adhika.
 */
export function detectPurnimantaMonth(utcDate: Date): LunarMonthInfo {
  const elongation = currentElongation(utcDate);
  const isKrishnaPaksha = elongation >= 180;
  const { shuklaMonth, krishnaMonth } = calculateDayLunarMonths(utcDate);
  return isKrishnaPaksha ? krishnaMonth : shuklaMonth;
}

// ── Internal helpers ─────────────────────────────────────────────────────

/**
 * Find the most recent Amavasya (new moon) strictly before `utcDate`.
 * Searches up to 40 days into the past (max synodic month ≈ 29.5 days).
 */
function findPreviousNewMoon(utcDate: Date): Date {
  const result = Astronomy.SearchMoonPhase(0, utcDate, -40);
  if (!result) {
    throw new Error(
      `adhikaMasa: no previous new moon found within 40 days of ${utcDate.toISOString()}`,
    );
  }
  return result.date;
}

/**
 * Find the next Amavasya (new moon) strictly after `utcDate`.
 * Searches up to 40 days into the future.
 */
function findNextNewMoon(utcDate: Date): Date {
  const result = Astronomy.SearchMoonPhase(0, utcDate, 40);
  if (!result) {
    throw new Error(
      `adhikaMasa: no next new moon found within 40 days of ${utcDate.toISOString()}`,
    );
  }
  return result.date;
}

/**
 * Sun's sidereal rashi index (0–11) at the given UTC instant.
 * Rashi 0 = Mesha (Aries), 1 = Vrishabha (Taurus), etc.
 */
function sunSiderealRashiAt(utcDate: Date): number {
  const tropical = sunLongitudeTropical(utcDate);
  const sidereal = tropicalToSidereal(tropical, utcDate);
  return Math.floor(sidereal / 30);
}

/**
 * Moon–Sun sidereal elongation normalised to [0, 360).
 *   0°–180° = Shukla Paksha (waxing, New Moon → Full Moon)
 *   180°–360° = Krishna Paksha (waning, Full Moon → New Moon)
 */
function currentElongation(utcDate: Date): number {
  const sunTropical = sunLongitudeTropical(utcDate);
  const moonTropical = moonLongitudeTropical(utcDate);
  const sunSid = tropicalToSidereal(sunTropical, utcDate);
  const moonSid = tropicalToSidereal(moonTropical, utcDate);
  return normaliseDeg(moonSid - sunSid);
}
