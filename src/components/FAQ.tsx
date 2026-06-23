import { BookOpen, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
import Seo from "./Seo";
import PageHero from "./PageHero";
import { breadcrumbLd, faqPageLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";

export default function FAQ() {
  const { t } = useTranslation("faq");
  const { to, lng } = useLocale();
  const faqs = [
    {
      question: t("items.what.question"),
      answer: <><span className="notranslate" translate="no">Love Pathways Wraparound</span>{" "}{t("items.what.answerBefore")}</>,
    },
    {
      question: t("items.eligible.question"),
      answer: t("items.eligible.answer"),
    },
    {
      question: t("items.loveBased.question"),
      answer: t("items.loveBased.answer"),
    },
    {
      question: t("items.getStarted.question"),
      answer: t("items.getStarted.answer"),
    },
    {
      question: t("items.qualified.question"),
      answer: t("items.qualified.answer"),
    },
    {
      question: t("items.cost.question"),
      answer: t("items.cost.answer"),
    },
    {
      question: t("items.highFidelity.question"),
      answer: t("items.highFidelity.answer"),
    },
    {
      question: t("items.counties.question"),
      answer: t("items.counties.answer"),
    },
    {
      question: t("items.duration.question"),
      answer: t("items.duration.answer"),
    },
  ];

  // Plain-text mirror of the FAQ for the FAQPage JSON-LD (the visible answers
  // can contain JSX, which structured data can't use).
  const faqSchema = [
    { question: t("items.what.question"), answer: `Love Pathways Wraparound ${t("items.what.answerBefore")}` },
    { question: t("items.eligible.question"), answer: t("items.eligible.answer") },
    { question: t("items.loveBased.question"), answer: t("items.loveBased.answer") },
    { question: t("items.getStarted.question"), answer: t("items.getStarted.answer") },
    { question: t("items.qualified.question"), answer: t("items.qualified.answer") },
    { question: t("items.cost.question"), answer: t("items.cost.answer") },
    { question: t("items.highFidelity.question"), answer: t("items.highFidelity.answer") },
    { question: t("items.counties.question"), answer: t("items.counties.answer") },
    { question: t("items.duration.question"), answer: t("items.duration.answer") },
  ];

  return (
    <div className="pb-0">
      <Seo pageKey="faq" path="/faq" jsonLd={graph(organizationLd(), webSiteLd(lng), faqPageLd(lng, faqSchema), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]))} />
      <style dangerouslySetInnerHTML={{ __html: `
        summary::-webkit-details-marker {
          display: none;
        }
        details[open] summary svg {
          transform: rotate(180deg);
        }
      `}} />

      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-support.webp"
        title={<>{t("hero.titleLead")} <span className="text-brand-secondary">{t("hero.titleHighlight")}</span></>}
        subtitle={t("hero.subtitle")}
      />

      {/* FAQ List */}
      <section className="relative max-w-full overflow-hidden bg-slate-50 pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#232323 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }}></div>
        <div className="absolute top-20 -left-10 text-brand-secondary/10 pointer-events-none z-0">
          <HelpCircle size={600} strokeWidth={0.2} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 space-y-4">
          <p className="text-xl text-brand-dark font-medium max-w-2xl mx-auto">
            {t("list.entityDefinition")}
          </p>
          <p className="text-lg text-slate-500 font-sans max-w-3xl mx-auto">
            {t("list.answerFirst")}
          </p>
        </div>
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">
            {t("list.heading")}
          </h2>
          <p className="text-xl text-slate-500 font-sans max-w-2xl mx-auto">
            {t("list.subheading")}
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto overflow-hidden transition-all duration-300"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-bold text-lg text-brand-dark hover:bg-slate-50 transition-colors font-sans">
                <span>{faq.question}</span>
                <svg 
                  className="w-6 h-6 text-brand-primary transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed font-sans">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
        </div>
      </section>

      {/* Still have questions? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-brand-cream py-8 md:py-12 px-8 md:py-12 md:py-8 md:py-12 md:px-16 rounded-[3rem] text-center text-brand-dark">
          <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-10">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">{t("cta.heading")}</h2>
          <p className="text-xl md:text-2xl text-brand-dark/70 max-w-2xl mx-auto leading-relaxed">
            {t("cta.body")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-16 md:mt-24">
            <a href={to("/contact-us")} className="inline-flex bg-brand-primary text-white px-10 py-4 rounded-lg font-display font-bold text-xl hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 items-center justify-center">
              {t("cta.contact")}
            </a>
            <a href="tel:7074606070" className="inline-flex bg-white text-brand-dark px-10 py-4 rounded-lg font-display font-bold text-xl hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 items-center justify-center border border-brand-dark/10">
              {t("cta.call")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
