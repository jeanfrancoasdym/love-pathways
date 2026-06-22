import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

interface ParallaxSectionProps {
  /** Background photo (served from /public). Decorative. */
  image: string;
  children: ReactNode;
  /** Extra classes for the <section> (padding, etc.). */
  className?: string;
  /** Tailwind opacity utility for the navy overlay (default bg-brand-dark/72). */
  overlayClassName?: string;
}

// A section whose background photo gently parallaxes (drifts slower than the page)
// as you scroll past it. The photo sits behind a brand-navy overlay so foreground
// text stays readable. Parallax runs only on >=md screens with motion allowed;
// otherwise the background is static (SSG-safe — content is always visible).
export default function ParallaxSection({
  image,
  children,
  className = "",
  overlayClassName = "bg-brand-dark/72",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Background parallax is a subtle, low-vestibular drift; enabled on desktop
    // regardless of reduced-motion (per design request). Disabled on touch/small
    // screens where it conflicts with native scroll. `reduce` kept for future tuning.
    void reduce;
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  // Smooth the scroll value with a soft spring so the background visibly LAGS
  // behind the scroll (drifts in after a beat) instead of moving in lockstep.
  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 20, mass: 0.7, restDelta: 0.0005 });
  const y = useTransform(smooth, [0, 1], ["-28%", "28%"]);

  return (
    <section ref={ref} className={`relative isolate overflow-hidden bg-brand-dark text-white ${className}`}>
      {/* Parallax photo layer — taller than the section so the drift never reveals edges */}
      <motion.div
        aria-hidden="true"
        style={enabled ? { y } : undefined}
        className="absolute inset-x-0 -top-[36%] -bottom-[36%] -z-10"
      >
        <img src={image} alt="" className="h-full w-full object-cover" />
      </motion.div>
      {/* Brand-navy overlay for readability + on-brand color */}
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${overlayClassName}`} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 120% at 50% 45%, rgba(25,40,71,0) 42%, rgba(25,40,71,0.72) 100%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
      {children}
    </section>
  );
}
