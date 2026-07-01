import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, ArrowRight, Heart, MapPin, Mail } from "lucide-react";
import AccessibilityMenu from "./AccessibilityMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "../i18n/useLocale";
import { contact, parentOrg } from "../data/site";
import { Head } from "vite-react-ssg";
import { graph, organizationLd, webSiteLd } from "../seo/structuredData";

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <img
      src={dark ? "/love-logo-white.svg" : "/love-logotype-dark.png"}
      alt="Love Pathways Wraparound, a program of Revive Behavioral Healthcare"
      className="h-12 w-auto"
    />
  );
}

type NavItem = { key: string; path?: string; dropdown?: { key: string; path: string }[] };

const navItems: NavItem[] = [
  {
    key: "about",
    dropdown: [
      { key: "whoWeAre", path: "/about-us" },
      { key: "ourTeam", path: "/our-team" },
      { key: "ourImpact", path: "/impact" },
    ],
  },
  { key: "ourProgram", path: "/our-program" },
  { key: "events", path: "/events" },
  {
    key: "resources",
    dropdown: [
      { key: "resourceHub", path: "/resource-hub" },
      { key: "blog", path: "/blog" },
    ],
  },
  { key: "faq", path: "/faq" },
  { key: "contact", path: "/contact-us" },
];

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { to, lng } = useLocale();
  const lenisRef = useRef<Lenis | null>(null);

  // Global smooth scrolling (client only). Lenis lerps wheel/touch input so the
  // page glides instead of jumping per notch, and feeds the scroll-linked effects.
  useEffect(() => {
    // lerp = continuous interpolation (buttery, glides). Using `duration` instead
    // animates per wheel-notch, which feels stepped ("block by block").
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path?: string) => !!path && location.pathname === to(path);

  return (
    <>
      <a href="#main-content" className="a11y-skip-link">{t("a11y.skipToContent")}</a>
      <Head>
        <script type="application/ld+json">{JSON.stringify(graph(organizationLd(), webSiteLd(lng)))}</script>
      </Head>
      <div id="a11y-root" className="min-h-screen flex flex-col bg-brand-cream">
      <header className="sticky top-0 z-50 w-full bg-brand-cream border-b border-brand-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to={to("/")} aria-label="Love Pathways Wraparound: Home">
              <Wordmark />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.key} className="relative group">
                    <button className="nav-link text-[15px] flex items-center gap-1 py-2">
                      {t("nav." + item.key)}
                      <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                      <div className="w-52 bg-white rounded-2xl shadow-[0_16px_40px_-12px_rgba(25,40,71,0.18)] border border-brand-dark/5 flex flex-col p-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={to(subItem.path)}
                            className={`px-4 py-2.5 text-[15px] font-semibold rounded-xl hover:bg-brand-cream transition-colors ${
                              isActive(subItem.path) ? "text-brand-primary" : "text-brand-dark/70 hover:text-brand-dark"
                            }`}
                          >
                            {t("nav." + subItem.key)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={to(item.path!)}
                    className={`nav-link text-[15px] py-2 relative ${isActive(item.path) ? "text-brand-dark" : ""}`}
                  >
                    {t("nav." + item.key)}
                    {isActive(item.path) && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-brand-secondary rounded-full" />
                    )}
                  </Link>
                )
              )}
              <div className="flex items-center gap-3 pl-2">
                <LanguageSwitcher />
                {/* Donate hidden until the page is ready — restore when launching */}
                {/*
                <Link to={to("/donate")} className="btn-outline !px-6 !py-3 text-[15px]">
                  {t("nav.donate")}
                </Link>
                */}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-brand-dark"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-brand-cream border-t border-brand-dark/5 py-5 px-5 space-y-1 shadow-[0_24px_40px_-20px_rgba(25,40,71,0.25)]">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.key} className="pb-1">
                  <div className="py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-dark/40">
                    {t("nav." + item.key)}
                  </div>
                  <div className="space-y-0.5">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={to(subItem.path)}
                        className={`block py-2.5 px-3 rounded-xl text-lg font-semibold ${
                          isActive(subItem.path) ? "text-brand-primary bg-white" : "text-brand-dark/80"
                        }`}
                      >
                        {t("nav." + subItem.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={to(item.path!)}
                  className={`block py-2.5 px-3 rounded-xl text-lg font-semibold ${
                    isActive(item.path) ? "text-brand-primary bg-white" : "text-brand-dark/80"
                  }`}
                >
                  {t("nav." + item.key)}
                </Link>
              )
            )}
            <div className="flex flex-col gap-3 pt-4">
              <div className="px-1"><LanguageSwitcher /></div>
              {/* Donate hidden until the page is ready — restore when launching */}
              {/*
              <Link to={to("/donate")} className="btn-outline w-full text-center">
                {t("nav.donate")}
              </Link>
              */}
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-grow"><Outlet /></main>

      {/* Footer — warm/cream (Love Pathways brandbook avoids dark backgrounds) */}
      <footer className="bg-brand-cream text-brand-dark border-t border-brand-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            <div className="md:col-span-5">
              <Wordmark />
              <p className="text-brand-dark/70 max-w-sm leading-relaxed mt-5 text-[15px]">
                {" "}Love Pathways Wraparound{" "}{t("footer.beforeOrg")}{" "}
                <a
                  href={parentOrg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-brand-primary/60 underline-offset-4 hover:text-brand-dark transition-colors"
                >
                  {t("wordmark.org")}
                </a>{" "}
                {t("footer.afterOrg")}
              </p>
              <div className="inline-flex items-center gap-2 mt-6 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-2">
                <Heart size={14} className="text-brand-primary" fill="currentColor" />
                <span className="text-sm font-bold tracking-wide text-brand-dark">#ChooseLove</span>
              </div>
            </div>

            <div className="md:col-span-3">
              <h2 className="font-display font-bold mb-5 text-sm uppercase tracking-[0.16em] text-brand-dark/50">{t("footer.explore")}</h2>
              <ul className="space-y-3 text-brand-dark/70 text-[15px] font-medium">
                <li><Link to={to("/about-us")} className="hover:text-brand-primary transition-colors">{t("nav.whoWeAre")}</Link></li>
                <li><Link to={to("/our-program")} className="hover:text-brand-primary transition-colors">{t("nav.ourProgram")}</Link></li>
                <li><Link to={to("/impact")} className="hover:text-brand-primary transition-colors">{t("nav.ourImpact")}</Link></li>
                <li><Link to={to("/events")} className="hover:text-brand-primary transition-colors">{t("nav.events")}</Link></li>
                <li><Link to={to("/blog")} className="hover:text-brand-primary transition-colors">{t("nav.blog")}</Link></li>
                <li><Link to={to("/career")} className="hover:text-brand-primary transition-colors">{t("nav.careers")}</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h2 className="font-display font-bold mb-5 text-sm uppercase tracking-[0.16em] text-brand-dark/50">{t("footer.contact")}</h2>
              <ul className="space-y-4 text-brand-dark/70 text-[15px]">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>{contact.addressFull}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-brand-primary shrink-0 mt-0.5" />
                  <a href={contact.emailHref} className="hover:text-brand-primary transition-colors">
                    {contact.email}
                  </a>
                </li>
              </ul>
              <Link
                to={to("/contact-us")}
                className="inline-flex items-center gap-2 mt-7 text-brand-dark font-bold group hover:text-brand-primary transition-colors"
              >
                {t("footer.getSupport")}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="border-t border-brand-dark/10 mt-14 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-brand-dark/50 text-sm">
            <span>
              © {new Date().getFullYear()}{" "}Love Pathways. {t("footer.rights")}
            </span>
            <div className="flex items-center gap-5">
              <Link to={to("/privacy-policy")} className="hover:text-brand-dark transition-colors">
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
      <AccessibilityMenu />
    </>
  );
}
