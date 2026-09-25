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

/** Founder photo; the role label is translated in the dictionaries (`company.founderRole`). */
export const founders = [{ name: "Erdi Emecan", image: erdiEmecanImage }] as const;
