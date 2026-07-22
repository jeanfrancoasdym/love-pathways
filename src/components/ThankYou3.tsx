import React from "react";
import Seo from "./Seo";
import ThankYouLanding from "./ThankYouLanding";

export default function ThankYou3() {
  return (
    <ThankYouLanding
      ns="thankYou3"
      heroImage="/page-hero/event-calm.webp"
      startIso="2026-08-25T16:00:00Z"
      endIso="2026-08-25T17:00:00Z"
      zoomLink="https://us06web.zoom.us/j/89346752402"
      seo={<Seo pageKey="thankYou3" path="/thank-you3" noindex />}
    />
  );
}
