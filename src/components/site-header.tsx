import { Link, useLocation, useMatches } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LunarisLogo } from "@/components/lunaris-logo";
import { company } from "@/data/company";
import { langParam, localeNames, localeShortNames, locales, useT, type Dictionary } from "@/i18n";

/** Internal page link; shared with the footer so new pages are added in one place. */
export type NavLink = {
  to:
    | "/{-$lang}"
    | "/{-$lang}/living"
    | "/{-$lang}/investing"
    | "/{-$lang}/renting"
    | "/{-$lang}/portfolio"
    | "/{-$lang}/team"
    | "/{-$lang}/contact";
  hash?: string;
  label: keyof Dictionary["nav"];
};

/** Desktop navigation, left to right. The home-page sections link by hash. */
const links: NavLink[] = [
  { to: "/{-$lang}/portfolio", label: "portfolio" },
  { to: "/{-$lang}/living", label: "living" },
  { to: "/{-$lang}/investing", label: "investing" },
  { to: "/{-$lang}/renting", label: "renting" },
  { to: "/{-$lang}", hash: "news", label: "news" },
  { to: "/{-$lang}", hash: "faq", label: "faq" },
  { to: "/{-$lang}/team", label: "team" },
  { to: "/{-$lang}/contact", label: "contact" },
];

/** Mobile menu, grouped. */
const groups: { label: keyof Dictionary["nav"]; items: NavLink[] }[] = [
  {
    label: "explore",
    items: [
      { to: "/{-$lang}/portfolio", label: "portfolio" },
      { to: "/{-$lang}/living", label: "living" },
      { to: "/{-$lang}/investing", label: "investing" },
      { to: "/{-$lang}/renting", label: "renting" },
    ],
  },
  {
    label: "company",
    items: [
      { to: "/{-$lang}", hash: "news", label: "news" },
      { to: "/{-$lang}", hash: "faq", label: "faq" },
      { to: "/{-$lang}/team", label: "team" },
      { to: "/{-$lang}/contact", label: "contact" },
    ],
  },
];

/**
 * EN · TR · RU switcher that keeps the visitor on the same page. The current route's full path
 * (with its `{-$lang}` segment) is re-linked with a different `lang` param.
 */
function LanguageSwitcher({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale, t } = useT();
  const matches = useMatches();
  const location = useLocation();
  const leaf = matches[matches.length - 1];
  const to = (leaf?.fullPath ?? "/{-$lang}") as "/{-$lang}";
  // Keep the section anchor (/#faq) and any search params when switching language.
  const hash = location.hash ? { hash: location.hash } : {};
  return (
    <nav aria-label={t.nav.language} className={`flex items-center gap-1 ${className}`}>
      {locales.map((item, index) => (
        <span key={item} className="flex items-center gap-1">
          {index > 0 ? (
            <span aria-hidden="true" className="opacity-40">
              /
            </span>
          ) : null}
          <Link
            to={to}
            params={(previous) => ({ ...previous, lang: langParam(item) })}
            search={(previous) => previous}
            {...hash}
            aria-current={item === locale ? "true" : undefined}
            aria-label={localeNames[item]}
            className={`px-1 text-[11px] font-medium uppercase tracking-[0.08em] transition-opacity ${
              item === locale
                ? "opacity-100 underline underline-offset-8"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {compact ? localeShortNames[item] : localeNames[item]}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const { t } = useT();
  const tone = overlay ? "text-[var(--hero-foreground)]" : "text-foreground";

  return (
    <header
      className={`z-30 w-full ${overlay ? "absolute inset-x-0 top-0" : "border-b border-border bg-background"}`}
    >
      <div
        className={`flex h-20 items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 ${tone}`}
      >
        <Link to="/{-$lang}" className="block" aria-label={t.nav.homeLink}>
          <LunarisLogo className="w-28 sm:w-32" />
        </Link>
        {/* Desktop nav from lg: the Russian labels plus the language switcher need about 1000px. */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
          <nav className="flex items-center gap-5 xl:gap-8" aria-label={t.nav.mainNavigation}>
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                {...(link.hash ? { hash: link.hash } : {})}
                activeProps={link.hash ? {} : { className: "underline underline-offset-8" }}
                activeOptions={{ exact: link.to === "/{-$lang}" }}
                className="text-[11px] font-medium uppercase"
              >
                {t.nav[link.label]}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher compact className="border-l border-current/25 pl-5" />
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher compact />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t.nav.openMenu} className={tone}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-[86vw] max-w-sm flex-col overflow-y-auto bg-background pt-16">
              <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
              <nav className="flex flex-col gap-8" aria-label={t.nav.mobileNavigation}>
                {groups.map((group) => (
                  <div key={group.label}>
                    <p className="text-[11px] font-medium uppercase text-muted-foreground">
                      {t.nav[group.label]}
                    </p>
                    <ul className="mt-3 flex flex-col">
                      {group.items.map((link) => (
                        <li key={link.label} className="border-b border-border">
                          <SheetClose asChild>
                            <Link
                              to={link.to}
                              {...(link.hash ? { hash: link.hash } : {})}
                              className="flex items-center justify-between py-3 font-display text-3xl italic text-foreground"
                            >
                              {t.nav[link.label]}
                              <ArrowUpRight
                                aria-hidden="true"
                                className="size-4 text-muted-foreground"
                              />
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
              <div className="mt-auto border-t border-border pt-6">
                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                  {t.nav.language}
                </p>
                <LanguageSwitcher className="mt-3 text-foreground" />
                <p className="mt-6 text-[11px] font-medium uppercase text-muted-foreground">
                  {t.nav.getInTouch}
                </p>
                <a
                  href={`tel:${company.phoneTel}`}
                  className="mt-3 block text-sm text-foreground hover:text-accent"
                >
                  {company.phoneDisplay}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 block text-sm text-foreground hover:text-accent"
                >
                  {company.email}
                </a>
                <Button
                  asChild
                  className="mt-5 h-11 w-full rounded-none text-xs uppercase shadow-none"
                >
                  <a href={company.whatsapp} target="_blank" rel="noreferrer">
                    {t.nav.chatOnWhatsApp}{" "}
                    <ArrowUpRight aria-hidden="true" className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
