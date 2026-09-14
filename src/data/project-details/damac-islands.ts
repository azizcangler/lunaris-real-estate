import type { ProjectDetails } from "@/data/projects";

import coverImage from "@/assets/projects/damac-islands/cover.jpg";
import coverTexture from "@/assets/projects/damac-islands/cover-texture.jpg";
import heroLagoonAerial from "@/assets/projects/damac-islands/hero-lagoon-aerial.jpg";
import islandPier from "@/assets/projects/damac-islands/island-pier.jpg";
import beachPanorama from "@/assets/projects/damac-islands/beach-panorama.jpg";
import masterplanAerial from "@/assets/projects/damac-islands/masterplan-aerial.jpg";
import masterplanPlan from "@/assets/projects/damac-islands/masterplan-plan.jpg";
import masterplanPoster from "@/assets/projects/damac-islands/masterplan-poster.jpg";
import aquaParkAerial from "@/assets/projects/damac-islands/aqua-park-aerial.jpg";
import islandFountainSunset from "@/assets/projects/damac-islands/island-fountain-sunset.jpg";
import islandLagoonKayaks from "@/assets/projects/damac-islands/island-lagoon-kayaks.jpg";
import waterPlatforms from "@/assets/projects/damac-islands/water-platforms.jpg";
import paddling from "@/assets/projects/damac-islands/paddling.jpg";
import waterfallsSpa from "@/assets/projects/damac-islands/waterfalls-spa.jpg";
import islandRiverDusk from "@/assets/projects/damac-islands/island-river-dusk.jpg";
import islandZipline from "@/assets/projects/damac-islands/island-zipline.jpg";
import aquaPark from "@/assets/projects/damac-islands/aqua-park.jpg";
import jungleSwings from "@/assets/projects/damac-islands/jungle-swings.jpg";
import yogaDecks from "@/assets/projects/damac-islands/yoga-decks.jpg";
import fruitMarket from "@/assets/projects/damac-islands/fruit-market.jpg";
import wildlifePark from "@/assets/projects/damac-islands/wildlife-park.jpg";
import aquaDome from "@/assets/projects/damac-islands/aqua-dome.jpg";
import miniGolf from "@/assets/projects/damac-islands/mini-golf.jpg";
import weddingVenue from "@/assets/projects/damac-islands/wedding-venue.jpg";
import interiorFoyer from "@/assets/projects/damac-islands/interior-foyer.jpg";
import interiorFormalLiving from "@/assets/projects/damac-islands/interior-formal-living.jpg";
import interiorDining from "@/assets/projects/damac-islands/interior-dining.jpg";
import interiorFamilyLiving from "@/assets/projects/damac-islands/interior-family-living.jpg";
import interiorMasterBath from "@/assets/projects/damac-islands/interior-master-bath.jpg";
import villaPoolNight from "@/assets/projects/damac-islands/villa-pool-night.jpg";
import townhouseStreet from "@/assets/projects/damac-islands/townhouse-street.jpg";
import villa7Front from "@/assets/projects/damac-islands/villa-7-front.jpg";
import villa7Rear from "@/assets/projects/damac-islands/villa-7-rear.jpg";
import villa6Front from "@/assets/projects/damac-islands/villa-6-front.jpg";
import villa6Rear from "@/assets/projects/damac-islands/villa-6-rear.jpg";
import villaDiv3Front from "@/assets/projects/damac-islands/villa-div3-front.jpg";
import villaDiv3Rear from "@/assets/projects/damac-islands/villa-div3-rear.jpg";
import townhouseFront from "@/assets/projects/damac-islands/townhouse-front.jpg";
import townhouseRear from "@/assets/projects/damac-islands/townhouse-rear.jpg";
import locationMapSvg from "@/assets/projects/damac-islands/location-map.svg?raw";

const attractions = [
  "Central Hub Fountain",
  "Wedding Venue",
  "Aqua Dome",
  "Iguanas Park and Fruit Market",
  "Paddling (gondola style)",
  "Water Platforms",
  "Lagoon Tour in Hammock",
  "Lagoon Waterfalls",
  "Mini Golf Island",
  "Tortoise Garden",
  "Parrot Park",
  "Aqua Park",
  "Jungle River",
  "Rapids",
  "Zipline",
  "Jungle Swings",
  "Yoga and Calisthenics Park",
  "Yoga Floating Decks",
  "Wildlife Park",
  "Fitness Park",
  "Hot Springs Spa",
  "Private Boat Rides",
];

