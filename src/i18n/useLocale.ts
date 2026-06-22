import { useLocation } from "react-router-dom";

// Locale awareness derived from the URL: root = EN, /es/* = ES.
// `to(path)` prefixes an internal app path with the active locale so links
// keep the user inside their language (e.g. ES: "/about-us" -> "/es/about-us").
export function useLocale() {
  const { pathname } = useLocation();
  const isEs = pathname === "/es" || pathname.startsWith("/es/");
  const lng: "en" | "es" = isEs ? "es" : "en";
  const prefix = isEs ? "/es" : "";
  const to = (path: string) => (path === "/" ? prefix || "/" : prefix + path);
  return { isEs, lng, prefix, to };
}
