import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
import GhlForm from "./GhlForm";
import { ghl } from "../data/site";
import { breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import Seo from "./Seo";
import PageHero from "./PageHero";

export default function Contact() {
  const { t } = useTranslation("contact");
  const { lng } = useLocale();
  return (
    <div className="pb-0">
      <Seo pageKey="contact" path="/contact-us" jsonLd={graph(organizationLd(), webSiteLd(lng), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact-us" }]))} />
      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-support.webp"
        title={<>{t("hero.titleLead")} <span className="text-brand-primary">{t("hero.titleHighlight")}</span></>}
        subtitle={t("hero.subtitle")}
      />

      {/* Contact Form & Info */}
      <section className="relative w-full py-12 md:py-20 overflow-hidden bg-white min-h-[850px]">
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #002f6c 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }}></div>
        <div className="absolute bottom-[-10%] right-[-5%] text-brand-primary/5 pointer-events-none z-[1] rotate-12">
          <Heart size={600} strokeWidth={0.2} />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-display font-bold text-brand-dark">{t("info.heading")}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t("info.intro")}
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-brand-dark">{t("info.email.title")}</h4>
                  <p className="text-slate-500">
                    <a href="mailto:contact@lovepathways.org" className="hover:text-brand-primary transition-colors">
                      contact@lovepathways.org
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-brand-dark">{t("info.phone.title")}</h4>
                  <p className="text-slate-500">{t("info.phone.number")}</p>
                  <p className="text-slate-500">{t("info.phone.hours")}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-brand-dark">{t("info.location.title")}</h4>
                  <p className="text-slate-500">{t("info.location.line1")}</p>
                  <p className="text-slate-500">{t("info.location.line2")}</p>
                </div>
              </div>
            </div>
            <div className="bg-brand-light/20 p-8 rounded-[2.5rem] border border-brand-light/30 space-y-4">
              <div className="flex items-center gap-2 text-brand-primary font-display font-bold uppercase tracking-widest text-sm">
                <Heart size={16} fill="currentColor" />
                #ChooseLove
              </div>
              <p className="text-brand-dark font-display font-medium text-lg">
                {t("social.lead")}
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/leafwraparound/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary font-bold hover:underline"
                >
                  {t("social.instagram")}
                </a>
                <a
                  href="https://www.facebook.com/leafwraparound/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary font-bold hover:underline"
                >
                  {t("social.facebook")}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - text-[0px] text-transparent hides the stray text the GHL script appends to the wrapper */}
          <GhlForm
            formId={ghl.contactFormId}
            name={t("form.iframeTitle")}
            height={733}
            className="w-full lg:col-span-7 bg-white p-4 sm:p-6 md:p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col relative text-[0px] text-transparent"
          />
        </div>
        </div>
      </section>
    </div>
  );
}
