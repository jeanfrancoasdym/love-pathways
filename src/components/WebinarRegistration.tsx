import React from "react";
import { useTranslation } from "react-i18next";
import GhlForm from "./GhlForm";
import { ghl, siteOrigin } from "../data/site";
import Seo from "./Seo";
import { breadcrumbLd, eventLd, faqPageLd, graph, localeUrl, organizationLd, webSiteLd } from "../seo/structuredData";
import { useLocale } from "../i18n/useLocale";
import WebinarLanding from "./WebinarLanding";

// Event 1 (soonest by date): When Love Doesn't Feel Like Enough — July 14.
const START = "2026-07-14T09:00:00-07:00";
const END = "2026-07-14T10:30:00-07:00";

export default function WebinarRegistration() {
  const { t } = useTranslation("webinar1");
  const { lng } = useLocale();
  const eventName = `${t("hero.titleBefore")}${t("hero.titleHighlight")}${t("hero.titleAfter")}`.trim();
  const languageValue = t("details.languageValueEn");
  const faqItems = (t("faq.items", { returnObjects: true }) as { q: string; a: string }[]) ?? [];

  return (
    <WebinarLanding
      ns="webinar1"
      startDate={START}
      heroBody="paragraphs"
      languageValue={languageValue}
      heroImage="/page-hero/event-connection.webp"
      forYouImage="/page-hero/event-family.webp"
      learnImage="/page-hero/phase-photo-3.webp"
      presenterImage="/page-hero/presenter-alicia.webp"
      presenterImageAlt={t("guide.name")}
      presenterImage2="/page-hero/presenter-jeanette.webp"
      presenterImageAlt2={t("guide2.name")}
      seo={
        <Seo
          pageKey="webinar1"
          path="/webinar-event1"
          jsonLd={graph(
            organizationLd(),
            webSiteLd(lng),
            faqPageLd(lng, faqItems.map((f) => ({ question: f.q, answer: f.a }))),
            eventLd(lng, {
              name: eventName,
              description: t("hero.paragraph1"),
              startDate: START,
              endDate: END,
              url: localeUrl(lng, "/webinar-event1"),
              locationUrl: localeUrl(lng, "/webinar-event1"),
              performer: { "@type": "Organization", name: "Love Pathways Wraparound" },
              image: `${siteOrigin}/page-hero/event-connection.webp`,
            }),
            breadcrumbLd(lng, [
              { name: "Home", path: "/" },
              { name: "Webinar Registration", path: "/webinar-event1" },
            ])
          )}
        />
      }
      form={
        <GhlForm
          formId={ghl.webinar1FormId}
          name="When Love Doesn't Feel Like Enough Webinar"
          height={480}
          onSubmitRedirect="/thank-you1"
          className="w-full"
        />
      }
    />
  );
}
