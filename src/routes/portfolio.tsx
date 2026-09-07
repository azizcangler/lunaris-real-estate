import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import binghattiImage from "@/assets/portfolio-binghatti.jpg";
import dwtnImage from "@/assets/portfolio-dwtn.jpg";
import samanaImage from "@/assets/portfolio-samana.jpg";
import { SiteHeader } from "@/components/site-header";

const projects = [
  { name: "Mercedes-Benz Places", detail: "Binghatti City · Dubai", image: binghattiImage },
  { name: "Samana Resort", detail: "Dubai Production City", image: samanaImage },
  { name: "Binghatti Aquarise", detail: "Fluid-design luxury residences", image: dwtnImage },
  { name: "Binghatti Flare", detail: "A sculptural residential statement", image: binghattiImage },
  { name: "Binghatti Skyrise", detail: "Business Bay · Dubai", image: dwtnImage },
  { name: "Chelsea Residences", detail: "Damac · Dubai waterfront", image: samanaImage },
] as const;

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [
    { title: "Dubai Property Portfolio | Lunaris" },
    { name: "description", content: "Explore a curated selection of distinctive new-build property projects in Dubai." },
    { property: "og:title", content: "Dubai Property Portfolio | Lunaris" },
    { property: "og:description", content: "A considered collection of distinctive Dubai residences." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <header className="px-6 pb-14 pt-20 sm:px-10 md:px-16 md:pb-20 md:pt-28 lg:px-24">
        <p className="text-[11px] font-medium uppercase text-muted-foreground">Curated developments</p>
        <h1 className="mt-5 max-w-5xl font-sans text-[clamp(3rem,7vw,7rem)] font-normal uppercase leading-[0.86] text-foreground">
          Selected projects
          <span className="block font-display text-[0.62em] normal-case italic">distinct by design</span>
        </h1>
      </header>
      <section className="grid border-t border-border md:grid-cols-2">
        {projects.map((project, index) => (
          <article key={project.name} className="group border-b border-border md:odd:border-r">
            <div className="overflow-hidden">
              <img src={project.image} alt={`Architectural view representing ${project.name}`} width={1200} height={900} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <div className="flex items-start justify-between gap-6 px-6 py-7 sm:px-10">
              <div>
                <p className="text-[10px] text-muted-foreground">0{index + 1}</p>
                <h2 className="mt-2 font-display text-3xl italic text-foreground">{project.name}</h2>
                <p className="mt-2 text-xs text-muted-foreground">{project.detail}</p>
              </div>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}