import { createFileRoute } from "@tanstack/react-router";

import { EditorialPage } from "@/components/editorial-page";
import { alternateLinks, getDictionary, localeFromParam, pageMeta, useT } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/investing")({
  head: ({ params }) => ({
    meta: pageMeta(getDictionary(localeFromParam(params.lang)).meta.investing),
    links: alternateLinks("/investing"),
  }),
  component: InvestingPage,
});

function InvestingPage() {
  const { t } = useT();
  return <EditorialPage copy={t.editorial.investing} />;
}
