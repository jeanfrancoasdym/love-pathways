import { useEffect, useState } from "react";

// Single source of truth for the "Living with Confidence" 5-week series.
//
// The chapter COPY (titles, core topics, per-locale date labels) lives in
// src/i18n/locales/<lng>/workshopSeries.json. This module owns only the
// machine-readable times, the per-chapter images, and the "which chapter is
// next" decision, so the registration page, the thank-you page and the
// /events card can never disagree about which session is coming up.

/** Stamped in by vite.config.ts (define). See useNextChapterIndex below. */
declare const __BUILD_TIME__: string;

/**
 * Wednesdays, 6:00 to 7:00 PM PDT. Index matches schedule.chapters in
 * workshopSeries.json, so CHAPTER_TIMES[i] describes chapters[i].
 */
export const CHAPTER_TIMES: [string, string][] = [
  ["2026-08-26T18:00:00-07:00", "2026-08-26T19:00:00-07:00"],
  ["2026-09-02T18:00:00-07:00", "2026-09-02T19:00:00-07:00"],
  ["2026-09-09T18:00:00-07:00", "2026-09-09T19:00:00-07:00"],
  ["2026-09-16T18:00:00-07:00", "2026-09-16T19:00:00-07:00"],
  ["2026-09-23T18:00:00-07:00", "2026-09-23T19:00:00-07:00"],
];

export const CHAPTER_IMAGES = [
  "/page-hero/workshop-ch1-filter.webp",
  "/page-hero/workshop-ch2-valuable.webp",
  "/page-hero/workshop-ch3-cultures.webp",
  "/page-hero/workshop-ch4-productivity.webp",
  "/page-hero/workshop-ch5-reset.webp",
];

/** First chapter that hasn't ended yet, or the last one once the series is over. */
export function nextChapterIndex(now: number): number {
  const i = CHAPTER_TIMES.findIndex(([, end]) => new Date(end).getTime() > now);
  return i === -1 ? CHAPTER_TIMES.length - 1 : i;
}

// The pages are prerendered, so this is the chapter that gets written into the
// static HTML. Deriving it from the BUILD's clock (not Date.now()) is what lets
// the client's first render match that HTML instead of tripping hydration.
const BUILD_INDEX = nextChapterIndex(Date.parse(__BUILD_TIME__));

/**
 * Which chapter to feature. Starts from the value baked in at build time, so
 * the prerendered HTML hydrates cleanly, then corrects itself against the
 * visitor's own clock after mount, so a page built before a chapter passed
 * still moves on to the next one without waiting for a redeploy.
 */
export function useNextChapterIndex(): number {
  const [index, setIndex] = useState(BUILD_INDEX);
  useEffect(() => {
    const live = nextChapterIndex(Date.now());
    if (live !== BUILD_INDEX) setIndex(live);
  }, []);
  return index;
}
