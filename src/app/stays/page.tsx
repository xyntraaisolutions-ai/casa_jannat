import { StaysBrowser } from "@/components/Browsers";
import { Container, Eyebrow, PageMain } from "@/components/ui";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/stays",
    title: locale === "es" ? "La casa" : "The house",
    description:
      locale === "es"
        ? "Casa Jannat es la primera casa de la colección: piscina privada en Jacó."
        : "Casa Jannat is the first house in the collection: a private pool in Jacó.",
  });
}

export default async function StaysPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container>
        <Eyebrow>{locale === "es" ? "Estadías" : "Stays"}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-5xl text-ocean md:text-6xl">
          {locale === "es" ? "Una casa, por ahora. El mismo cuidado cuando haya más." : "One house, for now. The same care when there are more."}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          {locale === "es"
            ? "Casa Jannat abre la colección. Filtra por piscina, playa a pie o una celebración, y el mapa muestra el barrio — no la puerta."
            : "Casa Jannat opens the collection. Filter for a pool, a walk to the beach, or a celebration, and the map shows the neighborhood — not the door."}
        </p>
        <div className="mt-10">
          <StaysBrowser locale={locale} />
        </div>
      </Container>
    </PageMain>
  );
}
