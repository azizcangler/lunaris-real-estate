import { useEffect, useRef, useState, type CSSProperties } from "react";

type Falloff = "linear" | "smooth" | "sharp";

type LineSidebarProps = {
  items: string[];
  /** Colour of the active item and its marker. */
  accentColor?: string;
  /** Colour of inactive labels. */
  textColor?: string;
  /** Colour of inactive markers and index numbers. */
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  /** Distance (px) from the cursor within which items start to shift. */
  proximityRadius?: number;
  /** Maximum horizontal shift (px) for the item under the cursor. */
  maxShift?: number;
  falloff?: Falloff;
  /** Marker length (px) at full size. */
  markerLength?: number;
  /** Gap (px) between marker, index and label. */
  markerGap?: number;
  /** Resting marker length as a fraction of `markerLength` when `scaleTick` is on. */
  tickScale?: number;
  /** Grow the marker with cursor proximity (active item is always full length). */
  scaleTick?: boolean;
  /** Vertical gap (px) between items. */
  itemGap?: number;
  /** Label font size in rem. */
  fontSize?: number;
  /** Transition duration (ms) for shifts and colour changes. */
  smoothing?: number;
  defaultActive?: number;
  /** Controlled active index; when set, `defaultActive` is ignored. */
  activeIndex?: number;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
  "aria-label"?: string;
};

const falloffs: Record<Falloff, (t: number) => number> = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  sharp: (t) => t * t * t,
};

export function LineSidebar({
  items,
  accentColor = "#127958",
  textColor = "#c4c4c4",
  markerColor = "#6c6c6c",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = 0,
  activeIndex,
  onItemClick,
  className = "",
  "aria-label": ariaLabel,
}: LineSidebarProps) {
  const [internalActive, setInternalActive] = useState(defaultActive);
  const active = activeIndex ?? internalActive;
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const raf = useRef(0);
  const activeRef = useRef(active);
  activeRef.current = active;

  const restingTick = scaleTick ? markerLength * tickScale : markerLength;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ease = falloffs[falloff];

    const paint = (clientY: number | null) => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        let t = 0;
        if (clientY !== null) {
          const box = el.getBoundingClientRect();
          const centre = box.top + box.height / 2;
          const d = Math.abs(clientY - centre);
          t = d < proximityRadius ? ease(1 - d / proximityRadius) : 0;
        }
        el.style.transform = `translateX(${(maxShift * t).toFixed(2)}px)`;
        const marker = markerRefs.current[i];
        if (marker && scaleTick && i !== activeRef.current) {
          marker.style.width = `${(restingTick + (markerLength - restingTick) * t).toFixed(2)}px`;
        }
      });
    };

    const onMove = (event: MouseEvent) => {
      const y = event.clientY;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => paint(y));
    };
    const onLeave = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => paint(null));
    };

    list.addEventListener("mousemove", onMove);
    list.addEventListener("mouseleave", onLeave);
    paint(null);
    return () => {
      list.removeEventListener("mousemove", onMove);
      list.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [falloff, proximityRadius, maxShift, scaleTick, markerLength, restingTick, items]);

  const select = (index: number) => {
    if (activeIndex === undefined) setInternalActive(index);
    onItemClick?.(index, items[index] ?? "");
  };

  const transition = `transform ${smoothing}ms ease-out, color ${smoothing}ms ease-out, width ${smoothing}ms ease-out, background-color ${smoothing}ms ease-out`;

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation="vertical"
      aria-label={ariaLabel}
      className={`flex flex-col items-start ${className}`}
      style={{ gap: itemGap }}
    >
      {items.map((label, index) => {
        const isActive = index === active;
        const colour = isActive ? accentColor : textColor;
        return (
          <button
            key={label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => select(index)}
            onFocus={() => select(index)}
            className="group flex cursor-pointer items-center text-left outline-none will-change-transform focus-visible:underline focus-visible:underline-offset-4"
            style={{ gap: markerGap, color: colour, transition } as CSSProperties}
          >
            {showMarker ? (
              <span
                ref={(el) => {
                  markerRefs.current[index] = el;
                }}
                aria-hidden="true"
                className="block h-px shrink-0"
                style={{
                  width: isActive ? markerLength : restingTick,
                  backgroundColor: isActive ? accentColor : markerColor,
                  marginRight: markerGap === 0 ? 14 : 0,
                  transition,
                }}
              />
            ) : null}
            {showIndex ? (
              <span
                className="w-7 shrink-0 font-display italic"
                style={{
                  fontSize: `${fontSize * 0.85}rem`,
                  color: isActive ? accentColor : markerColor,
                  transition,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <span
              className="whitespace-nowrap text-[length:var(--ls-size)] font-medium uppercase leading-tight"
              style={{ "--ls-size": `${fontSize}rem` } as CSSProperties}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
