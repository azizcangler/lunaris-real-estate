import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

import { isLocale } from "@/i18n";

/**
 * Optional locale prefix: `/` is English, `/tr/...` Turkish, `/ru/...` Russian.
 * Any other first segment is not a language, so the page is a 404.
 */
export const Route = createFileRoute("/{-$lang}")({
  beforeLoad: ({ params }) => {
    if (params.lang !== undefined && !isLocale(params.lang)) throw notFound();
  },
  component: Outlet,
});
