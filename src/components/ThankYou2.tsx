import React from "react";
import Seo from "./Seo";
import ThankYouLanding from "./ThankYouLanding";

export default function ThankYou2() {
  return (
    <ThankYouLanding
      ns="thankYou2"
      heroImage="/page-hero/event-connection.webp"
      startIso="2026-09-22T16:00:00Z"
      endIso="2026-09-22T17:00:00Z"
      zoomLink="https://us06web.zoom.us/j/85016825320"
      seo={<Seo pageKey="thankYou2" path="/thank-you2" noindex />}
    />
  );
}
