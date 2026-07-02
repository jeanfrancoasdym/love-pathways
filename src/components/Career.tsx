import { Heart, Shield, Users, BookOpen, UserCheck, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
import GhlForm from "./GhlForm";
import { ghl } from "../data/site";
import { breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import Seo from "./Seo";
import PageHero from "./PageHero";

export default function Career() {
  const { t } = useTranslation("career");
  const { lng } = useLocale();
  const clinicalRoles = [
    {
      title: t("clinical.roles.wrapFacilitator.title"),
      description: t("clinical.roles.wrapFacilitator.description"),
      icon: Users,
    },
    {
      title: t("clinical.roles.clinician.title"),
      description: t("clinical.roles.clinician.description"),
      icon: Heart,
    },
    {
      title: t("clinical.roles.parentPartner.title"),
      description: t("clinical.roles.parentPartner.description"),
      icon: UserCheck,
    },
  ];

  return (
    <div className="pb-0 bg-slate-50/50 relative overflow-hidden">
      <Seo pageKey="career" path="/career" jsonLd={graph(organizationLd(), webSiteLd(lng), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Careers", path: "/career" }]))} />
      {/* Global Background Decorations */}
      <div className="absolute top-[20%] -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute top-[50%] -right-24 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute bottom-[10%] left-[10%] w-64 h-64 bg-brand-light/10 rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />

      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-community.webp"
        title={<>{t("hero.titleLead")}<span className="text-brand-secondary">{t("hero.titleHighlight")}</span></>}
        subtitle={t("hero.subtitle")}
      />

      {/* Why Join Us */}
      <section className="relative py-12 md:py-10 md:py-14 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none" />
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#232323 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-1/4 -left-10 text-brand-primary/5 pointer-events-none z-0">
          <Users size={600} strokeWidth={0.1} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-display font-bold text-brand-dark">{t("whyJoin.headingLine1")}<span className="text-brand-primary">{t("whyJoin.headingLine2")}</span></h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t("whyJoin.introBefore")}<span className="notranslate" translate="no">Love Pathways Wraparound</span>{t("whyJoin.introAfter")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                    <Heart size={20} />
                  </div>
                  <h4 className="font-display font-bold text-brand-dark">{t("whyJoin.meaningfulTitle")}</h4>
                  <p className="text-sm text-slate-500">{t("whyJoin.meaningfulDesc")}</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center text-brand-secondary">
                    <Shield size={20} />
                  </div>
                  <h4 className="font-display font-bold text-brand-dark">{t("whyJoin.growthTitle")}</h4>
                  <p className="text-sm text-slate-500">{t("whyJoin.growthDesc")}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/page-hero/career-why.webp"
                alt={t("whyJoin.imageAlt")}
                className="rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Roles */}
      <section id="clinical-roles" className="py-10 md:py-12 bg-brand-cream relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-primary rounded-full blur-[100px] transform-gpu will-change-transform" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-secondary rounded-full blur-[100px] transform-gpu will-change-transform" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="text-brand-primary font-display font-bold uppercase tracking-widest text-sm">{t("clinical.eyebrow")}</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">{t("clinical.headingLine1")}<span className="text-brand-secondary">{t("clinical.headingLine2")}</span></h2>
            <p className="text-xl text-brand-dark/70 font-sans max-w-2xl mx-auto">
              {t("clinical.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clinicalRoles.map((role) => (
              <div key={role.title} className="bg-white border border-brand-dark/5 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-sm space-y-6 hover:bg-white transition-all group">
                <div className="w-14 h-14 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                  <role.icon size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-brand-dark">{role.title}</h3>
                <p className="text-brand-dark/70 leading-relaxed">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Administrative Roles */}
      <section className="py-10 md:py-12 bg-brand-secondary/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #f8a866 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/page-hero/career-admin.webp"
                alt={t("administrative.imageAlt")}
                className="rounded-[3rem] shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="text-brand-secondary font-display font-bold uppercase tracking-widest text-sm">{t("administrative.eyebrow")}</div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">{t("administrative.headingLine1")}<span className="text-brand-primary">{t("administrative.headingLine2")}</span></h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t("administrative.subtitle")}
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center text-brand-secondary shrink-0">
                    <Settings size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-dark text-xl">{t("administrative.operationsTitle")}</h4>
                    <p className="text-slate-500 mt-2">
                      {t("administrative.operationsDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Submission Form */}
      <section id="resume-form" className="py-10 md:py-14 bg-slate-50 relative overflow-hidden">
        {/* Decorative Background Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl opacity-70 transform-gpu will-change-transform" />
          <div className="absolute bottom-0 -right-20 w-[30rem] h-[30rem] bg-brand-secondary/20 rounded-full blur-3xl opacity-70 transform-gpu will-change-transform" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Texts */}
            <div className="lg:col-span-5 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-primary shadow-sm">
                <BookOpen size={28} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-slate-900">
                {t("form.titleLead")}<br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{t("form.titleHighlight")}</span>{" "}{t("form.titleTrail")}
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                {t("form.introBefore")}<span className="notranslate" translate="no">Love Pathways Wraparound</span>{t("form.introAfter")}
              </p>
            </div>

            {/* Right Column: Form Card */}
            <div className="lg:col-span-7 bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative">
              <GhlForm formId={ghl.careerFormId} name="CV upload love pathways website" height={620} className="w-full" />
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
