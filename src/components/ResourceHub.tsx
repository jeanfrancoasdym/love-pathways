import React, { useState, useEffect } from 'react';
import { Star, FileText, Book, PlayCircle, File, Headphones, ArrowRight, Download, Play, SlidersHorizontal, MonitorPlay, X, ChevronDown, Blocks, Facebook, Instagram } from 'lucide-react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
import { feeds, brandPlaceholderImg } from '../data/site';
import { fetchSheet } from '../lib/csv';
import { breadcrumbLd, graph, organizationLd, webSiteLd } from "../seo/structuredData";
import Seo from './Seo';
import PageHero from './PageHero';
import EnglishContentBadge from './EnglishContentBadge';

const staticResources = [
  {
    id: 6,
    category: 'Books',
    type: 'Book',
    title: 'The time-in solution',
    description: 'Why time-out doesn’t work',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
    action: 'Download',
    colorClass: 'from-indigo-600 to-indigo-600/40',
    bgClass: 'bg-indigo-600/80',
    featured: false,
    metric: 1450,
    metricLabel: 'Downloads',
    dateDesc: 'Jan 15, 2024',
    timestamp: 1705276800000,
    link: 'https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/691ba1f35aec761fa093e8bc.pdf'
  },
  {
    id: 7,
    category: 'Books',
    type: 'Book',
    title: 'How to end lying',
    description: 'Why Kids Lie And What You Can Do To Stop Them',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80',
    action: 'Download',
    colorClass: 'from-rose-600 to-rose-600/40',
    bgClass: 'bg-rose-600/80',
    featured: true,
    metric: 2320,
    metricLabel: 'Downloads',
    dateDesc: 'Feb 10, 2024',
    timestamp: 1707523200000,
    link: 'https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/691ba1f3c761d4687fd20f05.pdf'
  },
  {
    id: 15,
    category: 'Guides',
    type: 'Guide',
    title: 'Parents In Crisis',
    description: 'Offers a lens, a language, and a roadmap rooted in something deeper than control: connection.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80',
    action: 'Download',
    colorClass: 'from-blue-600 to-blue-600/40',
    bgClass: 'bg-blue-600/80',
    featured: false,
    metric: 3400,
    metricLabel: 'Downloads',
    dateDesc: 'Sep 13, 2025',
    timestamp: 1757721600000,
    link: 'https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/69e13fc450b9a3263a5e96b5.pdf'
  },
  {
    id: 16,
    category: 'Guides',
    type: 'Guide',
    title: 'The Sensory-Calm Checklist for Adoptive Parents (Ages 3-7)',
    description: 'A Trauma-Responsive Tool for Adoptive Parents',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
    action: 'Download',
    colorClass: 'from-emerald-600 to-emerald-600/40',
    bgClass: 'bg-emerald-600/80',
    featured: false,
    metric: 2100,
    metricLabel: 'Downloads',
    dateDesc: 'Mar 2025',
    timestamp: 1740787200000,
    link: 'https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/693af240eac0a8dc1003194d.pdf'
  },
  {
    id: 17,
    category: 'Guides',
    type: 'Guide',
    title: 'The IEP Script for Adoptive Parents (Ages 8-12)',
    description: 'A calming, trauma-responsive tool you can use in school meetings',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80',
    action: 'Download',
    colorClass: 'from-cyan-600 to-cyan-600/40',
    bgClass: 'bg-cyan-600/80',
    featured: false,
    metric: 1800,
    metricLabel: 'Downloads',
    dateDesc: 'Mar 2025',
    timestamp: 1740787200000,
    link: 'https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media/692df30873043aeddd0c16de.pdf'
  },
  {
    id: 19,
    category: 'Additional Tools',
    type: 'AI App',
    title: 'Bondify AI',
    description: 'Your Personalized Parenting Coach, Available Anytime You Need It',
    image: 'https://assets.cdn.filesafe.space/b9yZeSkIJcAUQVtNY4gk/media/67a25c50e2b81936238d3b7c.png',
    action: 'Learn More..',
    colorClass: 'from-blue-600 to-blue-600/40',
    bgClass: 'bg-blue-600/80',
    featured: false,
    metric: 0,
    metricLabel: '',
    dateDesc: '',
    timestamp: 1800000000000,
    link: 'https://bondify.ai/'
  },
  {
    id: 20,
    category: 'Additional Tools',
    type: 'Course',
    title: 'Fear to Love Courses',
    description: 'Empowering Parents and Professionals to Create Nurturing, Trauma-Responsive Environments Where Children Can Thrive.',
    image: 'https://assets.cdn.filesafe.space/NvjmVyMyRvR7aZmL5j15/media/69e151bb12a3b92a68215b3b.webp',
    action: 'Learn More..',
    colorClass: 'from-emerald-600 to-emerald-600/40',
    bgClass: 'bg-emerald-600/80',
    featured: false,
    metric: 0,
    metricLabel: '',
    dateDesc: '',
    timestamp: 1800000000000,
    link: 'https://feartolove.com/'
  }
];

