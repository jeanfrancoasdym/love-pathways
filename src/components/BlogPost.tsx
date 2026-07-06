import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, ArrowLeft, ArrowUpRight, ChevronRight, Facebook, Mail, Link2, Check, Quote } from "lucide-react";
import { BLOG_INDEX } from "../data/blogIndex";
import { BLOG_CATEGORY_LABEL_LONG } from "../data/blogTypes";
import type { BlogPostContent } from "../data/blogTypes";
import { useLocale } from "../i18n/useLocale";
import { siteOrigin } from "../data/site";
import { articleLd, breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import Seo from "./Seo";
import ArticleCard from "./ArticleCard";
import EnglishContentBadge from "./EnglishContentBadge";
import NotFound from "./NotFound";

function formatDate(iso: string, lng: "en" | "es") {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(lng === "es" ? "es-ES" : "en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

// Splits a flat "<p>...</p><p>...</p>" body into [leadHtml, restHtml] at the
// given paragraph count - lead pairs with the side image, rest (if any)
// continues as plain full-width text right after, no image involvement.
function splitAtParagraph(html: string, count: number): [string, string] {
  const paragraphs = html.split(/(?<=<\/p>)/).filter((p) => p.trim());
  return [paragraphs.slice(0, count).join(""), paragraphs.slice(count).join("")];
}

// NOTE: this project has no @tailwindcss/typography plugin installed, so
// `prose`/`prose-*` classes are silently inert - every rule below is a plain
// arbitrary-variant selector instead, which is what actually themes the raw
// HTML injected via dangerouslySetInnerHTML (headings, links, bold, lists).
// Literal brand-accent orange (#f8a866), unmodified - same exact color used
// on the home carousel headlines, per explicit request to keep it consistent.
const PROSE_CLASSES =
  "max-w-none [&_p]:my-0 [&_p]:mb-4 [&_p]:leading-normal [&_p]:text-slate-700 [&_p:last-child]:mb-0 " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:text-brand-accent " +
  "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-display [&_h4]:text-lg [&_h4]:font-extrabold [&_h4]:text-brand-accent " +
  "[&_a]:text-brand-primary [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 " +
  "[&_strong]:text-brand-dark [&_strong]:font-semibold " +
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-slate-700 [&_li]:leading-normal [&_li_p]:mb-0";

function ShareBlock({ url, title, label }: { url: string; title: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation("blog");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable - silently ignore */
    }
  };

  return (
    <div>
      <p className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <div className="flex items-center gap-2">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-primary hover:text-brand-primary"
          aria-label="Facebook"
        >
          <Facebook size={16} />
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-primary hover:text-brand-primary"
          aria-label="Email"
        >
          <Mail size={16} />
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-primary hover:text-brand-primary"
          aria-label={t("post.copyLink", "Copy link")}
        >
          {copied ? <Check size={16} className="text-brand-primary" /> : <Link2 size={16} />}
        </button>
      </div>
    </div>
  );
}

export default function BlogPost({ slugProp }: { slugProp: string }) {
  const { lng, to } = useLocale();
  const { t } = useTranslation("blog");
  const meta = BLOG_INDEX.find((p) => p.slug === slugProp);
  const content = useLoaderData() as BlogPostContent | undefined;
  const sections = content?.sections ?? [];
  const hasToc = sections.length > 1;
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const splitTextRefs = useRef<Record<string, HTMLElement | null>>({});
  const splitImgRefs = useRef<Record<string, HTMLImageElement | null>>({});

  // Split-mode side images: match the image's height to the text column's
  // actual rendered height via JS (not CSS flex-stretch, which some browsers
  // don't apply consistently to <img> elements) - the paragraph content always
  // dictates the image size, never the other way around.
  useEffect(() => {
    const pairs = Object.keys(splitTextRefs.current);
    if (pairs.length === 0) return;
    const applyHeights = () => {
      pairs.forEach((id) => {
        const textEl = splitTextRefs.current[id];
        const imgEl = splitImgRefs.current[id];
        if (textEl && imgEl && window.innerWidth >= 768) {
          imgEl.style.height = `${textEl.getBoundingClientRect().height}px`;
        } else if (imgEl) {
          imgEl.style.height = "";
        }
      });
    };
    applyHeights();
    const observer = new ResizeObserver(applyHeights);
    pairs.forEach((id) => {
      const el = splitTextRefs.current[id];
      if (el) observer.observe(el);
    });
    window.addEventListener("resize", applyHeights);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", applyHeights);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugProp, sections.length]);

  useEffect(() => {
    if (!hasToc) return;
    const OFFSET = 160; // matches the sticky sidebar's top offset
    const recompute = () => {
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = sectionRefs.current[s.id];
        if (el && el.getBoundingClientRect().top <= OFFSET) current = s.id;
      }
      setActiveSection(current);
    };
    recompute();
    // Pages keep Lenis smooth-scroll (see Layout.tsx), which does not drive the
    // native window "scroll" event on its own - hook into Lenis's own scroll
    // callback when present, falling back to native scroll otherwise.
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on("scroll", recompute);
      return () => lenis.off("scroll", recompute);
    }
    window.addEventListener("scroll", recompute, { passive: true });
    return () => window.removeEventListener("scroll", recompute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugProp, hasToc]);

  const jumpToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -100 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!meta || !content) return <NotFound />;

  const category = BLOG_CATEGORY_LABEL_LONG[meta.category];
  const pageUrl = `${siteOrigin}${to(`/blog/${meta.slug}`)}`;
  // Same-category articles first, then the rest, newest first within each group.
  const related = [...BLOG_INDEX]
    .filter((p) => p.slug !== meta.slug)
    .sort((a, b) => {
      const catDiff = Number(b.category === meta.category) - Number(a.category === meta.category);
      return catDiff !== 0 ? catDiff : b.publishedAt.localeCompare(a.publishedAt);
    })
    .slice(0, 3);
  const showEnglishBadge = !!meta.bodyNotTranslated;

  return (
    <article className="bg-white">
      <Seo
        pageKey="blog"
        path={`/blog/${meta.slug}`}
        title={`${meta.title[lng]} | Love Pathways Wraparound`}
        description={meta.description[lng]}
        image={meta.image}
        type="article"
        jsonLd={graph(
          organizationLd(),
          webSiteLd(lng),
          articleLd(lng, { title: meta.title[lng], description: meta.description[lng], path: `/blog/${meta.slug}`, image: meta.image, publishedAt: meta.publishedAt }),
          breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: meta.title[lng], path: `/blog/${meta.slug}` }])
        )}
      />

      {/* Breadcrumb + header share the body's exact grid tracks, so the title
          lines up with the article text below it instead of the sidebar. */}
      <div className={`mx-auto max-w-[88rem] gap-12 px-4 pt-8 sm:px-6 lg:px-8 ${hasToc ? "grid grid-cols-1 md:grid-cols-[220px_1fr]" : ""}`}>
        {hasToc && <div className="hidden md:block" aria-hidden="true" />}
        <div className={`max-w-[50rem] ${hasToc ? "" : "mx-auto"}`}>
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm font-medium text-slate-400">
            <Link to={to("/blog")} className="hover:text-brand-primary transition-colors">
              {t("post.blogLabel", "Blog")}
            </Link>
            <ChevronRight size={14} />
            <Link to={to(`/blog?category=${meta.category}`)} className="text-brand-primary hover:underline">
              {category[lng]}
            </Link>
            <ChevronRight size={14} />
            <span className="max-w-[16rem] truncate text-slate-500 sm:max-w-md">{meta.title[lng]}</span>
          </nav>

          {/* Manrope runs wider/taller than LEAF's Fraunces at the same size,
              so this is a step down (4xl vs 5xl) + extrabold to match the
              visual weight and line-wrap footprint of the LEAF template. */}
          <h1 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-brand-dark md:text-4xl">
            {meta.title[lng]}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-6 text-sm font-medium text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Calendar size={15} className="text-brand-primary" /> {formatDate(meta.publishedAt, lng)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={15} className="text-brand-primary" /> {meta.readTimeMinutes} {t("post.minRead", "min read")}
            </span>
            {showEnglishBadge && <EnglishContentBadge />}
          </div>
        </div>
      </div>

      {/* Body - sticky sidebar (Share + TOC) appears only for multi-section articles */}
      <div className={`mx-auto max-w-[88rem] gap-12 px-4 py-14 sm:px-6 lg:px-8 ${hasToc ? "grid grid-cols-1 md:grid-cols-[220px_1fr]" : ""}`}>
        {hasToc && (
          <aside className="hidden md:block">
            <div className="sticky top-28 space-y-8">
              <ShareBlock url={pageUrl} title={meta.title[lng]} label={t("post.shareArticle", "Share this Article")} />
              <div>
                <p className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-slate-400">
                  {t("post.inThisArticle", "In this Article")}
                </p>
                <ol className="space-y-2.5 border-l border-slate-200">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={jumpToSection(s.id)}
                        className={`-ml-px block border-l-2 py-0.5 pl-4 text-sm transition-colors ${
                          activeSection === s.id
                            ? "border-brand-secondary font-bold text-brand-accent"
                            : "border-transparent text-slate-500 hover:text-brand-primary"
                        }`}
                      >
                        {i + 1}. {s.heading[lng]}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>
        )}

        {/* Main content - capped narrower than the available grid space so it
            reads as a comfortable column, not a full-bleed block */}
        <div className={`min-w-0 max-w-[50rem] ${hasToc ? "" : "mx-auto"}`}>
          {!hasToc && <ShareBlock url={pageUrl} title={meta.title[lng]} label={t("post.shareArticle", "Share this Article")} />}

          <p className="my-8 border-l-4 border-brand-secondary bg-brand-cream/60 py-4 pl-6 font-display text-lg font-medium italic leading-relaxed text-brand-dark">
            {meta.description[lng]}
          </p>

          {sections.map((s, i) => (
            <div key={s.id}>
              <section id={s.id} ref={(el) => { sectionRefs.current[s.id] = el; }} className="scroll-mt-28">
                {hasToc && <h2 className="mb-5 font-display text-2xl font-extrabold text-brand-accent">{s.heading[lng]}</h2>}

                {s.sideImage ? (
                  (() => {
                    const [leadHtml, restHtml] = splitAtParagraph(s.bodyHtml[lng], s.sideImage.pairParagraphs);
                    return (
                      <>
                        <div className={`flex flex-col gap-8 md:flex-row ${s.sideImage.side === "left" ? "md:flex-row-reverse" : ""}`}>
                          <div
                            ref={(el) => { splitTextRefs.current[s.id] = el; }}
                            className={`${PROSE_CLASSES} flex-1`}
                            dangerouslySetInnerHTML={{ __html: leadHtml }}
                          />
                          {/* Height is set in JS to exactly match the text column
                              (see the effect above) - the paragraphs always dictate
                              the image size, never the other way around. Falls back
                              to a 4:3 box below md, where the two stack instead. */}
                          <img
                            ref={(el) => { splitImgRefs.current[s.id] = el; }}
                            src={s.sideImage.src}
                            alt={s.sideImage.alt[lng]}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[4/3] w-full object-cover md:aspect-auto md:w-72 md:shrink-0 lg:w-80"
                          />
                        </div>
                        {restHtml && (
                          <div
                            className={`${PROSE_CLASSES} mt-8`}
                            dangerouslySetInnerHTML={{ __html: restHtml }}
                          />
                        )}
                      </>
                    );
                  })()
                ) : (
                  <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: s.bodyHtml[lng] }} />
                )}
              </section>

              {content.pullQuote && i === 1 && (
                <blockquote className="relative my-10 border-l-4 border-brand-secondary py-2 pl-8">
                  <Quote size={28} className="absolute -left-1 top-0 text-brand-secondary/40" aria-hidden="true" />
                  <p className="font-display text-xl font-medium italic leading-snug text-brand-accent md:text-2xl">
                    “{content.pullQuote.text[lng]}”
                  </p>
                  <cite className="mt-4 block text-sm font-semibold not-italic text-slate-500">
                    {content.pullQuote.attribution[lng]}
                  </cite>
                </blockquote>
              )}

              {i < sections.length - 1 && <div className="my-10 border-t border-slate-100" />}
            </div>
          ))}

          {(content.sourceLabel || content.currentUrl) && (
            <div className="mt-10 space-y-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-sm text-slate-500">
              {content.sourceLabel && (
                <p>
                  {t("post.originallyReported", "Originally reported by")}{" "}
                  {content.sourceUrl ? (
                    <a href={content.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                      {content.sourceLabel} <ArrowUpRight size={14} className="inline" />
                    </a>
                  ) : (
                    <span className="font-semibold text-slate-600">{content.sourceLabel}</span>
                  )}
                </p>
              )}
              {content.currentUrl && (
                <p>
                  <a href={content.currentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                    {content.currentLabel} <ArrowUpRight size={14} className="inline" />
                  </a>
                </p>
              )}
            </div>
          )}

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8">
            <Link to={to("/blog")} className="inline-flex items-center gap-2 font-display font-bold text-brand-primary hover:text-brand-dark transition-colors">
              <ArrowLeft size={18} /> {t("post.backToBlog", "Back to all articles")}
            </Link>
          </div>
        </div>
      </div>

      {/* Related Articles - same cards (image/title/category) as the /blog listing */}
      {related.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-display text-2xl font-extrabold text-brand-dark">
              {t("post.relatedArticles", "Related Articles")}
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ArticleCard
                  key={p.slug}
                  href={to(`/blog/${p.slug}`)}
                  image={p.image}
                  imageAlt={p.imageAlt[lng]}
                  category={BLOG_CATEGORY_LABEL_LONG[p.category][lng]}
                  title={p.title[lng]}
                  excerpt={p.description[lng]}
                  dateLabel={formatDate(p.publishedAt, lng)}
                  readTimeLabel={`${p.readTimeMinutes} ${t("post.minRead", "min read")}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
