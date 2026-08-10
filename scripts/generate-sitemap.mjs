// Generates dist/sitemap.xml with bilingual (EN/ES) hreflang alternates.
// Runs automatically after `vite-react-ssg build` via the npm "postbuild" hook.
// Keep ORIGIN + PATHS in sync with src/data/site.ts (siteOrigin) and src/App.tsx (routes).
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ORIGIN = "https://lovepathways.org";

// Blog article routes come from the generated index - regex-read the slugs so
// this build script stays dependency-free (no TS import machinery needed).
const blogIndexSrc = readFileSync(resolve(process.cwd(), "src", "data", "blogIndex.ts"), "utf8");
const BLOG_SLUGS = [...blogIndexSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

// Indexable routes only. Thank-you pages and 404 are intentionally excluded
// (they render <Seo noindex>), as is the "*" catch-all.
// priority + changefreq per path. /privacy-policy excluded (crawl budget).
const PAGES = [
  { path: "/",                      priority: "1.0", changefreq: "monthly"   },
  { path: "/our-program",           priority: "0.9", changefreq: "monthly"   },
  { path: "/about-us",              priority: "0.8", changefreq: "monthly"   },
  { path: "/contact-us",            priority: "0.8", changefreq: "monthly"   },
  { path: "/faq",                   priority: "0.8", changefreq: "monthly"   },
  { path: "/events",                priority: "0.8", changefreq: "weekly"    },
  { path: "/impact",                priority: "0.7", changefreq: "monthly"   },
  { path: "/our-team",              priority: "0.7", changefreq: "monthly"   },
  { path: "/webinar-event1",        priority: "0.7", changefreq: "monthly"   },
  { path: "/webinar-event2",        priority: "0.7", changefreq: "monthly"   },
  { path: "/webinar-event3",        priority: "0.7", changefreq: "monthly"   },
  { path: "/workshop-registration", priority: "0.7", changefreq: "weekly"    },
  { path: "/blog",                  priority: "0.6", changefreq: "weekly"    },
  { path: "/career",                priority: "0.6", changefreq: "monthly"   },
  { path: "/donate",                priority: "0.6", changefreq: "monthly"   },
  { path: "/resource-hub",          priority: "0.6", changefreq: "monthly"   },
  ...BLOG_SLUGS.map((slug) => ({ path: `/blog/${slug}`, priority: "0.5", changefreq: "yearly" })),
];
const PATHS = PAGES.map((p) => p.path);
const TODAY = new Date().toISOString().slice(0, 10);

const enUrl = (p) => (p === "/" ? `${ORIGIN}/` : `${ORIGIN}${p}`);
const esUrl = (p) => (p === "/" ? `${ORIGIN}/es` : `${ORIGIN}/es${p}`);

// Every URL lists all alternates (incl. itself) — correct reciprocal hreflang.
const alternates = (p) =>
  [
    `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl(p)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl(p)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl(p)}"/>`,
  ].join("\n");

const urlEntry = (loc, p) => {
  const meta = PAGES.find((pg) => pg.path === p);
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${meta?.changefreq ?? "monthly"}</changefreq>`,
    `    <priority>${meta?.priority ?? "0.5"}</priority>`,
    alternates(p),
    "  </url>",
  ].join("\n");
};

const urls = [];
for (const p of PATHS) {
  urls.push(urlEntry(enUrl(p), p));
  urls.push(urlEntry(esUrl(p), p));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

writeFileSync(resolve(process.cwd(), "dist", "sitemap.xml"), xml, "utf8");
console.log(`[sitemap] wrote ${PATHS.length * 2} urls -> dist/sitemap.xml`);
