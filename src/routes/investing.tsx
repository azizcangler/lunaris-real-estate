import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";

export const Route = createFileRoute("/investing")({
  head: () => ({
    meta: [
      { title: "Dubai Property Investment | Lunaris" },
      {
        name: "description",
        content:
          "A measured approach to Dubai property investment, from opportunity selection to exit planning.",
      },
      { property: "og:title", content: "Dubai Property Investment | Lunaris" },
      {
        property: "og:description",
        content: "Curated Dubai real estate opportunities with disciplined due diligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvestingPage,
});

function InvestingPage() {
  return (
    <EditorialPage
      eyebrow="Strategic acquisitions"
      title="Invest with"
      italicTitle="clarity and purpose"
      introduction="We filter Dubai's fast-moving market through location fundamentals, developer quality, demand and your preferred investment horizon."
      points={[
        {
          number: "01",
          title: "Market view",
          copy: "Understand submarkets, buyer demand and the forces shaping long-term value.",
        },
        {
          number: "02",
          title: "Due diligence",
          copy: "Compare project fundamentals, payment structures and developer track records.",
        },
        {
          number: "03",
          title: "Long view",
          copy: "Build a considered acquisition plan aligned with income, growth or personal use.",
        },
      ]}
      checklist={[
        "Investment objective mapping",
        "Project and developer comparison",
        "Acquisition process guidance",
        "Portfolio and exit perspective",
      ]}
    />
  );
}
