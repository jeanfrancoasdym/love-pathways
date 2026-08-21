import React from "react";
import Seo from "./Seo";
import ThankYouLanding from "./ThankYouLanding";

export default function ThankYou() {
  return (
    <ThankYouLanding
      ns="thankYou"
      heroImage="/page-hero/hero-support.webp"
      startIso="2026-09-15T16:00:00Z"
      endIso="2026-09-15T17:00:00Z"
      zoomLink="https://us06web.zoom.us/j/83035265095"
      seo={<Seo pageKey="thankYou" path="/thank-you1" noindex />}
    />
  );
}
