/**
 * Renders a pre-generated inline SVG map (see src/assets/projects/<slug>/location-map.svg).
 * Inline so the page's fonts and colour tokens apply; the SVG only uses classes and CSS variables.
 * `cover` makes the map fill its container like `object-fit: cover` (used as a section backdrop).
 */
export function LocationMap({
  svg,
  cover = false,
  className = "",
}: {
  svg: string;
  cover?: boolean;
  className?: string;
}) {
  const markup = cover ? svg.replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" ') : svg;
  const sizing = cover ? "[&_svg]:h-full [&_svg]:w-full" : "[&_svg]:h-auto [&_svg]:w-full";
  return (
    <div
      aria-hidden={cover ? true : undefined}
      className={`[--map-ground:oklch(0.935_0.014_80)] [--map-ink:#454c3f] [--map-water:oklch(0.86_0.02_80)] [&_svg]:block ${sizing} ${className}`}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
