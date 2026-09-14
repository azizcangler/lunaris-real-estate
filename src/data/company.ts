import erdiEmecanImage from "@/assets/team/erdi-emecan.jpg";

export const company = {
  name: "Lunaris Real Estate",
  tagline: "Next-generation real estate company in Dubai",
  email: "info@lunarisrealestate.com",
  phoneDisplay: "+971 52 698 55 65",
  phoneTel: "+971526985565",
  whatsapp: "https://wa.me/971526985565",
  address: {
    building: "Iris Bay Tower",
    area: "Business Bay",
    office: "Office 1005-06",
    city: "Dubai, United Arab Emirates",
  },
  social: {
    instagram: "https://www.instagram.com/lunarisrealestate",
    linkedin: "https://www.linkedin.com/in/lunarisrealestate",
  },
} as const;

export const founders = [{ name: "Erdi Emecan", role: "Owner", image: erdiEmecanImage }] as const;

export const whoWeAre = {
  intro:
    "Lunaris Real Estate is a next-generation real estate company based in Dubai, committed to redefining the property experience through innovation, integrity, and personalized service.",
  inspiration:
    "Inspired by our name, Lunaris, meaning “moonlit”, we aim to illuminate the path for our clients, offering not just properties, but lifestyle investments with long-term value.",
  offerings: [
    "Luxury residences",
    "Commercial spaces",
    "Off-plan opportunities",
    "Tailored investment solutions",
  ],
  support:
    "We provide end-to-end consultancy and support, from property search to after-sales care.",
  mission:
    "We understand that navigating the Dubai real estate market can be complex. That’s why our mission is to make the process transparent, efficient, and fully client-focused.",
  team: "Our team consists of seasoned professionals who combine deep market insight with a global perspective to deliver results that align with your goals.",
  closing:
    "At Lunaris Real Estate, we don’t just close deals. We build relationships, create value, and help our clients make confident decisions in one of the world’s most dynamic property markets.",
  motto: "Dream boldly. Invest wisely. Let us guide the way.",
} as const;

export const strengths = [
  {
    title: "Wide property portfolio",
    copy: "From residential sales and rentals to commercial properties, explore hundreds of listings for every budget.",
  },
  {
    title: "Prime locations",
    copy: "Discover properties in the most valuable and high-demand areas, ideal for living or investing.",
  },
  {
    title: "Expert consultancy",
    copy: "Our experienced team guides you through the entire buying or selling process with transparency, speed, and trust.",
  },
] as const;

export const whyChooseUs = {
  intro:
    "We’re more than just a real estate agency. We’re your trusted partner in every step of your property journey. From first-time homebuyers to seasoned investors, our commitment to service, transparency, and results is what sets us apart.",
  points: [
    {
      title: "Tailored property matches",
      copy: "We listen to your needs and find listings that truly fit your lifestyle, budget, and goals.",
    },
    {
      title: "Smart investment guidance",
      copy: "Our market insights and data-driven advice help you make confident, profitable decisions.",
    },
  ],
} as const;

export const howItWorks = {
  intro:
    "Finding the right property doesn't have to be complicated. Here's how we make your real estate journey simple and stress-free.",
  steps: [
    {
      number: "01",
      title: "Tell us what you need",
      copy: "Share your preferences: location, budget, property type. We'll start matching you with ideal listings right away.",
    },
    {
      number: "02",
      title: "Explore your options",
      copy: "Browse personalized listings, schedule viewings, and receive expert insights tailored to your goals.",
    },
    {
      number: "03",
      title: "Close with confidence",
      copy: "From offer to paperwork, our team supports you through every step, ensuring a smooth and secure transaction.",
    },
  ],
} as const;
