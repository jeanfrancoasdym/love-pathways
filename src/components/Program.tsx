import { useState } from "react";
import { Heart, Users, Sparkles, ArrowRight, ClipboardCheck, MessageSquare, ShieldCheck, MapPin, User, AlertTriangle, HeartPulse, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
import { contact } from "../data/site";
import Seo from "./Seo";
import PageHero from "./PageHero";
import CaliforniaCountyMap, { CountyServeList } from "./CaliforniaCountyMap";
import PhasesScrolly from "./PhasesScrolly";
import { breadcrumbLd, graph, organizationLd, serviceLd, webSiteLd } from "../seo/structuredData";

export default function Program() {
  const { t } = useTranslation("program");
  const { to, lng } = useLocale();
  const [activeCounty, setActiveCounty] = useState<string | null>(null);

  const logisticsSteps = [
    {
      key: "requestSupport",
      icon: Users
    },
    {
      key: "completeForm",
      icon: ClipboardCheck
    },
    {
      key: "consultation",
      icon: MessageSquare
    }
  ];

  return (
    <div className="pb-0">
      <Seo
        pageKey="program"
        path="/our-program"
        jsonLd={graph(
          organizationLd(),
          webSiteLd(lng),
          serviceLd(lng, {
            name: "Love Pathways Wraparound Program",
            description:
              "A team-based, trauma-responsive wraparound program guiding adoptive families through four phases of care (engagement, plan development, implementation, and transition) with in-home support, family coaching, and clinical guidance across 20+ California counties, at no out-of-pocket cost to AAP families.",
          }),
          breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Our Program", path: "/our-program" }])
        )}
      />
      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-landscape.webp"
        eyebrow={t("hero.eyebrow")}
        title={<>{t("hero.titleBefore")}<span className="text-brand-primary italic font-bold">{t("hero.titleHighlight")}</span>{t("hero.titleAfter")}</>}
        subtitle={t("hero.subtitle")}
      />

      {/* The money question, answered before anything else. A parent who assumes
          this costs money stops reading before the ten principles, and no
          competitor on page one states cost at all, so it earns the first slot. */}
      <section id="funding" aria-label={t("funding.label")} className="border-b border-slate-100 bg-brand-mist">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-7 lg:px-8">
          <div className="flex flex-col gap-x-10 gap-y-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary">
                <ShieldCheck size={22} strokeWidth={1.5} />
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-700 md:text-base">
                <span className="font-display font-bold text-brand-dark">{t("funding.lead")}</span>{" "}
                {t("funding.cost")}
              </p>
            </div>
            <p className="shrink-0 text-[13px] leading-relaxed text-slate-500 md:max-w-[20rem] md:border-l md:border-slate-200 md:pl-10">
              {t("funding.legal")}
            </p>
          </div>
        </div>
      </section>

      {/* Who is on your team — the four roles, ours and theirs */}
      <section id="your-team" className="relative bg-white py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-1 w-10 rounded-full bg-brand-secondary" />
              <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-primary">
                {t("team.eyebrow")}
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-brand-dark md:text-4xl">
              {t("team.titleLine1")}
              <span className="text-brand-primary">{t("team.titleLine2")}</span>
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">{t("team.intro")}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: "facilitator", icon: Users, tint: "bg-brand-primary/5 text-brand-primary" },
              { key: "specialist", icon: HeartPulse, tint: "bg-brand-secondary/10 text-brand-secondary" },
              { key: "parentPartner", icon: MessageSquare, tint: "bg-[#eab308]/10 text-[#ca8a04]" },
              { key: "yourPeople", icon: Heart, tint: "bg-brand-primary/5 text-brand-primary" },
            ].map(({ key, icon: Icon, tint }) => (
              <div
                key={key}
                className="flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/[0.04]"
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-dark">
                  {t(`team.roles.${key}.title`)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                  {t(`team.roles.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* The ten principles — the state's definition of high fidelity, in plain language */}
      <section id="ten-principles" className="relative bg-slate-50 py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-1 w-10 rounded-full bg-brand-secondary" />
              <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-primary">
                {t("principles.eyebrow")}
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-brand-dark md:text-4xl">
              {t("principles.titleLine1")}
              <span className="text-brand-primary">{t("principles.titleLine2")}</span>
              {t("principles.titleAfter")}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">{t("principles.intro")}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"].map((k, i) => (
              <div
                key={k}
                className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/[0.04]"
              >
                {/* ghost numeral, same device as the counties stat */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 right-4 font-display text-6xl font-bold leading-none tracking-tighter text-slate-900/[0.05]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-display text-lg font-bold text-brand-dark">
                  {t(`principles.items.${k}.name`)}
                </h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-slate-600">
                  {t(`principles.items.${k}.desc`)}
                </p>
                <details className="group relative mt-3">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 font-display text-sm font-bold text-brand-primary hover:text-brand-dark">
                    <ArrowRight size={15} className="transition-transform group-open:rotate-90" />
                    {t("principles.exampleLabel")}
                  </summary>
                  <p className="mt-2 border-l-2 border-brand-secondary/40 pl-4 text-[14px] italic leading-relaxed text-slate-500">
                    {t(`principles.items.${k}.example`)}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stage 1: Getting Started (Logistics) */}
      <section id="getting-started" className="relative bg-white py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #232323 0, #232323 1px, transparent 1px, transparent 24px)' }}></div>
        <div className="absolute bottom-[-10%] left-[-5%] text-brand-secondary/10 pointer-events-none z-0">
          <ClipboardCheck size={700} strokeWidth={0.2} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-dark text-brand-secondary rounded-full text-sm md:text-base font-display font-bold tracking-widest uppercase mb-6 shadow-md">
                  <ShieldCheck size={18} />
                  {t("gettingStarted.badge")}
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">{t("gettingStarted.titleLine1")}<span className="text-brand-primary">{t("gettingStarted.titleLine2")}</span>{t("gettingStarted.titleLine3")}</h2>
              </div>
              <div className="space-y-12">
                {logisticsSteps.map((step, idx) => (
                  <div key={step.key} className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-primary border border-slate-100">
                      <step.icon size={28} />
                    </div>
                    <div className="space-y-2 pt-1">
                      <h4 className="text-2xl font-display font-bold text-brand-dark">{t(`gettingStarted.steps.${step.key}.title`)}</h4>
                      <p className="text-slate-600 leading-relaxed text-lg">{t(`gettingStarted.steps.${step.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative lg:ml-8 mt-12 lg:mt-0">
              <img
                src="/page-hero/program-care.webp"
                alt={t("gettingStarted.imageAlt")}
                className="rounded-[3rem] shadow-2xl w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 md:-left-12 bg-brand-secondary p-8 rounded-[2rem] text-brand-dark max-w-xs shadow-xl hidden md:block">
                <p className="font-display font-bold text-lg leading-tight italic">{t("gettingStarted.quote")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed pinned scene of the four phases. The Stage-2 heading now lives
          INSIDE this component (pinned, centered) above the four reveal columns. */}
      <PhasesScrolly />

      {/* Counties We Serve - Expert Graphic Design Section */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column: Header + large interactive map */}
            <div className="space-y-10">
              <div>
                <div className="w-12 h-1 bg-brand-primary mb-10" />
                <h2 className="text-6xl md:text-8xl font-display font-bold text-brand-dark leading-none tracking-tighter mb-8">
                  {t("reach.titleLine1")} <br />
                  <span className="text-brand-primary font-bold">{t("reach.titleLine2")}</span>
                </h2>
                <p className="text-sm uppercase tracking-[0.3em] font-bold text-slate-400 mb-8">
                  {t("reach.serving")}
                </p>
                <p className="text-xl text-slate-600 leading-relaxed font-light border-l-2 border-slate-100 pl-8 max-w-xl">
                  {t("reach.description")}
                </p>
              </div>

              {/* Large interactive California map */}
              <CaliforniaCountyMap active={activeCounty} onActive={setActiveCounty} />
            </div>

            {/* Right Column: Circle of Care card + county name index below it */}
            <div className="space-y-12">
              <div className="p-10 md:p-14 bg-brand-cream rounded-[3rem] text-brand-dark relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-brand-primary/30 transition-colors transform-gpu will-change-transform" />
                <div className="relative z-10 space-y-6">
                  <div className="space-y-6">
                    <h4 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                      {t("reach.cardTitleLine1")} <br />
                      <span className="text-brand-primary">{t("reach.cardTitleLine2")}</span>
                    </h4>
                    <p className="text-brand-dark/70 text-lg leading-relaxed">
                      {t("reach.cardDescription")}
                    </p>
                  </div>

                  <div className="space-y-10">
                    <a href={to("/contact-us")} className="w-full bg-brand-primary text-white px-10 py-6 font-display font-bold text-xl hover:bg-brand-dark transition-all rounded-lg shadow-xl flex items-center justify-center gap-3 group/btn">
                      {t("reach.cta")}
                      <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                    </a>

                    {/* one shared number, and until now it rendered on 4 of 74 pages */}
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/70">
                      <Phone size={18} className="shrink-0 text-brand-secondary" />
                      <span className="text-sm">{t("reach.callLabel")}</span>
                      <a href={contact.phoneHref} className="font-display text-lg font-bold text-white hover:text-brand-secondary transition-colors">
                        {contact.phone}
                      </a>
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-4">
                      <div className="flex items-center gap-2 text-xs text-brand-dark font-display font-bold uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        {t("reach.tagInHome")}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-brand-dark font-display font-bold uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        {t("reach.tagFamilyCoaching")}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-brand-dark font-display font-bold uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        {t("reach.tagClinical")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* County name index — under the Circle of Care card */}
              <CountyServeList active={activeCounty} onActive={setActiveCounty} />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
