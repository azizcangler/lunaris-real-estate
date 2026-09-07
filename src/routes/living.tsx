import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";

export const Route = createFileRoute("/living")({
  head: () => ({ meta: [
    { title: "Living in Dubai | Lunaris" },
    { name: "description", content: "Discover Dubai homes selected around your lifestyle, family and daily rhythm." },
    { property: "og:title", content: "Living in Dubai | Lunaris" },
    { property: "og:description", content: "A personal approach to finding your home in Dubai." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: LivingPage,
});

function LivingPage() {
  return <EditorialPage eyebrow="Private residences" title="Live well" italicTitle="in the right place" introduction="A home is more than an address. We begin with how you want to live, then curate residences around your pace, privacy, community and long-term plans." points={[
    { number: "01", title: "Your brief", copy: "We define the spaces, neighbourhood character and daily conveniences that matter to you." },
    { number: "02", title: "Curated tours", copy: "A focused shortlist and private viewings, with no unnecessary options." },
    { number: "03", title: "Move with ease", copy: "Clear support through negotiation, documentation and handover." },
  ]} checklist={["Lifestyle and location consultation", "Curated home shortlist", "Private viewings and comparisons", "Negotiation and handover guidance"]} />;
}