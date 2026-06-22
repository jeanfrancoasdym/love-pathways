import React from "react";
import Seo from "./Seo";
import ThankYouLanding from "./ThankYouLanding";

export default function ThankYou() {
  return (
    <ThankYouLanding
      ns="thankYou"
      heroImage="/page-hero/event-school.webp"
      startIso="2026-06-23T16:00:00Z"
      endIso="2026-06-23T17:00:00Z"
      zoomLink="https://us06web.zoom.us/j/86479618023"
      seo={<Seo pageKey="thankYou" path="/thank-you1" noindex />}
    />
  );
}
