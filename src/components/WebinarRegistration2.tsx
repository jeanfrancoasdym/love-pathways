import React from "react";
import { useTranslation } from "react-i18next";
import GhlForm from "./GhlForm";
import { ghl, siteOrigin } from "../data/site";
import Seo from "./Seo";
import { breadcrumbLd, eventLd, faqPageLd, graph, localeUrl, organizationLd, webSiteLd } from "../seo/structuredData";
import { useLocale } from "../i18n/useLocale";
import WebinarLanding from "./WebinarLanding";

// Event 2: Adoption Parenting with Love and Limits — September 22 (Bryan Post).
const START = "2026-09-22T09:00:00-07:00";
const END = "2026-09-22T10:00:00-07:00";

export default function WebinarRegistration2() {
  const { t } = useTranslation("webinar2");
  const { lng } = useLocale();
  const eventName = `${t("hero.titleBefore")}${t("hero.titleHighlight")}${t("hero.titleAfter")}`.trim();
  const faqItems = (t("faq.items", { returnObjects: true }) as { q: string; a: string }[]) ?? [];

  return (
    <WebinarLanding
      ns="webinar2"
      startDate={START}
      heroBody="description"
      heroImage="/page-hero/event-family.webp"
      forYouImage="/page-hero/event-connection.webp"
      learnImage="/page-hero/phase-photo-1.webp"
      presenterImage="/page-hero/presenter-bryan.webp"
      presenterImageAlt={t("host.imageAlt")}
      seo={
        <Seo
          pageKey="webinar2"
          path="/webinar-event2"
          jsonLd={graph(
            organizationLd(),
            webSiteLd(lng),
            faqPageLd(lng, faqItems.map((f) => ({ question: f.q, answer: f.a }))),
            eventLd(lng, {
              name: eventName,
              description: t("hero.description"),
              startDate: START,
              endDate: END,
              url: localeUrl(lng, "/webinar-event2"),
              locationUrl: localeUrl(lng, "/webinar-event2"),
              performer: { "@type": "Organization", name: "Love Pathways Wraparound" },
              image: `${siteOrigin}/page-hero/event-family.webp`,
            }),
            breadcrumbLd(lng, [
              { name: "Home", path: "/" },
              { name: "Webinar Registration", path: "/webinar-event2" },
            ])
          )}
        />
      }
      form={
        <GhlForm
          formId={ghl.webinar2FormIdEn}
          name="Adoption Parenting with Love and Limits Webinar"
          height={480}
          onSubmitRedirect="/thank-you2"
          className="w-full"
        />
      }
    />
  );
}
