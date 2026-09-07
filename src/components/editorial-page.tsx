import { ArrowDownRight, Check } from "lucide-react";

import heroImage from "@/assets/dubai-villas-hero-v2.jpg";
import { SiteHeader } from "@/components/site-header";

type EditorialPageProps = {
  eyebrow: string;
  title: string;
  italicTitle: string;
  introduction: string;
  points: { number: string; title: string; copy: string }[];
  checklist: string[];
};

export function EditorialPage({ eyebrow, title, italicTitle, introduction, points, checklist }: EditorialPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="px-6 pb-16 pt-20 sm:px-10 md:px-16 md:pb-24 md:pt-28 lg:px-24">
        <p className="text-[11px] font-medium uppercase text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-sans text-[clamp(3rem,7vw,7rem)] font-normal uppercase leading-[0.86] text-foreground">
          {title}
          <span className="block font-display text-[0.62em] normal-case italic">{italicTitle}</span>
        </h1>
        <div className="mt-14 grid gap-10 border-t border-border pt-8 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <p className="max-w-md text-sm leading-7 text-muted-foreground">{introduction}</p>
          <div className="grid gap-8 sm:grid-cols-3">
            {points.map((point) => (
              <article key={point.number}>
                <span className="font-display text-3xl italic text-accent">{point.number}</span>
                <h2 className="mt-5 text-sm font-medium uppercase text-foreground">{point.title}</h2>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">{point.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-primary text-primary-foreground md:grid-cols-2">
        <img src={heroImage} alt="Modern Dubai villa with an infinity pool overlooking the sea at golden hour" width={1920} height={1088} loading="lazy" className="h-full min-h-96 w-full object-cover" />
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-16 lg:px-24">
          <p className="font-display text-4xl italic">A considered path, from brief to keys.</p>
          <ul className="mt-10 space-y-5">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-primary-foreground/25 pb-5 text-sm">
                <Check className="size-4 shrink-0" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
          <span className="mt-10 inline-flex items-center gap-2 text-xs font-medium uppercase">
            Private consultation <ArrowDownRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </section>
    </main>
  );
}