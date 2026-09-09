import mercedesImage from "@/assets/projects/mercedes-benz-places.jpg";
import flareImage from "@/assets/projects/binghatti-flare.jpg";
import samanaImage from "@/assets/projects/samana-resort.jpg";
import skyriseImage from "@/assets/projects/binghatti-skyrise.jpg";
import aquariseImage from "@/assets/projects/binghatti-aquarise.jpg";
import chelseaImage from "@/assets/projects/chelsea-residences.jpg";
import dwtnImage from "@/assets/projects/dwtn-residences.jpg";
import solisImage from "@/assets/projects/sobha-solis.jpg";
import centralImage from "@/assets/projects/sobha-central.jpg";
import siniyaImage from "@/assets/projects/sobha-siniya-island.jpg";

export type Project = {
  slug: string;
  name: string;
  developer: string;
  location: string;
  headline: string;
  description: string;
  image: string;
  brochure: string;
};

export const projects: Project[] = [
  {
    slug: "mercedes-benz-places",
    name: "Mercedes-Benz Places",
    developer: "Binghatti",
    location: "Binghatti City · Downtown Dubai",
    headline: "The vision of a masterplanned city",
    description:
      "Mercedes-Benz Places | Binghatti City is a landmark residential community that brings the vision of a masterplanned city to life, uniting automotive design heritage with Dubai's most ambitious skyline.",
    image: mercedesImage,
    brochure: "/brochures/mercedes-benz-places-binghatti-city.pdf",
  },
  {
    slug: "binghatti-flare",
    name: "Binghatti Flare",
    developer: "Binghatti",
    location: "Dubai",
    headline: "A symphony of lines and light",
    description:
      "Flare's design is a symphony of lines and light, a carefully orchestrated composition that evokes a sense of movement across every facade and living space.",
    image: flareImage,
    brochure: "/brochures/binghatti-flare.pdf",
  },
  {
    slug: "samana-resort",
    name: "Samana Resort",
    developer: "Samana Developers",
    location: "Dubai Production City",
    headline: "Resort living, city access",
    description:
      "Enjoying a prime location in Dubai Production City, this project offers effortless access to key destinations, with seamless connectivity to the city's business and leisure districts.",
    image: samanaImage,
    brochure: "/brochures/samana-resort.pdf",
  },
  {
    slug: "binghatti-skyrise",
    name: "Binghatti Skyrise",
    developer: "Binghatti",
    location: "Business Bay",
    headline: "A new icon above Business Bay",
    description:
      "High above the hum of Business Bay, a new icon emerges: a beacon of refined living and a vertical field of dreams with views across the canal and Downtown.",
    image: skyriseImage,
    brochure: "/brochures/binghatti-skyrise.pdf",
  },
  {
    slug: "binghatti-aquarise",
    name: "Binghatti Aquarise",
    developer: "Binghatti",
    location: "Dubai Maritime City",
    headline: "A testament to fluidity",
    description:
      "Inspired by the sinuous curves of water, the Aquarise facade is a testament to fluidity: a dance of glass and light, reflecting the waterfront it overlooks.",
    image: aquariseImage,
    brochure: "/brochures/binghatti-aquarise.pdf",
  },
  {
    slug: "chelsea-residences",
    name: "Chelsea Residences",
    developer: "Damac",
    location: "Dubai Maritime City",
    headline: "A private oasis of luxury",
    description:
      "Chelsea Residences by Damac is a private oasis of luxury, located just 23 minutes from Downtown Dubai and minutes from the city's key waterfront destinations.",
    image: chelseaImage,
    brochure: "/brochures/chelsea-residences-damac.pdf",
  },
  {
    slug: "dwtn-residences",
    name: "DWTN Residences",
    developer: "Deyaar",
    location: "Business Bay",
    headline: "Inside the golden triangle",
    description:
      "Strategically positioned within the golden triangle of Sheikh Zayed Road, Downtown Dubai and Business Bay, DWTN Residences places the city's landmarks within easy reach.",
    image: dwtnImage,
    brochure: "/brochures/dwtn-residences-deyaar.pdf",
  },
  {
    slug: "sobha-solis",
    name: "Sobha Solis",
    developer: "Sobha Realty",
    location: "Motor City · Dubai",
    headline: "Quality and innovation in focus",
    description:
      "With razor-sharp focus on quality and innovation, Sobha has created a plethora of iconic spaces. Solis continues that legacy with thoughtfully planned residences and amenities.",
    image: solisImage,
    brochure: "/brochures/sobha-solis.pdf",
  },
  {
    slug: "sobha-central",
    name: "Sobha Central",
    developer: "Sobha Realty",
    location: "Sheikh Zayed Road",
    headline: "The city's most prized address",
    description:
      "The city's most prized real estate is adorned on Sheikh Zayed Road, a testament to Dubai's rapid evolution. Sobha Central places you at the centre of it all.",
    image: centralImage,
    brochure: "/brochures/sobha-central.pdf",
  },
  {
    slug: "sobha-siniya-island",
    name: "Sobha Siniya Island",
    developer: "Sobha Realty",
    location: "Umm Al Quwain",
    headline: "Villas on a serene lagoon",
    description:
      "Each villa offers direct access to a private boardwalk along the serene lagoon, a private backyard and an exclusive island lifestyle a short drive from Dubai.",
    image: siniyaImage,
    brochure: "/brochures/sobha-siniya-island.pdf",
  },
];

export const featuredProjects = projects.slice(0, 3);
