import React from "react";
import Seo from "./Seo";
import ThankYouLanding from "./ThankYouLanding";

export default function ThankYou2() {
  return (
    <ThankYouLanding
      ns="thankYou2"
      heroImage="/page-hero/event-connection.webp"
      startIso="2026-06-25T16:00:00Z"
      endIso="2026-06-25T17:30:00Z"
      zoomLink="https://us06web.zoom.us/j/81745003605"
      seo={<Seo pageKey="thankYou2" path="/thank-you2" noindex />}
    />
  );
}
