import type { ProjectDetails } from "@/data/projects";

import heroLagoonAerial from "@/assets/projects/the-acres/hero-lagoon-aerial.jpg";
import coverImage from "@/assets/projects/the-acres/cover.jpg";
import coverTexture from "@/assets/projects/the-acres/cover-texture.jpg";
import lagoonBridgeAerial from "@/assets/projects/the-acres/lagoon-bridge-aerial.jpg";
import gardenPaths from "@/assets/projects/the-acres/garden-paths.jpg";
import communityAerial from "@/assets/projects/the-acres/community-aerial.jpg";
import lagoonEvening from "@/assets/projects/the-acres/lagoon-evening.jpg";
import finalPhasePool from "@/assets/projects/the-acres/final-phase-pool.jpg";
import lagoonBeach from "@/assets/projects/the-acres/lagoon-beach.jpg";
import gardenArrival from "@/assets/projects/the-acres/garden-arrival.jpg";
import gardenVillage from "@/assets/projects/the-acres/garden-village.jpg";
import gardenLagoon from "@/assets/projects/the-acres/garden-lagoon.jpg";
import gardenNature from "@/assets/projects/the-acres/garden-nature.jpg";
import gardenLost from "@/assets/projects/the-acres/garden-lost.jpg";
import gardenPerfume from "@/assets/projects/the-acres/garden-perfume.jpg";
import gardenEdible from "@/assets/projects/the-acres/garden-edible.jpg";
import villaBExterior from "@/assets/projects/the-acres/villa-b-exterior.jpg";
import villaBLiving from "@/assets/projects/the-acres/villa-b-living.jpg";
import villaBStair from "@/assets/projects/the-acres/villa-b-stair.jpg";
import villaDExterior from "@/assets/projects/the-acres/villa-d-exterior.jpg";
import villaDDriveway from "@/assets/projects/the-acres/villa-d-driveway.jpg";
import villaDLounge from "@/assets/projects/the-acres/villa-d-lounge.jpg";
import villaDStair from "@/assets/projects/the-acres/villa-d-stair.jpg";
import villaCExteriorNight from "@/assets/projects/the-acres/villa-c-exterior-night.jpg";
import villaCLiving from "@/assets/projects/the-acres/villa-c-living.jpg";
import villaCPool from "@/assets/projects/the-acres/villa-c-pool.jpg";
import villaCAtrium from "@/assets/projects/the-acres/villa-c-atrium.jpg";
import villaAExterior from "@/assets/projects/the-acres/villa-a-exterior.jpg";
import villaANight from "@/assets/projects/the-acres/villa-a-night.jpg";
import villaABedroom from "@/assets/projects/the-acres/villa-a-bedroom.jpg";
import villaEExterior from "@/assets/projects/the-acres/villa-e-exterior.jpg";
import villaEGarden from "@/assets/projects/the-acres/villa-e-garden.jpg";
import villaELiving from "@/assets/projects/the-acres/villa-e-living.jpg";
import villaFExterior from "@/assets/projects/the-acres/villa-f-exterior.jpg";
import villaFDriveway from "@/assets/projects/the-acres/villa-f-driveway.jpg";
import villaFLiving from "@/assets/projects/the-acres/villa-f-living.jpg";
import meraasLagoon from "@/assets/projects/the-acres/meraas-lagoon.jpg";
import locationMapSvg from "@/assets/projects/the-acres/location-map.svg?raw";
import masterplanPlan from "@/assets/projects/the-acres/masterplan-plan.jpg";
import masterplanPoster from "@/assets/projects/the-acres/masterplan-poster.jpg";

