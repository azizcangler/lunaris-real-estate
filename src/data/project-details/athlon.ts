import type { ProjectDetails } from "@/data/projects";

import coverImage from "@/assets/projects/athlon/cover.jpg";
import coverTexture from "@/assets/projects/athlon/cover-texture.jpg";
import heroAerialDusk from "@/assets/projects/athlon/hero-aerial-dusk.jpg";
import aerialLoops from "@/assets/projects/athlon/aerial-loops.jpg";
import clubhouseCycle from "@/assets/projects/athlon/clubhouse-cycle.jpg";
import clubhouseSunset from "@/assets/projects/athlon/clubhouse-sunset.jpg";
import villaStreet from "@/assets/projects/athlon/villa-street.jpg";
import yoga from "@/assets/projects/athlon/yoga.jpg";
import runnerPath from "@/assets/projects/athlon/runner-path.jpg";
import padel from "@/assets/projects/athlon/padel.jpg";
import amenityHubAerial from "@/assets/projects/athlon/amenity-hub-aerial.jpg";
import pumpTrack from "@/assets/projects/athlon/pump-track.jpg";
import parkLoop from "@/assets/projects/athlon/park-loop.jpg";
import poolKids from "@/assets/projects/athlon/pool-kids.jpg";
import bridgeCyclists from "@/assets/projects/athlon/bridge-cyclists.jpg";
import villasAerial from "@/assets/projects/athlon/villas-aerial.jpg";
import expertHaaland from "@/assets/projects/athlon/expert-haaland.jpg";
import familyFootball from "@/assets/projects/athlon/family-football.jpg";
import townhouse1Front from "@/assets/projects/athlon/townhouse-1-front.jpg";
import townhouse1Back from "@/assets/projects/athlon/townhouse-1-back.jpg";
import townhouse2Front from "@/assets/projects/athlon/townhouse-2-front.jpg";
import townhouse2Back from "@/assets/projects/athlon/townhouse-2-back.jpg";
import villa31Front from "@/assets/projects/athlon/villa-3-1-front.jpg";
import villa31Back from "@/assets/projects/athlon/villa-3-1-back.jpg";
import villa32Front from "@/assets/projects/athlon/villa-3-2-front.jpg";
import villa32Back from "@/assets/projects/athlon/villa-3-2-back.jpg";
import villa41Front from "@/assets/projects/athlon/villa-4-1-front.jpg";
import villa41Back from "@/assets/projects/athlon/villa-4-1-back.jpg";
import villa42Front from "@/assets/projects/athlon/villa-4-2-front.jpg";
import villa42Back from "@/assets/projects/athlon/villa-4-2-back.jpg";
import villa51Front from "@/assets/projects/athlon/villa-5-1-front.jpg";
import villa51Back from "@/assets/projects/athlon/villa-5-1-back.jpg";
import villa52Front from "@/assets/projects/athlon/villa-5-2-front.jpg";
import villa52Back from "@/assets/projects/athlon/villa-5-2-back.jpg";
import premium4HorizonFront from "@/assets/projects/athlon/premium-4-horizon-front.jpg";
import premium4HorizonBack from "@/assets/projects/athlon/premium-4-horizon-back.jpg";
import premium4PillarFront from "@/assets/projects/athlon/premium-4-pillar-front.jpg";
import premium4PillarBack from "@/assets/projects/athlon/premium-4-pillar-back.jpg";
import premium5HorizonFront from "@/assets/projects/athlon/premium-5-horizon-front.jpg";
import premium5HorizonBack from "@/assets/projects/athlon/premium-5-horizon-back.jpg";
import premium5PillarFront from "@/assets/projects/athlon/premium-5-pillar-front.jpg";
import premium5PillarBack from "@/assets/projects/athlon/premium-5-pillar-back.jpg";
import premium6HorizonFront from "@/assets/projects/athlon/premium-6-horizon-front.jpg";
import premium6HorizonBack from "@/assets/projects/athlon/premium-6-horizon-back.jpg";
import premium6PillarFront from "@/assets/projects/athlon/premium-6-pillar-front.jpg";
import premium6PillarBack from "@/assets/projects/athlon/premium-6-pillar-back.jpg";
import interiorLiving from "@/assets/projects/athlon/interior-living.jpg";
import interiorDining from "@/assets/projects/athlon/interior-dining.jpg";
import interiorKitchen from "@/assets/projects/athlon/interior-kitchen.jpg";
import interiorBedroom from "@/assets/projects/athlon/interior-bedroom.jpg";
import interiorBedroomGreen from "@/assets/projects/athlon/interior-bedroom-green.jpg";
import interiorDoubleHeight from "@/assets/projects/athlon/interior-double-height.jpg";
import communityAerialDay from "@/assets/projects/athlon/community-aerial-day.jpg";
import locationMapRaster from "@/assets/projects/athlon/location-map.jpg";
import locationMapSvg from "@/assets/projects/athlon/location-map.svg?raw";

