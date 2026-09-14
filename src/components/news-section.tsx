import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { news, newsCategories, type NewsCategory } from "@/data/news";

const filters = ["All", ...newsCategories] as const;
type Filter = (typeof filters)[number];

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/** News & updates: category filter plus a card grid of dated posts that open internal pages. */
export function NewsSection({ className = "" }: { className?: string }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = news.filter((item) => filter === "All" || item.category === filter);

  return (
    <section id="news" className={`px-5 py-12 sm:px-10 md:px-16 md:py-16 lg:px-24 ${className}`}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase text-muted-foreground">News & updates</p>
          <h2 className="mt-4 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-4xl">
            Latest from
            <span className="block font-display text-[0.82em] normal-case italic">Lunaris</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter news">
          {filters.map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              onClick={() => setFilter(value)}
              className={`h-9 rounded-none border px-4 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
                filter === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-foreground hover:bg-secondary"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <Link
            key={item.slug}
            to={item.to}
            className="group flex flex-col border border-border bg-card transition-colors hover:border-primary/50"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image.src}
                alt={item.image.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 top-3 bg-card px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground">
                {item.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 font-display text-xl italic leading-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-muted-foreground">
                {item.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <time dateTime={item.date} className="text-xs text-muted-foreground">
                  {formatDate(item.date)}
                </time>
                <span className="inline-flex size-7 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
