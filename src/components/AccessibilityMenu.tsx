import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Accessibility, X, Plus, Minus, ZoomIn, Contrast, Underline, Type, RotateCcw } from "lucide-react";

type A11ySettings = {
  fontScale: number; // 0.9 - 1.4
  zoom: number; // 1, 1.1, 1.25, 1.5
  contrast: boolean;
  links: boolean;
  readable: boolean;
};

const DEFAULTS: A11ySettings = { fontScale: 1, zoom: 1, contrast: false, links: false, readable: false };
const STORAGE_KEY = "leaf-a11y";
const ZOOM_LEVELS = [1, 1.1, 1.25, 1.5];

function load(): A11ySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { ...DEFAULTS };
}

// Apply settings to the document. Contrast/links/readable are scoped to
// #a11y-root via CSS classes. Zoom is applied to the page CONTENT (<main>)
// ONLY - applying `zoom` to the layout root (#a11y-root) turns it into a
// containing block and PINS the in-flow header, breaking page scrolling.
// We also only set zoom when it differs from the default (clearing it otherwise).
function apply(s: A11ySettings) {
  document.documentElement.style.fontSize = `${Math.round(s.fontScale * 100)}%`;
  const main = document.getElementById("main-content");
  if (main) {
    if (s.zoom === 1) main.style.removeProperty("zoom");
    else main.style.setProperty("zoom", String(s.zoom));
  }
  const cl = document.documentElement.classList;
  cl.toggle("a11y-contrast", s.contrast);
  cl.toggle("a11y-highlight-links", s.links);
  cl.toggle("a11y-readable-font", s.readable);
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<A11ySettings>(DEFAULTS);

  useEffect(() => {
    const loaded = load();
    setS(loaded);
    apply(loaded);
  }, []);

  const update = useCallback((patch: Partial<A11ySettings>) => {
    setS((prev) => {
      const next = { ...prev, ...patch };
      apply(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    apply(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setS({ ...DEFAULTS });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fontPct = Math.round(s.fontScale * 100);

  return (
    <div className="fixed bottom-5 left-5 z-[60]" style={{ fontSize: 14 }}>
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility options"
          className="absolute bottom-16 left-0 w-72 bg-white rounded-2xl shadow-2xl border border-brand-dark/10 p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-brand-dark text-base">Accessibility</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close accessibility menu"
              className="text-brand-dark/50 hover:text-brand-dark"
            >
              <X size={18} />
            </button>
          </div>

          {/* Text size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-sm font-bold text-brand-dark">
                <Type size={16} /> Text size
              </span>
              <span className="text-xs text-brand-dark/50">{fontPct}%</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => update({ fontScale: Math.max(0.9, +(s.fontScale - 0.1).toFixed(2)) })}
                aria-label="Decrease text size"
                className="flex-1 border-2 border-brand-dark/15 rounded-lg py-2 flex items-center justify-center hover:border-brand-dark transition-colors"
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => update({ fontScale: Math.min(1.4, +(s.fontScale + 0.1).toFixed(2)) })}
                aria-label="Increase text size"
                className="flex-1 border-2 border-brand-dark/15 rounded-lg py-2 flex items-center justify-center hover:border-brand-dark transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Zoom */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-sm font-bold text-brand-dark">
                <ZoomIn size={16} /> Zoom
              </span>
              <span className="text-xs text-brand-dark/50">{Math.round(s.zoom * 100)}%</span>
            </div>
            <div className="flex gap-2">
              {ZOOM_LEVELS.map((z) => (
                <button
                  key={z}
                  onClick={() => update({ zoom: z })}
                  aria-pressed={s.zoom === z}
                  className={`flex-1 border-2 rounded-lg py-2 text-xs font-bold transition-colors ${
                    s.zoom === z
                      ? "border-brand-primary text-brand-primary"
                      : "border-brand-dark/15 text-brand-dark/70 hover:border-brand-dark"
                  }`}
                >
                  {Math.round(z * 100)}%
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <Toggle icon={<Contrast size={16} />} label="High contrast" on={s.contrast} onClick={() => update({ contrast: !s.contrast })} />
          <Toggle icon={<Underline size={16} />} label="Highlight links" on={s.links} onClick={() => update({ links: !s.links })} />
          <Toggle icon={<Type size={16} />} label="Readable font" on={s.readable} onClick={() => update({ readable: !s.readable })} />

          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 text-sm font-bold text-brand-dark/60 hover:text-brand-dark pt-1 transition-colors"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Accessibility options"
        className="w-14 h-14 rounded-full bg-brand-primary text-white shadow-xl flex items-center justify-center hover:bg-brand-dark transition-colors focus:outline-none focus:ring-4 focus:ring-brand-primary/30"
      >
        <Accessibility size={26} />
      </button>
    </div>
  );
}

function Toggle({ icon, label, on, onClick }: { icon: ReactNode; label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`w-full flex items-center justify-between gap-2 border-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors ${
        on ? "border-brand-primary bg-brand-primary/5 text-brand-primary" : "border-brand-dark/15 text-brand-dark/70 hover:border-brand-dark"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      <span className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${on ? "bg-brand-primary" : "bg-brand-dark/20"}`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${on ? "left-[1.15rem]" : "left-0.5"}`} />
      </span>
    </button>
  );
}
