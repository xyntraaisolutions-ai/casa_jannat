import { ContactForm } from "@/components/Forms";
import { Container, PageMain } from "@/components/ui";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { hostAction, hostHref, site } from "@/lib/site";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/contact",
    title: locale === "es" ? "Contacto" : "Contact",
    description: locale === "es" ? "Escribe por la casa, una fecha o un plan." : "Write about the house, a date, or a plan.",
  });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const hello = locale === "es" ? "Hola, quiero preguntar por Casa Jannat." : "Hello, I have a question about Casa Jannat.";
  return (
    <PageMain className="pb-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl text-ocean">{locale === "es" ? "Escribe. Responde una persona." : "Write. A person answers."}</h1>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {site.phoneDisplay && site.phoneTel ? (
              <li>
                <a className="underline" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
              </li>
            ) : null}
            <li>Jacó, Puntarenas, Costa Rica</li>
          </ul>
          <a href={hostHref(hello)} className="mt-6 inline-flex rounded-full bg-jungle px-5 py-3 text-sm font-semibold text-white">
            {hostAction(locale)}
          </a>
        </div>
        <ContactForm locale={locale} />
      </Container>
    </PageMain>
  );
}
