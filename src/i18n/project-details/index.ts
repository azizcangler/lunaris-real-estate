import type { Locale } from "@/i18n/locales";
import type { ProjectDetailsTranslation } from "@/i18n/types";

import { athlonRu } from "./ru/athlon";
import { damacIslandsRu } from "./ru/damac-islands";
import { theAcresRu } from "./ru/the-acres";
import { athlonTr } from "./tr/athlon";
import { damacIslandsTr } from "./tr/damac-islands";
import { theAcresTr } from "./tr/the-acres";

/** Text overlays for the project detail pages, by locale and project slug. English is the base data. */
export const projectDetailTranslations: Record<
  Locale,
  Partial<Record<string, ProjectDetailsTranslation>>
> = {
  en: {},
  tr: { "the-acres": theAcresTr, athlon: athlonTr, "damac-islands": damacIslandsTr },
  ru: { "the-acres": theAcresRu, athlon: athlonRu, "damac-islands": damacIslandsRu },
};
