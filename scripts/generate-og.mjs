// Generates public/og-default.jpg (1200x630) = the real white LEAF logo centered
// on the brand navy, with a lime accent bar. Run: node scripts/generate-og.mjs
// Re-run if the logo or brand changes. Uses the EXACT logo vector (no fonts).
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const W = 1200, H = 630;
const whiteLogo = readFileSync("public/leaf-logo-white.svg");
const b64 = whiteLogo.toString("base64");

const logoW = 820;
const logoH = Math.round((logoW * 174) / 911.5); // preserve the cropped aspect
const lx = Math.round((W - logoW) / 2);
const ly = Math.round((H - logoH) / 2) - 8;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#192847"/>
  <circle cx="${W - 120}" cy="120" r="280" fill="#657ef6" opacity="0.10"/>
  <circle cx="120" cy="${H - 80}" r="220" fill="#657ef6" opacity="0.08"/>
  <rect x="0" y="${H - 12}" width="${W}" height="12" fill="#add400"/>
  <image x="${lx}" y="${ly}" width="${logoW}" height="${logoH}" xlink:href="data:image/svg+xml;base64,${b64}"/>
</svg>`;

writeFileSync("scripts/.og-source.svg", svg);
const out = "public/og-default.jpg";
const info = await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(out);
console.log(`[og] wrote ${out} ${info.width}x${info.height}`);
