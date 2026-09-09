import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";

export const Route = createFileRoute("/renting")({
  head: () => ({
    meta: [
      { title: "Rent a Home in Dubai | Lunaris" },
      {
        name: "description",
        content: "Find a refined Dubai rental matched to your timing, location and lifestyle.",
      },
      { property: "og:title", content: "Rent a Home in Dubai | Lunaris" },
      {
        property: "og:description",
        content: "Selected Dubai rentals and a smooth move-in process.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RentingPage,
});

function RentingPage() {
  return (
    <EditorialPage
      eyebrow="Selected rentals"
      title="Arrive and"
      italicTitle="feel at home"
      introduction="Whether your move is immediate or months away, we match your timing and lifestyle with well-positioned, carefully reviewed residences."
      points={[
        {
          number: "01",
          title: "Define the move",
          copy: "Set your preferred communities, dates, commute and practical requirements.",
        },
        {
          number: "02",
          title: "View efficiently",
          copy: "Tour a concise selection of homes that genuinely fit your brief.",
        },
        {
          number: "03",
          title: "Settle in",
          copy: "Move from offer to keys with clear guidance at each stage.",
        },
      ]}
      checklist={[
        "Neighbourhood and commute planning",
        "Verified rental shortlist",
        "Offer and contract support",
        "Move-in coordination",
      ]}
    />
  );
}
