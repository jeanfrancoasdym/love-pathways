import { Head } from "vite-react-ssg";
import { useTranslation } from "react-i18next";
import { siteOrigin } from "../data/site";
import { useLocale } from "../i18n/useLocale";

type SeoProps = {
  /** Key in the `seo` namespace, e.g. "home" → seo.home.title / seo.home.description. */
  pageKey: string;
  /** Canonical app path WITHOUT locale prefix, e.g. "/about-us" or "/". */
  path: string;
  /** Open Graph image. Absolute URL or root-relative path (e.g. "/page-hero/foo.webp"). Falls back to page-specific default. */
  image?: string;
  /** og:type - "website" (default) or "article". */
  type?: string;
  /** One or more JSON-LD nodes/graphs for this page. */
  jsonLd?: object | object[];
  /** Discourage indexing (e.g. thank-you / 404 pages). */
  noindex?: boolean;
};

// Per-page branded OG images — used when no explicit `image` prop is passed.
const PAGE_OG_IMAGES: Record<string, string> = {
  about:       "/page-hero/mission-hands.webp",
  ourTeam:     "/page-hero/hero-community.webp",
  program:     "/page-hero/program-approach.webp",
  impact:      "/page-hero/collage-main.webp",
  events:      "/page-hero/event-family.webp",
  contact:     "/page-hero/hero-support.webp",
  career:      "/page-hero/hero-community.webp",
  blog:        "/page-hero/hero-landscape.webp",
  resourceHub: "/page-hero/values-sunset.webp",
  donate:      "/page-hero/hero-support.webp",
  faq:         "/page-hero/hero-support.webp",
  webinar1:    "/page-hero/event-connection.webp",
  webinar2:    "/page-hero/event-calm.webp",
};

// Per-page document head: title, description, canonical, reciprocal hreflang
// (en / es / x-default), Open Graph, <html lang>, and JSON-LD.
// Copy comes from the centralized `seo` namespace; rendered into the prerendered
// HTML so crawlers and LLMs read it at first byte.
export default function Seo({ pageKey, path, image, type = "website", jsonLd, noindex }: SeoProps) {
  const { t } = useTranslation("seo");
  const { lng } = useLocale();
  const title = t(`${pageKey}.title`);
  const description = t(`${pageKey}.description`);
  const enUrl = path === "/" ? `${siteOrigin}/` : `${siteOrigin}${path}`;
  const esUrl = path === "/" ? `${siteOrigin}/es` : `${siteOrigin}/es${path}`;
  const canonical = lng === "es" ? esUrl : enUrl;
  const rawImage = image ?? PAGE_OG_IMAGES[pageKey] ?? "/og-default.jpg";
  const ogImage = rawImage.startsWith("/") ? `${siteOrigin}${rawImage}` : rawImage;
  const nodes = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Head>
      <html lang={lng} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="es" href={esUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lng === "es" ? "es_US" : "en_US"} />
      <meta property="og:site_name" content="Love Pathways Wraparound" />
      {nodes.map((node, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(node)}</script>
      ))}
    </Head>
  );
}
