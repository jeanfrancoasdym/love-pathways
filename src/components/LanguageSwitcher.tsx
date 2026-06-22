import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

// Globe icon + native language names (autonyms). Per UX best practice the labels
// are ALWAYS in their own language ("English" / "Español") regardless of the current
// page locale, so a Spanish speaker landing on the EN page recognizes "Español".
// Navigates between the root (EN) and /es (ES) version of the current page.
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEs = pathname === "/es" || pathname.startsWith("/es/");

  const go = (lng: "en" | "es") => {
    if (lng === "es" && !isEs) {
      navigate(pathname === "/" ? "/es" : "/es" + pathname);
    } else if (lng === "en" && isEs) {
      navigate(pathname === "/es" ? "/" : pathname.replace(/^\/es/, ""));
    }
  };

  const btn = (active: boolean) =>
    `rounded-full px-3 py-1 transition-colors ${
      active ? "bg-brand-dark text-white" : "text-brand-dark/60 hover:text-brand-dark"
    }`;

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={`inline-flex items-center gap-1.5 rounded-full border border-brand-dark/15 px-1.5 py-1 text-[13px] font-bold ${className}`}
    >
      <Globe size={15} strokeWidth={2.25} className="ml-1 shrink-0 text-brand-dark/45" aria-hidden="true" />
      <button
        type="button"
        lang="en"
        onClick={() => go("en")}
        aria-pressed={!isEs}
        aria-current={!isEs ? "true" : undefined}
        title={t("language.switchToEn")}
        className={btn(!isEs)}
      >
        English
      </button>
      <button
        type="button"
        lang="es"
        onClick={() => go("es")}
        aria-pressed={isEs}
        aria-current={isEs ? "true" : undefined}
        title={t("language.switchToEs")}
        className={btn(isEs)}
      >
        Español
      </button>
    </div>
  );
}
