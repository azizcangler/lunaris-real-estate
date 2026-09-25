import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { newsCategories, type NewsCategory } from "@/data/news";
import { localeTags, useT } from "@/i18n";
import { getNews } from "@/i18n/projects";

type Filter = "all" | NewsCategory;
const filters: Filter[] = ["all", ...newsCategories];

/** News & updates: category filter plus a card grid of dated posts that open internal pages. */
export function NewsSection({ className = "" }: { className?: string }) {
  const { locale, t } = useT();
  const [filter, setFilter] = useState<Filter>("all");
  const news = getNews(locale);
  const visible = news.filter((item) => filter === "all" || item.category === filter);
  const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString(localeTags[locale], {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  const label = (value: Filter) => (value === "all" ? t.news.all : t.news.categories[value]);

  return (
    <section id="news" className={`px-5 py-12 sm:px-10 md:px-16 md:py-16 lg:px-24 ${className}`}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase text-muted-foreground">
            {t.news.eyebrow}
          </p>
          <h2 className="mt-4 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-4xl">
            {t.news.title}
            <span className="block font-display text-[0.82em] normal-case italic">
              {t.news.titleItalic}
            </span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.news.filterAria}>
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
              {label(value)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {visible.map((item) => (
          <Link
            key={item.slug}
            to={item.to}
            {...(item.params ? { params: (previous) => ({ ...previous, ...item.params }) } : {})}
            className="group flex border border-border bg-card transition-colors hover:border-primary/50 sm:flex-col"
          >
            {/* Mobile: thumbnail beside the text; sm+: wide image on top. */}
            <div className="relative w-28 shrink-0 overflow-hidden sm:w-auto">
              <img
                src={item.image.src}
                alt={item.image.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-[2/1] sm:h-auto"
              />
              <span className="absolute right-2.5 top-2.5 hidden bg-card px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground sm:block">
                {t.news.categories[item.category]}
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-3.5">
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground sm:hidden">
                {t.news.categories[item.category]}
              </p>
              <h3 className="mt-1 line-clamp-2 font-display text-lg italic leading-tight text-foreground sm:mt-0 sm:line-clamp-1">
                {item.title}
              </h3>
              <p className="mt-1.5 hidden line-clamp-2 text-xs leading-5 text-muted-foreground sm:block">
                {item.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-2 sm:mt-3 sm:pt-2.5">
                <time dateTime={item.date} className="text-[11px] text-muted-foreground">
                  {formatDate(item.date)}
                </time>
                <span className="inline-flex size-6 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
