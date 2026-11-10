import { createFileRoute } from "@tanstack/react-router";

import { HomeContent } from "@/components/home-content";
import { Intro3D } from "@/components/intro/intro-3d";

// Demo page: the 3D intro, then the regular home page. Kept out of search results.
export const Route = createFileRoute("/{-$lang}/intro")({
  head: () => ({
    meta: [{ title: "Lunaris Real Estate · Intro" }, { name: "robots", content: "noindex" }],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  component: IntroPage,
});

function IntroPage() {
  // overflow-x-clip (not hidden): hidden would make <main> a scroll container and break the sticky stage.
  return (
    <main className="min-h-screen overflow-x-clip bg-background">
      <Intro3D />
      <HomeContent />
    </main>
  );
}
