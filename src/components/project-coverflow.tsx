import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { ProjectLink } from "@/components/project-link";
import type { Project } from "@/data/projects";

/** Multiplied by the snap count so the tween reaches its edge value one slide away from centre. */
const TWEEN_FACTOR_BASE = 0.55;
const AUTOPLAY_MS = 3800;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Coverflow-style project carousel: the centred card is full size and in front, the neighbours
 * shrink, tilt towards the centre and step back. Loops, autoplays (paused on hover/focus, off with
 * reduced motion) and exposes pagination dots. Cards link to the project pages.
 */
export function ProjectCoverflow({
  projects,
  className = "",
}: {
  projects: Project[];
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", duration: 28 });
  const [selected, setSelected] = useState(0);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);
  const paused = useRef(false);

  const tween = useCallback((api: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrollEvent = eventName === "scroll";

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex] ?? [];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }
        const node = tweenNodes.current[slideIndex];
        if (!node) return;
        // -1 … 1: negative when the slide sits left of centre, positive when right of it.
        const signed = clamp(diffToTarget * tweenFactor.current, -1, 1);
        const distance = Math.abs(signed);
        const scale = 1.04 - 0.16 * distance;
        const rotate = 12 * signed;
        node.style.transform = `perspective(1200px) rotateY(${rotate}deg) scale(${scale})`;
        node.style.opacity = String(1 - 0.28 * distance);
        node.style.zIndex = String(Math.round(10 - distance * 9));
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const setNodes = (api: EmblaCarouselType) => {
      tweenNodes.current = api
        .slideNodes()
        .map((slide) => slide.querySelector<HTMLElement>("[data-card]"));
    };
    const setFactor = (api: EmblaCarouselType) => {
      tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
    };
    const onSelect = (api: EmblaCarouselType) => setSelected(api.selectedScrollSnap());

    setNodes(emblaApi);
    setFactor(emblaApi);
    tween(emblaApi);
    onSelect(emblaApi);
    emblaApi
      .on("reInit", setNodes)
      .on("reInit", setFactor)
      .on("reInit", tween)
      .on("scroll", tween)
      .on("slideFocus", tween)
      .on("select", onSelect);
    return () => {
      emblaApi
        .off("reInit", setNodes)
        .off("reInit", setFactor)
        .off("reInit", tween)
        .off("scroll", tween)
        .off("slideFocus", tween)
        .off("select", onSelect);
    };
  }, [emblaApi, tween]);

  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current && !document.hidden) emblaApi.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <div
      className={className}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div ref={emblaRef} className="overflow-hidden px-1 py-5">
        <div className="flex touch-pan-y">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="min-w-0 flex-[0_0_70%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div data-card className="relative will-change-transform">
                <ProjectLink
                  project={project}
                  className="group relative block aspect-[3/4] overflow-hidden bg-muted"
                >
                  <img
                    src={project.image}
                    alt={`Architectural rendering of ${project.name} by ${project.developer}`}
                    width={1200}
                    height={900}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(18,22,16,0.78)_0%,rgba(18,22,16,0)_100%)] px-4 pb-4 pt-20 text-[var(--hero-foreground)] sm:px-5 sm:pb-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] opacity-80">
                      0{index + 1} · {project.developer}
                    </p>
                    <p className="mt-1 font-display text-xl italic leading-tight sm:text-2xl">
                      {project.name}
                    </p>
                    <p className="mt-1 text-[11px] opacity-80">{project.location}</p>
                  </div>
                </ProjectLink>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2 lg:justify-end lg:pr-6" role="tablist">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            role="tab"
            aria-selected={index === selected}
            aria-label={`Show ${project.name}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`size-2 rounded-full transition-colors ${
              index === selected ? "bg-foreground" : "bg-foreground/25 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** Faded, slowly scrolling belt of developer names (the block's "logo strip" without logos). */
export function DeveloperBelt({ names, className = "" }: { names: string[]; className?: string }) {
  const belt = [...names, ...names];
  return (
    <div className={`marquee-mask overflow-hidden ${className}`} aria-label="Developers">
      <div className="marquee flex w-max items-center gap-12 pr-12">
        {belt.map((name, index) => (
          <span
            key={`${name}-${index}`}
            aria-hidden={index >= names.length}
            className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
