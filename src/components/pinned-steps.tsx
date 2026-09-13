import { useEffect, useRef, useState, type ReactNode } from "react";

type StepState = {
  /** Zero-based active step. */
  active: number;
  /** Smooth-scrolls the page so that `index` becomes the active step. */
  goTo: (index: number) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Pins a full-height stage while the page scrolls through `count` steps, then releases it.
 * Section height is `100svh × (1 + count × stepDistance)`; `mobileStepDistance` applies below md.
 * Continuous progress (0–1) is exposed as the CSS variable `--steps-progress` on the section, so
 * progress bars can bind to it without re-rendering React on every scroll event.
 */
export function PinnedSteps({
  count,
  stepDistance = 0.7,
  mobileStepDistance = stepDistance,
  className = "",
  children,
}: {
  count: number;
  stepDistance?: number;
  mobileStepDistance?: number;
  className?: string;
  children: (state: StepState) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const read = () => {
      const el = ref.current;
      if (!el) return;
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const progress = clamp(-el.getBoundingClientRect().top / range, 0, 1);
      el.style.setProperty("--steps-progress", progress.toFixed(4));
      const next = Math.min(count - 1, Math.floor(progress * count));
      setActive((prev) => (prev === next ? prev : next));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [count]);

  const goTo = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: top + ((clamp(index, 0, count - 1) + 0.5) / count) * range,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={ref}
      className={`relative h-[calc(100svh*var(--pin-mobile))] md:h-[calc(100svh*var(--pin-desktop))] ${className}`}
      style={
        {
          "--pin-mobile": 1 + count * mobileStepDistance,
          "--pin-desktop": 1 + count * stepDistance,
          "--steps-progress": 0,
        } as React.CSSProperties
      }
    >
      <div className="sticky top-0 h-svh overflow-hidden">{children({ active, goTo })}</div>
    </section>
  );
}
