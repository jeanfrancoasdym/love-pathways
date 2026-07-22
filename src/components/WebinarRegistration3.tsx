import React from "react";
import { useTranslation } from "react-i18next";
import GhlForm from "./GhlForm";
import { ghl, siteOrigin } from "../data/site";
import Seo from "./Seo";
import { breadcrumbLd, eventLd, faqPageLd, graph, localeUrl, organizationLd, webSiteLd } from "../seo/structuredData";
import { useLocale } from "../i18n/useLocale";
import WebinarLanding from "./WebinarLanding";

// Event 3: Balancing the Family: When One Child Needs More — August 25 (Bryan Post).
const START = "2026-08-25T09:00:00-07:00";
const END = "2026-08-25T10:00:00-07:00";

export default function WebinarRegistration3() {
  const { t } = useTranslation("webinar3");
  const { lng } = useLocale();
  const eventName = `${t("hero.titleBefore")}${t("hero.titleHighlight")}${t("hero.titleAfter")}`.trim();
  const faqItems = (t("faq.items", { returnObjects: true }) as { q: string; a: string }[]) ?? [];

  return (
    <WebinarLanding
      ns="webinar3"
      startDate={START}
      heroBody="description"
      heroImage="/page-hero/event-calm.webp"
      forYouImage="/page-hero/event-family.webp"
      learnImage="/page-hero/phase-photo-2.webp"
      presenterImage="/page-hero/presenter-bryan.webp"
      presenterImageAlt={t("host.imageAlt")}
      seo={
        <Seo
          pageKey="webinar3"
          path="/webinar-event3"
          jsonLd={graph(
            organizationLd(),
            webSiteLd(lng),
            faqPageLd(lng, faqItems.map((f) => ({ question: f.q, answer: f.a }))),
            eventLd(lng, {
              name: eventName,
              description: t("hero.description"),
              startDate: START,
              endDate: END,
              url: localeUrl(lng, "/webinar-event3"),
              locationUrl: localeUrl(lng, "/webinar-event3"),
              performer: { "@type": "Organization", name: "Love Pathways Wraparound" },
              image: `${siteOrigin}/page-hero/event-calm.webp`,
            }),
            breadcrumbLd(lng, [
              { name: "Home", path: "/" },
              { name: "Webinar Registration", path: "/webinar-event3" },
            ])
          )}
        />
      }
      form={
        <GhlForm
          formId={ghl.webinar3FormId}
          name="Balancing the Family Webinar"
          height={480}
          onSubmitRedirect="/thank-you3"
          className="w-full"
        />
      }
    />
  );
}
