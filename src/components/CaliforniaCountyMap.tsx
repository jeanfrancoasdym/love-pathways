import type { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  CA_COUNTIES,
  MAP_WIDTH,
  MAP_HEIGHT,
  SERVED_COUNTIES,
} from "../data/caCounties";

// Map-pin glyph: tip anchored at (0,0), balloon head above it.
const PIN_PATH =
  "M0 0 C -3.5 -5 -5.5 -7 -5.5 -9.5 A 5.5 5.5 0 1 1 5.5 -9.5 C 5.5 -7 3.5 -5 0 0 Z";

const UNSERVED = CA_COUNTIES.filter((c) => !c.served);

// Scroll-in entrance: served counties "paint" dropping from above in a cascade,
// then the pins drop in. (Animation runs client-side only; the static HTML shows
// the finished, painted map for SSG/no-JS.)
const countyVar = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 26 } },
};
const pinVar = {
  hidden: { opacity: 0, y: -28 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 18 } },
};
const countyContainer = { show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const pinContainer = { show: { transition: { staggerChildren: 0.035, delayChildren: 0.45 } } };
// Replays every time the map scrolls into view (low threshold so it triggers
// reliably even though the map SVG is tall).
const VIEWPORT = { once: false, amount: 0.2 } as const;

interface SharedProps {
  active: string | null;
  onActive: Dispatch<SetStateAction<string | null>>;
}

export default function CaliforniaCountyMap({ active, onActive }: SharedProps) {
  const { t } = useTranslation("program");
  const activeCounty = SERVED_COUNTIES.find((c) => c.fips === active) ?? null;

  // On-map name label, clamped inside the viewBox.
  let label: { x: number; y: number; w: number; text: string } | null = null;
  if (activeCounty) {
    const text = activeCounty.name;
    const w = Math.max(70, text.length * 11 + 26);
    const x = Math.min(Math.max(activeCounty.cx, w / 2 + 2), MAP_WIDTH - w / 2 - 2);
    label = { x, y: activeCounty.cy - 26, w, text };
  }

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={t("reach.mapTitle")}
      >
        <title>{t("reach.mapTitle")}</title>
        <desc>{t("reach.mapDesc")}</desc>

        {/* Unserved counties — muted context, not interactive */}
        <g aria-hidden="true">
          {UNSERVED.map((c) => (
            <path key={c.fips} d={c.d} fill="#eef2f7" stroke="#dbe2ea" strokeWidth={0.6} />
          ))}
        </g>

        {/* Served counties — brand color, interactive. Paint-drop on scroll-in. */}
        <motion.g initial="hidden" whileInView="show" viewport={VIEWPORT} variants={countyContainer}>
          {SERVED_COUNTIES.map((c) => {
            const isActive = active === c.fips;
            return (
              <motion.path
                key={c.fips}
                variants={countyVar}
                d={c.d}
                fill={isActive ? "#232323" : "#f7a4a5"}
                stroke="#ffffff"
                strokeWidth={1}
                tabIndex={0}
                role="button"
                aria-label={`${c.name} — ${t("reach.servedLabel")}`}
                className="cursor-pointer outline-none transition-colors duration-200 motion-reduce:transition-none [&:focus-visible]:stroke-[#f8a866] [&:focus-visible]:[stroke-width:2]"
                onMouseEnter={() => onActive(c.fips)}
                onMouseLeave={() => onActive((a) => (a === c.fips ? null : a))}
                onFocus={() => onActive(c.fips)}
                onBlur={() => onActive((a) => (a === c.fips ? null : a))}
              />
            );
          })}
        </motion.g>

        {/* Pins on served counties — drop from above after the counties paint. */}
        <motion.g aria-hidden="true" initial="hidden" whileInView="show" viewport={VIEWPORT} variants={pinContainer}>
          {SERVED_COUNTIES.map((c) => {
            const isActive = active === c.fips;
            return (
              <motion.g key={c.fips} variants={pinVar}>
                <g transform={`translate(${c.cx} ${c.cy})`}>
                  {isActive && <circle cx={0} cy={-9.5} r={11} fill="#ffc774" opacity={0.35} />}
                  <path
                    d={PIN_PATH}
                    fill={isActive ? "#ffc774" : "#232323"}
                    stroke="#ffffff"
                    strokeWidth={1}
                    className="transition-colors duration-200 motion-reduce:transition-none"
                  />
                  <circle cx={0} cy={-9.5} r={2.3} fill="#ffffff" />
                </g>
              </motion.g>
            );
          })}
        </motion.g>

        {/* Active county name label (on-map) */}
        {label && (
          <g aria-hidden="true" className="pointer-events-none">
            <rect
              x={label.x - label.w / 2}
              y={label.y - 15}
              width={label.w}
              height={24}
              rx={6}
              fill="#232323"
            />
            <text
              x={label.x}
              y={label.y}
              textAnchor="middle"
              fontSize={16}
              fontWeight={700}
              fill="#ffffff"
              style={{ fontFamily: "var(--font-display, inherit)" }}
            >
              {label.text}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

export function CountyServeList({ active, onActive }: SharedProps) {
  const { t } = useTranslation("program");
  return (
    <div>
      <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-slate-400 mb-5">
        {t("reach.listHeading")}
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {SERVED_COUNTIES.map((c) => {
          const isActive = active === c.fips;
          return (
            <li key={c.fips}>
              <button
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => onActive(c.fips)}
                onMouseLeave={() => onActive((a) => (a === c.fips ? null : a))}
                onFocus={() => onActive(c.fips)}
                onBlur={() => onActive((a) => (a === c.fips ? null : a))}
                className={`group flex w-full items-center gap-3 border-b py-4 text-left transition-colors duration-150 motion-reduce:transition-none ${
                  isActive ? "border-brand-primary" : "border-slate-100 hover:border-brand-primary"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-150 motion-reduce:transition-none ${
                    isActive ? "bg-brand-dark" : "bg-brand-primary group-hover:bg-brand-dark"
                  }`}
                />
                <span
                  className={`font-display text-base font-bold uppercase tracking-tight transition-colors duration-150 motion-reduce:transition-none ${
                    isActive ? "text-brand-primary" : "text-brand-dark group-hover:text-brand-primary"
                  }`}
                >
                  {c.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
