// Canonical site data - single source of truth for contact info, socials,
// GHL form integrations, image URLs, counties, and live data feeds.
// Moved out of individual components (which had these hardcoded + duplicated).
// Translatable copy does NOT live here - it lives in public/locales/{en,es}/*.json.

export const contact = {
  phone: "(707) 460-6070",
  phoneHref: "tel:+17074606070",
  email: "contact@leafwraparound.com",
  emailHref: "mailto:contact@leafwraparound.com",
  addressLine1: "2151 River Plaza Dr. 225",
  addressLine2: "Sacramento, CA 95833",
  addressFull: "2151 River Plaza Dr. 225, Sacramento, CA 95833",
  hours: "Mon-Fri, 9am - 5pm PST",
};

export const socials = {
  facebook: "https://www.facebook.com/leafwraparound/",
  instagram: "https://www.instagram.com/leafwraparound/",
  bryanFacebook: "https://www.facebook.com/BryanPost32",
  bryanInstagram: "https://www.instagram.com/bryanpostofficial/",
};

export const parentOrg = {
  name: "Parents in Training Inc.",
  url: "https://parentsintraining.org",
  ein: "68-0340537",
  foundingDate: "1994", // Incorporated in Delaware 09/09/1994
  nonprofitStatus: "Nonprofit501c3",
  mailingAddress: "PO BOX 6358, Eureka, CA 95502-6358",
  // Verified nonprofit profiles (the entity stack) - these belong to PIT.
  sameAs: [
    "https://www.charitynavigator.org/ein/680340537",
    "https://www.guidestar.org/profile/68-0340537",
  ],
};

// Production origin - used for absolute canonical/hreflang/sitemap URLs (W8).
// Adjust if the deployed domain differs.
export const siteOrigin = "https://leafwraparound.com";

// ---- GHL form integrations -------------------------------------------------
// All forms live on go.leafwraparound.com EXCEPT donate (placeholder, api.leadconnectorhq.com).
export const ghl = {
  embedScript: "https://go.leafwraparound.com/js/form_embed.js",
  formBase: "https://go.leafwraparound.com/widget/form",
  contactFormId: "56qNv2dotSdrRoscMYP4",
  newsletterFormId: "8asB4SU6ZWg9kAVQASrY",
  webinar1FormId: "KpYpqHrTdIwGu1IuX5BS",
  webinar2FormIdEn: "PCVevdi3AxldwVCJxYvp",
  webinar2FormIdEs: "18WsqETDZtWuRdwMNGwv",
  careerFormId: "ynD7ZloTY5w1Yzq4CVFr", // "CV upload leaf website"
  // Donate is still a placeholder until a real form id is provided.
  donateEmbedScript: "https://api.leadconnectorhq.com/js/form_embed.js",
  donateFormBase: "https://api.leadconnectorhq.com/widget/form",
  donateFormId: "placeholder_donate",
};

// ---- Images ----------------------------------------------------------------
// Real assets on the LEAF CDN (KEEP - must survive). picsum.photos placeholders
// are NOT listed here; they get replaced with real/Unsplash images in W9.
const CDN = "https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media";

export const images = {
  // People (KEEP)
  bryanPortrait: `${CDN}/69d53dba3d829c73b2ab1fa4.webp`,
  jeanette: `${CDN}/6a0b6235dbe569a25de76ee0.png`,
  marissa: `${CDN}/69f38abb45cd849493278cb9.jpg`,
  shing: `${CDN}/69f395694ad535b652ef5318.jpeg`,
  mikalah: `${CDN}/69f3af3d0549a7387e2c4c4f.webp`,
  // Backgrounds / scenes (KEEP)
  teamHero: `${CDN}/69e94b1c5df4011c24000137.jpg`,
  careerTeam: `${CDN}/69d53fd9a7dcb4cff01a093e.webp`,
  careerAdmin: `${CDN}/69ef98138acd760bf8d06ff7.jpeg`,
  homeHero: `${CDN}/69e947bda48992f689b7b3a6.webp`,
  homeWraparound: `${CDN}/69d6c8ce3d829c73b2f0532e.webp`,
  homeFinalCta: `${CDN}/69e947e89ff45b49cc9655da.webp`,
};

// Branded gradient placeholder (data URI) for CMS items (blog posts, events,
// resources) whose sheet row has no image - replaces random picsum fallbacks.
export const brandPlaceholderImg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23657ef6'/%3E%3Cstop offset='1' stop-color='%23192847'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Ccircle cx='640' cy='120' r='220' fill='%23ffffff' opacity='0.05'/%3E%3C/svg%3E";

// ---- Service area ----------------------------------------------------------
export const counties = [
  "Del Norte", "Napa", "Trinity", "Sacramento", "Merced",
  "Mendocino", "Shasta", "Glenn", "Tehama", "Sutter",
  "Placer", "San Joaquin", "Solano", "Sonoma", "Butte",
  "Yuba", "El Dorado", "Yolo", "Stanislaus", "Calaveras",
];

// ---- Organization entity (for JSON-LD structured data / SEO / AEO·GEO·LLMO) -
// Some fields are placeholders the team must confirm - marked TODO.
export const org = {
  name: "LEAF Wraparound",
  legalName: "LEAF WRAPAROUND LLC",
  url: siteOrigin,
  logo: "", // TODO: real LEAF logo asset URL (also used for favicon)
  founder: "Bryan Post",
  serviceType: "Adoption wraparound services",
  knowsAbout: [
    "Adoption support",
    "Trauma-responsive care",
    "Wraparound services",
    "Family preservation",
    "Attachment-based parenting",
    "Adoption Assistance Program (AAP)",
  ],
  // LEAF's own profiles. The nonprofit identity (EIN, 501c3, Charity Navigator,
  // see parentOrg).
  // GuideStar, founding date) lives on the parent org, Parents in Training Inc.
  sameAs: [socials.facebook, socials.instagram],
};

// ---- Live data feeds (Google Sheets published as CSV) ----------------------
// Confirmed active by the client. Consumed via src/lib/csv.ts.
export const feeds = {
  events:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPjdgkSVVvQWF66t9OBGFJfE4K12FuuNSwpNm0Zbk6QHroHov80GgM8IRaUCENejplWvfWnjGWXihF/pub?gid=0&single=true&output=csv",
  blog:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT201GBlS67wK8HLDhc6VchvJfaorTnU1RbG7RZDu9gNlJbNZJ87bMsjHPgv2zyabnbPnER-muEMNR7/pub?gid=0&single=true&output=csv",
  resources:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlK6Dmjqhk5mQ1akDMSd6FZQozjWmqjqGuavp3LRs15Oj9w8_iIq80qm5kUPATMdduMF7hfVJLMrdp/pub?gid=0&single=true&output=csv",
};
