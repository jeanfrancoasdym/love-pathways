// Build-time only. Downloads free-license (Unsplash) atmospheric photos and
// processes them with sharp into public/page-hero/. The brand tint + overlay is
// applied in CSS by <PageHero> / <ParallaxSection>; here we only fetch, crop, compress.
// A small cohesive set is reused across thematically-similar pages.
//   node scripts/fetch-hero-images.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "..", "public", "page-hero");
fs.mkdirSync(outDir, { recursive: true });

// All verified "Free to use under the Unsplash License" (no attribution required).
const IMAGES = [
  {
    out: "hero-landscape.webp", w: 1920, h: 900,
    url: "https://images.unsplash.com/photo-1746937807433-05748b80caf4?q=85&w=2400&fm=jpg",
    credit: "Zetong Li (@zetong) — golden California hills, Milpitas CA",
  },
  {
    out: "hero-community.webp", w: 1920, h: 900,
    url: "https://images.unsplash.com/photo-1721059050927-dfad8ff13e07?q=85&w=2400&fm=jpg",
    credit: "Hannah Busing (@hannahbusing) — group embrace, support/community",
  },
  {
    out: "hero-support.webp", w: 1920, h: 900,
    url: "https://images.unsplash.com/photo-1767855699697-e217bd4cc925?q=85&w=2400&fm=jpg",
    credit: "Fethi Benattallah (@fethibenattallah) — two hands reaching, support/hope",
  },
  {
    out: "values-sunset.webp", w: 1920, h: 1300,
    url: "https://images.unsplash.com/photo-1728465757974-b727c4cb8b7c?q=85&w=2400&fm=jpg",
    credit: "Lights Space (@lightspace) — mother and child holding hands at sunset (About Core Values bg)",
  },
  {
    out: "mission-hands.webp", w: 900, h: 560,
    url: "https://images.unsplash.com/photo-1439920120577-eb3a83c16dd7?q=85&w=1400&fm=jpg",
    credit: "Liane Metzler (@liane) — parent and child hands held together, warm and faceless, support and guidance (About Mission card: support for parents and children)",
  },
  {
    out: "vision-belonging.webp", w: 900, h: 560,
    url: "https://images.unsplash.com/photo-1606503993966-e6dbe4b386fa?q=85&w=1400&fm=jpg",
    credit: "Rajesh Rajput (@rrajputphotography) — silhouettes of people raising their hands at sunset, hope and belonging (About Vision card: connection, belonging, opportunity)",
  },
  {
    out: "collage-main.webp", w: 820, h: 1040,
    url: "https://images.unsplash.com/photo-1758962036832-435aa3194465?q=85&w=1400&fm=jpg",
    credit: "Emma (@pictures102) — adult holding a child's hand on a path (Impact collage)",
  },
  {
    out: "collage-community.webp", w: 760, h: 760,
    url: "https://images.unsplash.com/photo-1606503993966-e6dbe4b386fa?q=85&w=1200&fm=jpg",
    credit: "Rajesh Rajput (@rrajputphotography) — people raising hands at sunset, belonging/community (Impact collage)",
  },
  {
    out: "collage-support.webp", w: 760, h: 760,
    url: "https://images.unsplash.com/photo-1724445321972-51464a6c6e01?q=85&w=1200&fm=jpg",
    credit: "Seljan Salimova (@seljansalim) — two people reaching toward each other, support/connection (Impact collage)",
  },
  {
    out: "program-approach.webp", w: 1000, h: 1250,
    url: "https://images.unsplash.com/photo-1767855699697-e217bd4cc925?q=85&w=1600&fm=jpg",
    credit: "Fethi Benattallah (@fethibenattallah) — two hands reaching (Program 'what is wraparound')",
  },
  // ---- Events card backgrounds (theme-matched by keyword; see Events.tsx) ----
  {
    out: "event-school.webp", w: 900, h: 650,
    url: "https://images.unsplash.com/photo-1763098844157-d0fffcc966a1?q=85&w=1400&fm=jpg",
    credit: "Jun Ren (@renjunn) — sunlight in an empty classroom (Events: school/classroom theme)",
  },
  {
    out: "event-family.webp", w: 900, h: 650,
    url: "https://images.unsplash.com/photo-1499441447888-c65ee875055e?q=85&w=1400&fm=jpg",
    credit: "S&B Vonlanthen (@blavon) — adult and child walking a path at sunset (Events: adoptive/foster/family theme + default)",
  },
  {
    out: "event-connection.webp", w: 900, h: 650,
    url: "https://images.unsplash.com/photo-1724445321972-51464a6c6e01?q=85&w=1400&fm=jpg",
    credit: "Seljan Salimova (@seljansalim) — two hands reaching toward each other at golden hour (Events: anger/attachment/connection theme)",
  },
  {
    out: "event-calm.webp", w: 900, h: 650,
    url: "https://images.unsplash.com/photo-1778097105585-7bfb12bafd97?q=85&w=1400&fm=jpg",
    credit: "Helena Lopes (@helenalopesph) — child contemplating by a window (Events: defiance/meltdown/calm theme)",
  },
  // ---- Program: the four wraparound phases (photo behind a brand-color overlay) ----
  {
    out: "phase-photo-1.webp", w: 1600, h: 1000,
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=85&w=2000&fm=jpg",
    credit: "Vonecia Carswell (@vonecia) — diverse group of adults in warm conversation, community/engagement (Phase 01 Engagement)",
  },
  {
    out: "phase-photo-2.webp", w: 1600, h: 1000,
    url: "https://images.unsplash.com/photo-1758876022295-00ec1f0e39f4?q=85&w=2000&fm=jpg",
    credit: "Vitaly Gariev (@vitalygariev) — planning together with sticky notes (Phase 02 Plan Development)",
  },
  {
    out: "phase-photo-3.webp", w: 1600, h: 1000,
    url: "https://images.unsplash.com/photo-1561346745-5db62ae43861?q=85&w=2000&fm=jpg",
    credit: "NEXT Academy (@next_academy) — a mentor guiding and supporting (Phase 03 Implementation)",
  },
  {
    out: "phase-photo-4.webp", w: 1600, h: 1000,
    url: "https://images.unsplash.com/photo-1759433169410-b904d63514e0?q=85&w=2000&fm=jpg",
    credit: "Tim Mossholder (@timmossholder) — open road toward sunlit hills at sunrise (Phase 04 Transition)",
  },
];

const credits = [];
for (const img of IMAGES) {
  const res = await fetch(img.url);
  if (!res.ok) throw new Error(`download failed ${res.status} for ${img.out}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const outPath = path.join(outDir, img.out);
  await sharp(buf).resize(img.w, img.h, { fit: "cover" }).webp({ quality: 78 }).toFile(outPath);
  console.log(`[hero] wrote ${img.out} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
  credits.push(`- ${img.out}: ${img.credit} — Free to use under the Unsplash License`);
}
fs.writeFileSync(
  path.join(outDir, "CREDITS.md"),
  `# Page hero image credits\n\nAll images are free to use under the Unsplash License (no attribution required; credited as courtesy).\n\n${credits.join("\n")}\n`,
  "utf8"
);
console.log(`[hero] done — ${IMAGES.length} images + CREDITS.md`);
