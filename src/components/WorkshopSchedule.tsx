import { useTranslation } from "react-i18next";

export type WorkshopChapter = {
  number: number;
  title: string;
  coreTopic: string;
  date: string;
  time: string;
  description: string;
};

// Horizontal rail of chapter cards (photo background + gradient, same treatment
// as the Events page cards). It never wraps to a second row: below xl it is a
// snap-scrolling row, at xl it becomes a 5-column grid so all five chapters sit
// on one line. Used by both the registration page and the thank-you page so the
// schedule always looks identical.
//
// Alignment is driven from the TOP of the card, not the bottom. The header
// block has a fixed height, so the title always starts at the same offset no
// matter how long the description runs, and the title and topic each reserve
// two lines so a one-line title still lines up with a two-line one. Cards
// stretch to a shared height (grid and flex both stretch by default), which
// lets descriptions render in full instead of being truncated.
export default function WorkshopSchedule({ chapters }: { chapters: WorkshopChapter[] }) {
  const { t } = useTranslation("workshopSeries");

  return (
    <div className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-4 xl:grid xl:grid-cols-5 xl:overflow-visible xl:pb-0">
      {chapters.map((c) => (
        <div
          key={c.number}
          className="w-[78%] shrink-0 snap-start sm:w-[300px] lg:w-[320px] xl:w-auto"
        >
          <div className="relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[1.75rem] shadow-lg">
            <img
              src={c.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-brand-dark/50" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/65 to-brand-dark/45" />

            {/* Fixed-height header, which is what makes every title start on the
                same line. Hierarchy runs eyebrow > date > time: the accent color
                is spent once, on the chapter label, so the date reads as the
                primary line and the time recedes. */}
            <div className="relative z-10 flex h-48 shrink-0 flex-col p-5">
              <div className="flex items-center gap-3">
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-brand-secondary">
                  {t("schedule.chapterLabel")} {String(c.number).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px flex-1 bg-white/25" />
              </div>
              <p className="mt-3.5 font-display text-[15px] font-semibold leading-tight text-white">
                {c.date}
              </p>
              <p className="mt-1 text-xs font-medium text-white/55">{c.time}</p>
            </div>

            <div className="relative z-10 flex flex-col p-5 pt-0 text-white">
              <h3 className="flex min-h-[3.1rem] items-end font-display text-lg font-bold leading-snug">
                {c.title}
              </h3>
              <p className="mt-1.5 min-h-[2.25rem] text-[13px] font-semibold leading-snug text-brand-secondary/90">
                {c.coreTopic}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/75">{c.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
