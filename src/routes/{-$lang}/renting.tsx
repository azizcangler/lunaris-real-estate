import { createFileRoute } from "@tanstack/react-router";

import { EditorialPage } from "@/components/editorial-page";
import { alternateLinks, getDictionary, localeFromParam, pageMeta, useT } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/renting")({
  head: ({ params }) => ({
    meta: pageMeta(getDictionary(localeFromParam(params.lang)).meta.renting),
    links: alternateLinks("/renting"),
  }),
  component: RentingPage,
});

function RentingPage() {
  const { t } = useT();
  return <EditorialPage copy={t.editorial.renting} />;
}
