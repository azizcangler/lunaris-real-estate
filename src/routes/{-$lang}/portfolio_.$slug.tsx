import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Check, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LineSidebar } from "@/components/line-sidebar";
import { LocationMap } from "@/components/location-map";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PinnedSteps } from "@/components/pinned-steps";
import { ScrollExpand } from "@/components/scroll-expand";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/data/company";
import type { ProjectDetails } from "@/data/projects";
import { alternateLinks, fmt, getDictionary, localeFromParam, useT, type Dictionary } from "@/i18n";
import { findDetailedProject } from "@/i18n/projects";

export const Route = createFileRoute("/{-$lang}/portfolio_/$slug")({
  loader: ({ params }) => {
    const project = findDetailedProject(localeFromParam(params.lang), params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData, params }) => {
    const locale = localeFromParam(params.lang);
    const project = loaderData ? findDetailedProject(locale, loaderData.slug) : undefined;
    if (!project) return {};
    const title = fmt(getDictionary(locale).meta.projectTitle, {
      name: project.name,
      developer: project.developer,
    });
    return {
      links: alternateLinks(`/portfolio/${project.slug}`),
      meta: [
        { title },
        { name: "description", content: project.details.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.details.summary },
        { property: "og:type", content: "website" },
        { property: "og:image", content: project.details.hero.src },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

const sectionPadding = "px-6 sm:px-10 md:px-16 lg:px-24";

function Eyebrow({ children, tone = "muted" }: { children: string; tone?: "muted" | "light" }) {
  const color = tone === "light" ? "text-primary-foreground/70" : "text-muted-foreground";
  return <p className={`text-[11px] font-medium uppercase ${color}`}>{children}</p>;
}

function SectionTitle({
  line,
  italic,
  size = "md",
}: {
  line: string;
  italic: string;
  size?: "md" | "lg";
}) {
  const sizing = size === "lg" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl";
  return (
    <h2 className={`mt-5 font-sans ${sizing} font-normal uppercase leading-[0.92]`}>
      {line}
      <span className="block font-display text-[0.82em] normal-case italic">{italic}</span>
    </h2>
  );
}

/** Compact multi-column checklist used when a project has no illustrated masterplan. */
function FeatureList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-x-8 border-t border-primary/35 pt-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 border-b border-border py-2.5 text-sm text-foreground"
        >
          <Check className="size-4 shrink-0 text-accent" aria-hidden="true" /> {item}
        </li>
      ))}
    </ul>
  );
}

type Villa = ProjectDetails["villas"]["items"][number];

