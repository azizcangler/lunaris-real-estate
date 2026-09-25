import type { NewsCategory } from "@/data/news";
import type { ProjectDetails } from "@/data/projects";

/** Recursively optional copy of a data shape; used for per-language text overlays. */
export type DeepPartial<T> = T extends string | number | boolean | null | undefined
  ? T
  : T extends (infer U)[]
    ? DeepPartial<U>[]
    : { [K in keyof T]?: DeepPartial<T[K]> };

/**
 * Translated text of a project detail page. Only text fields are present; image `src`, the map
 * SVG, colours and other structural values stay in the English base (`src/data/project-details`).
 * Arrays are merged by index, so they must keep the English order and length.
 */
export type ProjectDetailsTranslation = DeepPartial<ProjectDetails>;

export type ProjectCopy = { location: string; headline: string; description: string };
export type NewsCopy = { title: string; excerpt: string; imageAlt?: string };
export type PageMeta = { title: string; description: string; ogDescription: string };
export type EditorialCopy = {
  eyebrow: string;
  title: string;
  italicTitle: string;
  introduction: string;
  points: { number: string; title: string; copy: string }[];
  checklist: string[];
};

/** Every user-facing string outside the project detail data. `{name}`-style placeholders are filled with `fmt()`. */
export interface Dictionary {
  meta: {
    site: { title: string; description: string };
    home: PageMeta;
    portfolio: PageMeta;
    team: PageMeta;
    contact: PageMeta;
    living: PageMeta;
    investing: PageMeta;
    renting: PageMeta;
    /** "{name} by {developer} | Lunaris" */
    projectTitle: string;
  };
  nav: {
    home: string;
    portfolio: string;
    living: string;
    investing: string;
    renting: string;
    news: string;
    faq: string;
    team: string;
    contact: string;
    explore: string;
    company: string;
    getInTouch: string;
    chatOnWhatsApp: string;
    openMenu: string;
    menu: string;
    mainNavigation: string;
    mobileNavigation: string;
    homeLink: string;
    language: string;
  };
  footer: {
    about: string;
    navigation: string;
    connect: string;
    visitUs: string;
    rights: string;
    location: string;
  };
  whatsapp: { aria: string; title: string; subtitle: string };
  errors: {
    notFoundTitle: string;
    notFoundCopy: string;
    goHome: string;
    errorTitle: string;
    errorCopy: string;
    tryAgain: string;
  };
  home: {
    heroTitle: string;
    heroCopy: string;
    viewPortfolio: string;
    requestConsultation: string;
    popularProjects: string;
    developers: string;
    /** "Show {name}" */
    showProject: string;
    whoAreWe: string;
    whoTitle: string;
    whoTitleItalic: string;
    teamImageAlt: string;
    meetTheTeam: string;
    ourPortfolio: string;
    selectedProjects: string;
    viewAll: string;
    viewAllProjects: string;
    whyEyebrow: string;
    whyTitle: string;
    whyTitleItalic: string;
    /** "Architectural rendering of {name} by {developer}" */
    renderAlt: string;
  };
  company: {
    founderRole: string;
    whoWeAre: {
      intro: string;
      inspiration: string;
      offerings: string[];
      support: string;
      mission: string;
      team: string;
      closing: string;
      motto: string;
    };
    strengths: { title: string; copy: string }[];
    whyChooseUs: { intro: string; points: { title: string; copy: string }[] };
    howItWorks: { intro: string; steps: { number: string; title: string; copy: string }[] };
  };
  portfolio: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    intro: string;
    exploreProject: string;
    readBrochure: string;
    discoverTitle: string;
    discoverTitleItalic: string;
    discoverCopy: string;
    requestAvailability: string;
  };
  team: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    heroCopy: string;
    whoEyebrow: string;
    whoTitle: string;
    whoTitleItalic: string;
    seeking: string;
    founderEyebrow: string;
    founderTitle: string;
    founderTitleItalic: string;
    /** "Portrait of {name}, {role} of Lunaris Real Estate" */
    portraitAlt: string;
    howEyebrow: string;
    howTitle: string;
    howTitleItalic: string;
    getInTouch: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    intro: string;
    chatOnWhatsApp: string;
    followUs: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    messagePlaceholder: string;
    sendVia: string;
    chooseChannel: string;
    whatsapp: string;
    emailChannel: string;
    send: string;
    /** "Your message opens in {app} with the details prefilled, so nothing is stored on this site." */
    note: string;
    noteWhatsApp: string;
    noteEmail: string;
    /** "Hello Lunaris, I'm {firstName} {lastName}." */
    greeting: string;
    emailLabel: string;
    phoneLabel: string;
    /** "Property enquiry from {firstName} {lastName}" */
    subject: string;
  };
  editorial: {
    heroAlt: string;
    path: string;
    consultation: string;
    living: EditorialCopy;
    investing: EditorialCopy;
    renting: EditorialCopy;
  };
  faq: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    intro: string;
    ask: string;
    items: { question: string; answer: string }[];
  };
  news: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    all: string;
    filterAria: string;
    categories: Record<NewsCategory, string>;
    /** Keyed by news slug; missing entries fall back to the English text in `src/data/news.ts`. */
    items: Partial<Record<string, NewsCopy>>;
  };
  project: {
    scrollHint: string;
    allProjects: string;
    aboutProject: string;
    requestAvailability: string;
    downloadBrochure: string;
    location: string;
    keyFeatures: string;
    openMasterplan: string;
    tapToEnlarge: string;
    masterplanDialogTitle: string;
    masterplanDialogCopy: string;
    /** "select one to explore" — rendered as "{count} {unitLabel} · select one to explore" */
    selectOne: string;
    /** "Open {name}" */
    openType: string;
    moreViews: string;
    floorPlansInBrochure: string;
    floorPlansPricing: string;
    gallery: string;
    fullBrochure: string;
    materialBoard: string;
    aboutDeveloper: string;
    nextStep: string;
    interestedIn: string;
    ctaCopy: string;
    chatOnWhatsApp: string;
  };
  /** Keyed by project slug; missing entries fall back to the English text in `src/data/projects.ts`. */
  projects: Partial<Record<string, ProjectCopy>>;
}
