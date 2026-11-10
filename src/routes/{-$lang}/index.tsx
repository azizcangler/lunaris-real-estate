import { createFileRoute } from "@tanstack/react-router";

import { HomeContent } from "@/components/home-content";
import { Intro3D } from "@/components/intro/intro-3d";
import { SiteHeader } from "@/components/site-header";
import { alternateLinks, getDictionary, localeFromParam, pageMeta } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/")({
  head: ({ params }) => ({
    meta: pageMeta(getDictionary(localeFromParam(params.lang)).meta.home),
    links: [
      ...alternateLinks("/"),
      // Font of the 3D intro (English home only).
      ...(localeFromParam(params.lang) === "en"
        ? [
            {
              rel: "stylesheet",
              href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap",
            },
            // The 3D model and tree list start downloading with the page instead of after
            // three.js has loaded (the scene fetches them with the same CORS mode).
            {
              rel: "preload",
              href: "/intro/community.glb",
              as: "fetch",
              crossOrigin: "anonymous" as const,
            },
            {
              rel: "preload",
              href: "/intro/trees.json",
              as: "fetch",
              crossOrigin: "anonymous" as const,
            },
          ]
        : []),
    ],
  }),
  component: Index,
});

function Index() {
  const { lang } = Route.useParams();
  // The 3D intro is written in English, so it opens the English home; /tr and /ru keep the regular hero.
  if (localeFromParam(lang) === "en") {
    // overflow-x-clip (not hidden): hidden would make <main> a scroll container and break the sticky stage.
    return (
      <main className="min-h-screen overflow-x-clip bg-background">
        <Intro3D />
        <HomeContent belowIntro />
      </main>
    );
  }
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <HomeContent />
    </main>
  );
}
