import React from "react";
import { useTranslation } from "react-i18next";
import GhlForm from "./GhlForm";
import { ghl, siteOrigin } from "../data/site";
import Seo from "./Seo";
import { breadcrumbLd, eventLd, graph, localeUrl, organizationLd, webSiteLd } from "../seo/structuredData";
import { useLocale } from "../i18n/useLocale";
import WebinarLanding from "./WebinarLanding";

const START = "2026-06-25T09:00:00-07:00";
const END = "2026-06-25T10:30:00-07:00";

export default function WebinarRegistration2() {
  const { t } = useTranslation("webinar2");
  const { lng } = useLocale();
  const eventName = `${t("hero.titleBefore")}${t("hero.titleHighlight")}${t("hero.titleAfter")}`.trim();
  const languageValue = t("details.languageValueEn");

  return (
    <WebinarLanding
      ns="webinar2"
      startDate={START}
      heroBody="paragraphs"
      languageValue={languageValue}
      heroImage="/page-hero/event-calm.webp"
      forYouImage="/page-hero/event-family.webp"
      learnImage="/page-hero/phase-photo-3.webp"
      presenterImage="/page-hero/presenter-jeanette.webp"
      presenterImageAlt={t("host.imageAlt")}
      seo={
        <Seo
          pageKey="webinar2"
          path="/webinar-event2"
          jsonLd={graph(
            organizationLd(),
            webSiteLd(lng),
            eventLd(lng, {
              name: eventName,
              description: t("hero.paragraph1"),
              startDate: START,
              endDate: END,
              url: localeUrl(lng, "/webinar-event2"),
              locationUrl: localeUrl(lng, "/webinar-event2"),
              performer: { "@type": "Organization", name: "Love Pathways Wraparound" },
              image: `${siteOrigin}/page-hero/event-calm.webp`,
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
          name="The Angry Child's Hidden Story Webinar"
          height={480}
          onSubmitRedirect="/thank-you2"
          className="w-full"
        />
      }
    />
  );
}
