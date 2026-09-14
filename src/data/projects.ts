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
import acresImage from "@/assets/projects/the-acres.jpg";
import athlonImage from "@/assets/projects/athlon.jpg";
import damacIslandsImage from "@/assets/projects/damac-islands.jpg";
import { theAcresDetails } from "@/data/project-details/the-acres";
import { athlonDetails } from "@/data/project-details/athlon";
import { damacIslandsDetails } from "@/data/project-details/damac-islands";

export type ProjectImage = {
  src: string;
  alt: string;
  /** CSS object-position for containers that crop the image, e.g. "center top" to keep faces. */
  position?: string;
};
export type ProjectFact = { label: string; value: string };
export type ProjectStat = { value: string; label: string };
/** Two-line section heading: an uppercase line and an italic display line. */
export type SectionHeading = { line: string; italic: string };
/** CSS colour values applied as tokens on the project page (`--primary`, `--accent`, ...). */
export type ProjectTheme = {
  primary: string;
  primaryForeground: string;
  accent: string;
  ring?: string;
  /** Text colour on the pinned masterplan stage; defaults to the cream used by The Acres. */
  stageForeground?: string;
};

export type ProjectDetails = {
  /** Small line above the hero title, e.g. "Meraas · Dubailand". */
  eyebrow: string;
  /** Italic second line under the project name in the hero. */
  titleItalic: string;
  summary: string;
  hero: ProjectImage;
  /** Optional brochure cover shown in the small hero frame before it expands into `hero`. */
  cover?: ProjectImage;
  /** Stage colour behind the small hero frame, usually sampled from the cover. */
  coverBackdrop?: string;
  /** Optional texture image behind the small hero frame (e.g. the brochure's stone background). */
  coverTexture?: ProjectImage;
  /** CSS colour laid over `coverTexture` in the masterplan stage and CTA (not the hero), e.g. to keep light text readable on a bright texture. */
  coverTextureScrim?: string;
  /** Colour or gradient laid over `coverTexture` behind the hero frame; fades out as the frame expands. */
  coverTextureHeroScrim?: string;
  /** Buttons, links and numbered markers on the page follow the brochure palette. */
  theme: ProjectTheme;
  /** Three or four short phrases shown as a strip under the hero. */
  highlights: string[];
  facts: ProjectFact[];
  intro: {
    heading: string;
    headingItalic: string;
    copy: string[];
    image: ProjectImage;
    /** CSS aspect-ratio of the intro photo, e.g. "16 / 9" to show a wide shot uncropped; defaults to 4:3. */
    imageAspect?: string;
  };
  location: {
    heading: string;
    headingItalic: string;
    copy: string[];
    distances: ProjectFact[];
    image: ProjectImage;
    /** Inline SVG markup of a stylised area map; replaces `image` in the location section when present. */
    mapSvg?: string;
    mapCaption?: string;
    /** Overrides for the map's CSS colour variables (`--map-ground`, `--map-ink`, ...). */
    mapVars?: Record<string, string>;
  };
  masterplan: {
    eyebrow: string;
    /** Accessible name of the step navigator. */
    navLabel: string;
    heading: string;
    headingItalic: string;
    copy: string[];
    /** Six pillars shown one per pinned scroll step; each carries its own figures. */
    pillars: { title: string; copy: string; stats?: ProjectStat[]; image?: ProjectImage }[];
  };
  keyFeaturesHeading: SectionHeading;
  keyFeatures: string[];
  /** Illustrated masterplan: `plan` shown inline, `poster` (plan + legend + feature vignettes) in a dialog. */
  keyFeaturesMap?: {
    plan: ProjectImage;
    poster: ProjectImage;
    legend: string[];
    /** CSS aspect-ratio of `plan`, e.g. "16 / 9"; defaults to the portrait Acres plan. */
    planAspect?: string;
  };
  /** Without a masterplan poster: a photo shown beside the `keyFeatures` list. */
  keyFeaturesImage?: ProjectImage;
  gardens?: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    copy: string;
    items: { name: string; copy: string; features: string[]; image: ProjectImage }[];
  };
  villas: {
    eyebrow: string;
    /** Plural noun for the type counter, e.g. "villa types" or "home types". */
    unitLabel: string;
    heading: string;
    headingItalic: string;
    copy: string[];
    image: ProjectImage;
    /** One entry per home type; every image becomes a card, the expanded card shows the type's copy. */
    items: {
      name: string;
      bedrooms?: string;
      /** Saleable area shown next to the bedrooms in the expanded card. */
      area?: string;
      copy: string;
      images: ProjectImage[];
    }[];
  };
  galleryHeading: string;
  /** Gallery cards; `title`/`description` show in the expanded view. */
  gallery: (ProjectImage & { title?: string; description?: string })[];
  materials?: { heading: SectionHeading; items: string[] };
  developer: { name: string; copy: string; image: ProjectImage };
};

export type Project = {
  slug: string;
  name: string;
  developer: string;
  location: string;
  headline: string;
  description: string;
  image: string;
  brochure: string;
  /** Present only for projects that have a dedicated detail page at /portfolio/$slug. */
  details?: ProjectDetails;
};

export const projects: Project[] = [
  {
    slug: "the-acres",
    name: "The Acres",
    developer: "Meraas",
    location: "Dubailand · Dubai",
    headline: "Step inside the outdoors",
    description:
      "A community of standalone 3 to 5-bedroom villas graced with serene gardens and swimmable lagoons, where meandering pathways connect every corner of an ever-flourishing, LEED Gold pre-certified neighbourhood.",
    image: acresImage,
    brochure: "/brochures/meraas-the-acres.pdf",
    details: theAcresDetails,
  },
  {
    slug: "athlon",
    name: "Athlon",
    developer: "Aldar",
    location: "Dubailand · Dubai",
    headline: "Welcome to active living",
    description:
      "The first community in Dubai that makes movement a natural part of life: 3 to 6-bedroom villas and townhouses woven together by running, cycling and family loops, lush parks and seven clubhouses, never more than five minutes from the next activity.",
    image: athlonImage,
    brochure: "/brochures/aldar-athlon.pdf",
    details: athlonDetails,
  },
  {
    slug: "damac-islands",
    name: "Damac Islands",
    developer: "Damac",
    location: "Dubailand · Dubai",
    headline: "Paradise is a state of mind",
    description:
      "A tropical island community inspired by the Maldives, Bora Bora, Seychelles, Hawaii, Bali and Fiji: 4 to 7-bedroom townhouses and villas around a swimmable lagoon, a jungle river and twenty-two curated attractions.",
    image: damacIslandsImage,
    brochure: "/brochures/damac-islands.pdf",
    details: damacIslandsDetails,
  },
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
