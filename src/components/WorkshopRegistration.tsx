import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, Clock, Repeat, ArrowRight, Check } from "lucide-react";
import GhlForm from "./GhlForm";
import { ghl, siteOrigin } from "../data/site";
import Seo from "./Seo";
import { breadcrumbLd, eventSeriesLd, graph, localeUrl, organizationLd, webSiteLd } from "../seo/structuredData";
import { useLocale } from "../i18n/useLocale";
import WorkshopSchedule from "./WorkshopSchedule";

// Chapter 1 (Aug 26, 6:00 PM PDT) — the countdown bar targets the series
// start, since the schedule below covers all five dates.
const SERIES_START = "2026-08-26T18:00:00-07:00";
const SERIES_END = "2026-09-23T19:00:00-07:00";

// Wednesdays, 6:00 to 7:00 PM PDT. Drives the EventSeries subEvent nodes so the
// five sessions are machine readable, not just rendered as card text.
const CHAPTER_TIMES: [string, string][] = [
  ["2026-08-26T18:00:00-07:00", "2026-08-26T19:00:00-07:00"],
  ["2026-09-02T18:00:00-07:00", "2026-09-02T19:00:00-07:00"],
  ["2026-09-09T18:00:00-07:00", "2026-09-09T19:00:00-07:00"],
  ["2026-09-16T18:00:00-07:00", "2026-09-16T19:00:00-07:00"],
  ["2026-09-23T18:00:00-07:00", "2026-09-23T19:00:00-07:00"],
];

const CHAPTER_IMAGES = [
  "/page-hero/workshop-ch1-filter.webp",
  "/page-hero/workshop-ch2-valuable.webp",
  "/page-hero/workshop-ch3-cultures.webp",
  "/page-hero/workshop-ch4-productivity.webp",
  "/page-hero/workshop-ch5-reset.webp",
];

type Chapter = { number: number; title: string; coreTopic: string; date: string; time: string; description: string };

