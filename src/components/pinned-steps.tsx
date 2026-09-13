import { useEffect, useRef, useState, type ReactNode } from "react";

type StepState = {
  /** Zero-based active step. */
  active: number;
  /** Overall progress through the pinned range, 0–1. */
  progress: number;
  /** Smooth-scrolls the page so that `index` becomes the active step. */
  goTo: (index: number) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Pins a full-height stage while the page scrolls through `count` steps, then releases it.
 * The section's height is `100svh + count × stepDistance × 100svh`; `children` renders the stage.
 */
export function PinnedSteps({
  count,
  stepDistance = 0.7,
  className = "",
  children,
}: {
  count: number;
  stepDistance?: number;
  className?: string;
  children: (state: StepState) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState({ active: 0, progress: 0 });

  useEffect(() => {
    const read = () => {
      const el = ref.current;
      if (!el) return;
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const progress = clamp(-el.getBoundingClientRect().top / range, 0, 1);
      const active = Math.min(count - 1, Math.floor(progress * count));
      setState((prev) =>
        prev.active === active && Math.abs(prev.progress - progress) < 0.002
          ? prev
          : { active, progress },
      );
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
      className={`relative ${className}`}
      style={{ height: `calc(100svh * ${1 + count * stepDistance})` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">{children({ ...state, goTo })}</div>
    </section>
  );
}
