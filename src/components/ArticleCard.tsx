import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

type ArticleCardProps = {
  href: string;
  external?: boolean;
  image: string;
  imageAlt?: string;
  category?: string;
  title: string;
  excerpt: string;
  dateLabel?: string;
  readTimeLabel?: string;
};

// Shared editorial card used by the blog grid and "related articles" sections.
// Clean image (no dark overlay/badge-on-photo), small-caps eyebrow instead of a
// heavy pill, serif title - matches the reference designs (plain, magazine-like).
export default function ArticleCard({ href, external, image, imageAlt, category, title, excerpt, dateLabel, readTimeLabel }: ArticleCardProps) {
  const Wrapper = external ? "a" : Link;
  const wrapperProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to: href };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={imageAlt ?? ""}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        {category && (
          <p className="font-display text-xs font-bold uppercase tracking-widest text-brand-primary">{category}</p>
        )}
        <h3 className="font-display text-lg font-bold leading-snug text-brand-dark transition-colors group-hover:text-brand-primary line-clamp-2">
          {title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">{excerpt}</p>
        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-medium text-slate-400">
          <span className="inline-flex items-center gap-3">
            {dateLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={12} /> {dateLabel}
              </span>
            )}
            {readTimeLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} /> {readTimeLabel}
              </span>
            )}
          </span>
          <ArrowUpRight size={16} className="text-brand-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Wrapper>
  );
}