export const theAcresDetails: ProjectDetails = {
  eyebrow: "Meraas · Dubailand",
  titleItalic: "step inside the outdoors",
  summary:
    "A community of standalone villas enveloped by nature. Serene gardens, swimmable lagoons and meandering pathways connect every corner of this ever-flourishing neighbourhood.",
  hero: {
    src: heroLagoonAerial,
    alt: "Aerial view of The Acres' swimmable lagoon surrounded by villas, palms and gardens",
  },
  cover: {
    src: coverImage,
    alt: "The Acres brochure cover: botanical emblem and wordmark on green stone",
  },
  coverBackdrop: "#42473a",
  coverTexture: { src: coverTexture, alt: "" },
  highlights: ["3 to 5-bedroom villas", "Dubailand, Dubai", "LEED Gold pre-certified"],
  facts: [
    { label: "Developer", value: "Meraas" },
    { label: "Location", value: "Dubailand, Dubai" },
    { label: "Property type", value: "Standalone villas" },
    { label: "Bedrooms", value: "3, 4 and 5" },
    { label: "Villa types", value: "A, B, C, D, E and F" },
    { label: "Current release", value: "The Final Phase" },
    { label: "Sustainability", value: "LEED Gold pre-certified for Planning and Design" },
  ],
  intro: {
    heading: "Welcome",
    headingItalic: "to The Acres",
    copy: [
      "Welcome to The Acres, a community of standalone villas featuring impeccable surroundings enveloped by nature. Graced with serene gardens and azure lagoons, this exclusive neighbourhood harmonises with the undulating terrain, creating a space that is connected by meandering pathways to every corner of this ever-flourishing environment.",
      "Discover The Acres, where every step inside brings you closer to the outdoors.",
    ],
    image: {
      src: gardenPaths,
      alt: "Landscaped garden paths winding between villas at The Acres",
    },
  },
  location: {
    heading: "In the midst",
    headingItalic: "of nature",
    copy: [
      "Discover a community unlike any other in Dubai: a prestigious location where modern luxury and the splendour of nature converge. Centrally located within the Dubailand area with a very well-connected road network, the community has direct access to Sheikh Zayed Bin Hamdan Al Nahyan Street and Emirates Road.",
      "The Acres enjoys a prime position surrounded by fully developed neighbourhoods such as Arabian Ranches, Mudon, Villanova and Dubai Hills Estate. With a location so pivotal, every journey around the city begins with ease, and every return is to a peaceful community embraced by nature.",
    ],
    distances: [
      { label: "Dubai Polo & Equestrian Club", value: "5 min" },
      { label: "Hamdan Sports Complex", value: "5 min" },
      { label: "Global Village", value: "10 min" },
      { label: "Sheikh Zayed Bin Hamdan Al Nahyan Street", value: "Direct access" },
      { label: "Emirates Road", value: "Direct access" },
    ],
    image: {
      src: communityAerial,
      alt: "Aerial view of The Acres community with sports courts, pools and green corridors",
    },
    mapSvg: locationMapSvg,
    mapCaption: "Dubailand, between Sheikh Zayed Bin Hamdan Al Nahyan Street and Emirates Road",
  },
  masterplan: {
    heading: "Nature's",
    headingItalic: "blueprint",
    copy: [
      "Bespoke villas find their home amongst flourishing surroundings, with lush parks located just a minute's stroll away. Nestled within the heart of the community are swimmable lagoons, embraced by the serene beauty of a natural landscape. The Halo Loop Park that surrounds them seamlessly connects neighbourhoods, crafting a safe, people-centric environment with an abundance of open, green spaces.",
      "Meraas has attained LEED Gold pre-certification for Planning and Design at The Acres. LEED for Cities and Communities, the world's leading sustainability certification system, sets the benchmark for eco-friendly practices that prioritise energy efficiency, water conservation and environmental stewardship.",
    ],
    pillars: [
      {
        title: "Saving water",
        image: {
          src: lagoonBridgeAerial,
          alt: "Swimmable lagoon fed by treated water, seen from above",
        },
        copy: "Water-saving fixtures, efficient irrigation systems and low-water planting keep consumption well below the national average.",
        stats: [
          { value: "33%", label: "less water than the UAE average" },
          { value: "100%", label: "of irrigation covered by treated wastewater" },
        ],
      },
      {
        title: "Protecting the environment",
        image: {
          src: villaBExterior,
          alt: "Well-insulated villa facade with shaded glazing and planting",
        },
        copy: "Well-insulated buildings, smart controls, high-efficiency systems and lighting set a new standard for sustainability.",
        stats: [
          { value: "80%", label: "lower greenhouse gas emissions per capita" },
          { value: "LEED Gold", label: "pre-certified for Planning and Design" },
        ],
      },
      {
        title: "Encouraging movement",
        image: {
          src: gardenPaths,
          alt: "Shaded walking and cycling paths winding through the gardens",
        },
        copy: "Nearly a third of the community's roads are designated for pedestrians and cyclists, with a continuous network of walking and biking paths, monitored outdoor air quality and plenty of natural shade.",
        stats: [
          { value: "1/3", label: "of roads reserved for walking and cycling" },
          { value: "3 min", label: "walk from every villa to a park" },
        ],
      },
      {
        title: "Connecting the community",
        image: { src: gardenLost, alt: "Playground and community pavilion in the Lost Garden" },
        copy: "A nursery, school, clinic, mosques, clubhouses and retail sit close to home, alongside a trail network, an outdoor gym, playgrounds, pools and sports areas around the Halo Loop Park.",
        stats: [
          { value: "2,000 m²", label: "of Edible Garden" },
          { value: "1 min", label: "stroll from home to the nearest park" },
        ],
      },
      {
        title: "Adopting smart solutions",
        image: { src: villaFDriveway, alt: "Covered driveway with electric vehicle charging" },
        copy: "All stormwater, including the lagoons, is managed on-site through eco-friendly drainage. Every cluster has electric vehicle fast chargers, and smart technology guides transportation and energy.",
        stats: [
          { value: "100%", label: "of stormwater managed on-site" },
          { value: "Every cluster", label: "equipped with EV fast chargers" },
        ],
      },
      {
        title: "Enhancing wellness",
        image: {
          src: gardenNature,
          alt: "Natural ponds and wetland planting in the Nature Garden",
        },
        copy: "Community wellbeing comes first: more than a quarter of the land is open space, and residents enjoy far more green space per person than the world's most livable cities.",
        stats: [
          { value: "28%", label: "of the community set aside as open space" },
          { value: "2.5×", label: "the usual amount of green space per person" },
          { value: "54 m²", label: "of green space per resident" },
        ],
      },
    ],
  },
  keyFeaturesMap: {
    plan: {
      src: masterplanPlan,
      alt: "Illustrated masterplan of The Acres with numbered key features around the central lagoons",
    },
    poster: {
      src: masterplanPoster,
      alt: "The Acres key features poster: numbered masterplan, legend and illustrations of each amenity",
    },
    legend: [
      "Entrance",
      "Primary school",
      "Mosque",
      "Halo Park / community park",
      "Clubhouse",
      "Retail",
      "Kindergarten",
      "Lagoon clubhouse",
      "Juice bar",
      "Lagoon – lake",
      "Community amenities",
    ],
  },
  keyFeatures: [
    "Halo Loop Park and community park",
    "Swimmable lagoons and lake",
    "Lagoon clubhouse and community clubhouse",
    "Primary school and kindergarten",
    "Retail promenade and juice bar",
    "Mosque and mosque plaza",
    "Healthcare clinic",
    "Sports areas and outdoor gym",
    "Trail network for walking and cycling",
    "EV fast chargers in every cluster",
  ],
  gardens: {
    heading: "Immersive",
    headingItalic: "amenities",
    copy: "An array of engaging amenities nestled within carefully curated gardens that encircle the main park. Within this expansive green network, facilities tailored to a diverse range of interests are easily accessible for all to enjoy.",
    items: [
      {
        name: "Arrival Garden",
        copy: "Palm tree-lined boulevards extend the warmest of welcomes. Here you will find the forest theatre, where nature and art meet, and the mosque plaza that sets the tone of peace.",
        features: [
          "Arrival area",
          "Cluster gardens",
          "Boulevard",
          "Forest theatre",
          "Mosque plaza",
        ],
        image: { src: gardenArrival, alt: "Tree-lined boulevard at the entrance of The Acres" },
      },
      {
        name: "Village Garden",
        copy: "Immerse yourself in the bustling ripe markets, soothe your senses by the waterfront seating and meander along the retail promenade. Every corner tells a tale of community, recreation and natural charm.",
        features: [
          "Adventure park",
          "Retail promenade",
          "Ripe market",
          "Community clubhouse",
          "Primary school",
          "Kindergarten",
          "Healthcare",
          "Sports areas",
          "Event lawn and event island",
        ],
        image: {
          src: gardenVillage,
          alt: "Curved boardwalk crossing the lagoon toward the Village Garden",
        },
      },
      {
        name: "Lagoon Garden",
        copy: "In the singular calmness of The Acres' lagoons, water becomes a canvas for both leisure and play. Swimmable lagoons and floating decks invite you for a refreshing dip all year round.",
        features: [
          "Cluster gardens",
          "Swimmable lagoons and lakes",
          "Lagoon clubhouse",
          "Sports areas",
          "Jogging tracks",
          "Floating decks",
        ],
        image: { src: gardenLagoon, alt: "Turquoise swimmable lagoon with palms and sun loungers" },
      },
      {
        name: "Nature Garden",
        copy: "Step into a scene of conservation, where the wetlands and natural ponds offer nature's finer treasures. Relax in the wellness garden and take leisurely strolls along the dry wadi trails.",
        features: [
          "Community pavilion",
          "Outdoor gym",
          "Natural ponds",
          "Dry wadi trail and wetland park",
          "Wellness garden",
          "Kids' play areas",
          "Outdoor terrace",
        ],
        image: {
          src: gardenNature,
          alt: "Natural ponds and wetland planting in the Nature Garden",
        },
      },
      {
        name: "Lost Garden",
        copy: "A charming corner that beckons you into a world of discovery, from the enchanting land art trail to adventurous treehouses that offer a novel perspective on the surroundings.",
        features: [
          "Community pavilion",
          "Kids' play areas",
          "Dog parks",
          "Garden majlis",
          "Forest terraces",
          "Crafting stations",
          "Treehouse viewing deck",
          "Clubhouse",
        ],
        image: {
          src: gardenLost,
          alt: "Shaded seating and play areas among hedges in the Lost Garden",
        },
      },
      {
        name: "Perfume Garden",
        copy: "Wander through the gardens as each blossom treats your senses. Wetlands and ponds create a harmonious atmosphere, a picture-perfect representation of flora and fauna.",
        features: ["Cluster gardens", "Perennial garden", "Art garden"],
        image: { src: gardenPerfume, alt: "Flowering archway along a path in the Perfume Garden" },
      },
      {
        name: "Edible Garden",
        copy: "A green expanse where fragrant herbs offer a touch of culinary magic, with a dining oasis that houses the freshest natural offerings in a beautiful al fresco setting.",
        features: ["Cluster gardens", "Kids' play areas", "Herbal garden", "Orchard garden"],
        image: {
          src: gardenEdible,
          alt: "Raised planting beds and orchard trees in the Edible Garden",
        },
      },
    ],
  },
  villas: {
    heading: "A step closer",
    headingItalic: "to the outdoors",
    copy: [
      "The Acres' new release of exquisite 3 to 5-bedroom villas is distinguished by signature outdoor rooms and rear gardens that merge with the nature around you. The villas' contemporary design, characterised by an open-plan layout, double-height living spaces and floor-to-ceiling windows, effortlessly brings the captivating flora indoors.",
      "Inspired by the elements, the architecture proudly features stone, wood and glass, crafting a visual symphony that mirrors the natural surroundings. Contemporary palettes bathe the walls in light, while the sleek structures maximise exposure to the lush environment.",
    ],
    image: {
      src: finalPhasePool,
      alt: "Resort-style pool deck with cabanas and palms in The Final Phase of The Acres",
    },
    items: [
      {
        name: "Villa Type B",
        bedrooms: "3 bedrooms",
        copy: "A garden facade opens to lush surroundings, encouraging a lifestyle entwined with nature. Beyond the double-height entrance, a direct view of the back garden enhances the sense of openness. An L-shaped living area integrates kitchen, dining and living rooms, while the first-floor master bedroom overlooks the pool and offers framed views of the park.",
        images: [
          {
            src: villaBExterior,
            alt: "Villa Type B garden facade with glazed double-height living room",
          },
          { src: villaBLiving, alt: "Villa Type B open-plan kitchen, dining and living area" },
          {
            src: villaBStair,
            alt: "Villa Type B double-height entrance with floating timber staircase",
          },
        ],
      },
      {
        name: "Villa Type D",
        bedrooms: "4 bedrooms",
        copy: "A peaceful home with a distinctive feature: the stone wall. It anchors the home's aesthetic, seamlessly blending privacy with architectural finesse. The master bedroom offers elevated park views, while the top-floor multi-purpose room extends to a spacious shaded terrace overlooking the community.",
        images: [
          {
            src: villaDExterior,
            alt: "Villa Type D exterior with stone base and cantilevered upper floor",
          },
          { src: villaDDriveway, alt: "Villa Type D entrance and covered driveway" },
          { src: villaDLounge, alt: "Villa Type D first-floor lounge with timber screen" },
          { src: villaDStair, alt: "Villa Type D staircase and ground-floor living space" },
        ],
      },
      {
        name: "Villa Type C",
        bedrooms: "5 bedrooms",
        copy: "Crafted with an eye for luxury and pure elegance, the facade impresses with clean lines and selective openings on the street side to maximise privacy. Full-length windows facing the courtyard invite the garden's tranquillity into each room, and the double-height living area extends into a shaded courtyard.",
        images: [
          { src: villaCExteriorNight, alt: "Villa Type C illuminated at dusk among mature trees" },
          {
            src: villaCLiving,
            alt: "Villa Type C double-height living room opening to the courtyard",
          },
          { src: villaCPool, alt: "Villa Type C rear garden with private pool and timber screens" },
          {
            src: villaCAtrium,
            alt: "Villa Type C atrium with staircase and layered timber louvres",
          },
        ],
      },
      {
        name: "Villa Type A",
        copy: "Stacked, offset volumes give every floor its own terrace, with a top-floor room opening onto a shaded roof deck. The master suite slides fully open to a terrace with park views, and the covered driveway sits discreetly beneath the entrance.",
        images: [
          { src: villaAExterior, alt: "Villa Type A exterior with stacked volumes and garden" },
          { src: villaANight, alt: "Villa Type A illuminated at night with covered parking" },
          {
            src: villaABedroom,
            alt: "Villa Type A master bedroom opening onto a terrace with hammock",
          },
        ],
      },
      {
        name: "Villa Type E",
        copy: "Timber louvres and a stone plinth wrap the house. The double-height living room, with its stone feature wall and open kitchen, slides open to a deck and pool that run down toward the community lake.",
        images: [
          {
            src: villaEExterior,
            alt: "Villa Type E exterior with timber louvres and private pool",
          },
          { src: villaEGarden, alt: "Villa Type E rear garden looking toward the lake" },
          { src: villaELiving, alt: "Villa Type E living room with stone feature wall" },
        ],
      },
      {
        name: "Villa Type F",
        copy: "Layered terraces and deep overhangs shade a stone-clad ground floor. Living, dining and kitchen flow as one room around a stone wall, with the staircase rising toward the garden-facing glazing.",
        images: [
          { src: villaFExterior, alt: "Villa Type F exterior with layered terraces" },
          { src: villaFDriveway, alt: "Villa Type F entrance and covered driveway" },
          { src: villaFLiving, alt: "Villa Type F living and dining room with stone wall" },
        ],
      },
    ],
  },
  gallery: [
    { src: lagoonBridgeAerial, alt: "Timber bridge across the lagoon at The Acres" },
    { src: lagoonEvening, alt: "Lagoon clubhouse and pool at dusk" },
    { src: lagoonBeach, alt: "Sandy lagoon beach with cabanas and infinity pool" },
  ],
  materials: [
    "Textured accent walls in living, dining and bedrooms",
    "Porcelain tile flooring throughout",
    "Porcelain accent wall tiles in master and secondary bathrooms",
    "Reconstituted stone vanity countertops",
    "Veneer-finished kitchen cabinets and vanity shutters",
    "Porcelain slab kitchen countertops and backsplash",
  ],
  developer: {
    name: "Meraas",
    copy: "Meraas is dedicated to enhancing Dubai's global real estate position through a diverse portfolio of master developments, land and properties, including iconic destinations such as Port de La Mer, Bluewaters Residences, City Walk Residences, Nikki Beach Residences, BVLGARI Residences and Nad Al Sheba Gardens. Meraas values sophistication and innovation to deliver exceptional residential experiences for a global clientele.",
    image: { src: meraasLagoon, alt: "Families relaxing beside the lagoon at The Acres" },
  },
};
