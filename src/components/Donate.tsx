import React from 'react';
import { useTranslation } from "react-i18next";
import { Heart } from 'lucide-react';
import { useLocale } from "../i18n/useLocale";
import GhlForm from './GhlForm';
import { ghl } from '../data/site';
import { breadcrumbLd, donateActionLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import Seo from './Seo';

export default function Donate() {
  const { t } = useTranslation("donate");
  const { lng } = useLocale();
  return (
    <div className="pb-0 bg-white">
      <Seo pageKey="donate" path="/donate" jsonLd={graph(organizationLd(), webSiteLd(lng), donateActionLd(), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Donate", path: "/donate" }]))} />
      {/* Hero Section */}
      <section className="bg-brand-cream py-10 md:py-14 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-6">{t("hero.title")}</h1>
        <p className="text-xl text-brand-dark/70 max-w-3xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Donation Information */}
          <div className="flex flex-col h-full justify-center">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8">
              <Heart size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-6 leading-tight">
              {t("main.heading")}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">{" "}<span className="notranslate" translate="no">Love Pathways Wraparound</span>{" "}{t("main.intro")}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              {t("main.body")}
            </p>

            <div className="bg-slate-50 border-l-4 border-[#f8a866] p-6 rounded-r-xl">
              <p className="text-slate-800 font-bold italic leading-relaxed">
                {t("main.quote")}
              </p>
            </div>
          </div>

          {/* Form / Iframe Placeholder */}
          <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl w-full min-h-[600px] flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             
             {/* Donate form - placeholder id until a real GHL donation form is provided */}
             <GhlForm
               formId={ghl.donateFormId}
               name="Donation Form"
               height={550}
               formBase={ghl.donateFormBase}
               scriptSrc={ghl.donateEmbedScript}
               className="w-full h-full flex-grow relative z-10"
             />
          </div>

        </div>
      </section>
    </div>
  );
}
