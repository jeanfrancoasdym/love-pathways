// JSON-LD builders for Schema.org structured data: the #1 lever for AEO/GEO/LLMO.
// All nodes link to one Organization via @id; localized via inLanguage + locale URLs.
import { org, siteOrigin, contact, counties, parentOrg } from "../data/site";

export type Lng = "en" | "es";

const ORG_ID = `${siteOrigin}/#organization`;
const WEBSITE_ID = `${siteOrigin}/#website`;

export const localeUrl = (lng: Lng, path = "/") => {
  if (path === "/") return lng === "es" ? `${siteOrigin}/es` : `${siteOrigin}/`;
  return lng === "es" ? `${siteOrigin}/es${path}` : `${siteOrigin}${path}`;
};

// NGO / Organization: the core entity, referenced by @id everywhere.
export function organizationLd() {
  const node: Record<string, unknown> = {
    "@type": ["NGO", "Organization", "SocialService"],
    "@id": ORG_ID,
    name: org.name,
    legalName: org.legalName,
    url: siteOrigin,
    description:
      "Love-based, trauma-responsive wraparound services for adoptive families in California, at no out-of-pocket cost to AAP families.",
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLine1,
      addressLocality: "Sacramento",
      addressRegion: "CA",
      postalCode: "95833",
      addressCountry: "US",
    },
    areaServed: counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c} County, California` })),
    knowsAbout: org.knowsAbout,
    founder: { "@type": "Person", name: org.founder },
    parentOrganization: {
      "@type": ["NGO", "Organization"],
      name: parentOrg.name,
      url: parentOrg.url,
      nonprofitStatus: parentOrg.nonprofitStatus,
      ...(parentOrg.ein ? { taxID: parentOrg.ein } : {}),
      ...(parentOrg.foundingDate ? { foundingDate: parentOrg.foundingDate } : {}),
      ...(parentOrg.sameAs.length ? { sameAs: parentOrg.sameAs } : {}),
      // TODO: add Revive Behavioral Healthcare postal address when provided.
    },
    sameAs: org.sameAs,
  };
  if (org.logo) node.logo = org.logo;
  if (org.image) node.image = org.image;
  return node;
}

export function webSiteLd(lng: Lng) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteOrigin,
    name: org.name,
    inLanguage: lng,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteOrigin}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceLd(lng: Lng, opts: { name: string; description: string }) {
  return {
    "@type": "Service",
    name: opts.name,
    serviceType: org.serviceType,
    description: opts.description,
    inLanguage: lng,
    provider: { "@id": ORG_ID },
    // the served counties, not the whole state: the Organization node and the
    // FAQ both say counties, and this claimed more coverage than we have
    areaServed: counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c} County, California` })),
    isAccessibleForFree: true,
  };
}

export function faqPageLd(lng: Lng, faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    inLanguage: lng,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbLd(lng: Lng, items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: localeUrl(lng, it.path),
    })),
  };
}

export function eventLd(
  lng: Lng,
  e: { name: string; description?: string; startDate?: string; endDate?: string; url?: string; locationUrl?: string; performer?: { "@type": string; name: string }; image?: string },
) {
  const node: Record<string, unknown> = {
    "@type": "Event",
    name: e.name,
    inLanguage: lng,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: { "@id": ORG_ID },
    location: { "@type": "VirtualLocation", url: e.locationUrl ?? siteOrigin },
    isAccessibleForFree: true,
  };
  if (e.description) node.description = e.description;
  if (e.startDate) node.startDate = e.startDate;
  if (e.endDate) node.endDate = e.endDate;
  if (e.url) node.url = e.url;
  if (e.performer) node.performer = e.performer;
  if (e.image) node.image = e.image;
  return node;
}

// A multi-session workshop as an EventSeries whose subEvents are the individual
// sessions. Search engines and LLMs read every date, topic and time from one
// node instead of inferring them from prose.
export function eventSeriesLd(
  lng: Lng,
  e: {
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    url: string;
    image?: string;
    performer?: { "@type": string; name: string };
    subEvents?: { name: string; description?: string; startDate: string; endDate: string }[];
  },
) {
  const shared = {
    inLanguage: lng,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: { "@id": ORG_ID },
    location: { "@type": "VirtualLocation", url: e.url },
    isAccessibleForFree: true,
  };
  const node: Record<string, unknown> = {
    "@type": "EventSeries",
    name: e.name,
    startDate: e.startDate,
    endDate: e.endDate,
    url: e.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: e.url,
    },
    ...shared,
  };
  if (e.description) node.description = e.description;
  if (e.performer) node.performer = e.performer;
  if (e.image) node.image = e.image;
  if (e.subEvents?.length) {
    node.subEvent = e.subEvents.map((s) => {
      const sub: Record<string, unknown> = {
        "@type": "Event",
        name: s.name,
        startDate: s.startDate,
        endDate: s.endDate,
        url: e.url,
        ...shared,
      };
      if (s.description) sub.description = s.description;
      if (e.performer) sub.performer = e.performer;
      if (e.image) sub.image = e.image;
      return sub;
    });
  }
  return node;
}

export function donateActionLd() {
  return {
    "@type": "DonateAction",
    recipient: { "@id": ORG_ID },
    url: `${siteOrigin}/donate`,
  };
}

export function collectionPageLd(lng: Lng, opts: { name: string; description: string; path: string }) {
  return {
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: localeUrl(lng, opts.path),
    inLanguage: lng,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function blogPageLd(lng: Lng) {
  return {
    "@type": "Blog",
    name: "Adoption & Trauma Parenting Blog | Love Pathways Wraparound",
    description: "Educational articles, expert advice, and inspiring stories on trauma-responsive parenting and adoption from Love Pathways Wraparound.",
    url: localeUrl(lng, "/blog"),
    inLanguage: lng,
    publisher: { "@id": ORG_ID },
  };
}

export function articleLd(lng: Lng, opts: { title: string; description: string; path: string; image: string; publishedAt: string }) {
  return {
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: localeUrl(lng, opts.path),
    image: opts.image.startsWith("/") ? `${siteOrigin}${opts.image}` : opts.image,
    datePublished: opts.publishedAt,
    inLanguage: lng,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
  };
}

export function aboutPageLd(lng: Lng) {
  return {
    "@type": "AboutPage",
    name: "Our Impact | Love Pathways Wraparound Adoptive Family Results",
    description: "Real stories and measurable results: how Love Pathways Wraparound helps adoptive families in California heal, regulate, and stay together.",
    url: localeUrl(lng, "/impact"),
    inLanguage: lng,
    about: { "@id": ORG_ID },
  };
}

// Wrap one or more nodes into a single @graph JSON-LD document.
export function graph(...nodes: Array<Record<string, unknown> | null | undefined>) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
