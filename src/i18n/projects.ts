import { projects as baseProjects, type Project, type ProjectDetails } from "@/data/projects";
import { news as baseNews, type NewsItem } from "@/data/news";

import { getDictionary } from "./index";
import { mergeTranslation } from "./merge";
import { defaultLocale, type Locale } from "./locales";
import { projectDetailTranslations } from "./project-details";

export type DetailedProject = Project & { details: ProjectDetails };

const projectCache = new Map<Locale, Project[]>();
const newsCache = new Map<Locale, NewsItem[]>();

/** The project list with card copy and detail-page text in the given language (English as base). */
export function getProjects(locale: Locale): Project[] {
  if (locale === defaultLocale) return baseProjects;
  const cached = projectCache.get(locale);
  if (cached) return cached;
  const copy = getDictionary(locale).projects;
  const overlays = projectDetailTranslations[locale];
  const localized = baseProjects.map((project) => {
    const text = copy[project.slug];
    const overlay = overlays[project.slug];
    const details = project.details
      ? mergeTranslation<ProjectDetails>(project.details, overlay)
      : project.details;
    return { ...project, ...(text ?? {}), ...(details ? { details } : {}) };
  });
  projectCache.set(locale, localized);
  return localized;
}

export const getFeaturedProjects = (locale: Locale): Project[] => getProjects(locale).slice(0, 3);

export function findDetailedProject(locale: Locale, slug: string): DetailedProject | undefined {
  const project = getProjects(locale).find((item) => item.slug === slug);
  return project?.details ? (project as DetailedProject) : undefined;
}

/** News cards with title, excerpt and image alt in the given language. */
export function getNews(locale: Locale): NewsItem[] {
  if (locale === defaultLocale) return baseNews;
  const cached = newsCache.get(locale);
  if (cached) return cached;
  const copy = getDictionary(locale).news.items;
  const localized = baseNews.map((item) => {
    const text = copy[item.slug];
    if (!text) return item;
    return {
      ...item,
      title: text.title,
      excerpt: text.excerpt,
      image: { ...item.image, alt: text.imageAlt ?? item.image.alt },
    };
  });
  newsCache.set(locale, localized);
  return localized;
}
