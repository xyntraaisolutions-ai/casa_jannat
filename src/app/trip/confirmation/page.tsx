import { Confirmation } from "@/components/Confirmation";
import { Container, PageMain } from "@/components/ui";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/trip/confirmation",
    title: locale === "es" ? "Solicitud lista" : "Request ready",
    description: locale === "es" ? "Envía el plan al anfitrión para confirmar las fechas." : "Send the plan to the host to confirm the dates.",
  });
}

export default async function ConfirmationPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container>
        <Confirmation locale={locale} />
      </Container>
    </PageMain>
  );
}
