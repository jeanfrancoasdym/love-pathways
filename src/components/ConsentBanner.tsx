import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/useLocale";

// Consent-gated analytics. No third-party tracker (GTM -> GA4, Microsoft Clarity)
// loads until the visitor explicitly accepts. Reject = nothing loads, ever.
// CIPA / CCPA remediation: zero trackers pre-consent.
const STORAGE_KEY = "lp-consent"; // "granted" | "denied"

declare global {
  interface Window {
    __gtmLoaded?: boolean;
    dataLayer?: unknown[];
  }
}

function loadGtm(id: string) {
  if (typeof window === "undefined" || window.__gtmLoaded || !id) return;
  window.__gtmLoaded = true;
  (function (w: any, d: Document, s: string, l: string, i: string) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s) as HTMLScriptElement;
    const dl = l !== "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode!.insertBefore(j, f);
  })(window, document, "script", "dataLayer", id);
}

export default function ConsentBanner({ gtmId = "" }: { gtmId?: string }) {
  const { lng, to } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!gtmId) return; // no analytics configured -> no banner needed
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked */
    }
    if (choice === "granted") {
      loadGtm(gtmId);
      return;
    }
    if (choice === "denied") return;
    // Honor Global Privacy Control (CCPA/CPRA): a GPC signal is treated as a
    // "do not sell/share" opt-out -> no banner shown, no trackers load.
    if (typeof navigator !== "undefined" && (navigator as { globalPrivacyControl?: boolean }).globalPrivacyControl === true) {
      try { localStorage.setItem(STORAGE_KEY, "denied"); } catch { /* storage blocked */ }
      return;
    }
    setShow(true);
  }, [gtmId]);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      /* storage blocked */
    }
    if (granted) loadGtm(gtmId);
    setShow(false);
  };

  if (!show) return null;

  const es = lng === "es";
  const text = es
    ? "Usamos cookies y tecnologías similares para analítica, publicidad y para mejorar tu experiencia. Puedes aceptar o rechazar el seguimiento no esencial."
    : "We use cookies and similar technologies for analytics, advertising, and to improve your experience. You can accept or reject non-essential tracking.";
  const accept = es ? "Aceptar" : "Accept";
  const reject = es ? "Rechazar" : "Reject";
  const learn = es ? "Política de Privacidad" : "Privacy Policy";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={es ? "Aviso de cookies" : "Cookie notice"}
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-white/10 bg-brand-dark/95 px-4 py-4 text-white shadow-2xl backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm leading-relaxed text-white/85">
          {text}{" "}
          <Link
            to={to("/privacy-policy")}
            className="font-semibold underline decoration-brand-secondary/70 underline-offset-2 hover:text-white"
          >
            {learn}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            {reject}
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-lg bg-brand-secondary px-5 py-2.5 text-sm font-bold text-brand-dark transition-colors hover:brightness-110"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}
