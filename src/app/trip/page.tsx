import { TripView } from "@/components/TripView";
import { Container, Eyebrow, PageMain } from "@/components/ui";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/trip",
    title: locale === "es" ? "Tu viaje" : "Your trip",
    description:
      locale === "es"
        ? "La casa, las experiencias y la solicitud, en un solo lugar."
        : "The house, the experiences, and the request, in one place.",
  });
}

export default async function TripPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container>
        <Eyebrow>{locale === "es" ? "Viaje" : "Trip"}</Eyebrow>
        <h1 className="mt-3 font-display text-5xl text-ocean">{locale === "es" ? "Todo lo que pediste." : "Everything you asked for."}</h1>
        <div className="mt-8">
          <TripView locale={locale} />
        </div>
      </Container>
    </PageMain>
  );
}