// The brochure's map is a raster with vector labels; the SVG wraps the raster and adds the
// labels, markers and the site name (see CLAUDE.md). The placeholder takes the hashed image URL.
const locationMap = locationMapSvg.replace("__MAP_IMAGE__", locationMapRaster);

export const athlonDetails: ProjectDetails = {
  eyebrow: "Aldar · Dubailand",
  titleItalic: "welcome to active living",
  summary:
    "The first community in Dubai that makes movement a natural part of life. Walking and cycling loops weave through lush parks and seven clubhouses, so you are never more than five minutes from your next activity.",
  hero: {
    src: heroAerialDusk,
    alt: "Aerial view of Athlon at dusk with its illuminated running and cycling loops",
  },
  cover: {
    src: coverImage,
    alt: "Athlon wordmark in Arabic and Latin with the Aldar logo on purple marble",
  },
  coverBackdrop: "#41253c",
  coverTexture: { src: coverTexture, alt: "" },
  // Brochure plum with the magenta accent used for the loops and markers.
  theme: {
    primary: "oklch(0.33 0.07 320)",
    primaryForeground: "#f4eef6",
    accent: "oklch(0.52 0.17 335)",
    stageForeground: "#f1e9f2",
  },
  highlights: [
    "3 to 6-bedroom villas and townhouses",
    "Dubailand, Dubai",
    "LEED Platinum pre-certified",
  ],
  facts: [
    { label: "Developer", value: "Aldar" },
    { label: "Location", value: "Dubailand, Dubai" },
    { label: "Property type", value: "Villas and townhouses" },
    { label: "Bedrooms", value: "3 to 6" },
    {
      label: "Collections",
      value: "Standard villas, Premium villas (Horizon and Pillar), 4-plex townhouses",
    },
    { label: "Loops", value: "4.6 km trail-running, 2.2 km family, 3.7 km cycling" },
    { label: "Clubhouses", value: "7" },
    { label: "Certification", value: "LEED Platinum pre-certified, Fitwel certified" },
  ],
  intro: {
    heading: "Designed",
    imageAspect: "16 / 9",
    headingItalic: "to move you",
    copy: [
      "Our design ethos is to create a unique environment that helps people move. Developed around active design principles with wellbeing experts, Athlon seamlessly merges walking and cycling loops with lush, green parks and spaces to connect. Wherever you go in this luxury community, you're never more than five minutes from your next exhilarating activity.",
      "As one of the most trusted and recognised real estate lifestyle developers in the UAE, Aldar does more than build properties: it strives to shape communities that brim with health, happiness and wellbeing. Athlon is the first community in Dubai that makes movement a natural part of life.",
    ],
    image: {
      src: villasAerial,
      alt: "Aerial view of Athlon's villa clusters around the central park and pools",
    },
  },
  location: {
    heading: "The lushest",
    headingItalic: "location",
    copy: [
      "Perfectly positioned in Dubailand, Athlon is only 25 minutes from Dubai International Airport and 30 minutes from Jumeirah Beach. Set within one of the largest green spaces in Dubai, the community is surrounded by nature.",
      "Athlon sits between Sheikh Mohammed Bin Zayed Road and Emirates Road, next to Aldar's Haven community and close to Global Village, Dubai Hills and Al Barari. The 3.7 km cycling loop connects riders to Al Qudra's epic track.",
    ],
    distances: [
      { label: "Dubai International Airport", value: "25 min" },
      { label: "Jumeirah Beach", value: "30 min" },
      { label: "Dubai Mall, Downtown and Burj Khalifa", value: "30 min" },
      { label: "Al Qudra cycling track", value: "Via the 3.7 km loop" },
      { label: "Sheikh Mohammed Bin Zayed Road", value: "Adjacent" },
    ],
    image: {
      src: villasAerial,
      alt: "Aerial view of Athlon's villa clusters around the central park and pools",
    },
    mapSvg: locationMap,
    mapCaption: "Dubailand, between Sheikh Mohammed Bin Zayed Road and Emirates Road",
    mapVars: {
      "--map-ground": "#e9e1cf",
      "--map-ink": "#4a4340",
      "--map-marker": "oklch(0.55 0.22 335)",
    },
  },
  masterplan: {
    eyebrow: "Active design",
    navLabel: "Active living principles",
    heading: "Athlon is your",
    headingItalic: "playground",
    copy: [
      "Athlon offers programming and amenities tailored to promote long-term wellbeing for every type of resident, with spaces purposefully mapped for activity. Stretch your limits on a 4.6 km trail-running loop, a 2.2 km family-friendly loop and a 3.7 km cycling loop that connects you to Al Qudra's epic track, while outdoor workout zones, padel courts and a pump track for mountain biking make active living an almost inevitable part of every day.",
      "A Signature Clubhouse welcomes you at the entrance to Athlon. This iconic landmark is complemented by dedicated zones for fitness and socialising throughout the community.",
    ],
    pillars: [
      {
        title: "Three loops to move you",
        image: {
          src: aerialLoops,
          alt: "Aerial view of Athlon with the running, family and cycling loops highlighted",
        },
        copy: "Three dedicated loops run through the community: a 4.6 km trail-running loop, a 2.2 km family-friendly loop and a 3.7 km cycling loop that carries riders on to Al Qudra's track. Every home sits on the way to somewhere active.",
        stats: [
          { value: "4.6 km", label: "trail-running loop" },
          { value: "2.2 km", label: "family-friendly loop" },
          { value: "3.7 km", label: "cycling loop to Al Qudra" },
        ],
      },
      {
        title: "Seven clubhouses",
        image: {
          src: clubhouseCycle,
          alt: "Cyclists riding the track through the Signature Clubhouse",
        },
        copy: "A Signature Clubhouse, which you can cycle straight through, welcomes you at the entrance. Six more clubhouses spread dedicated zones for fitness and socialising across the community.",
        stats: [
          { value: "7", label: "clubhouses across the community" },
          { value: "5 min", label: "at most to your next activity" },
        ],
      },
      {
        title: "For every age and interest",
        image: {
          src: padel,
          alt: "Child reaching over the net during a padel game with a smiling woman behind",
        },
        copy: "Padel and multi-use courts, basketball, table tennis, rock climbing, a skate park and a pump track for mountain biking sit alongside splash pads, a family pool and a lap pool, so every resident finds their own way to move.",
        stats: [
          { value: "19", label: "mapped activities, from running to meditation" },
          { value: "3", label: "pools and splash zones" },
        ],
      },
      {
        title: "Built to last",
        image: {
          src: villaStreet,
          alt: "Villa with lush native landscaping and a cyclist passing the front door",
        },
        copy: "Human-centric design, energy and water efficiency, photovoltaic systems, native landscaping, shaded walkways and bikeways, EV charging and smart waste systems earned Athlon its LEED Platinum pre-certification and Fitwel certification.",
        stats: [
          { value: "LEED Platinum", label: "pre-certified community" },
          { value: "Fitwel", label: "certified for health and wellbeing" },
        ],
      },
      {
        title: "Smart by default",
        image: {
          src: amenityHubAerial,
          alt: "Aerial view of Athlon's central park with the pool, lawns and villa clusters around it",
        },
        copy: "Smart irrigation and waste management, environmental monitoring for sports, air-quality and noise monitoring with sound masking, digital amenity booking and integrated community access control keep the community running quietly in the background.",
        stats: [
          { value: "8", label: "smart systems, from irrigation to access control" },
          { value: "Live", label: "air-quality and noise monitoring" },
        ],
      },
      {
        title: "Curated by experts",
        image: {
          src: expertHaaland,
          alt: "Erling Haaland meditating cross-legged on a lawn under the trees at Athlon",
        },
        copy: "Athlon has been developed with some of the world's foremost wellbeing experts and athletes, including Manchester City's Erling Haaland, Manuel Akanji and Julián Álvarez and Indian cricket captain Rohit Sharma: people who understand the transformative impact of living in a community designed with movement and wellbeing at its core.",
        stats: [
          { value: "4", label: "world-class athletes behind the programme" },
          { value: "Man City", label: "footballers among the curating experts" },
        ],
      },
    ],
  },
  keyFeaturesHeading: { line: "Nineteen ways", italic: "to move" },
  keyFeatures: [
    "Nature loop",
    "Bike loop",
    "Parklife loop",
    "Gym",
    "Fitness nodes",
    "Pump track",
    "Splash pads",
    "Family pool",
    "Lap pool",
    "Play park",
    "Padel court",
    "MUGA court",
    "Basketball court",
    "Table tennis",
    "Rock climbing",
    "Skate park",
    "Yoga platform",
    "Cinema lawn",
    "Meditation deck",
  ],
  gardens: {
    eyebrow: "Amenities",
    heading: "The whole community",
    headingItalic: "is your playground",
    copy: "From the Signature Clubhouse at the entrance to the loops that thread the parks, Athlon's amenities are mapped so that spaces to move are always just minutes from home.",
    items: [
      {
        name: "Trail-running loop",
        copy: "A 4.6 km nature loop for runners winds through the greenest parts of the community, with shaded stretches and outdoor workout zones along the way.",
        features: ["4.6 km", "Nature loop", "Fitness nodes", "Outdoor gym"],
        image: { src: runnerPath, alt: "Runner on a shaded path between villas at Athlon" },
      },
      {
        name: "Cycling loop",
        copy: "The 3.7 km bike loop links the neighbourhoods and crosses the landmark bridge, then connects you to Al Qudra's epic cycling track beyond the community.",
        features: ["3.7 km", "Bike loop", "Al Qudra connection", "Cycle-through clubhouse"],
        image: { src: bridgeCyclists, alt: "Cyclists passing the sculptural bridge at Athlon" },
      },
      {
        name: "Family loop",
        copy: "A gentle 2.2 km parklife loop for strollers, scooters and evening walks, passing play parks, lawns and quiet corners to sit.",
        features: ["2.2 km", "Parklife loop", "Play park", "Cinema lawn"],
        image: {
          src: parkLoop,
          alt: "Park path with a playground and outdoor gym under mature trees",
        },
      },
      {
        name: "Signature Clubhouse",
        copy: "The iconic landmark at the entrance to Athlon is a clubhouse you can cycle through, with the community's gym, fitness classes and social spaces under one sweeping roof.",
        features: ["Gym", "Fitness classes", "Social spaces", "1 of 7 clubhouses"],
        image: {
          src: clubhouseSunset,
          alt: "The Signature Clubhouse at sunset",
        },
      },
      {
        name: "Pools and splash pads",
        copy: "Run, swim, glide, jump and splash: a lap pool for early laps, a family pool for long afternoons and splash pads for the youngest residents.",
        features: ["Lap pool", "Family pool", "Splash pads"],
        image: { src: poolKids, alt: "Children running along the pool deck beside a clubhouse" },
      },
      {
        name: "Courts and tracks",
        copy: "A pump track for mountain biking, padel and multi-use courts, basketball, table tennis, rock climbing and a skate park keep every age busy.",
        features: [
          "Pump track",
          "Padel",
          "MUGA court",
          "Basketball",
          "Skate park",
          "Rock climbing",
        ],
        image: { src: pumpTrack, alt: "Mountain biker on the pump track at Athlon" },
      },
      {
        name: "Wellness",
        copy: "Yoga platforms, a meditation deck and fitness and wellness classes for adults and kids, backed by à la carte services from nutritionist consultants to wellness talks.",
        features: [
          "Yoga platform",
          "Meditation deck",
          "Wellness classes",
          "Nutritionist consultants",
        ],
        image: { src: yoga, alt: "Couple practising yoga outdoors at Athlon" },
      },
    ],
  },
  villas: {
    eyebrow: "The homes",
    unitLabel: "home types",
    heading: "Homes made",
    headingItalic: "for movement",
    copy: [
      "Athlon's luxury villas and townhouses are purposefully designed to be part of a dynamic living experience, making sure that every resident enjoys effortless access to the community's unique activities and lifestyle.",
      "Every home comes with a choice of light or dark finish scheme: porcelain tile floors, reconstituted stone countertops and staircases, laminate joinery and lacquered doors.",
    ],
    image: {
      src: familyFootball,
      alt: "Family playing football on the lawn in front of an Athlon villa",
    },
    items: [
      {
        name: "4-plex townhouses",
        bedrooms: "3 and 4 bedrooms",
        copy: "Two-storey townhouses in clusters of four. A garage, a maid's room and an open kitchen, dining and living area that runs through to the terrace and garden on the ground floor; three or four bedrooms upstairs, with a family room in the 4-bedroom plan.",
        images: [
          { src: townhouse1Front, alt: "4-plex townhouse cluster type 1, street facade" },
          { src: townhouse1Back, alt: "4-plex townhouse cluster type 1, garden facade" },
          { src: townhouse2Front, alt: "4-plex townhouse cluster type 2, street facade" },
          { src: townhouse2Back, alt: "4-plex townhouse cluster type 2, garden facade" },
        ],
      },
      {
        name: "3-bedroom villa",
        bedrooms: "3 bedrooms",
        copy: "A compact standalone villa in two facade types, with a garage and a maid's room beside the entrance and the kitchen, dining and living room opening to a terrace and garden. Upstairs, the master suite with walk-in closet and terrace, two further bedrooms, a family retreat and a study.",
        images: [
          { src: villa31Front, alt: "3-bedroom standard villa type 1, street facade" },
          { src: villa31Back, alt: "3-bedroom standard villa type 1, garden and pool" },
          { src: villa32Front, alt: "3-bedroom standard villa type 2, street facade" },
          { src: villa32Back, alt: "3-bedroom standard villa type 2, garden and pool" },
        ],
      },
      {
        name: "4-bedroom villa",
        bedrooms: "4 bedrooms",
        copy: "Two facade options with a garage beside the entrance. A guest bedroom, a maid's room and the open kitchen, dining and living room sit on the ground floor; upstairs are the master suite with walk-in closet, two further bedrooms and a family retreat opening onto a terrace.",
        images: [
          { src: villa41Front, alt: "4-bedroom standard villa type 1, street facade" },
          { src: villa41Back, alt: "4-bedroom standard villa type 1, garden and pool" },
          { src: villa42Front, alt: "4-bedroom standard villa type 2, street facade" },
          { src: villa42Back, alt: "4-bedroom standard villa type 2, garden and pool" },
        ],
      },
      {
        name: "5-bedroom villa",
        bedrooms: "5 bedrooms",
        copy: "The largest standard villa: an 8-metre living room, separate dining, a bedroom, a maid's room and a two-car garage on the ground floor, with the master suite, three further bedrooms, a family retreat and a study upstairs.",
        images: [
          { src: villa51Front, alt: "5-bedroom standard villa type 1, street facade" },
          { src: villa51Back, alt: "5-bedroom standard villa type 1, garden and pool at dusk" },
          { src: villa52Front, alt: "5-bedroom standard villa type 2, street facade" },
          { src: villa52Back, alt: "5-bedroom standard villa type 2, garden and pool at dusk" },
        ],
      },
      {
        name: "4-bedroom Premium villa",
        bedrooms: "4 bedrooms · Horizon or Pillar",
        copy: "Premium villas come in two architectural expressions: Horizon, with long horizontal roof planes and stone-clad walls, and Pillar, with tall vertical fins framing the glazing. Inside: a two-car garage, an office, separate formal and family living rooms, a dining room with show kitchen plus a wet kitchen and a pool terrace; upstairs the master suite, three bedrooms, a family retreat and a study.",
        images: [
          { src: premium4HorizonFront, alt: "4-bedroom Premium villa Horizon, street facade" },
          { src: premium4HorizonBack, alt: "4-bedroom Premium villa Horizon, garden facade" },
          { src: premium4PillarFront, alt: "4-bedroom Premium villa Pillar, street facade" },
          { src: premium4PillarBack, alt: "4-bedroom Premium villa Pillar, garden and pool" },
        ],
      },
      {
        name: "5-bedroom Premium villa",
        bedrooms: "5 bedrooms · Horizon or Pillar",
        copy: "The larger Premium plan adds a guest bedroom on the ground floor beside the formal and family living rooms, the dining room with show kitchen and a wet kitchen. The master suite and three more bedrooms share the first floor with a family retreat and balconies, and the pool terrace sits at the rear. Available as Horizon or Pillar.",
        images: [
          { src: premium5HorizonFront, alt: "5-bedroom Premium villa Horizon, street facade" },
          { src: premium5HorizonBack, alt: "5-bedroom Premium villa Horizon, garden facade" },
          { src: premium5PillarFront, alt: "5-bedroom Premium villa Pillar, street facade" },
          { src: premium5PillarBack, alt: "5-bedroom Premium villa Pillar, garden facade" },
        ],
      },
      {
        name: "6-bedroom Premium villa",
        bedrooms: "6 bedrooms · Horizon or Pillar",
        copy: "The flagship Premium villa rises over three floors: a second-floor family living room with a pantry and an 8.5-metre outdoor lounge, plus provision for a lift. Available in the Horizon and Pillar expressions.",
        images: [
          { src: premium6HorizonFront, alt: "6-bedroom Premium villa Horizon, street facade" },
          { src: premium6HorizonBack, alt: "6-bedroom Premium villa Horizon, garden and pool" },
          { src: premium6PillarFront, alt: "6-bedroom Premium villa Pillar, street facade" },
          { src: premium6PillarBack, alt: "6-bedroom Premium villa Pillar, garden and pool" },
        ],
      },
    ],
  },
  galleryHeading: "Understated luxury",
  gallery: [
    { src: interiorLiving, alt: "Living room with a slatted timber wall and green armchairs" },
    { src: interiorDining, alt: "Dining room with a long timber table under a sculptural light" },
    { src: interiorKitchen, alt: "Open kitchen and dining area opening to the garden" },
    { src: interiorBedroom, alt: "Bedroom with a balcony overlooking the community" },
    { src: interiorBedroomGreen, alt: "Bedroom waking up to greenery" },
    { src: interiorDoubleHeight, alt: "Double-height living space bathed in sunlight" },
  ],
  materials: {
    heading: { line: "Light or", italic: "dark scheme" },
    items: [
      "Porcelain tile floors in living areas, bedrooms and bathrooms",
      "Reconstituted stone kitchen countertops, backsplash and bathroom vanities",
      "Reconstituted stone staircases and thresholds",
      "Laminate kitchen and bathroom joinery, living room slats and main door",
      "Lacquered interior doors and wardrobes",
      "Ceramic sanitaryware with metal ironmongery",
      "Choice of a light or a dark finish scheme",
    ],
  },
  developer: {
    name: "Aldar",
    copy: "As one of the most trusted and recognised real estate lifestyle developers in the UAE, Aldar sees it as its duty to nurture wellness in every home. The developer does more than build properties: it strives to shape communities that brim with health, happiness and wellbeing. Athlon, developed with wellbeing experts and world-class athletes, is the first community in Dubai that makes movement a natural part of life.",
    image: {
      src: communityAerialDay,
      alt: "Daytime aerial view of the whole Athlon community in Dubailand",
    },
  },
};
