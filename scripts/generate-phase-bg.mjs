// Build-time only. Generates 4 on-brand "mesh gradient" background textures (one per
// wraparound phase) into public/phase-bg/. No photos, no licensing — pure brand color.
// The soft radial blobs give the scroll-linked blur something to act on. Run:
//   node scripts/generate-phase-bg.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "..", "public", "phase-bg");
fs.mkdirSync(outDir, { recursive: true });

const W = 1700;
const H = 1240;

// Per phase: base diagonal gradient + two soft radial blobs. Colors arc dark->light
// across the 4 phases (periwinkle -> navy -> action -> lime) per the design spec.
const PHASES = [
  {
    file: "phase-1.webp", // Engagement — periwinkle (trust / listening)
    base: ["#6b80f7", "#1d2e57"],
    blobs: [
      { cx: 0.82, cy: 0.18, r: 0.62, color: "#9aabff", op: 0.65 },
      { cx: 0.12, cy: 0.9, r: 0.55, color: "#13203e", op: 0.7 },
    ],
  },
  {
    file: "phase-2.webp", // Plan Development — navy (structure / depth)
    base: ["#27396a", "#0d1730"],
    blobs: [
      { cx: 0.16, cy: 0.2, r: 0.6, color: "#3d59ad", op: 0.6 },
      { cx: 0.88, cy: 0.88, r: 0.55, color: "#080f22", op: 0.7 },
    ],
  },
  {
    file: "phase-3.webp", // Implementation — periwinkle -> lime (action / energy)
    base: ["#5d72ef", "#7e9f3e"],
    blobs: [
      { cx: 0.85, cy: 0.82, r: 0.62, color: "#abce50", op: 0.62 },
      { cx: 0.14, cy: 0.16, r: 0.55, color: "#5566e6", op: 0.62 },
    ],
  },
  {
    file: "phase-4.webp", // Transition — lime (growth / independence / bright close)
    base: ["#bcde3f", "#8fb030"],
    blobs: [
      { cx: 0.8, cy: 0.16, r: 0.6, color: "#dbf463", op: 0.6 },
      { cx: 0.15, cy: 0.9, r: 0.55, color: "#74962a", op: 0.6 },
    ],
  },
];

function svgFor(p) {
  const blobDefs = p.blobs
    .map(
      (b, i) => `
      <radialGradient id="b${i}" cx="${(b.cx * 100).toFixed(1)}%" cy="${(b.cy * 100).toFixed(1)}%" r="${(b.r * 100).toFixed(1)}%">
        <stop offset="0%" stop-color="${b.color}" stop-opacity="${b.op}"/>
        <stop offset="100%" stop-color="${b.color}" stop-opacity="0"/>
      </radialGradient>`
    )
    .join("");
  const blobRects = p.blobs
    .map((_, i) => `<rect width="${W}" height="${H}" fill="url(#b${i})"/>`)
    .join("");
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="base" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.base[0]}"/>
        <stop offset="100%" stop-color="${p.base[1]}"/>
      </linearGradient>${blobDefs}
    </defs>
    <rect width="${W}" height="${H}" fill="url(#base)"/>
    ${blobRects}
  </svg>`;
}

let count = 0;
for (const p of PHASES) {
  const svg = svgFor(p);
  const out = path.join(outDir, p.file);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(out);
  count++;
  const kb = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`[phase-bg] wrote ${p.file} (${kb} KB)`);
}
console.log(`[phase-bg] done — ${count} backgrounds in public/phase-bg/`);
