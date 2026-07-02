import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Users, Home, Play, X } from "lucide-react";
import Seo from "./Seo";
import { aboutPageLd, breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import PageHero from "./PageHero";
import CountUp from "./CountUp";
import { useLocale } from "../i18n/useLocale";

export default function Impact() {
  const { t } = useTranslation("impact");
  const { to, lng } = useLocale();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const stats = [
    {
      label: t("stats.familiesSupported.label"),
      value: "500+",
      icon: Home,
      description: t("stats.familiesSupported.description")
    },
    {
      label: t("stats.childrenSupported.label"),
      value: "1,200+",
      icon: Users,
      description: t("stats.childrenSupported.description")
    },
    {
      label: t("stats.hoursOfSupport.label"),
      value: "15k+",
      icon: Heart,
      description: t("stats.hoursOfSupport.description")
    }
  ];

  const testimonials = [
    {
      category: t("testimonials.category"),
      description: t("testimonials.adoptiveMother"),
      videoUrl: "https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/68e7fc7e2bf4ec80bc2560e2.mp4"
    },
    {
      category: t("testimonials.category"),
      description: t("testimonials.adoptiveMother"),
      videoUrl: "https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/68e7fcfb62c1348662227e20.mp4"
    }
  ];

  return (
    <div className="pb-0 bg-white">
      <Seo pageKey="impact" path="/impact" jsonLd={graph(organizationLd(), webSiteLd(lng), aboutPageLd(lng), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Our Impact", path: "/impact" }]))} />
      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video animate-in zoom-in-95 duration-200">
            <video 
              src={activeVideo} 
              autoPlay 
              controls 
              className="w-full h-full object-contain"
            >
              {t("video.fallback")}
            </video>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-landscape.webp"
        title={<>{t("hero.titleLead")} <span className="text-brand-primary">{t("hero.titleAccent")}</span></>}
        subtitle={t("hero.subtitle")}
      />

      {/* Stats Section */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#232323 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            {/* Photo collage */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <img src="/page-hero/collage-main.webp" alt="" className="w-[80%] aspect-[3/4] rounded-[2rem] object-cover shadow-2xl" />
              <img src="/page-hero/collage-community.webp" alt="" className="absolute -top-6 right-0 w-[46%] aspect-square rounded-[1.5rem] border-4 border-white object-cover shadow-xl" />
              <img src="/page-hero/collage-support.webp" alt="" className="absolute -bottom-8 left-4 w-[44%] aspect-square rounded-[1.5rem] border-4 border-white object-cover shadow-xl" />
            </div>
            {/* Content */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                {t("stats.eyebrow")}
              </span>
              <h2 className="font-display text-4xl font-bold leading-[1.1] text-brand-dark md:text-5xl lg:text-6xl">
                {(() => {
                  const words = t("stats.heading").trim().split(" ");
                  const last = words.pop();
                  return (<>{words.join(" ")} <span className="italic text-brand-primary">{last}</span></>);
                })()}
              </h2>
              <p className="text-xl font-medium leading-relaxed text-slate-700">{t("stats.intro")}</p>
              <p className="text-base leading-relaxed text-slate-600">{t("stats.answerCapsule")}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-cream p-8 shadow-2xl md:p-12 lg:p-16">
            {/* dotted texture (world-map feel) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: "radial-gradient(#232323 1.2px, transparent 1.2px)", backgroundSize: "26px 26px" }}
            />
            <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-y-0 md:divide-x md:divide-brand-dark/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-start px-2 md:px-8 lg:px-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg">
                    <stat.icon size={26} />
                  </div>
                  <div className="font-display text-5xl font-bold leading-none text-brand-dark md:text-6xl">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="my-5 h-px w-12 bg-brand-dark/20" />
                  <h4 className="mb-2 font-display text-xl font-bold text-brand-dark">{stat.label}</h4>
                  <p className="text-sm leading-relaxed text-brand-dark/70">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-display font-bold text-brand-dark">{t("testimonials.headingLine1")}<span className="text-brand-primary">{t("testimonials.headingLine2")}</span></h2>
            <p className="text-lg text-slate-600">
              {t("testimonials.introBefore")}{" "}<span className="notranslate" translate="no">Love Pathways Wraparound</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto gap-12">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 group flex flex-col">
                {/* Custom Thumbnail structure */}
                <div 
                  className="relative w-full bg-slate-900 overflow-hidden shrink-0 cursor-pointer ghl-video-trigger"
                  onClick={() => setActiveVideo(testimonial.videoUrl)}
                  data-video-url={testimonial.videoUrl}
                >
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="bg-brand-dark/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {testimonial.category}
                    </span>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand-primary/90 text-white rounded-full flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      <Play size={32} fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  <video 
                    src={testimonial.videoUrl} 
                    preload="metadata"
                    className="w-full aspect-video object-cover md:aspect-auto md:h-80 lg:aspect-auto lg:h-[24rem] bg-black opacity-80"
                  />
                </div>

                {/* Content */}
                <div className="p-6 relative flex-grow flex flex-col justify-end bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-lg shrink-0">
                      A
                    </div>
                    <div>
                      <div className="font-bold text-brand-dark">{testimonial.description}</div>
                      <div className="text-slate-500 text-sm">{t("testimonials.realFamilyStory")}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brand-primary py-20 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Heart size={48} className="mx-auto text-white opacity-80" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">
            {t("cta.heading")}
          </h2>
          <p className="text-xl text-brand-dark/80 font-medium">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to={to("/contact-us")} className="bg-brand-dark text-white hover:bg-slate-800 px-8 py-4 rounded-full font-bold transition-all text-lg shadow-xl shadow-brand-dark/20 text-center">
              {t("cta.primary")}
            </Link>
            <Link to={to("/career")} className="bg-white text-brand-dark hover:bg-slate-50 px-8 py-4 rounded-full font-bold transition-all text-lg shadow-xl shadow-white/20 text-center border-2 border-transparent">
              {t("cta.secondary")}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
