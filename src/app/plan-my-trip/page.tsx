import { PlanForm } from "@/components/Forms";
import { Container, Eyebrow, PageMain } from "@/components/ui";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/plan-my-trip",
    title: locale === "es" ? "Planear mi viaje" : "Plan my trip",
    description:
      locale === "es"
        ? "Ocasión, fechas, grupo y lo que quieres hacer. Te respondemos con un plan."
        : "Occasion, dates, the group, and what you want to do. We reply with a plan.",
  });
}

export default async function PlanPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>{locale === "es" ? "A medida" : "Custom"}</Eyebrow>
          <h1 className="mt-3 font-display text-5xl text-ocean">{locale === "es" ? "Cuéntanos el viaje y lo armamos." : "Tell us the trip and we will shape it."}</h1>
          <p className="mt-4 text-muted">
            {locale === "es"
              ? "Seis preguntas. Al final se abre un mensaje con el plan, para que llegue de verdad."
              : "Six questions. At the end a message opens with the plan, so it actually arrives."}
          </p>
        </div>
        <PlanForm locale={locale} />
      </Container>
    </PageMain>
  );
}
