import { ExperienceBrowser } from "@/components/Browsers";
import { Container, Eyebrow, PageMain } from "@/components/ui";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/experiences",
    title: locale === "es" ? "Qué hacer en Jacó" : "Things to do in Jacó",
    description:
      locale === "es"
        ? "Ideas alrededor de Casa Jannat: chef, traslados, pesca y tours. Se coordinan aparte; no se reservan en este sitio."
        : "Ideas around Casa Jannat: chef, transfers, fishing, and tours. Arranged separately; not booked on this site.",
  });
}

export default async function ExperiencesPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container>
        <Eyebrow>{locale === "es" ? "Alrededor de la casa" : "Around the house"}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-5xl text-ocean md:text-6xl">
          {locale === "es" ? "Ideas para los días en Jacó." : "Ideas for the days in Jacó."}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          {locale === "es"
            ? "Servicios en la villa y tours desde el pueblo. Se organizan con el anfitrión u operadores locales — este sitio no toma reservas de experiencias."
            : "Services at the villa and tours out of town. Arrange with the host or local operators — this site does not take experience bookings."}
        </p>
        <div className="mt-10">
          <ExperienceBrowser locale={locale} />
        </div>
      </Container>
    </PageMain>
  );
}
