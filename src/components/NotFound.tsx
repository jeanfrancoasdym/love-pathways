import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Compass, Home, BookOpen } from 'lucide-react';
import { useLocale } from "../i18n/useLocale";
import Seo from "./Seo";

export default function NotFound() {
  const { t } = useTranslation("notFound");
  const { to } = useLocale();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 py-20">
      <Seo pageKey="notFound" path="/404" noindex />
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-2">
            <Compass size={48} className="animate-[spin_4s_linear_infinite]" />
          </div>
          <div className="absolute -bottom-2 -right-2 text-6xl font-display font-bold text-brand-dark/10">?</div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-brand-dark">{t("hero.code")}</h1>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark tracking-tight">{t("hero.title")}</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {t("hero.description")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            to={to("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-primary text-white border-2 border-brand-primary px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-brand-dark hover:border-brand-dark transition-all rounded-lg shadow-lg hover:-translate-y-1"
          >
            <Home size={18} />
            {t("cta.home")}
          </Link>
          <Link
            to={to("/our-program")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-brand-dark border-2 border-brand-dark px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all rounded-lg shadow-lg hover:-translate-y-1"
          >
            <BookOpen size={18} />
            {t("cta.program")}
          </Link>
        </div>
      </div>
    </div>
  );
}
