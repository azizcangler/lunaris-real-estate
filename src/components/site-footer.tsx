import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import logoAsset from "@/assets/lunaris-logo.png.asset.json";
import { company } from "@/data/company";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/living", label: "Living" },
  { to: "/investing", label: "Investing" },
  { to: "/renting", label: "Renting" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="grid gap-12 px-6 py-14 sm:px-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] md:gap-10 md:px-16 md:py-20 lg:px-24">
        <div>
          <img
            src={logoAsset.url}
            alt={company.name}
            width={1130}
            height={655}
            loading="lazy"
            className="h-auto w-32 object-contain"
          />
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
            At Lunaris Real Estate, we redefine the property journey in Dubai through innovation,
            elegance, and trust. With a client-first approach and global standards, we offer
            tailored real estate solutions that go beyond transactions.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase text-muted-foreground">Navigation</p>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-foreground hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase text-muted-foreground">Connect</p>
          <ul className="mt-5 space-y-3">
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
          <p className="text-[11px] font-medium uppercase text-muted-foreground">Visit us</p>
          <address className="mt-5 text-sm not-italic leading-7 text-foreground">
            {company.address.building}
            <br />
            {company.address.area}, {company.address.office}
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
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
        <p>Dubai, United Arab Emirates</p>
      </div>
    </footer>
  );
}
