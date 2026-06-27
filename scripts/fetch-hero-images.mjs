// Build-time: downloads free-license (Unsplash License) WARM photos for Love
// Pathways and processes them with sharp into public/page-hero/. Distinct from
// the LEAF set. Presenter/team photos are NOT touched (they live on the CDN /
// presenter-*.webp). Run: node scripts/fetch-hero-images.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "..", "public", "page-hero");
fs.mkdirSync(outDir, { recursive: true });

// Source pool — all "Free to use under the Unsplash License" (no attribution req).
const SRC = {
  goldenFamily: "https://images.unsplash.com/photo-1756982477754-2c05a288f4db?q=85&w=2400&fm=jpg", // family golden hour
  fatherBabyHands: "https://images.unsplash.com/photo-1758513359602-5a066bee5c3d?q=85&w=2400&fm=jpg", // father + baby holding hands
  fatherDaughterRead: "https://images.unsplash.com/photo-1745556376741-0633dae55f7a?q=85&w=2400&fm=jpg", // reading together
  motherChildHands: "https://unsplash.com/photos/TwWlariJ-Dw/download?force=true", // mother + child hands
  groupIndoors: "https://unsplash.com/photos/UjRVfjWJQns/download?force=true", // diverse group gathered, joyful
  familyOutdoors: "https://unsplash.com/photos/Hh4Boy-k5rg/download?force=true", // family with two kids, sunset
  motherSonCouch: "https://unsplash.com/photos/bQz9R-K_Q40/download?force=true", // mother + son reading on couch
};

const IMAGES = [
  { out: "hero-community.webp",   w: 1920, h: 900,  src: SRC.groupIndoors },
  { out: "hero-landscape.webp",   w: 1920, h: 900,  src: SRC.familyOutdoors },
  { out: "hero-support.webp",     w: 1920, h: 900,  src: SRC.fatherBabyHands },
  { out: "values-sunset.webp",    w: 1920, h: 1100, src: SRC.goldenFamily },
  { out: "mission-hands.webp",    w: 1000, h: 640,  src: SRC.motherChildHands },
  { out: "vision-belonging.webp", w: 1000, h: 640,  src: SRC.familyOutdoors },
  { out: "collage-main.webp",     w: 820,  h: 1040, src: SRC.motherSonCouch },
  { out: "collage-community.webp",w: 760,  h: 760,  src: SRC.groupIndoors },
  { out: "collage-support.webp",  w: 760,  h: 760,  src: SRC.fatherBabyHands },
  { out: "program-approach.webp", w: 1000, h: 760,  src: SRC.fatherDaughterRead },
  { out: "phase-photo-1.webp",    w: 1200, h: 1500, src: SRC.fatherBabyHands },
  { out: "phase-photo-2.webp",    w: 1200, h: 1500, src: SRC.fatherDaughterRead },
  { out: "phase-photo-3.webp",    w: 1200, h: 1500, src: SRC.motherSonCouch },
  { out: "phase-photo-4.webp",    w: 1200, h: 1500, src: SRC.familyOutdoors },
  { out: "event-school.webp",     w: 1600, h: 1000, src: SRC.fatherDaughterRead },
  { out: "event-calm.webp",       w: 1600, h: 1000, src: SRC.goldenFamily },
  { out: "event-connection.webp", w: 1600, h: 1000, src: SRC.motherChildHands },
  { out: "event-family.webp",     w: 1600, h: 1000, src: SRC.goldenFamily },
];

const tmp = path.join(os.tmpdir(), "lp-img-src.jpg");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ok = 0;
for (const img of IMAGES) {
  const outPath = path.join(outDir, img.out);
  if (fs.existsSync(outPath)) { ok++; console.log("skip " + img.out); continue; }
  let done = false;
  for (let attempt = 1; attempt <= 4 && !done; attempt++) {
    try {
      execSync(`curl -sL --retry 3 --retry-delay 2 -A "Mozilla/5.0" "${img.src}" -o "${tmp}"`, { stdio: "ignore" });
      await sharp(tmp).resize(img.w, img.h, { fit: "cover", position: "entropy" }).webp({ quality: 80 }).toFile(outPath);
      done = true; ok++; console.log("OK  " + img.out);
    } catch (e) {
      console.log(`retry ${attempt}/4 ${img.out}`);
      await sleep(3000);
    }
  }
  if (!done) console.log("ERR " + img.out);
  await sleep(1500); // gap to avoid rate-limiting
}
console.log(`\nDone: ${ok}/${IMAGES.length} images written to ${outDir}`);
