import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, User, ArrowRight, BookOpen, Search, Tag, Loader, Facebook, Instagram } from "lucide-react";
import { feeds, brandPlaceholderImg } from "../data/site";
import { useLocale } from "../i18n/useLocale";
import { blogPageLd, breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import { fetchSheet } from "../lib/csv";
import Seo from "./Seo";
import PageHero from "./PageHero";
import EnglishContentBadge from "./EnglishContentBadge";

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts.map(Number);
    const d = new Date(year, month - 1, day);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  }
  return dateStr;
}

export async function blogLoader() {
  try {
    const rows = await fetchSheet(feeds.blog);
    // Expected columns: 0: date, 1: title, 2: description, 3: link, 4: category, 5: image
    const parsedPosts = rows.slice(1).map((row, index) => {
      if (row.length < 5) return null;
      const rawLink = row[3]?.trim();
      const formattedLink = rawLink ? (rawLink.startsWith('http') ? rawLink : `https://${rawLink}`) : '';
      return {
        id: index,
        date: row[0]?.trim(),
        title: row[1]?.trim(),
        excerpt: row[2]?.trim(),
        link: formattedLink,
        category: row[4]?.trim() || 'Uncategorized',
        image: row[5]?.trim() || brandPlaceholderImg,
        author: "LEAF Wraparound",
        featured: index === 0,
      };
    }).filter((p) => p !== null);
    const categories = ["All", ...Array.from(new Set(parsedPosts.map((p) => p?.category).filter(Boolean)))];
    return { posts: parsedPosts, categories };
  } catch (err) {
    console.error(err);
    return { posts: [], categories: ["All"] };
  }
}

export default function Blog() {
  const { t, i18n } = useTranslation("blog");
  const { lng } = useLocale();
  const catLabel = (c: string) =>
    c === "All" ? t("filters.all") : c === "Uncategorized" ? t("post.uncategorized") : c;
  const { posts, categories } = (useLoaderData() as { posts: any[]; categories: string[] }) ?? { posts: [], categories: ["All"] };
  const loading = false;
  const error = false;
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    setDisplayCount(3);
  }, [activeCategory, searchQuery]);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = (post.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const allRegularPosts = filteredPosts.filter(post => post !== featuredPost);
  const regularPosts = allRegularPosts.slice(0, displayCount);
  const hasMore = allRegularPosts.length > displayCount;

  return (
    <div className="pb-0 bg-slate-100 relative overflow-hidden">
      <Seo pageKey="blog" path="/blog" jsonLd={graph(organizationLd(), webSiteLd(lng), blogPageLd(lng), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]))} />
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

            {/* Categories */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar snap-x">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`snap-start px-6 py-3 rounded-full font-display font-semibold text-sm transition-all whitespace-nowrap border flex items-center gap-2 ${
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
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 relative z-10">
              <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-brand-dark font-display font-bold text-lg">{t("loading")}</p>
            </div>
          ) : error ? (
             <div className="text-center py-16 bg-white rounded-[3rem] border border-red-100 shadow-sm relative z-10">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-400 mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-800 mb-2">{t("error.title")}</h3>
              <p className="text-slate-500 max-w-md mx-auto">{t("error.message")}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
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
            {/* Featured Post (Only show if "All" is selected or if it matches the filter and is the first item) */}
            {featuredPost && (
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-200 group flex flex-col lg:flex-row">
                <div className="lg:w-3/5 relative overflow-hidden min-h-[300px] lg:min-h-[400px]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-brand-secondary text-brand-dark px-4 py-1.5 rounded-full text-sm font-display font-bold shadow-lg">
                    {catLabel(featuredPost.category)}
                  </div>
                </div>
                <div className="lg:w-2/5 p-10 md:p-14 flex flex-col justify-center space-y-6">
                  <div className="flex items-center flex-wrap gap-4 text-slate-400 text-xs font-display font-medium uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-brand-primary" />
                      {formatDate(featuredPost.date, i18n.language)}
                    </div>
                    <EnglishContentBadge />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-tight">
                    <a href={featuredPost.link || "#"} target={featuredPost.link ? "_blank" : "_self"} rel={featuredPost.link ? "noopener noreferrer" : ""}>
                      {featuredPost.title}
                    </a>
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="pt-4">
                    <a 
                      href={featuredPost.link || "#"} 
                      target={featuredPost.link ? "_blank" : "_self"}
                      rel={featuredPost.link ? "noopener noreferrer" : ""}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      {t("post.readArticle")} <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <div
                    key={post.title}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-md border border-slate-200 hover:shadow-xl transition-all group flex flex-col"
                  >
                    <div className="relative h-60 overflow-hidden shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-brand-dark px-4 py-1 rounded-full text-xs font-display font-bold shadow-sm">
                        {catLabel(post.category)}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow space-y-4">
                      <div className="flex items-center flex-wrap gap-4 text-slate-400 text-[10px] font-display font-medium uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-brand-primary" />
                          {formatDate(post.date, i18n.language)}
                        </div>
                        <EnglishContentBadge />
                      </div>
                      <h3 className="text-xl font-display font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-tight">
                        <a href={post.link || "#"} target={post.link ? "_blank" : "_self"} rel={post.link ? "noopener noreferrer" : ""}>
                          {post.title}
                        </a>
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 border-t border-slate-100">
                        <a 
                          href={post.link || "#"} 
                          target={post.link ? "_blank" : "_self"}
                          rel={post.link ? "noopener noreferrer" : ""}
                          className="inline-flex items-center gap-2 text-brand-primary font-bold text-sm hover:gap-3 transition-all"
                        >
                          {t("post.readMore")} <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setDisplayCount(prev => prev + 3)}
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
            href="https://www.facebook.com/leafwraparound" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm border border-slate-200 hover:border-transparent hover:shadow-md"
            aria-label={t("social.facebookLabel")}
          >
            <Facebook size={22} strokeWidth={2} />
          </a>
          <a 
            href="https://www.instagram.com/leafwraparound/" 
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
