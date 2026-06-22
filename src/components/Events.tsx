import { Calendar, Clock, ArrowRight, Video } from "lucide-react";
import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { feeds, ghl } from "../data/site";
import { breadcrumbLd, collectionPageLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import { fetchSheet } from "../lib/csv";
import { useLocale } from "../i18n/useLocale";
import Seo from "./Seo";
import PageHero from "./PageHero";
import EnglishContentBadge from "./EnglishContentBadge";

// Theme-matched card background, chosen by keywords in the event title so any
// future webinar gets a relevant atmospheric photo automatically (the sheet's
// own Image column is intentionally ignored). All photos are free Unsplash
// images downloaded at build time into /page-hero — see fetch-hero-images.mjs.
const EVENT_IMAGE_THEMES: { img: string; keywords: string[] }[] = [
  { img: "/page-hero/event-school.webp", keywords: ["classroom", "school", "teacher", "educator", "student", "learning"] },
  { img: "/page-hero/event-calm.webp", keywords: ["defian", "chaos", "meltdown", "tantrum", "calm", "regulat", "stress", "no\""] },
  { img: "/page-hero/event-connection.webp", keywords: ["anger", "angry", "attachment", "outburst", "aggress", "bond", "connect"] },
  // event-family is the default / catch-all (adoptive, foster, family, parenting).
];
const EVENT_IMAGE_DEFAULT = "/page-hero/event-family.webp";

function eventImage(title?: string): string {
  const t = (title || "").toLowerCase();
  for (const theme of EVENT_IMAGE_THEMES) {
    if (theme.keywords.some((k) => t.includes(k))) return theme.img;
  }
  return EVENT_IMAGE_DEFAULT;
}

// Runs at BUILD time (and on client navigation): fetches + parses the events
// sheet so upcoming events are baked into the prerendered HTML.
export async function eventsLoader() {
  try {
    const rows = await fetchSheet(feeds.events);
    // Expected columns: 0: Event Name, 1: Description, 2: Time, 3: Date, 4: Location_Link, 5: Modality, 6: Image
    const parsedEvents = rows.slice(1).map((row, index) => {
      if (row.length < 5) return null;
      const rawLink = row[4]?.trim();
      const formattedLink = rawLink ? (rawLink.startsWith('http') ? rawLink : `https://${rawLink}`) : '';
      return {
        id: index,
        title: row[0]?.trim(),
        description: row[1]?.trim(),
        time: row[2]?.trim(),
        date: row[3]?.trim(),
        locationLink: formattedLink,
        modality: row[5]?.trim(),
        image: row[6]?.trim(),
      };
    }).filter((e) => e !== null);

    // Only today and future, sorted ascending (closest first).
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingEvents = parsedEvents.filter((event: any) => {
      if (!event.date) return false;
      const [year, month, day] = event.date.split('-').map(Number);
      return new Date(year, month - 1, day) >= today;
    });
    upcomingEvents.sort((a: any, b: any) => {
      const [ay, am, ad] = a.date.split('-').map(Number);
      const [by, bm, bd] = b.date.split('-').map(Number);
      return new Date(ay, am - 1, ad).getTime() - new Date(by, bm - 1, bd).getTime();
    });
    return upcomingEvents;
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
}

// When an event's link points to THIS site (a relative /path or a
// leafwraparound.com URL), route it INTERNALLY (SPA, locale-aware) instead of
// opening the old live site. Legacy webinar routes are bridged to the rebuilt
// landing pages.
function internalEventRoute(link?: string): string | null {
  if (!link) return null;
  let path = String(link).trim();
  const m = path.match(/^https?:\/\/(?:www\.)?leafwraparound\.com(\/[^\s]*)?$/i);
  if (m) path = m[1] || "/";
  if (!path.startsWith("/")) return null;
  return path
    .replace(/^\/webinar-event1\b.*$/i, "/webinar-event1")
    .replace(/^\/webinar-event2\b.*$/i, "/webinar-event2");
}

export default function Events() {
  const { t } = useTranslation("events");
  const { to, lng } = useLocale();
  const events = (useLoaderData() as any[]) ?? [];
  const loading = false;
  const error = false;
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="pb-0">
      <Seo pageKey="events" path="/events" jsonLd={graph(organizationLd(), webSiteLd(lng), collectionPageLd(lng, { name: "Events & Webinars | LEAF Wraparound", description: "Upcoming webinars, workshops, and gatherings for adoptive families hosted by LEAF Wraparound.", path: "/events" }), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Events & Webinars", path: "/events" }]))} />
      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-community.webp"
        title={<>{t("hero.titleLead")} <span className="text-brand-primary">{t("hero.titleHighlight")}</span></>}
        subtitle={t("hero.subtitle")}
      />

      {/* Events Grid */}
      <section className="relative max-w-full mx-auto py-10 md:py-14 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #002f6c 0, #002f6c 1px, transparent 1px, transparent 24px)' }}></div>
        <div className="absolute top-1/4 -right-10 text-brand-primary/5 pointer-events-none z-0">
          <Calendar size={600} strokeWidth={0.2} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="dynamic-events-container">

        {/* Section heading above the cards */}
        <div className="mx-auto mb-10 md:mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            {t("list.eyebrow")}
          </span>
          <h2 className="mt-5 font-display text-3xl md:text-4xl font-bold text-brand-dark">{t("list.heading")}</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
          </div>
        ) : error || events.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-16 text-center space-y-6">
            <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary shadow-sm">
              <Calendar size={40} />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-700">{t("list.empty")}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative flex min-h-[22rem] overflow-hidden rounded-[2rem] shadow-sm transition-shadow hover:shadow-xl"
              >
                {/* Theme-matched background photo */}
                <img
                  src={eventImage(event.title)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Brand overlay: base navy tint + bottom-up gradient for legibility */}
                <div className="absolute inset-0 bg-brand-dark/55" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/45 to-brand-dark/10" />

                {/* Content */}
                <div className="relative z-10 flex w-full flex-col justify-end p-8 md:p-10 text-white">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                      <Calendar size={14} className="text-brand-secondary" /> {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                      <Clock size={14} className="text-brand-secondary" /> {event.time}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1 font-display text-xs font-bold">
                      {event.modality || t("list.modalityFallback")}
                    </span>
                    <EnglishContentBadge />
                  </div>
                  <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-white/85 line-clamp-2">
                    {event.description}
                  </p>
                  {(() => {
                    const internal = internalEventRoute(event.locationLink);
                    const cls = "mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-display font-bold text-brand-primary transition-colors hover:bg-brand-secondary hover:text-brand-dark";
                    return internal ? (
                      <Link to={to(internal)} className={cls}>
                        {t("list.register")} <ArrowRight size={18} />
                      </Link>
                    ) : (
                      <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className={cls}>
                        {t("list.register")} <ArrowRight size={18} />
                      </a>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}

        </div>
      </section>

      {/* Missed Webinar — slim band */}
      <section className="bg-slate-50 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <Video size={22} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">{t("missed.title")}</h2>
              <p className="mt-1.5 text-slate-600 max-w-xl">{t("missed.description")}</p>
            </div>
          </div>
          <Link to={to("/resource-hub") + "?tab=Webinars"} className="btn-primary shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-3.5">
            {t("missed.button")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Newsletter CTA — slim full-width band */}
      <section className="bg-brand-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-8 flex flex-col gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{t("newsletter.title")}</h2>

          {subscribed ? (
            <p className="font-display text-lg font-bold text-white">{t("newsletter.success")}</p>
          ) : (
            <>
              {/* Hidden iframe catches the GHL POST so the page never navigates away */}
              <iframe name="ghl_newsletter_sink" title={t("newsletter.iframeTitle")} className="hidden" aria-hidden="true" />
              <form
                action={`${ghl.formBase}/${ghl.newsletterFormId}`}
                method="POST"
                target="ghl_newsletter_sink"
                onSubmit={() => setSubscribed(true)}
                className="flex w-full gap-3 md:w-auto"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t("newsletter.emailPlaceholder")}
                  aria-label={t("newsletter.emailPlaceholder")}
                  className="w-full rounded-lg border-none bg-white px-5 py-3 focus:ring-2 focus:ring-brand-dark md:w-72"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-lg bg-white px-7 py-3 font-display font-bold text-brand-primary transition-colors hover:bg-brand-secondary hover:text-brand-dark"
                >
                  {t("newsletter.submit")}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
