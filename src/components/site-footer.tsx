import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { LunarisLogo } from "@/components/lunaris-logo";
import type { NavLink } from "@/components/site-header";
import { company } from "@/data/company";
import { useT } from "@/i18n";

const navigation: NavLink[] = [
  { to: "/{-$lang}", label: "home" },
  { to: "/{-$lang}/living", label: "living" },
  { to: "/{-$lang}/investing", label: "investing" },
  { to: "/{-$lang}/renting", label: "renting" },
  { to: "/{-$lang}/portfolio", label: "portfolio" },
  { to: "/{-$lang}", hash: "news", label: "news" },
  { to: "/{-$lang}", hash: "faq", label: "faq" },
  { to: "/{-$lang}/team", label: "team" },
  { to: "/{-$lang}/contact", label: "contact" },
];

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="border-t border-border bg-background">
      <div className="grid gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] md:gap-10 md:px-16 md:py-20 lg:px-24">
        <div>
          <LunarisLogo className="w-32 text-foreground" title={company.name} />
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">{t.footer.about}</p>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase text-muted-foreground">
            {t.footer.navigation}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 md:mt-5 md:flex-col md:gap-3">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  className="text-sm text-foreground hover:text-accent"
                >
                  {t.nav[item.label]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase text-muted-foreground">
            {t.footer.connect}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 md:mt-5 md:flex-col md:gap-3">
            <li>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-foreground hover:text-accent"
              >
                WhatsApp <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-foreground hover:text-accent"
              >
                Instagram <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-foreground hover:text-accent"
              >
                LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase text-muted-foreground">
            {t.footer.visitUs}
          </p>
          <address className="mt-5 text-sm not-italic leading-7 text-foreground">
            {company.address.building}, {company.address.area}
            <br />
            {company.address.office}
            <br />
            {company.address.city}
          </address>
          <p className="mt-5 text-sm leading-7">
            <a href={`mailto:${company.email}`} className="block text-foreground hover:text-accent">
              {company.email}
            </a>
            <a href={`tel:${company.phoneTel}`} className="block text-foreground hover:text-accent">
              {company.phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-6 py-6 text-[11px] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 md:px-16 lg:px-24">
        <p>
          © {new Date().getFullYear()} {company.name}. {t.footer.rights}
        </p>
        <p>{t.footer.location}</p>
      </div>
    </footer>
  );
}
