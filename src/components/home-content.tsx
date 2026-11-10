import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import teamImage from "@/assets/team-dubai.jpg";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/faq-section";
import { NewsSection } from "@/components/news-section";
import { DeveloperBelt, ProjectCoverflow } from "@/components/project-coverflow";
import { ProjectLink } from "@/components/project-link";
import { SiteFooter } from "@/components/site-footer";
import { WhySection } from "@/components/why-section";
import { fmt, useT } from "@/i18n";
import { getFeaturedProjects, getProjects } from "@/i18n/projects";

/** Everything on the home page below the site header: shared by `/` and the `/intro` demo. */
export function HomeContent({ belowIntro = false }: { belowIntro?: boolean } = {}) {
  const { locale, t } = useT();
  const projects = getProjects(locale);
  const featuredProjects = getFeaturedProjects(locale);
  // Hero carousel: the featured trio first, then the next most-asked-for developments.
  const popularProjects = projects.slice(0, 7);
  const developers = [...new Set(projects.map((project) => project.developer))];
  const { company, home } = t;

  return (
    <>
      {/* Hero: split layout with the popular projects in a coverflow carousel (shadcnblocks hero231) */}
      <section className="border-b border-border px-5 py-10 sm:px-10 md:px-16 md:py-20 lg:px-24 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="hero-reveal flex min-w-0 flex-col">
            <h1 className="max-w-[640px] font-sans text-[clamp(var(--hero-min),5.4vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
              {home.heroTitle}
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              {home.heroCopy}
            </p>
            <div className="mt-10 flex flex-wrap gap-3 lg:mt-auto lg:pt-16">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-11 rounded-full px-6 text-sm font-medium shadow-none"
              >
                <Link to="/{-$lang}/portfolio">
                  {home.viewPortfolio}
                  <ArrowUpRight aria-hidden="true" className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-none hover:bg-foreground/85"
              >
                <Link to="/{-$lang}/contact">
                  {home.requestConsultation}
                  <ArrowUpRight aria-hidden="true" className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile: images first, copy underneath; desktop: copy left, images right. */}
          <div className="hero-reveal hero-reveal-delayed order-first min-w-0 lg:order-none">
            <p className="inline-flex w-fit items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              {home.popularProjects}
            </p>
            <DeveloperBelt names={developers} className="mt-5" />
            <ProjectCoverflow projects={popularProjects} className="mt-4" eager={!belowIntro} />
          </div>
        </div>
      </section>

      <section className="section-watermark section-watermark-inverted bg-[#5c4a3d] px-5 py-14 sm:px-10 md:px-16 md:py-28 lg:px-24">
        <div className="relative z-10 grid gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-20 lg:gap-32">
          <div>
            <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d8c3a0]">
              <span aria-hidden="true" className="h-px w-8 bg-[#d8c3a0]/70" />
              {home.whoAreWe}
            </p>
            <h2 className="mt-6 max-w-lg font-editorial text-4xl leading-[1.08] text-white md:text-[3.5rem]">
              {home.whoTitle}
              <span className="block text-[#d8c3a0]">{home.whoTitleItalic}</span>
            </h2>
          </div>
          <div className="md:mt-1">
            <div className="flex justify-center md:justify-start">
              <img
                src={teamImage}
                alt={home.teamImageAlt}
                width={1600}
                height={1000}
                loading="lazy"
                className="aspect-[16/10] w-full max-w-[420px] object-cover object-center md:max-w-none"
              />
            </div>
            <div className="mt-6 border-t border-white/20 pt-6 md:mt-8 md:pt-7">
              <p className="max-w-2xl font-editorial text-xl leading-[1.5] text-white/90 md:text-[1.65rem]">
                {company.whoWeAre.intro}
              </p>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 md:mt-8">
                {company.whoWeAre.inspiration} {company.whoWeAre.support}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 w-full rounded-none border border-white/60 bg-transparent px-8 text-xs uppercase tracking-[0.16em] text-white shadow-none hover:bg-white hover:text-[#5c4a3d] md:w-auto"
              >
                <Link to="/{-$lang}/team">
                  {home.meetTheTeam} <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-watermark border-t border-border px-5 py-14 sm:px-10 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 mb-7 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <p className="text-[11px] font-medium uppercase text-muted-foreground">
              {home.ourPortfolio}
            </p>
            <h2 className="mt-4 font-editorial text-4xl text-foreground md:text-5xl">
              {home.selectedProjects}
            </h2>
          </div>
          <Link
            to="/{-$lang}/portfolio"
            className="hidden items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent sm:inline-flex"
          >
            {home.viewAll} <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="relative z-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectLink
              key={project.slug}
              project={project}
              className="group block border border-border bg-card"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={fmt(home.renderAlt, { name: project.name, developer: project.developer })}
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>
              <div className="flex min-h-28 items-start justify-between gap-4 p-5">
                <div>
                  <p className="text-[10px] text-muted-foreground">0{index + 1}</p>
                  <h3 className="mt-2 font-editorial text-2xl text-foreground">{project.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.developer} · {project.location}
                  </p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </ProjectLink>
          ))}
        </div>

        <Link
          to="/{-$lang}/portfolio"
          className="relative z-10 mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent sm:hidden"
        >
          {home.viewAllProjects} <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </section>

      <WhySection />

      <NewsSection className="border-t border-border" />
      <FaqSection className="border-t border-border bg-secondary/40" />

      <SiteFooter />
    </>
  );
}
