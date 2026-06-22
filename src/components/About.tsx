import { Heart, Shield, BookOpen, Users, CheckCircle2, ArrowRight, MapPin, Sparkles, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
import { breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import Seo from "./Seo";
import PageHero from "./PageHero";
import ParallaxSection from "./ParallaxSection";

export default function About() {
  const { t } = useTranslation("about");
  const { to, lng } = useLocale();
  const values = [
    { name: t("values.love.name"), description: t("values.love.description"), icon: Heart },
    { name: t("values.integrity.name"), description: t("values.integrity.description"), icon: CheckCircle2 },
    { name: t("values.relationship.name"), description: t("values.relationship.description"), icon: Users },
    { name: t("values.responsibility.name"), description: t("values.responsibility.description"), icon: BookOpen },
    { name: t("values.effort.name"), description: t("values.effort.description"), icon: Calendar },
  ];

  return (
    <div className="pb-0">
      <Seo pageKey="about" path="/about-us" jsonLd={graph(organizationLd(), webSiteLd(lng), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us" }]))} />
      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-community.webp"
        title={<>{t("hero.titlePart1")}<span className="text-brand-primary">{t("hero.titlePart2")}</span></>}
        subtitle={t("hero.subtitle")}
      />

      {/* Mission & Vision */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#002f6c 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }}></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              {t("missionVision.eyebrow")}
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold text-brand-dark md:text-5xl">{t("missionVision.heading")}</h2>
            <p className="mt-4 text-lg text-slate-600">{t("missionVision.intro")}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img src="/page-hero/mission-hands.webp" alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/45 to-transparent" />
                <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white shadow-lg"><Heart size={22} fill="currentColor" /></span>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <h3 className="font-display text-2xl font-bold text-brand-dark">{t("mission.heading")}</h3>
                <span className="mb-4 mt-3 block h-1 w-12 rounded-full bg-brand-primary" />
                <p className="text-lg leading-relaxed text-slate-700">{t("mission.body")}</p>
              </div>
            </div>
            {/* Vision */}
            <div className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img src="/page-hero/vision-belonging.webp" alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/45 to-transparent" />
                <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary text-brand-dark shadow-lg"><Users size={22} /></span>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <h3 className="font-display text-2xl font-bold text-brand-dark">{t("vision.heading")}</h3>
                <span className="mb-4 mt-3 block h-1 w-12 rounded-full bg-brand-secondary" />
                <p className="text-lg leading-relaxed text-slate-700">{t("vision.body")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values — slim band, parallax photo + 5 horizontal values */}
      <ParallaxSection image="/page-hero/values-sunset.webp" overlayClassName="bg-brand-dark/55" className="py-10 md:py-12">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ textShadow: "0 2px 14px rgba(0,0,0,0.5)" }}>
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{t("coreValues.heading")}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-200">{t("coreValues.introBeforeBrand")}{" "}<span className="notranslate" translate="no">Leaf Wraparound</span>{t("coreValues.introAfterBrand")}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/10">
            {values.map((value) => (
              <div key={value.name} className="group flex flex-col items-center px-2 text-center lg:px-4">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-brand-secondary transition-colors duration-300 group-hover:bg-white/20">
                  <value.icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mb-1.5 font-display text-lg font-bold text-white">{value.name}</h3>
                <p className="text-xs leading-snug text-slate-200/90">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Our Identity / Story - Redesigned for digestibility */}
      <section className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #002f6c 0, #002f6c 1px, transparent 1px, transparent 24px)' }}></div>
        <div className="absolute bottom-0 left-[-10%] text-brand-secondary/10 pointer-events-none z-0 rotate-45">
          <Shield size={700} strokeWidth={0.2} />
        </div>
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold tracking-wider uppercase">
              <Shield size={16} />
              {t("identity.badge")}
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-dark leading-tight">
              {t("identity.headingPart1")}<span className="text-brand-primary">{t("identity.headingPart2")}</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light italic mb-16">
              {t("identity.quote")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: The Heart */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-6 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Heart size={32} fill="currentColor" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold text-brand-dark">{t("identity.card1.title")}</h3>
                <p className="text-slate-600 leading-relaxed">{" "}<span className="notranslate" translate="no">Leaf Wraparound</span>{" "}{t("identity.card1.bodyAfterBrand")}
                </p>
              </div>
            </div>

            {/* Card 2: Expertise */}
            <div className="bg-brand-dark p-10 rounded-[3rem] shadow-xl space-y-6 text-white">
              <div className="w-16 h-16 bg-brand-secondary/20 rounded-2xl flex items-center justify-center text-brand-secondary">
                <BookOpen size={32} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold">{t("identity.card2.title")}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {t("identity.card2.body")}
                </p>
              </div>
            </div>

            {/* Card 3: Commitment */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-6 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-brand-dark transition-colors">
                <Shield size={32} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold text-brand-dark">{t("identity.card3.title")}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("identity.card3.body")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Founder */}
      <section className="bg-brand-dark text-white py-12 md:py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-brand-secondary font-display font-bold uppercase tracking-widest text-sm mb-2">{t("founder.eyebrow")}</h3>
                <h2 className="text-5xl md:text-6xl font-display font-bold leading-none tracking-tight">{t("founder.namePart1")}<span className="text-brand-primary">{t("founder.namePart2")}</span></h2>
              </div>

              <div className="space-y-4 text-slate-300 text-lg leading-relaxed mb-8">
                <p className="font-display font-bold text-white text-xl md:text-2xl leading-snug">
                  {t("founder.lead")}
                </p>
                <p className="text-slate-300">
                  {t("founder.body")}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-10">
                <a
                  href="https://www.facebook.com/BryanPost32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white text-white hover:text-brand-primary p-3 rounded-full transition-colors group flex items-center justify-center"
                  aria-label={t("founder.facebookAriaLabel")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a
                  href="https://www.instagram.com/bryanpostofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white text-white hover:text-brand-primary p-3 rounded-full transition-colors group flex items-center justify-center"
                  aria-label={t("founder.instagramAriaLabel")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
              </div>

              <div>
                <a href={to("/our-program")} className="btn-secondary text-lg px-10 py-4 inline-flex items-center gap-2 group">
                  {t("founder.learnMore")} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-brand-primary/20 shadow-2xl">
                <img
                  src="https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/69d53dba3d829c73b2ab1fa4.webp"
                  alt={t("founder.photoAlt")}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
