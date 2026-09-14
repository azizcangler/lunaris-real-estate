import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { ProjectLink } from "@/components/project-link";
import type { Project } from "@/data/projects";

/** Multiplied by the snap count so the tween reaches its edge value one slide away from centre. */
const TWEEN_FACTOR_BASE = 0.55;
const AUTOPLAY_MS = 4200;
/** How long a project's brochure cover stays up when its card takes the centre, before fading to the render. */
const COVER_MS = 1500;

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
  // Embla's own drag is off in favour of a simple swipe: one gesture moves exactly one card,
  // and a swipe never opens the card it ends on.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 28,
    watchDrag: false,
  });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const [selected, setSelected] = useState(0);
  // Slide whose brochure cover is currently shown over the render (top projects only).
  const [coverOn, setCoverOn] = useState<number | null>(null);
  const coverTimer = useRef(0);
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
        const scale = 1.14 - 0.24 * distance;
        const rotate = 10 * signed;
        node.style.transform = `perspective(1200px) rotateY(${rotate}deg) scale(${scale})`;
        // Centre card sits on top of its neighbours, which get a light black shade. The z-index
        // goes on the slide: Embla translates looped slides, which makes each a stacking context.
        const z = String(Math.round(30 - distance * 20));
        node.style.zIndex = z;
        if (node.parentElement) node.parentElement.style.zIndex = z;
        const shade = node.querySelector<HTMLElement>("[data-shade]");
        if (shade) shade.style.opacity = String(Math.min(0.45, 0.5 * distance));
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
    const onSelect = (api: EmblaCarouselType) => {
      const index = api.selectedScrollSnap();
      setSelected(index);
      window.clearTimeout(coverTimer.current);
      if (projects[index]?.details?.cover) {
        setCoverOn(index);
        coverTimer.current = window.setTimeout(() => setCoverOn(null), COVER_MS);
      } else {
        setCoverOn(null);
      }
    };

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
      window.clearTimeout(coverTimer.current);
      emblaApi
        .off("reInit", setNodes)
        .off("reInit", setFactor)
        .off("reInit", tween)
        .off("scroll", tween)
        .off("slideFocus", tween)
        .off("select", onSelect);
    };
  }, [emblaApi, tween, projects]);

  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current && !document.hidden) emblaApi.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  // The cards follow the finger: swipe left and the track moves left (next card), swipe right and
  // it moves right (previous card). Diagonal or tiny moves are ignored so vertical page scrolling
  // keeps working.
  const finishSwipe = (dx: number, dy: number) => {
    if (Math.abs(dx) < 24 || Math.abs(dx) < Math.abs(dy)) return;
    swiped.current = true;
    if (dx < 0) emblaApi?.scrollNext();
    else emblaApi?.scrollPrev();
  };
  // Mouse: pointer events. Touch is handled separately below because browsers may cancel the
  // pointer stream (no pointerup) once they start a scroll gesture.
  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
  };
  const onPointerUp = (event: React.PointerEvent) => {
    if (event.pointerType === "touch" || !drag.current) return;
    const { x, y } = drag.current;
    drag.current = null;
    finishSwipe(event.clientX - x, event.clientY - y);
  };
  const touch = useRef<{ x: number; y: number; lastX: number; lastY: number } | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    const t = event.touches[0];
    if (!t) return;
    touch.current = { x: t.clientX, y: t.clientY, lastX: t.clientX, lastY: t.clientY };
    swiped.current = false;
  };
  const onTouchMove = (event: React.TouchEvent) => {
    const t = event.touches[0];
    if (!t || !touch.current) return;
    touch.current.lastX = t.clientX;
    touch.current.lastY = t.clientY;
  };
  const onTouchEnd = () => {
    if (!touch.current) return;
    const { x, y, lastX, lastY } = touch.current;
    touch.current = null;
    finishSwipe(lastX - x, lastY - y);
  };
  const onCardClick = (event: React.MouseEvent, index: number) => {
    // A swipe that ends on a card must not open it; a click on a side card centres it instead.
    if (swiped.current) {
      event.preventDefault();
      swiped.current = false;
      return;
    }
    if (index !== selected) {
      event.preventDefault();
      emblaApi?.scrollTo(index);
    }
  };

  return (
    <div
      className={className}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div
        ref={emblaRef}
        className="cursor-grab overflow-hidden px-1 py-8 select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div className="flex touch-pan-y">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="relative min-w-0 flex-[0_0_62%] px-1.5 sm:flex-[0_0_44%] lg:flex-[0_0_31%]"
            >
              <div
                data-card
                className="relative will-change-transform"
                onClickCapture={(event) => onCardClick(event, index)}
                // Links are natively draggable; a native drag would cancel the pointer swipe.
                onDragStart={(event) => event.preventDefault()}
              >
                <ProjectLink
                  project={project}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-muted shadow-[0_18px_50px_-24px_rgba(20,22,16,0.45)]"
                >
                  <img
                    src={project.image}
                    alt={`Architectural rendering of ${project.name} by ${project.developer}`}
                    width={1200}
                    height={900}
                    loading={index < 3 ? "eager" : "lazy"}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {project.details?.cover ? (
                    <img
                      src={project.details.cover.src}
                      alt=""
                      aria-hidden="true"
                      loading={index < 3 ? "eager" : "lazy"}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-out ${
                        coverOn === index ? "opacity-100 duration-300" : "opacity-0 duration-1000"
                      }`}
                    />
                  ) : null}
                  <div
                    data-shade
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-black opacity-0"
                  />
                  {/* Caption only on hover/focus: the block shows bare portraits. */}
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(18,22,16,0.78)_0%,rgba(18,22,16,0)_100%)] px-4 pb-4 pt-16 text-[var(--hero-foreground)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] opacity-80">
                      {project.developer} · {project.location}
                    </p>
                    <p className="mt-1 font-display text-xl italic leading-tight">{project.name}</p>
                  </div>
                </ProjectLink>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-2.5 lg:justify-end lg:pr-8" role="tablist">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            role="tab"
            aria-selected={index === selected}
            aria-label={`Show ${project.name}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`size-1.5 rounded-full transition-colors ${
              index === selected ? "bg-foreground" : "bg-foreground/20 hover:bg-foreground/45"
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
