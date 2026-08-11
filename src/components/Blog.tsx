import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, ArrowRight, Search, Tag, Facebook, Instagram } from "lucide-react";
import { BLOG_INDEX } from "../data/blogIndex";
import { BLOG_CATEGORY_LABEL } from "../data/blogTypes";
import type { BlogCategory } from "../data/blogTypes";
import { useLocale } from "../i18n/useLocale";
import { blogPageLd, breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import Seo from "./Seo";
import PageHero from "./PageHero";
import EnglishContentBadge from "./EnglishContentBadge";
import ArticleCard from "./ArticleCard";

function formatDate(iso: string, lng: "en" | "es") {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(lng === "es" ? "es-ES" : "en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

// The blog is fully native now: cards, images, and article pages all come from
// src/data/blogIndex.ts + src/data/posts/ (the old Google Sheet feed is retired
// for the blog - the same card data powers Related Articles on each post).
export default function Blog() {
  const { t } = useTranslation("blog");
  const { lng, to } = useLocale();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<"All" | BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(6);

  const posts = useMemo(
    () => [...BLOG_INDEX].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    []
  );
  const categories = useMemo<("All" | BlogCategory)[]>(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const catLabel = (c: "All" | BlogCategory) =>
    c === "All" ? t("filters.all") : BLOG_CATEGORY_LABEL[c][lng];

  // Deep-link support: /blog?category=<key> (e.g. from an article's breadcrumb)
  // pre-selects that category filter.
  useEffect(() => {
    const requested = searchParams.get("category");
    if (requested && categories.includes(requested as BlogCategory)) {
      setActiveCategory(requested as BlogCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisplayCount(6);
  }, [activeCategory, searchQuery]);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.title[lng].toLowerCase().includes(q) || post.description[lng].toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const allRegularPosts = filteredPosts.slice(1);
  const regularPosts = allRegularPosts.slice(0, displayCount);
  const hasMore = allRegularPosts.length > displayCount;

  return (
    <div className="pb-0 bg-slate-100 relative overflow-hidden">
      {/* noindex: the listing only surfaces the 15 rebranded LEAF articles, so it
          duplicates LEAF's /blog too. Drop the prop once the articles are rewritten. */}
      <Seo noindex pageKey="blog" path="/blog" jsonLd={graph(organizationLd(), webSiteLd(lng), blogPageLd(lng), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]))} />
      {/* Global Background Decorations */}
      <div className="absolute top-[10%] -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] -right-24 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <PageHero
        image="/page-hero/hero-landscape.webp"
        title={<>{t("hero.titleBefore")}<span className="text-brand-secondary">{t("hero.titleHighlight")}</span>{t("hero.titleAfter")}</>}
        subtitle={t("hero.subtitle")}
      />

      <div id="dynamic-blog-wrapper">
        {/* Filters and Search */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col space-y-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-slate-200 pb-6">
              <div>
                <h2 className="text-3xl font-display font-bold text-brand-dark">{t("filters.heading")}</h2>
                <p className="text-slate-500 mt-2">{t("filters.subheading")}</p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  aria-label={t("filters.searchPlaceholder")}
                  placeholder={t("filters.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-11 pr-4 py-3.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm font-medium text-brand-dark placeholder-slate-400 shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Categories - wraps to extra rows on narrow screens so no tag is
                ever hidden behind an invisible horizontal scroll */}
            <div className="flex flex-wrap items-center gap-3 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-display font-semibold text-sm transition-all whitespace-nowrap border flex items-center gap-2 ${
                    activeCategory === category
                      ? "bg-brand-dark border-brand-dark text-white shadow-md"
                      : "bg-white border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary hover:shadow-sm"
                  }`}
                >
                  {category !== "All" && <Tag size={14} className={activeCategory === category ? "text-brand-secondary" : "text-slate-400"} />}
                  {catLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 z-10 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] scale-150" style={{ backgroundImage: 'radial-gradient(circle, #002f6c 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 md:py-8 md:py-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative z-10">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-dark mb-2">{t("empty.title")}</h3>
              <p className="text-slate-500">{t("empty.message")}</p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="mt-6 text-brand-primary font-bold hover:underline"
              >
                {t("empty.clearFilters")}
              </button>
            </div>
          ) : (
          <div className="space-y-12 relative z-10">
            {/* Featured Post - the newest article matching the active filter */}
            {featuredPost && (
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-200 group flex flex-col lg:flex-row">
                <div className="lg:w-3/5 relative overflow-hidden min-h-[300px] lg:min-h-[400px]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt[lng]}
                    decoding="async"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="lg:w-2/5 p-10 md:p-14 flex flex-col justify-center space-y-6">
                  <p className="font-display text-xs font-bold uppercase tracking-widest text-brand-primary">
                    {catLabel(featuredPost.category)}
                  </p>
                  <div className="flex items-center flex-wrap gap-4 text-slate-400 text-xs font-display font-medium uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-brand-primary" />
                      {formatDate(featuredPost.publishedAt, lng)}
                    </div>
                    {featuredPost.bodyNotTranslated && <EnglishContentBadge />}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-tight">
                    <Link to={to(`/blog/${featuredPost.slug}`)}>
                      {featuredPost.title[lng]}
                    </Link>
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {featuredPost.description[lng]}
                  </p>
                  <div className="pt-4">
                    <Link to={to(`/blog/${featuredPost.slug}`)} className="btn-primary inline-flex items-center gap-2">
                      {t("post.readArticle")} <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <ArticleCard
                    key={post.slug}
                    href={to(`/blog/${post.slug}`)}
                    image={post.image}
                    imageAlt={post.imageAlt[lng]}
                    category={catLabel(post.category)}
                    title={post.title[lng]}
                    excerpt={post.description[lng]}
                    dateLabel={formatDate(post.publishedAt, lng)}
                    readTimeLabel={`${post.readTimeMinutes} ${t("post.minRead", "min read")}`}
                  />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setDisplayCount((prev) => prev + 6)}
                  className="bg-white border-2 border-brand-primary text-brand-primary px-8 py-3 rounded-full font-bold hover:bg-brand-primary hover:text-white transition-colors shadow-sm"
                >
                  {t("post.loadMore")}
                </button>
               </div>
            )}
          </div>
        )}
      </section>
      </div>

      {/* Social Follow CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10 mb-16 border-t border-slate-200 flex flex-col items-center justify-center gap-6 relative z-10 text-center">
        <div className="text-brand-dark font-display font-bold text-2xl">
          {t("social.heading")}
        </div>
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://www.facebook.com/lovepathways/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm border border-slate-200 hover:border-transparent hover:shadow-md"
            aria-label={t("social.facebookLabel")}
          >
            <Facebook size={22} strokeWidth={2} />
          </a>
          <a
            href="https://www.instagram.com/lovepathwayswraparound/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm border border-slate-200 hover:border-transparent hover:shadow-md"
            aria-label={t("social.instagramLabel")}
          >
            <Instagram size={22} strokeWidth={2} />
          </a>
        </div>
      </section>
    </div>
  );
}
