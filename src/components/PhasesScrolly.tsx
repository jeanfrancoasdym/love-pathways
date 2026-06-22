import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck, MessagesSquare, ClipboardList, HeartHandshake, Compass, ArrowRight, type LucideIcon } from "lucide-react";
import { useLocale } from "../i18n/useLocale";

type Phase = { key: string; num: string; bg: string; icon: LucideIcon };

// Each phase: themed photo + a meaningful icon.
const PHASES: Phase[] = [
  { key: "engagement", num: "1", bg: "/page-hero/phase-photo-1.webp", icon: MessagesSquare },
  { key: "planDevelopment", num: "2", bg: "/page-hero/phase-photo-2.webp", icon: ClipboardList },
  { key: "implementation", num: "3", bg: "/page-hero/phase-photo-3.webp", icon: HeartHandshake },
  { key: "transition", num: "4", bg: "/page-hero/phase-photo-4.webp", icon: Compass },
];

const N = PHASES.length;
// The scroll track is split into N+1 equal segments: one per phase column, plus
// a final segment that belongs entirely to the CTA. This guarantees the CTA only
// appears AFTER phase 4 has fully revealed, and gets the same scroll dwell as any
// single phase before the section releases to the next one.
const SEGMENTS = N + 1;
const REVEAL = 1 / SEGMENTS; // each column lights up over exactly its own segment

type T = (key: string) => string;

/** Staggered entrance derived from a column's 0->1 reveal value. */
function useStagger(reveal: MotionValue<number>, order: number) {
  const s = Math.min(order * 0.11, 0.5);
  const opacity = useTransform(reveal, [s, s + 0.5], [0, 1]);
  const y = useTransform(reveal, [s, s + 0.5], [30, 0]);
  return { opacity, y };
}

/** Pinned, centered Stage-2 heading. Appears with an effect and then stays put. */
function PhasesHeading({ t }: { t: T }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 mx-auto max-w-none px-6 pt-5 pb-4 text-center text-white md:pt-7"
    >
      <span className="mb-4 inline-flex items-center gap-2.5 rounded-full bg-white/5 px-4 py-2 text-[11px] font-display font-bold uppercase tracking-[0.25em] text-white/70 ring-1 ring-white/10 md:text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" />
        {t("phases.badge")}
      </span>
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:whitespace-nowrap lg:text-[clamp(2.75rem,4.6vw,4.5rem)]">
        {t("phases.titleLead")}
        <span className="italic text-brand-secondary">{t("phases.titleAccent")}</span>
      </h2>
      <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-brand-secondary/80" />
    </motion.div>
  );
}

