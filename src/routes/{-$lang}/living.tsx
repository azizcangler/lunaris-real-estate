import { createFileRoute } from "@tanstack/react-router";

import { EditorialPage } from "@/components/editorial-page";
import { alternateLinks, getDictionary, localeFromParam, pageMeta, useT } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/living")({
  head: ({ params }) => ({
    meta: pageMeta(getDictionary(localeFromParam(params.lang)).meta.living),
    links: alternateLinks("/living"),
  }),
  component: LivingPage,
});

function LivingPage() {
  const { t } = useT();
  return <EditorialPage copy={t.editorial.living} />;
}