const colorClasses = [
  'from-fuchsia-600 to-fuchsia-600/40',
  'from-teal-600 to-teal-600/40',
  'from-pink-600 to-pink-600/40',
  'from-yellow-600 to-yellow-600/40',
  'from-amber-600 to-amber-600/40',
];

const bgClasses = [
  'bg-fuchsia-600/80',
  'bg-teal-600/80',
  'bg-pink-600/80',
  'bg-yellow-600/80',
  'bg-amber-600/80',
];

// Runs at BUILD time (and on client navigation): fetches the webinar feed so
// the dynamic resources are baked into the prerendered HTML.
export async function resourcesLoader() {
  try {
    const rows = await fetchSheet(feeds.resources);
    // Expected columns: Title, Resource, Date, Description, Link, Image, view count
    const dynamicWebinars = rows.slice(1).map((row, index) => {
      if (row.length < 5) return null;
      const colorIdx = index % colorClasses.length;
      const rawLink = row[4]?.trim();
      const formattedLink = rawLink ? (rawLink.startsWith('http') ? rawLink : `https://${rawLink}`) : '';
      return {
        id: 1000 + index,
        category: 'Webinars',
        type: row[1]?.trim() || 'Webinar',
        title: row[0]?.trim(),
        description: row[3]?.trim(),
        image: row[5]?.trim() || brandPlaceholderImg,
        action: 'Watch Video',
        colorClass: colorClasses[colorIdx],
        bgClass: bgClasses[colorIdx],
        featured: index < 3,
        metric: parseInt(row[6]?.trim() || '0', 10) || 0,
        metricLabel: 'Views',
        dateDesc: row[2]?.trim(),
        timestamp: new Date(row[2]?.trim()).getTime() || Date.now(),
        link: formattedLink,
        isDynamicWebinar: true,
      };
    }).filter((e) => e !== null);
    return dynamicWebinars;
  } catch (err) {
    console.error("Error fetching webinars:", err);
    return [];
  }
}