function VillaCell({
  villa,
  index,
  onOpen,
  openLabel,
}: {
  villa: Villa;
  index: number;
  onOpen: () => void;
  openLabel: string;
}) {
  const [cover, hover] = villa.images;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${openLabel}${villa.bedrooms ? `, ${villa.bedrooms}` : ""}`}
      className="group relative block h-[38svh] w-full cursor-pointer overflow-hidden border-b border-border bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:h-[60vh]"
    >
      {cover ? (
        <img
          src={cover.src}
          alt={cover.alt}
          width={1600}
          height={801}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : null}
      {hover ? (
        <img
          src={hover.src}
          alt=""
          aria-hidden="true"
          width={1600}
          height={801}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.15)_45%,transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white sm:p-8">
        <div>
          <p className="text-[11px] font-medium uppercase text-white/75">
            {String(index + 1).padStart(2, "0")}
            {villa.bedrooms ? ` · ${villa.bedrooms}` : ""}
          </p>
          <h3 className="mt-2 font-display text-3xl italic md:text-4xl">{villa.name}</h3>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="mb-1 size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </button>
  );
}

function VillaDialogBody({
  villa,
  index,
  total,
  brochure,
  labels,
}: {
  villa: Villa;
  index: number;
  total: number;
  brochure: string;
  labels: Dictionary["project"];
}) {
  const [current, setCurrent] = useState(0);
  const image = villa.images[current] ?? villa.images[0];
  return (
    <div className="grid md:grid-cols-[1.1fr_0.9fr]">
      <div className="bg-muted">
        {image ? (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={1600}
            height={801}
            className="hero-reveal aspect-[4/3] w-full object-cover md:aspect-auto md:h-full md:max-h-[70svh]"
          />
        ) : null}
      </div>
      <div className="flex flex-col px-6 py-7 sm:px-8 md:py-10">
        <p className="text-[11px] font-medium uppercase text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          {villa.bedrooms ? ` · ${villa.bedrooms}` : ""}
          {villa.area ? ` · ${villa.area}` : ""}
        </p>
        <DialogTitle className="mt-3 font-sans text-3xl font-normal uppercase leading-[0.92] tracking-normal text-foreground md:text-4xl">
          {villa.name}
        </DialogTitle>
        <DialogDescription className="mt-5 text-sm leading-7 text-muted-foreground">
          {villa.copy}
        </DialogDescription>
        {villa.images.length > 1 ? (
          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label={labels.moreViews}>
            {villa.images.map((view, viewIndex) => (
              <button
                key={view.src}
                type="button"
                role="tab"
                aria-selected={viewIndex === current}
                aria-label={view.alt}
                onClick={() => setCurrent(viewIndex)}
                className={`aspect-[4/3] w-16 cursor-pointer overflow-hidden transition-opacity sm:w-20 ${
                  viewIndex === current
                    ? "opacity-100 ring-1 ring-primary"
                    : "opacity-50 hover:opacity-90"
                }`}
              >
                <img src={view.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 md:pt-8">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-none bg-primary px-6 text-xs uppercase text-primary-foreground shadow-none hover:bg-secondary hover:text-secondary-foreground"
          >
            <Link to="/{-$lang}/contact">
              {labels.requestAvailability}{" "}
              <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
            </Link>
          </Button>
          <a
            href={brochure}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent"
          >
            <FileText className="size-4" aria-hidden="true" /> {labels.floorPlansInBrochure}
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const { locale, t } = useT();
  const labels = t.project;
  const [openVilla, setOpenVilla] = useState<number | null>(null);
  const [openMasterplan, setOpenMasterplan] = useState(false);
  const project = findDetailedProject(locale, slug);
  if (!project) return null;
  const { details } = project;
  const { theme } = details;
  const stageFg = theme.stageForeground ?? "#efe9dc";
  const stageFgAt = (alpha: number) =>
    `color-mix(in oklab, ${stageFg} ${Math.round(alpha * 100)}%, transparent)`;
  // Texture behind the masterplan stage and the CTA, optionally deepened by a flat scrim.
  const textureBackground = details.coverTexture
    ? {
        backgroundImage: details.coverTextureScrim
          ? `linear-gradient(${details.coverTextureScrim}, ${details.coverTextureScrim}), url(${details.coverTexture.src})`
          : `url(${details.coverTexture.src})`,
      }
    : {};
  // Header cell + type cells + CTA cell: with an odd count the CTA cell spans the full row.
  const ctaSpansRow = (details.villas.items.length + 2) % 2 === 1;

  return (
    <main
      className="min-h-screen bg-background"
      style={
        {
          // Each project's primary colour follows its brochure palette (see `details.theme`).
          "--primary": theme.primary,
          "--primary-foreground": theme.primaryForeground,
          "--accent": theme.accent,
          "--ring": theme.ring ?? theme.primary,
          "--stage-fg": stageFg,
        } as React.CSSProperties
      }
    >
      {/* Overlay header: the hero stage must start at the very top so it pins from the first scrolled pixel. */}
      <SiteHeader overlay />

      {/* Hero: frame expands to full stage while scrolling */}
      <ScrollExpand
        src={details.hero.src}
        alt={details.hero.alt}
        coverSrc={details.cover?.src}
        coverAlt={details.cover?.alt}
        backdropColor={details.coverBackdrop}
        backdropSrc={details.coverTexture?.src}
        backdropScrim={details.coverTextureHeroScrim}
        title={project.name}
        subtitle={details.titleItalic}
        eyebrow={details.eyebrow}
        scrollHint={labels.scrollHint}
        useWindowScroll
        startWidth={42}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.35}
        scrollDistance={0.9}
        holdDistance={0.15}
        smoothing={0.3}
        overlayScrim={0}
        enabled
        topSlot={
          <Link
            to="/{-$lang}/portfolio"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase text-white/75 hover:text-white"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" /> {labels.allProjects}
          </Link>
        }
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {details.summary}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase text-white/85">
            {details.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1 bg-white/70" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </ScrollExpand>

      {/* Intro + facts */}
      <section className={`py-20 md:py-28 ${sectionPadding}`}>
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <Eyebrow>{labels.aboutProject}</Eyebrow>
            <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
              {details.intro.heading}
              <span className="block font-display text-[0.82em] normal-case italic">
                {details.intro.headingItalic}
              </span>
            </h2>
            <img
              src={details.intro.image.src}
              alt={details.intro.image.alt}
              loading="lazy"
              style={{ aspectRatio: details.intro.imageAspect ?? "4 / 3" }}
              className="mt-10 w-full object-cover md:max-w-md"
            />
          </div>
          <div className="border-t border-primary/35 pt-7">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground md:text-2xl">
              {details.intro.copy[0]}
            </p>
            {details.intro.copy.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {details.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-3"
                >
                  <dt className="text-[11px] font-medium uppercase text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="text-right text-sm text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none bg-primary px-8 text-xs uppercase text-primary-foreground shadow-none hover:bg-secondary hover:text-secondary-foreground"
              >
                <Link to="/{-$lang}/contact">
                  {labels.requestAvailability}{" "}
                  <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
                </Link>
              </Button>
              <a
                href={project.brochure}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent"
              >
                <FileText className="size-4" aria-hidden="true" /> {labels.downloadBrochure}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location: the area map is the section backdrop, copy sits on a soft scrim over it */}
      <section className="relative overflow-hidden border-t border-border">
        {details.location.mapSvg ? (
          <>
            {/* Mobile: map is a band at the bottom under the copy. md+: map fills the section, copy sits on a left scrim. */}
            <LocationMap
              svg={details.location.mapSvg}
              vars={details.location.mapVars}
              cover
              className="absolute inset-x-0 bottom-0 h-[460px] md:inset-0 md:h-auto"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,var(--background)_0%,var(--background)_calc(100%-460px),color-mix(in_oklab,var(--background)_70%,transparent)_calc(100%-330px),transparent_calc(100%-200px))] md:bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_88%,transparent)_38%,color-mix(in_oklab,var(--background)_35%,transparent)_56%,transparent_72%)]"
            />
          </>
        ) : (
          <img
            src={details.location.image.src}
            alt={details.location.image.alt}
            width={1600}
            height={801}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}
        <div
          className={`relative z-10 pb-[300px] pt-20 md:py-28 lg:min-h-[860px] ${sectionPadding}`}
        >
          <div className="max-w-xl">
            <Eyebrow>{labels.location}</Eyebrow>
            <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
              {details.location.heading}
              <span className="block font-display text-[0.82em] normal-case italic">
                {details.location.headingItalic}
              </span>
            </h2>
            {details.location.copy.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-sm leading-7 text-foreground/80">
                {paragraph}
              </p>
            ))}
            <dl className="mt-10 border-t border-primary/35">
              {details.location.distances.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-3"
                >
                  <dt className="text-sm text-foreground">{item.label}</dt>
                  <dd className="shrink-0 font-display text-xl italic text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            {details.location.mapCaption ? (
              <p className="mt-6 text-[11px] font-medium uppercase text-muted-foreground">
                {details.location.mapCaption}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Masterplan: pinned stage, scrolling steps through the six pillars one at a time */}
      <PinnedSteps
        count={details.masterplan.pillars.length}
        stepDistance={0.5}
        mobileStepDistance={0.4}
      >
        {({ active, goTo }) => {
          const pillars = details.masterplan.pillars;
          const pillar = pillars[active];
          const stage = details.coverBackdrop ?? "#42473a";
          return (
            <div
              className={`flex h-full flex-col justify-center bg-cover bg-center py-3 text-(--stage-fg) md:py-6 ${sectionPadding}`}
              style={{ backgroundColor: stage, ...textureBackground }}
            >
              <div className="grid gap-5 md:grid-cols-[0.8fr_0.85fr_1.15fr] md:items-center md:gap-12 lg:gap-16">
                {/* Heading + step navigator */}
                <div>
                  <p className="text-[11px] font-medium uppercase text-(--stage-fg)/60">
                    {details.masterplan.eyebrow}
                  </p>
                  <h2 className="mt-2 font-sans text-2xl font-normal uppercase leading-[0.92] md:mt-5 md:text-5xl">
                    {details.masterplan.heading}
                    <span className="block font-display text-[0.82em] normal-case italic">
                      {details.masterplan.headingItalic}
                    </span>
                  </h2>
                  <p className="mt-6 hidden max-w-sm text-sm leading-7 text-(--stage-fg)/70 lg:block">
                    {details.masterplan.copy[0]}
                  </p>
                  <LineSidebar
                    aria-label={details.masterplan.navLabel}
                    className="mt-4 md:mt-10"
                    items={pillars.map((item) => item.title)}
                    activeIndex={active}
                    onItemClick={(index) => goTo(index)}
                    accentColor={stageFg}
                    textColor={stageFgAt(0.45)}
                    markerColor={stageFgAt(0.3)}
                    showIndex
                    showMarker
                    proximityRadius={100}
                    maxShift={30}
                    falloff="smooth"
                    markerLength={60}
                    markerGap={0}
                    tickScale={0.5}
                    scaleTick
                    itemGap={6}
                    fontSize={0.7}
                    smoothing={100}
                    defaultActive={0}
                  />
                </div>

                {/* Step image */}
                <div
                  className="will-change-transform"
                  style={{
                    transform: "translateY(calc(var(--step-local, 0) * -6px))",
                  }}
                >
                  <div className="relative aspect-[16/9] max-h-[22svh] w-full overflow-hidden md:aspect-[4/5] md:max-h-[70svh]">
                    {pillars.map((item, index) =>
                      item.image ? (
                        <img
                          key={item.image.src}
                          src={item.image.src}
                          alt={item.image.alt}
                          width={1600}
                          height={1200}
                          loading={index === 0 ? "eager" : "lazy"}
                          style={{ objectPosition: item.image.position }}
                          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                            index === active ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      ) : null,
                    )}
                  </div>
                </div>

                {/* Step text */}
                <div>
                  <div
                    className="will-change-transform"
                    style={{
                      transform: "translateY(calc(var(--step-local, 0) * -10px))",
                    }}
                  >
                    <div
                      key={`text-${active}`}
                      className="step-reveal"
                      role="group"
                      aria-live="polite"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-4xl italic leading-none md:text-8xl">
                          {String(active + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] font-medium uppercase text-(--stage-fg)/50">
                          / {String(pillars.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-3 font-sans text-xl font-normal uppercase leading-[0.95] md:mt-6 md:text-4xl">
                        {pillar?.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 max-w-xl text-[13px] leading-5 text-(--stage-fg)/80 md:mt-5 md:line-clamp-none md:text-base md:leading-8">
                        {pillar?.copy}
                      </p>
                      {pillar?.stats?.length ? (
                        <dl
                          className={`mt-3 grid gap-x-4 gap-y-3 border-t border-(--stage-fg)/20 pt-3 md:mt-10 md:gap-x-6 md:gap-y-6 md:pt-6 ${
                            pillar.stats.length >= 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-3"
                          }`}
                        >
                          {pillar.stats.map((stat) => (
                            <div key={stat.label}>
                              <dd className="font-display text-2xl italic md:text-5xl">
                                {stat.value}
                              </dd>
                              <dt className="mt-1 text-[11px] leading-4 text-(--stage-fg)/70 md:mt-2 md:text-xs md:leading-5">
                                {stat.label}
                              </dt>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-3 h-px w-full bg-(--stage-fg)/15 md:mt-12" aria-hidden="true">
                    <div
                      className="h-px origin-left bg-(--stage-fg)/70 will-change-transform"
                      style={{ transform: "scaleX(var(--steps-progress, 0))" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </PinnedSteps>

      {/* Key features: numbered legend beside the illustrated masterplan; the full poster opens in a dialog */}
      <section
        className={`section-watermark border-t border-border py-20 md:py-28 ${sectionPadding}`}
      >
        {details.keyFeaturesMap ? (
          <div className="relative z-10 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <div>
              <Eyebrow>{labels.keyFeatures}</Eyebrow>
              <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
                {details.keyFeaturesHeading.line}
                <span className="block font-display text-[0.82em] normal-case italic">
                  {details.keyFeaturesHeading.italic}
                </span>
              </h2>
              <ol className="mt-10 grid gap-y-3 border-t border-primary/35 pt-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {details.keyFeaturesMap.legend.map((item, index) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/50 font-display text-sm italic text-primary">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => setOpenMasterplan(true)}
                className="mt-8 inline-flex cursor-pointer items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent"
              >
                {labels.openMasterplan} <ArrowUpRight className="size-4" aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setOpenMasterplan(true)}
              aria-label={labels.openMasterplan}
              className="group relative block cursor-pointer self-start overflow-hidden border border-border bg-[#dfdbcf] text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={details.keyFeaturesMap.plan.src}
                alt={details.keyFeaturesMap.plan.alt}
                loading="lazy"
                style={{ aspectRatio: details.keyFeaturesMap.planAspect ?? "819 / 875" }}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 bg-background/90 px-3 py-2 text-[11px] font-medium uppercase text-foreground backdrop-blur">
                {labels.tapToEnlarge} <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </button>
          </div>
        ) : (
          /* No masterplan poster: heading (and optional photo) above a compact multi-column checklist */
          <div className="relative z-10">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-20">
              <div>
                <Eyebrow>{labels.keyFeatures}</Eyebrow>
                <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
                  {details.keyFeaturesHeading.line}
                  <span className="block font-display text-[0.82em] normal-case italic">
                    {details.keyFeaturesHeading.italic}
                  </span>
                </h2>
              </div>
              {details.keyFeaturesImage ? (
                <img
                  src={details.keyFeaturesImage.src}
                  alt={details.keyFeaturesImage.alt}
                  loading="lazy"
                  className="aspect-[2/1] w-full bg-muted object-cover"
                />
              ) : null}
            </div>
            <FeatureList items={details.keyFeatures} className="mt-10 grid-cols-2 lg:grid-cols-4" />
          </div>
        )}
      </section>

      {details.keyFeaturesMap ? (
        <Dialog open={openMasterplan} onOpenChange={setOpenMasterplan}>
          <DialogContent className="max-h-[94svh] w-[min(96vw,60rem)] max-w-none gap-0 overflow-y-auto rounded-none border-border bg-[#e7e2d6] p-0 sm:rounded-none">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-[#e7e2d6]/95 px-5 py-3 pr-14 backdrop-blur">
              <DialogTitle className="font-sans text-sm font-medium uppercase tracking-normal text-foreground">
                {labels.masterplanDialogTitle}
              </DialogTitle>
              <DialogDescription className="hidden text-[11px] uppercase text-muted-foreground sm:block">
                {labels.masterplanDialogCopy}
              </DialogDescription>
            </div>
            <img
              src={details.keyFeaturesMap.poster.src}
              alt={details.keyFeaturesMap.poster.alt}
              className="block w-full"
            />
          </DialogContent>
        </Dialog>
      ) : null}

      {/* Gardens */}
      {details.gardens ? (
        <section className="border-t border-border">
          <div className={`py-20 md:py-28 ${sectionPadding}`}>
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
              <div>
                <Eyebrow>{details.gardens.eyebrow}</Eyebrow>
                <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
                  {details.gardens.heading}
                  <span className="block font-display text-[0.82em] normal-case italic">
                    {details.gardens.headingItalic}
                  </span>
                </h2>
              </div>
              <p className="max-w-xl border-t border-primary/35 pt-7 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                {details.gardens.copy}
              </p>
            </div>
          </div>
          <div className="grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {details.gardens.items.map((garden, index) => (
              <article
                key={garden.name}
                className="flex flex-col border-b border-border md:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r"
              >
                <div className="overflow-hidden bg-muted">
                  <img
                    src={garden.image.src}
                    alt={garden.image.alt}
                    width={1400}
                    height={1196}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 py-7 sm:px-8">
                  <p className="text-[10px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-3xl italic text-foreground">
                    {garden.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{garden.copy}</p>
                  <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5 pt-6 text-[11px] uppercase text-foreground">
                    {garden.features.map((feature) => (
                      <li
                        key={feature}
                        className="after:ml-3 after:text-border after:content-['·'] last:after:content-none"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Villas: header cell shares a two-column grid with the villa type cells; a cell opens its type in a dialog */}
      <section className="border-t border-border">
        <div className="grid md:grid-cols-2 md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(odd)]:border-border">
          <div
            className={`flex flex-col justify-center border-b border-border py-16 md:h-[60vh] md:py-0 ${sectionPadding}`}
          >
            <Eyebrow>{details.villas.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-sans text-[clamp(var(--villas-min),5.5vw,5.25rem)] font-normal uppercase leading-[0.88] text-foreground">
              {details.villas.heading}
              <span className="block font-display text-[0.62em] normal-case italic">
                {details.villas.headingItalic}
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              {details.villas.copy[0]}
            </p>
            <p className="mt-8 inline-flex items-center gap-3 text-[11px] font-medium uppercase text-muted-foreground">
              <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
              {details.villas.items.length} {details.villas.unitLabel} · {labels.selectOne}
            </p>
          </div>
          {details.villas.items.map((villa, index) => (
            <VillaCell
              key={villa.name}
              villa={villa}
              index={index}
              onOpen={() => setOpenVilla(index)}
              openLabel={fmt(labels.openType, { name: villa.name })}
            />
          ))}
          <Link
            to="/{-$lang}/contact"
            className={`group relative block h-[38svh] overflow-hidden border-b border-border bg-muted md:h-[60vh] ${
              ctaSpansRow ? "md:col-span-2 md:border-r-0!" : ""
            }`}
          >
            <img
              src={details.villas.image.src}
              alt={details.villas.image.alt}
              width={1600}
              height={801}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.15)_45%,transparent_70%)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white sm:p-8">
              <div>
                <p className="text-[11px] font-medium uppercase text-white/75">
                  {labels.floorPlansPricing}
                </p>
                <h3 className="mt-2 font-display text-3xl italic md:text-4xl">
                  {labels.requestAvailability}
                </h3>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="mb-1 size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </Link>
        </div>
      </section>

      <Dialog open={openVilla !== null} onOpenChange={(open) => (open ? null : setOpenVilla(null))}>
        <DialogContent className="max-h-[92svh] w-[min(96vw,64rem)] max-w-none gap-0 overflow-y-auto rounded-none border-border bg-background p-0 sm:rounded-none">
          {openVilla !== null && details.villas.items[openVilla] ? (
            <VillaDialogBody
              key={openVilla}
              villa={details.villas.items[openVilla]!}
              index={openVilla}
              total={details.villas.items.length}
              brochure={project.brochure}
              labels={labels}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Gallery: remaining community shots */}
      {details.gallery.length ? (
        <section className={`border-t border-border py-20 md:py-28 ${sectionPadding}`}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>{labels.gallery}</Eyebrow>
              <h2 className="mt-4 font-display text-4xl italic text-foreground md:text-5xl">
                {details.galleryHeading}
              </h2>
            </div>
            <a
              href={project.brochure}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent sm:inline-flex"
            >
              {labels.fullBrochure} <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.gallery.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={1600}
                height={801}
                loading="lazy"
                className="aspect-[4/3] w-full bg-muted object-cover"
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Materials + developer */}
      <section className={`border-t border-border py-20 md:py-28 ${sectionPadding}`}>
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          {details.materials ? (
            <div>
              <Eyebrow>{labels.materialBoard}</Eyebrow>
              <h2 className="mt-5 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-4xl">
                {details.materials.heading.line}
                <span className="block font-display text-[0.82em] normal-case italic">
                  {details.materials.heading.italic}
                </span>
              </h2>
              <ul className="mt-8 max-w-md border-t border-primary/35">
                {details.materials.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-border py-3 text-sm text-foreground"
                  >
                    <Check className="size-4 shrink-0 text-accent" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div>
            <Eyebrow>{labels.aboutDeveloper}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl italic text-foreground md:text-5xl">
              {details.developer.name}
            </h2>
            <img
              src={details.developer.image.src}
              alt={details.developer.image.alt}
              width={1400}
              height={1196}
              loading="lazy"
              className="mt-8 aspect-[16/10] w-full object-cover"
            />
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
              {details.developer.copy}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className={`bg-primary bg-cover bg-center py-20 text-primary-foreground md:py-28 ${sectionPadding}`}
        style={{
          backgroundColor: details.coverBackdrop ?? undefined,
          ...textureBackground,
        }}
      >
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-20">
          <div>
            <Eyebrow tone="light">{labels.nextStep}</Eyebrow>
            <h2 className="mt-5 font-sans text-4xl font-normal uppercase leading-[0.92] md:text-6xl">
              {labels.interestedIn}
              <span className="block font-display text-[0.82em] normal-case italic">
                {project.name}?
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-primary-foreground/80">
              {labels.ctaCopy}
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t border-primary-foreground/25 pt-8 md:border-t-0 md:pt-0">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none border border-primary-foreground bg-primary-foreground px-8 text-xs uppercase text-primary shadow-none hover:bg-transparent hover:text-primary-foreground"
            >
              <Link to="/{-$lang}/contact">
                {labels.requestAvailability}{" "}
                <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none border border-primary-foreground bg-transparent px-8 text-xs uppercase text-primary-foreground shadow-none hover:bg-primary-foreground hover:text-primary"
            >
              <a href={company.whatsapp} target="_blank" rel="noreferrer">
                {labels.chatOnWhatsApp} <ArrowUpRight aria-hidden="true" className="ml-2 size-4" />
              </a>
            </Button>
            <a
              href={project.brochure}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase text-primary-foreground/80 hover:text-primary-foreground"
            >
              <FileText className="size-4" aria-hidden="true" /> {labels.downloadBrochure}
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
