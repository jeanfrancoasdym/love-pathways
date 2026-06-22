import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Calendar,
  Clock,
  Globe,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Quote,
  ChevronDown,
  Check,
} from "lucide-react";

type AgendaItem = { title: string; desc: string };
type FaqItem = { q: string; a: string };
type Testimonial = { quote: string; name?: string; role?: string };
type Stat = { value: string; label: string };

type WebinarLandingProps = {
  ns: string;
  startDate: string;
  heroBody?: "description" | "paragraphs";
  heroImage: string;
  forYouImage: string;
  learnImage: string;
  presenterImage: string;
  presenterImageAlt?: string;
  languageValue?: string;
  form: React.ReactNode;
  seo?: React.ReactNode;
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

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
  const word = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-display text-4xl font-bold leading-[1.08] text-white md:text-6xl lg:text-[4rem]"
    >
      {words.map((p, i) => (
        <motion.span
          key={i}
          variants={word}
          className={`mr-[0.26em] inline-block ${p.hl ? "text-brand-secondary" : "text-white"}`}
        >
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

/** Live countdown digits, styled for the colored bar. SSR-safe. */
function Countdown({ startDate, t }: { startDate: string; t: (k: string) => string }) {
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
        <span className="font-display font-bold">{t("countdown.live")}</span>
      </div>
    );
  }

  const units: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] = [
    { key: "days", label: t("countdown.days") },
    { key: "hours", label: t("countdown.hours") },
    { key: "minutes", label: t("countdown.minutes") },
    { key: "seconds", label: t("countdown.seconds") },
  ];

  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 lg:block">
        {t("countdown.heading")}
      </span>
      <div className="flex gap-2.5">
        {units.map((u) => {
          const val = left && left !== "live" ? left[u.key] : null;
          return (
            <div key={u.key} className="flex min-w-[54px] flex-col items-center rounded-xl bg-white/15 px-3 py-2 ring-1 ring-white/20">
              <span className="font-display text-2xl font-bold leading-none tabular-nums">
                {val === null ? "--" : String(val).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/70">{u.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                               */
/* ------------------------------------------------------------------ */

export default function WebinarLanding({
  ns,
  startDate,
  heroBody = "description",
  heroImage,
  forYouImage,
  learnImage,
  presenterImage,
  presenterImageAlt,
  languageValue,
  form,
  seo,
}: WebinarLandingProps) {
  const { t } = useTranslation(ns);
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // gentle parallax on the hero image
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const forYouItems = t("forYou.items", { returnObjects: true }) as string[];
  const learnItems = t("learn.items", { returnObjects: true }) as string[];
  const agendaItems = t("agenda.items", { returnObjects: true }) as AgendaItem[];
  const faqItems = t("faq.items", { returnObjects: true }) as FaqItem[];
  const testimonials = t("trust.testimonials", { returnObjects: true }) as Testimonial[];
  const stats = t("trust.stats", { returnObjects: true }) as Stat[];
  const langValue = languageValue ?? t("details.languageValue");
  const presenterName = t("guide.name");
  const presenterRole = t("guide.role");

  const details = [
    { icon: Calendar, label: t("details.dateLabel"), value: t("details.dateValue") },
    { icon: Clock, label: t("details.timeLabel"), value: t("details.timeValue") },
    { icon: Globe, label: t("details.languageLabel"), value: langValue },
  ];

  return (
    <div className="bg-brand-cream text-slate-800">
      {seo}

      {/* ===================== 1 · HERO ===================== */}
      <section ref={heroRef} className="relative flex min-h-[calc(100vh_-_200px)] items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-[10%] h-[120%]">
          <motion.img
            src={heroImage}
            alt=""
            aria-hidden
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 16, ease: "easeOut" }}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-dark/75 to-brand-dark/90" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
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
            <span className="text-sm text-white/70">{t("form.subtitle")}</span>
          </motion.div>
        </div>
      </section>

      {/* ===================== 2 · COUNTDOWN BAR ===================== */}
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
          <Countdown startDate={startDate} t={t} />
        </div>
      </section>

      {/* ===================== 3 · THIS IS FOR YOU ===================== */}
      <section className="mx-auto max-w-[85rem] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl">
              <img src={forYouImage} alt="" aria-hidden className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">{t("forYou.heading")}</h2>
            </Reveal>
            <div className="mt-8 space-y-3">
              {forYouItems.map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex min-h-[68px] items-center gap-4 rounded-2xl">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <HeartHandshake size={20} />
                    </span>
                    <p className="text-base leading-relaxed text-slate-700 md:text-lg">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 4 · REGISTER (guide on navy + wide 2-column form) ===================== */}
      <section className="relative overflow-hidden bg-brand-dark py-16 md:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-brand-primary/15 blur-[120px]" />
        <div className="relative z-10 mx-auto grid max-w-[85rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:gap-14 lg:px-8">
          {/* guide — large photo, no frame; lower body fades into the navy so it never touches the text */}
          <Reveal>
            <div className="text-center text-white lg:text-left">
              <div className="relative mx-auto h-72 w-full max-w-sm lg:mx-0 lg:h-[22rem] lg:max-w-md">
                <motion.img
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src={presenterImage}
                  alt={presenterImageAlt ?? presenterName}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-contain object-bottom"
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-brand-dark to-transparent" />
              </div>
              <div className="relative z-10 -mt-10">
                <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-brand-secondary">{t("guide.eyebrow")}</span>
                <h2 className="mt-2 font-display text-3xl font-bold leading-[1.05] md:text-4xl">{presenterName}</h2>
                <p className="mt-2 font-display text-lg font-semibold text-brand-primary">{presenterRole}</p>
                <p className="mt-3 leading-relaxed text-slate-300">{t("guide.bio")}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15">
                    <Calendar size={16} className="text-brand-secondary" />
                    {t("details.dateValue")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15">
                    <Clock size={16} className="text-brand-secondary" />
                    {t("details.timeValue")}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* form — wide column so the GHL form lays out in 2 columns and stays short */}
          <Reveal delay={0.1}>
            <div
              ref={formRef}
              id="register"
              className="relative scroll-mt-28 overflow-hidden rounded-3xl bg-white p-3 shadow-2xl sm:p-4"
            >
              <h3 className="mb-1 pt-2 text-center font-display text-2xl font-bold text-brand-dark">{t("form.title")}</h3>
              {form}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== 5 · WHAT YOU'LL LEARN (over image) ===================== */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <img src={learnImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
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

      {/* ===================== 8 · AGENDA ===================== */}
      <section className="bg-brand-mist py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-12 text-center font-display text-3xl font-bold text-brand-dark md:text-4xl">{t("agenda.heading")}</h2>
          </Reveal>
          <div className="flex flex-col">
            {agendaItems.map((a, i) => {
              const last = i === agendaItems.length - 1;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-5">
                    {/* node + connector (no line after the last step) */}
                    <div className="flex flex-col items-center self-stretch">
                      <span className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary font-display text-lg font-bold text-white shadow-md">
                        {i + 1}
                      </span>
                      {!last && <span aria-hidden className="mt-2 w-0.5 flex-1 bg-brand-primary/30" />}
                    </div>
                    <div className={`flex-1 ${last ? "" : "pb-6"}`}>
                      <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
                        <h3 className="font-display text-xl font-bold text-brand-dark">{a.title}</h3>
                        <p className="mt-1 leading-relaxed text-slate-600">{a.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== 9 · URGENCY + SECOND CTA ===================== */}
      <section className="bg-brand-secondary/15">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center justify-between gap-5 px-4 py-8 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <p className="font-display text-xl font-bold text-brand-dark md:text-2xl">{t("countdown.heading")}</p>
          <button
            onClick={scrollToForm}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-dark px-8 py-4 font-display text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
          >
            {t("ctaFinal.button")}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* ===================== 10 · FAQ ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-brand-dark md:text-4xl">{t("faq.heading")}</h2>
        </Reveal>
        <div className="space-y-3">
          {faqItems.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <details className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-brand-dark">
                  {f.q}
                  <ChevronDown size={20} className="shrink-0 text-brand-primary transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== 11 · FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-brand-dark py-20 md:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-brand-secondary/15 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="mx-auto max-w-2xl font-display text-2xl font-bold leading-snug text-white md:text-4xl">{t("ctaFinal.line")}</p>
            <button
              onClick={scrollToForm}
              className="group mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-brand-primary px-10 py-5 font-display text-lg font-bold text-white shadow-2xl transition-colors duration-300 hover:bg-brand-secondary hover:text-brand-dark"
            >
              {t("ctaFinal.button")}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
            </button>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-400">{t("privacy")}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
