import acresImage from "@/assets/projects/the-acres.jpg";
import athlonImage from "@/assets/projects/athlon.jpg";
import damacIslandsImage from "@/assets/projects/damac-islands.jpg";
import mercedesImage from "@/assets/projects/mercedes-benz-places.jpg";
import samanaImage from "@/assets/projects/samana-resort.jpg";
import teamImage from "@/assets/team-dubai.jpg";

export const newsCategories = ["News", "Property showcase", "Insights"] as const;
export type NewsCategory = (typeof newsCategories)[number];

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  /** ISO date; rendered as "14 September 2026". */
  date: string;
  title: string;
  excerpt: string;
  image: { src: string; alt: string };
  /** Internal route the card opens. */
  to: string;
};

/** Newest first. Copy and dates are editorial: edit freely, the section renders whatever is here. */
export const news: NewsItem[] = [
  {
    slug: "office-iris-bay-tower",
    category: "News",
    date: "2026-09-14",
    title: "Lunaris moves to Iris Bay Tower, Business Bay",
    excerpt:
      "Our office is now at Iris Bay Tower, Office 1005-06, in the heart of Business Bay. Visit us for a consultation, or reach the team on WhatsApp for a first conversation wherever you are.",
    image: { src: teamImage, alt: "The Lunaris team in Dubai" },
    to: "/contact",
  },
  {
    slug: "damac-islands-showcase",
    category: "Property showcase",
    date: "2026-09-12",
    title: "Damac Islands: island life around a swimmable lagoon",
    excerpt:
      "Six island-inspired clusters, a jungle river and twenty-two curated attractions, from a floating wedding venue to underwater dining. Townhouses and villas from four to seven bedrooms in Dubailand.",
    image: { src: damacIslandsImage, alt: "Aerial rendering of the Damac Islands lagoon" },
    to: "/portfolio/damac-islands",
  },
  {
    slug: "athlon-showcase",
    category: "Property showcase",
    date: "2026-09-10",
    title: "Athlon by Aldar: a community designed around movement",
    excerpt:
      "Running, cycling and family loops link seven clubhouses and shaded parks. Townhouses and villas from three to six bedrooms, LEED Platinum pre-certified, in the green heart of Dubailand.",
    image: { src: athlonImage, alt: "Athlon clubhouse at dusk" },
    to: "/portfolio/athlon",
  },
  {
    slug: "the-acres-showcase",
    category: "Property showcase",
    date: "2026-09-06",
    title: "The Acres by Meraas: villas among seven themed gardens",
    excerpt:
      "Standalone villas set around lagoons, forest trails and a lakeside promenade. Six villa types, a LEED Gold masterplan and a lifestyle built on nature, minutes from Arabian Ranches.",
    image: { src: acresImage, alt: "The Acres lagoon and gardens" },
    to: "/portfolio/the-acres",
  },
  {
    slug: "buying-as-a-foreigner",
    category: "Insights",
    date: "2026-09-02",
    title: "Buying in Dubai as an international investor: how it works",
    excerpt:
      "Freehold ownership in designated areas, developer payment plans, escrow protection for off-plan purchases and the paperwork behind a clean transfer. What to expect from the first viewing to the title deed.",
    image: { src: mercedesImage, alt: "Mercedes-Benz Places towers in Downtown Dubai" },
    to: "/investing",
  },
  {
    slug: "renting-checklist",
    category: "Insights",
    date: "2026-08-28",
    title: "Renting in Dubai: what to prepare before you sign",
    excerpt:
      "Ejari registration, cheque schedules, deposits and the documents landlords ask for. A short checklist so your move-in date does not slip.",
    image: { src: samanaImage, alt: "Samana Resort pool terrace" },
    to: "/renting",
  },
];
