import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LNGS = ["en", "es"] as const;
export type Lng = (typeof SUPPORTED_LNGS)[number];

// Auto-load every locale namespace file: ./locales/<lng>/<ns>.json.
// Adding a new page namespace = just drop a JSON file here, no config edits.
const modules = import.meta.glob("./locales/*/*.json", { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>;

const resources: Record<string, Record<string, unknown>> = {};
for (const path in modules) {
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) continue;
  const [, lng, ns] = match;
  if (!resources[lng]) resources[lng] = {};
  resources[lng][ns] = modules[path].default;
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "es"],
  defaultNS: "common",
  fallbackNS: "common",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

// Fixed-language instances bound per route via <I18nextProvider> in App.tsx.
// Using a separate instance per locale (instead of mutating one global
// language) lets each page prerender in its REAL language during SSG - no
// shared-global race across the concurrent prerenders - and switch cleanly on
// the client with no hydration mismatch. Both share the same resource store.
export const enI18n = i18n;
export const esI18n = i18n.cloneInstance({ lng: "es" });

export default i18n;
