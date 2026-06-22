import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ghl } from "../data/site";
import { useLocale } from "../i18n/useLocale";

// One reusable GoHighLevel inline-form embed. Replaces the ad-hoc
// dangerouslySetInnerHTML iframe/script blocks that were duplicated across
// Contact, the two Webinar pages and Donate. Loads form_embed.js once and
// (optionally) redirects after a submit via the GHL postMessage event.
//
// A branded loading skeleton ("mask") shows instantly while the cross-origin
// iframe loads behind it, then fades out on the iframe's load event — so the
// form FEELS instant even though GHL is slow to respond.
type GhlFormProps = {
  formId: string;
  name: string;
  height?: number;
  onSubmitRedirect?: string;
  /** Defaults to the go.leafwraparound.com widget; Donate uses leadconnectorhq. */
  formBase?: string;
  scriptSrc?: string;
  className?: string;
};

function FormSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col gap-5 p-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-11 w-full animate-pulse rounded-lg bg-slate-100 ring-1 ring-slate-100" />
        </div>
      ))}
      <div className="mt-1 h-12 w-full animate-pulse rounded-lg bg-brand-primary/25" />
    </div>
  );
}

export default function GhlForm({
  formId,
  name,
  height = 650,
  onSubmitRedirect,
  formBase = ghl.formBase,
  scriptSrc = ghl.embedScript,
  className,
}: GhlFormProps) {
  const navigate = useNavigate();
  const { to } = useLocale();
  const [loaded, setLoaded] = useState(false);

  // Open the connection to GHL early so the iframe fetch is faster.
  useEffect(() => {
    try {
      const origin = new URL(formBase).origin;
      if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
        const l = document.createElement("link");
        l.rel = "preconnect";
        l.href = origin;
        l.crossOrigin = "anonymous";
        document.head.appendChild(l);
      }
    } catch {
      /* invalid URL — skip */
    }
  }, [formBase]);

  // Inject the embed script once (it auto-resizes the iframe).
  useEffect(() => {
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const sc = document.createElement("script");
      sc.src = scriptSrc;
      sc.async = true;
      document.body.appendChild(sc);
    }
  }, [scriptSrc]);

  // Optional redirect after the GHL form is submitted (postMessage).
  useEffect(() => {
    if (!onSubmitRedirect) return;
    const handler = (e: MessageEvent) => {
      let data: unknown = e.data;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        /* not JSON - fall through */
      }
      const tag =
        (data && typeof data === "object" && ((data as any).type || (data as any).message)) ||
        (typeof e.data === "string" ? e.data : "");
      if (typeof tag === "string" && /form-?submit/i.test(tag)) {
        navigate(to(onSubmitRedirect));
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onSubmitRedirect, navigate, to]);

  return (
    <div className={`relative ${className ?? ""}`} style={{ minHeight: height }}>
      <iframe
        src={`${formBase}/${formId}`}
        id={`inline-${formId}`}
        title={name}
        data-form-name={name}
        data-form-id={formId}
        data-layout-iframe-id={`inline-${formId}`}
        data-layout="{'id':'INLINE'}"
        scrolling="no"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ width: "100%", border: "none", borderRadius: 3, minHeight: height }}
      />
      <div
        className={`transition-opacity duration-500 ${loaded ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <FormSkeleton />
      </div>
    </div>
  );
}
