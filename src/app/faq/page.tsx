import { FaqList } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageMain } from "@/components/ui";
import { getLocale } from "@/lib/locale";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/faq",
    title: "FAQ",
    description:
      locale === "es"
        ? "Cómo reservar Casa Jannat en Airbnb, huéspedes, piscina, entrada y reglas en Jacó."
        : "How to book Casa Jannat on Airbnb, guests, pool, check-in, and house rules in Jacó.",
  });
}

export default async function FaqPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <JsonLd data={faqPageSchema(locale)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: locale === "es" ? "Inicio" : "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <Container className="max-w-3xl">
        <h1 className="font-display text-5xl text-ocean">{locale === "es" ? "Preguntas que ya nos hacen." : "Questions we already get."}</h1>
        <p className="mt-4 text-muted">
          {locale === "es"
            ? "Casa Jannat se reserva en Airbnb. La reserva directa en este sitio llega pronto."
            : "Casa Jannat books on Airbnb. Direct booking on this site is coming soon."}
        </p>
        <div className="mt-10">
          <FaqList locale={locale} />
        </div>
      </Container>
    </PageMain>
  );
}
