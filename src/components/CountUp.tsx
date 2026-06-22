import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

// Animated number that counts up from 0 to the target the first time it scrolls
// into view. Accepts the display string ("500+", "1,200+", "15k+") and preserves
// its suffix + comma formatting. SSG-safe: the final value is what renders on the
// server / first paint, so crawlers and no-JS users see the real number; the
// count-up is layered on only after hydration. Honors prefers-reduced-motion.
export default function CountUp({
  value,
  className = "",
  duration = 1.2,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([\d.]+)/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? cleaned.slice(match[1].length) : value;
  const hasComma = value.includes(",");
  const isInt = Number.isInteger(target);
  const fmt = (n: number) => {
    const v = isInt ? Math.round(n) : Math.round(n * 10) / 10;
    return hasComma ? v.toLocaleString("en-US") : String(v);
  };

  // Final value on SSR + first client render (keeps the real number in static HTML).
  const [display, setDisplay] = useState(fmt(target));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (!inView) {
      setDisplay(fmt(0)); // arm at 0 once on the client (section is below the fold)
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, inView, target, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="notranslate" translate="no">{`${display}${suffix}`}</span>
    </span>
  );
}
