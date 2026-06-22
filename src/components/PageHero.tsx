import type { ReactNode } from "react";

interface PageHeroProps {
  /** Background photo (served from /public). Decorative — rendered with alt="". */
  image: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
}

// Consistent page header used across all pages: a fixed-height band with a
// background photo that stays clearly visible under a brand-navy overlay (~45-50%),
// with a soft darker scrim behind the centered text so white/lime type stays legible.
// Same height everywhere = a cohesive, professional feel.
export default function PageHero({ image, eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[21rem] items-center overflow-hidden bg-brand-dark text-white md:min-h-[26rem]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img src={image} alt="" className="h-full w-full object-cover" />
        {/* Brand-navy tint — photo stays visible (~50%) but clearly on-brand */}
        <div className="absolute inset-0 bg-brand-dark/50" />
        {/* Soft scrim behind the centered text for legibility */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 78% 68% at 50% 50%, rgba(25,40,71,0.5) 0%, rgba(25,40,71,0) 72%)" }}
        />
        {/* Edge vignette — eases toward the brand color at the sides/corners */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(125% 115% at 50% 45%, rgba(25,40,71,0) 45%, rgba(25,40,71,0.88) 100%)" }}
        />
        {/* Subtle dot texture (matches the site's decorative vocabulary) */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
      </div>

      <div
        className="relative z-10 mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8"
        style={{ textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}
      >
        {eyebrow && (
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-secondary">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-3xl font-display text-xl font-medium leading-relaxed text-slate-100 md:text-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