/** Static photo backdrop (used by the mobile stacked layout). */
function StaticBackdrop({ phase }: { phase: Phase }) {
  return (
    <>
      <img src={phase.bg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
      <div aria-hidden className="absolute inset-0 bg-brand-primary/25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/45 to-brand-dark/20" />
    </>
  );
}

/** Designed phase content with a staggered entrance. */
function PhaseColumnContent({ phase, t, reveal, align = "justify-center pt-[26vh]" }: { phase: Phase; t: T; reveal: MotionValue<number>; align?: string }) {
  const tagA = useStagger(reveal, 0);
  const titleA = useStagger(reveal, 1);
  const descA = useStagger(reveal, 2);
  const ruleScale = useTransform(reveal, [0.4, 0.9], [0, 1]);

  return (
    <div
      className={`absolute inset-0 flex flex-col gap-5 px-7 pb-10 transition-transform duration-300 group-hover:-translate-y-1.5 lg:px-9 ${align}`}
      style={{ textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}
    >
      <motion.p style={tagA} className="font-display text-5xl font-black leading-none text-brand-secondary lg:text-6xl">
        {phase.num}
      </motion.p>

      <motion.div style={titleA}>
        <h3 className="font-display text-4xl font-bold leading-[1.05] text-white [overflow-wrap:anywhere] lg:text-[clamp(1.75rem,2.4vw,3rem)]">
          {t(`phases.items.${phase.key}.title`)}
        </h3>
        <motion.span
          style={{ scaleX: ruleScale }}
          className="mt-5 block h-1.5 w-16 origin-left rounded-full bg-brand-secondary"
        />
      </motion.div>

      <motion.p style={descA} className="max-w-sm text-lg leading-relaxed text-white/90 lg:text-xl">
        {t(`phases.items.${phase.key}.desc`)}
      </motion.p>
    </div>
  );
}

/** One of the four equal columns. Photo reveals with a clip-path wipe + ken-burns;
 *  a top accent bar fills on reveal. */
function RevealColumn({
  index,
  progress,
  phase,
  t,
}: {
  index: number;
  progress: MotionValue<number>;
  phase: Phase;
  t: T;
}) {
  const start = index / SEGMENTS;
  const end = start + REVEAL;
  // Bug 1: no isFirst special case — every column (incl. phase 1) reveals over its
  // own band, so phase 1 also ENTERS with the effect instead of being pre-revealed.
  const reveal = useTransform(progress, [start, end], [0, 1]);

  // Bug 2: reveal is a clip-path wipe + gentle de-blur only. No image scale
  // (ken-burns), so it no longer reads as "just the photo shrinking".
  const insetTop = useTransform(reveal, [0, 0.75], [100, 0]);
  const clip = useMotionTemplate`inset(${insetTop}% 0% 0% 0%)`;
  const blurN = useTransform(reveal, [0, 0.6], [10, 0]);
  const imgFilter = useMotionTemplate`blur(${blurN}px)`;

  return (
    <div className="group relative h-full flex-1 overflow-hidden border-l border-white/10 first:border-l-0">
      <motion.div style={{ clipPath: clip }} className="absolute inset-0">
        <motion.img
          src={phase.bg}
          alt=""
          aria-hidden
          style={{ filter: imgFilter }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-brand-primary/25" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/45 to-brand-dark/20" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ scaleX: reveal }}
        className="absolute inset-x-0 top-0 z-10 h-1 origin-left bg-brand-secondary/80"
      />

      <PhaseColumnContent phase={phase} t={t} reveal={reveal} align="justify-center pt-[16vh] pb-12" />
    </div>
  );
}

/** Shared primary CTA for the phases section. Professional, high-contrast
 *  pill on the navy stage: brand-color gradient fill + a colored glow that
 *  reads as "lifted" (Von Restorff), a light-sweep shine on hover, an upward
 *  lift, a sliding arrow, and a keyboard focus ring. ~2x the previous size. */
function PhasesCTA({ t, to }: { t: T; to: (p: string) => string }) {
  return (
    <Link
      to={to("/contact-us")}
      className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full bg-gradient-to-br from-brand-primary to-[#4f6ae8] px-12 py-6 font-display text-2xl font-bold text-white shadow-[0_20px_50px_-12px_rgba(101,126,246,0.75)] ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_64px_-10px_rgba(101,126,246,0.95)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/50 md:px-16 md:py-8 md:text-3xl"
    >
      {/* light-sweep shine that crosses the button on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{t("phases.cta")}</span>
      <ArrowRight className="relative h-7 w-7 shrink-0 transition-transform duration-300 group-hover:translate-x-2 md:h-8 md:w-8" />
    </Link>
  );
}

function PinnedReveal({ t }: { t: T }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4, restDelta: 0.0005 });
  const { to } = useLocale();

  // Phases finish revealing at N/SEGMENTS (= 0.8 for 4 phases). The CTA fades in
  // only AFTER that, then holds through the entire final segment (0.8 -> 1.0) so
  // it gets a full phase-length of scroll before the section releases.
  const ctaOpacity = useTransform(progress, [0.82, 0.9], [0, 1]);
  const ctaY = useTransform(progress, [0.82, 0.9], [24, 0]);
  const ctaPE = useTransform(progress, [0.85, 0.9], ["none", "auto"]);

  return (
    <section
      ref={ref}
      aria-label="The four phases of wraparound care"
      style={{ height: `${SEGMENTS * 100}vh` }}
      className="relative bg-brand-dark"
    >
      <div className="sticky top-[12vh] h-[88vh] overflow-hidden">
        <div className="absolute inset-0 z-0 flex w-full">
          {PHASES.map((p, i) => (
            <RevealColumn key={p.key} index={i} progress={progress} phase={p} t={t} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/55 to-transparent" />
          <PhasesHeading t={t} />
        </div>
        {/* CTA emerging after phase 4 */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPE }}
          className="absolute inset-x-0 bottom-10 z-30 flex justify-center px-6"
        >
          <PhasesCTA t={t} to={to} />
        </motion.div>
      </div>
    </section>
  );
}

/** SSR / mobile: heading + four stacked full-bleed sections (all content visible). */
function StaticStack({ t }: { t: T }) {
  const one = useMotionValue(1);
  const { to } = useLocale();
  return (
    <div className="bg-brand-dark">
      <PhasesHeading t={t} />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {PHASES.map((p) => (
          <section key={p.key} className="group relative min-h-[68vh] overflow-hidden border-t border-white/10">
            <StaticBackdrop phase={p} />
            <PhaseColumnContent phase={p} t={t} reveal={one} />
          </section>
        ))}
      </div>
      <div className="px-6 py-14 text-center">
        <PhasesCTA t={t} to={to} />
      </div>
    </div>
  );
}

export default function PhasesScrolly() {
  const { t } = useTranslation("program");
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const tt = t as unknown as T;
  return mounted && isDesktop ? <PinnedReveal t={tt} /> : <StaticStack t={tt} />;
}
