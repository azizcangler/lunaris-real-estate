import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";

import teamImage from "@/assets/team-dubai.jpg";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Lunaris" },
      { name: "description", content: "Meet the experienced Dubai real estate advisors behind Lunaris." },
      { property: "og:title", content: "Our Team | Lunaris" },
      { property: "og:description", content: "Meet the experienced Dubai real estate advisors behind Lunaris." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Team,
});

const roles = [
  { title: "Lead Advisor", focus: "Strategy & developer selection" },
  { title: "Market Analyst", focus: "Location & pricing intelligence" },
  { title: "Client Relations", focus: "Search, viewings & negotiations" },
  { title: "Operations", focus: "Transactions & after-sales support" },
];

function Team() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <section className="relative min-h-[420px] overflow-hidden text-[var(--hero-foreground)] md:min-h-[480px]">
        <img
          src={teamImage}
          alt="Lunaris advisory team reviewing property plans in a Dubai office"
          width={1200}
          height={900}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hero-scrim)_0%,transparent_64%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--hero-scrim)_0%,transparent_38%)] opacity-75" />

        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end px-6 pb-12 pt-28 sm:px-10 md:min-h-[480px] md:px-16 md:pb-16 md:pt-32 lg:px-24">
          <p className="text-[11px] font-medium uppercase text-white/70">The people behind Lunaris</p>
          <h1 className="mt-4 max-w-2xl font-sans text-4xl font-normal uppercase leading-[0.92] text-white md:text-6xl">
            Experience,
            <span className="block font-display text-[0.82em] normal-case italic">built around you</span>
          </h1>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 md:px-16 md:py-28 lg:px-24">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <h2 className="font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
              A focused team,
              <span className="block font-display text-[0.82em] normal-case italic">one market</span>
            </h2>
          </div>
          <div className="flex flex-col justify-between border-t border-primary/35 pt-7">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground md:text-2xl">
              We are a small group of Dubai real estate specialists who believe the best transactions start with listening. Each client works directly with people who know the market, the developers and the details that matter.
            </p>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Detailed team profiles and individual expertise areas will be added here soon. Until then, you can reach out and we will connect you with the right advisor.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <div key={role.title} className="flex flex-col border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center bg-primary font-display text-xl italic text-primary-foreground">
                0{index + 1}
              </div>
              <h3 className="mt-6 font-display text-2xl italic text-foreground">{role.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{role.focus}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <p className="max-w-xl text-sm text-muted-foreground">
            Want to know who you would work with? Send a brief note and we will match you with the advisor best suited to your plans.
          </p>
          <Button asChild size="lg" className="mt-6 h-12 rounded-none bg-primary px-8 text-xs uppercase text-primary-foreground shadow-none hover:bg-secondary hover:text-secondary-foreground">
            <Link to="/">
              Request an introduction <ArrowDownRight aria-hidden="true" className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
