import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/data/company";
import { alternateLinks, fmt, getDictionary, localeFromParam, pageMeta, useT } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/contact")({
  head: ({ params }) => ({
    meta: pageMeta(getDictionary(localeFromParam(params.lang)).meta.contact),
    links: alternateLinks("/contact"),
  }),
  component: ContactPage,
});

type Channel = "whatsapp" | "email";

function ContactPage() {
  const { t } = useT();
  const copy = t.contact;
  const [channel, setChannel] = useState<Channel>("whatsapp");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [
      fmt(copy.greeting, { firstName, lastName }),
      message,
      "",
      email ? `${copy.emailLabel}: ${email}` : "",
      phone ? `${copy.phoneLabel}: ${phone}` : "",
    ].filter((line, index) => line !== "" || index === 2);
    const body = lines.join("\n");

    if (channel === "whatsapp") {
      window.open(`${company.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    } else {
      const subject = encodeURIComponent(fmt(copy.subject, { firstName, lastName }));
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="px-6 pb-16 pt-20 sm:px-10 md:px-16 md:pb-24 md:pt-28 lg:px-24">
        <p className="text-[11px] font-medium uppercase text-muted-foreground">{copy.eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-sans text-[clamp(var(--display-min),7vw,7rem)] font-normal uppercase leading-[0.86] text-foreground">
          {copy.title}
          <span className="block font-display text-[0.62em] normal-case italic">
            {copy.titleItalic}
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground">{copy.intro}</p>

        <div className="mt-14 grid gap-12 border-t border-border pt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <address className="text-sm not-italic leading-7 text-foreground">
                {company.address.building}, {company.address.area}
                <br />
                {company.address.office}
                <br />
                {company.address.city}
              </address>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a
                href={`tel:${company.phoneTel}`}
                className="text-sm leading-7 text-foreground hover:text-accent"
              >
                {company.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a
                href={`mailto:${company.email}`}
                className="text-sm leading-7 text-foreground hover:text-accent"
              >
                {company.email}
              </a>
            </div>
            <div className="flex gap-4">
              <MessageCircle className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm leading-7 text-foreground hover:text-accent"
              >
                {copy.chatOnWhatsApp} <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="border-t border-border pt-8">
              <p className="text-[11px] font-medium uppercase text-muted-foreground">
                {copy.followUs}
              </p>
              <div className="mt-4 flex gap-6">
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-foreground hover:text-accent"
                >
                  Instagram
                </a>
                <a
                  href={company.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-foreground hover:text-accent"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 border border-border bg-card p-6 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">{copy.firstName}</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  className="rounded-none"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">{copy.lastName}</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  className="rounded-none"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="email">{copy.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="rounded-none"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">{copy.phone}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="rounded-none"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">{copy.message}</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder={copy.messagePlaceholder}
                className="rounded-none"
              />
            </div>

            <div className="grid gap-2">
              <span className="text-[11px] font-medium uppercase text-muted-foreground">
                {copy.sendVia}
              </span>
              <div className="grid grid-cols-2 gap-2" role="group" aria-label={copy.chooseChannel}>
                <Button
                  type="button"
                  variant={channel === "whatsapp" ? "default" : "outline"}
                  aria-pressed={channel === "whatsapp"}
                  onClick={() => setChannel("whatsapp")}
                  className="h-11 rounded-none border-primary text-[11px] uppercase shadow-none"
                >
                  {copy.whatsapp}
                </Button>
                <Button
                  type="button"
                  variant={channel === "email" ? "default" : "outline"}
                  aria-pressed={channel === "email"}
                  onClick={() => setChannel("email")}
                  className="h-11 rounded-none border-primary text-[11px] uppercase shadow-none"
                >
                  {copy.emailChannel}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-none bg-primary px-8 text-xs uppercase text-primary-foreground shadow-none hover:bg-secondary hover:text-secondary-foreground"
            >
              {copy.send} <ArrowUpRight aria-hidden="true" className="ml-2 size-4" />
            </Button>
            <p className="text-xs leading-6 text-muted-foreground">
              {fmt(copy.note, { app: channel === "whatsapp" ? copy.noteWhatsApp : copy.noteEmail })}
            </p>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
