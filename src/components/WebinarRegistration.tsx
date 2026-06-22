import React from "react";
import { useTranslation } from "react-i18next";
import GhlForm from "./GhlForm";
import { ghl, siteOrigin } from "../data/site";
import Seo from "./Seo";
import { breadcrumbLd, eventLd, graph, localeUrl, organizationLd, webSiteLd } from "../seo/structuredData";
import { useLocale } from "../i18n/useLocale";
import WebinarLanding from "./WebinarLanding";

const START = "2026-06-23T09:00:00-07:00";
const END = "2026-06-23T10:00:00-07:00";

export default function WebinarRegistration() {
  const { t } = useTranslation("webinar1");
  const { lng } = useLocale();
  const eventName = `${t("hero.titleBefore")}${t("hero.titleHighlight")}${t("hero.titleAfter")}`.trim();

  return (
    <WebinarLanding
      ns="webinar1"
      startDate={START}
      heroBody="description"
      heroImage="/page-hero/event-school.webp"
      forYouImage="/page-hero/event-connection.webp"
      learnImage="/page-hero/phase-photo-1.webp"
      presenterImage="/page-hero/presenter-bryan.webp"
      presenterImageAlt={t("host.imageAlt")}
      seo={
        <Seo
          pageKey="webinar1"
          path="/webinar-event1"
          jsonLd={graph(
            organizationLd(),
            webSiteLd(lng),
            eventLd(lng, {
              name: eventName,
              description: t("hero.description"),
              startDate: START,
              endDate: END,
              url: localeUrl(lng, "/webinar-event1"),
              locationUrl: localeUrl(lng, "/webinar-event1"),
              performer: { "@type": "Organization", name: "LEAF Wraparound" },
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
          name="When Trauma Walks Into the Classroom Webinar"
          height={480}
          onSubmitRedirect="/thank-you1"
          className="w-full"
        />
      }
    />
  );
}
