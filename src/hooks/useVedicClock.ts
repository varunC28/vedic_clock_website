"use client";
/**
 * React hook that drives the UI — a TypeScript port of the Flutter
 * codebase's `lib/controllers/clock_controller.dart`, with one
 * deliberate divergence from the Flutter behaviour:
 *
 * ── Live Panchang ──────────────────────────────────────────────────────
 * The Flutter version computed the Panchang ONCE per Vedic day, at the
 * moment of sunrise, and froze it for the next 24 h — faithful to how
 * Drik almanacs *print* the panchang, but misleading on a digital
 * display where a viewer at 15:55 IST sees "Dwadashi 74 %" and
 * (reasonably) reads that as the current tithi rather than the
 * sunrise-time snapshot.
 *
 * Here we split the panchang into two halves:
 *
 *   • Per-day (frozen at sunrise rollover):
 *       sunriseUtc · sunsetUtc · nextSunriseUtc
 *       sunriseIst (Vedic-day anchor for Vara)
 *       Vikram Samvat year · Hindu lunar month · today's festival
 *
 *   • Per-tick (recomputed every second from current sun + moon longs):
 *       tithi · nakshatra · yoga · karana · sun rashi · moon rashi
 *       (Vara comes from the per-day sunriseIst, so it advances only
 *        at sunrise rollover.)
 *
 * Cost per tick is ~1–2 ms (two astronomy-engine calls). On a 1 Hz
 * timer that's < 0.2 % of one core, fine for a kiosk.
 *
 * ── Responsibilities ───────────────────────────────────────────────────
 *   1. Re-compute the sunrise/sunset pair at boot, on sunrise rollover,
 *      AND on backward clock jumps (NTP sync) — see `needsRebundle`.
 *   2. Recompute the variable panchang limbs every tick.
 *   3. Survive an ephemeris failure (warn + retry next tick) so a
 *      transient throw doesn't unmount the React tree.
 *
 * Consumers just call `const state = useVedicClock();` and re-render.
 */

import { useEffect, useRef, useState } from 'react';
import { fromIst, IST_OFFSET_MS } from '../config';
import {
  lunarMonthEnFull,
  lunarMonthHiFull,
  vikramSamvatYearFor,
} from '../data/hinduCalendar';
import { festivalForIstDate } from '../data/festivals';
import { Festival, VedicClockState } from '../models';
import { normaliseDeg, tropicalToSidereal } from '../core/ayanamsha';
import {
  calculateDayLunarMonths,
  LunarMonthInfo,
} from '../core/adhikaMasa';
import { computeLivePanchang } from '../core/livePanchang';
import {
  moonLongitudeTropical,
  sunLongitudeTropical,
  sunsetOn,
} from '../core/solar';
import { needsRebundle, resolveSunrisePair } from '../core/sunrisePair';
import { computeVedicClockState } from '../core/vedicClockService';

interface DayBundle {
  sunriseUtc: Date;
  sunsetUtc: Date;
  nextSunriseUtc: Date;
  /** IST wall-clock of `sunriseUtc` — anchor for Vara + civil-date lookups. */
  sunriseIst: Date;
  vikramSamvatYear: number;
  shuklaMonth: LunarMonthInfo;
  krishnaMonth: LunarMonthInfo;
  nextAmantaMonth: LunarMonthInfo;
  nextNewMoonUtc: Date;
  festival: Festival | null;
}

/**
 * Resolve everything that's anchored to a sunrise.
 *
 * Lunar month is derived via the two-layer algorithm in adhikaMasa.ts:
 *   Layer 1 (Amanta): bracket by Amavasyas, check for Sankranti → Adhika?
 *   Layer 2 (Purnimanta): if Krishna Paksha, advance to next Amanta month.
 * The other limbs are NOT cached on the bundle — they're recomputed
 * every tick from the current instant.
 */
