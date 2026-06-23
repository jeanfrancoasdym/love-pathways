import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { CheckCircle2, Calendar, Clock, Video, Play, Facebook, Instagram } from "lucide-react";
import { useLocale } from "../i18n/useLocale";

type ThankYouLandingProps = {
  ns: string;
  heroImage: string;
  /** ISO start/end in UTC, e.g. "2026-06-23T16:00:00Z" */
  startIso: string;
  endIso: string;
  zoomLink: string;
  seo?: React.ReactNode;
};

const toCal = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

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

function Countdown({ startIso, t }: { startIso: string; t: (k: string) => string }) {
  const target = new Date(startIso).getTime();
  const [left, setLeft] = useState<TimeLeft>(null);
  useEffect(() => {
    setLeft(getTimeLeft(target));
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left === "live") {
    return (
      <div className="flex items-center justify-center gap-2.5 rounded-2xl bg-brand-secondary/15 px-5 py-4 text-brand-dark ring-1 ring-brand-secondary/40">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-secondary opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-secondary" />
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
    <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
      {units.map((u) => {
        const val = left && left !== "live" ? left[u.key] : null;
        return (
          <div key={u.key} className="rounded-2xl bg-brand-mist py-4 text-center ring-1 ring-slate-100">
            <span className="block font-display text-3xl font-bold leading-none text-brand-primary tabular-nums sm:text-4xl md:text-5xl">
              {val === null ? "--" : String(val).padStart(2, "0")}
            </span>
            <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">{u.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ThankYouLanding({ ns, heroImage, startIso, endIso, zoomLink, seo }: ThankYouLandingProps) {
  const { t } = useTranslation(ns);
  const { to } = useLocale();

  // Calendar links (deterministic — no Date() so SSR/CSR match)
  const startCal = toCal(startIso);
  const endCal = toCal(endIso);
  const title = encodeURIComponent(t("calendar.eventTitle"));
  const extraDesc = t("calendar.eventDescription", { defaultValue: "" });
  const descText = `${t("calendar.joinVia")}${zoomLink}${extraDesc ? `\n\n${extraDesc}` : ""}`;
  const details = encodeURIComponent(descText);
  const location = encodeURIComponent(zoomLink);
  const googleCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startCal}/${endCal}`;

  const icsDescription = descText.replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Love Pathways Wraparound//Webinar//EN",
    "BEGIN:VEVENT",
    `UID:${ns}-${startCal}@lovepathways.org`,
    `DTSTAMP:${startCal}`,
    `DTSTART:${startCal}`,
    `DTEND:${endCal}`,
    `SUMMARY:${t("calendar.eventTitle")}`,
    `DESCRIPTION:${icsDescription}`,
    `LOCATION:${zoomLink}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  const outlookCalLink = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  return (
    <div className="bg-brand-cream text-slate-800">
      {seo}

      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[44vh] items-center overflow-hidden">
        <motion.img
          src={heroImage}
          alt=""
          aria-hidden
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-dark/80 to-brand-dark/90" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-12 text-center sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-secondary/15 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-secondary ring-1 ring-brand-secondary/40"
          >
            <CheckCircle2 size={15} />
            {t("hero.badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-tight text-white md:text-7xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/85 md:text-2xl"
          >
            {t("hero.confirmBefore")} <span className="font-bold text-brand-secondary">{t("hero.highlight")}</span> {t("hero.confirmAfter")}
          </motion.p>
        </div>
      </section>

      {/* ===================== UPCOMING EVENT CARD (overlaps hero) ===================== */}
      <section className="relative z-20 mx-auto -mt-20 max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl"
        >
          <div className="flex items-center gap-3 bg-brand-primary px-7 py-5 text-white md:px-10">
            <Calendar size={22} />
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em]">{t("countdown.heading")}</span>
          </div>

          <div className="p-7 md:p-10">
            <Countdown startIso={startIso} t={t} />

            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-slate-100 pt-8 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Calendar size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("details.dateLabel")}</span>
                  <span className="block font-display font-semibold text-brand-dark">{t("details.dateValue")}</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Clock size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("details.timeLabel")}</span>
                  <span className="block font-display font-semibold text-brand-dark">{t("details.timeValue")}</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Video size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("details.locationLabel")}</span>
                  <span className="block font-display font-semibold text-brand-dark">{t("details.locationValue")}</span>
                  <span className="block text-sm text-slate-500">{t("details.locationNote")}</span>
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8 text-center">
              <p className="mb-5 font-bold text-brand-dark">{t("details.calendarPrompt")}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={googleCalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-slate-200 py-4 px-6 font-medium text-brand-dark transition-all hover:border-brand-primary hover:bg-slate-50 hover:shadow-md"
                >
                  <Calendar size={20} className="text-brand-primary" />
                  {t("details.googleCalendar")}
                </a>
                <a
                  href={outlookCalLink}
                  download="event.ics"
                  className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-brand-dark py-4 px-6 font-medium text-white transition-all hover:bg-brand-primary hover:shadow-md"
                >
                  <Calendar size={20} />
                  {t("details.outlookCalendar")}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===================== RESOURCES ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-brand-mist px-7 py-7 text-center sm:flex-row sm:text-left md:px-10"
        >
          <p className="font-display text-lg font-bold text-brand-dark">{t("resources.prompt")}</p>
          <Link
            to={to("/resource-hub?tab=Webinars")}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-primary px-8 py-3.5 font-bold text-white transition-colors hover:bg-brand-dark"
          >
            <Play size={16} fill="currentColor" /> {t("resources.watch")}
          </Link>
        </motion.div>
      </section>

      {/* ===================== SOCIAL ===================== */}
      <section className="relative overflow-hidden bg-brand-cream py-16 md:py-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-brand-secondary/15 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">{t("social.heading")}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-dark/70">{t("social.description")}</p>
            <div className="mt-9 flex items-center justify-center gap-5">
              <a
                href="https://www.facebook.com/lovepathways"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.facebookLabel")}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-brand-dark/5 text-brand-primary ring-1 ring-brand-dark/10 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-primary hover:text-white"
              >
                <Facebook size={28} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/lovepathwayswraparound/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.instagramLabel")}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-brand-dark/5 text-brand-primary ring-1 ring-brand-dark/10 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-primary hover:text-white"
              >
                <Instagram size={28} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
