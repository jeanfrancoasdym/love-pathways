import { Globe } from "lucide-react";
import { useLocale } from "../i18n/useLocale";

// Small indicator shown ONLY on Spanish pages, on feed cards whose content
// (blog posts, resources, events) is sourced from the English-only Google
// Sheets. It makes the language mix intentional rather than a silent leak.
// Renders nothing on English pages.
export default function EnglishContentBadge({ className = "" }: { className?: string }) {
  const { isEs } = useLocale();
  if (!isEs) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1 ${className}`}
    >
      <Globe size={11} aria-hidden="true" />
      Presentado en inglés
    </span>
  );
}