function bundleForSunrise(sunriseUtc: Date, nextSunriseUtc: Date): DayBundle {
  // Detect the Shukla and Krishna lunar months with Adhika Masa awareness.
  const { shuklaMonth, krishnaMonth, nextAmantaMonth, nextNewMoonUtc } = calculateDayLunarMonths(sunriseUtc);

  const sunriseIst = new Date(sunriseUtc.getTime() + IST_OFFSET_MS);

  const sunriseCivilIst = new Date(Date.UTC(
    sunriseIst.getUTCFullYear(),
    sunriseIst.getUTCMonth(),
    sunriseIst.getUTCDate(),
    0, 0, 0, 0,
  ));
  const sunsetUtc = sunsetOn(sunriseCivilIst);
  let festival = festivalForIstDate(sunriseCivilIst);

  // Allow URL query parameter on web to test festival visuals on any screen
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    try {
      const params = new URLSearchParams(window.location.search);
      const testFest = params.get('testFestival') || params.get('festival');
      if (testFest) {
        if (testFest === 'longest' || testFest === 'dussehra') {
          festival = {
            dateGregorian: '2026-10-20',
            nameEn: 'Dussehra (Vijayadashami)',
            nameHi: 'दशहरा',
            type: 'Lunar',
            observance: 'Major',
          };
        } else if (testFest === 'janmashtami') {
          festival = {
            dateGregorian: '2026-09-04',
            nameEn: 'Krishna Janmashtami',
            nameHi: 'कृष्ण जन्माष्टमी',
            type: 'Lunar',
            observance: 'Major',
          };
        } else if (testFest === 'ugadi') {
          festival = {
            dateGregorian: '2026-03-19',
            nameEn: 'Gudi Padwa / Ugadi',
            nameHi: 'उगादि',
            type: 'Lunisolar',
            observance: 'Major',
          };
        } else {
          // Default test festival: Ganesh Chaturthi
          festival = {
            dateGregorian: '2026-09-15',
            nameEn: 'Ganesh Chaturthi',
            nameHi: 'गणेश चतुर्थी',
            type: 'Lunar',
            observance: 'Major',
          };
        }
      }
    } catch {
      // Ignore if URLSearchParams is unavailable
    }
  }

  return {
    sunriseUtc,
    sunsetUtc,
    nextSunriseUtc,
    sunriseIst,
    vikramSamvatYear: vikramSamvatYearFor(sunriseIst),
    shuklaMonth,
    krishnaMonth,
    nextAmantaMonth,
    nextNewMoonUtc,
    festival,
  };
}

/**
 * Subscribe-to-the-clock hook. Returns the latest `VedicClockState` or
 * `null` during the very first render before the sunrise compute lands.
 *
 * Tick rate is 1 Hz — finer than that would just spam re-renders, since
 * the smallest visible subdivision (kashtha) is 3.2 s long.
 */
export function useVedicClock(): VedicClockState | null {
  const [state, setState] = useState<VedicClockState | null>(null);
  const dayBundleRef = useRef<DayBundle | null>(null);

  useEffect(() => {
    function recomputeBundle(now: Date): DayBundle {
      const { sunrise, nextSunrise } = resolveSunrisePair(now);
      const bundle = bundleForSunrise(sunrise, nextSunrise);
      dayBundleRef.current = bundle;
      return bundle;
    }

    function tick() {
      const now = new Date();
      const existing = dayBundleRef.current;
      let bundle: DayBundle | null = existing;
      if (needsRebundle(now, existing?.sunriseUtc ?? null, existing?.nextSunriseUtc ?? null)) {
        try {
          bundle = recomputeBundle(now);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('useVedicClock: ephemeris failure, retrying next tick', e);
          return;
        }
      }
      if (!bundle) return;

      // Recompute the variable Panchang limbs from the current instant so
      // the kiosk advances tithi/nakshatra/yoga/karana through the day,
      // matching what a viewer at 15:55 IST expects to see.
      let livePanchang;
      try {
        livePanchang = computeLivePanchang({
          nowUtc: now,
          sunriseIst: bundle.sunriseIst,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('useVedicClock: live panchang failure, skipping tick', e);
        return;
      }

      // Resolve month names in real-time based on the live paksha
      const hasPassedNewMoon = now.getTime() >= bundle.nextNewMoonUtc.getTime();
      const activeMonth = hasPassedNewMoon
        ? bundle.nextAmantaMonth
        : (livePanchang.tithi.paksha === 'shukla' ? bundle.shuklaMonth : bundle.krishnaMonth);

      const lunarMonthEn = lunarMonthEnFull(activeMonth.monthRashiIndex, activeMonth.isAdhika);
      const lunarMonthHi = lunarMonthHiFull(activeMonth.monthRashiIndex, activeMonth.isAdhika);

      setState(computeVedicClockState({
        nowUtc: now,
        sunriseUtc: bundle.sunriseUtc,
        sunsetUtc: bundle.sunsetUtc,
        nextSunriseUtc: bundle.nextSunriseUtc,
        panchang: livePanchang,
        vikramSamvatYear: bundle.vikramSamvatYear,
        lunarMonthEn,
        lunarMonthHi,
        todayFestival: bundle.festival,
      }));
    }

    // Seed once immediately, then tick 1 Hz.
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return state;
}

// Re-exported so callers don't have to dig into ./config for the obvious helper.
export { fromIst, normaliseDeg };
