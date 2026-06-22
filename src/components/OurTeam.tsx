import React from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
import { breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import Seo from "./Seo";
import PageHero from "./PageHero";

export default function OurTeam() {
  const { t } = useTranslation("ourTeam");
  const { lng } = useLocale();
  const teamMembers = [
    {
      key: "jeanette",
      name: "Jeanette Yoffe, M.A, M.F.T",
      image: "https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/6a0b6235dbe569a25de76ee0.png",
    },
    {
      key: "marissa",
      name: "Marissa Telelyuev",
      image: "https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/69f38abb45cd849493278cb9.jpg",
    },
    {
      key: "shing",
      name: "Shing Long",
      image: "https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/69f395694ad535b652ef5318.jpeg",
    },
    {
      key: "mikalah",
      name: "Mikalah Post",
      image: "https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/69f3af3d0549a7387e2c4c4f.webp",
    }
  ];

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      <Seo pageKey="ourTeam" path="/our-team" jsonLd={graph(organizationLd(), webSiteLd(lng), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Our Team", path: "/our-team" }]))} />
      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-community.webp"
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* Team Grid Section */}
      <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="aspect-[4/5] w-full bg-slate-100 overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <p className="text-brand-primary font-medium text-sm tracking-wide uppercase mb-2 line-clamp-1">
                  {t(`members.${member.key}.title`)}
                </p>
                <h3 className="text-2xl font-display font-medium text-slate-900 mb-4">
                  {member.name}
                </h3>
                <p className="text-slate-600 font-sans leading-relaxed flex-1">
                  {t(`members.${member.key}.bio`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
