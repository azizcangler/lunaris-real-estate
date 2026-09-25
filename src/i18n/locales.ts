export const locales = ["en", "tr", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Native-language names for the language switcher. */
export const localeNames: Record<Locale, string> = { en: "English", tr: "Türkçe", ru: "Русский" };
export const localeShortNames: Record<Locale, string> = { en: "EN", tr: "TR", ru: "RU" };
/** BCP 47 tags for `Intl` formatting and `<html lang>`. */
export const localeTags: Record<Locale, string> = { en: "en-GB", tr: "tr-TR", ru: "ru-RU" };

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Resolves the optional `{-$lang}` route param to a locale (English when absent). */
export const localeFromParam = (lang: string | undefined): Locale =>
  isLocale(lang) ? lang : defaultLocale;

/** Value for the optional `{-$lang}` route param: English has no URL prefix. */
export const langParam = (locale: Locale): string | undefined =>
  locale === defaultLocale ? undefined : locale;

/** URL path prefix for a locale: "" for English, "/tr", "/ru". */
export const localePrefix = (locale: Locale): string =>
  locale === defaultLocale ? "" : `/${locale}`;
