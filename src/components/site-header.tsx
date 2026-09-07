import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoAsset from "@/assets/lunaris-logo.png.asset.json";

const links = [
  { to: "/living", label: "Living" },
  { to: "/investing", label: "Investing" },
  { to: "/renting", label: "Renting" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/team", label: "Team" },
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const tone = overlay ? "text-[var(--hero-foreground)]" : "text-foreground";

  return (
    <header className={`z-30 w-full ${overlay ? "absolute inset-x-0 top-0" : "border-b border-border bg-background"}`}>
      <div className={`flex h-20 items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 ${tone}`}>
        <Link to="/" className="block" aria-label="Lunaris Real Estate home">
          <img
            src={logoAsset.url}
            alt="Lunaris Real Estate"
            width={1130}
            height={655}
            className={`h-auto w-28 object-contain sm:w-32 ${overlay ? "brightness-0 invert" : ""}`}
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.to} to={link.to} activeProps={{ className: "underline underline-offset-8" }} className="text-[11px] font-medium uppercase">
              {link.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu" className={`md:hidden ${tone}`}>
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-background pt-20">
            <nav className="flex flex-col gap-7" aria-label="Mobile navigation">
              {links.map((link) => (
                <Link key={link.to} to={link.to} className="font-display text-4xl italic text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}