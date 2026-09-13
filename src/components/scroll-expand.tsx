import { ChevronDown } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ScrollExpandProps = {
  /** Image shown inside the expanding frame. */
  src: string;
  alt?: string;
  /** Optional cover image shown while the frame is small; it crossfades into `src` as the frame grows. */
  coverSrc?: string | undefined;
  coverAlt?: string | undefined;
  /** Large uppercase title rendered inside the frame. */
  title: string;
  /** Optional italic second line under the title. */
  subtitle?: string;
  /** Optional small uppercase line above the title. */
  eyebrow?: string;
  /** Optional element rendered above the eyebrow (e.g. a back link). */
  topSlot?: ReactNode;
  /**
   * Stage colour behind the small frame. Blends into the page background as the frame expands.
   * Defaults to the page background (no colour shift).
   */
  backdropColor?: string | undefined;
  /** Optional texture image behind the small frame; fades out into the page background as it expands. */
  backdropSrc?: string | undefined;
  /** Small hint shown under the frame until the user starts scrolling. */
  scrollHint?: string;
  /** Content revealed once the frame has expanded. */
  children?: ReactNode;
  /**
   * true: the component pins itself while the page scrolls (hero usage).
   * false: the component becomes its own scroll container and fills its parent.
   */
  useWindowScroll?: boolean;
  /** Initial frame size as a percentage of the stage. */
  startWidth?: number;
  startHeight?: number;
  /** Frame corner radius in px at the start and end of the expansion. */
  startRadius?: number;
  endRadius?: number;
  /** Media scale at the start; it settles to 1 when fully expanded. */
  mediaZoom?: number;
  /** Scroll needed to fully expand, in stage heights. */
  scrollDistance?: number;
  /** Extra pinned scroll after the expansion completes, in stage heights. */
  holdDistance?: number;
  /** Per-frame easing factor (0–1). Lower is smoother/slower. */
  smoothing?: number;
  /** Uniform dark overlay opacity reached when fully expanded. */
  overlayScrim?: number;
  /** false renders the fully expanded state with no scroll effect. */
  enabled?: boolean;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
// Ease-out: the frame reacts to the very first scrolled pixel and settles gently at the end.
const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.2);

// On narrow screens a 42%-wide frame is too small to read, so the start size gets a floor.
const MOBILE_MIN_WIDTH = 76;
const MOBILE_MIN_HEIGHT = 52;

type Geometry = Required<
  Pick<
    ScrollExpandProps,
    "startWidth" | "startHeight" | "startRadius" | "endRadius" | "mediaZoom" | "overlayScrim"
  >
>;

function stylesFor(progress: number, geometry: Geometry, mobile: boolean) {
  const eased = easeOut(progress);
  const startWidth = mobile ? Math.max(geometry.startWidth, MOBILE_MIN_WIDTH) : geometry.startWidth;
  const startHeight = mobile
    ? Math.max(geometry.startHeight, MOBILE_MIN_HEIGHT)
    : geometry.startHeight;
  const reveal = clamp((progress - 0.7) / 0.3, 0, 1);
  // Cover → media crossfade happens early in the expansion; the text rides in with it.
  const swap = easeOut(clamp((progress - 0.08) / 0.4, 0, 1));

  return {
    cover: { opacity: 1 - swap } as CSSProperties,
    backdrop: { opacity: 1 - eased } as CSSProperties,
    text: { opacity: swap } as CSSProperties,
    stage: { "--sx-e": eased } as CSSProperties,
    frame: {
      width: `${lerp(startWidth, 100, eased)}%`,
      height: `${lerp(startHeight, 100, eased)}%`,
      borderRadius: `${lerp(geometry.startRadius, geometry.endRadius, eased)}px`,
    } as CSSProperties,
    media: { transform: `scale(${lerp(geometry.mediaZoom, 1, eased)})` } as CSSProperties,
    scrim: { opacity: geometry.overlayScrim * eased } as CSSProperties,
    title: { transform: `scale(${lerp(0.62, 1, eased)})` } as CSSProperties,
    reveal: { gridTemplateRows: `${reveal}fr`, opacity: reveal } as CSSProperties,
    hint: { opacity: clamp(1 - progress * 5, 0, 1) } as CSSProperties,
  };
}

