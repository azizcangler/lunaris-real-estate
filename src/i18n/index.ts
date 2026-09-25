import { useParams } from "@tanstack/react-router";

import { en } from "./en";
import { ru } from "./ru";
import { tr } from "./tr";
import { defaultLocale, localeFromParam, localePrefix, locales, type Locale } from "./locales";
import type { Dictionary } from "./types";

export * from "./locales";
export type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, tr, ru };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

/** Fills `{name}`-style placeholders. */
export const fmt = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );

/** Current locale from the optional `{-$lang}` route param (English outside a prefixed route). */
export function useLocale(): Locale {
  const params = useParams({ strict: false }) as { lang?: string };
  return localeFromParam(params.lang);
}

/** Current locale plus its dictionary. */
export function useT(): { locale: Locale; t: Dictionary } {
  const locale = useLocale();
  return { locale, t: dictionaries[locale] };
}

const SITE_ORIGIN = "https://lunarisrealestate.com";

/**
 * `<link rel="alternate" hreflang>` entries for a page, given its path without locale prefix
 * (e.g. "/portfolio"). Includes `x-default` pointing at the English page.
 */
export function alternateLinks(path: string) {
  const clean = path === "/" ? "" : path;
  // No trailing slash on prefixed homes (`/tr`, not `/tr/`), matching the router and in-app links.
  const href = (locale: Locale) => {
    const prefix = localePrefix(locale);
    return clean || prefix ? `${SITE_ORIGIN}${prefix}${clean}` : `${SITE_ORIGIN}/`;
  };
  return [
    ...locales.map((locale) => ({ rel: "alternate", hrefLang: locale, href: href(locale) })),
    { rel: "alternate", hrefLang: "x-default", href: href(defaultLocale) },
  ];
}

/** Standard per-page meta tags (title, description, Open Graph, Twitter card). */
export function pageMeta(meta: { title: string; description: string; ogDescription: string }) {
  return [
    { title: meta.title },
    { name: "description", content: meta.description },
    { property: "og:title", content: meta.title },
    { property: "og:description", content: meta.ogDescription },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