export const damacIslandsDetails: ProjectDetails = {
  eyebrow: "Damac · Dubailand",
  titleItalic: "paradise is a state of mind",
  summary:
    "A tropical island community inspired by six of the world's best island destinations. Townhouses and villas gather around a swimmable lagoon, a jungle river and twenty-two curated attractions, from a floating wedding venue to an underwater dining dome.",
  hero: {
    src: heroLagoonAerial,
    alt: "Aerial view of Damac Islands' central lagoon, aqua park islands and villa clusters",
  },
  cover: {
    src: coverImage,
    alt: "Damac Islands brochure cover: turquoise water with the Damac Islands wordmark",
  },
  coverBackdrop: "#2c596a",
  coverTexture: { src: coverTexture, alt: "" },
  // The wave texture is bright; deepen it under the light stage and CTA text.
  coverTextureScrim: "rgba(30, 72, 88, 0.5)",
  // The wave raster is much brighter on the left than on the right, so the hero scrim is a
  // left-to-right gradient that evens the backdrop out at a slightly deeper turquoise instead of
  // a flat colour that would turn the right side murky.
  coverTextureHeroScrim:
    "linear-gradient(90deg, rgba(30, 72, 88, 0.32) 0%, rgba(30, 72, 88, 0.4) 40%, rgba(30, 72, 88, 0.34) 60%, rgba(30, 72, 88, 0.2) 78%, rgba(30, 72, 88, 0.04) 100%)",
  // Deep lagoon teal with the brochure's turquoise as the accent.
  theme: {
    primary: "oklch(0.45 0.09 215)",
    primaryForeground: "#f2fbfc",
    accent: "oklch(0.62 0.12 210)",
    stageForeground: "#f2fbfc",
  },
  highlights: [
    "4 to 7-bedroom townhouses and villas",
    "Dubailand, Dubai",
    "Six island-inspired clusters",
  ],
  facts: [
    { label: "Developer", value: "Damac Properties" },
    { label: "Location", value: "Dubailand, Dubai" },
    { label: "Property type", value: "Townhouses and villas" },
    { label: "Bedrooms", value: "4, 5, 6 and 7" },
    { label: "Clusters", value: "Maldives, Bora Bora, Seychelles, Hawaii, Bali and Fiji" },
    { label: "Current release", value: "Seychelles 2" },
    { label: "Attractions", value: "22 curated experiences around the lagoon" },
    { label: "Saleable areas", value: "205 to 1,587 sq m" },
  ],
  intro: {
    heading: "Live the island",
    headingItalic: "state of mind",
    copy: [
      "Paradise is not a place, it's a state of mind. Inspired by six of the world's best tropical island destinations, Damac Islands brings the Maldives, Bora Bora, Seychelles, Hawaii, Bali and Fiji to Dubai in six island-themed clusters around a central lagoon.",
      "Discover a home that's more than just a dwelling, it's your personal slice of paradise. The townhouses and villas are designed to bring the island state of mind into every aspect of your daily life.",
    ],
    image: {
      src: islandPier,
      alt: "Woman in a sun hat on a timber boardwalk looking over the lagoon, beach and villas at Damac Islands",
    },
    imageAspect: "16 / 9",
  },
  location: {
    heading: "Close to everything,",
    headingItalic: "far from ordinary",
    copy: [
      "Damac Islands sits in Dubailand between Sheikh Mohammed Bin Zayed Road and Emirates Road, a short drive from Sports City, Motor City and Damac Hills.",
      "Both airports, the Expo 2020 venue and the coast at Burj Al Arab are all within half an hour, and Dubai Investment Park's business district is thirty minutes away.",
    ],
    distances: [
      { label: "Sports City, Motor City and Damac Hills", value: "15 min" },
      { label: "Expo 2020 venue", value: "20 min" },
      { label: "Al Maktoum International Airport", value: "23 min" },
      { label: "Dubai International Airport", value: "28 min" },
      { label: "Burj Al Arab", value: "30 min" },
      { label: "Dubai Investment Park", value: "30 min" },
    ],
    image: {
      src: masterplanAerial,
      alt: "Aerial view of the Damac Islands masterplan with the lagoon winding between clusters",
    },
    mapSvg: locationMapSvg,
    mapCaption: "Dubailand, between Sheikh Mohammed Bin Zayed Road and Emirates Road",
    mapVars: {
      "--map-ground": "oklch(0.9 0.035 215)",
      "--map-water": "oklch(0.9 0.035 215)",
      "--map-land": "oklch(0.945 0.012 80)",
      "--map-ink": "oklch(0.48 0.1 215)",
      "--map-icon": "oklch(0.55 0.09 215)",
      "--map-marker": "oklch(0.68 0.14 210)",
    },
  },
  masterplan: {
    eyebrow: "Island life",
    navLabel: "Island experiences",
    heading: "Your island life",
    headingItalic: "curated to perfection",
    copy: [
      "At the core of the tropical haven, the Central Hub Fountain stands as a mesmerising focal point where droplets pirouette with light beams and flames flirt with lasers. Around it, the lagoon, a jungle river, floating platforms and twenty-two curated attractions turn every day into island time.",
      "Whether you're paddling, swimming or lounging by the shore, the lagoon is your ticket to disconnecting from the outside world and reconnecting with what truly matters.",
    ],
    pillars: [
      {
        title: "The heart of paradise",
        image: {
          src: islandFountainSunset,
          alt: "The Central Hub Fountain lit up at sunset with boats and paddleboards on the lagoon",
        },
        copy: "The Central Hub Fountain is a living, breathing spectacle of water, light and flame. Around it, floating water platforms with bars and relaxation areas turn from serene retreats into vibrant social hubs as the sun sets.",
        stats: [
          { value: "22", label: "curated attractions" },
          { value: "6", label: "island-inspired clusters" },
        ],
      },
      {
        title: "Serene blue expanse",
        image: {
          src: islandLagoonKayaks,
          alt: "Kayaks and a floating lounge deck on the lagoon beside the beach and villas",
          position: "55% 50%",
        },
        copy: "Paddle gondola-style along LED-lit water past bustling bars and activated corridors, drift across the main lagoon in a hammock, or host boat parties from your own backyard if you live in a lagoon villa.",
        stats: [
          { value: "Gondola", label: "style LED-lit paddling after dark" },
          { value: "Private", label: "boat rides for villa residents" },
        ],
      },
      {
        title: "Jungle river trail",
        image: {
          src: islandRiverDusk,
          alt: "Glowing kayaks on the Jungle River at dusk between lit gardens and boardwalks",
          position: "45% 50%",
        },
        copy: "Let the Jungle River sweep you through verdant vegetation and giant water lilies, with hidden relaxation nooks, cascading waterfalls, the thrill of rapids and a Hot Springs Spa with infinity-edge pools to end the day.",
        stats: [
          { value: "Rapids", label: "and lagoon waterfalls along the river" },
          { value: "Hot springs", label: "spa with infinity-edge pools" },
        ],
      },
      {
        title: "Thrills and chills",
        image: {
          src: islandZipline,
          alt: "Zipline riders soaring over the lagoon towards the Central Hub Fountain",
          position: "55% 50%",
        },
        copy: "Soar over the lagoon on the zipline, swing through the jungle canopy and dive into the Aqua Park, where distinct areas for the young and the young at heart run from thrilling slides to tranquil spa zones.",
        stats: [
          { value: "Zipline", label: "across the lagoon" },
          { value: "Aqua Park", label: "from slides to spa zones" },
        ],
      },
      {
        title: "Wild at heart",
        image: {
          src: wildlifePark,
          alt: "Children walking a stone path through the Wildlife Park as parrots fly overhead",
          // Portrait render: keep the children (lower third) inside the wide mobile band.
          position: "50% 80%",
        },
        copy: "Shop among resident iguanas at the Iguanas Park and Fruit Market beside the flowing river, then wander the Tortoise Garden, Parrot Park and Wildlife Park: a living tapestry of flora and fauna.",
        stats: [
          { value: "4", label: "parks for wildlife and fresh produce" },
          { value: "Mini golf", label: "on its own island" },
        ],
      },
      {
        title: "Elevate your spirit",
        image: {
          src: yogaDecks,
          alt: "Yoga practice on floating decks in the lagoon",
          // Keep the decks with people, not the far shore, inside the wide mobile band.
          position: "50% 68%",
        },
        copy: "Find your centre on the Yoga Floating Decks as waves lap beneath you, sweat it out at the Calisthenics and Fitness Parks, dine beneath the waves at the Aqua Dome and say 'I do' at the floating Wedding Venue.",
        stats: [
          { value: "Aqua Dome", label: "underwater dining" },
          { value: "Floating", label: "wedding venue on the lagoon" },
        ],
      },
    ],
  },
  keyFeaturesHeading: { line: "Twenty-two", italic: "island attractions" },
  keyFeatures: attractions,
  keyFeaturesMap: {
    plan: {
      src: masterplanPlan,
      alt: "Aerial masterplan of Damac Islands with the numbered attractions around the lagoon",
    },
    poster: {
      src: masterplanPoster,
      alt: "Damac Islands key features poster: numbered masterplan, attraction icons and cluster map",
    },
    legend: attractions,
    planAspect: "16 / 9",
  },
  gardens: {
    eyebrow: "Signature attractions",
    heading: "Paradise,",
    headingItalic: "curated",
    copy: "Every corner of the island tells a story: dining beneath the waves, cascading spa waters, floating festivities, a wedding venue on the lagoon and an aqua park for every age.",
    items: [
      {
        name: "Aqua Dome",
        copy: "Step into a world where fantasy meets reality. This underwater marvel offers a dining experience like no other, surrounded by the serene beauty of marine life.",
        features: ["Underwater dining", "Marine life views"],
        image: { src: aquaDome, alt: "The Aqua Dome restaurant glowing over the lagoon at dusk" },
      },
      {
        name: "Lagoon Waterfalls and Hot Springs Spa",
        copy: "Let the gentle splash of cascading water soothe your mind as you soak in infinity-edge pools. Here, stress doesn't just melt away, it evaporates into the balmy island air.",
        features: ["Infinity-edge pools", "Outdoor relaxation", "Hot springs"],
        image: {
          src: waterfallsSpa,
          alt: "Infinity pools cascading into the lagoon at the Hot Springs Spa",
        },
      },
      {
        name: "Water Platforms",
        copy: "Not just structures but invitations to celebrate life. With bars and relaxation areas, these versatile decks transform from serene retreats to vibrant social hubs as the sun traverses the sky.",
        features: ["Floating bars", "Sunset lounges", "Central Hub"],
        image: { src: waterPlatforms, alt: "Floating platforms with bars and lounges at sunset" },
      },
      {
        name: "Wedding Venue",
        copy: "Life's most precious moments deserve an extraordinary setting. The floating Wedding Venue turns a destination wedding or a renewal of vows into an island fairy tale.",
        features: ["Floating venue", "Destination weddings", "Lagoon views"],
        image: {
          src: weddingVenue,
          alt: "Floating wedding venue with a walkway across the lagoon",
        },
      },
      {
        name: "Mini Golf Island",
        copy: "Looking for a laid-back challenge? Putt your way through a tropical landscape with family and friends, where every hole is a chance to create new memories.",
        features: ["Family play", "Tropical course", "Its own island"],
        image: { src: miniGolf, alt: "Mini golf course on a small island in the lagoon" },
      },
      {
        name: "Iguanas Park and Fruit Market",
        copy: "A marketplace where wildlife and fresh produce create an extraordinary tableau. Beside the flowing Jungle River, shop among resident iguanas and local fauna.",
        features: ["Fresh produce", "Resident iguanas", "Riverside"],
        image: { src: fruitMarket, alt: "Open-air fruit market under timber canopies" },
      },
      {
        name: "Aqua Park",
        copy: "Connected to the Central Hub, this aquatic playground offers distinct areas for both the young and the young at heart, from thrilling slides to tranquil spa zones.",
        features: ["Slides", "Kids' zones", "Spa zones"],
        image: { src: aquaPark, alt: "Aerial view of the Aqua Park islands with slides and pools" },
      },
      {
        name: "Jungle Swings",
        copy: "Artfully placed swings let you float gracefully above the tranquil waters and verdant shores. Each swing station offers a unique vista, for playful adventures and peaceful contemplation alike.",
        features: ["Over the water", "Canopy views", "Photo spots"],
        image: { src: jungleSwings, alt: "Swing over the lagoon with a woman wearing wings" },
      },
      {
        name: "Paddling, gondola style",
        copy: "An LED-lit paddling experience with an imaginative view of the community: glide past bustling bars and activated corridors, witnessing the island come alive as day turns to night.",
        features: ["LED-lit lagoon", "Night paddling", "Island nightlife"],
        image: { src: paddling, alt: "Illuminated kayaks paddling along the lagoon at night" },
      },
    ],
  },
  villas: {
    eyebrow: "The homes",
    unitLabel: "home types",
    heading: "Your island home",
    headingItalic: "awaits",
    copy: [
      "Step into spaces where the boundaries between indoors and outdoors blur, inviting the tropical beauty of Damac Islands into your home. Floor-to-ceiling windows frame breathtaking views, while private terraces extend your living space into the balmy island air.",
      "Breezy, open-plan layouts capture cooling cross-winds, and materials echo the natural beauty of the tropical setting: Calacatta Gold porcelain floors, brushed brass and walnut veneer.",
    ],
    image: {
      src: beachPanorama,
      alt: "Lagoon beach with sun loungers in front of Damac Islands villas",
    },
    items: [
      {
        name: "7-bedroom villa",
        bedrooms: "7 bedrooms",
        area: "1,587 sq m",
        copy: "Type LV75E: seven bedrooms plus a gym and a maid's room over a basement, ground, first and second floor, with 17,078 sq ft of saleable area, roof terraces and a private pool at the rear.",
        images: [
          { src: villa7Front, alt: "7-bedroom villa LV75E, street facade at dusk" },
          { src: villa7Rear, alt: "7-bedroom villa LV75E, rear terraces and pool" },
        ],
      },
      {
        name: "6-bedroom villa",
        bedrooms: "6 bedrooms",
        area: "991 sq m",
        copy: "Type LV55E: six bedrooms plus a gym and a maid's room across a basement and three floors, with 10,671 sq ft of saleable area, generous terraces and a pool garden.",
        images: [
          { src: villa6Front, alt: "6-bedroom villa LV55E, street facade" },
          { src: villa6Rear, alt: "6-bedroom villa LV55E, rear pool with waterfall feature" },
        ],
      },
      {
        name: "6-bedroom villa, DIV3",
        bedrooms: "6 bedrooms",
        area: "412 sq m",
        copy: "Type DIV3: a two-storey six-bedroom villa with a maid's room and 4,440 sq ft of saleable area. A covered driveway leads to a double-height glazed entrance, and the living spaces open to the garden at the rear.",
        images: [
          { src: villaDiv3Front, alt: "6-bedroom villa DIV3, street facade with covered driveway" },
          { src: villaDiv3Rear, alt: "6-bedroom villa DIV3, garden facade" },
        ],
      },
      {
        name: "5-bedroom townhouse",
        bedrooms: "5 bedrooms",
        area: "295 sq m",
        copy: "Type DITH-E: a three-floor townhouse with five bedrooms, a maid's room and 3,178 sq ft of saleable area, plus a private garden and parking under the front canopy.",
        images: [
          { src: townhouseFront, alt: "Damac Islands townhouses, street facade at dusk" },
          { src: townhouseRear, alt: "Damac Islands townhouses, rear gardens" },
        ],
      },
      {
        name: "4-bedroom townhouse",
        bedrooms: "4 bedrooms",
        area: "205 sq m",
        copy: "Type DITH-M: a two-floor townhouse with four bedrooms and 2,208 sq ft of saleable area, a rear garden and covered parking at the front.",
        images: [
          { src: townhouseStreet, alt: "Row of Damac Islands townhouses with covered parking" },
          { src: townhouseRear, alt: "Damac Islands townhouses, rear gardens" },
        ],
      },
    ],
  },
  galleryHeading: "Inside the island home",
  gallery: [
    { src: interiorFoyer, alt: "Villa foyer with marble floors and brass-framed glass doors" },
    { src: interiorFormalLiving, alt: "Formal living room with a marble feature wall" },
    { src: interiorDining, alt: "Dining room with a marble table and a black marble kitchen" },
    { src: interiorFamilyLiving, alt: "Family living room with blue accents and garden views" },
    {
      src: interiorMasterBath,
      alt: "Master bathroom with book-matched marble and a freestanding bath",
    },
    { src: villaPoolNight, alt: "Villa pool terrace with a waterfall feature at night" },
  ],
  materials: {
    heading: { line: "Crafted for", italic: "island living" },
    items: [
      "Calacatta Gold porcelain slab flooring throughout the living areas",
      "Arabescato Orobico marble and laminated glass in the entrance",
      "Marvel Orobico porcelain slab accent walls in the living rooms",
      "Brushed brass metalwork and walnut wood veneer joinery",
      "Silver Paradiso granite in the family living room",
      "Marvel Gala Desert Soul and Taj Mahal porcelain in the master bathroom",
      "Marvel Gala Crystal White porcelain and Fior di Bosco marble in secondary bathrooms",
    ],
  },
  developer: {
    name: "Damac Properties",
    copy: "Since 2002, Damac Properties has been at the forefront of the Middle East's luxury real estate market, delivering award-winning residential, commercial and leisure properties across the region and the world. With more than 47,600 units delivered, over 40,000 in progress, four master-planned communities and collaborations with global brands, Damac is a globally recognised leader in premium real estate development.",
    image: {
      src: aquaParkAerial,
      alt: "Aerial view of the Aqua Park islands on the Damac Islands lagoon",
    },
  },
};
