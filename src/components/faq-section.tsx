import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/faq";

/** Frequently asked questions as an accordion, with a contact prompt beside it. */
export function FaqSection({ className = "" }: { className?: string }) {
  return (
    <section id="faq" className={`px-5 py-14 sm:px-10 md:px-16 md:py-24 lg:px-24 ${className}`}>
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <p className="text-[11px] font-medium uppercase text-muted-foreground">FAQ</p>
          <h2 className="mt-4 font-sans text-3xl font-normal uppercase leading-[0.92] text-foreground md:text-5xl">
            Questions,
            <span className="block font-display text-[0.82em] normal-case italic">answered</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
            The questions we hear most from buyers, investors and tenants. Rules and fees change, so
            we confirm the specifics for your case before you commit.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase text-primary hover:text-accent"
          >
            Ask us anything <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <Accordion type="single" collapsible className="border-t border-border">
          {faq.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-border">
              <AccordionTrigger className="gap-6 py-5 font-sans text-base font-normal text-foreground hover:no-underline md:text-lg [&>svg]:text-primary">
                <span className="flex items-baseline gap-4">
                  <span className="w-6 shrink-0 text-[11px] text-muted-foreground">
                    0{index + 1}
                  </span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-10 text-sm leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
