import { Link } from "@tanstack/react-router";

import { langParam, useT } from "@/i18n";

/** Styled 404 used by the root route and as the router's default, so prefixed paths get it too. */
export function NotFound() {
  const { locale, t } = useT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t.errors.notFoundTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.errors.notFoundCopy}</p>
        <div className="mt-6">
          {/* An unknown top-level segment (/about) is matched as `lang`, so it must not be inherited here. */}
          <Link
            to="/{-$lang}"
            params={{ lang: langParam(locale) }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.errors.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
