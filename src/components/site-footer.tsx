import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

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

const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "WhatsApp", href: company.whatsapp, icon: MessageCircle },
  { label: "Instagram", href: company.social.instagram, icon: Instagram },
  { label: "LinkedIn", href: company.social.linkedin, icon: Linkedin },
];

/** Gold eyebrow with a leading rule, as in the home page sections. */
function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d8c3a0]">
      <span aria-hidden="true" className="h-px w-8 bg-[#d8c3a0]/70" />
      {children}
    </p>
  );
}

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#d8c3a0]/40 text-[#d8c3a0] transition-colors group-hover:border-[#d8c3a0] group-hover:bg-[#d8c3a0] group-hover:text-[#2b221c]">
      <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
    </span>
  );
}

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="bg-[#2b221c] text-[#efe9dc]">
      <div className="grid gap-12 px-6 py-14 sm:px-10 md:grid-cols-2 md:px-16 md:py-20 lg:grid-cols-[1fr_1.1fr_0.9fr_1.2fr] lg:gap-10 lg:px-24">
        <div>
          <LunarisLogo className="w-36 text-[#efe9dc]" title={company.name} />
        </div>

        <div>
          <FooterHeading>{t.footer.navigation}</FooterHeading>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  className="font-editorial text-lg text-[#efe9dc]/85 transition-colors hover:text-[#d8c3a0]"
                >
                  {t.nav[item.label]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>{t.footer.connect}</FooterHeading>
          <ul className="mt-6 flex flex-col gap-4">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-4 text-sm text-[#efe9dc]/85 hover:text-[#efe9dc]"
                >
                  <IconBadge icon={item.icon} />
                  {item.label}
                  <ArrowUpRight className="size-3.5 opacity-50" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>{t.footer.visitUs}</FooterHeading>
          <ul className="mt-6 flex flex-col gap-4 text-sm leading-6 text-[#efe9dc]/85">
            <li className="flex items-start gap-4">
              <IconBadge icon={MapPin} />
              <address className="not-italic">
                {company.address.building}, {company.address.area}
                <br />
                {company.address.office}
                <br />
                {company.address.city}
              </address>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="group inline-flex items-center gap-4 hover:text-[#efe9dc]"
              >
                <IconBadge icon={Mail} />
                {company.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${company.phoneTel}`}
                className="group inline-flex items-center gap-4 hover:text-[#efe9dc]"
              >
                <IconBadge icon={Phone} />
                {company.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-6 text-[11px] uppercase tracking-[0.12em] text-[#efe9dc]/50 sm:flex-row sm:items-center sm:justify-between sm:px-10 md:px-16 lg:px-24">
        <p>
          © {new Date().getFullYear()} {company.name}. {t.footer.rights}
        </p>
        <p>{t.footer.location}</p>
      </div>
    </footer>
  );
}
