// Reusable, on-brand decorative hero backdrop - replaces the picsum placeholder
// images that sat behind hero text. Pure CSS (gradient wash + dot pattern + soft
// brand glows), no external image. Works over any brand-colored hero base
// (bg-brand-dark, bg-brand-primary, etc.) because it's built from white + brand
// tints at low opacity. Decorative only - aria-hidden, never interactive.
export default function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* gradient wash for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-brand-dark/30" />
      {/* subtle dot pattern (matches the site's existing decorative vocabulary) */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}
      />
      {/* soft brand glows */}
      <div className="absolute -top-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-white/10 blur-[120px]" />
      <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-brand-primary/20 blur-[120px]" />
    </div>
  );
}