export function ScrollExpand({
  src,
  alt = "",
  coverSrc,
  coverAlt = "",
  title,
  subtitle,
  eyebrow,
  topSlot,
  scrollHint,
  children,
  backdropColor,
  backdropSrc,
  useWindowScroll = false,
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  enabled = true,
  className = "",
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const backdropRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const motion = useRef({ target: 0, current: 0, raf: 0 });

  const geometry: Geometry = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    overlayScrim,
  };
  const initial = stylesFor(enabled ? 0 : 1, geometry, false);
  const totalHeights = 1 + scrollDistance + holdDistance;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const apply = (progress: number) => {
      const styles = stylesFor(progress, geometry, window.innerWidth < 640);
      // Snap the frame to whole pixels: fractional widths plus a -50% translate leave hairline
      // seams at the edges while the frame animates.
      const stage = stageRef.current;
      const frame = frameRef.current;
      if (stage && frame) {
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const w = Math.round((parseFloat(String(styles.frame.width)) / 100) * W);
        const h = Math.round((parseFloat(String(styles.frame.height)) / 100) * H);
        frame.style.width = `${w}px`;
        frame.style.height = `${h}px`;
        frame.style.left = `${Math.round((W - w) / 2)}px`;
        frame.style.top = `${Math.round((H - h) / 2)}px`;
        // Tailwind's -translate-* utilities set the standalone `translate` property, so clear both.
        frame.style.transform = "none";
        frame.style.translate = "0px 0px";
        frame.style.borderRadius = String(styles.frame.borderRadius);
        // Keep the images at full stage size and only shift them so the frame acts as a window:
        // the browser then moves composited layers instead of re-rasterising 2400px bitmaps.
        for (const img of [mediaRef.current, coverRef.current]) {
          if (!img) continue;
          img.style.width = `${W + 2}px`;
          img.style.height = `${H + 2}px`;
          img.style.left = `${-Math.round((W - w) / 2) - 1}px`;
          img.style.top = `${-Math.round((H - h) / 2) - 1}px`;
        }
      }
      stageRef.current?.style.setProperty("--sx-e", String(easeOut(progress)));
      Object.assign(mediaRef.current?.style ?? {}, styles.media);
      Object.assign(scrimRef.current?.style ?? {}, styles.scrim);
      Object.assign(titleRef.current?.style ?? {}, styles.title);
      if (backdropSrc) Object.assign(backdropRef.current?.style ?? {}, styles.backdrop);
      if (coverSrc) {
        // While the cover is fully opaque, hide the media underneath so its edge can never peek
        // out as a hairline beside the cover.
        if (mediaRef.current) {
          mediaRef.current.style.visibility =
            Number(styles.cover.opacity) >= 1 ? "hidden" : "visible";
        }
        Object.assign(coverRef.current?.style ?? {}, styles.cover);
        Object.assign(textRef.current?.style ?? {}, styles.text);
        Object.assign(gradientRef.current?.style ?? {}, styles.text);
      }
      Object.assign(revealRef.current?.style ?? {}, styles.reveal);
      Object.assign(hintRef.current?.style ?? {}, styles.hint);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled || reduceMotion) {
      apply(1);
      return;
    }

    const readProgress = () => {
      const stageHeight = useWindowScroll ? window.innerHeight : root.clientHeight;
      const offset = useWindowScroll ? -root.getBoundingClientRect().top : root.scrollTop;
      return clamp(offset / (scrollDistance * stageHeight), 0, 1);
    };

    const state = motion.current;
    let lastFrame = 0;
    // Right after mount the router may still be restoring scroll (e.g. arriving from a scrolled
    // page), so for a short settle window we snap to the target instead of easing toward it.
    const mountedAt = performance.now();
    const settleWindow = 700;
    const tick = (now: number) => {
      if (now - mountedAt < settleWindow) state.current = state.target;
      const diff = state.target - state.current;
      if (Math.abs(diff) < 0.0005) {
        state.current = state.target;
        apply(state.current);
        state.raf = 0;
        lastFrame = 0;
        return;
      }
      // Frame-rate independent easing: `smoothing` is the per-16.7ms factor, so a slow or
      // throttled frame catches up instead of lagging behind.
      const elapsed = lastFrame ? now - lastFrame : 16.7;
      lastFrame = now;
      const factor = 1 - Math.pow(1 - smoothing, elapsed / 16.7);
      state.current += diff * factor;
      apply(state.current);
      state.raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      state.target = readProgress();
      if (!state.raf) state.raf = requestAnimationFrame(tick);
    };

    // Start collapsed rather than trusting the first read: on client-side navigation the previous
    // page's scroll offset is still in effect when this mounts. Re-sync once the router has had a
    // chance to scroll (next frame, plus a timer fallback for throttled tabs).
    state.current = state.target = 0;
    apply(0);
    const sync = () => {
      state.target = readProgress();
      state.current = state.target;
      apply(state.current);
    };
    const syncFrame = requestAnimationFrame(sync);
    const syncTimer = window.setTimeout(sync, 150);

    const scroller: HTMLElement | Window = useWindowScroll ? window : root;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(syncFrame);
      window.clearTimeout(syncTimer);
      if (state.raf) cancelAnimationFrame(state.raf);
      state.raf = 0;
    };
    // Geometry values are primitives; listing them keeps the effect honest without an object dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enabled,
    useWindowScroll,
    coverSrc,
    backdropSrc,
    scrollDistance,
    smoothing,
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    overlayScrim,
  ]);

  const stageStyle: CSSProperties = backdropColor
    ? {
        ...initial.stage,
        background: `color-mix(in oklab, ${backdropColor} calc((1 - var(--sx-e)) * 100%), var(--background))`,
      }
    : initial.stage;

  const stage = (
    <div
      ref={stageRef}
      style={stageStyle}
      className={`relative overflow-hidden bg-background text-[var(--hero-foreground)] ${
        useWindowScroll ? "sticky top-0 h-svh" : "sticky top-0 h-full"
      }`}
    >
      {backdropSrc ? (
        <img
          ref={backdropRef}
          src={backdropSrc}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          style={initial.backdrop}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      ) : null}
      <div
        ref={frameRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-muted [backface-visibility:hidden] [contain:layout_paint]"
        style={{ ...initial.frame, backgroundColor: backdropColor ?? undefined }}
      >
        <img
          ref={mediaRef}
          src={src}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          style={{ ...initial.media, ...(coverSrc && enabled ? { visibility: "hidden" } : {}) }}
          className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] object-cover object-center"
        />
        {/* Bottom gradient keeps the title legible in the small frame; the uniform scrim fades in as it expands. */}
        {coverSrc ? (
          <img
            ref={coverRef}
            src={coverSrc}
            alt={coverAlt}
            fetchPriority="high"
            style={initial.cover}
            className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] object-cover object-center will-change-[transform,opacity]"
          />
        ) : null}
        <div
          ref={gradientRef}
          style={coverSrc ? initial.text : undefined}
          className="absolute inset-0 bg-[linear-gradient(0deg,var(--hero-scrim)_0%,transparent_50%)]"
        />
        <div ref={scrimRef} style={initial.scrim} className="absolute inset-0 bg-black" />

        <div
          ref={textRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col [--pad-end:1.5rem] sm:[--pad-end:2.5rem] md:[--pad-end:4rem] lg:[--pad-end:6rem]"
          style={{
            ...(coverSrc ? initial.text : null),
            padding:
              "calc(1.25rem + (var(--pad-end) - 1.25rem) * var(--sx-e)) calc(1.25rem + (var(--pad-end) - 1.25rem) * var(--sx-e)) calc(1.25rem + (3rem - 1.25rem) * var(--sx-e))",
          }}
        >
          {topSlot}
          {eyebrow ? (
            <p className="mt-4 text-[11px] font-medium uppercase text-white/75">{eyebrow}</p>
          ) : null}
          <div ref={titleRef} style={initial.title} className="origin-bottom-left">
            <h1 className="mt-3 max-w-4xl font-sans text-[clamp(3rem,8vw,7.5rem)] font-normal uppercase leading-[0.86] text-white">
              {title}
              {subtitle ? (
                <span className="block font-display text-[0.55em] normal-case italic leading-none">
                  {subtitle}
                </span>
              ) : null}
            </h1>
          </div>
          {children ? (
            <div ref={revealRef} style={initial.reveal} className="grid">
              <div className="min-h-0 overflow-hidden">
                <div className="mt-8 border-t border-white/30 pt-6">{children}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {scrollHint ? (
        <div
          ref={hintRef}
          style={initial.hint}
          className={`pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-[11px] font-medium uppercase ${
            backdropColor || backdropSrc ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          <span>{scrollHint}</span>
          <ChevronDown className="size-4 motion-safe:animate-bounce" aria-hidden="true" />
        </div>
      ) : null}
    </div>
  );

  if (useWindowScroll) {
    return (
      <section
        ref={rootRef}
        className={`relative ${className}`}
        style={{ height: enabled ? `calc(100svh * ${totalHeights})` : "100svh" }}
      >
        {stage}
      </section>
    );
  }

  return (
    <div ref={rootRef} className={`relative h-full w-full overflow-y-auto ${className}`}>
      <div style={{ height: enabled ? `${totalHeights * 100}%` : "100%" }}>{stage}</div>
    </div>
  );
}