/** Subtle fade-up on scroll. Content stays in the DOM for crawlers. */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Headline that reveals word by word. Highlighted words use the lime accent. */
function AnimatedHeadline({ before, highlight, after }: { before: string; highlight: string; after: string }) {
  const words = [
    ...before.trim().split(/\s+/).filter(Boolean).map((w) => ({ w, hl: false })),
    ...highlight.trim().split(/\s+/).filter(Boolean).map((w) => ({ w, hl: true })),
    ...after.trim().split(/\s+/).filter(Boolean).map((w) => ({ w, hl: false })),
  ];
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
  const word = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
  return (
    <motion.h1 variants={container} initial="hidden" animate="show" className="font-display text-5xl font-bold leading-[1.04] text-white md:text-7xl lg:text-[5.5rem]">
      {words.map((p, i) => (
        <motion.span key={i} variants={word} className={`mr-[0.26em] inline-block ${p.hl ? "text-brand-secondary" : "text-white"}`}>
          {p.w}
        </motion.span>
      ))}
    </motion.h1>
  );
}

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number } | "live" | null;
function getTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) return "live";
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Countdown({ startDate, liveLabel, headingLabel, units }: { startDate: string; liveLabel: string; headingLabel: string; units: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] }) {
  const target = new Date(startDate).getTime();
  const [left, setLeft] = useState<TimeLeft>(null);
  useEffect(() => {
    setLeft(getTimeLeft(target));
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left === "live") {
    return (
      <div className="inline-flex items-center gap-2.5 rounded-full bg-white/15 px-5 py-2.5 ring-1 ring-white/30">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        <span className="font-display font-bold">{liveLabel}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 lg:block">{headingLabel}</span>
      <div className="flex gap-2.5">
        {units.map((u) => {
          const val = left && left !== "live" ? left[u.key] : null;
          return (
            <div key={u.key} className="flex min-w-[54px] flex-col items-center rounded-xl bg-white/15 px-3 py-2 ring-1 ring-white/20">
              <span className="font-display text-2xl font-bold leading-none tabular-nums">{val === null ? "--" : String(val).padStart(2, "0")}</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/70">{u.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Real copy + schedule from the "Living with Confidence" email series.
export default function WorkshopRegistration() {
  const { t } = useTranslation("workshopSeries");
  const { lng } = useLocale();
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const paragraphs = t("intro.paragraphs", { returnObjects: true }) as string[];
  const stats = t("intro.stats", { returnObjects: true }) as { value: string; label: string }[];
  const rawChapters = t("schedule.chapters", { returnObjects: true }) as Chapter[];
  const chapters = rawChapters.map((c, i) => ({ ...c, image: CHAPTER_IMAGES[i] }));
  const learnItems = t("learn.items", { returnObjects: true }) as string[];

  const details = [
    { icon: Calendar, value: t("details.dateValue") },
    { icon: Clock, value: t("details.timeValue") },
    { icon: Repeat, value: t("details.formatValue") },
  ];

  return (
    <div className="bg-brand-cream text-slate-800">
      <Seo
        pageKey="workshopRegistration"
        path="/workshop-registration"
        image="/page-hero/workshop-hero.webp"
        jsonLd={graph(
          organizationLd(),
          webSiteLd(lng),
          eventSeriesLd(lng, {
            name: t("seriesName"),
            description: t("hero.subtitle"),
            startDate: SERIES_START,
            endDate: SERIES_END,
            url: localeUrl(lng, "/workshop-registration"),
            image: `${siteOrigin}/page-hero/workshop-hero.webp`,
            performer: { "@type": "Person", name: t("presenter.name") },
            subEvents: chapters.map((c, i) => ({
              name: `${t("schedule.chapterLabel")} ${c.number}: ${c.title}`,
              description: c.description,
              startDate: CHAPTER_TIMES[i][0],
              endDate: CHAPTER_TIMES[i][1],
            })),
          }),
          breadcrumbLd(lng, [
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name: t("seriesName"), path: "/workshop-registration" },
          ])
        )}
      />

      {/* ===================== 1 · HERO ===================== */}
      <section ref={heroRef} className="relative flex min-h-[calc(100vh_-_200px)] items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-[10%] h-[120%]">
          <motion.img
            src="/page-hero/workshop-hero.webp"
            alt=""
            aria-hidden
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 16, ease: "easeOut" }}
            className="h-full w-full object-cover object-bottom"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-dark/75 to-brand-dark/90" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-white ring-1 ring-white/20 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-brand-secondary" />
            {t("hero.badge")}
          </motion.span>

          <AnimatedHeadline before={t("hero.titleBefore")} highlight={t("hero.titleHighlight")} after={t("hero.titleAfter")} />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-primary px-10 py-5 font-display text-lg font-bold text-white shadow-2xl transition-colors duration-300 hover:bg-brand-secondary hover:text-brand-dark"
            >
              {t("ctaFinal.button")}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===================== 2 · DETAILS + COUNTDOWN BAR ===================== */}
      <section className="bg-brand-primary text-white">
        <div className="mx-auto flex max-w-[85rem] flex-col items-center justify-between gap-5 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {details.map((d, i) => (
              <span key={i} className="inline-flex items-center gap-2 font-display font-semibold">
                <d.icon size={18} className="text-white/80" />
                {d.value}
              </span>
            ))}
          </div>
          <Countdown
            startDate={SERIES_START}
            liveLabel="We're live now. Come on in."
            headingLabel="Chapter 1 begins in"
            units={[
              { key: "days", label: "Days" },
              { key: "hours", label: "Hours" },
              { key: "minutes", label: "Min" },
              { key: "seconds", label: "Sec" },
            ]}
          />
        </div>
      </section>

      {/* ===================== 3 · ABOUT THE SERIES ===================== */}
      {/* Image beside the copy instead of a full-width wall of paragraphs. The
          wording is untouched: the only typographic move is lifting the short
          second paragraph into a lead line so the block has some rhythm. The
          image is stretched to the copy column's height (items-stretch plus an
          absolutely positioned img) so it can never overflow its frame. */}
      <section className="mx-auto max-w-[85rem] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[2fr_3fr] lg:gap-14">
          <Reveal className="min-h-[17rem] lg:min-h-0">
            <div className="relative h-full min-h-[17rem] overflow-hidden rounded-[2rem] shadow-xl">
              <img
                src="/page-hero/workshop-about.webp"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
                {t("intro.eyebrow")}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-dark md:text-4xl">
                {t("intro.heading")}
              </h2>
            </Reveal>

            {/* The shape of the series (five weeks, five chapters, an hour
                each) is the thing people scan for, so it gets numerals instead
                of being buried mid-paragraph. */}
            <Reveal delay={0.08}>
              <div className="mt-6 flex rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${i > 0 ? "border-l border-slate-200 pl-4 sm:pl-6" : ""}`}
                  >
                    <span className="block font-display text-3xl font-bold leading-none text-brand-primary">
                      {s.value}
                    </span>
                    <span className="mt-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-7 space-y-4">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  {i === 1 ? (
                    <p className="border-l-2 border-brand-secondary pl-4 font-display text-lg font-semibold leading-snug text-brand-dark md:text-xl">
                      {p}
                    </p>
                  ) : (
                    <p className="text-[15px] leading-relaxed text-slate-700 md:text-base">{p}</p>
                  )}
                </Reveal>
              ))}
            </div>

            {/* Mid-page conversion point: same smooth scroll to the form that
                the hero and the final CTA use. */}
            <Reveal delay={0.1}>
              <button
                onClick={scrollToForm}
                className="group mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-brand-primary px-8 py-4 font-display font-bold text-white shadow-lg transition-colors duration-300 hover:bg-brand-secondary hover:text-brand-dark"
              >
                {t("ctaFinal.button")}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== 4 · SCHEDULE (horizontal rail) ===================== */}
      <section className="bg-brand-mist py-16 md:py-24">
        <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-brand-dark md:text-4xl">{t("schedule.heading")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">{t("schedule.subheading")}</p>
          </Reveal>
          <div className="mt-12">
            <WorkshopSchedule chapters={chapters} />
          </div>
        </div>
      </section>

      {/* ===================== 5 · WHAT YOU'LL LEARN (over image) ===================== */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <img src="/page-hero/values-sunset.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
        <div aria-hidden className="absolute inset-0 bg-brand-dark/80" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[2.5rem] bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-12">
              <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">{t("learn.heading")}</h2>
              <div className="mt-8 space-y-3">
                {learnItems.map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="flex min-h-[64px] items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-brand-dark">
                        <Check size={20} strokeWidth={3} />
                      </span>
                      <p className="text-base leading-relaxed text-slate-700 md:text-lg">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== 6 · PRESENTER + REGISTER ===================== */}
      <section className="relative overflow-hidden bg-brand-dark pt-16 pb-14 md:pt-20 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-brand-primary/15 blur-[120px]" />
        <div className="relative z-10 mx-auto grid max-w-[85rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:gap-20 lg:px-8">
          <Reveal>
            {/* Image and text share this exact same width/alignment wrapper so
                they're always aligned to each other, on mobile and desktop. */}
            <div className="mx-auto max-w-sm text-center text-white lg:mx-0 lg:max-w-md lg:text-left">
              <div className="relative h-72 w-full lg:h-[22rem]">
                <motion.img
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src="/page-hero/presenter-claudia.webp"
                  alt={t("presenter.name")}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-contain object-bottom lg:object-left-bottom"
                />
                {/* Radial vignette blends all four edges into the dark
                    section instead of just fading the bottom. */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse 65% 60% at 50% 45%, transparent 55%, #232323 100%)" }}
                />
              </div>
              <div className="relative z-10 -mt-10">
                <span className="font-display text-base font-bold uppercase tracking-[0.28em] text-brand-secondary">{t("presenter.eyebrow")}</span>
                <h2 className="mt-2 font-display text-3xl font-bold leading-[1.05] md:text-4xl">{t("presenter.name")}</h2>
                <p className="mt-2 font-display text-lg font-semibold text-brand-primary">{t("presenter.role")}</p>
                <p className="mt-3 leading-relaxed text-slate-300">{t("presenter.bio")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div ref={formRef} id="register" className="relative scroll-mt-28 overflow-hidden rounded-3xl bg-white p-3 shadow-2xl sm:p-4">
              <h3 className="pt-1 text-center font-display text-2xl font-bold text-brand-dark">{t("form.title")}</h3>
              <p className="mx-auto mb-2 max-w-md px-4 text-center text-sm text-slate-500">{t("form.subtitle")}</p>
              <GhlForm formId={ghl.workshopFormId} name="Living with Confidence" height={540} className="w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== 7 · FINAL CTA ===================== */}
      {/* Deliberately brand-primary (not brand-dark) — the Presenter/Register
          section right above is already brand-dark, and stacking two
          identically-colored sections back to back reads as one giant block. */}
      <section className="relative overflow-hidden bg-brand-primary py-20 md:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-brand-secondary/25 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="mx-auto max-w-2xl font-display text-2xl font-bold leading-snug text-white md:text-4xl">{t("ctaFinal.line")}</p>
            <button
              onClick={scrollToForm}
              className="group mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-brand-dark px-10 py-5 font-display text-lg font-bold text-white shadow-2xl transition-colors duration-300 hover:bg-brand-secondary hover:text-brand-dark"
            >
              {t("ctaFinal.button")}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
            </button>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/70">{t("privacy")}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
