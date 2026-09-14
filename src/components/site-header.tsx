import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoAsset from "@/assets/lunaris-logo.png.asset.json";
import { company } from "@/data/company";

type NavLink = {
  to: "/" | "/living" | "/investing" | "/renting" | "/portfolio" | "/team" | "/contact";
  hash?: string;
  label: string;
};

/** Desktop navigation, left to right. The home-page sections link by hash. */
const links: NavLink[] = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/living", label: "Living" },
  { to: "/investing", label: "Investing" },
  { to: "/renting", label: "Renting" },
  { to: "/", hash: "news", label: "News" },
  { to: "/", hash: "faq", label: "FAQ" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

/** Mobile menu, grouped. */
const groups: { label: string; items: NavLink[] }[] = [
  {
    label: "Explore",
    items: [
      { to: "/portfolio", label: "Portfolio" },
      { to: "/living", label: "Living" },
      { to: "/investing", label: "Investing" },
      { to: "/renting", label: "Renting" },
    ],
  },
  {
    label: "Company",
    items: [
      { to: "/", hash: "news", label: "News" },
      { to: "/", hash: "faq", label: "FAQ" },
      { to: "/team", label: "Team" },
      { to: "/contact", label: "Contact" },
    ],
  },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const tone = overlay ? "text-[var(--hero-foreground)]" : "text-foreground";

  return (
    <header
      className={`z-30 w-full ${overlay ? "absolute inset-x-0 top-0" : "border-b border-border bg-background"}`}
    >
      <div
        className={`flex h-20 items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 ${tone}`}
      >
        <Link to="/" className="block" aria-label="Lunaris Real Estate home">
          <img
            src={logoAsset.url}
            alt="Lunaris Real Estate"
            width={1130}
            height={655}
            className={`h-auto w-28 object-contain sm:w-32 ${overlay ? "brightness-0 invert" : ""}`}
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              {...(link.hash ? { hash: link.hash } : {})}
              activeProps={link.hash ? {} : { className: "underline underline-offset-8" }}
              className="text-[11px] font-medium uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className={`md:hidden ${tone}`}
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-[86vw] max-w-sm flex-col overflow-y-auto bg-background pt-16">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-8" aria-label="Mobile navigation">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] font-medium uppercase text-muted-foreground">
                    {group.label}
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
                            {link.label}
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
                Get in touch
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
                  Chat on WhatsApp <ArrowUpRight aria-hidden="true" className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
