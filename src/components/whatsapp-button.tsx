import { useEffect, useState } from "react";

import { company } from "@/data/company";

/**
 * Floating WhatsApp button, pinned bottom-right on every page: a green disc with a soft pulse,
 * and a small card-style bubble that slides out on hover/focus.
 */
export function WhatsAppButton() {
  // The bubble greets once after load, then only shows on hover/focus.
  const [greeting, setGreeting] = useState(false);
  useEffect(() => {
    const show = window.setTimeout(() => setGreeting(true), 1800);
    const hide = window.setTimeout(() => setGreeting(false), 8000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <a
      href={company.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex items-center gap-3 outline-none md:bottom-7 md:right-7"
    >
      {/* Bubble */}
      <span
        className={`pointer-events-none hidden items-center gap-3 border border-border bg-card py-2.5 pl-3.5 pr-4 shadow-[0_12px_32px_-16px_rgba(20,22,16,0.4)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:flex ${
          greeting ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25d366] opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-[#25d366]" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-foreground">
            Chat with us
          </span>
          <span className="block text-[11px] text-muted-foreground">
            WhatsApp · we reply within the day
          </span>
        </span>
      </span>

      {/* Disc */}
      <span className="relative flex size-14 items-center justify-center">
        <span
          aria-hidden="true"
          className="whatsapp-pulse absolute inset-0 rounded-full bg-[#25d366]/35"
        />
        <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,0.75)] ring-4 ring-background transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-[#25d366]/40">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.23 8.24m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28" />
          </svg>
        </span>
      </span>
    </a>
  );
}
