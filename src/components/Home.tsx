import { useState, useEffect, useRef } from "react";
import { Heart, Users, BookOpen, ArrowRight, CheckCircle2, ShieldCheck, HeartPulse, Compass, Sprout, MapPin, Baby, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "motion/react";
import { useLocale } from "../i18n/useLocale";
import Seo from "./Seo";
import { serviceLd } from "../seo/structuredData";

/** Wraps content so it drifts vertically as the section scrolls through the
 *  viewport — a soft parallax. The outer (measured) node is never transformed,
 *  so there's no measurement feedback. */
function ParallaxFloat({
  children,
  distance = 50,
  className = "",
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

function HeroCarousel() {
  const { t } = useTranslation("home");
  const { to } = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/page-hero/home-hero-1.webp",
      duration: 7000,
      brand: true,
      eyebrow: t("hero.eyebrow"),
      description: t("hero.description"),
      ctas: [
        { label: t("hero.ctaContact"), href: to("/contact-us"), primary: true },
        { label: t("hero.ctaProgram"), href: to("/our-program"), primary: false },
      ],
    },
    {
      image: "/page-hero/home-hero-2.webp",
      duration: 6000,
      eyebrow: t("hero.slide2Eyebrow"),
      title: t("hero.slide2Title"),
      description: t("hero.slide2Desc"),
      ctas: [
        { label: t("hero.slide2CtaPrimary"), href: "#who-qualifies", primary: true },
        { label: t("hero.slide2CtaSecondary"), href: to("/our-program"), primary: false },
      ],
    },
    {
      image: "/page-hero/home-hero-3.webp",
      duration: 6000,
      eyebrow: t("hero.slide3Eyebrow"),
      title: t("hero.slide3Title"),
      description: t("hero.slide3Desc"),
      ctas: [
        { label: t("hero.slide3CtaPrimary"), href: to("/events"), primary: true },
        { label: t("hero.slide3CtaSecondary"), href: to("/contact-us"), primary: false },
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slides[currentSlide].duration);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  return (
    <section id="ghl-hero-carousel-container" className="relative grid w-full overflow-hidden bg-brand-dark group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`relative col-start-1 row-start-1 transition-opacity duration-1000 ghl-carousel-slide ${
            currentSlide === index ? "opacity-100 z-10" : "pointer-events-none opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={t(`hero.slideAlt${index + 1}`)}
            className="absolute inset-0 w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />

          {/* readability gradient on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent w-full md:w-[85%] lg:w-[68%]" />

          {/* per-slide content */}
          <div className="relative z-20">
            <div className="mx-auto flex min-h-[540px] md:min-h-[max(60vh,480px)] max-w-[88rem] flex-col justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl space-y-6 pt-24 pb-24 md:py-10">
                <p className="font-sans text-lg font-bold uppercase tracking-[0.22em] text-brand-dark md:text-xl">{slide.eyebrow}</p>
                {slide.brand ? (
                  <h1 className="font-display text-xl font-bold leading-none tracking-tight text-[#232323] whitespace-nowrap sm:text-3xl md:text-4xl lg:text-5xl">
                    <span className="notranslate" translate="no"><span className="text-brand-primary">LOVE PATHWAYS</span> WRAPAROUND</span>
                  </h1>
                ) : (
                  <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-[#232323] md:text-5xl lg:text-6xl">{slide.title}</h2>
                )}
                <p className="max-w-2xl font-sans text-xl leading-relaxed text-slate-700 md:text-2xl">{slide.description}</p>
                <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:flex-wrap">
                  {slide.ctas.map((cta, i) => (
                    <a
                      key={i}
                      href={cta.href}
                      className={
                        cta.primary
                          ? "w-full rounded-lg border-2 border-brand-secondary bg-brand-secondary px-10 py-5 text-center text-lg font-bold uppercase tracking-wide text-brand-dark shadow-lg transition-colors hover:border-brand-dark hover:bg-brand-dark hover:text-white sm:w-auto sm:min-w-[15rem]"
                          : "w-full rounded-lg border-2 border-brand-dark bg-transparent px-10 py-5 text-center text-lg font-bold uppercase tracking-wide text-brand-dark shadow-lg transition-colors hover:bg-brand-dark hover:text-white sm:w-auto sm:min-w-[15rem]"
                      }
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3 pointer-events-auto">
         {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-8 md:w-10 h-2 rounded-none transition-all cursor-pointer ghl-carousel-dot ${
                currentSlide === idx ? "bg-brand-primary scale-110" : "bg-white/50 scale-100"
              }`}
              aria-label={t("hero.goToSlide", { number: idx + 1 })}
            />
         ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation("home");
  const { to, lng } = useLocale();

  return (
    <div className="pb-0">
      <Seo
        pageKey="home"
        path="/"
        jsonLd={serviceLd(lng, {
          name: "Love Pathways Wraparound Services",
          description:
            "Love-based, trauma-responsive wraparound services that help adoptive families in California stay together through education, family coaching, parent groups, and in-home support, at no out-of-pocket cost to AAP families.",
        })}
      />
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Crisis Help Section */}
      <section className="relative max-w-full overflow-hidden py-16 md:py-24 bg-brand-cream">
        {/* Decorative Watermark & Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#232323 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }}></div>
        <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 text-brand-primary/5 pointer-events-none z-0">
          <HeartPulse size={600} strokeWidth={0.2} />
        </div>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-primary/5 blur-[80px] pointer-events-none z-0 transform-gpu will-change-transform"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column: heading + intro + supportive quote */}
            <div className="flex flex-col items-start">
              <span className="text-[#232323] font-display font-bold uppercase tracking-widest text-sm mb-4 bg-white shadow-sm px-4 py-2 rounded border border-slate-100">
                {t("crisis.eyebrow")}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark leading-tight">
                {t("crisis.titleLine1")} <span className="text-brand-primary">{t("crisis.titleLine2")}</span>
              </h2>
              <div className="w-12 h-1.5 bg-brand-primary mt-6 mb-8"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t("crisis.entityDefinition")}
              </p>
              <div className="mt-8 flex items-start gap-4 bg-white/70 backdrop-blur-sm border border-slate-100 rounded-[2rem] p-7 shadow-sm">
                <div className="w-11 h-11 rounded-full bg-brand-secondary/15 flex items-center justify-center text-brand-secondary shrink-0">
                  <Heart size={22} fill="currentColor" />
                </div>
                <p className="text-brand-dark font-medium italic text-xl leading-snug">
                  {t("crisis.quote")}
                </p>
              </div>
            </div>

            {/* Right Column: program description + no-cost CTA */}
            <div className="flex flex-col gap-8">
              <p className="text-lg text-slate-700 leading-relaxed font-medium bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-slate-100">
                {t("crisis.description")}
              </p>

              <div className="bg-white/95 backdrop-blur-md shadow-xl shadow-slate-200/50 border-l-4 border-brand-primary p-8 md:p-10 rounded-r-[2rem] rounded-bl-[2rem] relative overflow-hidden">
                {/* Small inner watermark */}
                <div className="absolute -right-4 -bottom-4 text-brand-primary/5 pointer-events-none">
                  <ShieldCheck size={180} strokeWidth={0.5} />
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 relative z-10 text-lg">
                  {t("crisis.noCostBefore")}<span className="font-bold">{t("crisis.noCostBold")}</span>
                </p>
                <a href="#who-qualifies" className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wide text-sm hover:text-brand-dark transition-colors relative z-10">
                  {t("crisis.qualifyLink")} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise — What is wraparound care (text left, photo cluster right) */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left — content */}
            <div className="flex flex-col">
              <div className="mb-5 inline-flex items-center gap-3">
                <span className="h-1 w-10 rounded-full bg-brand-secondary"></span>
                <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-primary">{t("expertise.eyebrow")}</span>
              </div>

              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-brand-dark md:text-4xl">
                {t("expertise.titleLine1")} <span className="text-brand-primary">{t("expertise.titleLine2")}</span>
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">{t("expertise.description")}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/5 text-brand-primary">
                    <Compass size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-dark">{t("expertise.feature1Title")}</h3>
                    <p className="mt-0.5 leading-relaxed text-slate-600">{t("expertise.feature1Text")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary">
                    <Heart size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-dark">{t("expertise.feature2Title")}</h3>
                    <p className="mt-0.5 leading-relaxed text-slate-600">{t("expertise.feature2Text")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eab308]/10 text-[#ca8a04]">
                    <Users size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-dark">{t("expertise.feature3Title")}</h3>
                    <p className="mt-0.5 leading-relaxed text-slate-600">{t("expertise.feature3Text")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <Link to={to("/our-program")} className="group inline-flex w-fit items-center gap-3 rounded-lg bg-brand-primary px-8 py-3.5 font-display text-base font-bold text-white shadow-lg transition-colors duration-300 hover:bg-brand-dark">
                  {t("expertise.cta")}
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right — tilted photo cluster with soft parallax */}
            <div className="relative px-2 py-8 sm:px-6">
              {/* main photo */}
              <ParallaxFloat distance={32} className="relative z-10">
                <div className="relative rotate-[-2deg] overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-slate-900/5">
                  <img
                    src="/page-hero/home-wraparound.webp"
                    alt={t("expertise.imageAlt")}
                    className="aspect-[4/3] w-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                </div>
              </ParallaxFloat>

              {/* small inset photo peeking from the corner */}
              <ParallaxFloat distance={78} className="absolute -bottom-3 -right-1 z-20 w-28 md:-right-6 md:w-40">
                <div className="rotate-[6deg] overflow-hidden rounded-3xl shadow-xl ring-4 ring-white">
                  <img src="/page-hero/collage-main.webp" alt="" aria-hidden className="aspect-square w-full object-cover object-center" />
                </div>
              </ParallaxFloat>

              {/* floating quote card */}
              <ParallaxFloat distance={14} className="absolute -top-2 -left-1 z-30 max-w-[14rem] md:-left-6">
                <div className="flex items-start gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-xl">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
                    <Heart size={18} fill="currentColor" />
                  </div>
                  <div>
                    <p className="mb-0.5 font-display text-sm font-bold leading-snug text-slate-800">{t("expertise.quoteTitle")}</p>
                    <p className="text-xs leading-relaxed text-slate-500">{t("expertise.quoteText")}</p>
                  </div>
                </div>
              </ParallaxFloat>
            </div>

          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      {/* Are we here for you — warm, minimal, fits one screen */}
      <section id="who-qualifies" className="relative overflow-hidden bg-gradient-to-b from-white to-brand-mist py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-primary">
              <Heart size={14} className="fill-brand-primary/30" />
              {t("qualifies.eyebrow")}
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-brand-dark md:text-5xl">
              {t("qualifies.titleLine1")} <span className="text-brand-primary">{t("qualifies.titleLine2")}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{t("qualifies.intro")}</p>
          </motion.div>

          {/* the four reasons — full-width, icon-forward, symmetric */}
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-y-12 lg:grid-cols-4">
            {[
              { icon: MapPin, key: "point1" },
              { icon: Baby, key: "point2" },
              { icon: HeartHandshake, key: "point3" },
              { icon: HeartPulse, key: "point4" },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="flex flex-col items-center px-5 text-center lg:px-8 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-slate-200"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary shadow-sm ring-1 ring-brand-primary/10">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>
                  <p className="min-h-[3.25rem] text-base font-medium leading-snug text-brand-dark md:text-[17px]">{t(`qualifies.${p.key}`)}</p>
                </motion.div>
              );
            })}
          </div>

          {/* reassurance + single warm CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-12 flex flex-col items-center gap-7"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-brand-dark px-7 py-3.5 text-white shadow-lg">
              <CheckCircle2 size={20} className="shrink-0 text-brand-secondary" />
              <span className="font-display font-bold">{t("qualifies.reassurance")}</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Link
                to={to("/contact-us")}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-primary px-9 py-4 font-display text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark"
              >
                {t("qualifies.ctaPrimary")}
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
              </Link>
              <Link
                to={to("/our-program")}
                className="font-display text-sm font-bold text-brand-primary underline-offset-4 hover:underline"
              >
                {t("qualifies.ctaSecondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services & Goals */}
      <section className="relative overflow-hidden py-10 md:py-12 bg-white">
        {/* Decorative Watermark & Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #232323 1px, transparent 1px), radial-gradient(circle, #232323 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }}></div>
        <div className="absolute top-0 right-[-10%] text-brand-primary/5 pointer-events-none z-0">
          <Sprout size={700} strokeWidth={0.2} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col">
              <h3 className="text-3xl font-display font-bold text-brand-dark mb-8 bg-white shadow-sm px-4 py-2 border border-slate-100 rounded w-fit">{t("services.title")}</h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: t("services.education"), icon: BookOpen },
                  { name: t("services.familyCoaching"), icon: Users },
                  { name: t("services.parentGroups"), icon: Heart },
                  { name: t("services.inHomeSupport"), icon: CheckCircle2 },
                ].map((service) => (
                  <div key={service.name} className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all cursor-pointer group">
                    <div className="w-14 h-14 bg-slate-50 group-hover:bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary transition-colors border border-slate-100">
                      <service.icon size={26} />
                    </div>
                    <span className="font-display font-bold text-brand-dark text-xl">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/80 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-slate-200 flex flex-col justify-center shadow-xl relative overflow-hidden">
               {/* Inner decorative bloom */}
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-secondary/20 blur-[60px] rounded-full pointer-events-none transform-gpu will-change-transform"></div>

              <div className="mb-8 relative z-10">
                <div className="text-brand-primary font-display font-bold uppercase tracking-widest text-sm mb-4">{t("services.goalEyebrow")}</div>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6 leading-tight">{t("services.goalTitle")}</h3>
                <p className="text-xl text-slate-700 leading-relaxed font-medium">
                  {t("services.goalText")}
                </p>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden z-10">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary"></div>
                <p className="text-slate-700 font-medium italic leading-relaxed text-xl">
                  {t("services.quote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — two-column with a tilted, drifting photo */}
      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-brand-cream shadow-2xl">
          {/* glowing orbs */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-brand-primary/25 blur-[120px] transform-gpu will-change-transform" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-brand-secondary/15 blur-[120px] transform-gpu will-change-transform" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-4">
            {/* text */}
            <div className="px-8 pt-12 pb-2 md:px-14 md:py-16 lg:pb-16">
              <span className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary ring-1 ring-brand-dark/10 backdrop-blur-md border border-brand-dark/5">
                <Heart size={15} className="text-brand-primary" fill="currentColor" />
                {t("cta.badge")}
              </span>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-brand-dark md:text-6xl">
                {t("cta.titleLine1")}{" "}
                <span className="text-brand-primary">{t("cta.titleLine2")}</span>
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-brand-dark/70 md:text-xl">
                {t("cta.description")}
              </p>
              <Link
                to={to("/contact-us")}
                className="group mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-brand-primary px-9 py-4 font-display text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark"
              >
                {t("cta.button")}
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>

            {/* tilted drifting photo */}
            <div className="relative min-h-[260px] px-8 pb-12 md:py-16 lg:min-h-[460px] lg:px-0">
              <ParallaxFloat distance={40} className="relative z-10 mx-auto max-w-sm lg:absolute lg:right-12 lg:top-1/2 lg:max-w-md lg:-translate-y-1/2">
                <div className="rotate-[3deg] overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-white">
                  <img src="/page-hero/vision-belonging.webp" alt="" aria-hidden className="aspect-[4/3] w-full object-cover object-center" />
                </div>
              </ParallaxFloat>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
