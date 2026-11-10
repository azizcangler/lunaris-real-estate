import { Building2, ChartLine, Handshake, MapPin, SlidersHorizontal } from "lucide-react";

import officeImage from "@/assets/office-reception.jpg";
import { useT } from "@/i18n";

const icons = [Building2, MapPin, Handshake, SlidersHorizontal, ChartLine];

/** Home page "Why clients choose us": the office on the left, every reason with an icon on the right. */
export function WhySection() {
  const { t } = useT();
  const { company, home } = t;
  const items = [...company.strengths, ...company.whyChooseUs.points];

  return (
    <section className="grid border-t border-border bg-secondary/40 lg:grid-cols-2">
      {/* Phones: the photo as a band with the copy below on espresso; lg+: copy over the photo. */}
      <div className="relative flex flex-col bg-[#2b221c] lg:min-h-[52rem] lg:justify-end">
        <div className="relative h-80 overflow-hidden sm:h-[28rem] lg:absolute lg:inset-0 lg:h-auto">
          <img
            src={officeImage}
            alt={home.officeImageAlt}
            width={1199}
            height={1312}
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-[center_30%]"
          />
          {/* The marble floor is bright; a tall dark gradient keeps the copy readable. */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(0deg,rgba(43,34,28,0.94)_0%,rgba(43,34,28,0.78)_32%,rgba(43,34,28,0)_62%)] lg:block" />
        </div>
        <div className="relative px-5 py-12 text-[#efe9dc] sm:p-10 md:p-16">
          <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d8c3a0]">
            <span aria-hidden="true" className="h-px w-8 bg-[#d8c3a0]/70" />
            {home.whyEyebrow}
          </p>
          <h2 className="mt-6 font-editorial text-4xl leading-[1.08] md:text-[3.5rem]">
            {home.whyTitle}
            <span className="block text-[#d8c3a0]">{home.whyTitleItalic}</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#efe9dc]/80">
            {company.whyChooseUs.intro}
          </p>
        </div>
      </div>
      <ul className="flex flex-col justify-center gap-9 px-5 py-14 sm:px-10 md:px-16 md:py-24 lg:px-20">
        {items.map((item, index) => {
          const Icon = icons[index] ?? Building2;
          return (
            <li key={item.title} className="flex gap-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#5c4a3d] text-[#efe9dc]">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-editorial text-2xl leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">{item.copy}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
