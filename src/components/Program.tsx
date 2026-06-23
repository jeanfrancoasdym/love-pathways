import { useState } from "react";
import { Heart, Users, BookOpen, Sparkles, CheckCircle2, ArrowRight, ClipboardCheck, MessageSquare, ShieldCheck, MapPin, User, AlertTriangle, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
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
            path: "/our-program",
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

      {/* Our Approach */}
      <section id="our-approach" className="relative bg-slate-50 py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #232323 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 text-brand-primary/5 pointer-events-none z-0">
          <HeartPulse size={600} strokeWidth={0.2} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4 leading-tight">
                {t("approach.title")}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t("approach.intro")}
              </p>
            </div>

            <div className="space-y-5">
              {/* Block 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <MessageSquare size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-brand-dark mb-1">{t("approach.block1.title")}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("approach.block1.desc")}
                  </p>
                </div>
              </div>

              {/* Block 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                    <Users size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-brand-dark mb-1">{t("approach.block2.title")}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("approach.block2.desc")}
                  </p>
                </div>
              </div>

              {/* Block 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-brand-dark/10 flex items-center justify-center text-brand-dark">
                    <ShieldCheck size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-brand-dark mb-1">{t("approach.block3.title")}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("approach.block3.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl">
              <img src="/page-hero/program-approach.webp" alt="" className="h-full w-full object-cover" />
              {/* subtle brand wash so the photo sits on-brand */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/55 via-brand-dark/5 to-transparent" />
              <div className="absolute inset-0 mix-blend-multiply bg-brand-primary/15" />
            </div>
          </div>
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
                <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">{t("gettingStarted.title")}</h2>
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
                src="https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/69d53f15a7dcb4cff019dc33.webp"
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
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-brand-primary/30 transition-colors" />
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