export default function ResourceHub() {
  const { t } = useTranslation("resourceHub");
  const { lng } = useLocale();
  const [activeTab, setActiveTab] = useState('Featured');
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('Relevance');
  const [videoState, setVideoState] = useState({ isOpen: false, url: '' });
  const [expandedDesc, setExpandedDesc] = useState<number[]>([]);
  const dynamicWebinars = (useLoaderData() as any[]) ?? [];
  const resources = [...staticResources, ...dynamicWebinars];

  const tabs = [
    { name: 'Additional Tools', key: 'additionalTools', icon: Blocks },
    { name: 'Featured', key: 'featured', icon: Star },
    { name: 'Webinars', key: 'webinars', icon: MonitorPlay },
    { name: 'Guides', key: 'guides', icon: FileText },
    { name: 'Books', key: 'books', icon: Book },
    { name: 'Podcasts', key: 'podcasts', icon: Headphones },
    { name: 'Articles', key: 'articles', icon: File },
  ];

  // Tab/action display labels are translated, but the English `name`/`action`
  // values stay the source of truth for filtering and icon selection.
  const tabLabel = (name: string) => {
    const tab = tabs.find((x) => x.name === name);
    return tab ? t(`tabs.${tab.key}`) : name;
  };
  const actionLabel = (a: string) => {
    switch (a) {
      case 'Download': return t('actions.download');
      case 'Watch Video': return t('actions.watchVideo');
      case 'Listen Now': return t('actions.listenNow');
      case 'Get it Now': return t('actions.getItNow');
      default: return a && a.startsWith('Learn More') ? t('actions.learnMore') : a;
    }
  };

  // Listen for query params to switch tabs on load
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && tabs.some(t => t.name === tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  const toggleDesc = (id: number) => {
    setExpandedDesc(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleTabClick = (tabName: string) => {
    if (tabName === 'Articles') {
      window.open('/blog', '_blank');
    } else {
      setActiveTab(tabName);
    }
  };

  const filteredResources = activeTab === 'Featured' 
    ? resources.filter(r => r.featured)
    : resources.filter(r => r.category === activeTab);

  return (
    <>
      <Seo pageKey="resourceHub" path="/resource-hub" jsonLd={graph(organizationLd(), webSiteLd(lng), breadcrumbLd(lng, [{ name: "Home", path: "/" }, { name: "Resource Hub", path: "/resource-hub" }]))} />
      <div className="bg-white min-h-screen pb-24 overflow-hidden">
        {/* Header Section */}
      <PageHero
        image="/page-hero/hero-landscape.webp"
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200">
          <div className="flex space-x-8 lg:justify-center min-w-max mx-auto px-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.name)}
                  data-tab={tab.name}
                  className={`ghl-tab-btn flex items-center gap-2 pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                    isActive ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Icon size={18} />
                  {t(`tabs.${tab.key}`)}
                  <div className={`ghl-tab-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary ${isActive ? 'block' : 'hidden'}`}></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center gap-4 mb-8">
          <h2 id="ghl-resource-title" className="text-2xl font-display font-bold text-brand-dark">
            {activeTab === 'Featured' ? t("section.featured") : tabLabel(activeTab)}
          </h2>
          <div id="ghl-filter-container" className={`relative z-50 ${activeTab === 'Additional Tools' ? 'hidden' : 'block'}`}>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFilterOpen(!isFilterOpen); }}
              aria-label="Sort and filter resources"
              className="ghl-filter-toggle text-slate-400 hover:text-brand-primary transition-colors p-1 rounded-full hover:bg-slate-100"
            >
              <SlidersHorizontal size={20} aria-hidden="true" />
            </button>
            
            {/* Filter Dropdown */}
            <div className={`ghl-filter-menu absolute left-0 top-full mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl py-2 z-50 ${isFilterOpen ? 'block' : 'hidden'}`}>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveSort('Relevance'); setIsFilterOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm ghl-filter-opt ${activeSort === 'Relevance' ? 'text-brand-primary bg-slate-50 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-primary'}`}
              >{t("filter.relevance")}</button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveSort('Popular'); setIsFilterOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm ghl-filter-opt ${activeSort === 'Popular' ? 'text-brand-primary bg-slate-50 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-primary'}`}
              >{t("filter.popular")}</button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveSort('Recent'); setIsFilterOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm ghl-filter-opt ${activeSort === 'Recent' ? 'text-brand-primary bg-slate-50 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-primary'}`}
              >{t("filter.recent")}</button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveSort('Oldest'); setIsFilterOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm ghl-filter-opt ${activeSort === 'Oldest' ? 'text-brand-primary bg-slate-50 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-primary'}`}
              >{t("filter.oldest")}</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ghl-resources-grid">
          <div id="ghl-empty-state" className={`col-span-1 sm:col-span-2 lg:col-span-4 text-center py-10 md:py-14 ${filteredResources.length === 0 ? 'block' : 'hidden'}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4 ghl-empty-state-icon">
              {activeTab === 'Podcasts' ? <Headphones className="text-slate-400" size={32} /> : 
               activeTab === 'Additional Tools' ? <Blocks className="text-slate-400" size={32} /> :
               <Star className="text-slate-400" size={32} />}
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-800 mb-2">{t("empty.title")}</h3>
            <p className="text-slate-500 ghl-empty-state-text">
              {activeTab === 'Podcasts'
                ? t("empty.podcasts")
                : t("empty.default")}
            </p>
          </div>
          {[...resources]
            .sort((a, b) => {
              if (activeSort === 'Popular') return b.metric - a.metric;
              if (activeSort === 'Recent') return b.timestamp - a.timestamp;
              if (activeSort === 'Oldest') return a.timestamp - b.timestamp;
              return a.id - b.id; // Relevance fallback
            })
            .map((resource) => {
            const isVisible = activeTab === 'Featured' ? resource.featured : resource.category === activeTab;
            return (
            <div 
              key={resource.id} 
              data-category={resource.category}
              data-featured={resource.featured ? 'true' : 'false'}
              data-metric={resource.metric}
              data-timestamp={resource.timestamp}
              data-id={resource.id}
              data-dynamic-webinar={resource.isDynamicWebinar ? 'true' : 'false'}
              className={`ghl-resource-card relative overflow-hidden rounded-2xl aspect-square group shadow-sm hover:shadow-md transition-shadow ${isVisible ? 'block' : 'hidden'}`}
            >
              <img 
                src={resource.image} 
                alt={resource.type} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 ${resource.bgClass} mix-blend-multiply`}></div>
              <div className={`absolute inset-0 bg-gradient-to-t ${resource.colorClass}`}></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-brand-secondary text-[11px] font-bold uppercase tracking-widest block">
                      {resource.type}
                    </span>
                    {resource.dateDesc && (
                      <span className="text-brand-secondary text-[11px] font-bold tracking-wide">
                        {resource.dateDesc}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white text-xl font-display font-bold leading-tight mt-1">
                    {resource.title}
                  </h3>
                  <EnglishContentBadge className="mt-2" />
                  {resource.description && (
                    <div className="mt-3 relative z-30">
                      <div className="flex items-start gap-2">
                        <p id={`ghl-desc-${resource.id}`} className={`text-white/90 text-sm leading-relaxed font-medium flex-1 transition-all duration-300 ${expandedDesc.includes(resource.id) ? '' : 'line-clamp-2'}`}>
                          {resource.description}
                        </p>
                        {resource.description.length > 50 && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleDesc(resource.id); }}
                            data-target={`ghl-desc-${resource.id}`}
                            aria-label="Toggle description"
                            aria-expanded={expandedDesc.includes(resource.id)}
                            className="ghl-desc-toggle shrink-0 mt-0.5 text-white/70 hover:text-white transition-colors cursor-pointer flex items-center justify-center p-0.5"
                          >
                            <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-300 ${expandedDesc.includes(resource.id) ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-end mt-4 relative z-20">
                  {resource.link?.endsWith('.mp4') ? (
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoState({ isOpen: true, url: resource.link! }); }}
                      data-video-url={resource.link}
                      className="ghl-video-trigger bg-brand-secondary hover:bg-[#a6d600] text-brand-dark px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-sm flex items-center"
                    >
                      {actionLabel(resource.action)}
                    </button>
                  ) : resource.link ? (
                    <a 
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-secondary hover:bg-[#a6d600] text-brand-dark px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-sm flex items-center"
                    >
                      {actionLabel(resource.action)}
                    </a>
                  ) : (
                    <span className="bg-brand-secondary/90 text-brand-dark px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-widest flex items-center shadow-sm">
                      {actionLabel(resource.action)}
                    </span>
                  )}
                  {resource.metric > 0 && (
                    <span className="text-brand-secondary text-[14px] font-bold tracking-wider flex items-center gap-1.5 drop-shadow">
                      {resource.action === 'Download' && <Download size={16} strokeWidth={2.5} />}
                      {resource.action === 'Get it Now' && <ArrowRight size={16} strokeWidth={2.5} />}
                      {resource.action === 'Watch Video' && <Play size={16} strokeWidth={2.5} />}
                      {resource.action === 'Listen Now' && <Headphones size={16} strokeWidth={2.5} />}
                      {resource.action === 'Learn More..' && <ArrowRight size={16} strokeWidth={2.5} />}
                      {resource.metric >= 1000 ? (resource.metric / 1000).toFixed(1) + 'k' : resource.metric}
                    </span>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
        
        {/* Social Follow Section */}
        <div className="mt-20 pt-10 border-t border-slate-200">
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-display font-bold text-brand-dark mb-5">{t("social.title")}</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/lovepathways"
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-center w-12 h-12 bg-slate-50 text-slate-400 hover:text-[#1877F2] hover:bg-slate-100 rounded-full transition-all duration-300 shadow-sm hover:shadow"
              >
                <Facebook size={22} className="transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://www.instagram.com/lovepathwayswraparound/"
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-center w-12 h-12 bg-slate-50 text-slate-400 hover:text-[#E4405F] hover:bg-slate-100 rounded-full transition-all duration-300 shadow-sm hover:shadow"
              >
                <Instagram size={22} className="transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* React Preview Modal */}
    {videoState.isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6" onClick={() => setVideoState({isOpen: false, url: ''})}>
        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20" onClick={e => e.stopPropagation()}>
          <button onClick={() => setVideoState({isOpen: false, url: ''})} aria-label="Close video" className="absolute top-4 right-4 z-[110] bg-black/50 hover:bg-white text-white hover:text-black rounded-full p-2 transition-all cursor-pointer">
            <X size={24} aria-hidden="true" />
          </button>
          <video controls autoPlay className="w-full h-full object-contain bg-black pointer-events-auto" src={videoState.url}></video>
        </div>
      </div>
    )}
    </>
  );
}
