import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";

import teamImage from "@/assets/team-dubai.jpg";
import { Button } from "@/components/ui/button";
import { DeveloperBelt, ProjectCoverflow } from "@/components/project-coverflow";
import { ProjectLink } from "@/components/project-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { howItWorks, strengths, whoWeAre, whyChooseUs } from "@/data/company";
import { featuredProjects, projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dubai Luxury Real Estate | Lunaris" },
      {
        name: "description",
        content:
          "Find your exclusive home in Dubai. Lunaris Real Estate offers tailored property solutions for living, investing and renting, guided from first conversation to handover.",
      },
      { property: "og:title", content: "Dubai Luxury Real Estate | Lunaris" },
      {
        property: "og:description",
        content: "Selected Dubai developments with personal, end-to-end advisory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Hero carousel: the featured trio first, then the next most-asked-for developments.
const popularProjects = projects.slice(0, 7);
const developers = [...new Set(projects.map((project) => project.developer))];

function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      {/* Hero: split layout with the popular projects in a coverflow carousel (shadcnblocks hero231) */}
      <section className="border-b border-border px-5 py-10 sm:px-10 md:px-16 md:py-20 lg:px-24 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="hero-reveal flex min-w-0 flex-col">
            {/* Points at the carousel: above the copy on mobile, to the right on desktop. */}
            <p className="inline-flex w-fit items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              Popular projects in Dubai
              <ArrowUp aria-hidden="true" className="size-3.5 text-primary lg:hidden" />
              <ArrowRight aria-hidden="true" className="hidden size-3.5 text-primary lg:block" />
            </p>
            <h1 className="mt-8 max-w-[640px] font-sans text-[clamp(2.75rem,5.4vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
              Find your exclusive home in Dubai.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              We redefine the property journey in Dubai through innovation, elegance, and trust,
              with a client-first approach and global standards.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 lg:mt-auto lg:pt-16">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-11 rounded-full px-6 text-sm font-medium shadow-none"
              >
                <Link to="/portfolio">
                  View the portfolio
                  <ArrowUpRight aria-hidden="true" className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-none hover:bg-foreground/85"
              >
                <Link to="/contact">
                  Request a consultation
                  <ArrowUpRight aria-hidden="true" className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile: images first, copy underneath; desktop: copy left, images right. */}
          <div className="hero-reveal hero-reveal-delayed order-first min-w-0 lg:order-none">
            <DeveloperBelt names={developers} />
            <ProjectCoverflow projects={popularProjects} className="mt-6" />
          </div>
        </div>
      </section>

      <section className="section-watermark section-watermark-inverted bg-[#5c4a3d] px-5 py-14 sm:px-10 md:px-16 md:py-28 lg:px-24">
        <div className="relative z-10 grid gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-20 lg:gap-32">
          <div>
            <p className="text-[11px] font-medium uppercase text-white/65">Who are we</p>
            <h2 className="mt-5 max-w-lg font-sans text-4xl font-normal uppercase leading-[0.92] text-white md:text-6xl">
              Local insight,
              <span className="block font-display text-[0.82em] normal-case italic">
                personal guidance
              </span>
            </h2>
          </div>
          <div className="md:mt-1">
            <div className="flex justify-center md:justify-end">
              <img
                src={teamImage}
                alt="Lunaris advisory team reviewing property plans in a Dubai office"
                width={400}
                height={300}
                loading="lazy"
                className="aspect-[16/10] w-full max-w-[420px] object-cover object-center md:aspect-[4/3] md:max-w-[320px]"
              />
            </div>
            <div className="mt-6 border-t border-white/20 pt-6 md:mt-8 md:pt-7">
              <p className="max-w-2xl text-base leading-relaxed text-white md:text-2xl md:leading-relaxed">
                {whoWeAre.intro}
              </p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:mt-8">
                {whoWeAre.inspiration} {whoWeAre.support}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 w-full rounded-none border border-white bg-transparent px-8 text-xs uppercase text-white shadow-none hover:bg-white hover:text-[#5c4a3d] md:w-auto"
              >
                <Link to="/team">
                  Meet the team <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-watermark border-t border-border px-5 py-14 sm:px-10 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 mb-7 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <p className="text-[11px] font-medium uppercase text-muted-foreground">Our portfolio</p>
            <h2 className="mt-4 font-display text-4xl italic text-foreground md:text-5xl">
              Selected projects
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="hidden items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent sm:inline-flex"
          >
            View all <ArrowUpRight aria-hidden="true" className="size-4" />
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
                  alt={`Architectural rendering of ${project.name} by ${project.developer}`}
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>
              <div className="flex min-h-28 items-start justify-between gap-4 p-5">
                <div>
                  <p className="text-[10px] text-muted-foreground">0{index + 1}</p>
                  <h3 className="mt-2 font-display text-2xl italic text-foreground">
                    {project.name}
                  </h3>
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
          to="/portfolio"
          className="relative z-10 mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent sm:hidden"
        >
          View all projects <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </section>

      <section className="border-t border-border bg-secondary/40 px-5 py-14 sm:px-10 md:px-16 md:py-24 lg:px-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase text-muted-foreground">
              Why clients choose us
            </p>
            <h2 className="mt-5 font-sans text-4xl font-normal uppercase leading-[0.92] text-foreground md:text-6xl">
              Your trusted
              <span className="block font-display text-[0.82em] normal-case italic">
                partner in Dubai
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              {whyChooseUs.intro}
            </p>
          </div>
          <div className="grid gap-8 border-t border-primary/35 pt-8 sm:grid-cols-3">
            {strengths.map((item, index) => (
              <article key={item.title}>
                <span className="font-display text-3xl italic text-accent">0{index + 1}</span>
                <h3 className="mt-5 text-sm font-medium uppercase text-foreground">{item.title}</h3>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">{item.copy}</p>
              </article>
            ))}
            {whyChooseUs.points.map((item, index) => (
              <article key={item.title} className="sm:col-span-1">
                <span className="font-display text-3xl italic text-accent">
                  0{strengths.length + index + 1}
                </span>
                <h3 className="mt-5 text-sm font-medium uppercase text-foreground">{item.title}</h3>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-10 md:px-16 md:py-24 lg:px-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase text-primary-foreground/70">
              How it works
            </p>
            <h2 className="mt-5 font-sans text-4xl font-normal uppercase leading-[0.92] md:text-6xl">
              Simple
              <span className="block font-display text-[0.82em] normal-case italic">
                and stress-free
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
        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/25 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-display text-2xl italic md:text-3xl">
            Ready to find your next property?
          </p>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-none border border-primary-foreground bg-transparent px-8 text-xs uppercase text-primary-foreground shadow-none hover:bg-primary-foreground hover:text-primary md:w-auto"
          >
            <Link to="/contact">
              Get in touch <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
