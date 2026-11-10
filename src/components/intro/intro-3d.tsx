import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { ARC_AND_STAR, WORDMARK } from "@/components/lunaris-logo";

import "./intro.css";

// Only the "LUNARIS" line of the logo wordmark (its sub-paths sit above y = 620; "REAL ESTATE" below).
const LUNARIS_ONLY = WORDMARK.split("M")
  .filter(Boolean)
  .map((part) => `M${part}`)
  .filter(
    (part) =>
      Math.min(...(part.match(/-?\d+\.?\d*/g) ?? []).filter((_, i) => i % 2 === 1).map(Number)) <
      620,
  )
  .join("");

// The logo's arc and star as a filled silhouette, used as the mask of the frosted glass.
const MARK_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="318 186 510 214"><path d="${ARC_AND_STAR}"/></svg>`,
)}") center / 100% 100% no-repeat`;

const CHAPTERS = [
  {
    at: 1,
    pos: "intro3d-pos-l",
    title: "Wide property portfolio",
    copy: "Villas, townhouses and residences across Dubai's master-planned communities, for every budget.",
    tag: "13 developments · 6 developers",
  },
  {
    at: 2,
    pos: "intro3d-pos-r",
    title: "Prime locations",
    copy: "Lagoon fronts, island plots and the most sought-after districts, ideal for living or investing.",
    tag: "Waterfront first",
  },
  {
    at: 3,
    pos: "intro3d-pos-bl",
    title: "Expert consultancy",
    copy: "From the first viewing at the clubhouse to the title deed, with transparency, speed and trust.",
    tag: "End-to-end guidance",
  },
  {
    at: 4,
    pos: "intro3d-pos-r",
    title: "Tailored property matches",
    copy: "We listen first, then light up the homes that truly fit your lifestyle, budget and goals.",
    tag: "Your shortlist, in gold",
  },
  {
    at: 5,
    pos: "intro3d-pos-l",
    title: "Smart investment guidance",
    copy: "Market insight and data-driven advice for confident, profitable decisions, with the city's skyline in view.",
    tag: "Payment plans · yields · escrow",
  },
];

