// Shared shapes for the native blog. Article METADATA (cards, related, SEO)
// lives in blogIndex.ts and ships with the main bundle; article CONTENT lives
// in src/data/posts/<slug>.ts and is loaded per-route via a router loader, so
// the 15 full articles (EN+ES) never bloat the shared JS chunk.

export type Localized = { en: string; es: string };

export type BlogCategory = "aap" | "birthParents" | "children" | "teenagers" | "wraparound";

// Short labels shown on cards/filters. Keys double as the stable value for the
// /blog?category= deep link (language-independent).
export const BLOG_CATEGORY_LABEL: Record<BlogCategory, Localized> = {
  aap: { en: "AAP", es: "AAP" },
  birthParents: { en: "Birth Parents", es: "Padres biológicos" },
  children: { en: "Children", es: "Niños" },
  teenagers: { en: "Teenagers", es: "Adolescentes" },
  wraparound: { en: "Wraparound", es: "Wraparound" },
};

// Long-form labels used in the article breadcrumb.
export const BLOG_CATEGORY_LABEL_LONG: Record<BlogCategory, Localized> = {
  aap: { en: "Adoption Assistance Program", es: "Programa de Asistencia a la Adopción" },
  birthParents: { en: "Birth Parents", es: "Padres biológicos" },
  children: { en: "Children", es: "Niños" },
  teenagers: { en: "Teenagers", es: "Adolescentes" },
  wraparound: { en: "Wraparound Services", es: "Servicios de wraparound" },
};

export type BlogPostMeta = {
  slug: string;
  category: BlogCategory;
  title: Localized;
  description: Localized;
  /** Card/cover photo - also the article's og:image and its Related-Articles card image. */
  image: string;
  imageAlt: Localized;
  publishedAt: string; // YYYY-MM-DD
  readTimeMinutes: number;
  /** Body content is EN-only (translation pending) - shows EnglishContentBadge on /es pages. */
  bodyNotTranslated?: boolean;
};

export type BlogSection = {
  id: string;
  heading: Localized;
  bodyHtml: Localized;
  /** Optional photo beside this section's text - used sparingly (1-2 per article).
   * Always pairs with the section's first 2-3 paragraphs at a JS-matched height:
   * the paragraphs dictate the image size, never the reverse. Paragraphs beyond
   * pairParagraphs render as plain full-width text right after. */
  sideImage?: { src: string; alt: Localized; side: "left" | "right"; pairParagraphs: 2 | 3 };
};

export type BlogPostContent = {
  sections: BlogSection[];
  /** Large mid-article quote (verbatim from the article), rendered after the second section. */
  pullQuote?: { text: Localized; attribution: Localized };
  /** Original reporting credit. No sourceUrl if the original link is dead - never link to a broken page. */
  sourceUrl?: string;
  sourceLabel?: string;
  /** Live page for the program/org discussed, when the original source link is dead. */
  currentUrl?: string;
  currentLabel?: string;
};
