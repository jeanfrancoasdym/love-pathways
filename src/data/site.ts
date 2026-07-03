// Canonical site data - single source of truth for contact info, socials,
// GHL form integrations, image URLs, counties, and live data feeds.
// LOVE PATHWAYS edition (cloned from the LEAF template, re-skinned for LP).
// Translatable copy does NOT live here - it lives in src/i18n/locales/{en,es}/*.json.

export const contact = {
  phone: "(707) 460-6070",
  phoneHref: "tel:+17074606070",
  email: "contact@lovepathways.org",
  emailHref: "mailto:contact@lovepathways.org",
  addressLine1: "2151 River Plaza Dr. 225",
  addressLine2: "Sacramento, CA 95833",
  addressFull: "2151 River Plaza Dr. 225, Sacramento, CA 95833",
  hours: "Mon-Fri, 9am - 5pm PST",
};

export const socials = {
  facebook: "https://www.facebook.com/lovepathways/",
  instagram: "https://www.instagram.com/lovepathwayswraparound/",
  // Bryan Post is a shared presenter across LEAF + LP.
  bryanFacebook: "https://www.facebook.com/BryanPost32",
  bryanInstagram: "https://www.instagram.com/bryanpostofficial/",
};

// Love Pathways is a program of Revive Behavioral Healthcare (per the LP source).
// TODO(confirm): exact Revive URL (revivebhc.org vs revibhc.org), EIN, founding
// date, mailing address, and nonprofit/charity profiles. Left blank until confirmed
// so we don't publish wrong legal/structured-data values.
export const parentOrg = {
  name: "Revive Behavioral Healthcare",
  url: "https://revivebhc.org",
  ein: "", // TODO confirm
  foundingDate: "", // TODO confirm
  nonprofitStatus: "Nonprofit501c3",
  mailingAddress: "", // TODO confirm
  sameAs: [], // TODO confirm Revive's verified nonprofit profiles
};

// Production origin - used for absolute canonical/hreflang/sitemap URLs.
export const siteOrigin = "https://lovepathways.org";

// ---- GHL form integrations -------------------------------------------------
// GHL form integrations — IDs taken verbatim from the LP source code.
// Webinars + contact are served from go.leafwraparound.com; the newsletter is
// served from Revive's GHL domain go.revivebhc.org (as in the LP source).
export const ghl = {
  embedScript: "https://go.leafwraparound.com/js/form_embed.js",
  formBase: "https://go.leafwraparound.com/widget/form",
  contactFormId: "yXT3uwETc1ISIRP2WEbV", // "New Lead Application - English"
  webinar1FormId: "O0bEq8momPzSnmzXNebR", // Event 1: When Love Doesn't Feel Like Enough (Jul 14)
  webinar2FormIdEn: "XOoAL6XIN4dOOuq3VuO8", // Event 2: Substance Use & the Teen Trauma Brain (Bryan)
  webinar2FormIdEs: "XOoAL6XIN4dOOuq3VuO8",
  // Newsletter lives on Revive's GHL domain in the LP source.
  newsletterEmbedScript: "https://go.revivebhc.org/js/form_embed.js",
  newsletterFormBase: "https://go.revivebhc.org/widget/form",
  newsletterFormId: "8asB4SU6ZWg9kAVQASrY",
  careerFormId: "TODO_LP_CAREER_FORM_ID", // LP source uses a plain (non-GHL) career form
  // Donate is still a placeholder until a real form id is provided.
  donateEmbedScript: "https://api.leadconnectorhq.com/js/form_embed.js",
  donateFormBase: "https://api.leadconnectorhq.com/widget/form",
  donateFormId: "placeholder_donate",
};

// ---- Images ----------------------------------------------------------------
// People photos live on the shared CDN workspace. Scene/hero images are LEAF
// leftovers and get replaced with warm LP-appropriate photos in F4.
const CDN = "https://assets.cdn.filesafe.space/jQg8LJhvILD2H4cnIhvZ/media";

export const images = {
  // People (KEEP)
  bryanPortrait: `${CDN}/69d53dba3d829c73b2ab1fa4.webp`,
  jeanette: `${CDN}/6a0b6235dbe569a25de76ee0.png`,
  alicia: `${CDN}/69a744b8618c8d5cb2996194.png`, // Dr. Alicia Williams (Exec. Director)
  marissa: `${CDN}/69f38abb45cd849493278cb9.jpg`,
  shing: `${CDN}/69f395694ad535b652ef5318.jpeg`,
  // Backgrounds / scenes — swapped for warm, distinct LP-appropriate photos
  // (free-license Unsplash, no attribution required). Made distinct from LEAF.
  teamHero: "/page-hero/home-hero-3.webp",
  careerTeam: "/page-hero/career-why.webp",
  careerAdmin: "/page-hero/career-admin.webp",
  homeHero: "/page-hero/home-hero-1.webp",
  homeWraparound: "/page-hero/home-wraparound.webp",
  homeFinalCta: "/page-hero/home-hero-2.webp",
};

// Branded gradient placeholder (data URI) for CMS items with no image.
// LP signature gradient: pink (#f7a4a5) -> light yellow (#ffe9b6).
export const brandPlaceholderImg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23f7a4a5'/%3E%3Cstop offset='1' stop-color='%23ffe9b6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Ccircle cx='640' cy='120' r='220' fill='%23ffffff' opacity='0.18'/%3E%3C/svg%3E";

// ---- Service area ----------------------------------------------------------
// Love Pathways' own county list (from the LP source).
export const counties = [
  "Merced", "Calaveras", "Contra Costa", "San Joaquin", "Stanislaus",
  "Alameda", "Santa Clara", "Madera", "Fresno", "Tulare",
];

// ---- Organization entity (for JSON-LD structured data / SEO / AEO·GEO·LLMO) -
export const org = {
  name: "Love Pathways Wraparound",
  legalName: "Love Pathways Wraparound", // TODO confirm legal entity name
  url: siteOrigin,
  logo: `${siteOrigin}/logo-schema.png`,
  image: `${siteOrigin}/page-hero/hero-landscape.webp`,
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
  // LP's own profiles. Nonprofit identity (EIN, 501c3) lives on the parent org,
  // Revive Behavioral Healthcare (see parentOrg).
  sameAs: [socials.facebook, socials.instagram],
};

// ---- Live data feeds (Google Sheets published as CSV) ----------------------
// Love Pathways' own published Google Sheets (from the LP source). Resources
// happens to use the same sheet as LEAF; events + blog are LP-specific.
export const feeds = {
  events:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlOoUgNufpCa7a-XJ_4ZU-TxdCCoGLUO5pKhrXjzl8TyPuo4MIedSshddjnDlNiOVjko_K4KYMatdM/pub?gid=0&single=true&output=csv",
  blog:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQo4zgGZgLfGZf19eLuYNSJtdbjtdx2JLFmHZ8ENjLrY6AusgHfoyVedBZZx9igP4T-TjoqgCl1cYRC/pub?gid=0&single=true&output=csv",
  resources:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlK6Dmjqhk5mQ1akDMSd6FZQozjWmqjqGuavp3LRs15Oj9w8_iIq80qm5kUPATMdduMF7hfVJLMrdp/pub?gid=0&single=true&output=csv",
};
