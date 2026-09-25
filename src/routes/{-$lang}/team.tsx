import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, Check } from "lucide-react";

import teamImage from "@/assets/team-dubai.jpg";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { founders } from "@/data/company";
import { alternateLinks, fmt, getDictionary, localeFromParam, pageMeta, useT } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/team")({
  head: ({ params }) => ({
    meta: pageMeta(getDictionary(localeFromParam(params.lang)).meta.team),
    links: alternateLinks("/team"),
  }),
  component: Team,
});

function Team() {
  const { t } = useT();
  const copy = t.team;
  const { whoWeAre, howItWorks, founderRole } = t.company;
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <section className="relative min-h-[420px] overflow-hidden text-[var(--hero-foreground)] md:min-h-[480px]">
        <img
          src={teamImage}
          alt={t.home.teamImageAlt}
          width={1200}
          height={900}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hero-scrim)_0%,transparent_64%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--hero-scrim)_0%,transparent_38%)] opacity-75" />

        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end px-6 pb-12 pt-28 sm:px-10 md:min-h-[480px] md:px-16 md:pb-16 md:pt-32 lg:px-24">
          <p className="text-[11px] font-medium uppercase text-white/70">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-2xl font-sans text-4xl font-normal uppercase leading-[0.92] text-white md:text-6xl">
            {copy.title}
            <span className="block font-display text-[0.82em] normal-case italic">
              {copy.titleItalic}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {copy.heroCopy}
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 md:px-16 md:py-28 lg:px-24">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase text-muted-foreground">
              {copy.whoEyebrow}
            </p>
            <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
              {copy.whoTitle}
              <span className="block font-display text-[0.82em] normal-case italic">
                {copy.whoTitleItalic}
              </span>
            </h2>
          </div>
          <div className="border-t border-primary/35 pt-7">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground md:text-2xl">
              {whoWeAre.intro}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
              {whoWeAre.inspiration}
            </p>
            <p className="mt-8 text-[11px] font-medium uppercase text-muted-foreground">
              {copy.seeking}
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {whoWeAre.offerings.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-border pb-3 text-sm text-foreground"
                >
                  <Check className="size-4 shrink-0 text-accent" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-sm leading-7 text-muted-foreground">
              {whoWeAre.support} {whoWeAre.mission}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              {whoWeAre.team}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              {whoWeAre.closing}
            </p>
            <p className="mt-8 font-display text-2xl italic text-foreground md:text-3xl">
              {whoWeAre.motto}
            </p>
          </div>
        </div>
      </section>

      <section className="section-watermark border-t border-border px-6 py-20 sm:px-10 md:px-16 md:py-28 lg:px-24">
        <div className="relative z-10">
          <p className="text-[11px] font-medium uppercase text-muted-foreground">
            {copy.founderEyebrow}
          </p>
          <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
            {copy.founderTitle}
            <span className="block font-display text-[0.82em] normal-case italic">
              {copy.founderTitleItalic}
            </span>
          </h2>
          <div className="mt-12 grid gap-8 sm:max-w-sm">
            {founders.map((person) => (
              <article key={person.name} className="border border-border bg-card">
                <img
                  src={person.image}
                  alt={fmt(copy.portraitAlt, { name: person.name, role: founderRole })}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <div className="px-6 py-6">
                  <h3 className="font-display text-3xl italic text-foreground">{person.name}</h3>
                  <p className="mt-1 text-[11px] font-medium uppercase text-muted-foreground">
                    {founderRole}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-20 text-primary-foreground sm:px-10 md:px-16 md:py-28 lg:px-24">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase text-primary-foreground/70">
              {copy.howEyebrow}
            </p>
            <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] md:text-5xl">
              {copy.howTitle}
              <span className="block font-display text-[0.82em] normal-case italic">
                {copy.howTitleItalic}
              </span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/80">
              {howItWorks.intro}
            </p>
          </div>
          <ol className="grid gap-8 border-t border-primary-foreground/25 pt-8 sm:grid-cols-3">
            {howItWorks.steps.map((step) => (
              <li key={step.number}>
                <span className="font-display text-3xl italic">{step.number}</span>
                <h3 className="mt-5 text-sm font-medium uppercase">{step.title}</h3>
                <p className="mt-3 text-xs leading-6 text-primary-foreground/80">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-14 border-t border-primary-foreground/25 pt-10">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-none border border-primary-foreground bg-transparent px-8 text-xs uppercase text-primary-foreground shadow-none hover:bg-primary-foreground hover:text-primary"
          >
            <Link to="/{-$lang}/contact">
              {copy.getInTouch} <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
