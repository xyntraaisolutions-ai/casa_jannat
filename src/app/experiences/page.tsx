import { ExperienceBrowser } from "@/components/Browsers";
import { Container, Eyebrow, PageMain } from "@/components/ui";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/experiences",
    title: locale === "es" ? "Experiencias" : "Experiences",
    description:
      locale === "es"
        ? "Chef, traslados, pesca, parques y la noche en Jacó, con el mismo precio en cada página."
        : "Chef, transfers, fishing, parks, and the evening in Jacó, with the same price on every page.",
  });
}

export default async function ExperiencesPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container>
        <Eyebrow>{locale === "es" ? "Catálogo" : "Catalog"}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-5xl text-ocean md:text-6xl">
          {locale === "es" ? "Lo que se suma a la casa." : "What gets added to the house."}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          {locale === "es"
            ? "Servicios en la villa y tours desde Jacó. El precio de cada opción es el precio del desglose. Nada está escrito a mano en otra tabla."
            : "Services at the villa and tours out of Jacó. Each option's price is the price in the breakdown. Nothing is retyped in a second table."}
        </p>
        <div className="mt-10">
          <ExperienceBrowser locale={locale} />
        </div>
      </Container>
    </PageMain>
  );
}
