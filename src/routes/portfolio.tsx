import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectLink } from "@/components/project-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Exclusive Projects | Lunaris" },
      {
        name: "description",
        content:
          "Discover our exclusive collection of handpicked Dubai developments, curated for refined living, prime locations and standout investment opportunities.",
      },
      { property: "og:title", content: "Exclusive Projects | Lunaris" },
      { property: "og:description", content: "Exclusive projects, crafted for the exceptional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <header className="px-6 pb-14 pt-20 sm:px-10 md:px-16 md:pb-20 md:pt-28 lg:px-24">
        <p className="text-[11px] font-medium uppercase text-muted-foreground">
          Exclusive selections
        </p>
        <h1 className="mt-5 max-w-5xl font-sans text-[clamp(3rem,7vw,7rem)] font-normal uppercase leading-[0.86] text-foreground">
          Exclusive projects
          <span className="block font-display text-[0.62em] normal-case italic">
            crafted for the exceptional
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground">
          Discover our exclusive collection of handpicked properties, curated for those who seek
          refined living, prime locations, and investment opportunities that stand out from the
          ordinary.
        </p>
      </header>
      <section className="grid border-t border-border md:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            id={project.slug}
            className="group flex flex-col border-b border-border md:odd:border-r"
          >
            {project.details ? (
              <ProjectLink project={project} className="block overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={`Architectural rendering of ${project.name} by ${project.developer}`}
                  width={900}
                  height={1100}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </ProjectLink>
            ) : (
              <div className="overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={`Architectural rendering of ${project.name} by ${project.developer}`}
                  width={900}
                  height={1100}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col px-6 py-7 sm:px-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} · {project.developer}
                  </p>
                  <h2 className="mt-2 font-display text-3xl italic text-foreground">
                    {project.details ? (
                      <ProjectLink project={project} className="hover:text-primary">
                        {project.name}
                      </ProjectLink>
                    ) : (
                      project.name
                    )}
                  </h2>
                  <p className="mt-2 text-xs text-muted-foreground">{project.location}</p>
                </div>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-5 text-sm font-medium uppercase text-foreground">
                {project.headline}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 pt-6">
                {project.details ? (
                  <ProjectLink
                    project={project}
                    className="inline-flex items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent"
                  >
                    Explore the project <ArrowUpRight className="size-4" aria-hidden="true" />
                  </ProjectLink>
                ) : null}
                <a
                  href={project.brochure}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent"
                >
                  <FileText className="size-4" aria-hidden="true" /> Read the brochure (PDF)
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="px-6 py-14 sm:px-10 md:px-16 md:py-20 lg:px-24">
        <div className="grid gap-8 border-t border-border pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
              Discover all
              <span className="block font-display text-[0.82em] normal-case italic">
                our projects
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              Explore our full portfolio of residential and commercial developments, crafted with
              modern design, ideal locations, and exceptional investment potential. Ask us for the
              latest availability and pricing.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-none bg-primary px-8 text-xs uppercase text-primary-foreground shadow-none hover:bg-secondary hover:text-secondary-foreground"
          >
            <Link to="/contact">
              Request availability <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