/** Scroll-driven 3D intro (demo): the community as a line drawing, then a closing title card. */
export function Intro3D() {
  const root = useRef<HTMLDivElement>(null);

  // Always opens light; the header toggle switches the whole page to the site's dark mode
  // (the `dark` class on <html> drives the dark tokens for the home sections below).
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    return () => document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    // three.js only loads in the browser, after hydration.
    void import("./intro-scene").then(({ startIntro }) => {
      if (!cancelled && root.current) stop = startIntro(root.current);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return (
    <div ref={root} className="intro3d" data-theme={theme}>
      <div className="intro3d-story">
        <div className="intro3d-stage">
          <canvas className="intro3d-canvas" />
          <div className="intro3d-veil" />
          <div className="intro3d-hero-veil" />

          <header className="intro3d-header">
            <div className="intro3d-brand">
              LUNARIS<small>REAL ESTATE</small>
            </div>
            <nav className="intro3d-nav">
              <Link to="/{-$lang}/portfolio">Portfolio</Link>
              <Link to="/{-$lang}/team">Team</Link>
              <Link to="/{-$lang}/contact">Contact</Link>
              <button
                type="button"
                className="intro3d-theme"
                onClick={toggleTheme}
                aria-pressed={theme === "dark"}
              >
                {theme === "dark" ? "☀ Light" : "☾ Dark"}
              </button>
            </nav>
          </header>

          <div className="intro3d-panel intro3d-hero on" data-at="0">
            <pre className="intro3d-ascii" aria-label="Lunaris" />
            <div className="intro3d-hero-copy">
              <h1>Moonlit real estate in Dubai.</h1>
              <p>
                Lagoon villas, island homes and waterfront towers, chosen and guided by a team that
                knows every community.
              </p>
              <span className="intro3d-cta">Scroll to explore ↓</span>
            </div>
          </div>

          {CHAPTERS.map((c) => (
            <div key={c.at} className={`intro3d-panel ${c.pos}`} data-at={c.at}>
              <div className="intro3d-plate">
                <div className="intro3d-label">REASON 0{c.at}/05</div>
                <h2 data-scramble>{c.title}</h2>
                <p>{c.copy}</p>
                <div className="intro3d-tag">– {c.tag}</div>
              </div>
            </div>
          ))}

          <div className="intro3d-panel intro3d-final" data-at="6">
            <pre className="intro3d-ascii" aria-hidden="true" />
            <div className="intro3d-label">LUNARIS · “MOONLIT”</div>
            <h2 data-scramble>Find your home under the moon.</h2>
            <p>We illuminate the path for our clients, from the first viewing to the title deed.</p>
          </div>

          <div className="intro3d-progress">
            <i />
          </div>
          <div className="intro3d-hint">SCROLL TO EXPLORE</div>
        </div>
      </div>

      {/* The outro rises over the stuck stage and closes the intro; the home page follows it. */}
      <section className="intro3d-outro">
        <canvas className="intro3d-chars" />
        <div className="intro3d-outro-top">
          <div>
            <div className="intro3d-kicker">The Lunaris team</div>
            <div className="intro3d-otitle">FIND YOUR HOME WITH US</div>
            <p>
              Tell us what you are looking for;
              <br />
              we shortlist, guide and stay until the keys.
            </p>
          </div>
          <Link className="intro3d-bracket" to="/{-$lang}/contact">
            ↗ Request a consultation
          </Link>
        </div>

        {/* Emblem: the logo's arc and star, large, in double outline; its foot slips behind the wordmark. */}
        <div className="intro3d-emblem">
          <div className="intro3d-glass" style={{ WebkitMask: MARK_MASK, mask: MARK_MASK }} />
          <svg viewBox="318 186 510 214" aria-hidden="true">
            <defs>
              <linearGradient
                id="intro3d-sheen"
                gradientUnits="userSpaceOnUse"
                x1="-80"
                y1="0"
                x2="80"
                y2="0"
                gradientTransform="translate(230 293) rotate(-24)"
              >
                <stop stopColor="#ae9064" stopOpacity="0" />
                <stop offset=".22" stopColor="#ae9064" stopOpacity=".2" />
                <stop offset=".43" stopColor="#c9a76c" stopOpacity=".85" />
                <stop offset=".5" stopColor="#e2c38a" />
                <stop offset=".57" stopColor="#c9a76c" stopOpacity=".85" />
                <stop offset=".78" stopColor="#ae9064" stopOpacity=".2" />
                <stop offset="1" stopColor="#ae9064" stopOpacity="0" />
              </linearGradient>
              <path id="intro3d-mark" d={ARC_AND_STAR} pathLength={1000} />
            </defs>
            <use href="#intro3d-mark" className="e-base" />
            <use href="#intro3d-mark" className="e-draw" />
            <g
              className="e-sheen"
              stroke="url(#intro3d-sheen)"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <use href="#intro3d-mark" strokeWidth={7} opacity={0.12} />
              <use href="#intro3d-mark" strokeWidth={3.5} opacity={0.25} />
              <use href="#intro3d-mark" strokeWidth={1.6} />
            </g>
          </svg>
        </div>

        <svg
          className="intro3d-wordmark"
          viewBox="150 486 858 110"
          preserveAspectRatio="xMidYMax meet"
          role="img"
          aria-label="Lunaris"
        >
          <path d={LUNARIS_ONLY} />
        </svg>
        <div className="intro3d-outro-foot">
          <span>© 2026 Lunaris Real Estate</span>
          <span>Iris Bay Tower, Business Bay · Dubai</span>
        </div>
      </section>
    </div>
  );
}
